#include <iostream>
#include <string>

using namespace std;

bool True(string id) {
	std::cout << "True" << id << std::endl;
	return true;
}

bool False(string id) {
	std::cout << "False" << id << std::endl;
	return false;
}

int add2(int i);
int add2(int i){
	int j = i + 2;
	return j;
}

int add2(int i, int j) {
	int k = i + j + 2;
	return k;
}

int multiply(int a, int b);
int multiply(int a, int b){
	return a * b;
}

void foo(int x) { 
	int a = x - 13;
	std::cout << a << std::endl;
	return ; 
}

struct literals {
	int x = 0x2a;
	int b = 0b101010;
	unsigned int u_1 = 42u;
	unsigned long long l1 = 1834484383489923328ull;
	unsigned long long l2 = 18'442'273'232'123'21321llu;
	unsigned long long l3 = 1844'23432'23423'565'232uLL;
	unsigned long long l4 = 218'2323'0'234'94LLU;	
};

int main() {

//	Single line comment
/*	Block line comment
 *
 * */
	bool result;
	result = False("A") || False("B") && False("C");
	result = True("A") || False("B") && False("C");

	std::cout << result << " ============= " << std::endl;

	//int a;
	std::cout << add2(2) << std::endl;
	std::cout << multiply(10, 20) << std::endl;
	foo(32);

	int arr[4] = {1,2,3,4};
	int *ptr1 = &arr[0];
	int *ptr2 = ptr1++;
	std::cout << *ptr1++ << std::endl;

	int e = arr[0]++;
	std::cout << e << std::endl;
	std::cout << *ptr2 << std::endl;

	double vol = 4.0/3.0 - 4.0/3.0;

	int a = 2+4/2;
	int b = (3+3)/2;
	int c = 3+4/2*6;
	int d = 3+(3+6)/9;
	int g = 3-3%1;
	int h = 3-(3%1);
	int i = 303/1%3;
	int l = 3-(3/1)%3;
	int m = 3-(3/(1%3));

	float total = 0;
	for(float a = 0; a !=2; a += 0.01f) { total += a; }

	double a_0x0A = 0.1;
	double b_0x0B = 0.2;
	double c_0x0C = 0.3;

	if(a_0x0A + b_0x0B == c_0x0C) std::cout << "IEEE754-compliant Machine" << std::endl;
	else std::cout << "<non-compliants>" << std::endl;

	double aa_0a = 0.1; //00111111001101010100101010010101001010100101;
	double aa_0b = 0.2; //00101010101001010101010101001010101001010101;
	double aa_0c = 0.3; //01010101001010101010100101010101001010101000;
	double aa_0d = aa_0a + aa_0b / 0.3;  //0010101010010101010101010000001111110100101;

	std::cout << aa_0d + aa_0c / aa_0a << std::endl;
	return 0;
}

