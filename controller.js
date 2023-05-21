var app = angular.module("MyFirstApp", []);
app.controller("FirstController", ["$scope", function($scope) {

    $scope.items = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'];


}])