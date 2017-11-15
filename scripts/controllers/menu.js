app.controller("menuRightClick", function ($scope, $window,$timeout) {

    $scope.print = function () {

        let answer =confirm("Ekran yazdırılsın mı");
        document.querySelector("#map").style.zIndex = 100;
        answer == 1 ? $window.print() : "";

        $timeout(function () {
            document.querySelector("#map").style.zIndex = 1;

        })

    }

});