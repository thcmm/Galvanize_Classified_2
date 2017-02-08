(function() {
  'use strict'

  angular.module('app')
    .component('classifiedsList', {
      require: {
        layout: '^app'
      },
      templateUrl: '/js/classifieds/classified-list.template.html',
      controller: controller
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this;

    vm.$onInit = onInit;
    vm.createClassified = createClassified;

    function onInit() {
      console.log("classified-list.component: onInit");
      $http.get('/classifieds')
        .then(response => vm.classifieds = response.data)
    }

    function createClassified() {
      $http.post('/classifieds', vm.classified)
        .then(response => {
          console.log("response", response.data);
          vm.classifieds.push(response.data)
          delete vm.classified
        })
    }

  }

}());
