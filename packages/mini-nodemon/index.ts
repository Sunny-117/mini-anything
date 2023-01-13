
const chokidar = require("chokidar");
const { exec, spawn } = require("child_process");

let childProcess;
let debounceRestart = debounce(restart, 500);

// One-liner for current directory
chokidar.watch(["main.ts"]).on("all", (event, path) => {
  console.log(event, path);
  debounceRestart();
});

function restart() {
  console.log("restart");
  childProcess && childProcess.kill();

  childProcess = spawn("node", ["main.ts"], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
}

function debounce(fn, delay) {
  let id;
  return () => {
    clearTimeout(id);

    id = setTimeout(() => {
      fn();
    }, delay);
  };
}

