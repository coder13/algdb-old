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
		let size = 100;
		let colStyle = {minWidth: '10%', width: '10%'};

		let algset = this.props.algset;

		let abbrev = algset.abbrev;
		let subsets = algset.subsets ? algset.subsets.map(name => app.findAlgset(name)).filter(i=>!!i) : false;
		let cases = algset.cases;// ? algset.subsets.map(name => app.findAlgset(name)).filter(i=>!!i) : false;
		console.log(33, subsets)

		return (
			<div className='well row'>
				<div className='page-header' style={{marginTop: '-20px'}}>
					<h1 className='text-center'>{this.props.path[0]} {algset.name} {abbrev ? <small>({abbrev})</small> : ''}</h1>
				</div>
				<div>
					<div className='panel panel-primary' style={{margin: '0px'}}>
						<div className='panel-heading' style={{paddingLeft: '50px'}}>
							<h4 style={{margin: '2px'}}>Description</h4>
						</div>
						<div className='panel-body' style={{paddingLeft: '0px'}}>
							<div className='col-sm-10' style={{display: 'inline-block'}}>
								<Markdown source={algset.description} style={{wordWrap: 'break-word'}}/>
							</div>
							<div className='well col-sm-2' style={{margin: '0px', height: '100%'}}>
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
					<div className='panel-heading' style={{paddingLeft: '50px'}}>
						<h1>Subsets</h1>
					</div>
					<div className='panel-body' style={{paddingLeft: '5px'}}>
						<div className='container'>{subsets.map((set, index) => (<AlgsetIcon key={index} algset={set} href={`/set/${algset.id}/${set.id||set.name}`}/>))}</div>
					</div>
					</div> : ''}
				{cases ?
					<div className='panel panel-default'>
					<div className='panel-heading' style={{paddingLeft: '50px'}}>
						<h1>Cases</h1>
					</div>
					<div className='panel-body' style={{paddingLeft: '5px'}}>
						<div className='container'>{}</div>
					</div>
					</div> : ''}
			</div>
		);
	}
});
