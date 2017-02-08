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
        let showCreateClassified = false; // Dölj skapa annons block
        let sortClassifiedBy = 'id';
        let sortingBy = 'Id';
        let searchBy = '';

        vm.$onInit = onInit;
        vm.createClassified = createClassified;
        vm.toggleCreateClassifiedBlock = toggleCreateClassifiedBlock;
        vm.sortClassifieds = sortClassifieds;

        function onInit() {
            console.log("classified-list.component: onInit");
            $http.get('/classifieds')
                .then(response => vm.classifieds = response.data);
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

        function toggleCreateClassifiedBlock() {
            // console.log("f:toggleCreateClassifiedBlock");
            vm.showCreateClassified = !vm.showCreateClassified;
            console.log("f:toggleCreateClassifiedBlock: ", vm.showCreateClassified);
        }

        function sortClassifieds(by) {
            console.log('f:sortClassifieds = ', by);
            switch (by) {
                case "id":
                    vm.sortClassifiedBy = 'id';
                    vm.sortingBy = "Id"
                    break;
                case "date":
                    vm.sortClassifiedBy = 'date';
                    vm.sortingBy = "Date"
                    break;
                case "price":
                    vm.sortClassifiedBy = 'price';
                    vm.sortingBy = "Price"
                    break;
            }
        }
    }
}());
