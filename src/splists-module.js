(function () {
    'use strict';
    angular.module('splists', []);
})();

angular
    .module('splists')
    .directive('splist', splist);

splist.inject = ['$http'];
function splist($http) {
    // Usage: 
    //
    // Creates:
    //
    var directive = {
        bindToController: true,
        controller: splistController,
        controllerAs: 'vm',
        templateUrl: 'splist-view.html',
        link: link,
        restrict: 'E',
        scope: {
            siteUrl: '@',
            listTitle: '@',
            viewTitle: '@'
        }
    };
    return directive;

    function link(scope, element, attrs) {

    }
}
/* @ngInject */
function splistController($attrs, $scope, $q, spListsFactory) {
    spListsFactory.getViewFieldsRitch($attrs.siteUrl, $attrs.listTitle, $attrs.viewTitle)
    .then(function(viewFields){
        $scope.viewFields = viewFields;
    });


    spListsFactory.getAllItems($attrs.siteUrl, $attrs.listTitle)
        .then(function (items) {
            $scope.items = items;
        });


}