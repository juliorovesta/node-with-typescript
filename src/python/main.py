import json
import time
from sys import stdin, stdout

from calculator import Calculator


class App:
    [staticmethod]

    def run():
        for line in stdin:
            response = {}

            try:
                message = json.loads(line)
                action = message["action"]
                args = message["args"]
                response["id"] = message["id"]
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

                response["success"] = result
            except Exception as e:
                response["error"] = f"{e}"

            # Hack for console flush time
            stdout.flush()
            time.sleep(0.1)

            response = json.dumps(response)
            stdout.write(f"{response} \n")
            stdout.flush()


App.run()
