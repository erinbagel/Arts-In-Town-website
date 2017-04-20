(function () {     // Building controllers for api http requests 

  // asssign controllers to myApp module 
  
  angular.module('myApp').controller('UserController', UsrController);
  angular.module('myApp').controller('CreateUserController', CreateUserController);
  angular.module('myApp').controller('GetOneUserProfileController', ['$scope', '$http', 
  '$routeParams', GetOneUserProfileController]);

  angular.module('myApp').controller('RegisterController', RegisterController);
  angular.module('myApp').controller('LoginController', LoginController);
  
  function RegisterController($http) {
  var vm = this;

  vm.register = function() {
    var user = {
      firstName: vm.firstName,
      lastName: vm.lastName,
      email: vm.email,
      username: vm.username,
      password: vm.password
    };

    $http.post('/api/register', user).then(function(result) {
          console.log(result); 
          window.location = "#/userprofile";});
  }
};

  function LoginController($http, $scope) {
    var vm = this;
  
    vm.login = function() {
      console.log("logging in");
      if (vm.username && vm.password) {
         var user = {
            username: vm.username,
            password: vm.password
          };
  
          // post because we need to pass data user to the api controller
          $http.post('/api/login', user).then(function(response) {
                // response.data looks like {success: true, token: token, user: user}        
            
                 console.log(response.data.user);
                
                  vm.isLoggedIn = true;
                  vm.loginuser = response.data.user; 
                  var id = vm.loginuser.id
                
                 window.location = "#/userprofile" ;
          });
    } }
  
      vm.logout = function() {
        vm.isLoggedIn = false;
        window.location = "#/login";
      }
  
  }

  
  function UsrController($http) {
      var myModel = this;
      myModel.name = 'User';
      
      $http.get('/api/users').then(function(response) {
          myModel.response = response;
      });
    
  }
  

  // function CreateUserController($http) {
  //   var vm  = this;
  //   vm.addUser  = function() {
    
  //   var postData = {
  //         firstName: vm.firstName,
  //         lastName: vm.lastName,
  //         email: vm.email,
  //         username: vm.username,
  //         password: vm.password
  //       };
    
  //       console.log(postData);
  //       $http.post('api/users/createuser', postData).then(function(response) {
  //               vm.newuser = response.data;
  //               console.log(response.status);
  //               window.location = "/#userprofile";
  //     });
  //   };
  // }
    
    
  function GetOneUserProfileController($scope, $http, $routeParams) {
      var vm = this;
      
      var id = $routeParams.id;
      
      $http.get('api/users/' + id)
      .success(function(response) {
         $scope.users = data[$routeParams.id];
      });
      
      vm.deleteUser = function() {
          $http.delete('/api/users', + $routeParams.id)
          .then(function(response) {
              console.log(response.status);
              window.location = "#/userprofile";
          });
      }
  }
  
})();