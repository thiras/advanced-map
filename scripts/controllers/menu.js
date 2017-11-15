app.controller("menuRightClick", function ($scope, $window,$timeout,$mdMenu) {

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

});