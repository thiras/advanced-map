app.controller("menuCtrl",function ($scope,$sahtejson,$rootScope,$mdToast,$timeout) {
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
        $scope.featureIl = false;
        $scope.featureIlce = false;
        $scope.featureMahalle = false;
        $scope.featureYol = false;
        $scope.featureKapi = false;
        $scope.secilenIl=$rootScope.adress.il;
        $scope.secilenIlce=$rootScope.adress.ilce;
        $scope.secilenMahalle=$rootScope.adress.mahalle;
        $scope.secilenYol=$rootScope.adress.yol;
        $scope.secilenKapi=$rootScope.adress.kapi;
        $scope.pharmacyName =$rootScope.pharmacy.pharmacyName;
        $scope.dutyPharmayControl = $rootScope.pharmacy.dutyPharmayControl;
        $scope.parcellLandNo=$rootScope.parcell.parcellLandNo;
        $scope.parcellNo=$rootScope.parcell.parcellNo;

        $scope.setParcellLandNo=function () {
            $rootScope.parcell.parcellLandNo=$scope.parcellLandNo;
        };
        $scope.setParcellNo=function () {
            $rootScope.parcell.parcellNo=$scope.parcellNo;
        };
        $scope.setPharmacyName=function () {
            $rootScope.pharmacy.pharmacyName=$scope.pharmacyName;
        };
        $scope.setPharmacyDutyControl=function () {
            $rootScope.pharmacy.dutyPharmayControl=$scope.dutyPharmayControl;
        };


        $scope.cancel = function () {
            $mdToast.hide();

            $timeout(function () {
                angular.element(document.querySelector("#menus")).triggerHandler("click");
            },10);

        };

        $scope.changeIlce = function (ilid) {

            $scope.filterIlce = {};
            for (i in $scope.il) {
                if (ilid == $scope.il[i].id) {
                    $rootScope.adress.il=$scope.il[i].id;
                    $scope.secilenIl=$rootScope.adress.il;
                    $rootScope.adress.ilceActive=true;
                    if($scope.featureIl!==false){
                        $scope.featureIl.remove();
                        $scope.featureIl=false;
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
                    $rootScope.adress.filterIlce[i] = $scope.ilce[i];
                }
            }
        };
        $scope.changeMahelle = function (ilceid) {

            $scope.filterMahalle = {};
            for (i in $scope.ilce) {
                if (ilceid == $scope.ilce[i].id) {
                    $rootScope.adress.ilce=$scope.ilce[i].id;
                    $scope.secilenIlce=$rootScope.adress.ilce;
                    $rootScope.adress.mahalleActive=true;
                    if($scope.featureIl!==false){
                        $scope.featureIl.remove();
                        $scope.featureIl=false;
                    }
                    if($scope.featureIlce!==false){
                        $scope.featureIlce.remove();
                        $scope.featureIlce=false;
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
                    $rootScope.adress.filterMahalle[i] = $scope.mahalle[i];
                }
            }


        }


        $scope.changeYol = function (mahalleid) {
            $scope.filterYol = {};
            for (i in $scope.mahalle) {
                if (mahalleid == $scope.mahalle[i].id) {
                    $rootScope.adress.mahalle=$scope.mahalle[i].id;
                    $scope.secilenMahalle=$rootScope.adress.mahalle;
                    $rootScope.adress.yolActive=true;

                    if($scope.featureIl!==false){
                        $scope.featureIl.remove();
                        $scope.featureIl=false;

                    }
                    if($scope.featureIlce!==false){
                        $scope.featureIlce.remove();
                        $scope.featureIlce=false;
                    }
                    if($scope.featureMahalle!==false){
                        $scope.featureMahalle.remove();
                        $scope.featureMahalle=false;
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
                    $rootScope.adress.filterYol[i] = $scope.yol[i];

                }
            }
        }


        $scope.changeKapiNo = function (yolid) {
            $scope.filterNumarataj = {};
            for (i in $scope.yol) {
                if (yolid == $scope.yol[i].id) {
                    $rootScope.adress.yol=$scope.yol[i].id;
                    $scope.secilenYol=$rootScope.adress.yol;
                    $rootScope.adress.kapiActive=true;
                    if($scope.featureIl!==false){
                        $scope.featureIl.remove();
                        $scope.featureIl=false;
                    }
                    if($scope.featureIlce!==false){
                        $scope.featureIlce.remove();
                        $scope.featureIlce=false;
                    }
                    if($scope.featureYol!==false){
                        $scope.featureYol.remove();
                        $scope.featureYol=false;
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
                    $rootScope.adress.filterNumarataj[i] = $scope.numarataj[i];

                }
            }
        }

        $scope.showKapiNo = function (numaratajid) {

            for (i in $scope.numarataj) {
                if (numaratajid == $scope.numarataj[i].id) {
                    $scope.secilenKapi=$scope.numarataj[i].id;
                    $rootScope.adress.kapi=$scope.numarataj[i].id;
                    if($scope.featureIl!==false){
                        $scope.featureIl.remove();
                        $scope.featureIl=false;
                    }
                    if($scope.featureIlce!==false){
                        $scope.featureIlce.remove();
                        $scope.featureIlce=false;
                    }
                    if($scope.featureMahalle!==false){
                        $scope.featureMahalle.remove();
                        $scope.featureMahalle=false;
                    }
                    if($scope.featureYol!==false){
                        $scope.featureYol.remove();
                        $scope.featureYol=false;
                    }
                    if($scope.featureKapi!==false){
                        $scope.featureKapi.remove();
                        $scope.featureKapi=false;
                    }
                    $scope.featureKapi = L.geoJSON($scope.numarataj[i].geojson, {
                        style: {color: "#ff00ff"}
                    }).bindPopup($scope.numarataj[i].label).addTo($rootScope.leaflet);
                    var yolbbox = $scope.featureKapi.getBounds();
                    $rootScope.leaflet.fitBounds(yolbbox);

                }
            }
        }








});