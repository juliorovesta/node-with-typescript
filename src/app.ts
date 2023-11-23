import { spawn } from "child_process";

const child = spawn("python", ["./src/python/main.py"]);
child.on("exit", (code) => console.log("exitCode:", code));

child.stdout.on("data", function (buffer) {
    const response = JSON.parse(buffer);
    console.log(response);
});

child.stdin.write(JSON.stringify({ args: [2, 3] }) + "\n");

// import { PythonShell } from "python-shell";

// PythonShell.runString("x=1+1;print(x)").then((messages) => {
//     console.log("finished");
// });

// import { PythonShell } from "python-shell";

// const result = await PythonShell.runString("x=1+1;print(x)");
// console.log("finished", result);
