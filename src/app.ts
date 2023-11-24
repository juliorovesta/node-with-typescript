import { PythonShell } from 'python-shell'

console.log('# Starting node app...')

const pyshell = new PythonShell('./src/python/main.py', {
    mode: 'json'
    // pythonPath: process.env.PYTHONPATH,
    // pythonOptions: ['-u'], // get print results in real-time
    // scriptPath: './src/python',
    // args: []
})
pyshell.stdout.on('data', (data) => {
    console.log(data)
})

pyshell
    .send({ action: 'addition', args: [2, 3] })
    .send({ action: 'subtraction', args: [10, 2] })
    .send({ action: 'multiplication', args: [3, 5] })
    .send({ action: 'division', args: [15, 3] })

pyshell.end((err, code, signal) => {
    if (err) throw err
    console.log('The exit code was: ' + code)
    console.log('The exit signal was: ' + signal)
    console.log('# Finishing node app...')
})
