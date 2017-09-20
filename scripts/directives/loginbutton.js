

app.directive("loginbutton",function ($http) {



    return{


        link:function ($scope,$el,$attr) {


            $el.bind("click",function () {



               alert($scope.user.address);

                /*


               burası tamemen login olacak

                diloagu kapatmak için
                angular.element(hide).triggerHandler('click')


                 */


            })
        }
    }
});