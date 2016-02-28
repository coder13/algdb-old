const app = require('ampersand-app');
const ampersandReactMixin = require('ampersand-react-mixin');
const React = require('react');
const Markdown = require('react-markdown');
const AlgsetIcon = require('../components/algset-icon');

module.exports = React.createClass({
	displayName: 'HomePage',
	mixins: [ampersandReactMixin],

	getDefaultProps () {
		return {
			algsets: []
		};
	},

	render () {
		console.log(this.props.algsets);
		let algsets = this.props.algsets.models;
		console.log(algsets);

		return (
			<div>
				<div className='page-header' style={{margin: '20px'}}>
					<h1 className='text-center' style={{margin: '20px'}}>AlgDB <small>(clone)</small></h1>
				</div>
				<div className='panel panel-primary'>
					<div className='panel-heading' style={{paddingLeft: '50px'}}>
						<h1>Algsets</h1>
					</div>
					<div className='panel-body' style={{paddingLeft: '5px'}}>
					{algsets.map((algset, index) =>
						<AlgsetIcon key={index} algset={algset} href={`/algset/${algset.id || algset.name}`}/>
					)}
					</div>
				</div>
			</div>
		);
	}
});
