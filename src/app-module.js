(function() {
    'use strict';

    angular.module('app', [
        'splists'
    ]);
})();


(function() {
'use strict';

    angular
        .module('app')
        .controller('AppController', ControllerController);

    ControllerController.inject = []; 
    function ControllerController() {
        var vm = this;
        
        vm.message = "hello world"
      
     
    }
})();