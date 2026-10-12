#include <iostream>

int main() {

	double binary = 010100101;

	double binary0x01 = 0x3FE25AA2E3AF0B22;
	double binary0x02 = 0x3FE71FE927CADDE9; 

	std::cout << binary << " binary: <0s and 1s> " << std::endl;
	std::cout << binary0x01 << " memory: <0x3F> Temple." << std::endl;
	std::cout << binary0x02 << " memory: <0x3F> Temple."<< std::endl;
	return 0;
}
