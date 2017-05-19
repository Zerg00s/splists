(function () {
    'use strict';

    angular.module('app', ['splists', 'ui.grid', 'ui.grid.resizeColumns']);

    angular.module('app')
        .controller('AppController', AppController);

    AppController.inject = [];
    function AppController() {
        var vm = this;

        vm.message = "sp-list directive";
    }
})();