(function() {
  angular.module('myApp').controller('PostEventController', PostEventController);

  function PostEventController($http) {
    var vm = this;

    vm.postEvent = function() {
      //read from the form
      var postData = {
        name: vm.name,
        organizer: vm.organizer,
        date: vm.date,
        time: vm.time,
        cost: vm.cost,
        type: vm.type,
        details: vm.details,
        tags: vm.tags,
        venueName: vm.venueName,
        streetAddress: vm.streetAddress,
        city: vm.city,
        state: vm.state,
        zipCode: vm.zipCode,
      };
      $http.post('/api/viewevent/', postData).then(function(response) {
        window.location = "#/eventlist";
      });
    };
  }
})();