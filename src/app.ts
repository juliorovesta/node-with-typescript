import { PythonShell } from "python-shell";

console.log("Starting node app...");

const pyshell = new PythonShell("./src/python/main.py", {
    mode: "json",
});
pyshell.stdout.on("data", function (data) {
    console.log(data);
});

pyshell.send({ a: "b", name: "julio" });

pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished");
});
