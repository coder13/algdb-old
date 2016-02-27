const app = require('ampersand-app');
const React = require('react');
const Markdown = require('react-markdown');
const AlgsetIcon = require('../components/algset-icon');

module.exports = React.createClass({
	displayName: 'HomePage',

	render () {
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
					{app.DB.filter(algset => algset.listOnHomePage !== false).map((algset, index) =>
						<AlgsetIcon key={index} algset={algset}  href={`/set/${algset.id || algset.name}`}/>)}
					</div>
				</div>
			</div>
		);
	}
});
