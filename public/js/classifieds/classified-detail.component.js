(function() {
  'use strict'

  angular.module('app')
    .component('classifiedDetail', {
      templateUrl: '/js/classifieds/classified-detail.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state']
  function controller($http, $stateParams, $state) {
    const vm = this

    vm.$onInit = onInit
    vm.updateClassified = updateClassified
    vm.deleteClassified = deleteClassified

    function onInit() {
      $http.get(`/classifieds/${$stateParams.id}`)
        .then(response => {
          vm.classified = response.data
        })
    }

    function updateClassified() {
      $http.patch(`/classifieds/${$stateParams.id}`, vm.classified)
        .then(response => {
            $state.go('home')
        })
    }

    function deleteClassified() {
      $http.delete(`/classifieds/${$stateParams.id}`)
        .then(response => {
            $state.go('home')
        })
    }
  }

}());
