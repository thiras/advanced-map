app.controller("menuCtrl",function ($scope,$sahtejson,$rootScope,$mdToast,$timeout) {
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
            $mdToast.hide();

            $timeout(function () {
                angular.element(document.querySelector("#menus")).triggerHandler("click");
            },10);

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








});