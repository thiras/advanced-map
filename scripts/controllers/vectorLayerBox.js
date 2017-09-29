app.controller("vectorLayerBox", function ($scope, $layersJson, $mdDialog, $rootScope, $mdToast,$jsDB) {

    $jsDB.open("balgis3",'lang');
    $jsDB.addData('lang',{name:"tr"});
    $jsDB.addData('lang',{name:"en"});
    $jsDB.getData("lang").then(function (a) {
        console.log(a)
    });
/*
    $jsDB.getFields("lang").then(function (a) {
        console.log(a)
    });
*/



    $scope.clickSettings = "";

    $scope.lastRadioId = (function () {


        for (a in $layersJson.data.info) {


            if ($layersJson.data.info[a].active)
                return a;

        }

    })();


    $scope.openEditTool = function () {


        $mdToast.show({
            hideDelay: 0,
            position: 'top right',
            controller: 'editTool',
            templateUrl: 'mdtoast/drawtool.html',

        });


        var id = $layersJson.data.active;
        var type = $layersJson.data.info[id].type;
        var snap = $layersJson.data.info[id].snap;

    };


    $scope.moveFirst = function () {


        var data = $layersJson.data.zindex;
        var lastNum = data.length - 1; //0-4
        var active = $layersJson.data.active;
        var indis = -1;
        var yeniindis = -1;

        for (prop in data) {
            var lyr = data[prop];
            if (lyr == active) {
                indis = prop;
            }
        }
        indis = parseInt(indis);
        yeniindis = 0;
        var atThere = data[yeniindis];
        var nowHere = data[indis];
        $layersJson.data.zindex[yeniindis] = active;
        $layersJson.data.zindex[indis] = atThere;
        var activeVeri = $layersJson.data.info[active];
        var yeniVeri = $layersJson.data.info[atThere];


        $rootScope.refresh();


    };


    $scope.moveLast = function () {


        var data = $layersJson.data.zindex;
        var lastNum = data.length - 1; //0-4
        var active = $layersJson.data.active;
        var indis = -1;
        var yeniindis = -1;

        for (prop in data) {
            var lyr = data[prop];
            if (lyr == active) {
                indis = prop;
            }
        }
        indis = parseInt(indis);
        yeniindis = parseInt(yeniindis);
        var atThere = data[yeniindis];
        var nowHere = data[indis];
        $layersJson.data.zindex[yeniindis] = active;
        $layersJson.data.zindex[indis] = atThere;
        var activeVeri = $layersJson.data.info[active];
        var yeniVeri = $layersJson.data.info[atThere];
        //$rootScope.vectorLayerList={};


        $rootScope.refresh();


    };


    $scope.moveDown = function () {
        var data = $layersJson.data.zindex;
        var lastNum = data.length - 1; //0-4
        var active = $layersJson.data.active;
        var indis = -1;
        var yeniindis = -1;

        for (prop in data) {
            var lyr = data[prop];
            if (lyr == active) {
                indis = prop;
            }
        }
        indis = parseInt(indis);
        if (indis < lastNum) {
            yeniindis = indis + 1;
        } else {
            yeniindis = lastNum;
        }
        yeniindis = parseInt(yeniindis);
        var atThere = data[yeniindis];
        var nowHere = data[indis];
        $layersJson.data.zindex[yeniindis] = active;
        $layersJson.data.zindex[indis] = atThere;
        var activeVeri = $layersJson.data.info[active];
        var yeniVeri = $layersJson.data.info[atThere];
        //$rootScope.vectorLayerList={};


        $rootScope.refresh();

    };


    $scope.moveUp = function () {
        var data = $layersJson.data.zindex;
        var lastNum = data.length - 1; //0-4
        var active = $layersJson.data.active;
        var indis = -1;
        var yeniindis = -1;

        for (prop in data) {
            var lyr = data[prop];
            if (lyr == active) {
                indis = prop;
            }
        }
        indis = parseInt(indis);
        if (indis > 0) {
            yeniindis = indis - 1;
        } else {
            yeniindis = 0;
        }
        yeniindis = parseInt(yeniindis);
        var atThere = data[yeniindis];
        var nowHere = data[indis];
        $layersJson.data.zindex[yeniindis] = active;
        $layersJson.data.zindex[indis] = atThere;
        var activeVeri = $layersJson.data.info[active];
        var yeniVeri = $layersJson.data.info[atThere];
        //$rootScope.vectorLayerList={};

        $rootScope.refresh();
    };


    $scope.showTabDialog = function (event) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogs/addNewVectorLayer.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    $scope.openSettingsDialog = function (ev) {

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogs/settings.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    $rootScope.refresh = function () {

        var newList = [];

        for (prop in $layersJson.data.zindex) {
            var ln = $layersJson.data.zindex[prop];
            if ($layersJson.data.layers.indexOf(ln) > -1) {
                newList.push($layersJson.data.info[ln]);
            }
        }
        $rootScope.vectorLayerList = newList;

    };


    /* dilogcontroller başlangıcı */
    function DialogController($scope, $mdDialog, $layersJson, $rootScope, $timeout) {


        $scope.lang = $rootScope.lang;

        if (typeof $rootScope.clickSettings !== "undefined") {
            $scope.clickSettings = $rootScope.clickSettings;
            $scope.styles = $rootScope.clickSettings.styles;
            $scope.id = $rootScope.clickSettings.id;
        }

        $scope.colorPalet = function (ln, stl, prop) {
            var elm = document.createElement('input');
            elm.type = 'color';
            elm.setAttribute('ng-model', 'styles[' + stl + '].' + prop);
            elm.click();
            elm.addEventListener('input', function (e) {
                $layersJson.data.info[ln]["styles"][stl][prop] = e.target.value;
                $scope.$digest();
            });
            elm.addEventListener('change', function () {
                $layersJson.data.info[ln]["styles"][stl][prop] = elm.value;
                $scope.$digest();
                elm.remove();
            });
            elm.remove();
        };
        $scope.createNewVectorLayer = function (event) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialogs/createNewVectorLayer.html',
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

        $scope.getVectorLayersInfo = function (obj) {
            var json = {};
            for (prop in obj) {
                var id = obj[prop];
                var layer = $layersJson.data.info[id];
                json[id] = layer;
            }
            return json;
        };
        $scope.vectorLayers = $scope.getVectorLayersInfo($layersJson.data.vectorLayers);


        $rootScope.vectorLayerList = $rootScope.vectorLayerList;


        $scope.layers = [];
        for (prop in $layersJson.data.layers) {
            var lynrName = $layersJson.data.layers[prop];
            var avtiveLayers = $layersJson.data.zindex;

            $scope.layers.push($layersJson.data.info[lynrName]);
        }
        /*$rootScope.vectorLayerList;*/


        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };


        $scope.addToVectorList = function (gelen) {
            $layersJson.data.zindex.push(gelen);
            $layersJson.data.info[gelen].atlist = true;
            $rootScope.refresh();

        };
        $scope.readyFields = {id: {name: "id", type: "bigint"}};
        if (typeof $scope.id !== "undefined") {

            $scope.readyFieldsInfo = $layersJson.data.info[$scope.id].fields;
            $scope.createdFeatures = $layersJson.data.info[$scope.id].feature.features;
        }
        $scope.deleteNewField = function (a, id) {
            if (id == null) {
                var obj = $scope.readyFields;
                $scope.readyFields = {id: {name: "id", type: "bigint"}};
                for (prop in obj) {
                    if (a !== prop && prop !== "id") {
                        $scope.readyFields[prop] = obj[prop];
                    }
                }
            } else {
                var obj2 = $layersJson.data.info[id].fields;
                $scope.readyFieldsInfo = {id: {name: "id", type: "bigint"}};
                $layersJson.data.info[id].fields = {id: {name: "id", type: "bigint"}};
                for (prop in obj2) {
                    if (a !== prop && prop !== "id") {
                        $scope.readyFieldsInfo[prop] = obj2[prop];
                        $layersJson.data.info[id].fields[prop] = obj2[prop];
                    }
                }
            }
        };
        $scope.addNewField = function (id) {
            var fieldType = $scope.fieldType;
            var fieldName = $scope.fieldName;
            var types = ["smallint", "integer", "bigint", "real", "double precision", "text", "date", "timestamp", "boolean"];
            if (fieldType !== "" && fieldName !== "") {
                fieldName = fieldName.split(' ').join('');
                fieldName = fieldName.toLowerCase();
                if (types.indexOf(fieldType) > -1) {
                    for (prop in $scope.readyFields) {
                        if (fieldName !== prop) {
                            if (id == null) {
                                $scope.readyFields[fieldName] = {name: fieldName, type: fieldType};
                            } else {
                                $layersJson.data.info[id].fields[fieldName] = {name: fieldName, type: fieldType};
                            }

                        } else {
                            alert("Benzer Bir Sütun Adı Vardır. Beznersiz Bir Sütun Adı Giriniz");
                        }
                    }
                }
            } else {
                alert("Bu Tip Geçerli Değildir");
            }
        };


        $scope.confirmNewVectorLayer = function () {
            var layerName = $scope.layerName;
            var descrptn = $scope.descrptn;
            var vectorlayerType = $scope.vectorlayerType;
            var vectorCrs = $scope.vectorCrs;
            var idNum = $layersJson.data.vectorLayers.length;
            var id = 'feature' + idNum;
            if (vectorlayerType !== "0") {
                var newJson = {
                    id: id,
                    seq: {state: true, start: 0, finish: 999999999999, step: 1, now: 1},
                    primaryKey: "id",
                    fields: $scope.readyFields,
                    label: layerName,
                    description: "",
                    type: vectorlayerType,
                    show: true,
                    snap: true,
                    snapDistance: 20,
                    edit: true,
                    editMode: {looping: true},
                    delete: true,
                    query: true,
                    active: false,
                    atlist: true,
                    lastChangeTime: 1503908483348,
                    zindex: 6,
                    crs: vectorCrs,
                    opacity: 1,
                    minZoom: 1,
                    maxZoom: 16,
                    zoom: 14,
                    feature: {
                        featureId: [],
                        features: {},
                        selectedId: []
                    },
                    styles: {
                        style: {
                            stroke: true,
                            color: "#049ec4",
                            weight: 1,
                            opacity: 1,
                            lineCap: 'round',
                            lineJoin: 'round',
                            dashArray: null,
                            dashOffset: null,
                            fill: true,
                            fillColor: "#049ec4",
                            fillOpacity: 0.5,
                            fillRule: "evenodd",
                            bubblingMouseEvents: true,
                            className: "numarataj"
                        },
                        hoverStyle: {
                            stroke: true,
                            color: "#4cba32",
                            weight: 1,
                            opacity: 1,
                            lineCap: 'round',
                            lineJoin: 'round',
                            dashArray: null,
                            dashOffset: null,
                            fill: true,
                            fillColor: "#4cba32",
                            fillOpacity: 0.5,
                            fillRule: "evenodd",
                            bubblingMouseEvents: true,
                            className: "numarataj"
                        },
                        selectedStyle: {
                            stroke: true,
                            color: "#ff004d",
                            weight: 1,
                            opacity: 1,
                            lineCap: 'round',
                            lineJoin: 'round',
                            dashArray: null,
                            dashOffset: null,
                            fill: true,
                            fillColor: "#ff004d",
                            fillOpacity: 0.5,
                            fillRule: "evenodd",
                            bubblingMouseEvents: true,
                            className: "numarataj"
                        }
                    }

                };
                $layersJson.data.vectorLayers.push(id);
                $layersJson.data.layers.push(id);
                $layersJson.data.zindex.push(id);
                $layersJson.data.info[id] = newJson;
                $rootScope.refresh();
            } else {
                alert("Vektör Katman Tipini Seçmediniz");
            }


            $timeout(function () {

                angular.element(document.querySelector("#closeBtn")).triggerHandler("click", "notuseful");
                angular.element(document.querySelector("#layerIcon")).triggerHandler("click", "useful");

            }, 0);

        }
    }

    /* dialogcontroller sonu*/


    $rootScope.vectorLayerList = [];

    for (prop in $layersJson.data.zindex) {
        var ln = $layersJson.data.zindex[prop];
        if ($layersJson.data.layers.indexOf(ln) > -1) {
            $rootScope.vectorLayerList.push($layersJson.data.info[ln]);
        }
    }
    $rootScope.vectorLayerListNum = 7;


    $scope.layerActive = function (layerName) {


        $layersJson.data.active = layerName;

        for (prop in $layersJson.data.info) {
            if (layerName == prop) {
                $layersJson.data.info[layerName].active = true;
                $layersJson.data.active = layerName;
            } else {
                $layersJson.data.info[prop].active = false;
            }
        }


    };

    $scope.setProp = function (prop, layerName) {


        $layersJson.data.info[layerName][prop] = !$layersJson.data.info[layerName][prop];


    };


    $scope.layerSettings = function (id) {
        $rootScope.clickSettings = $layersJson.data.info[id];
    };

    $scope.layerDeleteToList = function (layerName) {

        layerName = '' + layerName;
        var newLayerList = [];
        var lnarray = [];
        for (prop in $layersJson.data.zindex) {
            var ln = $layersJson.data.zindex[prop];
            if (prop !== layerName) {
                newLayerList.push($layersJson.data.info[ln]);
                lnarray.push(ln);
                $layersJson.data.info[ln].atlist = true;
            } else {
                $layersJson.data.info[ln].atlist = false;
            }
        }

        $rootScope.vectorLayerList = newLayerList;

        $layersJson.data.zindex = lnarray;

    }


    $scope.showDbListPage = function (ev) {


        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogs/listDatabases.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });


    }


    $scope.showToDbDialog = function (ev) {


        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialogs/savetodatabase.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });


    }

});