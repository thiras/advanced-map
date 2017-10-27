app.controller("menuCtrl", function ($scope, $sahtejson, $rootScope, $mdToast, $timeout, $mdDialog, $leafletFonk) {
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
    $scope.clickMapAddPoint = $rootScope.clickMapAddPoint || false;
    $scope.trainLine = $sahtejson.trainLine;
    $scope.departureStopData = $sahtejson.trainStation;
    $scope.arriveStopData = $sahtejson.trainStation;


    /* sağlık merkezileri için mdSelect adress yardımı ile*/

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
        {value: "degrees", text: $rootScope.lang.menuToasts.mesureLineArea.measureTypes[1]},
        {value: "radians", text: $rootScope.lang.menuToasts.mesureLineArea.measureTypes[2]},
        {value: "miles", text: $rootScope.lang.menuToasts.mesureLineArea.measureTypes[3]},
        {value: "kilometers", text: $rootScope.lang.menuToasts.mesureLineArea.measureTypes[4]}
    ];
    $scope.measureType = $rootScope.measureType || "kilometers";
    $scope.activeMeasureType = function () {
        $rootScope.measureType = $scope.measureType;
    };
    $scope.panelName = $rootScope.menuPanelName;
    $scope.onMouseOverPoint = false;
    $scope.lastPoint = false;
    $scope.nowPoint = false;


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

    if ($scope.panelName.fonk == "openDrawRulerByManuel") {
        var nam = $rootScope.lang.menuToasts.mesureLineArea.measureline;
    }
    if ($scope.panelName.fonk == "openDrawAreaByMouse") {
        var nam = $rootScope.lang.menuToasts.mesureLineArea.measureArea;
    }
    $scope.measureLines = $rootScope.measureLines || [{
        name: "1. " + nam,
        id: 1,
        latlng: [],
        latlngs: [],
        feature: false,
        show: true,
        measure: 0
    }];

    $rootScope.measureLines = $rootScope.measureLines || $scope.measureLines;
    $scope.measureCalc = $rootScope.measureCalc || 0;
    $scope.measureName = $scope.measureLines[$scope.measureCalc].name;
    $scope.measureLineLatLng = $scope.measureLines[$scope.measureCalc].latlng || [];

    $scope.sayi = $rootScope.measureLineLatLngLenght || 1;

    $scope.setMeasureName = function () {
        $scope.measureLines[$scope.measureCalc].name = $scope.measureName;
    };
    $scope.newMeasureLine = function () {
        var next = $scope.measureCalc + 2;
        lastLine.remove();
        measureDivicon.remove();
        $scope.lastPoint = false;
        $scope.measureCalc = next - 1;
        $rootScope.measureCalc = $scope.measureCalc;
        if ($scope.panelName.fonk == "openDrawRulerByManuel") {
            var nam = $rootScope.lang.menuToasts.mesureLineArea.measureline;
        }
        if ($scope.panelName.fonk == "openDrawAreaByMouse") {
            var nam = $rootScope.lang.menuToasts.mesureLineArea.measureArea;
        }
        $scope.measureLines.push({
            name: next + ". " + nam,
            id: next,
            latlng: [],
            latlngs: [],
            feature: false,
            show: true,
            measure: 0
        });
        if ($scope.panelName.fonk == "openDrawRulerByManuel") {
            var nam = $rootScope.lang.menuToasts.mesureLineArea.measureline;
        }
        if ($scope.panelName.fonk == "openDrawAreaByMouse") {
            var nam = $rootScope.lang.menuToasts.mesureLineArea.measureArea;
        }
        $scope.measureName = next + ". " + nam;
        $rootScope.measureLines = $scope.measureLines;
        $scope.measureLineLatLng = $scope.measureLines[$scope.measureCalc].latlng || [];
        $scope.sayi = $scope.measureLineLatLng.length + 1;
        $rootScope.measureLineLatLngLenght = $scope.sayi;
        $scope.lng = "";
        $scope.lat = "";
    };

    $scope.addLatLngToLine = function (lng, lat) {
        if (lng != null && lat != null) {
            $scope.measureLines[$scope.measureCalc].latlng.push({sayi: $scope.sayi, lng: lng, lat: lat});
            $scope.measureLines[$scope.measureCalc].latlngs.push([lat, lng]);
            $rootScope.measureLines = $scope.measureLines;
            $scope.sayi += 1;
            $rootScope.measureLineLatLngLenght = $scope.sayi;
            var dz = $scope.measureLines[$scope.measureCalc].latlng;
            changeMeasueGeometry();
        } else {
            $rootScope.$emit("message", {
                status: "warning",
                header: $rootScope.lang.general.warning,
                content: $rootScope.lang.menuToasts.mesureLineArea.alerts.alert1,
                time: "auto"
            });
        }
    };
    $scope.removeLatLngToLine = function (i) {
        var newi = false;
        for (a in $scope.measureLineLatLng) {
            if ($scope.measureLineLatLng[a].sayi == i) {
                newi = a;
            }
        }
        if (newi !== false && newi >= 0) {
            $scope.measureLineLatLng.splice(newi, 1);
            $scope.showLocation(0, 0, false);
            changeMeasueGeometry();
        }

    };


    $scope.changeLat = function (ind, lat, j) {
        var ij = 0;
        if (lat == "" || lat == null) {
            lat = "";
        }
        if (lat >= -90 && lat <= 90) {
            lat = parseFloat(lat);
            if (ind == null) {
                $scope.lat = lat;
            } else {
                var a = $scope.measureLines[ind].latlng;
                for (i in a) {
                    if (a[i].sayi == j) {
                        ij = i;
                        a[i].lat = lat;
                        $scope.measureLines[ind].latlngs[i][0] = lat;
                    }
                }
            }
        } else {
            $rootScope.$emit("message", {
                status: "warning",
                header: $rootScope.lang.general.warning,
                content: $rootScope.lang.menuToasts.mesureLineArea.alerts.alert3,
                time: "auto"
            });

            if (ind == null) {
                $scope.lat = "";
            } else {
                var a = $scope.measureLines[ind].latlng;
                for (i in a) {
                    if (a[i].sayi == j) {
                        $scope.measureLineLatLng[i].lat = 0;
                    }
                }

            }
        }
        changeMeasueGeometry();

    };
    $scope.changeLng = function (ind, lng, j) {
        var ij = 0;
        if (lng == "" || lng == null) {
            lng = "";
        }
        if (lng >= -180 && lng <= 180) {
            lng = parseFloat(lng);
            if (ind == null) {
                $scope.lng = lng;
            } else {
                var a = $scope.measureLines[ind].latlng;
                for (i in a) {

                    if (a[i].sayi == j) {
                        ij = i;
                        a[i].lng = lng;
                        $scope.measureLines[ind].latlngs[i][1] = lng;
                    }
                }
            }
        } else {
            $rootScope.$emit("message", {
                status: "warning",
                header: $rootScope.lang.general.warning,
                content: $rootScope.lang.menuToasts.mesureLineArea.alerts.alert3,
                time: "auto"
            });

            if (ind == null) {
                $scope.lng = "";
            } else {
                $scope.measureLineLatLng[ij].lng = 0;
            }
        }
        changeMeasueGeometry();

    };

    function changeMeasueGeometry() {
        if ($scope.panelName.fonk == "openDrawRulerByManuel") {
            var measureLine = L.polyline($scope.measureLines[$scope.measureCalc].latlng, {color: 'green'});
            var geojson = measureLine.toGeoJSON();
            var measureL = turf.lineDistance(geojson, $scope.measureType);
            $scope.measureLines[$scope.measureCalc].measure = turf.round(measureL * 1000, 3);
        }
        if ($scope.panelName.fonk == "openDrawAreaByMouse") {
            var measureLine = L.polygon($scope.measureLines[$scope.measureCalc].latlng, {color: 'green'});
            var geojson = measureLine.toGeoJSON();
            var measureL = turf.lineDistance(geojson, $scope.measureType);
            $scope.measureLines[$scope.measureCalc].measure = turf.round(measureL * 1, 3);
        }
        if ($scope.measureLines[$scope.measureCalc].feature == false) {
            $scope.measureLines[$scope.measureCalc].feature = measureLine;
            measureLine.addTo($rootScope.leaflet);

        } else {
            $scope.measureLines[$scope.measureCalc].feature.remove();
            $scope.measureLines[$scope.measureCalc].feature = measureLine;
            measureLine.addTo($rootScope.leaflet);
        }
    }

    function clickMap(e) {
        var lat = turf.round(e.latlng.lat, 6);
        var lng = turf.round(e.latlng.lng, 6);
        $rootScope.clickLat = lat;
        $rootScope.clickLng = lng;
        $scope.lng = lng;
        $scope.lat = lat;
        $scope.lastPoint = {lat: lat, lng: lng};
        $scope.addLatLngToLine($scope.lng, $scope.lat);
    }

    $scope.openGetLocationPoint = function (durum) {
        if (durum == true) {
            $scope.clickMapAddPoint = true;
            $rootScope.clickMapAddPoint = true;
            $rootScope.leaflet.on("click", clickMap);
            $rootScope.leaflet.on("mousemove", mouveMap);
            angular.element(document.getElementById('map')).css("cursor", "crosshair");
        } else {
            $scope.clickMapAddPoint = false;
            $rootScope.clickMapAddPoint = false;
            $rootScope.leaflet.off("click", clickMap);
            $rootScope.leaflet.off("mousemove", mouveMap);
            lastLine.remove();
            measureDivicon.remove();
            angular.element(document.getElementById('map')).css("cursor", "pointer");
        }

    }

    $scope.deleteMeasureLine = function (i) {
        i = parseInt(i);
        for (a in $scope.measureLines) {
            if ($scope.measureLines[a].id == i) {
                $scope.measureLines[a].feature.remove();
                $scope.measureLines.splice(a, 1);
            }
        }
    };
    $scope.showMeasureLine = function (i) {
        i = parseInt(i);
        for (a in $scope.measureLines) {
            if ($scope.measureLines[a].id == i) {
                var feat = $scope.measureLines[a].feature;
                feat.setStyle({color: "red"});
                var bbx = feat.getBounds();
                $rootScope.leaflet.fitBounds(bbx);
                $timeout(function () {
                    feat.setStyle({color: "green"});
                }, 1000);

            }
        }
    };
    var lastLine = L.polyline([[0, 0], [0, 0]], {color: 'red', dashArray: "10 10"});
    var measureDivicon = L.marker([0, 0], {
        icon: L.divIcon({
            className: "textLabelclass",
            html: '<div><span id="measureDivIcon"></span></div>'
        })
    });

    function mouveMap(e) {
        if ($scope.lastPoint !== false) {
            $scope.nowPoint = {lat: e.latlng.lat, lng: e.latlng.lng};
            lastLine.remove();
            measureDivicon.remove();
            var latlngs = [$scope.lastPoint, $scope.nowPoint];
            lastLine = L.polyline(latlngs, {color: 'red', dashArray: "5 5"});
            lastLine.addTo($rootScope.leaflet);
            var defa = $scope.measureLines[$scope.measureCalc].measure;
            var mes = defa + $rootScope.leaflet.distance($scope.lastPoint, $scope.nowPoint);
            mes = turf.round(mes * 1, 3);
            var html = '<div><span id="measureDivIcon">' + mes + 'm</span></div>';
            measureDivicon = L.marker($scope.nowPoint, {
                icon: L.divIcon({
                    className: "textLabelclass",
                    html: html
                })
            });
            measureDivicon.addTo($rootScope.leaflet);
        }
    }

    $scope.showLocation = function (lat, lng, status) {
        if (status == true) {
            var latlng = L.latLng(lat, lng);
            var nokta = L.circleMarker(latlng, {radius: 10, color: "red"});
            if ($scope.onMouseOverPoint == false) {
                $scope.onMouseOverPoint = nokta;
                $scope.onMouseOverPoint.addTo($rootScope.leaflet);

            } else {
                $scope.onMouseOverPoint.setLatLng(latlng);
            }
        } else {

            $scope.onMouseOverPoint.remove();
            $scope.onMouseOverPoint = false;
        }

    };
    $scope.showParcell = function () {


        $scope.dataShowParcell = {
            il: $scope.secilenIl,
            ilce: $scope.secilenIlce,
            mahalle: $scope.secilenMahalle,
            parcellNo: $scope.parcellNo,
            parcellLandNo: $scope.parcellLandNo
        };
        alert(JSON.stringify($scope.dataShowParcell));

    };
    $scope.showAddress = function () {


        $scope.dataShowAddress = {
            il: $scope.secilenIl,
            ilce: $scope.secilenIlce,
            mahalle: $scope.secilenMahalle,
            yol: $scope.secilenYol,
            kapi: $scope.secilenKapi
        };

        alert(JSON.stringify($scope.dataShowAddress));
    };
    $scope.showTaxi = function () {

        $scope.dataShowTaxi = {

            taxiName: $scope.taxiName,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle,
        };
        alert(JSON.stringify($scope.dataShowTaxi));

    };
    $scope.showPharmacy = function () {

        $scope.dataShowPharmacy = {
            pharmacyName: $scope.pharmacyName,
            dutyPharmayControl: $scope.dutyPharmayControl,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle
        };
        alert(JSON.stringify($scope.dataShowPharmacy));

    };
    $scope.showBuildingLis = function () {


        $scope.dataShowBuildlis = {
            buildOwnerName: $scope.buildOwnerName,
            buildConstName: $scope.buildConstName,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle

        };

        alert(JSON.stringify($scope.dataShowBuildlis));

    };
    $scope.showProprietry = function () {


        $scope.datashowProprietry = {
            build: $scope.build,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle,

        };

        alert(JSON.stringify($scope.datashowProprietry))
    };
    $scope.showSecFindbyAdrs = function () {


        $scope.datashowSecFindbyAdrs = {
            securityCenterName: $scope.securtiyCenterName,
            securitySelectType: $scope.securitySelectType,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle,

        };

        alert(JSON.stringify($scope.datashowSecFindbyAdrs))

    };

    // POI için yazılan kodlar --->
    $scope.poiFrsqrMainCat = $rootScope.poi.poiFrsqrMainCat || [{
        value: 1,
        text: "Sanat ve Eğlence",
        status: false
    }, {value: 2, text: "Kolej ve Üniversite", status: false}, {value: 3, text: "Mağazalar", status: false}];
    $scope.filterPOISecCat = $rootScope.poi.filterPOISecCat || false;
    $scope.chooseMainCat = $rootScope.poi.chooseMainCat || false;
    $scope.chooseSecCat = $rootScope.poi.chooseSecCat || false;
    $scope.poiFrsqSecCat = [
        {
            mainid: "1",
            options: [{value: 1, text: "Müzeler", status: false}, {value: 2, text: "Konser Alanları", status: false}]
        },
        {
            mainid: "2",
            options: [{value: 1, text: "Üniversiteler", status: false}, {value: 2, text: "Okullar", status: false}]
        },
        {
            mainid: "3",
            options: [{value: 1, text: "Giyim Mağazaları", status: false}, {
                value: 2,
                text: "Ev Eşyaları",
                status: false
            }]
        }
    ];
    $scope.changePOISecCat = function (mainid) {

        mainid = parseInt(mainid);
        for (i in $scope.poiFrsqrMainCat) {
            if (mainid == $scope.poiFrsqrMainCat[i].value) {
                $scope.poiFrsqrMainCat[i].status = true;
                $scope.chooseMainCat = mainid;
                $rootScope.poi.chooseMainCat = mainid;
            } else {
                $scope.poiFrsqrMainCat[i].status = false;
            }
        }
        $rootScope.poi.poiFrsqrMainCat = $scope.poiFrsqrMainCat;
        $scope.filterPOISecCat = [];
        for (i in $scope.poiFrsqSecCat) {
            var ctrlmainid = parseInt($scope.poiFrsqSecCat[i].mainid);
            if (mainid == ctrlmainid) {
                var opt = $scope.poiFrsqSecCat[i].options;
                for (j in opt) {
                    $scope.filterPOISecCat.push(opt[j]);
                }
                $rootScope.poi.filterPOISecCat = $scope.filterPOISecCat;
            }
        }
    };
    $scope.selectPOISecCat = function (id) {
        id = parseInt(id);
        for (i in $rootScope.poi.filterPOISecCat) {
            var secCat = $rootScope.poi.filterPOISecCat[i].value;
            secCat = parseInt(secCat);
            if (id == secCat) {
                $rootScope.poi.filterPOISecCat[i].status = true;
                $scope.chooseSecCat = id;
                $rootScope.poi.chooseSecCat = id;
            } else {
                $rootScope.poi.filterPOISecCat[i].status = false;
            }
        }
        $scope.filterPOISecCat = $rootScope.poi.filterPOISecCat;

    };
    $scope.showPOIbyAdress = function () {
        $scope.datashowPOIbyAdress = {
            poimainid: $scope.chooseMainCat,
            poisecid: $scope.chooseSecCat,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle,
        };
        alert(JSON.stringify($scope.datashowPOIbyAdress));
    };
    //<--- POI İçin Yazılan Kodlar

    /* Security için Yazılan Kodlar */
    $scope.securityType = $rootScope.security.types || $rootScope.lang.menu.menu11.category;
    $rootScope.security.types = $scope.securityType;
    $scope.securtiyCenterName = $rootScope.security.securtiyCenterName || "";
    $scope.setScrtyCenterName = function () {
        $rootScope.security.securtiyCenterName = $scope.securtiyCenterName;
    };
    $scope.setSecurityCenterType = function (b) {
        $rootScope.securitySelectType = b;

    };
    /* Security için Yazılan Kodlar */

    /* Sağlık Merkezi için Yazılan Kodlar*/
    $scope.healthTypes = $rootScope.lang.menu.menu10.category;
    $scope.InstitutionsName = $rootScope.health.InstitutionsName || "";
    $rootScope.health.InstitutionsName = $scope.InstitutionsName;
    $rootScope.HealthCenterType = $rootScope.health.HealthCenterType || false;
    $scope.showInsbyAddress = function () {
        $scope.datashowInsByAdrs = {
            InstitutionsName: $scope.InstitutionsName,
            HealthCenterType: $scope.HealthCenterType,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle,

        };
        alert(JSON.stringify($scope.datashowInsByAdrs))
    };
    $scope.setInstitutionsName = function () {
        $rootScope.health.InstitutionsName = $scope.InstitutionsName;
    };
    $scope.setHealthCenterType = function (a) {
        $rootScope.HealthCenterType = a;
        $rootScope.health.HealthCenterType = $scope.HealthCenterType;
    };
    /* Sağlık Merkezi için Yazılan Kodlar*/


    /* show my find dr baş */

    $scope.showMyDoctor = function () {


        $scope.showHealthInst = {
            cardIdNo: $scope.cardIdNo,
            secilenIl: $scope.secilenIl,
            secilenIlce: $scope.secilenIlce,
            secilenMahalle: $scope.secilenMahalle

        };

        alert(JSON.stringify($scope.showHealthInst))
    };

    /* show my find dr son*/


    $scope.setCardIdNo = function () {

        $rootScope.cardIdNo = $scope.cardIdNo;
    };


    /*  autobus ve  minibus sorgu bas*/


    $scope.setautoCarTypeSelect = function () {

        $rootScope.autoCarTypeSelect = $scope.autoCarTypeSelect;
    };


    $scope.setshowNearBusSwitch = function (val) {

        $rootScope.showNearBusSwitch = val;
    }


    $scope.autoCarType = $rootScope.lang.menuToasts.transport.busmini.autoCarType;
    $scope.busStopActive = false;
    $scope.busStop = {};
    $scope.busStopList = [];
    $scope.TransportLine = false;
    $scope.busStopFeature = false;
    $scope.queryLineNumber = function (searchText) {
        var a, b = false;
        var c = parseInt($scope.autoCarTypeSelect);
        if (c == 1) {
            a = "busLines";
        }
        if (c == 2) {
            a = "miniBusLines";
        }
        var lines = $sahtejson[a];
        var dizi = [];
        for (i in lines) {
            var name = lines[i].label;
            var ilid = lines[i].ilid;
            ilid = parseInt(ilid);
            var name2 = name;
            name = name.toLowerCase();
            searchText = searchText.toLowerCase();
            if (name.indexOf(searchText) !== -1 && ilid == $scope.secilenIl) {
                dizi.push(name2);
            }
        }
        $scope.selectedLineNumber = null;
        return dizi;


    };
    $scope.selectNewBusLine = function () {
        var val = $scope.selectedLineNumber;
        if (val !== null) {
            var dizi = {};
            var json = false;
            var c = parseInt($scope.autoCarTypeSelect);
            if (c == 1) {
                a = "busLines";
                b = "busLinesPoint";
            }
            if (c == 2) {
                a = "miniBusLines";
                b = "miniBusLinesPoint";
            }
            var lines = $sahtejson[a];
            var points = $sahtejson[b];
            busStopList = [];
            for (i in lines) {
                var name = lines[i].label;
                var ilid = lines[i].ilid;
                ilid = parseInt(ilid);
                var lineid = lines[i].id;
                if (name == val && ilid == $scope.secilenIl) {
                    dizi = lines[i];
                    json = dizi.geojson;
                    $scope.busStopActive = true;
                    for (j in points) {
                        var point = points[j];
                        var pointName = point.label;
                        var pointid = point.id;
                        var pointlineid = point.lineid;
                        if (lineid == pointlineid) {
                            $scope.busStopList.push({value: pointid, text: pointName});
                        }
                    }
                }
            }
            if ($scope.TransportLine == false) {
                $scope.TransportLine = $leafletFonk.showGeoJSON(json, {bindPopupText: val}, true, true);
            } else {
                $scope.TransportLine.remove();
                $scope.TransportLine = $leafletFonk.showGeoJSON(json, {bindPopupText: val}, true, true);
            }
            if ($scope.featureIl !== false) {
                $scope.featureIl.remove();
                $scope.featureIl = false;
                $rootScope.adress.featureIl = false;
            }
        } else {
            $scope.busStopActive = false;
        }

        $rootScope.selectedLineNumber = $scope.selectedLineNumber;
        /*  hafızada tutma işlemi için*/
    };
    $scope.showBusPoint = function (pointId, stay) {
        pointId = parseInt(pointId);
        for (i in $sahtejson.busLinesPoint) {
            var point = $sahtejson.busLinesPoint[i];
            var id = point.id;
            var name = point.label;
            if (id == pointId) {
                var geojson = point.geojson;
                if ($scope.busStopFeature == false) {
                    $scope.busStopFeature = $leafletFonk.showGeoJSON(geojson, {bindPopupText: name}, true, stay);
                } else {
                    $scope.busStopFeature.remove();
                    $scope.busStopFeature = $leafletFonk.showGeoJSON(geojson, {bindPopupText: name}, true, stay);
                }

            }
        }
    };

    /* otogbus ve minibus sorgu son*/

    $scope.trainType = $rootScope.lang.menuToasts.transport.train.trainType; //tram and train vehicles type


    /*tram */


    $scope.setTrainLines = function (a) {

        $rootScope.TrainLines = a;

    };


    $scope.setArriveStation = function (b) {

        $rootScope.arriveStop = b;

    };

    $scope.setDepartureStation = function (c) {


        $rootScope.departureStop = c;

    }


    $scope.settrainTypeName = function (a) {

        $rootScope.trainTypeName = a;
    }


    $scope.setnearesTramSwitch = function () {

        $rootScope.nearesTramSwitch = $scope.nearesTramSwitch;

    }

    $scope.setshowTramOnMap = function () {
        $rootScope.showTramOnMap = $scope.showTramOnMap;

    }
    /* tram */


    /* Gemi ve Feribot Kod BLoğu Baş */
    $scope.shipType = $rootScope.lang.menuToasts.transport.ship.shipType;
    $scope.shipTypeSelect = $rootScope.transport.shipTypeSelect;
    $scope.shipLineActive = $rootScope.transport.shipLineActive || false;
    $scope.shipLines = $rootScope.transport.shipLines || [];
    $scope.shiplineSelect = $rootScope.transport.shiplineSelect || "";
    $scope.shipTypeChange = function () {
        $rootScope.transport.shipTypeSelect = $scope.shipTypeSelect;
        var dizi = [];
        $rootScope.transport.shipLineActive = true;
        $scope.shipLineActive = true;
        var lines = $sahtejson.shipLine;
        for (i in lines) {
            var id = lines[i].id;
            var label = lines[i].label;
            var ilid = lines[i].ilid;
            var vec = lines[i].vehicleType;
            if (ilid == $scope.secilenIl && vec == $scope.shipTypeSelect) {
                dizi.push({value: id, text: label, status: false});
            }
        }
        $scope.shipLines = dizi;
        $rootScope.transport.shipLines = $scope.shipLines;

    };
    $scope.shipPointActive = $rootScope.transport.shipPointActive || false;
    $scope.shipPoints = $rootScope.transport.shipPoints || [];
    $scope.showLine = $rootScope.transport.showLine || false;
    $scope.shipLineChange = function (id) {
        $rootScope.transport.shiplineSelect = parseInt(id);
        $scope.shiplineSelect = parseInt(id);
        if ($scope.featureIl !== false) {
            $scope.featureIl.remove();
            $scope.featureIl = false;
            $rootScope.adress.featureIl = false;
        }
        $scope.shipPointActive = true;
        $rootScope.transport.shipPointActive = true;
        var lines = $sahtejson.shipLine;
        for (j in lines) {
            var ilid = lines[j].ilid;
            var myid = lines[j].id;
            var geojson = lines[j].geojson;
            var label = lines[j].label;
            if (ilid == $scope.secilenIl && myid == id) {
                if ($scope.showLine == false) {
                    $scope.showLine = $leafletFonk.showGeoJSON(geojson, {
                        bindPopupText: label,
                        style: {color: "green"}
                    }, true, true);
                } else {
                    $scope.showLine.remove();
                    $scope.showLine = $leafletFonk.showGeoJSON(geojson, {
                        bindPopupText: label,
                        style: {color: "green"}
                    }, true, true);
                }

            }
        }
        var points = $sahtejson.shipPoint;
        var dizi = [];
        for (i in points) {
            var id = points[i].id;
            var label = points[i].label;
            var lineid = points[i].lineid;
            if (lineid == $scope.shiplineSelect) {
                dizi.push({value: id, text: label, status: false});
            }
        }
        $scope.shipPoints = dizi;
        $rootScope.transport.shipPoints = $scope.shipPoints;
    };
    $scope.departurePoint = $rootScope.transport.departurePoint || false;
    $scope.shipPointDepa = $rootScope.transport.shipPointDepa || "";
    $scope.showPoint = $rootScope.transport.showPoint || false;
    $scope.startPoint = $rootScope.transport.startPoint || false;
    $scope.startPointNum = $rootScope.transport.startPointNum || "";
    $scope.finishPoint = $rootScope.transport.finishPoint || false;
    $scope.finishPointNum = $rootScope.transport.finishPointNum || "";
    $scope.showNearestPort = $rootScope.transport.showNearestPort || false;
    $scope.showOnlineShip = $rootScope.transport.showOnlineShip || false;
    $scope.showShipPoint = function (id) {
        /*$rootScope.transport.shipPointDepa = parseInt(id);
        $scope.shipPointDepa = parseInt(id);*/

        id = parseInt(id);
        var points = $sahtejson.shipPoint;
        for (i in points) {
            var pointid = points[i].id;
            var json = points[i].geojson.geometry.coordinates;
            var latlng = L.latLng(json[1], json[0]);
            if (id == pointid) {
                if ($scope.showPoint == false) {
                    $scope.showPoint = L.marker(latlng).addTo($rootScope.leaflet);
                } else {
                    $scope.showPoint.setLatLng(latlng);
                }
            }
        }

    };

    $scope.selectShipPoint = function (point, id) {
        if (point == 1) {
            $scope.startPointNum = id;
            $rootScope.transport.startPointNum = id;
        }
        if (point == 2) {
            $scope.finishPointNum = id;
            $rootScope.transport.finishPointNum = id;
        }
        var points = $sahtejson.shipPoint;
        for (i in points) {
            var pointid = points[i].id;
            var json = points[i].geojson.geometry.coordinates;
            var latlng = L.latLng(json[1], json[0]);
            if (id == pointid) {
                if ($scope.showPoint == false) {
                    $scope.showPoint = L.marker(latlng).addTo($rootScope.leaflet);
                } else {
                    $scope.showPoint.setLatLng(latlng);
                }
            }
        }

    };
    $scope.changeNearestPort = function () {

        $rootScope.transport.showNearestPort = !$scope.showNearestPort;
    };
    $scope.changeOnlineShip = function () {

        $rootScope.transport.showOnlineShip = !$scope.showOnlineShip;
    };
    /* Gemi ve Feribot Kod BLoğu Son  */


    $scope.setShipTypeSelect = function (a) {

        $rootScope.shipTypeSelect = a;
    }

    /* Aircraft Bas*/
    $scope.airport = $rootScope.transport.aircraft.airport || false;
    $scope.airportActive = $rootScope.transport.aircraft.airportActive || false;
    $scope.airportList = $rootScope.transport.aircraft.airportList || [];
    $scope.airportsGeometry = $rootScope.transport.aircraft.airportsGeometry || [];
    $scope.airportInfo = $rootScope.transport.aircraft.airportInfo || false;
    $scope.flightType = $rootScope.transport.aircraft.flightType || [];
    $scope.passengerType = $rootScope.transport.aircraft.passengerType || [];
    $scope.aircraftAjaxRequest = {};
    $scope.filterAirports = function (ilid) {
        ilid = parseInt(ilid);
        var dizi = [];
        var airports = $sahtejson.airports;
        for (i in airports) {
            var ports = airports[i];
            var id = ports.id;
            var label = ports.label;
            var ilidjson = ports.ilid;
            if (ilidjson == ilid) {
                dizi.push({value: id, text: label, status: false});
            }
        }
        if (dizi.length > 0) {
            $scope.airportActive = true;
            $rootScope.transport.aircraft.airportActive = true;
        }
        $scope.airportList = dizi;
        $rootScope.transport.aircraft.airportList = dizi;

    };
    $scope.selectAirport = function (airportId) {

        airportId = parseInt(airportId);
        $scope.airportInfo = true;
        $rootScope.transport.aircraft.airportInfo = true;
        $scope.airport = airportId;
        $rootScope.transport.aircraft.airport = airportId;
        var airports = $sahtejson.airports;
        for (i in airports) {
            var ports = airports[i];
            var id = ports.id;
            var label = ports.label;
            var ilidjson = ports.ilid;
            var geojson = ports.geojson;
            if (id == airportId) {
                if ($scope.featureIl !== false) {
                    $scope.featureIl.remove();
                    $scope.featureIl = false;
                    $rootScope.adress.featureIl = false;
                }
                if ($scope.airportsGeometry == false) {
                    $scope.airportsGeometry = $leafletFonk.showGeoJSON(geojson, {bindPopupText: label}, true, true);
                } else {
                    $scope.airportsGeometry.remove();
                    $scope.airportsGeometry = $leafletFonk.showGeoJSON(geojson, {bindPopupText: label}, true, true);
                }

            }
        }


    };
    $scope.selectFlightType = function (id) {
        $scope.flightType = parseInt(id);
        $rootScope.transport.aircraft.flightType = parseInt(id);
    };
    $scope.selectPassengerType = function (id) {
        $scope.passengerType = parseInt(id);
        $rootScope.transport.aircraft.passengerType = parseInt(id);
    };
    $scope.showAirportInfo = function () {
        $scope.aircraftAjaxRequest = {
            secilenIl: $scope.secilenIl,
            airport: $scope.airport,
            flightType: $scope.flightType,
            passengerType: $scope.passengerType

        };
        alert(JSON.stringify($scope.aircraftAjaxRequest));
        i
    }
    /* Aircraft Son*/


    $scope.searchFindBusMiniBus = function () {

        $scope.dataFindBusMiniBus = {
            secilenIl: $scope.secilenIl,
            autoCarTypeSelect: $scope.autoCarTypeSelect,
            selectedLineNumber: $scope.selectedLineNumber,
            busStop: $scope.busStop,
            showNearBusSwitch: $scope.showNearBusSwitch,

        };

        alert(JSON.stringify($scope.dataFindBusMiniBus));
    };


    $scope.searchFindTrainTram = function () {

        $scope.dataFindTrainTram = {
            secilenIl: $scope.secilenIl,
            trainTypeName: $scope.trainTypeName,
            TrainLines:$scope.TrainLines,
            departureStop:$scope.departureStop,
            arriveStop:$scope.arriveStop,
            nearesTramSwitch:$scope.nearesTramSwitch,
            showTramOnMap:$scope.showTramOnMap

        };

        alert(JSON.stringify($scope.dataFindTrainTram));
    }

    /* Google Maps API POI bas*/

    $scope.placesMainType = $sahtejson.googlePOITypeMain;
    $scope.poiRadius = $rootScope.poi.google.poiRadius || 500;
    $scope.googleSearchPOIRadius = function (){
        $rootScope.poi.google.poiRadius=$scope.poiRadius;
    };
    $scope.locationActive = $rootScope.poi.google.locationActive || false;
    $scope.poiLocActChange = function(){
        $rootScope.poi.google.locationActive=!$scope.locationActive;
    };
    $scope.poiClickMapActive = $rootScope.poi.google.poiClickMapActive || false;
    $scope.poiClickChange = function(){
        $rootScope.poi.google.poiClickMapActive=!$scope.poiClickMapActive;
    };
    $scope.poiMainType = $rootScope.poi.google.poiMainType || [];
    $scope.poiSecType =  $rootScope.poi.google.poiSecType || [];
    $scope.poiSecTypeActive = $rootScope.poi.google.poiSecTypeActive || false;
    $scope.changePOISecTypes = function(id){
        $rootScope.poi.google.poiSecType=$sahtejson.googlePOITypesSec[id];
        $scope.poiSecType=$sahtejson.googlePOITypesSec[id];
        $rootScope.poi.google.poiSecTypeActive=true;
        $scope.poiSecTypeActive=true;
    };
    $scope.changePOISec = function(id){
        debugger;
        var list = $scope.poiSecType;
        for(i in list){
            if(list[i].value==id){
                list[i].status=true;
            }else{
                list[i].status=false;
            }
        }
        $scope.poiSecType=list;
        $rootScope.poi.google.poiSecType=$scope.poiSecType;
    };
    $scope.searchPOIGoogle = function(){

    };
    /* Google Maps API POI bas*/
});