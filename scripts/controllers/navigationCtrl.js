app.controller("navigationCtrl", function ($scope,$rootScope,$mylocation,$googleMaps,$leafletFonk,$timeout,$timeout,$interval,$mdToast) {

    $scope.feature = {
        start:false,
        waypoint:[],
        finish:false
    };
    $scope.removeAllFeature = function (durum) {
        debugger;
        if(durum=="start" || durum=="all"){
            if($scope.feature.start!==false){
                $scope.feature.start.remove();
                $scope.feature.start = false;
            }
        }

        if(durum=="finish" || durum=="all"){
            if($scope.feature.finish!==false){
                $scope.feature.finish.remove();
                $scope.feature.finish = false;
            }
        }

        if(durum=="waypoint" || durum=="all"){
            if($scope.feature.waypoint.length>0){
                for(i in $scope.feature.waypoint){
                    if($scope.feature.waypoint[i]!==false){
                        $scope.feature.waypoint[i].remove();
                        $scope.feature.waypoint.splice(i,1);
                    }
                }
                $scope.feature.waypoint=[];
            }
        }
        if(durum!=="start" && durum!=="finish" && durum!=="waypoint"){
            durum=parseInt(durum);
            if($scope.feature.waypoint[durum]!==false){
                $scope.feature.waypoint[durum].remove();
                $scope.feature.waypoint.splice(durum,1);
            }
        }



    };

    $scope.navStations = {
        start:{status:false,placeResult:[],filterText:""},
        waypoint:[],
        finish:{status:false,placeResult:[],filterText:""}
    };

    $scope.placeResult= [];

    $scope.addResult=function (result,konum) {
        if(konum=="start" || konum=="finish"){
            if(konum=="start"){
                $scope.navStations.start.placeResult=result;
            }
            if(konum=="finish") {
                $scope.navStations.finish.placeResult=result;
            }
        }else{
            konum=parseInt(konum);
            $scope.navStations.waypoint[konum].placeResult=result;
        }
    };



    $scope.changeNavStations=function(bilgi,konum,filterText) {
        bilgi.placeResult=[filterText];
        bilgi.filterText=filterText.text;
        bilgi.time=Date.now();
        bilgi.status=true;
        bilgi.type='name';
        var poss={lat:bilgi.geometry.location.lat(),lng:bilgi.geometry.location.lng()};
        bilgi.location=poss;
        if(konum=="start" || konum=="finish"){
            if(konum=="start"){
                $scope.navStations.start =bilgi;
            }
            if(konum=="finish") {
                $scope.navStations.finish = bilgi;
            }
        }else{
            konum=parseInt(konum);
            $scope.navStations.waypoint[konum]=bilgi;
        }
        $scope.addMarker(konum,poss,"add");
        if($scope.navStations.start.status==true && $scope.navStations.finish.status==true){
            $scope.showRoads();
        }
    };


    $scope.loadGooglePlaces = function (filterText,konum) {
        $scope.selectGooglePlace(filterText,konum);
        $timeout(function () {
            $scope.addResult($googleMaps.autoCompleteResult,konum);
        },500);
        $scope.addResult($googleMaps.autoCompleteResult,konum);
    };


    $scope.selectGooglePlace = function (filterText,konum) {

        if(typeof filterText !=="undefined"){
            if(typeof filterText.value !=="undefined"){
                // bir yer seçmiş ise girer
                $googleMaps.findPlaceId(filterText.value);
                $timeout(function () {
                    $scope.changeNavStations($googleMaps.resultFindPlaceID,konum,filterText);
                },500);
            }else{

                if(filterText!==""){
                    //herangi bir şey yazmış ise girer
                    $googleMaps.autocomplete(filterText);
                }else{

                    $scope.removePath();
                    $scope.removeAllFeature(konum);
                    $scope.emptyStation(konum);
                    $googleMaps.directionResult=false;

                    if($scope.navStations.start.status==true && $scope.navStations.finish.status==true){
                        $scope.showRoads();
                    }

                }
            }
        }else{
            //herangi bir şey yazmamış ise girer

        }
    };

    $scope.emptyStation = function (konum,removing) {
        if(konum=="start" || konum=="finish"){
            if(konum=="start"){
                $scope.navStations.start={};
                $scope.navStations.start={status:false,placeResult:[{value:"",text:""}],filterText:""};
            }
            if(konum=="finish"){
                $scope.navStations.finish={};
                $scope.navStations.finish={status:false,placeResult:[{value:"",text:""}],filterText:""};
            }
        }else{
            if(konum!=="finish" && konum!=="start" ){
                konum=parseInt(konum);
                $scope.navStations.waypoint[konum]={};
                $scope.navStations.waypoint[konum]={status:false,placeResult:[{value:"",text:""}],filterText:""};

            }
        }



    };


    $scope.arrayPointCity = [];
    $scope.addCityToNavigation = function (a) {
        $scope.navStations.waypoint.push({status:false,placeResult:[],filterText:""});
        $scope.arrayPointCity=$scope.navStations.waypoint;
        $scope.feature.waypoint.push(false);
    };

    $scope.removeCityToNavigation = function (konum) {
        var dizi = [];
        konum=parseInt(konum);
        var i2=0;


        $scope.removePath();
        $scope.removeAllFeature(konum);
        $scope.emptyStation(konum);

        for(i in $scope.navStations.waypoint){
            i=parseInt(i);
            if(i!==konum){
                dizi[i2]=$scope.navStations.waypoint[i];
                i2++;
            }
        }

        $scope.navStations.waypoint=dizi;
        $googleMaps.directionResult=false;
        if($scope.navStations.start.status==true && $scope.navStations.finish.status==true){
            $scope.showRoads();
        }

    };


    $scope.locFindInterval = [];
    $scope.addLocationToNavigation = function (konum) {

        konum = konum || false;
        if(konum==false){
            $scope.activeInputName=''+$scope.activeInputName;
            if($scope.activeInputName!==false){
                konum=$scope.activeInputName;
            }
        }

        if(konum!==false){
        $rootScope.location.myLocation = $mylocation.findMyLocation({loop:true,show:true,panto:false,flyto:true});
        $scope.locFindInterval[$scope.locFindInterval.length]=$interval(function () {
            if($mylocation.location!==false){
                $scope.addLocationToInput($mylocation.location,konum);
                removeInterval($scope.locFindInterval);
            }
        });
        }else{
            $rootScope.$emit("message", {
                status: "warning",
                header: "Aktif Merkez Yok",
                content: "Lütfen A-B ve ya varsa ara noktalarınız arasında bir yeri aktif hale getiriniz.",
                time: "auto"
            });
        }
    };

    $scope.addLocationToInput = function (loc,konum) {
        if(konum!==false || konum!=="false"){
        var a = turf.round(loc.lat,6)+','+turf.round(loc.lng,6);
        var bilgi={};
        bilgi["placeResult"]=[{value:a,text:a}];
        bilgi["filterText"]=a;
        bilgi["type"]='location';
        bilgi["time"]=Date.now();
        bilgi["status"]=true;
        bilgi["location"]=loc;
        if(konum=="start" || konum=="finish"){
            if(konum=="start"){
                $scope.navStations.start =bilgi;
            }
            if(konum=="finish") {
                $scope.navStations.finish = bilgi;
            }
        }else{
            konum=parseInt(konum);
            $scope.navStations.waypoint[konum]=bilgi;
        }
        $scope.addMarker(konum,loc,"add");
            if($scope.navStations.start.status==true && $scope.navStations.finish.status==true){
                $scope.showRoads();
            }
        }else{
            $rootScope.$emit("message", {
                status: "warning",
                header: "Aktif Merkez Yok",
                content: "Lütfen A-B ve ya varsa ara noktalarınız arasında bir yeri aktif hale getiriniz.",
                time: "auto"
            });
        }
    };

    $scope.activeInputName = false;
    $scope.activeInput = function (konum) {
        if(konum=="start" || konum=="finish"){
            $scope.activeInputName=konum;
        }else{
            konum=parseInt(konum);
            $scope.activeInputName=konum;
        }
    };


    $scope.addMarkerToNavigation = function (konum) {
        konum = konum || false;
        if(konum==false){
            $scope.activeInputName=''+$scope.activeInputName;
            if($scope.activeInputName!==false){
                konum=$scope.activeInputName;
            }
        }

        if(konum!==false){
            var options = {
                draggable: true,
                snappable: true,
                snapDistance: 30,
                allowSelfIntersection: true,

            };
            $rootScope.leaflet.pm.enableDraw('Marker', options);
            $rootScope.leaflet.on('pm:create', function(e) {

                var latlng = e.layer._latlng;
                $rootScope.leaflet.pm.disableDraw('Marker');
                $scope.addLocationToInput(latlng,$scope.activeInputName);
                e.layer.remove();

            });

        }else{
            $rootScope.$emit("message", {
                status: "warning",
                header: "Aktif Merkez Yok",
                content: "Lütfen A-B ve ya varsa ara noktalarınız arasında bir yeri aktif hale getiriniz.",
                time: "auto"
            });
        }
    };


    $scope.addMarker=function (konum,pos,status) {

      if(konum == "start" || konum=="finish"){
          if($scope.feature[konum]==false){
              $scope.feature[konum]=L.marker(pos).addTo($rootScope.leaflet);
              //$rootScope.leaflet.panTo(pos);
          }else{
              if(status=="add"){
                  $scope.feature[konum].setLatLng(pos);
                  //$rootScope.leaflet.panTo(pos);
              }else{
                  $scope.feature[konum].remove();
                  $scope.feature[konum]=false;
              }
          }
      }else{
          konum=parseInt(konum);
          if($scope.feature.waypoint[konum]==false){
              $scope.feature.waypoint[konum]=L.marker(pos).addTo($rootScope.leaflet);
              //$rootScope.leaflet.panTo(pos);
          }else{
              if(status=="add"){
                  $scope.feature.waypoint[konum].setLatLng(pos);
                  //$rootScope.leaflet.panTo(pos);
              }else{
                  $scope.feature.waypoint[konum].remove();
                  $scope.feature.waypoint[konum]=false;
              }
          }
      }
    };

    $scope.showRoadsInterval = [];
    $scope.showRoads = function () {
        $googleMaps.directionResult=false;
        var a = $scope.navStations;
        var start = false;
        var finish = false;
        var waypoint = [];
        var waypoints = [];
        if($scope.navStations.start.status==true){
            start = $scope.navStations.start.location;
        }
        if($scope.navStations.finish.status==true){
            finish = $scope.navStations.finish.location;
        }
        if($scope.navStations.waypoint.length>0){
            for(i in $scope.navStations.waypoint){
                var nok = $scope.navStations.waypoint[i];
                if(nok.status==true){
                    waypoint.push(nok.location);
                }
            }
        }
        if(finish!==false && start!==false){
            start = start.lat+','+start.lng;
            finish = finish.lat+','+finish.lng;
            if(waypoint.length>0){
                var x = 0;
                for(a in waypoint){
                    waypoints.push({location:waypoint[a].lat+','+waypoint[a].lng,stopover:false});


                }
            }
            $googleMaps.directionsShow(start,finish,waypoints,'DRIVING');
            $scope.showRoadsInterval[$scope.showRoadsInterval.length] = $interval(function () {
                if($googleMaps.directionResult!==false){
                    var rota = $googleMaps.directionResult.routes;
                    $scope.showRoadsView(rota);
                    removeInterval($scope.showRoadsInterval);
                }
            },100);



        }else{
            if(finish==false){
                $rootScope.$emit("message", {
                    status: "warning",
                    header: "Bitiş Noktası Belli Değil",
                    content: "Lütfen Bitiş (B) Noktasının Tanımlamasını Yapınız",
                    time: "auto"
                });
            }
            if(start==false){
                $rootScope.$emit("message", {
                    status: "warning",
                    header: "Başlangıç Noktası Belli Değil",
                    content: "Lütfen Başlangıç (A) Noktasının Tanımlamasını Yapınız",
                    time: "auto"
                });
            }

        }
    };

    function googleLineToLeaflet(a) {
        var dizi = [];
        for(i in a){
            dizi.push({lat:a[i].lat(),lng:a[i].lng()});
        }
        return dizi;
    }

    $scope.path = [];

    $scope.removePath = function () {
        if($scope.path.length>0){
            for(i in $scope.path){
                $scope.path[i].remove();
            }
            $scope.path=[];
        }
    };

    $scope.way = {active:false,distance:0,duration:0,travelMode:"DRIVING"};

    $scope.showRoadsView = function (routing) {
        $scope.removePath();
        var yol = routing[0];
        var legs = yol.legs;
        var corner1 = L.latLng(yol.bounds.f.b,yol.bounds.b.b);
        var corner2 = L.latLng(yol.bounds.f.f,yol.bounds.b.f);
        var bounds = L.latLngBounds(corner1, corner2);

        for(i in legs){
            var leg = legs[i];
            var distance = leg.distance.text;
            var duration = leg.duration.text;
            var start_address = leg.start_address;
            var end_address = leg.end_address;
            var steps = leg.steps;
            if(legs.length){
                $scope.way = {active:true,distance:distance,duration:duration,travelMode:"DRIVING"};
            }
            for(j in steps){
                var step = steps[j];
                if(typeof step.lat_lngs !== "undefined"){

                    var latlngs = googleLineToLeaflet(step.lat_lngs);
                    var aramesafe = step.distance.text;
                    var arazaman = step.duration.text;
                    var bilgi = step.instructions;
                    var table = '<table class="table"><tr><th>Mesafe</th><td>'+aramesafe+'</td></tr><tr><th>Süre</th><td>'+arazaman+'</td></tr><tr><th>Talimat</th><td>'+bilgi+'</td></tr></table>';
                    var yolpolyline = L.polyline(latlngs, {color: '#00b3fd',weight:8}).bindPopup(table).addTo($rootScope.leaflet);
                    $scope.path.push(yolpolyline);

                }else{

                    var a = step;
                }
            }
        }
        $rootScope.leaflet.flyToBounds(bounds);

    };







    function removeInterval(a) {
        for(i in a){
            $interval.cancel(a[i]);
        }
    }



    $scope.cancel = function () {
        $mdToast.hide();
        $timeout(function () {
            angular.element(document.querySelector("#menus")).triggerHandler("click");
        }, 10);


    };

    /*araya şehir ekleme son*/


});
