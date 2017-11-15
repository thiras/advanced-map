app.service("$searchbox", function ($rootScope,$googleMaps,$interval) {
    var tis = this;
    this.searchText = "";
    this.resultSearch = [];
    this.resutlInterval = [];
    this.showInterval = [];
    this.selectResult = {value:"",text:"",lat:0,lng:0};
    this.searchMarker = false;
    this.search=function (text,show) {

        this.searchText=text;
        var status = false;
        if(show==true){
            if(typeof text !== "undefined"){
                for(a in this.resultSearch){
                    if(text==this.resultSearch[a].text){
                        $googleMaps.resultFindPlaceID=false;
                        $googleMaps.findPlaceId(this.resultSearch[a].value);
                    }
                    this.showInterval[this.showInterval.length]=$interval(function () {
                        if($googleMaps.resultFindPlaceID!==false){
                            debugger;
                            var son = $googleMaps.resultFindPlaceID;
                            var adress = son.formatted_address;
                            var enlem = son.geometry.location.lat();
                            var boylam = son.geometry.location.lng();
                            var latlng = L.latLng(enlem,boylam);
                            if(tis.searchMarker==false){
                                tis.searchMarker=L.marker(latlng).bindPopup(tis.selectResult.text+'<br>'+adress+'<br>Enlem : '+enlem+'<br>Boylam : '+boylam).addTo($rootScope.leaflet);
                                $rootScope.leaflet.flyTo(latlng,15);
                            }else{
                                tis.searchMarker.setLatLng(latlng);
                                tis.searchMarker.setPopupContent(tis.selectResult.text+'<br>'+adress+'<br>Enlem : '+enlem+'<br>Boylam : '+boylam);
                                $rootScope.leaflet.flyTo(latlng,15);
                            }
                            removeInmterval(tis.showInterval);
                        }
                    },100);

                }
            }
        }else{
            if(typeof text == "undefined"){
                if(this.searchMarker!==false){
                    this.searchMarker.remove();
                    this.searchMarker=false;
                    status=false;
                }
            }else{
                if(text.indexOf(',')!==-1){
                    var parca = text.split(',');
                    if(parca.length==2){
                        var en = parca[0];
                        var boy = parca[1];
                        en=parseFloat(en);
                        boy=parseFloat(boy);
                        if(en<=90 && en>=-90 && boy>=-180 && boy<=180){
                            this.selectResult = {value:text,text:"Girdiğiniz Konum :"+text,lat:en,lng:boy};
                            var latlng = L.latLng(this.selectResult.lat,this.selectResult.lng);
                            if(this.searchMarker==false){
                                this.searchMarker=L.marker(latlng).bindPopup(this.selectResult.text).addTo($rootScope.leaflet);
                                $rootScope.leaflet.flyTo(latlng,15);
                            }else{
                                this.searchMarker.setLatLng(latlng);
                                this.searchMarker.setPopupContent(this.selectResult.text);
                                $rootScope.leaflet.flyTo(latlng,15);
                            }
                            status=false;
                        }else{
                            $googleMaps.autocomplete(text);
                            status=true;
                        }
                    }else{
                        $googleMaps.autocomplete(text);
                        status=true;
                    }
                }else{
                    $googleMaps.autocomplete(text);
                    status=true;
                }
            }
        }

        if(status==true){
            this.resutlInterval[this.resutlInterval.length]=$interval(function () {
                if($googleMaps.autoCompleteResult.length>0){
                    var datalist = angular.element(document.getElementById('searchReasult'));
                    datalist.html('');
                    tis.resultSearch=[];
                    if($googleMaps.autoCompleteResult.length>0){
                        var sonuc = $googleMaps.autoCompleteResult;
                        for(i in sonuc){
                            tis.resultSearch.push({value:sonuc[i].value,text:sonuc[i].text});
                            datalist.append('<option value="'+sonuc[i].text+'" data-placeid="'+sonuc[i].value+'">'+sonuc[i].text+'</option>');
                        }
                    }
                    removeInmterval(tis.resutlInterval);
                }
            },100);
        }


    };

    function removeInmterval(dizi) {
        for(i in dizi){
            $interval.cancel(dizi[i]);
        }
    }

    return this;
});