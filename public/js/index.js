var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.showForm = true;
  $scope.showSignIn = true;

  $http.get('/access').then(showContent);

  $scope.submitSignUpForm = function() {
    $scope.formErrors = '';
    $http.post('/sign_up', { user: { email: $scope.emailInput, password: $scope.passwordInput } }).then(signInCallback);
  };

  $scope.submitSignInForm = function() {
    $scope.formErrors = '';
    $http.put('/sign_in', { user: { email: $scope.emailInput, password: $scope.passwordInput } }).then(signInCallback);
  };

  $scope.signOut = function() {
    $http.delete('/sign_out').then(() => { $scope.showForm = true });
  };

  $scope.toggleForms = function() {
    $scope.showSignIn = !$scope.showSignIn;
  };

  function signInCallback(response) {
    if (response.data.id != 0) {
      $scope.showForm = false;
      $http.get("users").then(loadUsers);
    }
    $scope.emailInput = '';
    $scope.passwordInput = '';
    $scope.formErrors = response.data.errors;
  };

  function showContent(response) {
    if(response.data.id != 0 ) {
      $scope.showForm = false;
      $http.get("users").then(loadUsers);
    } else {
      $scope.showForm = true;
    }
  };

  function loadUsers(response) {
    $scope.users = response.data.map(function(user) {
      return {
        id: user.id,
        email: user.email
      }
    });
  };
});
