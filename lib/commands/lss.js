"use strict"; 

;(function() {
	// External
	var _ = require("underscore");
	
	// Internal 
	var Base = require("./base");

	function sep(num) {
		if(num.length == 2) return "   ";
		if(num.length == 3) return "  ";
		return " ";
	};

	function serviceLine(e) {
		var state = e.isStarted() ? "started" : "stopped";
		var id = ""+ e.getServiceId();
		return  id + sep(id) + " <" + state + ">\t" + e
	}

	module.exports = new Base({
		name: "lss",
		description: "Enumerates all available services.",

		execute: function(output) {
			var serviceApi = this.getServiceApi();

			var serviceList = serviceApi.serviceManager.getServices();

			serviceList.sort(function(a,b) {
				return a.getServiceId() - b.getServiceId();
			});

			_.each(serviceList, function(e) {
				output.write(serviceLine(e));
				
				if(e.isStarted()) {
					_.each(e.getBindServices(), function(s) {
						output.write("\n\t--> " + serviceLine(s));
						
					})
				}

				output.write("\n");
			})

			output.close();
		}
	});
	
	})();