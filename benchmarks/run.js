import postcss from "postcss";
import DoIUse from "../lib/DoIUse.js";
import fs from "fs";

const main = async () => {
  const start = performance.now();

  const folder = new URL("./data", import.meta.url).pathname;
  const files = fs.readdirSync(folder);
  const cssFiles = files.filter((file) => file.endsWith(".css"));

  for (const file of cssFiles) {
    await postcss(
      new DoIUse({
        browsers: ["ie >= 6", "> 1%"],
        ignore: ["rem"], // an optional array of features to ignore
        ignoreFiles: ["**/normalize.css"], // an optional array of file globs to match against original source file path, to ignore
        onFeatureUsage: (usageInfo) => {
          console.log(usageInfo.message);
        },
      })
    ).process(
      fs.readFileSync(new URL(`./data/${file}`, import.meta.url), "utf8")
    );
  }

  const end = performance.now();
  console.log(`Benchmark took ${end - start}ms`);
};

main();
