
module.exports = {
    "plugins": [
        "@babel/proposal-class-properties",
        "istanbul"
    ],
    "presets": [
        [
            "@babel/env", {
                "targets": {
                    "node": "current",
                },
                "modules": "commonjs",
            },
        ],
        "@babel/typescript",
    ]
};