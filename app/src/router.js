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
const UsersPage = require('./pages/users');

const auth = function (name) {
	return function () {
		if (app.me.isLoggedIn) {
			this[name].apply(this, arguments);
		} else {
			this.redirectTo('/');
		}
	};
};

const renderPage = function (page, active, title) {
	page = (
		<Layout active={active} algsets={app.algsets} me={app.me}>
			{page}
		</Layout>
	);

	document.title = title || 'AlgDB';
	ReactDOM.render(page, document.getElementById('root'));
};

module.exports = Router.extend({
	routes: {
		'': 'index',
		'login': 'login',
		'logout': 'logout',
		'authcallback?:query': 'authCallback',
		'algsets/:id': 'algset',
		'users': 'users',
		'about': 'about',
		'*404': 'four'
	},

	index () {
		app.algsets.fetch({
			error: (coll, resp, options) => this.redirect(resp)
		});
		renderPage(<IndexPage algsets={app.algsets}/>, 'home');
	},

	login () {
		window.location = window.location.origin + '/login';
	},

	logout () {
		window.location = window.location.origin + '/logout';
	},

	authCallback (query) {
		this.redirect('/');
	},

	algset (id) {
		app.algsets.fetch({
			success: function (coll, resp, options) {
				let algset = app.algsets.find({id: id});
				if (algset) {
					renderPage(<AlgPage algset={algset} editable={app.me.role === 'Admin'}/>, 'learn', `Learn ${algset.id.toUpperCase()}`);
				} else {
					app.router.redirect({
						message: 'Algset does not exist'
					});
				}
			},
			error: (coll, resp, options) => this.redirect(resp)
		});
	},

	users () {
		xhr({
			uri: 'api/v0/users'
		}, function (err, resp, body) {
			if (!err) {
				renderPage(<UsersPage users={JSON.parse(body)}/>);
			} else {
				app.router.redirect(err);
			}
		});
	},

	about () {
		renderPage(<AboutPage/>, 'about', 'About');
	},

	four () {
		this.redirect({
			message: 'Page doesn\' exist!'
		});
	},

	redirect (error) {
		console.trace();
		this.redirectTo('/');

		if (error) {
			app.errors.push(error);
		}
	}
});
