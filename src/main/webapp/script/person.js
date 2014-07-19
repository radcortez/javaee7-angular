var app = angular.module('persons', ['ngResource', 'ngGrid', 'ui.bootstrap']);

// Create a controller with name personsList to bind to the html page.
app.controller('personsListController', function ($scope, $rootScope, personService) {
    // Refresh the grid, calling the appropriate service method.
    $scope.refreshGrid = function () {
        var listPersonsArgs = {
            page: $scope.persons.currentPage,
            sortFields: $scope.sortInfo.fields[0],
            sortDirections: $scope.sortInfo.directions[0]
        };

        personService.get(listPersonsArgs, function (data) {
            $scope.persons = data;
        })
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
        $scope.refreshGrid();
    }, true);

    // Initialize required information: sorting, the first page to show and the grid options.
    $scope.sortInfo = {fields: ['id'], directions: ['asc']};
    $scope.persons = {currentPage: 1};

    $scope.gridOptions = {
        data: 'persons.list',
        useExternalSorting: true,
        sortInfo: $scope.sortInfo,

        columnDefs: [
            { field: 'id', displayName:'Id' },
            { field: 'name', displayName: 'Name' },
            { field: 'description', displayName: 'Description' }
        ],

        multiSelect: false,
        selectedItems: [],
        afterSelectionChange: function (rowItem) {
            if (rowItem.selected) {
                $rootScope.$broadcast('personSelected', $scope.gridOptions.selectedItems[0].id);
            }
        }
    };

    $scope.$on('personsDirty', function () {
        $scope.refreshGrid();
    });
});

app.controller('personsFormController', function ($scope, $rootScope, personService) {
    $scope.clearForm = function () {
        $scope.person = null;
    };

    $scope.$on('personSelected', function (event, id) {
        $scope.person = personService.get({id: id});
    });

    $scope.updatePerson = function () {
        personService.save($scope.person).$promise.then(
            function () {
                $rootScope.$broadcast('personsDirty');
                $rootScope.$broadcast('personSaved')
                $scope.clearForm();
            });
    };

    $scope.deletePerson = function () {
        personService.delete({id: $scope.person.id}).$promise.then(
            function () {
                $rootScope.$broadcast('personsDirty');
                $rootScope.$broadcast('personDeleted');
                $scope.clearForm();
            });
    };
});

app.controller('alertMessagesController', function ($scope) {
    $scope.$on('personSaved', function (event) {
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    $scope.$on('personDeleted', function (event) {
        $scope.alerts = [
            { type: 'success', msg: 'Record deleted successfully!' }
        ];
    });

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

// Service that provides persons operations
app.factory('personService', function ($resource) {
    return $resource('resources/persons/:id');
});
