"use strict";

var _ = require("underscore");

var Base = function(impl) {
	_.extend(this, impl);
};

Base.prototype = {
	// Injection point for the service api.
	setServiceApi: function(s) {
		this.serviceApi = s;
	},

	// unsets the service api. 
	unsetServiceApi: function() {
		delete this.serviceApi;
	},
	
	// Get service api.
	getServiceApi: function() {
		return this.serviceApi;
	}	
};

module.exports = Base;