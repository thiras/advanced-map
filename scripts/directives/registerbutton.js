app.directive("registerbutton",function ($http) {

    return {
        link:function ($scope,$el,$attr) {
            $el.bind("click",function () {


                alert(JSON.stringify($scope.user));

            })
        }
    }

});