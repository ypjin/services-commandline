"use strict"; 

;(function() {
	// External
	var _ = require("underscore");
	
	// Internal 
	var Base = require("./base");
	
	module.exports = new Base({
		name: "startpkg",
		description: "Enumerates all available packages.",

		execute: function(output, args) {
			if(args.length === 0 ) {
				output.write("Missing argument - Package ID or Name");
				output.close();
				return;
			}

			var name = args[0];

			var serviceApi = this.getServiceApi();
			var pkg = serviceApi.serviceManager.getPackage(name);

			if(pkg) {
				pkg.start();
			} else {
				_.each(serviceApi.serviceManager.getPackages(), function(p) {
					if(p.getPackageId() == name) {
						p.start();
						return false;
					}
				});
			}

			output.close();
		}
	});
	
	})();