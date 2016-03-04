const Model = require('ampersand-model');

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

const nextPerm = (how) => (p,i,what) => what[how[i]];
const prevPerm = (how) => (p,i,what) => how.indexOf(what[i]);
const nextOrient = (how, n) => (p,i,what) => (p + how[i]) % (n || 3);
const prevOrient = (how, n) => (p,i,what) => (p + how[i]) % (n || 3);

const cycle = function (pieces, cube, dir) {
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
		centers: cube.centers.map(perm(pieces.centers))
	};
};

const combine = window.combine = function (moves) {
	moves.reverse().push(solved()); // apend to beggining;
	return moves.reverse().reduce(cycle);
};

// cube containing corners and edges each containing a permutation and orientation array
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
	Moves[key + '2'] = cycle(cycle(move, solved()), move);
	Moves[key + '\''] = cycle(cycle(Moves[key + '2'], solved()), move);
};

['U', 'D', 'R', 'L', 'F', 'B', 'M', 'S', 'E'].forEach(gen);

/* Rotations: */
Moves.y = combine([Moves.U, Moves['E\''], Moves['D\'']]);
Moves.x = combine([Moves.R, Moves['M\''], Moves['L\'']]);
Moves.z = combine([Moves.F, Moves['S\''], Moves['B\'']]);

Moves.u = combine([Moves.U, Moves['E\'']]);
Moves.r = combine([Moves.R, Moves['M\'']]);
Moves.f = combine([Moves.F, Moves['S\'']]);
Moves.d = combine([Moves.D, Moves['E']]);
Moves.l = combine([Moves.L, Moves['M\'']]);
Moves.b = combine([Moves.B, Moves['S']]);

['y', 'x', 'z'].forEach(gen);

const Cube = window.CubeModel = module.exports = Model.extend({
	idAttribute: '_id',

	props: {
		mask: 'number',
		corners: 'object',
		edges: 'object',
		centers: 'array'
	},

	initialize (options) {
		options = options || {};
		this.corners = _.merge({}, solved().corners, options.corners);
		this.edges = _.merge({}, solved().edges, options.edges);
	},

	doMoves (moves) {
		moves.split(' ').forEach(function (m) {
			if (Moves[m]) {
				console.log(m, this);
				this.set(cycle(Moves[m], this));
			}
		}, this);
	},

	equals (val) {
		return this.corners.perm === val.corners.perm &&
						this.corners.orient === val.corners.orient &&
						this.edges.perm === val.edges.perm &&
						this.edges.orient === val.edges.orient;
	}
});
