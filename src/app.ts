import { MyPythonApp } from './my-python-app'

const RunApp = async () => {
    console.log('# Starting node app...')

    using myPyApp = new MyPythonApp()

    const additionResult = await myPyApp.send('addition', [2, 3])
    console.log('Result: ', additionResult)

    const divisionResult = await myPyApp.send('division', [10, 5])
    console.log('Result: ', divisionResult)
}

RunApp()
