import "@/assets/reset.css";
import React, { render, useEffect, useState , Suspense, lazy, Fragment} from 'react';
import Home from './pages/home/index.jsx'
import "./util/polyfills.js"

const App = () => {
  const [currentPath, setCurrentPath] = useState(getInitialPath());
  const Location = lazy(() => import('./pages/location/index.jsx')); // 动态导入组件
  const NotFound = lazy(() => import('./pages/404.jsx'));;
  // 获取初始路径
  function getInitialPath() {
    return window.location.hash ? window.location.hash.slice(1) : "";
  }

  // 导航函数
  const navigate = (path) => {
    if (window.location.hash) {
      window.location.hash = path;
    } else {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  // 渲染组件
  const renderComponent = () => {
    console.log(currentPath)
    switch (currentPath) {
      case '':
        return <Home />;
      case '/':
        return <Home />;
      case '/now/location':
        return <Location />;
      default:
        console.log(currentPath)
        return <NotFound />;
    }
  };

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const onHashChange = () => {
      setCurrentPath(window.location.hash.slice(1));
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <Fragment>
      {/* fallback={<div>Loading...</div>} */}
      <Suspense >
        {renderComponent()}
      </Suspense>
    </Fragment>
  );
};

render(<App />, document.getElementById("root"));