app.controller("navigationCtrl", function ($scope) {
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

    /*araya şehir ekleme son*/

});