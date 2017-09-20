
app.directive("click",function ($rootScope,$leftmenujson,$fonks,$leafletFonk) {

    return {
        link:function ($scope,$el,$attr) {

            $el.on("click",function (e) {
                //debugger;
                var adress = $fonks.findLeftBottomLayerBoxLayer($leftmenujson.jsonData,$attr.click);
                var data =  $leftmenujson.jsonData.layerBox[parseInt(adress.layers)].layers[parseInt(adress.layer)];
                var opacity = data.opacity;
                var show = data.show;
                var id = data.id;
                if(show==false){
                    $leftmenujson.jsonData.layerBox[parseInt(adress.layers)].layers[parseInt(adress.layer)].show=true;
                    $leftmenujson.jsonData.lastActive = id;
                    $rootScope.mevcutHarita.remove();
                    $leafletFonk.showMap(id);


                }else{
                    $leftmenujson.jsonData.layerBox[parseInt(adress.layers)].layers[parseInt(adress.layer)].show=false;
                }


                $rootScope.bass = parseFloat(opacity)*100;
                $el.attr("click",$rootScope.bass);
                $el.toggleClass("borderFabdial_active");
                $rootScope.$broadcast("opacitySliderSetValue",$rootScope.bass);

            })
        }
    }

});