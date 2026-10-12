#include <iostream>
#include <iomanip>
#include <cmath>
#include <stdexcept>
#include <string>
#include <limits>

using namespace std;

class MathAlchemyEngine {
private:
    double energy = 0.0;

public:
    double add(double a, double b) {
        energy += 1;
        return a + b;
    }

    double subtract(double a, double b) {
        energy += 1;
        return a - b;
    }

    double multiply(double a, double b) {
        energy += 2;
        return a * b;
    }

    double divide(double a, double b) {
        if (b == 0.0)
            throw runtime_error("Division by zero is forbidden!");

        energy += 2;
        return a / b;
    }

    double power(double a, double b) {
        double result = pow(a, b);

        if (!isfinite(result))
            throw runtime_error("Power transformation failed!");

        energy += 3;
        return result;
    }

    double squareRoot(double a) {
        if (a < 0.0)
            throw runtime_error("Cannot take square root of a negative number!");

        energy += 2;
        return sqrt(a);
    }

    double logarithm(double a) {
        if (a <= 0.0)
            throw runtime_error("Logarithm requires a positive number!");

        energy += 2;
        return log10(a);
    }

    double getEnergy() const {
        return energy;
    }

    void resetEnergy() {
        energy = 0.0;
    }
};

void showMenu() {
    cout << "\n================================\n";
    cout << "       MATH ALCHEMY ENGINE\n";
    cout << "================================\n";
    cout << "1. Addition       (+)\n";
    cout << "2. Subtraction    (-)\n";
    cout << "3. Multiplication (*)\n";
    cout << "4. Division       (/)\n";
    cout << "5. Power          (^)\n";
    cout << "6. Square Root    (sqrt)\n";
    cout << "7. Logarithm      (log10)\n";
    cout << "8. Show Alchemy Energy\n";
    cout << "9. Reset Energy\n";
    cout << "0. Exit\n";
    cout << "================================\n";
}

double readNumber(const string& prompt) {
    double value;

    while (true) {
        cout << prompt;

        if (cin >> value && isfinite(value))
            return value;

        cout << "Invalid number. Try again.\n";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }
}

int main() {
    MathAlchemyEngine engine;
    int choice;

    cout << fixed << setprecision(6);
    cout << "Welcome, Alchemist!\n";
    cout << "Transform numbers into mathematical gold.\n";

    while (true) {
        showMenu();
        cout << "Choose a transformation: ";

        if (!(cin >> choice)) {
            if (cin.eof())
                break;

            cout << "Invalid choice. Enter a number.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;
        }

        if (choice == 0) {
            cout << "Alchemy complete. Goodbye!\n";
            break;
        }

        try {
            double a, b, result;

            switch (choice) {
                case 1:
                    a = readNumber("Enter first element: ");
                    b = readNumber("Enter second element: ");
                    result = engine.add(a, b);
                    cout << "Transmutation result: " << result << '\n';
                    break;

                case 2:
                    a = readNumber("Enter first element: ");
                    b = readNumber("Enter second element: ");
                    result = engine.subtract(a, b);
                    cout << "Transmutation result: " << result << '\n';
                    break;

                case 3:
                    a = readNumber("Enter first element: ");
                    b = readNumber("Enter second element: ");
                    result = engine.multiply(a, b);
                    cout << "Transmutation result: " << result << '\n';
                    break;

                case 4:
                    a = readNumber("Enter numerator: ");
                    b = readNumber("Enter denominator: ");
                    result = engine.divide(a, b);
                    cout << "Transmutation result: " << result << '\n';
                    break;

                case 5:
                    a = readNumber("Enter base: ");
                    b = readNumber("Enter exponent: ");
                    result = engine.power(a, b);
                    cout << "Transmutation result: " << result << '\n';
                    break;

                case 6:
                    a = readNumber("Enter number: ");
                    result = engine.squareRoot(a);
                    cout << "Square root: " << result << '\n';
                    break;

                case 7:
                    a = readNumber("Enter positive number: ");
                    result = engine.logarithm(a);
                    cout << "Logarithm: " << result << '\n';
                    break;

                case 8:
                    cout << "Total Alchemy Energy: "
                         << engine.getEnergy() << '\n';
                    break;

                case 9:
                    engine.resetEnergy();
                    cout << "Alchemy energy has been reset.\n";
                    break;

                default:
                    cout << "Unknown transformation. Try again.\n";
            }
        }
        catch (const exception& e) {
            cout << "Alchemy failed: " << e.what() << '\n';
        }
    }

    return 0;
}