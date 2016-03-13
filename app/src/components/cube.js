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

// identity move
const solved = window.solved = function () {
	return {
		corners: {
			perm: [0,1,2,3,4,5,6,7],
			orient: [0,0,0,0,0,0,0,0]
		},
		edges: {
			perm: [0,1,2,3,4,5,6,7,8,9,10,11],
			orient: [0,0,0,0,0,0,0,0,0,0,0,0]
		},
		centers: [0, 1, 2, 3, 4, 5],
		mask: 0xffffffffffff
	};
};

// [0, 1, 2, 0, 0, 2, 1, 0]

const nextPerm = (how) => (p,i,what) => what[how[i]];
const prevPerm = (how) => (p,i,what) => how.indexOf(what[i]);
const nextOrient = (how, n) => (p,i,what) => (p + how[i]) % (n || 3);
const prevOrient = (how, n) => (p,i,what) => (p + how[i]) % (n || 3);

const cycle = window.cycle = function (pieces, cube, dir) {
	cube = _.merge({}, solved(), cube);
	pieces = _.merge({}, solved(), pieces); // fill in the gaps

	let inv = (dir && dir < 0);

	let perm = inv ? prevPerm : nextPerm;
	let orient = inv ? prevOrient : nextOrient;

	let cp = perm(pieces.corners.perm);
	let co = orient(pieces.corners.orient);
	let ep = perm(pieces.edges.perm);
	let eo = orient(pieces.edges.orient, 2);

	return {
		corners: {
			perm: cube.corners.perm.map(cp),
			orient: !inv ? cube.corners.orient.map(co).map(cp) : cube.corners.orient.map(cp).map(co)
		},
		edges: {
			perm: cube.edges.perm.map(ep),
			orient: cube.edges.orient.map(eo).map(ep)
		},
		centers: cube.centers.map(perm(pieces.centers)),
		mask: cube.mask
	};
};

const combine = window.combine = function (moves) {
	moves.reverse().push(solved()); // apend to beginning;
	return moves.reverse().reduce(cycle);
};

// cube containing corners and edges each containing a permutation and orientation array
// side note: these can be combined to create an entire scramble.
const Moves = window.Moves = {
/* Normal Moves: */
	// Doesn't effect orientation
	U: {
		corners: {
			perm: [3,0,1,2,4,5,6,7],
			orient: [0,0,0,0,0,0,0,0]
		}, edges: {
			perm: [3,0,1,2,4,5,6,7,8,9,10,11],
			orient: [0,0,0,0,0,0,0,0,0,0,0,0]
		}
	},
	R: {
		corners: {
			perm: [0,2,6,3,4,1,5,7],
			orient: [0,1,2,0,0,2,1,0]
		}, edges: {
			perm: [0,6,2,3,4,1,9,7,8,5,10,11],
			orient: [0,0,0,0,0,0,0,0,0,0,0,0]
		}
	},
	F: {
		corners: {
			perm: [0,1,3,7,4,5,2,6],
			orient: [0,0,1,2,0,0,2,1]
		}, edges: {
			perm: [0,1,7,3,4,5,2,10,8,9,6,11],
			orient: [0,0,1,0,0,0,1,1,0,0,1,0]
		}
	},
	D: {
		corners: {
			perm: [0,1,2,3,5,6,7,4],
			orient: [0,0,0,0,0,0,0,0]
		}, edges: {
			perm: [0,1,2,3,4,5,6,7,9,10,11,8],
			orient: [0,0,0,0,0,0,0,0,0,0,0,0]
		}
	},
	L: {
		corners: {
			perm: [4,1,2,0,7,5,6,3],
			orient: [2,0,0,1,1,0,0,2]
		}, edges: {
			perm: [0,1,2,4,11,5,6,3,8,9,10,7],
			orient: [0,0,0,0,0,0,0,0,0,0,0,0]
		}
	},
	B: {
		corners: {
			perm: [1,5,2,3,0,4,6,7],
			orient: [1,2,0,0,2,1,0,0]
		},
		edges: {
			perm: [5,1,2,3,0,8,6,7,4,9,10,11],
			orient: [1,0,0,0,1,1,0,0,1,0,0,0]
		}
	},
/* Slice Moves: */
	M: {
		edges: {
			perm: [8,1,0,3,4,5,6,7,10,9,2,11],
			orient: [1,0,1,0,0,0,0,0,1,0,1,0]
		},
		centers: [4,1,0,3,5,2]
	},
	S: {
		edges: {
			perm: [0,9,2,1,4,5,6,7,8,11,10,3],
			orient: [0,1,0,1,0,0,0,0,0,1,0,1]
		},
		centers: [3,0,2,5,4,1]
	},
	E: {
		edges: {
			perm: [0,1,2,3,5,6,7,4,8,9,10,11],
			orient: [0,0,0,0,1,1,1,1,0,0,0,0]
		},
		centers: [0,4,1,2,3,5]
	},

/* Triggers: */
	sune: {
		corners: {
			perm:   [2,3,0,1,4,5,6,7],
			orient: [2,0,2,2,0,0,0,0]
		},
		edges: {
			perm:   [1,3,2,0,4,5,6,7,8,9,10,11],
			orient: [0,0,0,0,0,0,0,0,0,0,0,0]
		}
	}
};

// generate ' and 2 moves.
const gen = function (key) {
	let move = Moves[key];
	Moves[`${key}2`] = cycle(cycle(move, solved()), move);
	Moves[`${key}'`] = cycle(cycle(Moves[`${key}2`], solved()), move);

	// Moves[key + '\''] = cycle(move, solved(), -1);
};

['U', 'D', 'R', 'L', 'F', 'B', 'M', 'S', 'E'].forEach(gen);

/* Rotations: */
Moves.y = combine([Moves.U, Moves['E\''], Moves['D\'']]);
Moves.x = combine([Moves.R, Moves['M\''], Moves['L\'']]);
Moves.z = combine([Moves.F, Moves['S\''], Moves['B\'']]);

// Moves.u = combine([Moves.U, Moves['E\'']]);
// Moves.r = combine([Moves.R, Moves['M\'']]);
// Moves.f = combine([Moves.F, Moves['S\'']]);
// Moves.d = combine([Moves.D, Moves['E']]);
// Moves.l = combine([Moves.L, Moves['M\'']]);
// Moves.b = combine([Moves.B, Moves['S']]);

['y', 'x', 'z'].forEach(gen);

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
		// No 2x2 rendering yet.
		return this.render3();
	},

	// render2 () {
	// 	let lw = 1 / 16;
	// 	let style = Object.assign({}, this.style, this.props.style);
	// 	let corners = this.state.corners;

	// 	return (
	// 		<svg width={this.props.size} height={this.props.size} viewBox={`0 0 ${6} ${6}`} style={style}>
	// 			<rect x='0' y='1' width={1} height={2} style={{fill: corners[0][0], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='1' y='0' width={2} height={1} style={{fill: corners[0][1], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='1' y='1' width={2} height={2} style={{fill: corners[0][2], stroke: lineColor, strokeWidth: lw}}/>

	// 			<rect x='3' y='0' width={2} height={1} style={{fill: corners[1][0], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='5' y='1' width={1} height={2} style={{fill: corners[1][1], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='3' y='1' width={2} height={2} style={{fill: corners[1][2], stroke: lineColor, strokeWidth: lw}}/>

	// 			<rect x='5' y='3' $width={1} height={2} style={{fill: corners[2][0], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='3' y='5' width={2} height={1} style={{fill: corners[2][1], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='3' y='3' width={2} height={2} style={{fill: corners[2][2], stroke: lineColor, strokeWidth: lw}}/>

	// 			<rect x='1' y='5' width={2} height={1} style={{fill: corners[3][0], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='0' y='3' width={1} height={2} style={{fill: corners[3][1], stroke: lineColor, strokeWidth: lw}}/>
	// 			<rect x='1' y='3' width={2} height={2} style={{fill: corners[3][2], stroke: lineColor, strokeWidth: lw}}/>
	// 		</svg>
	// 	);
	// },

	render3 () {
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
