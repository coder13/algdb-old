module.exports = {
	"id": "pll",
	"name": "Permutation of the Last Layer",
	"image": "pll",
	"abbrev": "PLL",
	"description": "PLL is the acronym for **Permutation of the Last Layer**. PLL is the last step of many speedsolving methods. In this step, the pieces on the top layer have already been oriented [OLL](/set/oll) so that the top face has all the same color, and they can now be moved into their solved positions. There are 21 PLLs (13 if you count mirrors and inverses as being the same) and each one is named after a letter. The same algorithm may not be the fastest for everyone, and shorter algorithms are not always faster than longer ones. PLL is a subgroup of [ZBLL](/set/zbll).",
	"cube": {
		"centers": [0, 1, 2, 3, 4, 5],
		"edges": {
			"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		},
		"corners": {
			"orient": [0, 0, 0, 0, 0, 0, 0, 0],
			"perm": [0, 1, 2, 3, 4, 5, 6, 7]
		},
		"mask": 0xfffff
	},
	"subsets": [],
	"cases": [{
		"id": "Aa",
		"name": "Aa",
		"algs": [{
			"auf": "",
			"alg": "l' U R' D2 R U' R' D2 R",
			"type": "*"
		}, {
			"alg": "x R' U R' D2 R U' R' D2 R2",
			"type": "*"
		}, {
			"alg": "R' F R' B2 R F' R' B2 R2",
			"type": "*"
		}, {
			"alg": "x' R2 D2' R' U' R D2' R' U R'",
			"auf": "U",
			"type": "*"
		}, {
			"alg": "R U R' F' r U R' U' r' F R2 U' R'",
			"auf": "U'",
			"type": "*"
		}],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [1, 2, 0, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Ab",
		"name": "Ab",
		"algs": [{
			"alg": "l' R' D2 R U R' D2 R U' R x'",
			"type": "*"
		}, {
			"alg": "x R2' D2 R U R' D2 R U' R x'",
			"type": "*"
		}, {
			"alg": "l U' R D2 R' U R D2 R2",
			"auf": "U",
			"type": "*"
		}, {
			"alg": "x' R U' R D2 R' U R D2 R2",
			"auf": "U",
			"type": "*"
		}],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [2, 0, 1, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "E",
		"name": "E",
		"algs": [{
			"alg": "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
			"auf": "U",
			"type": "*"
		}, {
			"alg": "R2 U R' U' y R U R' U' R U R' U' R U R' y' R U' R2",
			"type": "*"
		}, {
			"alg": "z U2' R2' F R U R' U' R U R' U' R U R' U' F' R2 U2'",
			"type": "TH"
		}, {
			"alg": "y x' R U' R' D R U R' u2 R' U R D R' U' R x",
			"type": "*"
		}],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "F",
		"name": "F",
		"algs": [{
			"alg": "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
			"auf": "U",
			"type": "TH"
		}, {
			"alg": "R' U2 R' d' R' F' R2 U' R' U R' F R U' F",
			"auf": "U2",
			"type": "TH"
		}, {
			"alg": "R' U R U' R2 F' U' F U R F R' F' R2",
			"type": "TH"
		}, {
			"alg": "M' U2 L F' R U2 r' U r' R2 U2 R",
			"type": "TH"
		}],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Ga",
		"name": "Ga",
		"algs": [{
			"alg": "R2 u R' U R' U' R u' R2 y' R' U R",
			"type": "*"
		}, {
			"alg": "R2 U R' U R' U' R U' R2 D U' R' U R D'",
			"type": "*"
		}, {
			"alg": "R2 u R' U R' U' R u' R2 F' U F",
			"type": "*"
		}, {
			"alg": "D' R2 U R' U R' U' R U' R2 U' D R' U R",
			"type": "*"
		}],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Gb",
		"name": "Gb",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Gc",
		"name": "Gc",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Gd",
		"name": "Gd",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "H",
		"name": "H",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Ja",
		"name": "Ja",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Jb",
		"name": "Jb",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Na",
		"name": "Na",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Nb",
		"name": "Nb",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Ra",
		"name": "Ra",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Rb",
		"name": "Rb",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "T",
		"name": "T",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Ua",
		"name": "Ua",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Ub",
		"name": "Ub",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "V",
		"name": "V",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Y",
		"name": "Y",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}, {
		"id": "Z",
		"name": "Z",
		"algs": [],
		"cube": {
			"centers": [0, 1, 2, 3, 4, 5],
			"edges": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			},
			"corners": {
				"orient": [0, 0, 0, 0, 0, 0, 0, 0],
				"perm": [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}
	}]
}
