const React = require('react');
const app = require('ampersand-app');
const ampersandMixin = require('ampersand-react-mixin');
const NavHelper = require('../components/nav-helper');

// Main layout. Will always display list of competitors and their current points.
module.exports = React.createClass({
	mixins: [ampersandMixin],
	displayName: 'LayoutPage',

	getInitialState () {
		return {};
	},

	componentDidMount: function() {},

	render () {
		return (
			<NavHelper id='layout' style={{height: '100%', width: '100%'}}>
				<nav className='navbar navbar-default navbar-static-top' style={{marginBottom: '0px'}}>
					<div className='container-fluid'>
						<div className='navbar-header'>
							<button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#navbar' style={{height: '40px'}}>
								<span className='sr-only'>Toggle navigation</span>
								<span className='icon-bar'></span>
								<span className='icon-bar'></span>
								<span className='icon-bar'></span>
								<a className='navbar-brand' href='/home'></a>
							</button>
						</div>

						<div id='navbar' className='navbar-collapse disabled collapse' aria-expanded="false">
							<ul className='nav navbar-nav'>
								<li className={this.props.active === 'home' ? 'active' : ''}><a href='/'>AlgDB</a></li>
								<li className={this.props.active === 'learn' ? 'active' : ''}><a href='/'>Learn</a></li>
								<li className={this.props.active === 'drill' ? 'active' : ''}><a href='/drill'>Drill</a></li>
								<li className={this.props.active === 'about' ? 'active' : ''}><a href='/about'>About</a></li>
							</ul>
						</div>
					</div>
				</nav>

				<div id='body'>
					{this.props.children}
				</div>

				<div id='footer' style={{height: '2em'}}>
				</div>
			</NavHelper>
		);
	}
});
