const _ = require('lodash');
const app = require('ampersand-app');
const React = require('react');
const {Panel, Input, Button, Modal, Row, Col, Glyphicon} = require('react-bootstrap');
const Markdown = require('react-markdown');
const ampersandReactMixin = require('ampersand-react-mixin');
const Assets = require('../assets');
const AlgsetIcon = require('../components/algset-icon');
const Alg = require('../components/alg');
const Cube = require('../components/cube');
const resize = require('../helpers/react-resize-mixin');
const Case = require('../models/case');

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
					<AlgsetIcon key={index} algset={set} parent={algset} href={`/algset/${algset.id}/${set.id || set.name}`}/>
				)}</div>
			</Panel>
		);
	}
});

const AddCaseModal = React.createClass({
	getInitialState () {
		return {
			showModal: false,

			id: '',
			cube: solved(),
			scramble: ''
		};
	},

	open () {
		this.setState({showModal: true});
	},

	close () {
		this.setState({showModal: false});
	},

	changeName (e) {
		this.setState({
			id: e.target.value
		});
	},

	isArray (ref) {
		// try {
		// 	console.log(ref, this.refs);
		// 	JSON.parse(`[[${this.refs[ref].value}]]`);
		// 	return 'success';
		// } catch (e) {
		// 	console.log(136, e);
		// 	return 'error';
		// }
	},

	changeCP (e) {
		try {
			let value = JSON.parse(`${e.target.value}`);
			this.forceUpdate();
		} catch (e) {
			console.log(e);
		}
	},

	changeCO (e) {
		try {
			let value = JSON.parse(`${e.target.value}`);
			this.state.cube.corners.orient = value;
			this.forceUpdate();
		} catch (e) {
			console.log(e);
		}
	},

	changeEP (e) {
		try {
			let value = JSON.parse(`${e.target.value}`);
			this.state.cube.edges.perm = value;
			this.forceUpdate();
		} catch (e) {
			console.log(e);
		}
	},

	changeEO (e) {
		try {
			let value = JSON.parse(`${e.target.value}`);
			this.state.cube.edges.orient = value;
			this.forceUpdate();
		} catch (e) {
			console.log(e);
		}
	},

	submit () {
		if (this.props.submit) {
			this.props.submit(this.state);
		}
		this.close();
	},

	render () {
		let {cube} = this.state;
		let cp = cube.corners.perm;
		let co = cube.corners.orient;
		let ep = cube.edges.perm;
		let eo = cube.edges.orient;

		return (
			<Modal show={this.state.showModal} style={{width: '25vw'}}>
				<Modal.Header>
					<Modal.Title>Add Case</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Input type='text' refs='name' addonBefore='Name' onChange={this.changeName}/>
					<Row>
						<Col sm={2}>
							<Cube size='100px' cube={cube}/>
						</Col>
						<Col sm={9} style={{margin: '10px'}}>
							<Input type='text' refs='cp' addonBefore='CP' defaultValue={cp} onChange={this.changeCP}
								bsStyle={this.isArray('cp')}/>
							<Input type='text' refs='co' addonBefore='CO' defaultValue={co} onChange={this.changeCO}
								bsStyle={this.isArray('co')}/>
							<Input type='text' refs='ep' addonBefore='EP' defaultValue={ep} onChange={this.changeEP}
								bsStyle={this.isArray('ep')}/>
							<Input type='text' refs='eo' addonBefore='EO' defaultValue={eo} onChange={this.changeEO}
								bsStyle={this.isArray('eo')}/>
							<Button bsStyle='primary' style={{width: '15%'}} onClick={this.submit}>Add</Button>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle='danger' style={{float: 'right'}} onClick={this.close}>Cancel</Button>
				</Modal.Footer>
			</Modal>
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

	showCaseModal () {
		this.refs.addCase.open();
	},

	addCase (options) {
		let c = this.props.algset.cases.addCase(new Case({
			id: options.id,
			cube: options.cube
		}));
		console.log(247, this.props.algset.cases, c);
		this.props.algset.save();
		this.forceUpdate();
	},

	// componentWillMount () {
	// 	this.props.algset.on('all', function (name, event) {
	// 		this.forceUpdate();
	// 	}, this);
	// },

	render () {
		let size = Math.max(window.innerWidth / 16, 40);
		let {algset, editable} = this.props;
		let {cases} = algset;

		let cube = _.merge({}, algset.cube, solved());

		let casesHeader = (
			<div>
				<h1 style={{fontSize: '36px'}}>Cases</h1>
			</div>
		);

		let addGlyph = <Glyphicon glyph='plus' style={{cursor: 'pointer'}}/>;
		let removeGlyph = <Glyphicon glyph='remove' style={{color: '#d32', cursor: 'pointer'}}/>;

		return (
			<Panel header={casesHeader} style={{margin: '0px'}}>
					<AddCaseModal ref='addCase' submit={this.addCase}/>
					<table className='table'>
						<thead>
							<tr>
								<th style={{width: '1em'}}>#</th>
								<th style={{width: `${size}px`}}>Case</th>
								<th style={{width: 'auto'}}>Algs</th>
								{app.admin ? <th style={{width: '1em'}}></th> : ''}
							</tr>
						</thead>
						<tbody>
							{cases.map((_case,index) => {
								let caseCube = _.merge({}, cube, _case.cube);
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
											<Button onClick={() => _case.addAlg()}>{addGlyph}</Button>
										</td>
										{editable ? <td><Button onClick={() => cases.remove(_case)}>{removeGlyph}</Button></td> : ''}
									</tr>
								);
							})}
						</tbody>
					</table>
					<Button onClick={this.showCaseModal}>Add Case</Button>
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

	render () {
		let colStyle = {minWidth: '10%', width: '10%'};

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
				{(subsets && subsets.length) || app.admin ? <Subsets algset={algset} editable={editable}/> : false}
				{(cases && cases.length) || app.admin ? <Cases algset={algset} editable={editable}/> : false}
			</div>
		);
	}
});
