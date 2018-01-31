app.service('environmentPointingService',function() {
		var stgEnv = "http://172.16.2.18:8080/IMAAPIS/";
		var prodEnv = "http://iconnect.indushealthplus.com/IMAAPIS/";
        return {
            getEnvUrl: function() {
                return prodEnv;
            },

        };
    }
);
