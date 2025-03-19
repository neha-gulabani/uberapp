import React from 'react'
import { render } from 'react-native-testing-library'
import App from './App'

jest.mock(
    'react-native-vector-icons/MaterialCommunityIcons',
    () => 'MockedMaterialCommunityIcons',
);

describe('<App/>', () => {
    it('should match snapshot', () => {
        const snap = render(<App />).toJSON();
        expect(snap).toMatchSnapshot();
    })
})