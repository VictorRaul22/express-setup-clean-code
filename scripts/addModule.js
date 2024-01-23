const fs = require("fs").promises;
const path = require("path");
const folders = ["application", "domain", "infrastructure"];
const args = process.argv.slice(2);
const [name = null] = args;
const MODULE_PATH = process.cwd() + "/src/modules";

if (name == null) {
  console.log("Invalid name");
  process.exit();
}
folders.forEach(async (folder) => {
  await fs.mkdir(path.resolve(MODULE_PATH + `/${name}`, folder), {
    recursive: true,
  });
});
console.log("Created Module");

