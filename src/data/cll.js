/* Alg: 
 * type,
 * moveSet,
 * auf,
 * alg:
*/

module.exports = {
	name: 'cll',

	explanation: `**Corners of Last Layer** is a group of methods collectively known as **C\\*LL** or **CxLL** that solve the last layer corners in one algorithm. Each method has certain restrictions that apply, and each can affect other pieces in different ways. 

- CMLL - allows movement of the M layer and allows destruction of the UL and UR edges.
- COLL - preserves the last layer's edge orientation.
- CLL - doesn't preserve any edges.

C*LL is useful for 2x2, which has no edges, and also for corners first methods, which solve edges after the corners. CMLL is used in Roux to orient corners, then solve LSE. COLL is often used in ZZ and petrus solves which have edges oriented before solving the corners and in CFOP if edges happen to be oriented or are pre-oriented during f2l.

There are 42 C*LL cases. 6 for most cases except for H that has only 4 and 2 plls.

For each case, first AUF to the appropriate angle. Once you've done that, you'll look at certain stickers to see where the stickers are the same color, opposite colors, and adjacent colors. In general, you do not need to know the color scheme around the cube--just which colors are opposite each other.`,

	subsets: {
		T: {
			oll: [1, 0, 0, -1],
			cases: [{
					perm: 0,
					comment: 'pure 2gen case',
					algs: [{
						type: '*',
						moveSet: 'RU',
						auf: 'U',
						alg: "R U2' R' U' R U' R2 U2' R U R' U R"
					}, {
						type: 'CLL',
						moveSet: 'RUF',
						auf: 'U',
						alg: "R' U R' F U' R U F2 R2"
					}, {
						type: '*',
						moveSet: 'RUL',
						alg: "R U R' U R U2 R' L' U' L U' L' U2 L"
					}, {
						type: 'CLL',
						moveSet: 'RU',
						auf: 'U',
						alg: "R U' R U' R U R' U R' U R'"
					}]
				}, {
					perm: 1,
					algs: [{
						type: '*',
						moveSet: 'RUF',
						auf: 'U2',
						alg: "R' F' r U R U' r' F"
					}, {
						type: '*',
						moveSet: 'RUF',
						alg: "F R F' r U R' U' r'"
					}, {
						type: '*',
						moveSet: 'RUD',
						auf: 'U\'',
						alg: "x' R U R' D R U' R' D'"
					}, {
						type: ['CLL', 'CMLL'],
						moveSet: 'RUL',
						auf: 'U\'',
						alg: "R' U' R U L U' R' U x"
					}]
				}, {
					perm: 2,
					algs: [{
						type: ['CLL', 'CMLL'],
						moveSet: 'RUF',
						alg: "R U R' U' R' F R F'"
					}, {
						type: '*',
						moveSet: 'RUF',
						alg: "r U R' U' r' F R F'"
					}, {
						type: '*',
						moveSet: 'RUD',
						auf: 'U',
						alg: "R U R D R' U' R D' R2"
					}, {
						type: '*',
						moveSet: 'RUD',
						alg: "R U R' U' L' U R U' R' L"
					}]
				}, {
					perm: 3,
					algs: [{
						type: '*',
						moveSet: 'RUF',
						auf: 'U\'',
						alg: "F R U R' U' R U' R' U' R U R' F'"
					}, {
						type: ['CLL', 'CMLL'],
						moveSet: 'RUF',
						auf: 'U',
						alg: "F R' U' R F' R' U F' R"
					}, {
						type: '*',
						moveSet: 'RUF',
						auf: 'U2',
						alg: "R U2 R' F2 R U2 R' U2 R' F2 R"
					}, {
						type: ['COLL', 'CMLL'],
						moveSet: 'RUD',
						alg: "x' R U2 R D2 R' U2 R D2 R2 x"
					}, {
						type: ['CLL', 'CMLL'],
						moveSet: 'RUD',
						auf: 'U2',
						alg: "R' D R U' R U R' U R' D' R"
					}]
				}, {
					perm: 4,
					algs: [{
						type: 'CLL',
						moveSet: 'RUF',
						auf: 'U',
						alg: "R' U R U2 R2' F R F' R"
					}, {
						type: '*',
						moveSet: 'RUL',
						auf: 'U',
						alg: "R' U R U2' R' L' U R U' L"
					}, {
						type: '*',
						moveSet: 'RUL',
						auf: 'U\'',
						alg: "R U' R' U2 L R U' R' U L'"
					}, {
						type: 'CLL',
						moveSet: 'RUF',
						auf: 'U',
						alg: "R' U R U2 R2 F R F' R"
					}, {
						type: ['CLL', 'CMLL'],
						moveSet: 'RUF',
						auf: 'U',
						alg: "R' U r U2 R2' F R F' r"
					}]
				}, {
					perm: 5,
					comment: 'diagonal swap case',
					algs: [{
						type: '*',
						moveSet: 'RUD',
						auf: 'U',
						alg: "R' U R2 D r' U2 r D' R2 U' R"
					}, {
						type: ['CLL', 'CMLL'],
						moveSet: 'RUF',
						auf: 'U',
						alg: "R2' U' R F R' U R2 U' R' F' R"
					}, {
						type: 'CLL',
						moveSet: 'RUF',
						auf: 'U',
						alg: "F U' R U2 R' U' F2 R U R'"
					}]
				}
			]
		}, 
		U: {
			oll: [-1, 0, 0, 1],
			cases: [{
				perm: 0,
				algs: [{
					type: '*',
					moveSet: 'RU',
					auf: 'U',
					alg: "R' U' R U' R' U2 R2 U R' U R U2 R'"
				}, {
					type: 'CLL',
					moveSet: 'RU',
					auf: 'U2',
					alg: "R U' R U' R U' R' U R' U R'"
				}, {
					type: '*',
					moveSet: 'RU',
					alg: "R U R' U' R U' R' U2 R U' R' U2 R U R'"
				}, {
					type: '*',
					moveSet: 'RU',
					alg: "R' U' R U' R' U2 R2 U R' U R U2 R'"
				}]
			}, {
				perm: 1,
				algs: [{
					type: '*',
					moveSet: 'RUD',
					auf: 'U\'',
					alg: "R2 D R' U2 R D' R' U2 R'"
				}, {
					type: '*',
					moveSet: 'RUD',
					auf: 'U\'',
					alg: "x' R U' R' D R U2 R' D' R U' R' x"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'LUF',
					auf: 'U',
					alg: "L F' L' U' L F' L' U' F' U2 F"
				}, {
					type: 'CLL',
					moveSet: 'RUL',
					auf: 'U\'',
					alg: "R2 U R' U' R2 U' y L' U2 L"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					auf: 'U',
					alg: "R' U R' F R F' R U2 R' U R"
				}]
			}, {
				perm: 2,
				algs: [{
					type: '*',
					moveSet: 'RUD',
					auf: 'U',
					alg: "R2 D' R U2 R' D R U2 R"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					alg: 'U\'',
					alg: "R U2 R' U R' F2 R F' R' F2 R"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					alg: "U",
					alg: "R' U R' F R F' R U2 R' U R"
				}]
			}, {
				perm: 3,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "F R U' R' U R U R' U R U' R' F'"
				}, {
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "R' F2 R U2 R U2 R' F2 R U2 R'"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					auf: 'U',
					alg: "R' F U' R F R' U R F'"
				}]
			}, {
				perm: 4,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R"
				}, {
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "R' U' R F R2 D' R U R' D R2 U' F'"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					alg: "F R2 D R' U R D' R2' U' F'"
				}, {
					type: 'CLL',
					moveSet: 'RU',
					alg: "z' U2 R' U' R2 U' R' U' R U' R' U' x2"
				}]
			}, {
				perm: 5,
				algs: [{
					type: '*',
					moveSet: "RUF",
					auf: 'U',
					alg: "R' U2 R F U' R' U' R U F'"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					alg: "F R U R' U' F'"
				}, {
					type: '*',
					moveSet: 'RUD',
					auf: 'U',
					alg: "R2 D' R U R' D R U R U' R' U' R"
				}, {
					type: '*',
					moveSet: 'RUD',
					auf: 'U',
					alg: "R U' R' U' R U R D R' U R D' R2"
				}]
			}]
		}, 
		H: {
			oll: [1, -1, 1, -1],
			cases: [{
				perm: 0,
				algs: [{
					type: '*',
					moveSet: 'RU',
					alg: "R U2 R' U' R U R' U' R U' R'"
				}, {
					type: 'CLL',
					moveSet: 'RU',
					auf: 'U',
					alg: "R2 U2 R U2' R2'"
				}, {

				}]
			}, {
				perm: 1,
				algs: [{
					type: '*',
					moveSet: 'RUL',
					auf: 'U',
					alg: "R U R' U R U L' U R' U' L"
				}, {
					type: 'CLL',
					moveSet: "RUF",
					auf: 'U',
					alg: "R U R' U R U R' F R' F' R"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: "RUF",
					auf: 'U',
					alg: "R U2 R2 F R F' U2 R' F R F'"
				}]
			}, {
				perm: 4,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "F R U' R' U R U2 R' U' R U R' U' F'"
				}]
			}, {
				perm: 5,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					alg: "F R U R' U' R U R' U' R U R' U' F'"
				}, {
					type: '*',
					moveSet: 'RUF',
					alg: "F2 R' F2 R2 U2 R' F2"
				}]
			}]
		}, 
		Pi: {
			oll: [-1, -1, 1, 1],
			cases: [{
				perm: 0,
				algs: [{
					type: '*',
					moveSet: 'RU',
					alg: "R U2 R2 U' R2 U' R2 U2 R"
				}, {
					type: '*',
					moveSet: 'RUF',
					alg: "f R U R' U' f' F R U R' U' F"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					alg: "F R U R' U' R U R' U' F'"
				}]
			}, {
				perm: 1,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					alg: "R' F2 R U2 R U2 R' F2 U' R U' R'"
				}, {
					type: '*',
					moveSet: 'RUL',
					alg: "R U2 R' U' R U' R2 U L U' R U L'"
				}, {
					type: ['CMLL', 'CLL'],
					moveSet: 'RUF',
					auf: 'U',
					alg: "F R' F' R U2 R U' R' U R U2 R'"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					alg: "R' F2 R F' U2 R U' R' U' F"
				}]
			}, {
				perm: 2,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					alg: "R U R' U' R' F R2 U R' U' R U R' U' F'"
				}, {
					type: '*',
					moveSet: 'RUL',
					alg: "R' U2 R U R' U R2 U' L' U R' U' L"
				}, {
					type: '*',
					moveSet: 'RUF',
					alg: "R U R' U F2 R U2 R' U2 R' F2 R"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					alg: "R U R' U F2 R U2 R' U2 R' F2 R"
				}]
			}, {
				perm: 3,
				algs: [{
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "F U R U' R' U R U2 R' U' R U R' F'"
				}, {
					type: '*',
					moveSet: 'RUF',
					alg: "R' U' F' R U R' U' R' F R2 U2 R' U2 R"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					auf: 'U\'',
					alg: "U' R' F R U F U' R U R' U' F'"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					auf: 'U\'',
					alg: "R U' R U' R' U R' F R2 F'"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					auf: 'y',
					alg: "F R2 U' R2 U R2 U R2 F'"
				}]
			}, {
				perm: 4,
				algs: [{
					type: '*',
					moveSet: 'RUL',
					alg: "R U' L' U R' U L U L' U L"
				}, {
					type: '*',
					moveSet: 'RU',
					alg: "r U' r' U' r U r' U' x' R2 U' R' U R' x"
				}, {
					type: '*',
					moveSet: 'RUL',
					alg: "L U' R' U L' U R U R' U R"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					alg: "R U' R' F R' F R U R' F R"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					auf: 'U2',
					alg: "R' F R F' R U' R' U' R U' R'"
				}]
			}, {
				perm: 5,
				algs: [{
					type: '*',
					moveSet: 'RUD',
					alg: "R U D' R U R' D R2 U' R' U' R2' U2' R"
				}, {
					type: '*',
					moveSet: 'RUF',
					auf: 'U',
					alg: "R U2 R' U' F' R U2 R' U' R U' R' F R U' R'"
				}, {
					type: '*',
					moveSet: 'RUF',
					alg: "F R2' U' R U' R U' R' U2 R' U R2 F'"
				}, {
					type: ['CLL', 'CMLL'],
					moveSet: 'RUF',
					auf: 'U2',
					alg: "R' U' R U' R' U F' U F R"
				}, {
					type: 'CLL',
					moveSet: 'RUF',
					alg: "R' U' R' F R F' R U' R' U2 R"
				}]
			}]
		}, 
		L: {
			oll: [-1, 0, 1, 0],
			cases: [{
				perm: 0
			}, {
				perm: 1
			}, {
				perm: 2
			}, {
				perm: 3
			}, {
				perm: 4
			}, {
				perm: 5
			}]
		}, 
		S: {
			oll: [1, 1, 1, 0],
			cases: [{

			}]
		},
		AS: {
			oll: [-1, -1, -1, 0],
			cases: [{

			}]
		}
	}
};
