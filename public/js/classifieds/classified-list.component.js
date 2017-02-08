(function() {
    'use strict'

    angular.module('app')
        .component('classifiedList', {
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
            //console.log("vm.classifieds response = ", vm.classifieds);
        }

        function createClassified() {
            console.log("f:createClassified | vm.classified = ", vm.classified);
            vm.classified.item_image = 'http://lorempixel.com/400/200/sports/1'
            $http.post('/classifieds', vm.classified)
                .then(response => {
                    console.log("response", response.data);
                    vm.classifieds.push(response.data)
                    delete vm.classified
                })
        }
    }

}());
