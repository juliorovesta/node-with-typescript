import { PythonShell } from 'python-shell'
import { randomUUID } from 'crypto'

export interface PythonCommand {
    id: string
    action: string
    args: Object[]
}

export interface Result {
    action: string
    success?: Object
    error?: string
}

export interface PythonResult extends Result {
    id: string
}

export class MyPythonApp implements Disposable {
    private readonly pyshell: PythonShell

    constructor() {
        this.pyshell = new PythonShell('main.py', {
            scriptPath: './src/python',
            mode: 'text',
            encoding: 'latin1',
            // pythonPath: 'C:/ProgramData/anaconda3/envs/env310/python.exe'
            pythonOptions: ['-u'] // get print results in real-time
            // args: []
        })
    }

    send = (action: string, args: Object[]) => {
        const id: string = randomUUID()
        const commandPython: PythonCommand = { id, action, args }

        return new Promise((resolve: (data: Result) => void) => {
            const handleData = (textData: string) => {
                try {
                    const resultPython: PythonResult = PythonShell.parse.json(textData)
                    if (resultPython.id !== commandPython.id) {
                        console.debug(`[python] Discarding data: ['${textData}']`)
                        return
                    }
                    const { action, success, error } = resultPython
                    const result: Result = success ? { action, success } : { action, error }

                    this.pyshell.stdout.off('data', handleData)

                    return resolve(result)
                } catch (error) {
                    console.debug(`[python] Unexpected data: ['${textData}']`)
                    return
                }
            }

            const commandJson = PythonShell.format.json(commandPython)
            this.pyshell.send(commandJson).stdout.on('data', handleData)
        })
    }

    end = (): void => {
        this.pyshell.end((err, code, signal) => {
            console.log('--------------------------------')
            if (err) throw err
            console.log('The exit code was: ', code)
            console.log('The exit signal was: ', signal)
            console.log('# Finishing node app...')
        })
    };

    [Symbol.dispose]() {
        this.end()
    }
}
