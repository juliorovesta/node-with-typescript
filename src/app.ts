import { PythonShell } from 'python-shell'
import { setTimeout } from 'timers/promises'

console.log('# Starting node app...')

const pyshell = new PythonShell('./src/python/main.py', {
    mode: 'json'
    // pythonPath: process.env.PYTHONPATH,
    // pythonOptions: ['-u'], // get print results in real-time
    // scriptPath: './src/python',
    // args: []
})

const sendCommand = (command: string | Object) =>
    new Promise((resolve: (data: Object) => void) =>
        pyshell.send(command).stdout.once('data', resolve)
    )

let result = await sendCommand({ action: 'addition', args: [2, 3] })
console.log(result)

result = await sendCommand({ action: 'subtraction', args: [10, 2] })
console.log(result)

// pyshell.stdout.on('data', (data) => {
//     console.log(data)
// })

// pyshell
//     .send({ action: 'addition', args: [2, 3] })
//     .send({ action: 'subtraction', args: [10, 2] })
//     .send({ action: 'multiplication', args: [3, 5] })
//     .send({ action: 'division', args: [15, 3] })

await setTimeout(2000)

pyshell.kill('SIGQUIT')

pyshell.end((err, code, signal) => {
    if (err) throw err
    console.log('The exit code was: ' + code)
    console.log('The exit signal was: ' + signal)
    console.log('# Finishing node app...')
})
