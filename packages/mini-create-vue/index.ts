#!/usr/bin/env node
async function init() {
  console.log("[ init ] >");
}
init().catch((e) => {
  console.error(e);
});
