var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.showUsers = false;

  $http.get("users").then(loadUsers);

  $scope.addEmail = function() {
    $scope.errors = '';
    $http.post('/users', { user: { email: $scope.newEmail, password: 'password' } }).then(callbackAddFunction);
  };

  $scope.deleteEmail = function() {
    $http.delete('/users/' + $scope.users[$scope.users.length - 1].id).then(callbackDeleteFunction);
  };

  function loadUsers(response) {
    $scope.users = response.data.map(function(user) {
      return {
        id: user.id,
        email: user.email
      }
    });
  };

  $scope.toggleDivs = function() {
    $scope.showUsers = !$scope.showUsers;
  }

  function callbackAddFunction(response) {
    if (response.data.id != 0) {
      $scope.users.push({ id: response.data.id, email: $scope.newEmail });
    } else {
      $scope.errors = response.data.errors
    }
    $scope.newEmail = '';
  };

  function callbackDeleteFunction(response) {
    $scope.users.splice(-1,1);
  };
});
