import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ResizeFree from '../dist/index';
import './index.css'

const App = () => {
  return (
    <div>
      <ResizeFree width={1024} height={768}>
        <h1>测试页面大小设置</h1>
      </ResizeFree>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
