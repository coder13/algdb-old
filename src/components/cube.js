var React = require('react');

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
	up: White,
	down: Yellow,
	front: Green,
	back: Blue,
	left: Orange,
	right: Red
};

// UBL, UBR,  UFR, UFL,   DBL, DBR,  DFR, DFL
const Corners = [[CS.left, CS.back, CS.up], [CS.back, CS.right, CS.up],
				 [CS.right, CS.front, CS.up], [CS.front, CS.left, CS.up],
				 [CS.back, CS.left, CS.down], [CS.right, CS.back, CS.down],
				 [CS.front, CS.right, CS.down], [CS.left, CS.front, CS.down]];

// UB, UR, UF, UL,  BL, BR, FR, FL,   DB, DR, DF, DL
const Edges = [[CS.back, CS.up], [CS.right, CS.up], [CS.front, CS.up], [CS.left, CS.up],
				[CS.left, CS.back], [CS.right, CS.back], [CS.right, CS.front], [CS.left, CS.front],
				[CS.back, CS.down], [CS.right, CS.down], [CS.front, CS.down], [CS.left, CS.down]]

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
		centers: [0, 1, 2, 3, 4, 5]
	};
};

const cycle = window.cycle = function (pieces, cube) {
	let newCube = {
		corners: {},
		edges: {},
		centers: []
	};

	if (pieces.corners) {
		if (!cube.corners) {
			cube.corners = solved().corners
		}

		if (pieces.corners.orient) {
			newCube.corners.orient = cube.corners.orient.map((p,i) => (p + pieces.corners.orient[i]) % 3);
		} else {
			newCube.corners.orient = cube.corners.orient;
		}

		if (pieces.corners.perm) {
			newCube.corners.perm = cube.corners.perm.map((p, i, arry) => arry[pieces.corners.perm[(i)]]);
			newCube.corners.orient = newCube.corners.orient.map((p, i, arry) => arry[pieces.corners.perm[(i)]]);
		}
	} else {
		newCube.corners = cube.corners;
	}

	if (pieces.edges) {
		if (!cube.edges) {
			cube.edges = solved().edges
		}

		if (pieces.edges.orient) {
			newCube.edges.orient = cube.edges.orient.map((p,i) => (p + pieces.edges.orient[i]) % 2);
		} else {
			newCube.edges.orient = cube.edges.orient;
		}

		if (pieces.edges.perm) {
			newCube.edges.perm = cube.edges.perm.map((p, i, arry) => arry[pieces.edges.perm[(i)]]);
			newCube.edges.orient = newCube.edges.orient.map((p, i, arry) => arry[pieces.edges.perm[(i)]]);
		}
	}

	if (pieces.centers) {
		if (!cube.centers) {
			cube.centers = solved().centers;
		}

		newCube.centers = cube.centers.map((p, i, arry) => arry[pieces.centers[(i)]]);
	} else {
		newCube.centers = cube.centers;
	}
	return newCube;
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
			perm: [0,3,2,11,4,5,6,7,8,1,10,9],
			orient: [0,1,0,1,0,0,0,0,0,1,0,1]
		},
		centers: [1,5,2,0,4,3]
	},
	E: {
		edges: {
			perm: [0,1,2,3,5,6,7,4,8,9,10,11],
			orient: [0,0,0,0,1,1,1,1,0,0,0,0]
		},
		centers: [0,2,3,4,1,5]
	},
/* Rotations: */

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

Object.keys(Moves).forEach(function (key) {
	let move = Moves[key];
	Moves[key + '2'] = cycle(cycle(move, solved()), move);
	Moves[key + '\''] = cycle(cycle(Moves[key + '2'], solved()), move)
});

console.log(Moves);

window.Cube = module.exports = React.createClass({
	style: {
		padding: '1px'
	},

	getDefaultProps () {
		return {
			puzzle: 3,
			scale: 20,
			lineWidth: 4,

			// 		UURRFFLLBBDD
			mask: 0xffffffffffff // all 6 faces
		}
	},

	willReceiveNewProps () {
		console.log(90, arguments)
	},

	getInitialState () {
		return {
			cube: solved()
		};
	},

	componentWillMount: function() {},

	doMoves (moves) {
		moves.split(' ').forEach(function (m) {
			if (Moves[m]) {
				this.state.cube = cycle(Moves[m], this.state.cube)
			}
		}, this)
		this.forceUpdate();
	},

	render () {
		return this.props.puzzle == '2' ? this.render2() : this.render3();
	},

	render2 () {
		let lw = 1/16;
		let style = Object.assign({}, this.style, this.props.style);
		let corners = this.state.corners;

		return (
			<svg width={this.props.size} height={this.props.size} viewBox={`0 0 ${6} ${6}`} style={style}>
				<rect x='0' y='1' width={1} height={2} style={{fill: corners[0][0], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='1' y='0' width={2} height={1} style={{fill: corners[0][1], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='1' y='1' width={2} height={2} style={{fill: corners[0][2], stroke: lineColor, strokeWidth: lw}}/>

				<rect x='3' y='0' width={2} height={1} style={{fill: corners[1][0], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='5' y='1' width={1} height={2} style={{fill: corners[1][1], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='3' y='1' width={2} height={2} style={{fill: corners[1][2], stroke: lineColor, strokeWidth: lw}}/>

				<rect x='5' y='3' width={1} height={2} style={{fill: corners[2][0], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='3' y='5' width={2} height={1} style={{fill: corners[2][1], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='3' y='3' width={2} height={2} style={{fill: corners[2][2], stroke: lineColor, strokeWidth: lw}}/>

				<rect x='1' y='5' width={2} height={1} style={{fill: corners[3][0], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='0' y='3' width={1} height={2} style={{fill: corners[3][1], stroke: lineColor, strokeWidth: lw}}/>
				<rect x='1' y='3' width={2} height={2} style={{fill: corners[3][2], stroke: lineColor, strokeWidth: lw}}/>
			</svg>
		);
	},

	render3 () {
		const cubie = (c) => ({fill: c, stroke: lineColor, strokeWidth: lw});

		let lw = 1/16;
		let style = Object.assign({}, this.style, this.props.style);
		let cp = this.state.cube.corners.perm,
			co = this.state.cube.corners.orient,
			ep = this.state.cube.edges.perm,
			eo = this.state.cube.edges.orient,
			centers = this.state.cube.centers;
		let mask = this.props.mask;

		return (
			<svg width={this.props.size} height={this.props.size} viewBox={`0 0 ${8} ${8}`} style={style}>
				<rect x='0' y='1' width={1} height={2} style={cubie(		 Corners[cp[0]][(co[0]+0)%3])}/>{/*UBL*/}
				<rect x='1' y='0' width={2} height={1} style={cubie(		 Corners[cp[0]][(co[0]+1)%3])}/>{/*ULB*/}
				<rect x='1' y='1' width={2} height={2} style={cubie(mask&1 ? Corners[cp[0]][(co[0]+2)%3] : Grey)}/>{/*BLU*/}

				<rect x='3' y='0' width={2} height={1} style={cubie(		 Edges[ep[0]][(eo[0]+0)%2])}/>{/*UB*/}
				<rect x='3' y='1' width={2} height={2} style={cubie(mask&2 ? Edges[ep[0]][(eo[0]+1)%2] : Grey)}/>{/*BU*/}

				<rect x='5' y='0' width={2} height={1} style={cubie(		 Corners[cp[1]][(co[1]+0)%3])}/>
				<rect x='7' y='1' width={1} height={2} style={cubie(		 Corners[cp[1]][(co[1]+1)%3])}/>
				<rect x='5' y='1' width={2} height={2} style={cubie(mask&4 ? Corners[cp[1]][(co[1]+2)%3] : Grey)}/>

				<rect x='7' y='3' width={1} height={2} style={cubie(		 Edges[ep[1]][(eo[1]+0)%2])}/>
				<rect x='5' y='3' width={2} height={2} style={cubie(mask&8 ? Edges[ep[1]][(eo[1]+1)%2] : Grey)}/>

				<rect x='7' y='5' width={1} height={2} style={cubie(Corners[cp[2]][(co[2]+0)%3])}/>
				<rect x='5' y='7' width={2} height={1} style={cubie(Corners[cp[2]][(co[2]+1)%3])}/>
				<rect x='5' y='5' width={2} height={2} style={cubie(Corners[cp[2]][(co[2]+2)%3])}/>

				<rect x='3' y='7' width={2} height={1} style={cubie(Edges[ep[2]][(eo[2]+0)%2])}/>
				<rect x='3' y='5' width={2} height={2} style={cubie(Edges[ep[2]][(eo[2]+1)%2])}/>

				<rect x='1' y='7' width={2} height={1} style={cubie(Corners[cp[3]][(co[3]+0)%3])}/>
				<rect x='0' y='5' width={1} height={2} style={cubie(Corners[cp[3]][(co[3]+1)%3])}/>
				<rect x='1' y='5' width={2} height={2} style={cubie(Corners[cp[3]][(co[3]+2)%3])}/>

				<rect x='0' y='3' width={1} height={2} style={cubie(Edges[ep[3]][(eo[3]+0)%2])}/>
				<rect x='1' y='3' width={2} height={2} style={cubie(Edges[ep[3]][(eo[3]+1)%2])}/>

				<rect x='3' y='3' width={2} height={2} style={{fill: Centers[centers[0]], stroke: lineColor, strokeWidth: lw}}/>
			</svg>
		);
	},

	badEdges () {
		return this.state.cube.edges.orient.reduce((a,b) => a + b);
	}
})
