app.controller("menuCtrl", function ($scope, $sahtejson, $rootScope, $mdToast, $timeout, $mdDialog,$leafletFonk) {
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
    $scope.clickMapAddPoint = false;
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
    $scope.mesureTypesOpt = [
        {value:"degrees",text:$rootScope.lang.menuToasts.mesureLineArea.measureTypes[1]},
        {value:"radians",text:$rootScope.lang.menuToasts.mesureLineArea.measureTypes[2]},
        {value:"miles",text:$rootScope.lang.menuToasts.mesureLineArea.measureTypes[3]},
        {value:"kilometers",text:$rootScope.lang.menuToasts.mesureLineArea.measureTypes[4]}
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
    };

    $scope.measureLines = $rootScope.measureLines || [{name:"1. "+$rootScope.lang.menuToasts.mesureLineArea.measureline,id:1,latlng:[],latlngs:[],feature:false,show:true,measure:0}];
    $rootScope.measureLines=$rootScope.measureLines || $scope.measureLines;
    $scope.measureCalc=$rootScope.measureCalc || 0;
    $scope.measureName = $scope.measureLines[$scope.measureCalc].name;
    $scope.measureLineLatLng = $scope.measureLines[$scope.measureCalc].latlng || [];

    $scope.sayi =  $rootScope.measureLineLatLngLenght || 1;

    $scope.setMeasureName=function () {
        $scope.measureLines[$scope.measureCalc].name = $scope.measureName;
    };
    $scope.newMeasureLine = function () {
        debugger;
        var next = $scope.measureCalc+2;
        $scope.measureCalc=next-1;
        $scope.measureLines.push({name:next+". "+$rootScope.lang.menuToasts.mesureLineArea.measureline,id:next,latlng:[],latlngs:[],feature:false,show:true,measure:0});
        $scope.measureName=next+". "+$rootScope.lang.menuToasts.mesureLineArea.measureline;
        $rootScope.measureLines=$scope.measureLines;
        $rootScope.measureCalc=$scope.measureCalc;
        $scope.measureLineLatLng = $scope.measureLines[$scope.measureCalc].latlng || [];
        $scope.sayi = $scope.measureLineLatLng.length+1;
        $rootScope.measureLineLatLngLenght=$scope.sayi;
        $scope.lng="";
        $scope.lat="";
    };

    $scope.addLatLngToLine = function (lng, lat) {
        if (lng != null && lat!=null) {
            $scope.measureLines[$scope.measureCalc].latlng.push({sayi: $scope.sayi, lng: lng, lat: lat});
            $scope.measureLines[$scope.measureCalc].latlngs.push([lat,lng]);
            $rootScope.measureLines = $scope.measureLines;
            $scope.sayi += 1;
            $rootScope.measureLineLatLngLenght=$scope.sayi;
            var measureLine = L.polyline($scope.measureLines[$scope.measureCalc].latlng, {color: 'green'});
            var geojson = measureLine.toGeoJSON();
            var measureL = turf.lineDistance(geojson, 'kilometers');
            $scope.measureLines[$scope.measureCalc].measure = turf.round(measureL*1000,3);
            if($scope.measureLines[$scope.measureCalc].feature==false){
                $scope.measureLines[$scope.measureCalc].feature =measureLine;
                measureLine.addTo($rootScope.leaflet);
            }else{
                $scope.measureLines[$scope.measureCalc].feature.remove();
                $scope.measureLines[$scope.measureCalc].feature =measureLine;
                measureLine.addTo($rootScope.leaflet);
            }
        }else{
            $rootScope.$emit("message",{
                status:"warning",
                header:$rootScope.lang.general.warning,
                content:$rootScope.lang.menuToasts.mesureLineArea.alerts.alert1,
                time:"auto"});
        }
    };
    $scope.removeLatLngToLine = function (i) {
        console.log($scope.measureLineLatLng);
        $scope.measureLineLatLng.splice(i, 1);
        var measureLine = L.polyline($scope.measureLines[$scope.measureCalc].latlng, {color: 'green'});
        var geojson = measureLine.toGeoJSON();
        var measureL = turf.lineDistance(geojson, 'kilometers');
        $scope.measureLines[$scope.measureCalc].measure = turf.round(measureL*1000,3);
        if($scope.measureLines[$scope.measureCalc].feature==false){
            $scope.measureLines[$scope.measureCalc].feature =measureLine;
            measureLine.addTo($rootScope.leaflet);

        }else{
            $scope.measureLines[$scope.measureCalc].feature.remove();
            $scope.measureLines[$scope.measureCalc].feature =measureLine;
            measureLine.addTo($rootScope.leaflet);
        }

    };

    $scope.lngControl = function (ind,lng) {

        if(lng=="" || lng==null){lng="";}
        if (lng>=-180 && lng<=180) {
            lng=parseFloat(lng);
            if(ind==null){
                $scope.lng=lng;
            }else{
                $scope.measureLineLatLng[ind].lng=lng;
            }

        }else{
            $rootScope.$emit("message",{
                status:"warning",
                header:$rootScope.lang.general.warning,
                content:$rootScope.lang.menuToasts.mesureLineArea.alerts.alert2,
                time:"auto"});
            if(ind==null){
                $scope.lng="";
            }else{
                $scope.measureLineLatLng[ind].lng=0;
            }
        }
    };
    
    
    $scope.latControl=function (ind,lat) {

        if(lat=="" || lat==null){lat="";}
        if (lat>=-90 && lat<=90) {
            lat=parseFloat(lat);
            if(ind==null){
                $scope.lat=lat;
            }else{
                $scope.measureLineLatLng[ind].lat=lat;
            }
        }else{
            $rootScope.$emit("message",{
                status:"warning",
                header:$rootScope.lang.general.warning,
                content:$rootScope.lang.menuToasts.mesureLineArea.alerts.alert3,
                time:"auto"});

            if(ind==null){
                $scope.lat="";
            }else{
                $scope.measureLineLatLng[ind].lat=0;
            }
        }
    };

    

    $scope.readyGetPoint=function(a,b){
        $rootScope.leaflet.on("click",function (e) {
            var lat = turf.round(e.latlng.lat, 6);
            var lng = turf.round(e.latlng.lng, 6);
            $rootScope.clickLat =lat;
            $rootScope.clickLng = lng;
            $scope.lng=lng;
            $scope.lat=lat;
            $scope.addLatLngToLine($scope.lng,$scope.lat);
        });
    };
    $scope.openGetLocationPoint = function (durum) {
        if(durum==true){
            $scope.clickMapAddPoint = true;
        }else{
            $scope.clickMapAddPoint = false;
        }

    }



    //$rootScope.$emit("opendialog",{status:"warning",header:"Deneme Başlığı",content:"İçerik Buraya Gelecek",time:2000});

});