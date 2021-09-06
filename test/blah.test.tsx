import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ResizeFree from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ResizeFree width={1024} height={768} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
