const _ = require('lodash');
const React = require('react');
const Markdown = require('react-markdown');
const resize = require('../helpers/react-resize-mixin');
const Assets = require('../assets');
const Cube = require('./cube.js');

module.exports = React.createClass({
	displayName: 'Algset',
	mixins: [resize],

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
		let size = Math.max(window.innerWidth / 10, 40);
		let algset = this.props.algset;


		let imgStyle = {
			display: 'block',
			margin: '0 auto'
		};

		let image = '';
		if (algset.image) {
			image = (<img width='80%' src={Assets[algset.image]} alt={Assets.blank} style={imgStyle}/>);
		} else if (algset.cube) {
			let parent = {};
			if (this.props.parent) {
				parent = this.props.parent.cube ? this.props.parent.cube : this.props.parent;
			}

			let mask = (parent.mask) | (algset.mask);
			image = <Cube size='60%' cube={_.merge(solved(), parent, algset.cube)} mask={mask} style={imgStyle}/>;

		} else {
			image = (<img width='80%' src={Assets.blank} alt={Assets.blank}/>);
		}

		return (
			<a href={this.props.href} style={{color: 'inherit', textDecoration: 'none'}}>
				<div className='well container' style={this.style}>
					{image}
					<h3 style={{textAlign: 'center'}}>{algset.abbrev || algset.name}</h3>
				</div>
			</a>
		);
	}
});
