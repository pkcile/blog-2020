import "@/assets/reset.css";
import IndexPage from "./pages/home/index.jsx";
import { render } from "preact";
import Router from "preact-router";
import { createHashHistory } from "history";
// import Location from './pages/location/index.jsx'
// import TestPage from "./pages/test/index.jsx";
import AsyncRoute from "preact-async-route";
// import 'babel-polyfill';

// import 'core-js/actual/promise';
// import 'core-js/actual/set';
// import 'core-js/actual/iterator';
// import 'core-js/actual/array/from';
// import 'core-js/actual/array/flat-map';
// import 'core-js/actual/structured-clone';
// import 'core-js/actual';

window.history.replaceState = window.history.replaceState || function () {};
function Counter() {
  return (
    <Router history={createHashHistory()}>
      <IndexPage path="/" />
      {/* <AsyncRoute
        path="/now/location"
        getComponent={() =>
          import("./pages/location/index.jsx").then((module) => module.default)
        }
      /> */}
      <Location path="/now/location" />
      {/* <TestPage path="/test" /> */}
      <AsyncRoute
        path="/test"
        getComponent={() => import('./pages/test/index.jsx').then(module => module.default)}
      />
      <AsyncRoute
        default
        path="/404"
        getComponent={() => import('./pages/404.jsx').then(module => module.default)}
      />
    </Router>
  );
}

render(<Counter />, document.getElementById("root"));
