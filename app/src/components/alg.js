const React = require('react');
const ReactDOM = require('react-dom');
const {Input, Button} = require('react-bootstrap');

const Types = {
	'*': (<span key={0} style={{marginLeft: '.5em'}} className='label label-default'>*</span>),
	'TH': (<span key={1} style={{marginLeft: '.5em'}} className='label label-primary'>TH</span>),
	'OH': (<span key={2} style={{marginLeft: '.5em'}} className='label label-success'>OH</span>),
	'OP': (<span key={3} style={{marginLeft: '.5em'}} className='label label-info'>optimal</span>)
};

module.exports = React.createClass({
	displayName: 'Alg',

	getDefaultProps () {
		return {
			editable: false,
			alg: {
				auf: '',
				alg: '',
				type: ''
			}
		};
	},

	getInitialState () {
		return {
			editing: false,
			auf: this.props.alg.auf,
			alg: this.props.alg.alg,
			type: this.props.alg.type
		};
	},

	edit () {
		if (this.props.editable && !this.state.editing) {
			this.setState({
				editing: true
			});
			this.forceUpdate();
		}
	},

	onKeyDown (e) {
		if (e.keyCode === 13) { // enter
			this.props.alg.auf = this.state.auf;
			this.props.alg.alg = this.state.alg;
			this.props.alg.type = this.state.type;

			if (this.props.algset) {
				this.props.algset.save();
			}

			this.setState({
				editing: false
			});
		} else if (e.keyCode === 9) {
			this.onBlur();
			e.preventDefault();
		}
	},

	onChangeAlg (e) {
		this.setState({alg: e.target.value});
	},

	onChangeAuf (e) {
		this.setState({auf: e.target.value});
	},

	types (type) {
		if (!type) {
			return '';
		} if (typeof type === 'string') {
			return Types[type];
		}
		return Array.isArray(type) ? type.map((t, i) => Types[t]) : '';
	},

	onBlur (e) {
		this.setState({editing: false});
	},

	render () {
		let {type, auf, alg} = this.props.alg;

		if (this.state.editing) {
			let aufSelect = (
				<select className='form-control' autoFocus type='select' defaultValue={auf} onChange={this.onChangeAuf}
					style={{width: '65px', paddingLeft: '3px'}} onKeyDown={this.onKeyDownAuf}>
					<option value="" > </option>
					<option value="U" >U</option>
					<option value="U'">U'</option>
					<option value="U2">U2</option>
				</select>
			);

			return (
				<div className='input-group' style={{marginBottom: '2px', marginTop: '2px'}}>
					<span className='input-group-btn' style={{padding: '0px'}}>{aufSelect}</span>
					<Input type='text' defaultValue={alg} onChange={this.onChangeAlg} onKeyDown={this.onKeyDown}
						onBlur={this.onBlur}/>
				</div>
			);
		}

		let aufSpan = auf ? (<span className='auf'>[{auf}]</span>) : '';
		let types = this.types(type);
		return (<p className='alg' onClick={this.edit}>{aufSpan} {alg} {types}</p>);
	}
});
