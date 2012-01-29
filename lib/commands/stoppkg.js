"use strict"; 

;(function() {
	// External
	var _ = require("underscore");
	
	// Internal 
	var Base = require("./base");

	module.exports = new Base({
		name: "stoppkg",
		description: "Enumerates all available packages.",

		execute: function(output, name) {
			if(!name) {
				output.write("Missing argument - Package ID or Name");
				output.close();
				return;

			}

			var serviceApi = this.getServiceApi();
			var pkg = serviceApi.serviceManager.getPackage(name);

			if(pkg) {
				pkg.stop();
			} else {
				_.each(serviceApi.serviceManager.getPackages(), function(p) {
					if(p.getPackageId() == name) {
						p.stop();
						return false;
					}
					
				});
			}

			output.close();
		}
	});
	
	})();