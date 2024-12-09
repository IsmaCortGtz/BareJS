const fs = require("node:fs");
const UglifyJS = require("uglify-js");

console.log("Build started...");

const config = {
    files: {
        "test1.js": fs.readFileSync("src/test1.js", "utf8"),
        "test2.js": fs.readFileSync("src/test2.js", "utf8")
    },
    output: "BareJS.min.js"
}

console.log("Converting files...");

const result = UglifyJS.minify(config.files);
fs.writeFileSync(config.output, result.code);

console.log("Process finished.");