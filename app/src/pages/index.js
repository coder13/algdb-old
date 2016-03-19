const app = require('ampersand-app');
const React = require('react');
const {Modal, Button, ButtonInput, Input} = require('react-bootstrap');
const ampersandReactMixin = require('ampersand-react-mixin');
const AlgsetIcon = require('../components/algset-icon');

const Cube = require('../components/cube');

const AddAlgsetModal = React.createClass({
	displayName: 'AddAlgsetModal',

	componentWillMount () {

	},

	getInitialState () {
		return {
			showModal: false,
			name: '',
			url: ''
		};
	},

	urlFromName() {
		return this.state.name.split(' ').map(i => i ? i[0].toLowerCase() : '').join('');
	},

	open () {
		this.setState({showModal: true});
	},

	closeModal () {
		this.setState({showModal: false});
	},

	submit () {
		if (this.props.submit) {
			this.props.submit({
				name: this.state.name,
				id: this.state.url
			});
		}
		this.closeModal();
	},

	onChangeName (e) {
		this.setState({
			name: e.target.value
		});
	},

	onChangeURL (e) {
		this.setState({
			url: e.target.value
		});
	},

	validateName () {
		return this.state.url === (this.state.url).toLowerCase() ? 'success' : 'warning';
	},

	validateURL () {
		if (this.state.url.indexOf(' ') !== -1) {
			return 'error';
		}

		return this.state.url === (this.state.url).toLowerCase() ? 'success' : 'warning';
	},

	canSubmit () {
		return this.state.name && this.state.url;
	},

	render () {
		let urlHelp = 'This is the name that will show in the url when people visit this algset.';
		return (
			<Modal show={this.state.showModal} onHide={this.closeModal}>
				<Modal.Header>
					<Modal.Title>Add Algset</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Add name and url for this algset:</p>
					<br/>
					<form>
						<Input type='text' label='Name' bsStyle={this.validateURL()} placeholder='Winter Variation'
							onInput={this.onChangeName} ref='name'/>
						<Input type='text' label='URL' placeholder={this.urlFromName() || 'wv'}
							onChange={this.onChangeURL} bsStyle={this.validateURL()} help={urlHelp}/>
						<ButtonInput bsStyle='primary' disabled={!this.canSubmit()}
							onClick={this.submit}>Create</ButtonInput>
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={this.closeModal}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = React.createClass({
	displayName: 'HomePage',
	mixins: [ampersandReactMixin],

	getDefaultProps () {
		return {
			algsets: []
		};
	},

	addAlgset () {
		this.refs.addAlgset.open();
	},

	render () {
		let algsets = this.props.algsets.models;

		let addAlgset = (
			<a style={{color: 'inherit', cursor: 'pointer'}} onClick={this.addAlgset}>
				<div className='well container' style={{
					display: 'inline-block',
					fontSize: '80px',
					margin: '10px',
					padding: 'auto',
					width: '20vh',
					height: '25vh',
					textAlign: 'center'
				}}>
					<span className='glyphicon glyphicon-plus'/>
				</div>
			</a>
		);

		return (
			<div>
				<div className='page-header' style={{margin: '20px'}}>
					<h1 className='text-center' style={{margin: '20px'}}>AlgDB <small>(clone)</small></h1>
				</div>
				<AddAlgsetModal ref='addAlgset' submit={app.addAlgset}/>
				<div className='panel panel-primary'>
					<div className='panel-heading' style={{paddingLeft: '50px'}}>
						<h1>Algsets</h1>
					</div>
					<div className='panel-body row-fluid' style={{paddingLeft: '5px'}}>
						{algsets.map((algset, index) =>
							<div key={index} className='pull-left'>
								<AlgsetIcon algset={algset} href={`/algset/${algset.id || algset.name}`}/>
							</div>
						)}
						<div className='pull-left'>
							{app.me.isLoggedIn ? addAlgset : ''}
						</div>
					</div>
				</div>
			</div>
		);
	}
});
