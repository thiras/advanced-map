app.controller("navigationCtrl", function ($scope,$mdToast) {
    /* araya şehir merkez ekleme baş*/
    $scope.arrayPointCity = [];
    $scope.addCityToNavigation = function (a) {


        var kontrol = $scope.arrayPointCity.find(function (item) {

            return a == item;
        });


        if (!kontrol) {

            $scope.arrayPointCity.push(a);
            $scope.addCityName = "";
        }


    }

    $scope.removeCityToNavigation = function (i) {

        $scope.arrayPointCity.splice(i, 1);

    }


    $scope.cancel = function () {
        $mdToast.hide();
        $timeout(function () {
            angular.element(document.querySelector("#menus")).triggerHandler("click");
        }, 10);


    };

    /*araya şehir ekleme son*/

});