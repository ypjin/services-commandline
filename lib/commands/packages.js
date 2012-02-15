"use strict"; 

;(function() {
	// External
	var _ = require("underscore");
	
	// Internal 
	var Base = require("./base");

	module.exports = new Base({
		name: "packages",
		description: "Enumerates all available packages.",

		execute: function(output) {
			var serviceApi = this.getServiceApi();
			var packages = serviceApi.serviceManager.getPackages();

			_.each(packages, function(p) {
				output.write(p.getPackageId() + "\t" + p.getPackageName());
				output.write("\t");
				output.write("\n");

			});

			output.close();
		}
	});
	
})();