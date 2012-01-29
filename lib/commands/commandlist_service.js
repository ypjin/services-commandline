"use strict";

// Internal
var Base = require("./base");

var commands = [
	require("./lspkg"),
	require("./lss"),
	require("./startpkg"),
	require("./stoppkg")
	// ,	require("./refs")
];

module.exports  = {
	// Injection point for the service api.
	setServiceApi: function(api) {
		this.serviceApi = api;

		if(api) {
			for(var idx in commands) {
				commands[idx].setServiceApi(api);
			}
		}
	},

	// unsets the service api. 
	unsetServiceApi: function(api) {
		if(this.serviceApi === api) {

			if(api) {
				for(var idx in commands) {
					commands[idx].unsetServiceApi(api);
				}
			}

			delete this.serviceApi;
		}
	},

	// Returns a array of commands.
	getCommandList: function() {
		return commands;
	}
};
