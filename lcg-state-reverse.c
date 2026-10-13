/* 
 * This program produces previous random numbers generated
 * by the LCG (PRNG) of PHP 5.3 given its internal state (s1/s2).
 * (This specifically just reverses the internal state)
 *
 * Specifically a reverse of:
 * #define MODMULT(a, b, c, m, s) q = s/a;s=b*(s-a*q)-c*q;if(s<0)s+=m
 *
 * Can reverse state for s1 and s2 ~500,000 times per second on an MBP
 *
 * -samy kamkar, code@samy.pl, 08/22/09
 *
 */

#include <stdio.h>

int q;
int main(int argc, char** argv)
{
    if (argc != 4)
    {
        printf("usage: %s <s1 [-1251222200]> <s2 [98137]> <times>\n", argv[0]);
        return -1;
    }

	int times = 0;
    int s1 = atoi(argv[1]);
    int s2 = atoi(argv[2]);
    int total = atoi(argv[3]);

	// Values for s1
	int a1 = 53668;
	int b1 = 40014;
	int c1 = 12211;
	int m1 = 2147483563L;

	// Values for s2
	int a2 = 52774;
	int b2 = 40692;
	int c2 = 3791;
	int m2 = 2147483399L;
    
	/* We use mod_inverse to get `i` out of (b * i - s) % c == 0
	 * via the Extended Euclidean algorithm */
	int inverse1 = mod_inverse(b1 % c1, c1);
	int inverse2 = mod_inverse(b2 % c2, c2);

	/* Fun Fact: q2 = 0 in the case where s2 is its first iteration!
	 * The reason is PIDs are typically <2**16, and s2 is initialized
	 * as a PID! q2 = s2/a2, and s2's 'a2' is close to 2**16 (52774),
	 * so q2 will almost always be <1, and in integer arithmetic, <1 = 0!
	 */
	while (times++ != total)
	{
		s1 = reverse_s(a1, b1, c1, m1, s1, inverse1);
		s2 = reverse_s(a2, b2, c2, m2, s2, inverse2);

		if (!s1 || !s2)
		{
			printf("crap! something is wrong: s1=%d s2=%d!\n", s1, s2);
			return 0;
		}
		printf("%d: s1=%d s2=%d times=%d\n", times, s1, s2);
	}

	return 0;
}


/* Given a, b, c, m and s, return the previous `s`
 * Essentially a reverse of MODMULT() */
int reverse_s(int a, int b, int c, int m, int s, int inverse)
{
	int i, n, prev_s;

	/* Find first possible answer */
	i = (s % c * inverse) % c;
	if ((a * ((b * i - s) / c) + i) / a < 0)
		i += c;

	/* Potential answers will be every i+c*2 */
	/* This can probably be simplified, but the loss of precision is very important */
	n = (a * ((b * i - s) / c) + i) / a;
	i = (n * c + s) / b;

	q = (b * i - s) / c;
	prev_s = a * q + i;
	if (b * (prev_s - (a * q)) - (c * q) == s)
	{
		printf("MATCH: a=%d i=%d n=%d q=%d prev_s=%d\n", a, i, n, q, prev_s);
		return prev_s;
	}

	/* this time subtract m from s and retest, less likely but is necessary about 3.5% of the time */
	return reverse_s(a, b, c, m, s - m, inverse);
}

/* inverse modulus (extended euclidean algorithm) */
int mod_inverse(int A, int p)
{
	int a, b, q, t, x, y;
	a = p;
	b = A;
	x = 1;
	y = 0;
	while (b != 0)
	{
		t = b;
		q = a/t;
		b = a - q*t;
		a = t;
		t = x;
		x = y - q*t;
		y = t;
	}
	return (y < 0) ? y+p : y;
}

