app.service("$mylocation", function ($rootScope,$interval,$window) {
    var tis = this;
    this.location = false;
    this.feature = false;
    this.position = false;
    this.options = {radius:500,loop:true,panto:false,flyto:true,show:true,time:1000};
    this.loopInterval=[];
    this.zonePoint = false;
    this.semiCircle = false;
    this.request = 0;
    this.pathLine = [];
    this.pathLineFeature = false;
    this.snapPath = [];

    this.semiCircleDraw = function (latlng,obj) {
        if(this.semiCircle!==false){
            this.semiCircle.remove();
        }
        this.semiCircle = L.semiCircleMarker(latlng, {
            radius:obj.radius,
            startAngle:obj.startAngle,
            stopAngle:obj.stopAngle,
            weight:obj.weight,
            fillColor:obj.fillColor,
            color:obj.color
        });
        return this.semiCircle;
    };

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
        this.hiddenLocation();
        this.pathLine=[];
        this.setOptions(options);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
            if(this.options.loop !==null && this.options.loop==true){
               this.loopInterval[this.loopInterval.length] = $interval(function () {
                   if(tis.options.loop==true){
                       tis.loopLocation();
                   }
               },this.options.time);
            }else{
                if(this.loopInterval.length>0){
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

    this.nearLineLimit=function(position) {
        var now ={lat:position.coords.latitude,lng:position.coords.longitude};

        if(this.pathLine.length>0){
            var last = this.pathLine[this.pathLine.length-1];
            var distance = $rootScope.leaflet.distance(last,now);
            if(distance>5){
                this.pathLine.push(now);
            }
        }else{
            this.pathLine.push(now);
        }
    };

    function getPosition(position) {
        tis.position=position;
        tis.setLocation(position.coords.latitude,position.coords.longitude);
        tis.nearLineLimit(position);
    }
    
    this.setLocation = function (lat,lng) {
        if(this.options.snap==true && this.options.path.length>0){
            var line = turf.lineString(this.options.path);
            var pt = turf.point([parseFloat(lng),parseFloat(lat)]);
            var snapped = turf.nearestPointOnLine(line, pt, {units: 'kilometers'});
            snapped=snapped.geometry.coordinates;
            this.location={lat:parseFloat(snapped[1]),lng:parseFloat(snapped[0])};

        }else{
            this.location={lat:parseFloat(lat),lng:parseFloat(lng)};
        }
        $rootScope.location.myLocation = tis.location;
        if(this.options.show){
            this.showLocation();
        }
    };

    this.hiddenLocation=function(){
        if(this.feature!==false){
            this.feature.remove();
            this.feature=false;
        }
        if(this.zonePoint!==false){
            this.zonePoint.remove();
            this.zonePoint=false;
        }
        if(this.semiCircle!==false){
            this.semiCircle.remove();
            this.semiCircle=false;
            this.semiCircleActive=false;
        }
        if(this.pathLineFeature!==false){
            this.pathLineFeature.remove();
            this.pathLineFeature=false;
            this.pathLine=[];
        }
        this.removeInterval();
        this.options.loop=false;
    };

    this.removeInterval = function () {
        for(i in this.loopInterval){
            $interval.cancel(this.loopInterval[i]);
        }
        this.loopInterval=[];
    };

    this.showLocation = function () {
        var latlng = L.latLng(this.location.lat,this.location.lng);
        var pos = this.position;
        this.request++;
        if(this.feature==false){
            this.feature = L.circle(latlng,{radius:20});
            this.zonePoint = L.circleMarker(latlng,{radius:3,color:this.options.color,fillOpacity:1});

            this.feature.addTo($rootScope.leaflet);
            this.zonePoint.addTo($rootScope.leaflet);
            if(this.options.semiCircle==true && typeof this.options.semiCircle!=="undefined" && this.semiCircleActive==false){

                this.semiCircleActive=true;
                this.semiCircle=this.semiCircleDraw(latlng, {
                    radius:50,
                    startAngle: -60,
                    stopAngle: 60,
                    weight:2,
                    fillColor:this.options.color,
                    color:"#999"
                });
                this.semiCircle.addTo($rootScope.leaflet);
            }

            if(this.options.flyto==true){
                $rootScope.leaflet.setView(latlng,16);
            }
        }else{
            this.feature.setLatLng(latlng);
            this.zonePoint.setLatLng(latlng);
            if(this.options.semiCircle==true && typeof this.options.semiCircle!=="undefined" && this.semiCircleActive==true){
                this.semiCircle.setLatLng(latlng);
            }
            this.options.flyto=false;
            if(this.pathLine.length>1 && this.options.line==true){
                this.showPathLine();
            }
        }
        if(this.feature!==false && this.options.panto==true && this.options.flyto == false && this.request>3){
            if(this.options.panto==true){
                $rootScope.leaflet.panTo(latlng);
            }
        }

        if(this.options.color!==null){
            this.feature.setStyle({color:this.options.color});
            this.zonePoint.setStyle({color:this.options.color});
        }

        if(this.options.radius!==null){
            if(this.options.radius=="auto"){

                var r = 250;
                if(this.position.coords.accuracy<250){
                    r = this.position.coords.accuracy;
                }
                this.feature.setRadius(parseInt(r));
            }else{
                this.feature.setRadius(parseInt(this.options.radius));
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

    this.showPathLine = function () {
        if(this.pathLineFeature==false){
            this.pathLineFeature = L.polyline(this.pathLine, {color: this.options.color,weight:5}).addTo($rootScope.leaflet);
        }else{
            this.pathLineFeature.setLatLngs(this.pathLine);
        }

    };
    this.semiCircleActive = false;



    this.setMobileAngle = function (angles) {
        var gamma = angles.gamma || 0;
        var beta = angles.beta || 0;
        var alpha = angles.alpha || 0;
        this.semiCircleRedraw(alpha);
    };

    this.semiCircleRedraw = function (alpha) {
        if(typeof this.options.semiCircle !=="undefined" && this.options.semiCircle==true){
            var aci = parseInt(alpha);
            aci = 360 - aci + 180;
            var start = aci - 60;
            var finish = start + 120;
            this.semiCircle = tis.semiCircleDraw(tis.location, {
                radius: 50,
                startAngle: start,
                stopAngle: finish,
                weight: 2,
                fillColor: tis.options.color,
                color: "#999"
            });
            this.semiCircle.addTo($rootScope.leaflet);
        }
    };







    
    return this;
});