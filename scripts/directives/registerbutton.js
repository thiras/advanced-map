app.directive("registerbutton",function ($http) {

    return {
        restrict:"A",
        link:function ($scope,$el,$attr) {
            $el.bind("click",function () {


                alert(JSON.stringify($scope.user));

            })
        }
    }

});