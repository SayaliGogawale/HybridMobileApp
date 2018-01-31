app.service('sampleService', ['$log',
    function($log) {
        var data = {};
        var data1 = {};
        return {
            getSelectedSampleData: function() {
                return data1;
            },
            setSelectedSampleData: function(data) {
                data1 = data;
            },
        };
    }
]);
