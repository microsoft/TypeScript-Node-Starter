module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testMatch: [
		'**/test/**/*.test.(ts|js)'
	],
	testEnvironment: 'node'
};