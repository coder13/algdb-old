const app = require('ampersand-app');
const Router = require('ampersand-router');
const ReactDOM = require('react-dom');
const Layout = require('./pages/layout');
const IndexPage = require('./pages/index');
const Algset = require('./models/algset');
const AlgPage = require('./pages/algset');
const AboutPage = require('./pages/about');

module.exports = Router.extend({
	renderPage (page, active, title) {
		page = (
			<Layout active={active}>
				{page}
			</Layout>
		);

		document.title = title || 'AlgDB';
		ReactDOM.render(page, document.getElementById('root'));
	},

	routes: {
		'': 'index',
		'algset/:id': 'algset',
		'about': 'about',
		'*404': 'redirect'
	},

	index () {
		app.algsets.fetch();
		this.renderPage(<IndexPage algsets={app.algsets}/>, 'home');
	},

	algset (id) {
		let algset = app.algsets.find({id: id});
		if (algset) {
			this.renderPage(<AlgPage algset={algset} editable={app.admin}/>, 'learn', `Learn ${algset.id.toUpperCase()}`);
		} else {
			this.redirect('Algset does not exist');
		}
	},

	login () {

	},

	about () {
		console.log('about');
		this.renderPage(<AboutPage/>, 'about', 'About');
	},

	redirect (message) {
		this.redirectTo('/');
	}
});
