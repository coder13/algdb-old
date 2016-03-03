const app = require('ampersand-app');
const React = require('react');
const {Panel} = require('react-bootstrap');
const Markdown = require('react-markdown');
const ampersandReactMixin = require('ampersand-react-mixin');
const Assets = require('../assets');
const AlgsetIcon = require('../components/algset-icon');
const Alg = require('../components/alg');
const resize = require('../helpers/react-resize-mixin');

const Description = React.createClass({
	displayName: 'Description',

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	render () {
		let size = Math.max(window.innerWidth / 12, 64);
		let {algset} = this.props;

		let image = '';
		if (algset.cube) {
			let cube = _.merge({}, solved(), this.props.algset.cube);
			image = <Cube size={size} cube={cube} mask={cube.mask}/>;
		} else {
			image = (<img width={`${size}px`} src={Assets[algset.image || 'blank']} alt={Assets.blank}/>);
		}

		return (
				<Panel header='Description' bsStyle='primary'>
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
			</Panel>
		);
	}
});

const Subsets = React.createClass({
	displayName: 'Subsets',

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	render () {
		let size = Math.max(window.innerWidth / 12, 64);
		let {algset} = this.props;
		let {subsets} = algset;

		subsets = subsets ? subsets.map(name => app.findAlgset(name)).filter(i=>!!i) : false;

		return (
			<Panel header={<h1 style={{paddingLeft: '50px'}}>Subsets</h1>} style={{margin: '0px'}}>
				<div className='container'>{subsets.map((set, index) =>
					<AlgsetIcon key={index} algset={set} parent={algset} href={`/algset/${algset.id}/${set.id || set.name}`}/>
				)}</div>
			</Panel>
		);
	}
});

const Cases = React.createClass({
	displayName: 'Cases',

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	render () {
		let size = Math.max(window.innerWidth / 20, 40);
		let {algset} = this.props;
		let {cases} = algset;

		let cube = _.merge({}, algset.cube, solved());
		cases = cases ? cases.map(function (_case) {
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

		let casesHeader = (
			<div>
				<h1 style={{fontSize: '36px'}}>Cases</h1>
			</div>
		);

		return (
			<Panel header={casesHeader} collapsible defaultExpanded style={{margin: '0px'}}>
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
				</Panel>
		);
	}
});

module.exports = React.createClass({
	displayName: 'Algset',
	mixins: [ampersandReactMixin, resize],

	getDefaultProps () {
		return {
			algset: {},
			path: '',
			initialEditing: false
		};
	},

	getIntiailState () {
		return {
			editing: this.props.initialEditing // description / cases / subsets
		};
	},

	render () {
		let colStyle = {minWidth: '10%', width: '10%'};

		let {algset} = this.props;
		let {abbrev, subsets, cases} = algset;

		// Some fun. Different handler based off of path length...might go away.
		const preName = this.props.path ? (this.props.path.length < 3 ? ({
			1: () => '',
			2: path => path[0]
		})[this.props.path.length](this.props.path) : this.props.path.slice(1, -1)).toUpperCase() : '';

		return (
			<div>
				<div className='page-header' style={{marginTop: '20px'}}>
					<h1 className='text-center'>{preName} {algset.name} {abbrev && abbrev !== algset.name ? <small>({abbrev})</small> : ''}</h1>
				</div>
				<Description algset={algset}/>

				{subsets ? <Subsets algset={algset}/> : ''}
				{cases ? <Cases algset={algset}/> : ''}
			</div>
		);
	}
});
