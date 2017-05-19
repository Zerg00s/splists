(function () {
    'use strict';
    angular.module('splists', []);
})();

angular
    .module('splists')
    .directive('splist', splist);

splist.inject = ['$http', '$sce'];
function splist($http, $sce) {
    // Usage: 
    //<splist site-url='/sd/' list-title='SampleList' page-size='10' view-title='All Items'></splist>
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

function splistController($attrs, $scope, $q, spListsFactory, $window) {
    spListsFactory.getItemsWithLookups($attrs.siteUrl, $attrs.listTitle, $attrs.viewTitle, $attrs.pageSize)
        .then(function (results) {
            $scope.items = results.items;
            $scope.nextUrl = results.nextUrl;
            $scope.viewFields = results.viewFields;
            $scope.itemForm = results.itemForm;
            $scope.columnDefs = getColumnDefs($scope.viewFields);
        });

    $scope.getNextBatchOfItems = getNextBatchOfItems;

    $scope.click = function (row) {
        console.log(row.entity);
        $window.open($scope.itemForm + "?ID=" + row.entity.ID, '_blank');
    }

    function getNextBatchOfItems() {
        if (!$scope.nextUrl) {
            console.log('no more items left');
            return;
        }
        spListsFactory.getNextItems($scope.nextUrl, $scope.viewFields)
            .then(function (results) {
                $scope.items = $scope.items.concat(results.items);
                $scope.nextUrl = results.nextUrl;
            });
    }

    function getColumnDefs(viewFields) {
        columnDefs = [];
        var columnDefinition = { name: ' ' };
        columnDefinition.cellTemplate = '<div><a class="open-link" ng-click="grid.appScope.click(row)" href="#" >Log row</a></div>'
        columnDefs.push(columnDefinition);
        for (field of viewFields) {
            var columnDefinition = {
                field: field.InternalName, displayName: field.Title
            };
            if (field.InternalName == "File" ||
                (field.TypeAsString == "Note" && field.RichText) ||
                field.TypeAsString == "URL"
            ) {
                columnDefinition.cellTemplate = '<div ng-bind-html="row.entity[col.field]"></div>';
            }
            columnDefs.push(columnDefinition);
        }

        return columnDefs;
    }
}