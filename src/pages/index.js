const React = require('react');
const Markdown = require('react-markdown');
const Cube = require('../components/cube');

module.exports = React.createClass({
	displayName: 'HomePage',

	getInitialState () {
		return {moves: ''};
	},

	change (event) {
		this.setState({
			moves: event.target.value
		});
		this.forceUpdate();
	},

	render () {
		let moves = this.state.moves;

		return (
			<div className='container'>
				Scramble: <input type='text' ref='textbox' onChange={this.change} style={{width: '500px'}}/>
				<br/>
				<p>bad Edges: {app.cube ? app.cube.badEdges() : 0}</p>
				<br/>
				<Cube ref='cube' scramble={moves} size={200}/>
			</div>
		);
	}
});
