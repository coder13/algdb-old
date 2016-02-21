const app = require('ampersand-app');
const Router = require('ampersand-router');
const ReactDOM = require('react-dom');
const Layout = require('./pages/layout');
const IndexPage = require('./pages/index');
// const LearnPage = require('./pages/learn');
const AlgPage = require('./pages/algset');
// const DrillPage = require('./pages/drill');

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
		'set/:algset': 'set',
		'learn/:algset': 'set',
		'drill': 'drill',
		'drill/:algset': 'drill',
		'*404': 'redirect'
	},

	index () {
		this.renderPage(<IndexPage/>, 'home');
	},

	// learn (name) {
	// 	let algset = app.DB.find(set => set.id.toLowerCase() === name.toLowerCase())
	// 	if (algset) {
	// 		console.log(38, algset)
	// 		this.renderPage(<LearnPage algset={algset}/>, 'learn');
	// 	}
	// },

	set (name) {
		let algset = app.findAlgset(name);
		if (algset) {
			console.log(38, algset)
			this.renderPage(<AlgPage algset={algset}/>, 'learn');
		}
		console.log(44, arguments)
	},

	drill (algset) {
		let scrambleType = algset === 'cmll' ? CMLL : COLL;
		this.renderPage(<DrillPage scrambleType={scrambleType}/>, 'drill');
	},

	redirect () {
		this.redirectTo('/')
	}
});
