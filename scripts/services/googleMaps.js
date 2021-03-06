app.service("$googleMaps", function ($rootScope) {

    var tis = this;



    this.center = new google.maps.LatLng(-33.8665433,151.1956316);

    this.status = false;
    this.result = false;

    this.point = function(lat,lng){
        return new google.maps.LatLng(lat,lng);
    };

    this.zoom = 15,

    this.map = new google.maps.Map(document.getElementById('googleMap'), {
            center: this.center,
            zoom: this.zoom
    });

    this.service = new google.maps.places.PlacesService(this.map);

    this.search = function(request,type){
        // openNow:true,false -> arama yapılan saatte açık olan işletmeleri bulur
        // minPriceLevel ve maxPriceLevel 0 - 4 e fiyat pahalılığına göre aramayı kısıtlar
        // bounds aramayı belli bir bounds aralığında yapar
        // location ile aramayı bir noktada yapar
        // radius ile location kullanılarak arama yapılır max 50000m dir
        // type burada categori belirtebiliriz
        this.status = false;
        this.result = [];
        this.service = new google.maps.places.PlacesService(this.map);
        if(type=="text"){
            this.service.textSearch(request, tis.serviceCallBack);
        }
        if(type=="nearBy"){
            this.service.nearbySearch(request, tis.serviceCallBack);
        }
        if(type=="radar"){
            this.service.radarSearch(request, tis.serviceCallBack);
        }


    };

    this.autocomplete = function (text) {
        var options = {input:text,language:$rootScope.browserLanguage};
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions(options, this.callBackPlaces);
    };
    this.autoCompleteResult = [];
    this.callBackPlaces = function (predictions, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            tis.autoCompleteResult= [];
            for(i in predictions){
                var res = predictions[i];
                var text = res.description;
                var value = res.place_id;
                tis.autoCompleteResult.push({value:value,text:text});
            }
        }
    };
    this.geocoder = new google.maps.Geocoder;
    this.resultFindPlaceID = false;
    this.findPlaceId = function (placeId) {
        this.geocoder.geocode({'placeId': placeId}, function(results, status) {
            tis.resultFindPlaceID = false;
            if (status == 'OK') {
                tis.resultFindPlaceID = results[0];
            }
        });
    };


    this.serviceCallBack = function(results,status){

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var places = [];
            for (var i = 0; i < results.length; i++) {
                places.push(results[i]);
            }
            tis.status=true;
            tis.result=places;
        }
    };

    this.directionsService = new google.maps.DirectionsService;

    this.directionResult = false;

    this.directionsShow = function (start,finish,waypoint,type) {
        type =type || 'DRIVING';
        this.directionsService.route({
            origin: start,
            destination: finish,
            waypoints: waypoint,
            language:"tr",
            unitSystem:google.maps.UnitSystem.METRIC,
            optimizeWaypoints: true,
            provideRouteAlternatives:true,
            travelMode: type
        }, function(response, status) {
            var a = response;
            if(status=="OK"){
                tis.directionResult = response;
            }else{
                tis.directionResult = false;
            }


        });
    };

    return this;
});