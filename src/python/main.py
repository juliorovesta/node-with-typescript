import json
from sys import stdin, stdout


class Calculator:
    def addition(self, v1, v2):
        return v1 + v2

    def subtraction(self, v1, v2):
        return v1 - v2

    def multiplication(self, v1, v2):
        return v1 * v2

    def division(self, v1, v2):
        return v1 / v2


class App:
    [staticmethod]

    def run():
        while True:
            for line in stdin:
                response = {}

                try:
                    message = json.loads(line)
                    action = message["action"]
                    args = message["args"]
                    response["action"] = action

                    calculator = Calculator()
                    match action:
                        case "addition":
                            result = calculator.addition(*args)
                        case "subtraction":
                            result = calculator.subtraction(*args)
                        case "multiplication":
                            result = calculator.multiplication(*args)
                        case "division":
                            result = calculator.division(*args)
                        case _:
                            raise Exception("Invalid action!")

                    response["result"] = result
                except Exception as e:
                    response["error"] = f"{e}"

                response = json.dumps(response)
                stdout.write(f"{response} \n")
                stdout.flush()


App.run()
