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
            viewTitle: '@',
            pageSize: '@'
        },
        compile: function (element, attrs) { //setting default values
            if (!attrs.pageSize) { attrs.pageSize = '10'; }
        }
    };
    return directive;

    function link(scope, element, attrs) {

    }
}

/* @ngInject */
function splistController($attrs, $scope, $q, spListsFactory) {
    spListsFactory.getItemsWithLookups($attrs.siteUrl, $attrs.listTitle, $attrs.viewTitle, $attrs.pageSize)
        .then(function (results) {
            $scope.items = results.items;
            $scope.nextUrl = results.nextUrl;
            $scope.viewFields = results.viewFields;
            $scope.itemForm = results.itemForm;
        });

    $scope.getNextBatchOfItems = getNextBatchOfItems;

    function getNextBatchOfItems() {
        if(!$scope.nextUrl){
            console.log('no more items left');
            return;
        }
        spListsFactory.getNextItems($scope.nextUrl, $scope.viewFields)
            .then(function (results) {
                $scope.items = $scope.items.concat(results.items);
                $scope.nextUrl = results.nextUrl;
                
            });
    }
}