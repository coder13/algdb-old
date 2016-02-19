var React = require('react');
var Scrambler = require('../lib/scrambler');

module.exports = React.createClass({
	displayName: 'DrillPage',

	componentWillMount () {
		Scrambler.initialize(() => {}, Math);
		document.addEventListener('keypress', this.keyPress);
	},

	componentDidMount () {
		this.scramble();
	},

	getDefaultProps () {
		return {
			scrambleType: COLL
		}
	},

	getInitialState () {
		return {
			scramble: ''
		};
	},

	keyPress (event) {
		if (event.charCode === 32) {
			this.scramble();
		}
	},

	scramble (event) {
		this.setState({
			scramble: Scrambler.getCustomScramble(this.props.scrambleType)
		});
	},

	render () {
		return (
			<div className='container'>
				<div className='row' style={{margin: '2px'}}>
					<div className='col-sm-2'>
						<div className='panel panel-default'>
							<div className='panel-heading'>Scramble Type</div>
							<div className='panel-body' style={{padding: '0px'}}>
							</div>
						</div>
					</div>
					<div className='col-sm-10'>
						<div className='jumbotron'>
							<h3 className='alg' style={{textAlign: 'center'}}>{this.state.scramble}</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
