app.service('profileDataService', ['$log',function($log) {
        var data = {};
        var data1 = {};
        return {
            getSelectedData: function() {
                return data1;
            },
            setSelectedData: function(data) {
                data1 = data;
            },
        };
    }
]);
