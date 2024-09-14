import '@/assets/reset.css'
import IndexPage from './pages/home/index.jsx';
import { render } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';
import AsyncRoute from 'preact-async-route';
function Counter() {
	return (
		<div style={{
			height: "100%",
			width: "100%",
		}}>
			<Router history={createHashHistory()}>
				<IndexPage path="/" />
				<AsyncRoute
					path="/now/location"
					getComponent={() => import('./pages/location/index.jsx').then(module => module.default)}
				/>
				<AsyncRoute
					default
					path="/404"
					getComponent={() => import('./pages/404.jsx').then(module => module.default)}
				/>
			</Router>
		</div>
	);
}

render(<Counter />, document.getElementById('root'));
