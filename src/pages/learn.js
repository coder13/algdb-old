const _ = require('lodash');
const React = require('react');
const CheckboxGroup = require('react-checkbox-group')
const Cube = require('../components/cube');
const DB = require('../data/cll.js');

const intersects = (a,b) => a.filter(i => b.indexOf(i) !== -1)

const Types = {
	'*': (<span style={{marginLeft: '.5em'}} className='label label-default'>*</span>),
	'TH': (<span style={{marginLeft: '.5em'}} className='label label-primary'>TH</span>),
	'OH': (<span style={{marginLeft: '.5em'}} className='label label-success'>OH</span>),
	'OP': (<span style={{marginLeft: '.5em'}} className='label label-info'>optimal</span>),
}

const Alg = function (alg, auf, type) {
	let aufSpan = auf ? (<span style={{color: 'black'}}>[{auf}]</span>) : '';
	let types = type ? (typeof type === 'string' ? Types[type] : type.map((t, i) => Types[t])) : '';
	return (<code style={{font: "1em 'monospace'"}}>{aufSpan} {alg}{types}<br/></code>);
};

module.exports = React.createClass({
	displayName: 'HomePage',

	componentWillMount () {
		console.log('learn page. Props:', this.props);
	},

	componentDidMount () {
        window.addEventListener('resize', this.resize);
	},

	componentWillUnmount () {
        window.removeEventListener('resize', this.resize);
	},

	getInitialState () {
		return {
			filterCaseType: app.me.filterCaseType,
			filterAlgType: app.me.filterAlgType
		};
	},

	resize (event) {
		this.forceUpdate();
	},

	filter () {
		this.state.filterCaseType = this.refs.filterCaseType.getCheckedValues();
		this.state.filterAlgType = this.refs.filterAlgType.getCheckedValues();
		app.me.filterCaseType = this.state.filterCaseType;
		app.me.filterAlgType = this.state.filterAlgType;
		app.me.save();

		this.forceUpdate();
	},

	render () {	
		// let size = window.innerWidth / 13;
		// size = size < 80 ? 80 : size;
		let size = 100;

		let recognition = DB.subsets[this.props.oll].recognition
		let oll = DB.subsets[this.props.oll].oll;
		let cases = DB.subsets[this.props.oll].cases;

		let filterCaseType = this.state.filterCaseType;
		let filterAlgType = this.state.filterAlgType;

		let algFilter = function (alg) {
			let showAlgCauseCaseType = filterCaseType.length === 0 || (typeof alg.type === 'string' ? filterCaseType.indexOf(alg.type) !== -1 || alg.type === '*' : intersects(alg.type, filterCaseType).length !== 0);
			let showAlgCauseAlgType = filterAlgType.length === 0 || (filterAlgType.indexOf(alg.moveSet) !== -1) || alg.moveSet === 'RU';

			return (showAlgCauseCaseType && showAlgCauseAlgType);
		};

		return (
			<div>
				{recognition ? <div className='row'>
					<div className='panel panel-primary'>
						<div className='panel-heading' style={{paddingLeft: '50px'}}>Recognition</div>
						<div className='panel-body' style={{paddingLeft: '50px'}}>{recognition}</div>
					</div>
				</div> : ''}
				<div className='row' style={{margin: '2px'}}>
					<div className='col-sm-2'>
						<div className='panel panel-default'>
							<div className='panel-heading'>Show Only:</div>
							<div className='panel-body' style={{padding: '0px'}}>
								<div className='panel panel-default' style={{margin: '0px'}}>
									<div className='panel-heading'>Case Types</div>
									<div className='panel-body checkbox'>
										<CheckboxGroup name='case_type' ref='filterCaseType' value={this.state.filterCaseType} onChange={this.filter}>
											<label><input type='checkbox' value='TH'/>TH</label><br/>
											<label><input type='checkbox' value='OH'/>OH</label><br/>
											<label><input type='checkbox' value='optimal'/>optimal</label><br/>
										</CheckboxGroup>
									</div>
								</div>
								<div className='panel panel-default' style={{margin: '0px'}}>
									<div className='panel-heading'>Alg type</div>
									<div className='panel-body checkbox'>
										<CheckboxGroup name='case_type' ref='filterAlgType' value={this.state.filterAlgType}  onChange={this.filter}>
											<label><input type='checkbox' value='RUD'/>RUD</label><br/>
											<label><input type='checkbox' value='RUF'/>RUF</label><br/>
											<label><input type='checkbox' value='RUL'/>RUL</label><br/>
										</CheckboxGroup>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-sm-10 well'>
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
									<td><Cube puzzle={3} oll={oll} perm={_case.perm} size={size}/></td>
									<td>
									{_case.algs ? _case.algs.filter(algFilter).map((alg, index) => (
										<Alg key={index} alg={alg.alg} auf={alg.auf} type={alg.type}/>
									)) : ''}
									</td>
									<td></td>
								</tr>))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
});
