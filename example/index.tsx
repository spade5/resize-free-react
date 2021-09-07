import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ResizeFree from '../dist/index';
import './index.css'

// TODO
// 1. ROUTER
// 2. SCREEN 1920 * 1080 screen_demo
// 3. 套上ResizeFree的效果
// 4. 比较scaleX scaleY 与 perspective + scaleY 的区别
// 5. 非body内嵌demo
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
