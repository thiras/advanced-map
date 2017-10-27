app.service("$googleMaps", function ($rootScope) {

    var tis = this;



    this.center = new google.maps.LatLng(-33.8665433,151.1956316);

    this.point = function(lat,lng){
        return new google.maps.LatLng(lat,lng);
    };

    this.zoom = 15,

    this.map = new google.maps.Map(document.getElementById('googleMap'), {
            center: this.center,
            zoom: this.zoom
    });

    this.service = new google.maps.places.PlacesService(this.map);

    this.textSearch = function(request){
        var r = tis.request(request.latlng,request.text,request.radius);
        tis.service = new google.maps.places.PlacesService(tis.map);
        tis.service.textSearch(r, tis.textCallback);
    };

    this.request = function (latlng,text,radius){
        var point = tis.point(latlng[0],latlng[1]);
        text = text ||  "alsancak";
        radius = radius || '50000';
        var r = {
            location: point,
            radius: '50000',
            query: text
        };
        return r;
    };

    this.textCallback = function(results,status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                console.log(place);
            }
        }
    };

    return this;
});