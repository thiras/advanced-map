app.controller("navbar", function ($scope, $accordion, $timeout, $mdDialog, $rootScope,$mdToast) {

    /*navbar menusu event ve fonksiyonları içeririr*/
    $scope.menuJSON = $accordion;
    /*  menu acma ayar bas*/
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.lang = $rootScope.lang;


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
            acc[i].onclick = function () {

                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    });


    $scope.factoryDesign = function (fn) {

        $scope[fn["fonk"]]();
    }

    $scope.findAdressPanel=function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findAdressToast.html',
        });
    };

    $scope.findParcellPanel=function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findParcellToast.html',
        });
    };

    $scope.findTaxiAtAdress=function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findTaxiToast.html',
        });
    };

    $scope.findPharmacyAtAdress=function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findPharmacyToast.html',
        });
    };


    $scope.findProprietary=function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findProprietaryToast.html',
        });

    }
    $scope.findBuildingLicence=function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findBuildinglisToast.html',
        });
    }

    $scope.openHelpUsingApp=function (ev) {

        $mdDialog.show({
            controller:'menuCtrl',
            templateUrl: 'html/help/help1.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }


    $scope.openDrawRulerByManuel=function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/calculatebymanualToast.html',
        });

    };

   /* $scope.openDrawAreaByManuel=function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/calculatebymanualToast.html',
        });
    }
*/
});
