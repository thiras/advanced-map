app.factory("$fonks",function ($leftmenujson) {


    this.findLeftBottomLayerBoxLayer=function(jsonData,id) {
        var obj = jsonData;
        var layerBox = obj.layerBox;
        var sonuc = {layers:-1,layer:-1,data:false};
        for(i in layerBox){
            var layers = layerBox[i].layers;
            for(j in layers){
                var feature = layers[j];
                for(k in feature){
                    if(feature["id"]==id){
                        sonuc.layers=i;
                        sonuc.layer=j;
                    }
                }

            }
        }
        sonuc.data = $leftmenujson.jsonData.layerBox[parseInt(sonuc.layers)].layers[parseInt(sonuc.layer)];
        return sonuc;
    };


    return this;

});