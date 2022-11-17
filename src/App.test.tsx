import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('renders App', () => {
  renderer.create(<App />);
});
