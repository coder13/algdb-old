const app = require('ampersand-app');
const React = require('react');
const Markdown = require('react-markdown');

module.exports = React.createClass({
	displayName: 'HomePage',

	render () {
		return (
			<div className='container'>
				<h1 className='text-center'>About</h1>
				<div style={{paddingLeft: '80px', paddingRight: '80px'}}>
					<Markdown source={``}/>
				</div>
			</div>
		);
	}
});
