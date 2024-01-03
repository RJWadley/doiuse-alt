import postcss from "postcss";
import DoIUse from "../lib/DoIUse.js";
import fs from "fs";

// disable all console output
var methods = ["log", "debug", "warn", "info"];
for (var i = 0; i < methods.length; i++) {
  console[methods[i]] = function () {};
}

const main = async () => {
  const start = performance.now();

  const folder = new URL("./data", import.meta.url).pathname;
  const files = fs.readdirSync(folder);
  const cssFiles = files.filter((file) => file.endsWith(".css"));

  for (const file of cssFiles) {
    await postcss(
      new DoIUse({
        browsers: ["ie >= 6", "> 1%"],
      })
    ).process(
      fs.readFileSync(new URL(`./data/${file}`, import.meta.url), "utf8")
    );
  }

  const end = performance.now();
  console.log(`Benchmark took ${end - start}ms`);
};

main();
