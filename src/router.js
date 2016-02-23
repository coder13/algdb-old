const app = require('ampersand-app');
const Router = require('ampersand-router');
const ReactDOM = require('react-dom');
const Layout = require('./pages/layout');
const IndexPage = require('./pages/index');
// const LearnPage = require('./pages/learn');
const AlgPage = require('./pages/algset');
// const DrillPage = require('./pages/drill');

const match = (name) => ((set) => (set.id||set.abbrev||set.name||'').toLowerCase() === name.toLowerCase());

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
		'set/*path': 'set',
		'*404': 'redirect'
	},

	index () {
		this.renderPage(<IndexPage/>, 'home');
	},

	set (path) {
		if (path) {
			let algset = path.split('/').filter(i => !!i).reduce(function (pl, pr) {
				return (typeof pl === 'string' ? app.findAlgset(pl).subsets : pl).find(match(pr))
			});

			if (typeof algset === 'string') {
				algset = app.findAlgset(algset);
			}

			if (algset) {
				this.renderPage(<AlgPage path={path.split('/')} algset={algset}/>, 'learn');
				return;
			}
		}
		this.redirect();
	},

	drill (algset) {
		let scrambleType = algset === 'cmll' ? CMLL : COLL;
		this.renderPage(<DrillPage scrambleType={scrambleType}/>, 'drill');
	},

	redirect () {
		this.redirectTo('/')
	}
});
