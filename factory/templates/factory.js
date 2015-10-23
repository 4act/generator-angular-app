(function(angular) {
    'use strict';

    angular.module('<%= appname %>').factory('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    function <%= _.camelize(name) %>() {

    }

})(angular);
