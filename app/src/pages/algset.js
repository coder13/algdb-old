const _ = require('lodash');
const app = require('ampersand-app');
const React = require('react');
const {Panel, Input, Button, ButtonGroup, Modal, Glyphicon} = require('react-bootstrap');
const Markdown = require('react-markdown');
const ampersandReactMixin = require('ampersand-react-mixin');
const Assets = require('../assets');
const AlgsetIcon = require('../components/algset-icon');
const Alg = require('../components/alg');
const Cube = require('../components/cube');
const EditCaseModal = require('../components/editCaseModal');
const resize = require('../helpers/react-resize-mixin');
const Case = require('../models/case');
const CubeModel = require('../models/cube');

const Description = React.createClass({
	displayName: 'Description',
	mixins: [ampersandReactMixin],

	getDefaultProps () {
		return {
			algset: {},
			editable: false
		};
	},

	getInitialState () {
		return {
			editing: false
		};
	},

	edit () {
		this.setState({editing: true});
	},

	onChange (e) {
		this.props.algset.description = e.target.value;
	},

	onKeyDown (e) {
		if (e.keyCode === 13) {
			this.setState({editing: false});
			this.props.algset.save(); // done editing, save model;
		}
	},

	render () {
		let size = Math.max(window.innerWidth / 12, 64);
		let {algset} = this.props;
		let {editing} = this.state;

		let image = '';
		if (algset.image) {
			image = (<img width={`${size}px`} src={Assets[algset.image || 'blank']} alt={Assets.blank}/>);
		} else {
			let cube = _.merge({}, solved(), this.props.algset.cube);
			image = <Cube size={size} cube={cube} mask={cube.mask}/>;
		}

		const header = (<div>
			<span style={{fontSize: '18px'}}>Description</span>
			{this.props.editable ?
				<Glyphicon glyph='pencil' style={{float: 'right', marginRight: '10px', cursor: 'pointer'}} onClick={this.edit}/> : false}
		</div>);

		return (
				<Panel header={header} bsStyle='primary'>
				<div className='panel-body container-fluid' style={{paddingLeft: '0px'}}>
					<div className='col-xs-12 col-sm-10'>
						{!editing ?
							<Markdown source={algset.description || ''} style={{wordWrap: 'break-word'}}/> :
							<Input ref='input' type='textarea' defaultValue={algset.description} style={{
								height: '250px'
							}} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
						}
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
	mixins: [ampersandReactMixin],

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
					<AlgsetIcon key={index} algset={set} parent={algset} href={`/algsets/${algset.id}/${set.id || set.name}`}/>
				)}</div>
			</Panel>
		);
	}
});

const Cases = React.createClass({
	displayName: 'Cases',
	mixins: [ampersandReactMixin],

	getDefaultProps () {
		return {
			algset: {}
		};
	},

	showCaseModal (status, _case) {
		if (status === 'edit') {
			this.refs.addCase.open('edit', _case);
		} else {
			this.refs.addCase.open('add');
		}
	},

	addCase (state) {
		let c = this.props.algset.addCase({
			name: state.name,
			cube: state.cube
		});
		this.props.algset.save();
		this.forceUpdate();
	},

	render () {
		let size = Math.min(Math.max(window.innerWidth / 12, 40), 120);
		let {algset, editable} = this.props;
		let {cases, cube} = algset;

		cube = new CubeModel(cube);

		let casesHeader = (
			<div>
				<h1 style={{fontSize: '2em'}}>Cases</h1>
			</div>
		);

		let addGlyph = <Glyphicon glyph='plus' style={{cursor: 'pointer'}}/>;
		let removeGlyph = <Glyphicon glyph='remove' style={{color: '#d32', cursor: 'pointer'}}/>;
		let editGlyph = <Glyphicon glyph='pencil' style={{cursor: 'pointer'}}/>;

		return (
			<Panel header={casesHeader} style={{margin: '0px'}}>
					<EditCaseModal ref='addCase' submit={this.addCase}/>
					<table className='table'>
						<thead>
							<tr>
								<th style={{width: '1em'}}>#</th>
								<th style={{width: `${size}px`}}>Case</th>
								<th style={{width: 'auto'}}>Algs</th>
								{app.admin ? <th style={{width: '100px'}}></th> : null}
							</tr>
						</thead>
						<tbody>
							{cases.map((_case,index) => {
								let caseCube = cube.merge(_case.cube);
								return (
									<tr key={index}>
										<td>{_case.name || (index + 1)}</td>
										<td>
											<Cube rotate={_case.rotate} cube={caseCube} mask={cube.mask} size={size}/>
										</td>
										<td>
											{_case.algs.map((alg, i) =>
												<Alg key={i} alg={alg} editable={editable} case={_case} algset={algset}/>
											)}
											{editable ? <Button onClick={() => _case.addAlg()}>{addGlyph}</Button> : null}
										</td>
										{editable ?
										<td>
											<ButtonGroup>
												<Button onClick={() => this.showCaseModal('edit', _case)}>{editGlyph}</Button>
												<Button onClick={() => algset.removeCase(_case)}>{removeGlyph}</Button>
											</ButtonGroup>
										</td> : null}
									</tr>
								);
							})}
						</tbody>
					</table>
					{editable ? <Button onClick={() => this.showCaseModal('add')}>Add Case</Button> : ''}
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
			editable: false
		};
	},

	destroy () {
		this.props.algset.destroy();
		app.router.navigate('/');
	},

	render () {
		let {algset, editable} = this.props;
		let {abbrev, subsets, cases} = algset;

		// Some fun. Different handler based off of path length...might go away.
		const preName = this.props.path ? (this.props.path.length < 3 ? ({
			1: () => '',
			2: path => path[0]
		})[this.props.path.length](this.props.path) : this.props.path.slice(1, -1)).toUpperCase() : false;

		abbrev = abbrev && abbrev !== algset.name ? <small>({abbrev})</small> : false;

		return (
			<div>
				<div className='page-header' style={{marginTop: '20px'}}>
					<h1 className='text-center'>{preName} {algset.name} {abbrev}</h1>
				</div>

				<Description algset={algset} editable={editable}/>
				{(subsets && subsets.length) || editable ? <Subsets algset={algset} editable={editable}/> : false}
				{(cases && cases.length) || editable ? <Cases algset={algset} editable={editable}/> : false}
				{editable ? <Button bsStyle='danger' onClick={this.destroy} style={{margin: '1vw', marginLeft: '2vw'}}>Delete Algset</Button> : false}
			</div>
		);
	}
});
