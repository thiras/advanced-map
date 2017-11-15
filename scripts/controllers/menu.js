app.controller("menuRightClick", function ($scope, $window,$timeout,$mdMenu,$rootScope,$mdToast) {

    $scope.print = function () {

        let answer =confirm("Ekran yazdırılsın mı");

       if(answer==1){
           document.querySelector("#map").style.zIndex = 100;

           $mdMenu.hide();


           $timeout(function () {
               $window.print();
               document.querySelector("#map").style.zIndex = 1;

           },100);

       }



    }

    $scope.openRota=function () {
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'navigationCtrl',
            templateUrl: 'html/menuToast/findRotaToast.html',
        });
    }

});