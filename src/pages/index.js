const React = require('react');
const Markdown = require('react-markdown');
const Cube = require('../components/cube');
const DB = require('../data/cll.js');

const OLL = {
	T:  [ 1,  0,  0, -1],
	U:  [-1,  0,  0,  1],
	H:  [ 1, -1,  1, -1],
	Pi: [-1, -1,  1,  1],
	L:  [-1,  0,  1,  0],
	S:  [ 1,  1,  1,  0],
	AS: [-1,  0, -1, -1],
};

module.exports = React.createClass({
	displayName: 'HomePage',

	componentDidMount () {
        window.addEventListener('resize', this.resize);
	},

	componentWillUnmount () {
        window.removeEventListener('resize', this.resize);
	},

	getInitialState () {
		return {
		};
	},

	resize (event) {
		this.forceUpdate();
	},

	render () {
		let puzzle = 3;
		// let size = window.innerWidth / 13;
		// size = size < 60 ? 60 : size;
		let size = 80;
		let colStyle = {minWidth: '10%', width: '10%'};

		return (
			<div>
				<div className='row'>
					<div className='panel panel-primary'>
						<div className='panel-heading' style={{paddingLeft: '50px'}}>Explanation</div>
						<div className='panel-body' style={{paddingLeft: '50px'}}><Markdown source={DB.explanation}/></div>
					</div>
				</div>
				<div className='container' style={{paddingLeft: '5px'}}>
					<div className='row' style={{width: 'auto', float: 'center'}}>
						<div id='T' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/T'>T</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.T} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.T} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={2} oll={OLL.T} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.T} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={4} oll={OLL.T} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} oll={OLL.T} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='U' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/U'>U</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.U} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.U} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={2} oll={OLL.U} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.U} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={4} oll={OLL.U} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} oll={OLL.U} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='H' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/H'>H</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.H} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.H} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.H} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} oll={OLL.H} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='Pi' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/Pi'>Pi</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.Pi} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.Pi} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={2} oll={OLL.Pi} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.Pi} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={4} oll={OLL.Pi} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} oll={OLL.Pi} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='L' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/L'>L</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.L} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.L} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={2} oll={OLL.L} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.L} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={4} oll={OLL.L} size={size} style={{margin: '5px'}}/>
							<Cube puzlze={puzzle} perm={5} oll={OLL.L} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='S' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/S'>S</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.S} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.S} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={2} oll={OLL.S} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.S} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={4} oll={OLL.S} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} oll={OLL.S} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='AS' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/AS'>AS</a></h4>
							<Cube puzzle={puzzle} perm={0} oll={OLL.AS} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={1} oll={OLL.AS} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={2} oll={OLL.AS} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={3} oll={OLL.AS} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={4} oll={OLL.AS} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} oll={OLL.AS} size={size} style={{margin: '5px'}}/>
						</div>

						<div id='Solved' className='col-sm-1' style={colStyle}>
							<h4 style={{textAlign: 'center'}}><a href='/learn/Solved'>Solved</a></h4>
							<Cube puzzle={puzzle} perm={2} size={size} style={{margin: '5px'}}/>
							<Cube puzzle={puzzle} perm={5} size={size} style={{margin: '5px'}}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
