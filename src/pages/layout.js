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
				<nav className='navbar navbar-default navbar-static-top'>
					<div className='container-fluid'>
						<div className='navbar-header'>
							<button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
								<span className='sr-only'>Toggle navigation</span>
								<span className='icon-bar'></span>
								<span className='icon-bar'></span>
								<span className='icon-bar'></span>
								<a className='navbar-brand' href='/home'>C*LL Trainer</a>
					      </button>
						</div>

						<div className='collapse navbar-collapse' id='navbar'>
							<ul className='nav navbar-nav'>
								<li className={this.props.active === 'home' ? 'active': ''}><a href='/'>C*LL Trainer</a></li>
								<li className={this.props.active === 'learn' ? 'active': ''}><a href='/learn'>Learn</a></li>
								<li className={this.props.active === 'drill' ? 'active': ''}><a href='/drill'>Drill</a></li>
								<li className={this.props.active === 'about' ? 'active': ''}><a href='/about'>About</a></li>
							</ul>
						</div>
					</div>
				</nav>

				<div id='body'>
					{this.props.children}
				</div>

				<div id='footer'>
				</div>
			</NavHelper>
		)
	}
});
