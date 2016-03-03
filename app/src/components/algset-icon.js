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
		let size = 100;
		let algset = this.props.algset;

		let image = '';
		if (algset.cube || algset.cp || algset.co || algset.ep || algset.eo) {
			let parent = {};
			if (this.props.parent) {
				parent = this.props.parent.cube ? this.props.parent.cube : this.props.parent;
			}

			let mask = (parent.mask) | (algset.mask);
			image = <Cube size={size} cube={_.merge(solved(), parent, algset.cube, {
				corners: {
					perm: algset.cp,
					orient: algset.co
				},
				edges: {
					perm: algset.ep,
					orient: algset.eo
				}
			})} mask={mask} />;
		} else if (algset.image) {
			image = (<img width='100px' src={Assets[algset.image]} alt={Assets.blank}/>);
		} else {
			image = (<img width='100px' src={Assets.blank} alt={Assets.blank}/>);
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
