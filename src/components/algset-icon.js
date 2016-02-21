const React = require('react');
const Markdown = require('react-markdown');
const Assets = require('../assets');

const OLL = {
	T:  [ 1,  0,  0, -1],
	U:  [-1,  0,  0,  1],
	H:  [ 1, -1,  1, -1],
	Pi: [-1, -1,  1,  1],
	L:  [-1,  0,  1,  0],
	S:  [ 1,  1,  1,  0],
	AS: [-1,  0, -1, -1],
};

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
		let size = 80;
		let image = this.props.algset.image;

		return (
			<a href={this.props.href}><div className='jumbotron contianer' style={this.style}>
				{this.props.algset.image ? <img width='100px' src={Assets[image]} alt={Assets.blank}/> : ''}
				<h3 style={{textAlign: 'center'}}>{this.props.algset.name}</h3>
			</div></a>
		);
	}
});
