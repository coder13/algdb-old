const React = require('react');
const ReactDOM = require('react-dom');
const {Input, Button, ButtonGroup, Glyphicon} = require('react-bootstrap');
const ampersandReactMixin = require('ampersand-react-mixin');

const Types = {
	'*': (<span key={0} style={{marginLeft: '.5em'}} className='label label-default'>*</span>),
	'TH': (<span key={1} style={{marginLeft: '.5em'}} className='label label-primary'>TH</span>),
	'OH': (<span key={2} style={{marginLeft: '.5em'}} className='label label-success'>OH</span>),
	'OP': (<span key={3} style={{marginLeft: '.5em'}} className='label label-info'>optimal</span>)
};

module.exports = React.createClass({
	displayName: 'Alg',
	mixins: [ampersandReactMixin],

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

	componentWillMount () {
		this.props.alg.on('edit', function () {
			this.edit();
		}, this);
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

			this.props.alg.save();

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

	remove () {
		this.props.case.removeAlg(this.props.alg);
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

			let deleteGlyph = <Button onClick={this.remove}><Glyphicon style={{color: '#d22'}} glyph='remove'/></Button>;

			return (
				<div className='input-group' style={{marginBottom: '2px', marginTop: '2px'}}>
					<span className='input-group-btn' style={{padding: '0px'}}>{aufSelect}</span>

					<div className='form-group' style={{margin: '0px'}}>
						<div className='input-group' style={{width: '100%'}}>
							<input type='text' className='form-control' defaultValue={alg}
								onChange={this.onChangeAlg} onKeyDown={this.onKeyDown} onBlur={this.onBlur}/>
							<span className='input-group-btn'>{deleteGlyph}</span>
						</div>
					</div>
				</div>
			);
		}

		let aufSpan = auf ? (<span className='auf'>[{auf}]</span>) : '';
		let types = this.types(type);
		return (<p className='alg' onClick={this.edit}>{aufSpan} {alg} {types}</p>);
	}
});
