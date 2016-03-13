const React = require('react');
const {Input, Button, Modal, Row, Col} = require('react-bootstrap');
const Cube = require('../components/cube');

module.exports = React.createClass({
	getDefaultProps () {
		return {
			cube: solved()
		};
	},

	getInitialState () {
		return {
			showModal: false,

			cube: solved(),
			errors: {
				cp: 'success',
				co: 'success',
				ep: 'success',
				eo: 'success'
			},
			scramble: ''
		};
	},

	componentWillReceiveProps (props) {
		this.state.cube = props.cube;
	},


	open () {
		this.setState({showModal: true});
	},

	close () {
		this.setState(this.getInitialState());
	},

	reset () {
		this.setState(this.getInitialState());
	},

	changeName (e) {
		this.setState({
			id: e.target.value
		});
	},

	validate (value) {
		try {
			let p = JSON.parse(value);
			return 'success';
		} catch (e) {
			// console.log(136, e);
			return 'error';
		}
	},

	changeCP (e) {
		let value = `[${e.target.value}]`;
		if (this.validate(value) === 'success') {
			this.state.errors.cp = 'success';
			this.state.cube.corners.perm = JSON.parse(value);
		} else {
			this.state.errors.cp = this.validate(value);
		}
		this.forceUpdate();
	},

	changeCO (e) {
		let value = `[${e.target.value}]`;
		if (this.validate(value) === 'success') {
			this.state.errors.co = 'success';
			this.state.cube.corners.orient = JSON.parse(value);
		} else {
			this.state.errors.co = this.validate(value);
		}
		this.forceUpdate();
	},

	changeEP (e) {
		let value = `[${e.target.value}]`;
		if (this.validate(value) === 'success') {
			this.state.errors.ep = 'success';
			this.state.cube.edges.perm = JSON.parse(value);
		} else {
			this.state.errors.ep = this.validate(value);
		}
		this.forceUpdate();
	},

	changeEO (e) {
		let value = `[${e.target.value}]`;
		if (this.validate(value) === 'success') {
			this.state.errors.eo = 'success';
			this.state.cube.edges.orient = JSON.parse(value);
		} else {
			this.state.errors.eo = this.validate(value);
		}
		this.forceUpdate();
	},

	submit () {
		if (this.props.submit) {
			this.props.submit(this.state);
		}
		this.reset();
		this.close();
	},

	render () {
		let {cube, status} = this.state;
		let cp = cube.corners.perm;
		let co = cube.corners.orient;
		let ep = cube.edges.perm;
		let eo = cube.edges.orient;

		return (
			<Modal show={this.state.showModal}>
				<Modal.Header>
					<Modal.Title>Edit Cube</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={2}>
							<Cube size='100px' cube={cube}/>
						</Col>
						<Col sm={9} style={{margin: '10px'}}>
							<Input type='text' refs='cp' addonBefore='CP' defaultValue={cp} onChange={this.changeCP}
								bsStyle={this.state.errors.cp}/>
							<Input type='text' refs='co' addonBefore='CO' defaultValue={co} onChange={this.changeCO}
								bsStyle={this.state.errors.co}/>
							<Input type='text' refs='ep' addonBefore='EP' defaultValue={ep} onChange={this.changeEP}
								bsStyle={this.state.errors.ep}/>
							<Input type='text' refs='eo' addonBefore='EO' defaultValue={eo} onChange={this.changeEO}
								bsStyle={this.state.errors.eo}/>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle='danger' onClick={this.close}>Cancel</Button>
						<Button bsStyle='primary' onClick={this.submit}>Edit</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});
