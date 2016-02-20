const React = require('react');
const Markdown = require('react-markdown');
const Cube = require('../components/cube');

module.exports = React.createClass({
	displayName: 'HomePage',

	componentDidMount () {
		app.cube = this.refs.cube;
        window.addEventListener('resize', this.resize);
	},

	componentWillUnmount () {
        window.removeEventListener('resize', this.resize);
	},

	getInitialState () {
		return {};
	},

	resize (event) {
		this.forceUpdate();
	},

	change (event) {
		this.refs.cube.state.cube = solved();
		this.refs.cube.doMoves(event.target.value);
		this.forceUpdate();
	},

	render () {
		return (
			<div className='container'>
				Scramble: <input type='text' ref='textbox' onChange={this.change} style={{width: '500px'}}/>
				<br/>
				<p>bad Edges: {app.cube ? app.cube.badEdges() : 0}</p>
				<br/>
				<Cube ref='cube' size={200}/>
			</div>
		);
	}
});
