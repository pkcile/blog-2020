import '@/assets/reset.css'
import IndexPage from './pages/home/index.jsx';
import { render } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';
import Location from './pages/location/index.jsx'
// import AsyncRoute from 'preact-async-route';
function Counter() {
	return (
		<Router history={createHashHistory()}>
		<IndexPage path="/" />
		<Location path="/now/location" />
		{/* <AsyncRoute
			path="/now/location"
			getComponent={() => import('./pages/location/index.jsx').then(module => module.default)}
		/>
		<AsyncRoute
			default
			path="/404"
			getComponent={() => import('./pages/404.jsx').then(module => module.default)}
		/> */}
	</Router>
	);
}

render(<Counter />, document.getElementById('root'));
