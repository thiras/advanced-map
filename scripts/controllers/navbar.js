app.controller("navbar",function($scope,$accordion,$timeout,$mdDialog,$rootScope,$mdSidenav) {

    $scope.menuJSON =$accordion;
    /*  menu acma ayar bas*/
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');



    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    }


    /* menu acma ayar son */

    $timeout(function () {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {

                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    });



    $scope.factoryDesign=function (fn) {

       $scope[fn["fonk"]]();
    }




    $scope.menuContact=function () {

        alert = $mdDialog.alert({
            title: 'İletişim',
            textContent: 'Bizimle iletişim bilgileri falan filan!',
            ok: 'Close'
        });

        $mdDialog
            .show( alert )
            .finally(function() {
                alert = undefined;
            });
    }




    $scope.parselmenu1=function (event) {


       // $scope.toggleLeft();

        $mdDialog.show({
            controller: navbarCtrl,
            templateUrl: 'dialogs/access.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            closeTo: '#closeBtn'
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    }



    $scope.ulasim=function () {

        alert("ulaşım methodu")
    }


    function navbarCtrl($scope){


        $scope.cancel=function () {

            $mdDialog.cancel();
        }



    }




});
