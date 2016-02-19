const app = require('ampersand-app');
const Router = require('ampersand-router');
const ReactDOM = require('react-dom');
const Layout = require('./pages/layout');
const IndexPage = require('./pages/index');
const LearnPage = require('./pages/learn');
const DrillPage = require('./pages/drill');

module.exports = Router.extend({
	renderPage (page, active) {
		page = (
			<Layout active={active}>
				{page}
			</Layout>
		);

		ReactDOM.render(page, document.getElementById('root'));
		// ReactDOM.render(page, document.body);
	},

	routes: {
		'': 'index',
		'learn/:case': 'learn',
		'drill': 'drill',
		'drill/:algset': 'drill',
		'*404': 'redirect'
	},

	index () {
		this.renderPage(<IndexPage/>, 'home');
	},

	learn (oll) {
		this.renderPage(<LearnPage oll={oll}/>, 'learn');
	},

	drill (algset) {
		let scrambleType = algset === 'cmll' ? CMLL : COLL;
		this.renderPage(<DrillPage scrambleType={scrambleType}/>, 'drill');
	},

	redirect () {
		this.redirectTo('/')
	}
});
