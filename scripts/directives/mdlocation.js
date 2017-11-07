app.directive("mdLocation",function () {

    return {

        restrict:"E",
        templateUrl:'html/directives/mdlocation.html',
        link:function ($scope,$el,$attr) {


            $el.on("click",function () {

                alert("tıkla")
            })

        }
    }

});