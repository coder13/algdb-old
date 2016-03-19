const qs = require('qs');
const xhr = require('xhr');
const app = require('ampersand-app');
const Router = require('ampersand-router');
const ReactDOM = require('react-dom');
const Layout = require('./pages/layout');
const IndexPage = require('./pages/index');
const Algset = require('./models/algset');
const AlgPage = require('./pages/algset');
const AboutPage = require('./pages/about');

const auth = function (name) {
	return function () {
		if (app.me.isLoggedIn) {
			this[name].apply(this, arguments);
		} else {
			this.redirectTo('/');
		}
	};
};

module.exports = Router.extend({
	renderPage (page, active, title) {
		page = (
			<Layout active={active} algsets={app.algsets} me={app.me}>
				{page}
			</Layout>
		);

		document.title = title || 'AlgDB';
		ReactDOM.render(page, document.getElementById('root'));
	},

	routes: {
		'': 'index',
		'login': 'login',
		'logout': 'logout',
		'authcallback?:query': 'authCallback',
		'algset/:id': 'algset',
		'about': 'about',
		'*404': 'redirect'
	},

	index () {
		app.algsets.fetch();
		this.renderPage(<IndexPage algsets={app.algsets}/>, 'home');
	},

	login () {
		window.location = window.location.origin + '/login';
	},

	logout () {
		window.location = window.location.origin + '/logout';
	},

	authCallback (query) {
		console.log(query);
		this.redirect('/');
	},

	algset (id) {
		let algset = app.algsets.find({id: id});
		if (algset) {
			this.renderPage(<AlgPage algset={algset} editable={app.me.isLoggedIn}/>, 'learn', `Learn ${algset.id.toUpperCase()}`);
		} else {
			this.redirect('Algset does not exist');
		}
	},

	about () {
		console.log('about');
		this.renderPage(<AboutPage/>, 'about', 'About');
	},

	redirect (message) {
		this.redirectTo('/');
	}
});
