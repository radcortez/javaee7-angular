var app = angular.module('persons', ['ngGrid', 'ui.bootstrap']);

app.controller('personsList', function ($scope, $http) {
    $scope.refreshGrid = function (page) {
        $http({
            url: 'resources/persons',
            method: 'GET',
            params: {
                page: page,
                sortFields: $scope.sortInfo.fields[0],
                sortDirections: $scope.sortInfo.directions[0]
            }
        }).success(function (data) {
            $scope.persons = data;
        });
    };

    $scope.$on('ngGridEventSorted', function (event, sortInfo) {
        $scope.sortInfo = sortInfo;

    });

    $scope.$watch('sortInfo', function () {
        $scope.refreshGrid($scope.persons.currentPage);
    }, true);

    $scope.sortInfo = {fields: ['id'], directions: ['asc']};
    $scope.persons = {currentPage : 1};

    $scope.gridOptions = {
        data: 'persons.list',
        useExternalSorting: true,
        sortinfo: $scope.sortInfo
    };
});

