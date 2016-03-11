var Model = require('ampersand-model');

var aufRegex = /^([U]['2]?)?$/; // tests nothing, U, U', U2
var algRegex =  /^([RLFBUDrlfbudxyz]|[RLFBUD]w*|[ 2'])+$/;

module.exports = Model.extend({
	idAttribute: '_id',
	props: {
		auf: {
			type: 'string',
			default: ''
		},
		alg: {
			type: 'string',
			default: ''
		},
		type: {
			type: 'string',
			default: '*'
		}
	},

	edit () {
		this.trigger('edit');
	},

	remove () {
		this.collection.remove(this);
		this.collection.save();
	},

	validate: function () {
		return aufRegex.test(this.auf) && (this.alg === '' || algRegex.test(this.alg));
	},

	save () {
		this.collection.save();
	}
});
