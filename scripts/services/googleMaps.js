app.service("$googleMaps", function ($rootScope) {

    var tis = this;

    this.center = new google.maps.LatLng(-33.8665433,151.1956316);

    this.zoom = 15,

    this.map =new google.maps.Map(document.getElementById('googleMap'), {
            center: this.center,
            zoom: this.zoom
    });

    this.service = new google.maps.places.PlacesService(this.map);

    this.textSearch = function(request){
        tis.service = new google.maps.places.PlacesService(map);
        tis.service.textSearch(request, textCallback);
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