
app.controller("mdsliderctrl",function ($scope,$rootScope,$leftmenujson,$fonks,$leafletFonk) {

    $rootScope.$on("opacitySliderSetValue",function (a,b) {

       $rootScope.bass=b;
       $scope.bass=b;

    });




        $rootScope.bass=$leftmenujson.jsonData.layerBox[0].layers[0].opacity*100;


$scope.bass=$rootScope.bass;

    $scope.changeSliderValue=function (val) {


    $rootScope.bass=val;
    var lastActive = $leftmenujson.jsonData.lastActive;
    var adress= $fonks.findLeftBottomLayerBoxLayer($leftmenujson.jsonData,lastActive);
    var data =  $leftmenujson.jsonData.layerBox[parseInt(adress.layers)].layers[parseInt(adress.layer)];
    var val  = parseFloat(val)/100;
    $leftmenujson.jsonData.layerBox[parseInt(adress.layers)].layers[parseInt(adress.layer)].opacity =val;
        console.log($leftmenujson.jsonData);
        $rootScope.mevcutHarita.setOpacity(val);


    }
});