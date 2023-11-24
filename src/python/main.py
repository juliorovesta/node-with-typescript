from sys import stdin
import json

# simple JSON echo script
for line in stdin:
    print(json.dumps(json.loads(line)))

# from sys import stdin, stdout
# import json


# def minha_rede_neural(valor1, valor2):
#     return (valor1 * 2) * valor2


# while True:
#     message = stdin.readline()
#     message = json.loads(message)
#     args = message['args']

#     response = {}

#     try:
#         result = minha_rede_neural(*args)
#         response['data'] = result
#     except Exception as e:
#         response['error'] = str(e)

#     response = json.dumps(response)
#     stdout.write(response)
#     stdout.flush()
