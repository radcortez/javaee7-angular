var app = angular.module('persons', ['ngGrid', 'ui.bootstrap']);

// Create a controller with name personsList to bind to the html page.
app.controller('personsList', function ($scope, personService) {
    // Refresh the grid, calling the appropriate service method.
    $scope.refreshGrid = function (page) {
        personService.getAll(page, $scope.sortInfo.fields[0], $scope.sortInfo.directions[0]).success(function (data) {
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
    $scope.$watch('sortInfo.fields[0]', function () {
        $scope.refreshGrid($scope.persons.currentPage);
    }, true);

    // Initialize required information: sorting, the first page to show and the grid options.
    $scope.sortInfo = {fields: ['id'], directions: ['asc']};
    $scope.persons = {currentPage: 1};
    $scope.gridOptions = {
        data: 'persons.list',
        useExternalSorting: true,
        sortInfo: $scope.sortInfo
    };
});

// Service that provides persons operations
app.service('personService', function ($http) {
    // Makes the REST request to get the data to populate the grid.
    this.getAll = function (page, sortFields, sortDirections) {
        return $http.get('resources/persons', {
            params: {
                page: page,
                sortFields: sortFields,
                sortDirections: sortDirections
            }});
    }
});
