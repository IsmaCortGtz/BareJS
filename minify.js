const fs = require("node:fs");
const UglifyJS = require("uglify-js");

console.log("Build started...");

const config = {
    files: {
        // Core
        "index.js": fs.readFileSync("src/index.js", "utf8"),

        // Components
        "components/index.js": fs.readFileSync("src/components/index.js", "utf8"),
        "components/web-component.js": fs.readFileSync("src/components/web-component.js", "utf8")
    },
    
    output: "BareJS.min.js"
}

console.log("Converting files...");

const result = UglifyJS.minify(config.files);
fs.writeFileSync(config.output, result.code);

console.log("Process finished.");