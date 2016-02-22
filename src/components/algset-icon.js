const _ = require('lodash');
const React = require('react');
const Markdown = require('react-markdown');
const Assets = require('../assets');
const Cube = require('./cube.js');

module.exports = React.createClass({
	displayName: 'Algset',

	style: {
		width: 'auto',
		height: 'auto',
		margin: '10px',
		padding: '15px',
		display: 'inline-block'
	},

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	componentWillMount () {
		console.log('algsetIcon', this.props)
	},

	render () {
		let size = 60;

		let image = '';
		if (this.props.algset.image) {
			image = (<img width='100px' src={Assets[this.props.algset.image]} alt={Assets.blank}/>)
		} else if (this.props.algset.cube) {
			image = <Cube size={size} cube={_.merge(solved(), this.props.algset.cube)}/>;
		}

		return (
			<a href={this.props.href}><div className='jumbotron contianer' style={this.style}>
				{image}
				<h3 style={{textAlign: 'center'}}>{this.props.algset.name}</h3>
			</div></a>
		);
	}
});
