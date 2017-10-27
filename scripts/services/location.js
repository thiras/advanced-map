app.service("$location", function ($rootScope,controller) {
    var tis = this;

    this.location = false;
    
    this.setLocation = function (lat,lng) {
        tis.location={lat:parseFloat(lat),lng:parseFloat(lng)};
    };
    function showPosition(position) {
        tis.setLocation(position.coords.latitude,position.coords.longitude);
    }
    this.getLocation = function() {
      return tis.location;
    };
    
    this.findMyLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $rootScope.$emit("message", {
                status: "warning",
                header: "Malesef Konum Bilginiz Alınamıyor",
                content: "Konum bilginizin alınamadığı tespit edilmiştir. Lütfen Browser izinlerinizi açık tutunuz",
                time: "auto"
            });
        }
        return tis.getLocation();
    };
    
    return this;
});