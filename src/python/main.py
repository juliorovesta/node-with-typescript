import json
import time
from sys import stdin, stdout

from calculator import Calculator


class App:
    [staticmethod]

    def run():
        calculator = Calculator()

        for line in stdin:
            response = {}

            try:
                message = json.loads(line)
                action = message["action"]
                args = message["args"]

                response["id"] = message["id"]
                response["action"] = action

                if action not in dir(calculator):
                    raise Exception("Invalid action!")

                method = getattr(calculator, action)

                response["success"] = method(*args)
            except Exception as e:
                response["error"] = f"{e}"

            # Hack for console flush time
            stdout.flush()
            time.sleep(0.1)

            response = json.dumps(response)
            stdout.write(f"{response} \n")
            stdout.flush()


App.run()
