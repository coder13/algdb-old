const _ = require('lodash');
const React = require('react');
const Cube = require('../models/cube');

/*
	mask: counter clockwise starting from top left corner: U, L, F, R, B, D
	LL: 11
*/

/* Colors: */
const Black  = '#000000';
const Dgrey  = '#404040';
const Grey   = '#808080';
const Silver = '#BFBFBF';
const White  = '#FFFFFF';
const Yellow = '#FEFE00';
const Red    = '#EE0000'; //'FE0000';
const Orange = '#FFA100'; //'FE8600';
const Blue   = '#0000F2';
const Green  = '#00D800'; //'00F300';
const Purple = '#A83DD9';
const Pink   = '#F33D7B';

/* Color Scheme: */
const lineColor = Black;
const CS = {
	up: Yellow,
	down: White,
	front: Blue,
	back: Green,
	left: Orange,
	right: Red
};

// UBL, UBR,  UFR, UFL,   DBL, DBR,  DFR, DFL
const Corners = [
	[CS.left, CS.back, CS.up], [CS.back, CS.right, CS.up],
	[CS.right, CS.front, CS.up], [CS.front, CS.left, CS.up],
	[CS.back, CS.left, CS.down], [CS.right, CS.back, CS.down],
	[CS.front, CS.right, CS.down], [CS.left, CS.front, CS.down]
];

// UB, UR, UF, UL,  BL, BR, FR, FL,   DB, DR, DF, DL
const Edges = [
	[CS.back, CS.up], [CS.right, CS.up], [CS.front, CS.up], [CS.left, CS.up],
	[CS.left, CS.back], [CS.right, CS.back], [CS.right, CS.front], [CS.left, CS.front],
	[CS.back, CS.down], [CS.right, CS.down], [CS.front, CS.down], [CS.left, CS.down]
];

const Centers = [CS.up, CS.left, CS.front, CS.right, CS.back, CS.down];

module.exports = React.createClass({
	style: {
		padding: '1px'
	},

	getDefaultProps () {
		return {
			scramble: '',
			puzzle: 3,
			scale: 20,
			lineWidth: 4,
			editable: false,

			cube: solved(),
			rotate: '',
			mask: 0xffffffffffff // all 6 faces
		};
	},

	componentWillReceiveProps (props) {
		this.state.cube = props.cube;
		this.doMoves(props.scramble);
	},

	getInitialState () {
		return {
			cube: solved()
		};
	},

	componentWillMount: function() {
		this.state.cube = this.props.cube;
		this.doMoves(this.props.rotate);
		this.doMoves(this.props.scramble);
	},

	doMoves (moves) {
		moves.split(' ').forEach(function (m) {
			if (Moves[m]) {
				this.state.cube = cycle(Moves[m], this.state.cube);
			}
		}, this);
		this.forceUpdate();
	},

	render () {
		return this.render333();
	},

	render333 () {
		const cubie = (c) => ({fill: c, stroke: lineColor, strokeWidth: lw});

		let lw = 1 / 16;
		let style = Object.assign({}, this.style, this.props.style);
		let cp = this.state.cube.corners.perm;
		let co = this.state.cube.corners.orient;
		let ep = this.state.cube.edges.perm;
		let eo = this.state.cube.edges.orient;
		let centers = this.state.cube.centers;
		let mask = this.props.mask;

		return (
			<svg width={this.props.size} height={this.props.size} viewBox={`0 0 ${8} ${8}`} style={style}>
				<rect x='0' y='1' width={1} height={2} style={cubie((mask >>  8) & 1 ? Corners[cp[0]][(co[0] + 0) % 3] : Grey)}/>{/*UBL*/}
				<rect x='1' y='0' width={2} height={1} style={cubie((mask >> 19) & 1 ? Corners[cp[0]][(co[0] + 1) % 3] : Grey)}/>{/*ULB*/}
				<rect x='1' y='1' width={2} height={2} style={cubie((mask >>  0) & 1 ? Corners[cp[0]][(co[0] + 2) % 3] : Grey)}/>{/*BLU*/}

				<rect x='3' y='0' width={2} height={1} style={cubie((mask >> 18) & 1 ? Edges[ep[0]][(eo[0] + 0) % 2 ] : Grey)}/>{/*UB*/}
				<rect x='3' y='1' width={2} height={2} style={cubie((mask >>  1) & 1 ? Edges[ep[0]][(eo[0] + 1) % 2 ] : Grey)}/>{/*BU*/}

				<rect x='5' y='0' width={2} height={1} style={cubie((mask >> 17) & 1 ? Corners[cp[1]][(co[1] + 0) % 3] : Grey)}/>
				<rect x='7' y='1' width={1} height={2} style={cubie((mask >> 16) & 1 ? Corners[cp[1]][(co[1] + 1) % 3] : Grey)}/>
				<rect x='5' y='1' width={2} height={2} style={cubie((mask >>  2) & 1 ? Corners[cp[1]][(co[1] + 2) % 3] : Grey)}/>

				<rect x='7' y='3' width={1} height={2} style={cubie((mask >> 15) & 1 ? Edges[ep[1]][(eo[1] + 0) % 2 ] : Grey)}/>
				<rect x='5' y='3' width={2} height={2} style={cubie((mask >>  3) & 1 ? Edges[ep[1]][(eo[1] + 1) % 2 ] : Grey)}/>

				<rect x='7' y='5' width={1} height={2} style={cubie((mask >> 14) & 1 ? Corners[cp[2]][(co[2] + 0) % 3] : Grey)}/>
				<rect x='5' y='7' width={2} height={1} style={cubie((mask >> 13) & 1 ? Corners[cp[2]][(co[2] + 1) % 3] : Grey)}/>
				<rect x='5' y='5' width={2} height={2} style={cubie((mask >>  4) & 1 ? Corners[cp[2]][(co[2] + 2) % 3] : Grey)}/>

				<rect x='3' y='7' width={2} height={1} style={cubie((mask >> 12) & 1 ? Edges[ep[2]][(eo[2] + 0) % 2 ] : Grey)}/>
				<rect x='3' y='5' width={2} height={2} style={cubie((mask >>  5) & 1 ? Edges[ep[2]][(eo[2] + 1) % 2 ] : Grey)}/>

				<rect x='1' y='7' width={2} height={1} style={cubie((mask >> 11) & 1 ? Corners[cp[3]][(co[3] + 0) % 3] : Grey)}/>
				<rect x='0' y='5' width={1} height={2} style={cubie((mask >> 10) & 1 ? Corners[cp[3]][(co[3] + 1) % 3] : Grey)}/>
				<rect x='1' y='5' width={2} height={2} style={cubie((mask >>  6) & 1 ? Corners[cp[3]][(co[3] + 2) % 3] : Grey)}/>

				<rect x='0' y='3' width={1} height={2} style={cubie((mask >>  9) & 1 ? Edges[ep[3]][(eo[3] + 0) % 2 ] : Grey)}/>
				<rect x='1' y='3' width={2} height={2} style={cubie((mask >>  7) & 1 ? Edges[ep[3]][(eo[3] + 1) % 2 ] : Grey)}/>

				<rect x='3' y='3' width={2} height={2} style={{fill: Centers[centers[0]], stroke: lineColor, strokeWidth: lw}}/>
			</svg>
		);
	},

	badEdges () {
		return this.state.cube.edges.orient.reduce((a,b) => a + b);
	}
});
