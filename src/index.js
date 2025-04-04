// Init framework object
const BareJS = {};

// Load config
if (typeof BAREJS_CONFIG_FILE !== "undefined" && BAREJS_CONFIG_FILE !== null) {
    BareJS.config = BAREJS_CONFIG_FILE;
}