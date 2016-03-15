(function(angular) {
    'use strict';

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            bindToController: {

            },
            templateUrl: '<%= htmlPath %>',
            controller: <%= ctrlname %>,
            controllerAs: '<%= controllerAs %>'
        };
    });

    function <%= ctrlname %>() {
        var <%= controllerAs %> = this;

        /* put bindable members here like
         <%= controllerAs %>.buttonClick = buttonClick;
         */

        init();


        function init() {
            //do stuff to init controller
        }

        return <%= controllerAs %>;
    }
})(angular);
