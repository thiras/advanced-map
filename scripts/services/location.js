app.service("$mylocation", function ($rootScope) {
    var tis = this;
    this.location = false;
    this.feature = false;
    this.position = false;
    this.options = {radius:500,loop:true,panto:false,flyto:true,show:true,time:1000};
    this.loopInterval=false;
    this.request = 0;

    this.setOptions = function (options) {
      for(i in options){
          if(options[i]!==null){
             this.options[i]= options[i];
          }
      }
    };

    this.setRadius = function (a) {
      a=parseInt(a);
        this.options.radius=a;
      if(this.feature!==false){
          this.feature.setRadius(a);
      }
    };

    this.findMyLocation = function (options) {
        this.setOptions(options);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
            if(this.options.loop !==null && this.options.loop==true){
               this.loopInterval = setInterval(function () {
                   if(tis.options.loop==true){
                       tis.loopLocation();
                   }
               },this.options.time)
            }else{
                if(this.loopInterval!==false){
                    this.removeInterval();
                }
            }

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

    function getPosition(position) {
        tis.position=position;
        tis.setLocation(position.coords.latitude,position.coords.longitude);
    }
    
    this.setLocation = function (lat,lng) {
        this.location={lat:parseFloat(lat),lng:parseFloat(lng)};
        $rootScope.location.myLocation = tis.location;
        if(this.options.show){
            this.showLocation();
        }
    };

    this.hiddenLocation=function(){
        this.feature.remove();
        this.feature=false;
        this.removeInterval();
        this.options.loop=false;

    };

    this.removeInterval = function () {
        window.clearInterval(this.loopInterval);
        this.loopInterval=false;
    };

    this.showLocation = function () {
        var latlng = L.latLng(this.location.lat,this.location.lng);
        var pos = this.position;
        this.request++;
        if(this.feature==false){
            this.feature = L.circle(latlng,{radius:20});
            this.feature.addTo($rootScope.leaflet);
            if(this.options.flyto==true){
                $rootScope.leaflet.flyTo(latlng,16);
            }
        }else{
            this.feature.setLatLng(latlng);
            this.options.flyto=false;
            if(this.options.radius!==false){
                this.feature.setRadius(this.options.radius);
            }
        }
        if(this.feature!==false && this.options.panto==true && this.options.flyto == false && this.request>3){
            if(this.options.panto==true){
                $rootScope.leaflet.panTo(latlng);
            }
        }
    };

    this.getLocation = function() {
      return this.location;
    };

    this.loopLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);

        }
    };
    
    return this;
});