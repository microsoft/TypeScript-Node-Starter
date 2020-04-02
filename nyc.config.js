const base = require("@istanbuljs/nyc-config-babel");

module.exports = {
    ...base,
    include: [
        "src/**/*.ts"
    ],
    "report-dir": ".coverage",
    reporter: [ "text", "html"]
}

