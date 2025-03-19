module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    "transformIgnorePatterns": [
        "node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)"
    ],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                filename: 'jest.report.html',
                expand: true
            }
        ]
    ]
};
