const React = require('react');
const Markdown = require('react-markdown');
const Assets = require('../assets');
const AlgsetIcon = require('../components/algset-icon');
const Alg = require('../components/alg');


module.exports = React.createClass({
	displayName: 'Algset',

	getDefaultProps () {
		return {
			algset: {},
			path: ''
		};
	},

	getIntiailState () {
		return {
			editing: false
		};
	},

	componentWillMount () {
		window.addEventListener('resize', this.resize);
	},

	componentWillUnmount () {
		window.removeEventListener('resize', this.resize);
	},

	resize () {
		this.forceUpdate();
	},

	render () {
		let puzzle = 3;
		let size = Math.max(window.innerWidth / 12, 64);
		let colStyle = {minWidth: '10%', width: '10%'};

		let algset = this.props.algset;

		let cube = solved();
		let image = '';
		if (algset.image) {
			image = (<img width={`${Math.max(window.innerWidth / 10, 64)}px`} src={Assets[algset.image]} alt={Assets.blank}/>);
		} else if (algset.cube) {
			_.merge(cube, this.props.algset.cube);
			image = <Cube size={size} cube={cube} mask={cube.mask}/>;
		}

		let abbrev = algset.abbrev;
		let subsets = algset.subsets ? algset.subsets.map(name => app.findAlgset(name)).filter(i=>!!i) : false;
		let cases = algset.cases ? algset.cases.map(function (_case) {
			// ugh
			let caseCube = caseCube = _.merge({}, cube, _case.cube, {
				corners: {
					perm: _case.cp,
					orient: _case.co
				},
				edges: {
					perm: _case.ep,
					orient: _case.eo
				}
			});

			return _.merge({}, _case, {cube: caseCube});
		}) : undefined;

		// Some fun. Different handler based off of path length...might go away.
		const preName = this.props.path ? (this.props.path.length < 3 ? ({
			1: () => '',
			2: path => path[0]
		})[this.props.path.length](this.props.path) : this.props.path.slice(1, -1)).toUpperCase() : '';

		return (
			<div className=''>
				<div className='page-header' style={{marginTop: '20px'}}>
					<h1 className='text-center'>{preName} {algset.name} {abbrev ? <small>({abbrev})</small> : ''}</h1>
				</div>
				<div>
					<div className='panel panel-primary' style={{margin: '0px'}}>
						<div className='panel-heading' style={{paddingLeft: '50px'}}>
							<h4 style={{margin: '2px'}}>Description</h4>
						</div>
						<div className='panel-body container-fluid' style={{paddingLeft: '0px'}}>
							<div className='col-xs-12 col-sm-10'>
								<Markdown source={algset.description || ''} style={{wordWrap: 'break-word'}}/>
							</div>
							<div className='well col-xs-12 col-sm-2' style={{margin: '0px', padding: 'auto', height: '100%', float: 'right'}}>
								{image}
								<hr/>
								<p>No. of algs: <span style={{color: 'grey'}}>{algset.caseCount}</span></p>
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
						<div className='container'>{subsets.map((set, index) => (<AlgsetIcon key={index} algset={set} href={`/set/${algset.id}/${set.id || set.name}`}/>))}</div>
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
										<th style={{width: 'auto'}}>Algs</th>
										<th>Comment</th>
									</tr>
								</thead>
								<tbody>
									{cases.map((_case,index) => (
										<tr key={index}>
											<td>{_case.name || (index + 1)}</td>
											<td><Cube puzzle={3} rotate={_case.rotate} cube={_case.cube} mask={cube.mask} size={size}/></td>
											<td>
											{_case.algs ? _case.algs.map((alg, i) =>
												(<Alg key={i} type={alg.type} auf={alg.auf} alg={alg.alg}/>)
											) : ''}
											<button className='btn btn-default'><span className='glyphicon glyphicon-plus'/></button>
											</td>
											<td>{_case.comment}</td>
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
