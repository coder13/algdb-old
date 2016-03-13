const React = require('react');
const {Input, Button, Modal, Panel, Glyphicon} = require('react-bootstrap');
const Cube = require('../components/cube');
const EditCubeModal = require('../components/editCubeModal');

module.exports = React.createClass({
	getInitialState () {
		return {
			showModal: false,

			name: '',
			status: 'add',
			cube: this.props.cube || solved(),
			scramble: ''
		};
	},

	componentWillReceiveProps (props) {
		this.state.cube = props.cube || solved();
	},

	open (status, _case) {
		if (_case) {
			this.case = _case;
			this.state.cube = _case.cube;
			this.state.name = _case.name;
		}

		this.setState({
			showModal: true,
			status: status || 'add'
		});
	},

	close () {
		this.setState(this.getInitialState());
	},

	reset () {
		this.setState(this.getInitialState());
	},

	changeName (e) {
		this.setState({
			name: e.target.value
		});
	},

	openEditCubeModal () {
		this.refs.editCubeModal.open();
	},

	editCube (state) {
		this.setState({
			cube: state.cube
		});
	},

	submit () {
		if (this.props.submit && !this.case) {
			this.props.submit(this.state);
		} else if (this.case) {
			this.case.set(this.state);
			this.case.save();
		}
		this.close();
	},

	render () {
		let {cube, status, name} = this.state;
		let size = 100;

		return (
			<Modal show={this.state.showModal}>
				<EditCubeModal ref='editCubeModal' cube={cube} submit={this.editCube}/>

				<Modal.Header>
					<Modal.Title>{({add: 'Add', edit: 'Edit'})[status]} Case</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Input type='text' refs='name' addonBefore='Name' defaultValue={name} onChange={this.changeName}/>
					<div className='panel panel-default' style={{width: `${size + 12}px`}}>
						<div className='panel-body' style={{padding: '6px'}}>
							<Cube size='100px' cube={cube} parent='editCaseModal'/>
							<hr style={{margin: '5px'}}/>
							<Button bsStyle='link' style={{color: 'black'}} onClick={this.openEditCubeModal}><Glyphicon glyph='pencil'/></Button>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle='danger' onClick={this.close}>Cancel</Button>
					<Button bsStyle='primary' onClick={this.submit}>{({add: 'Add', edit: 'Edit'})[status]} Case</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});
