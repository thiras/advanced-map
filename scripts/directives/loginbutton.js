app.directive("loginbutton", function ($http) {
    return {
        restrict: "A",
        link: function ($scope, $el, $attr) {


            $el.bind("click", function () {

                let ajaxJson = {user: $scope.loginUser, pass: $scope.loginPass};
                alert(JSON.stringify(ajaxJson));
            })
        }
    }
});