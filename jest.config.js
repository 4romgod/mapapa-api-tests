module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testRegex: '(^(.*(lib\/integration)).*spec\\.ts.*$)',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    clearMocks: true,
    testTimeout: 30000
};