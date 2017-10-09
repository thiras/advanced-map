app.controller("navbar", function ($scope, $accordion, $timeout, $mdDialog, $rootScope) {

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


    $scope.menuContact = function () {

        alert = $mdDialog.alert({
            title: 'İletişim',
            textContent: 'Bizimle iletişim bilgileri falan filan!',
            ok: 'Close'
        });

        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
    }


    $scope.findParcellPanel=function () {

        $rootScope.$emit("closeNavbar", "closeNavbar");

        $mdDialog.show({
            controller: navbarCtrl,
            templateUrl: 'dialogs/findParcellDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            closeTo: '#closeBtn',
            hasBackdrop: false

        })



    }

    $scope.findAdressPanel = function (event) {
        $rootScope.$emit("closeNavbar", "closeNavbar");  // sidenav kapatmak için
        $mdDialog.show({
            controller: navbarCtrl,
            templateUrl: 'dialogs/findAdressDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            closeTo: '#closeBtn',
            hasBackdrop: false /* hasbackdrop kaldırdı  */
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    }


    $scope.ulasim = function () {

        alert("ulaşım methodu")
    }

/* taksi */
    $scope.findTaxiAtAdress=function () {

        $mdDialog.show({
            controller: navbarCtrl,
            templateUrl: 'dialogs/findtaxiatadress.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            closeTo: '#closeBtn',

        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });


    }

    $scope.findTaxiAtLocation=function () {
        $mdDialog.show({
            controller: navbarCtrl,
            templateUrl: 'dialogs/nearesttaxi.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            closeTo: '#closeBtn',

        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });



    }


    /*  taksi **/



    function navbarCtrl($scope, $sahtejson) {

        $scope.lang = $rootScope.lang;
        $scope.il = $sahtejson.il;
        $scope.ilce = $sahtejson.ilce;
        $scope.mahalle = $sahtejson.mahalle;
        $scope.yol = $sahtejson.yol;
        $scope.numarataj = $sahtejson.numarataj;
        $scope.filterIlce = {};
        $scope.filterMahalle = {};
        $scope.filterYol = {};
        $scope.filterNumarataj = {};
        $scope.isActiveIlce = false;
        $scope.isActiveMahalle = false;
        $scope.isActiveYol = false;
        $scope.isActiveNumarataj = false;
        $scope.featureIl = false;
        $scope.featureIlce = false;
        $scope.featureMahalle = false;
        $scope.featureYol = false;
        $scope.featureKapi = false;


        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.changeIlce = function (ilid) {
            $scope.filterIlce = {};
            for (i in $scope.il) {
                if (ilid == $scope.il[i].id) {
                    if($scope.featureIl!==false){
                        $scope.featureIl.remove();
                    }
                    $scope.featureIl = L.geoJSON($scope.il[i].geojson, {
                        style: {color: "#ff0000"}
                    }).bindPopup($scope.il[i].label).addTo($rootScope.leaflet);
                    var ilbbox = $scope.featureIl.getBounds();
                    $rootScope.leaflet.fitBounds(ilbbox);
                    $scope.isActiveIlce = true;
                }
            }
            for (i in $scope.ilce) {
                if (ilid == $scope.ilce[i].ilid) {
                    $scope.filterIlce[i] = $scope.ilce[i];
                }
            }
        };
        $scope.changeMahelle = function (ilceid) {

            $scope.filterMahalle = {};
            for (i in $scope.ilce) {
                if (ilceid == $scope.ilce[i].id) {
                    $scope.featureIl.remove();
                    if($scope.featureIlce!==false){
                        $scope.featureIlce.remove();
                    }
                    $scope.featureIlce = L.geoJSON($scope.ilce[i].geojson, {
                        style: {color: "#ffff00"}
                    }).bindPopup($scope.ilce[i].label).addTo($rootScope.leaflet);
                    var ilcebbox = $scope.featureIlce.getBounds();
                    $rootScope.leaflet.fitBounds(ilcebbox);
                    $scope.isActiveMahalle = true;
                }
            }

            $scope.mahalle = $sahtejson.mahalle;
            for (i in $scope.mahalle) {
                if (ilceid == $scope.mahalle[i].ilceid) {

                    $scope.filterMahalle[i] = $scope.mahalle[i];

                }
            }


        }


        $scope.changeYol = function (mahalleid) {
            $scope.filterYol = {};
            for (i in $scope.mahalle) {
                if (mahalleid == $scope.mahalle[i].id) {
                    $scope.featureIlce.remove();
                    if($scope.featureMahalle!==false){
                        $scope.featureMahalle.remove();
                    }
                    $scope.featureMahalle = L.geoJSON($scope.mahalle[i].geojson, {
                        style: {color: "#ff00ff"}
                    }).bindPopup($scope.mahalle[i].label).addTo($rootScope.leaflet);
                    var mahallebbox = $scope.featureMahalle.getBounds();
                    $rootScope.leaflet.fitBounds(mahallebbox);
                    $scope.isActiveYol = true;
                }
            }
            $scope.yol = $sahtejson.yol;
            for (i in $scope.yol) {
                if (mahalleid == $scope.yol[i].mahalleid) {

                    $scope.filterYol[i] = $scope.yol[i];

                }
            }
        }


        $scope.changeKapiNo = function (yolid) {
            $scope.filterNumarataj = {};
            for (i in $scope.yol) {
                if (yolid == $scope.yol[i].id) {
                    $scope.featureMahalle.remove();
                    if($scope.featureYol!==false){
                        $scope.featureYol.remove();
                    }
                    $scope.featureYol = L.geoJSON($scope.yol[i].geojson, {
                        style: {color: "#ff00ff"}
                    }).bindPopup($scope.yol[i].label).addTo($rootScope.leaflet);
                    var yolbbox = $scope.featureYol.getBounds();
                    $rootScope.leaflet.fitBounds(yolbbox);
                    $scope.isActiveNumarataj = true;
                }
            }
            $scope.numarataj = $sahtejson.numarataj;
            for (i in $scope.numarataj) {
                if (yolid == $scope.numarataj[i].yolid) {

                    $scope.filterNumarataj[i] = $scope.numarataj[i];

                }
            }
        }

        $scope.showKapiNo = function (numaratajid) {

            for (i in $scope.numarataj) {
                if (numaratajid == $scope.numarataj[i].id) {
                    $scope.featureYol.remove();
                    if($scope.featureKapi!==false){
                        $scope.featureKapi.remove();
                    }
                    $scope.featureKapi = L.geoJSON($scope.numarataj[i].geojson, {
                        style: {color: "#ff00ff"}
                    }).bindPopup($scope.numarataj[i].label).addTo($rootScope.leaflet);
                    var yolbbox = $scope.featureKapi.getBounds();
                    $rootScope.leaflet.fitBounds(yolbbox);

                }
            }
        }





    }

});
