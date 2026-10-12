#include <algorithm>
#include <cmath>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>

using namespace std;

constexpr double PI = 3.14159265358979323846;
constexpr double EPS = 1e-12;

class Expression {
    string s;
    size_t pos = 0;
    double x = 0.0;

    void spaces() {
        while (pos < s.size() &&
               isspace(static_cast<unsigned char>(s[pos]))) {
            ++pos;
        }
    }

    bool eat(char c) {
        spaces();
        if (pos < s.size() && s[pos] == c) {
            ++pos;
            return true;
        }
        return false;
    }

    double checked(double v) {
        if (!isfinite(v))
            throw runtime_error("Result is outside the finite numeric range.");
        return v;
    }

    string identifier() {
        spaces();
        size_t start = pos;

        while (pos < s.size() &&
               (isalnum(static_cast<unsigned char>(s[pos])) ||
                s[pos] == '_')) {
            ++pos;
        }

        if (start == pos)
            throw runtime_error("Expected a number, variable, or function.");

        string name = s.substr(start, pos - start);
        transform(name.begin(), name.end(), name.begin(),
                  [](unsigned char c) { return tolower(c); });
        return name;
    }

    double expression() {
        double v = term();

        while (true) {
            if (eat('+')) v = checked(v + term());
            else if (eat('-')) v = checked(v - term());
            else break;
        }
        return v;
    }

    double term() {
        double v = unary();

        while (true) {
            if (eat('*')) {
                v = checked(v * unary());
            } else if (eat('/')) {
                double d = unary();
                if (d == 0.0)
                    throw runtime_error("Division by zero.");
                v = checked(v / d);
            } else {
                break;
            }
        }
        return v;
    }

    double unary() {
        if (eat('+')) return unary();
        if (eat('-')) return checked(-unary());
        return power();
    }

    double power() {
        double base = primary();

        // Right-associative exponentiation; negative exponents work too.
        if (eat('^'))
            base = checked(pow(base, unary()));

        return base;
    }

    double primary() {
        spaces();

        if (eat('(')) {
            double v = expression();
            if (!eat(')'))
                throw runtime_error("Missing closing parenthesis.");
            return v;
        }

        spaces();
        if (pos >= s.size())
            throw runtime_error("Unexpected end of expression.");

        if (isdigit(static_cast<unsigned char>(s[pos])) ||
            s[pos] == '.') {
            const char* start = s.c_str() + pos;
            char* end = nullptr;
            double v = strtod(start, &end);

            if (end == start)
                throw runtime_error("Invalid number.");

            pos += static_cast<size_t>(end - start);
            return checked(v);
        }

        string name = identifier();

        if (name == "x") return x;
        if (name == "pi") return PI;
        if (name == "e") return exp(1.0);

        if (!eat('('))
            throw runtime_error("Unknown name or missing function parentheses: " + name);

        double a = expression();

        if (!eat(')'))
            throw runtime_error("Missing closing parenthesis in function.");

        if (name == "sin") return checked(sin(a));
        if (name == "cos") return checked(cos(a));
        if (name == "tan") return checked(tan(a));
        if (name == "asin") return checked(asin(a));
        if (name == "acos") return checked(acos(a));
        if (name == "atan") return checked(atan(a));
        if (name == "sqrt") {
            if (a < 0.0) throw runtime_error("sqrt requires x >= 0.");
            return checked(sqrt(a));
        }
        if (name == "abs") return abs(a);
        if (name == "exp") return checked(exp(a));
        if (name == "ln" || name == "log") {
            if (a <= 0.0)
                throw runtime_error("Logarithm requires a positive argument.");
            return checked(log(a));
        }
        if (name == "log10") {
            if (a <= 0.0)
                throw runtime_error("log10 requires a positive argument.");
            return checked(log10(a));
        }
        if (name == "floor") return floor(a);
        if (name == "ceil") return ceil(a);

        throw runtime_error("Unsupported function: " + name);
    }

public:
    Expression(const string& formula, double variable)
        : s(formula), x(variable) {}

    double evaluate() {
        pos = 0;
        double result = expression();
        spaces();

        if (pos != s.size())
            throw runtime_error("Unexpected character near: " + s.substr(pos));

        return checked(result);
    }
};

double f(const string& formula, double x) {
    return Expression(formula, x).evaluate();
}

double derivative(const string& formula, double x) {
    // Five-point central difference for improved accuracy.
    double h = 1e-4 * max(1.0, abs(x));

    return (f(formula, x - 2*h)
          - 8*f(formula, x - h)
          + 8*f(formula, x + h)
          - f(formula, x + 2*h)) / (12*h);
}

double integral(const string& formula, double a, double b,
                int n = 10000) {
    if (a == b) return 0.0;
    if (n < 2) n = 2;
    if (n % 2) ++n;

    double sign = 1.0;
    if (a > b) {
        swap(a, b);
        sign = -1.0;
    }

    double h = (b - a) / n;
    double sum = f(formula, a) + f(formula, b);

    for (int i = 1; i < n; ++i) {
        double y = f(formula, a + i * h);
        sum += (i % 2 ? 4.0 : 2.0) * y;
    }

    return sign * sum * h / 3.0;
}

double root(const string& formula, double a, double b) {
    double fa = f(formula, a);
    double fb = f(formula, b);

    if (abs(fa) < EPS) return a;
    if (abs(fb) < EPS) return b;

    if ((fa < 0) == (fb < 0))
        throw runtime_error(
            "Root not bracketed: endpoints must have opposite signs.");

    for (int i = 0; i < 200; ++i) {
        double m = a + (b - a) / 2.0;
        double fm = f(formula, m);

        if (abs(fm) < EPS || abs(b - a) < EPS)
            return m;

        if ((fa < 0) != (fm < 0)) {
            b = m;
            fb = fm;
        } else {
            a = m;
            fa = fm;
        }
    }

    return a + (b - a) / 2.0;
}

void help() {
    cout << "\n=== MATH ALCHEMY ENGINE ===\n"
         << "Commands:\n"
         << "  eval <expression>\n"
         << "  deriv <x> <expression>\n"
         << "  integral <a> <b> <expression>\n"
         << "  root <a> <b> <expression>\n"
         << "  loop <start> <step> <count> <expression>\n"
         << "  help\n"
         << "  quit\n\n"
         << "Variable: x\n"
         << "Operators: + - * / ^ ( )\n"
         << "Functions: sin cos tan asin acos atan sqrt abs\n"
         << "           exp ln log log10 floor ceil\n"
         << "Constants: pi e\n"
         << "Trig functions use radians.\n\n";
}

int main() {
    cout << setprecision(12) << scientific;
    help();

    string line;

    while (true) {
        cout << "alchemy> ";

        if (!getline(cin, line))
            break;

        istringstream input(line);
        string command;
        input >> command;

        if (command.empty()) continue;

        transform(command.begin(), command.end(), command.begin(),
                  [](unsigned char c) { return tolower(c); });

        if (command == "quit" || command == "exit")
            break;

        if (command == "help") {
            help();
            continue;
        }

        try {
            if (command == "eval") {
                string formula;
                getline(input >> ws, formula);
                if (formula.empty())
                    throw runtime_error("Provide an expression.");

                cout << "Result = " << f(formula, 0.0) << '\n';
            }
            else if (command == "deriv") {
                double x;
                if (!(input >> x))
                    throw runtime_error("Usage: deriv <x> <expression>");

                string formula;
                getline(input >> ws, formula);

                cout << "Derivative at x = " << x << " is "
                     << derivative(formula, x) << '\n';
            }
            else if (command == "integral") {
                double a, b;
                if (!(input >> a >> b))
                    throw runtime_error(
                        "Usage: integral <a> <b> <expression>");

                string formula;
                getline(input >> ws, formula);

                cout << "Integral = "
                     << integral(formula, a, b) << '\n';
            }
            else if (command == "root") {
                double a, b;
                if (!(input >> a >> b))
                    throw runtime_error("Usage: root <a> <b> <expression>");

                string formula;
                getline(input >> ws, formula);

                double r = root(formula, a, b);
                cout << "Root x = " << r
                     << ", f(x) = " << f(formula, r) << '\n';
            }
            else if (command == "loop") {
                double start, step;
                long long count;

                if (!(input >> start >> step >> count))
                    throw runtime_error(
                        "Usage: loop <start> <step> <count> <expression>");

                if (count < 1 || count > 1000000)
                    throw runtime_error(
                        "Count must be between 1 and 1000000.");

                if (!isfinite(start) || !isfinite(step))
                    throw runtime_error("Start and step must be finite.");

                string formula;
                getline(input >> ws, formula);

                if (formula.empty())
                    throw runtime_error("Provide an expression.");

                cout << "Continuous computation:\n";

                double x = start;
                for (long long i = 0; i < count; ++i) {
                    cout << "Iteration " << i
                         << " | x = " << x
                         << " | result = " << f(formula, x) << '\n';

                    if (i + 1 < count) {
                        x += step;
                        if (!isfinite(x))
                            throw runtime_error("Iteration variable overflow.");
                    }
                }
            }
            else {
                cout << "Unknown command. Type help.\n";
            }
        }
        catch (const exception& e) {
            cout << "Math error: " << e.what() << '\n';
        }
    }

    cout << "Math Alchemy Engine stopped.\n";
    return 0;
}

