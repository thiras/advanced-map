app.controller("editTool",function ($scope,$mdToast,$rootScope,$toolEdit,$layersJson,$leafletFonk) {


    $scope.lang=$rootScope.lang;
    $scope.activeLayer = $layersJson.data.active;
    $scope.layer = $layersJson.data.info[$scope.activeLayer];
    $scope.activeGeometryType = $scope.layer.type;
    $scope.icons = $toolEdit.type[$scope.activeGeometryType].icons;
    $scope.options = {
        snappable: true,
        snapDistance: 20,
        templineStyle: {
            color: 'red',
        },
        hintlineStyle: {
            color: 'red',
            dashArray: [5, 5],
        },
        cursorMarker: true,
        finishOnDoubleClick: true,
        markerStyle: {
            opacity: 1,
            draggable: true,
        }
    };
    $scope.types = $rootScope.leaflet.pm.Draw.getShapes();
    $scope.activeDrawTool = false;

    //$rootScope.leaflet.pm.enableDraw('Rectangle', $scope.options);
    //$rootScope.leaflet.pm.enableDraw('Line', $scope.options);
    //$rootScope.leaflet.pm.enableDraw('Marker', $scope.options);
    //$rootScope.leaflet.pm.enableDraw('Circle', $scope.options);
    $rootScope.leaflet.on('pm:create', function(e) {
        var layer = e.layer;
        var layerid = layer._leaflet_id;
        $scope.layer.feature.featureId.push('feature'+layerid);
        $scope.layer.feature.features['feature'+layerid]=layer;
        layer.setStyle($scope.layer.styles.style);
        $layersJson.data.info[$scope.activeLayer].feature.features['feature'+layerid].info = {id:layerid,label:$scope.activeLayer};
        $layersJson.data.info[$scope.activeLayer].feature.features['feature'+layerid].dataFields = {};
        var seq = $scope.layer.seq.now;
        for (prop in $scope.layer.fields){
            if(prop=="id"){
                $layersJson.data.info[$scope.activeLayer].feature.features['feature'+layerid].dataFields[prop]=seq;
            }else{
                $layersJson.data.info[$scope.activeLayer].feature.features['feature'+layerid].dataFields[prop]="";
            }
        }
        $scope.layer.seq.now=$scope.layer.seq.now+$scope.layer.seq.step;
        /*if($scope.layer.editMode.looping==true){
            $scope[$scope.activeDrawTool]();
        }*/


        layer.on("click",function (e) {
            var id = e.target.info.id;
            var lbl = e.target.info.label;
            var indx = $layersJson.data.info[lbl].feature.selectedId.indexOf('feature'+id);
            if(indx>-1){
                layer.setStyle( $layersJson.data.info[lbl].styles.style);
                $layersJson.data.info[lbl].feature.selectedId.splice(indx, 1);
            }else{
                layer.setStyle($scope.layer.styles.selectedStyle);
                $layersJson.data.info[lbl].feature.selectedId.push('feature'+id);
            }

        });
        layer.on("mouseover",function (e) {
            var id = e.target.info.id;
            var lbl = e.target.info.label;
            layer.setStyle( $layersJson.data.info[lbl].styles.hoverStyle);
        });
        layer.on("mouseout",function (e) {
            var id = e.target.info.id;
            var lbl = e.target.info.label;
            if( $layersJson.data.info[lbl].feature.selectedId.indexOf('feature'+layerid)>-1){
                layer.setStyle( $layersJson.data.info[lbl].styles.selectedStyle);
            }else{
                layer.setStyle( $layersJson.data.info[lbl].styles.style);
            }

        });
        $rootScope.leaflet.on('pm:remove', function(e) {
            var id = e.layer.info.id;
            var lbl = e.layer.info.label;
            var indxselect = $layersJson.data.info[lbl].feature.selectedId.indexOf('feature'+id);
            if(indxselect>-1){
                $layersJson.data.info[lbl].feature.selectedId.splice(indxselect, 1);
            }
            var indxfeat = $layersJson.data.info[lbl].feature.featureId.indexOf('feature'+id);
            if(indxfeat>-1){
                $layersJson.data.info[lbl].feature.featureId.splice(indxfeat, 1);
                delete $layersJson.data.info[lbl].feature.features['feature'+id];
            }
        });
    });



    $scope.factoryMethod=function (fn) {
        $scope[fn]();
    };
    $scope.allButtonChange = function ($a,lastActive) {
        for(prop in $a.type[$a.activeType].icons){
            if(prop==$a.activeButton){
                if(lastActive==$a.activeButton){
                    $a.type[$a.activeType].icons[prop].active=false;
                    $a.activeButton=false;
                }else{
                    $a.lastActive=prop;
                    $a.type[$a.activeType].icons[prop].active=true;
                }
            }else{
                $a.type[$a.activeType].icons[prop].active=false;
            }
        }
        return $a;
    };

    $scope.drawPolygon=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Polygon";
        $toolEdit.activeButton="polygon";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $scope.activeDrawTool=$toolEdit.type.Polygon.icons.polygon.function;
        $scope.options = {
            snappable: $scope.layer.snap,
            snapDistance: $scope.layer.snapDistance,
            templineStyle: {
                color: 'green',
                weight:2
            },
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
                weight:2
            },
            cursorMarker: true,
            finishOnDoubleClick: true,
            markerStyle: {
                opacity: 1,
                draggable: true,
            }
        };
        if($toolEdit.activeButton!=="polygon"){
            $rootScope.leaflet.pm.disableDraw('Poly');
        }else{
            $rootScope.leaflet.pm.enableDraw('Poly', $scope.options);
        }

    };


    $scope.drawPolyRectangle=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Polygon";
        $toolEdit.activeButton="polyRectangle";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $scope.activeDrawTool=$toolEdit.type.Polygon.icons.polyRectangle.function;
        $scope.options = {
            snappable: $scope.layer.snap,
            snapDistance: $scope.layer.snapDistance,
            templineStyle: {
                color: 'green',
                weight:2
            },
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
                weight:2
            },
            cursorMarker: true,
            finishOnDoubleClick: true,
            markerStyle: {
                opacity: 1,
                draggable: true,
            }
        };

        if($toolEdit.activeButton!=="polyRectangle"){
            $rootScope.leaflet.pm.disableDraw('Rectangle');
        }else{
            $rootScope.leaflet.pm.enableDraw('Rectangle', $scope.options);
        }
    };


    $scope.drawPolyCircile=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Polygon";
        $toolEdit.activeButton="polyCircile";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $scope.activeDrawTool=$toolEdit.type.Polygon.icons.polyCircile.function;
        $scope.options = {
            snappable: $scope.layer.snap,
            snapDistance: $scope.layer.snapDistance,
            templineStyle: {
                color: 'green',
                weight:2
            },
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
                weight:2
            },
            cursorMarker: true,
            finishOnDoubleClick: true,
            markerStyle: {
                opacity: 1,
                draggable: true,
            }
        };

        if($toolEdit.activeButton!=="polyCircile"){
            $rootScope.leaflet.pm.disableDraw('Circle');
        }else{
            $rootScope.leaflet.pm.enableDraw('Circle', $scope.options);
        }
    };


    $scope.drawPolyellips=function () {};


    $scope.drawPolyArc=function () {};


    $scope.drawPolyBezier=function () {};


    $scope.drawLine=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Linestring";
        $toolEdit.activeButton="line";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $scope.activeDrawTool=$toolEdit.type.Linestring.icons.line.function;
        $scope.options = {
            snappable: $scope.layer.snap,
            snapDistance: $scope.layer.snapDistance,
            templineStyle: {
                color: 'green',
                weight:2
            },
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
                weight:2
            },
            cursorMarker: true,
            finishOnDoubleClick: true,
            markerStyle: {
                opacity: 1,
                draggable: true,
            }
        };

        if($toolEdit.activeButton!=="line"){
            $rootScope.leaflet.pm.disableDraw('Line');
        }else{
            $rootScope.leaflet.pm.enableDraw('Line', $scope.options);
        }
    };


    $scope.drawLineRectangle=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Linestring";
        $toolEdit.activeButton="lineRectangle";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $scope.activeDrawTool=$toolEdit.type.Linestring.icons.lineRectangle.function;
        $scope.options = {
            snappable: $scope.layer.snap,
            snapDistance: $scope.layer.snapDistance,
            templineStyle: {
                color: 'green',
                weight:2
            },
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
                weight:2
            },
            cursorMarker: true,
            finishOnDoubleClick: true,
            markerStyle: {
                opacity: 1,
                draggable: true,
            }
        };


        if($toolEdit.activeButton!=="lineRectangle"){
            $rootScope.leaflet.pm.disableDraw('Rectangle');
        }else{
            $rootScope.leaflet.pm.enableDraw('Rectangle', $scope.options);
        }
    };


    $scope.drawLineCircle=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Linestring";
        $toolEdit.activeButton="lineCircle";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $scope.activeDrawTool=$toolEdit.type.Linestring.icons.lineCircle.function;
        $scope.options = {
            snappable: $scope.layer.snap,
            snapDistance: $scope.layer.snapDistance,
            templineStyle: {
                color: 'green',
                weight:2
            },
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
                weight:2
            },
            cursorMarker: true,
            finishOnDoubleClick: true,
            markerStyle: {
                opacity: 1,
                draggable: true,
            }
        };

        if($toolEdit.activeButton!=="lineCircle"){
            $rootScope.leaflet.pm.disableDraw('Circle');
        }else{
            $rootScope.leaflet.pm.enableDraw('Circle', $scope.options);
        }
    };


    $scope.drawLineArc=function () {};


    $scope.drawLineBezier=function () {};


    $scope.drawPoint=function () {};


    $scope.drawMarker=function () {};


    $scope.polyEdit=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Polygon";
        $toolEdit.activeButton="polyEdit";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $rootScope.leaflet.pm.toggleGlobalEditMode();
    };


    $scope.polyRemove=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Polygon";
        $toolEdit.activeButton="polyRemove";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $rootScope.leaflet.pm.toggleGlobalRemovalMode();
    };

    $scope.lineEdit=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Linestring";
        $toolEdit.activeButton="lineEdit";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $rootScope.leaflet.pm.toggleGlobalEditMode();
    };


    $scope.lineRemove=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Linestring";
        $toolEdit.activeButton="lineRemove";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $rootScope.leaflet.pm.toggleGlobalRemovalMode();
    };

    $scope.pointEdit=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Point";
        $toolEdit.activeButton="pointEdit";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $rootScope.leaflet.pm.toggleGlobalEditMode();
    };


    $scope.pointRemove=function () {
        var lastActive = $toolEdit.lastActive;
        $toolEdit.activeType="Point";
        $toolEdit.activeButton="pointRemove";
        $toolEdit=$scope.allButtonChange($toolEdit,lastActive);
        $rootScope.leaflet.pm.toggleGlobalRemovalMode();
    };





    $scope.closeToast=function () {


        $mdToast.hide();


    }

});