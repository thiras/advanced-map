app.controller("menuCtrl", function ($scope, $sahtejson, $rootScope, $mdToast, $timeout, $mdDialog) {
    $scope.lang = $rootScope.lang;
    $scope.il = $sahtejson.il;
    $scope.ilce = $sahtejson.ilce;
    $scope.mahalle = $sahtejson.mahalle;
    $scope.yol = $sahtejson.yol;
    $scope.numarataj = $sahtejson.numarataj;
    $scope.filterIlce = $rootScope.adress.filterIlce;
    $scope.filterMahalle = $rootScope.adress.filterMahalle;
    $scope.filterYol = $rootScope.adress.filterYol;
    $scope.filterNumarataj = $rootScope.adress.filterNumarataj;
    $scope.isActiveIlce = $rootScope.adress.ilceActive;
    $scope.isActiveMahalle = $rootScope.adress.mahalleActive;
    $scope.isActiveYol = $rootScope.adress.yolActive;
    $scope.isActiveNumarataj = $rootScope.adress.kapiActive;
    $scope.featureIl = $rootScope.adress.featureIl;
    $scope.featureIlce = $rootScope.adress.featureIlce;
    $scope.featureMahalle = $rootScope.adress.featureMahalle;
    $scope.featureYol = $rootScope.adress.featureYol;
    $scope.featureKapi = $rootScope.adress.featureKapi;
    $scope.secilenIl = $rootScope.adress.il;
    $scope.secilenIlce = $rootScope.adress.ilce;
    $scope.secilenMahalle = $rootScope.adress.mahalle;
    $scope.secilenYol = $rootScope.adress.yol;
    $scope.secilenKapi = $rootScope.adress.kapi;
    $scope.pharmacyName = $rootScope.pharmacy.pharmacyName;
    $scope.dutyPharmayControl = $rootScope.pharmacy.dutyPharmayControl;
    $scope.pharmacySearchResults = $rootScope.pharmacy.pharmacySearchResults;
    $scope.parcellLandNo = $rootScope.parcell.parcellLandNo;
    $scope.parcellNo = $rootScope.parcell.parcellNo;
    $scope.parcellSearchResults = $rootScope.parcell.parcellSearchResults;
    $scope.taxiName = $rootScope.taxi.taxiName;
    $scope.taxiSearchResults = $rootScope.taxi.taxiSearchResults;
    $scope.buildOwnerName = $rootScope.buildLicense.buildOwnerName;
    $scope.buildConstName = $rootScope.buildLicense.buildConstName;
    $scope.buildTypes = [
        {value: 1, text: "Anıt"},
        {value: 2, text: "Cami"},
        {value: 3, text: "Çeşme"},
        {value: 4, text: "Darül Hüffaz"},
        {value: 5, text: "Diğer"},
        {value: 6, text: "Hamam"},
        {value: 7, text: "Han"},
        {value: 8, text: "Kamu"},
        {value: 9, text: "Kilise"},
        {value: 10, text: "Kütüphane"},
        {value: 11, text: "Medrese"},
        {value: 12, text: "Mevlana"},
        {value: 13, text: "Müze"},
        {value: 14, text: "Şehitlik"},
        {value: 15, text: "Türbe"},
    ];


    $scope.setParcellLandNo = function () {
        $rootScope.parcell.parcellLandNo = $scope.parcellLandNo;
    };
    $scope.setParcellNo = function () {
        $rootScope.parcell.parcellNo = $scope.parcellNo;
    };
    $scope.setPharmacyName = function () {
        $rootScope.pharmacy.pharmacyName = $scope.pharmacyName;
    };
    $scope.setPharmacyDutyControl = function () {
        $rootScope.pharmacy.dutyPharmayControl = $scope.dutyPharmayControl;
    };
    $scope.setTaxiName = function () {
        $rootScope.taxi.taxiName = $scope.taxiName;
    };
    $scope.setOwnerName = function () {
        $rootScope.buildLicense.buildOwnerName = $scope.buildOwnerName;
    };
    $scope.setBuilderName = function () {
        $rootScope.buildLicense.buildConstName = $scope.buildConstName;
    };


    $scope.cancel = function () {
        $mdToast.hide();

        $timeout(function () {
            angular.element(document.querySelector("#menus")).triggerHandler("click");
        }, 10);

    };


    $scope.changeIlce = function (ilid) {

        $scope.filterIlce = {};
        for (i in $scope.il) {
            if (ilid == $scope.il[i].id) {
                $rootScope.adress.il = $scope.il[i].id;
                $scope.secilenIl = $rootScope.adress.il;
                $rootScope.adress.ilceActive = true;
                if ($scope.featureIl !== false) {
                    $scope.featureIl.remove();
                    $scope.featureIl = false;
                    $rootScope.adress.featureIl = false;
                }
                $scope.featureIl = L.geoJSON($scope.il[i].geojson, {
                    style: {color: "#ff0000"}
                }).bindPopup($scope.il[i].label).addTo($rootScope.leaflet);
                $rootScope.adress.featureIl = $scope.featureIl;
                var ilbbox = $scope.featureIl.getBounds();
                $rootScope.leaflet.fitBounds(ilbbox);
                $scope.isActiveIlce = true;
            }
        }
        for (i in $scope.ilce) {
            if (ilid == $scope.ilce[i].ilid) {
                $scope.filterIlce[i] = $scope.ilce[i];
                $rootScope.adress.filterIlce[i] = $scope.ilce[i];
            }
        }
    };
    $scope.changeMahelle = function (ilceid) {

        $scope.filterMahalle = {};
        for (i in $scope.ilce) {
            if (ilceid == $scope.ilce[i].id) {
                $rootScope.adress.ilce = $scope.ilce[i].id;
                $scope.secilenIlce = $rootScope.adress.ilce;
                $rootScope.adress.mahalleActive = true;
                if ($scope.featureIl !== false) {
                    $scope.featureIl.remove();
                    $scope.featureIl = false;
                    $rootScope.adress.featureIl = false;
                }
                if ($scope.featureIlce !== false) {
                    $scope.featureIlce.remove();
                    $scope.featureIlce = false;
                    $rootScope.adress.featureIlce = false;
                }
                $scope.featureIlce = L.geoJSON($scope.ilce[i].geojson, {
                    style: {color: "#ffff00"}
                }).bindPopup($scope.ilce[i].label).addTo($rootScope.leaflet);
                $rootScope.adress.featureIlce = $scope.featureIlce;
                var ilcebbox = $scope.featureIlce.getBounds();
                $rootScope.leaflet.fitBounds(ilcebbox);
                $scope.isActiveMahalle = true;
            }
        }

        $scope.mahalle = $sahtejson.mahalle;
        for (i in $scope.mahalle) {
            if (ilceid == $scope.mahalle[i].ilceid) {
                $scope.filterMahalle[i] = $scope.mahalle[i];
                $rootScope.adress.filterMahalle[i] = $scope.mahalle[i];
            }
        }


    }


    $scope.changeYol = function (mahalleid) {
        $scope.filterYol = {};
        for (i in $scope.mahalle) {
            if (mahalleid == $scope.mahalle[i].id) {
                $rootScope.adress.mahalle = $scope.mahalle[i].id;
                $scope.secilenMahalle = $rootScope.adress.mahalle;
                $rootScope.adress.yolActive = true;
                if ($scope.featureIl !== false) {
                    $scope.featureIl.remove();
                    $scope.featureIl = false;
                    $rootScope.adress.featureIl = false;
                }
                if ($scope.featureIlce !== false) {
                    $scope.featureIlce.remove();
                    $scope.featureIlce = false;
                    $rootScope.adress.featureIlce = false;
                }
                if ($scope.featureMahalle !== false) {
                    $scope.featureMahalle.remove();
                    $scope.featureMahalle = false;
                    $rootScope.adress.featureMahalle = false;
                }
                $scope.featureMahalle = L.geoJSON($scope.mahalle[i].geojson, {
                    style: {color: "#ff00ff"}
                }).bindPopup($scope.mahalle[i].label).addTo($rootScope.leaflet);
                $rootScope.adress.featureMahalle = $scope.featureMahalle;
                var mahallebbox = $scope.featureMahalle.getBounds();
                $rootScope.leaflet.fitBounds(mahallebbox);
                $scope.isActiveYol = true;
            }
        }
        $scope.yol = $sahtejson.yol;
        for (i in $scope.yol) {
            if (mahalleid == $scope.yol[i].mahalleid) {

                $scope.filterYol[i] = $scope.yol[i];
                $rootScope.adress.filterYol[i] = $scope.yol[i];

            }
        }
    }


    $scope.changeKapiNo = function (yolid) {
        debugger;
        $scope.filterNumarataj = {};
        for (i in $scope.yol) {
            if (yolid == $scope.yol[i].id) {
                $rootScope.adress.yol = $scope.yol[i].id;
                $scope.secilenYol = $rootScope.adress.yol;
                $rootScope.adress.kapiActive = true;
                if ($scope.featureIl !== false) {
                    $scope.featureIl.remove();
                    $scope.featureIl = false;
                    $rootScope.adress.featureIl = false;
                }
                if ($scope.featureIlce !== false) {
                    $scope.featureIlce.remove();
                    $scope.featureIlce = false;
                    $rootScope.adress.featureIlce = false;
                }
                if ($scope.featureMahalle !== false) {
                    $scope.featureMahalle.remove();
                    $scope.featureMahalle = false;
                    $rootScope.adress.featureMahalle = false;
                }
                if ($scope.featureYol !== false) {
                    $scope.featureYol.remove();
                    $scope.featureYol = false;
                    $rootScope.adress.featureYol = false;
                }
                $scope.featureYol = L.geoJSON($scope.yol[i].geojson, {
                    style: {color: "#ff00ff"}
                }).bindPopup($scope.yol[i].label).addTo($rootScope.leaflet);
                $rootScope.adress.featureYol = $scope.featureYol;
                var yolbbox = $scope.featureYol.getBounds();
                $rootScope.leaflet.fitBounds(yolbbox);
                $scope.isActiveNumarataj = true;
            }
        }
        $scope.numarataj = $sahtejson.numarataj;
        for (i in $scope.numarataj) {
            if (yolid == $scope.numarataj[i].yolid) {
                $scope.filterNumarataj[i] = $scope.numarataj[i];
                $rootScope.adress.filterNumarataj[i] = $scope.numarataj[i];

            }
        }
    }

    $scope.showKapiNo = function (numaratajid) {

        for (i in $scope.numarataj) {
            if (numaratajid == $scope.numarataj[i].id) {
                $scope.secilenKapi = $scope.numarataj[i].id;
                $rootScope.adress.kapi = $scope.numarataj[i].id;
                if ($scope.featureIl !== false) {
                    $scope.featureIl.remove();
                    $scope.featureIl = false;
                    $rootScope.adress.featureIl = false;
                }
                if ($scope.featureIlce !== false) {
                    $scope.featureIlce.remove();
                    $scope.featureIlce = false;
                    $rootScope.adress.featureIlce = false;
                }
                if ($scope.featureMahalle !== false) {
                    $scope.featureMahalle.remove();
                    $scope.featureMahalle = false;
                    $rootScope.adress.featureMahalle = false;
                }
                if ($scope.featureYol !== false) {
                    $scope.featureYol.remove();
                    $scope.featureYol = false;
                    $rootScope.adress.featureYol = false;
                }
                if ($scope.featureKapi !== false) {
                    $scope.featureKapi.remove();
                    $scope.featureKapi = false;
                    $rootScope.adress.featureKapi = false;
                }
                $scope.featureKapi = L.geoJSON($scope.numarataj[i].geojson, {
                    style: {color: "#ff00ff"}
                }).bindPopup($scope.numarataj[i].label).addTo($rootScope.leaflet);
                $rootScope.adress.featureKapi = $scope.featureKapi;
                var yolbbox = $scope.featureKapi.getBounds();
                $rootScope.leaflet.fitBounds(yolbbox);

            }
        }
    }


    $scope.close = function () {
        $mdDialog.cancel();
    }


    $scope.listLngLtd = $scope.listLngLtd || [];

    $scope.sayi =  $rootScope.sayi || 1;

    $scope.addLngLtd = function (lng, ltd) {


        if (lng == "undefined") {

            alert("ditttt");

        }
        $scope.listLngLtd.push({sayi: $scope.sayi, lng: lng, ltd: ltd});
        $rootScope.listLngLtd = $scope.listLngLtd;
        $scope.sayi += 1;
       $rootScope.sayi=$scope.sayi;


    }
    $scope.removeLngLtd = function (i) {


        console.log($scope.listLngLtd)
        $scope.listLngLtd.splice(i, 1);

    }

    $scope.lngControl = function (val) {

        if (!val) {

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('uyarı')
                    .textContent('enlem değeri +90 ve -90 değeri arasında olmalı')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Anladım!')
                    .targetEvent(event)
            );
        }
        ;

    }

});