const React = require('react');

const Types = {
	'*': (<span key={0} style={{marginLeft: '.5em'}} className='label label-default'>*</span>),
	'TH': (<span key={1} style={{marginLeft: '.5em'}} className='label label-primary'>TH</span>),
	'OH': (<span key={2} style={{marginLeft: '.5em'}} className='label label-success'>OH</span>),
	'OP': (<span key={3} style={{marginLeft: '.5em'}} className='label label-info'>optimal</span>)
};

module.exports = React.createClass({
	displayName: 'Alg',

	getDefaultProps () {
		return {
			editable: false,
			type: '*',
			auf: '',
			alg: ''
		};
	},

	getInitialState () {
		return {
			editing: false
		};
	},

	edit () {
		if (this.editable) {
			this.setState({
				editing: true
			});
		}
	},

	render () {
		let {type, auf, alg} = this.props;

		let aufSpan = auf ? (<span className='auf'>[{auf}]</span>) : '';
		let types = type ? (typeof type === 'string' ? Types[type] : (Array.isArray(type) ? type.map((t, i) => Types[t]) : '')) : '';
		return (<p className='alg'>{aufSpan} {alg} {types}</p>);
	}
});
