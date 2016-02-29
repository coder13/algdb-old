const app = require('ampersand-app');
const React = require('react');
const ampersandReactMixin = require('ampersand-react-mixin');
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

		let addAlgset = (
			<a style={{color: 'inherit', cursor: 'pointer'}} onClick={app.addAlgset}>
				<div className='well container' style={{
					display: 'inline-block',
					fontSize: '80px',
					margin: '10px',
					padding: 'auto',
					width: '20vh',
					height: '25vh',
					textAlign: 'center'
				}}>
					<span className='glyphicon glyphicon-plus'/>
				</div>
			</a>
		);

		return (
			<div>
				<div className='page-header' style={{margin: '20px'}}>
					<h1 className='text-center' style={{margin: '20px'}}>AlgDB <small>(clone)</small></h1>
				</div>
				<div className='panel panel-primary'>
					<div className='panel-heading' style={{paddingLeft: '50px'}}>
						<h1>Algsets</h1>
					</div>
					<div className='panel-body row-fluid' style={{paddingLeft: '5px'}}>
						{algsets.map((algset, index) =>
							<div className='pull-left'>
								<AlgsetIcon key={index} algset={algset} href={`/algset/${algset.id || algset.name}`}/>
							</div>
						)}
						<div className='pull-left'>
							{app.admin ? addAlgset : ''}
						</div>
					</div>
				</div>
			</div>
		);
	}
});
