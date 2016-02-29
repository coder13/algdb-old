const _ = require('lodash');
const React = require('react');
const Markdown = require('react-markdown');
const Assets = require('../assets');
const Cube = require('./cube.js');

module.exports = React.createClass({
	displayName: 'Algset',

	style: {
		width: '20vh',
		height: '25vh',
		margin: '10px',
		padding: '10px',
		display: 'inline-block',
		backgroundColor: '#3f3f3f7f',
		color: '#333'
	},

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	delete () {

	},

	render () {
		let size = 60;

		let image = '';
		if (this.props.algset.cube) {
			image = <Cube size={size} cube={_.merge(solved(), this.props.algset.cube)}/>;
		} else if (this.props.algset.image) {
			image = (<img width='100px' src={Assets[this.props.algset.image]} alt={Assets.blank}/>);
		} else {
			image = (<img width='100px' src={Assets[this.props.algset.image]} alt={Assets.blank}/>);
			image = (<img width='100px' src={Assets.blank} alt={Assets.blank}/>);
		}

		return (
			<a href={this.props.href} style={{color: 'inherit', textDecoration: 'none'}}>
				<div className='well container' style={this.style}>
					{image}
					<h3 style={{textAlign: 'center'}}>{this.props.algset.name}</h3>
				</div>
			</a>
		);
	}
});
