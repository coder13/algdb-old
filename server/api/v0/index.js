'use strict';



module.exports = [{
	method: 'GET',
	path: '/api/v0',
	handler: function (request, reply) {
		reply({
			version: require('../../../package.json').version
		});
	}
}, {
	method: 'GET',
	path: '/api/v0/set/{set}',
	handler: function (request, reply) {
		console.log(request.params);
		let set = data.find(set => set.id.toLowerCase() === request.params.set.toLowerCase());
		if (set) {
			reply(set);
		} else {
			reply(`Could not find set ${request.params.set}`);
		}
	}
}];
