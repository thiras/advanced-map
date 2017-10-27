app.controller("navbar", function ($scope, $accordion, $timeout, $mdDialog, $rootScope, $mdToast, $mdSidenav, $sahtejson, $leafletFonk) {

    $rootScope.menuJSON = $rootScope.accordion || $accordion.json;

    $rootScope.$on("updateAcordion", function (e, a) {
        $rootScope.menuJSON = a;
    });
    /*  menu acma ayar bas*/
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.lang = $rootScope.lang;

    function buildToggler(componentId) {
        return function () {
            $timeout(function () {
                $mdSidenav(componentId).toggle();
            });
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
        $rootScope.menuPanelName = fn;
        $scope[fn["fonk"]]();
    };


    $scope.findAdressPanel = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findAdressToast.html',
        });
    };
    $scope.findAdressClickMap = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        var boylam = 26.6342630982399;
        var enlem = 38.31461828182103;
        var latlng = L.latLng(enlem, boylam);
        var lokasyon = L.marker(latlng).bindPopup("Gülbahçe Mahallesi, İzmir Teknoloji Geliştirme Bölgesi İzmir Yüksek Teknoloji Enstitüsü, 35437 Urla/İzmir").addTo($rootScope.leaflet).openPopup();
        $rootScope.leaflet.flyTo(latlng, 16);
    };


    $scope.findPOIbyAdress = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findPOIbyAdress.html',
        });
    };


    $scope.findParcellPanel = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findParcellToast.html',
        });
    };
    $scope.findParcelWithLocation = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        var boylam = 26.6342630982399;
        var enlem = 38.31461828182103;
        var latlng = L.latLng(enlem, boylam);
        var geojson = $sahtejson.locationParcell.parcell1.geojson;
        $leafletFonk.showGeoJSON(geojson, {}, true, true);
    };

    $scope.findTaxiAtAdress = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findTaxiToast.html',
        });
    };

    $scope.findPharmacyAtAdress = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findPharmacyToast.html',
        });
    };


    $scope.findProprietary = function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findProprietaryToast.html',
        });

    }
    $scope.findBuildingLicence = function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findBuildinglisToast.html',
        });
    }

    $scope.openHelpUsingApp = function (ev) {

        $mdDialog.show({
            controller: 'menuCtrl',
            templateUrl: 'html/help/help1.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }


    $scope.openDrawRulerByManuel = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/calculatebymanualToast.html',
        });

    };

    $scope.openDrawAreaByMouse = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/calculateareaToast.html',
        });


    }


    $scope.findInstitutionsbyAddress = function () {


        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findInstitutionsbyAddress.html',
        });

    }


    $scope.findSecrtyByAdrs = function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findSecByAddress.html',
        });
    };


    /* aile hekimi sorgula baş prompt*/


    $scope.findMyDoctor = function (ev) {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findMyDoctor.html',
        });


    };


    /* aile hekimi sorgula son prompt*/
    /* findminibus */

    $scope.findBusMiniBus = function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findBusMiniBus.html',
        });
    };

    $scope.findShipToast = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findShipToast.html',
        });
    };

    /*findminibus*/
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


    $scope.findTrainDialog = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findTrainTramToast.html',
        });

    };


    $scope.findAircraftDialog = function () {
        $rootScope.$emit("closeNavbar", "closeNavbar");
        $mdToast.show({
            hideDelay: 0,
            position: 'top left',
            controller: 'menuCtrl',
            templateUrl: 'html/menuToast/findAircraftAirVehicles.html',
        });


    }

});
