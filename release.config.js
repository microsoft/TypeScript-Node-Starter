module.exports = {
      "branches": ["master", { name: "staging", channel: "staging", prerelease: true }],
      "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/github",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/git"
      ],
      "ci": false,
};

