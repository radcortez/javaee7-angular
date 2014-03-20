var app = angular.module('persons', ['ngGrid', 'ui.bootstrap']);

// Create a controller with name personsList to bind to the html page.
app.controller('personsList', function ($scope, $http) {
    // Makes the REST request to get the data to populate the grid.
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

    // Do something when the grid is sorted.
    // The grid throws the ngGridEventSorted that gets picked up here and assigns the sortInfo to the scope.
    // This will allow to watch the sortInfo in the scope for changed and refresh the grid.
    $scope.$on('ngGridEventSorted', function (event, sortInfo) {
        $scope.sortInfo = sortInfo;
    });

    // Watch the sortInfo variable. If changes are detected than we need to refresh the grid.
    // This also works for the first page access, since we assign the initial sorting in the initialize section.
    $scope.$watch('sortInfo', function () {
        $scope.refreshGrid($scope.persons.currentPage);
    }, true);

    // Initialize required information: sorting, the first page to show and the grid options.
    $scope.sortInfo = {fields: ['id'], directions: ['asc']};
    $scope.persons = {currentPage : 1};
    $scope.gridOptions = {
        data: 'persons.list',
        useExternalSorting: true,
        sortInfo: $scope.sortInfo
    };
});

