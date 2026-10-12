#include <iostream>
#include <string>
#include <cmath>

using namespace std;

class MathAlchemy {
public:
    double transmute(double a, double b, string element) {
        if (element == "add")
            return a + b;

        if (element == "multiply")
            return a * b;

        if (element == "power")
            return pow(a, b);

        if (element == "subtract")
            return a - b;

        if (element == "divide") {
            if (b == 0)
                throw runtime_error("Cannot divide by zero!");
            return a / b;
        }

        throw invalid_argument("Unknown transformation!");
    }
};

int main() {
    MathAlchemy engine;

    cout << "=== Math Alchemy Engine ===\n";

    try {
        cout << "Addition: "
             << engine.transmute(5, 3, "add") << '\n';

        cout << "Multiplication: "
             << engine.transmute(5, 3, "multiply") << '\n';

        cout << "Power: "
             << engine.transmute(2, 8, "power") << '\n';
    }
    catch (const exception& e) {
        cerr << "Alchemy failed: " << e.what() << '\n';
    }

    return 0;
}

