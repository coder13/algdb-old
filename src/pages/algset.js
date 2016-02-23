const React = require('react');
const Markdown = require('react-markdown');
const AlgsetIcon = require('../components/algset-icon');
const Assets = require('../assets');

const Types = {
	'*': (<span style={{marginLeft: '.5em'}} className='label label-default'>*</span>),
	'TH': (<span style={{marginLeft: '.5em'}} className='label label-primary'>TH</span>),
	'OH': (<span style={{marginLeft: '.5em'}} className='label label-success'>OH</span>),
	'OP': (<span style={{marginLeft: '.5em'}} className='label label-info'>optimal</span>),
}

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

		let cube = solved();
		let image = '';
		if (algset.image) {
			image = (<img width='100px' src={Assets[algset.image]} alt={Assets.blank}/>)
		} else if (algset.cube) {
			_.merge(cube, this.props.algset.cube);
			image = <Cube size={size} cube={cube} mask={cube.mask}/>;
		}

		let abbrev = algset.abbrev;
		let subsets = algset.subsets ? algset.subsets.map(name => app.findAlgset(name)).filter(i=>!!i) : false;
		let cases = algset.cases.map(function (_case) {
			// ugh
			let caseCube = _case.cube ? _.merge({}, cube, _case.cube) : cube;
			if (_case.cp) {
				caseCube = _.merge({}, caseCube, {corners: {perm: _case.cp}});
			} else if (_case.co) {
				caseCube = _.merge({}, caseCube, {corners: {orient: _case.co}});
			} else if (_case.ep) {
				caseCube = _.merge({}, caseCube, {edges: {perm: _case.ep}});
			} else if (_case.eo) {
				caseCube = _.merge({}, caseCube, {edges: {orient: _case.eo}});
			}

			return _.merge({}, _case, {cube: caseCube});
		});

		const preName = (this.props.path.length > 2 ? this.props.path.slice(1, -1) : this.props.path[0]).toUpperCase();

		return (
			<div className='well row'>
				<div className='page-header' style={{marginTop: '-20px'}}>
					<h1 className='text-center'>{preName} {algset.name} {abbrev ? <small>({abbrev})</small> : ''}</h1>
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
							<div className='well col-sm-2' style={{margin: '0px', padding: 'auto', height: '100%'}}>
								{image}
								<hr/>
								<p>No. of algs: <span style={{color: 'grey'}}>2</span></p>
								<p>avg moves: <span style={{color: 'grey'}}>2</span></p>
							</div>
						</div>
					</div>
				</div>
				{subsets ?
					<div className='panel panel-default' style={{margin: '0px'}}>
					<div className='panel-heading' style={{paddingLeft: '50px'}}>
						<h1>Subsets</h1>
					</div>
					<div className='panel-body' style={{paddingLeft: '5px'}}>
						<div className='container'>{subsets.map((set, index) => (<AlgsetIcon key={index} algset={set} href={`/set/${algset.id}/${set.id||set.name}`}/>))}</div>
					</div>
					</div> : ''}
				{cases ?
					<div className='panel panel-default' style={{margin: '0px'}}>
						<div className='panel-heading' style={{paddingLeft: '50px'}}>
							<h1>Cases</h1>
						</div>
						<div className='panel-body' style={{paddingLeft: '5px'}}>
							<table className='table'>
								<thead>
									<tr>
										<th style={{width: '1em'}}>#</th>
										<th style={{width: `${size}px`}}>Case</th>
										<th style={{width: '400px'}}>Algs</th>
										<th>Comment</th>
									</tr>
								</thead>
								<tbody>
									{cases.map((_case,index) => (
										<tr key={index}>
											<td>{index+1}</td>
											<td><Cube puzzle={3} cube={_case.cube} mask={cube.mask} size={size}/></td>
											<td>
											{_case.algs ? _case.algs.map(function (alg, i) {
												let aufSpan = alg.auf ? (<span className='auf'>[{alg.auf}]</span>) : '';
												let types = alg.type ? (typeof alg.type === 'string' ? Types[alg.type] : (Array.isArray(alg.type) ? alg.type.map((t, i) => Types[t]) : '')) : '';
												return (<p className='alg' key={i} style={{font: "1em 'monospace'"}}>{aufSpan} {alg.alg} {types}<br/></p>);
											}) : ''}
											</td>
											<td></td>
										</tr>)
									)}
								</tbody>
							</table>
						</div>
					</div> : ''}
			</div>
		);
	}
});
