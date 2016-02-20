const React = require('react');
const Markdown = require('react-markdown');
const AlgsetIcon = require('../components/algset-icon');
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

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	componentWillMount () {
		console.log('algset', this.props)
	},

	render () {
		let puzzle = 3;
		let size = 80;
		let colStyle = {minWidth: '10%', width: '10%'};

		let algset = this.props.algset;

		let abbrev = algset.abbrev;
		let subsets = algset.subsets ? algset.subsets.map(name => app.findAlgset(name)).filter(i=>!!i) : false;
		console.log(33, subsets)

		return (
			<div className='well row'>
				<div className='page-header' style={{marginTop: '-20px'}}>
					<h1 className='text-center'>{algset.name} {abbrev ? <small>({abbrev})</small> : ''}</h1>
				</div>
				<div>
					<div className='panel panel-primary' style={{margin: '0px'}}>
						<div className='panel-heading' style={{paddingLeft: '50px'}}><h4 style={{pading: '0px', margin: '2px'}}>Description</h4></div>
						<div className='panel-body' style={{paddingLeft: '15px'}}>
							<div style={{display: 'inline-block', width: '75%'}}>
								<Markdown source={algset.description}/>
							</div>
							<div className='well' style={{margin: '0px', width: '20%', height: '100%', float: 'right', }}>
								{algset.image ? <img src={Assets[algset.image]} alt={Assets.blank} align='middle' width='100px'/> : ''} 
								<hr/>
								<p>No. of algs: <span style={{color: 'grey'}}>2</span></p>
								<p>avg moves: <span style={{color: 'grey'}}>2</span></p>
							</div>
						</div>
					</div>
				</div>
				{subsets ?
				<div className='panel panel-default'>
				<div className='panel-body' style={{paddingLeft: '5px'}}>
					<h1 className='text-center'>Subsets</h1>
					<div className='container'>{subsets.map((set, index) => (<AlgsetIcon key={index} algset={set}/>))}</div>
				</div>
				</div> : ''}
			</div>
		);
	}
});
