app.service("$markers", function ($rootScope) {
    var tis = this;
    var a1 = {
        is:[50, 50],
        ia:[24, 49],
        pa:[0, -45],
        p:"img/markers/"
    };
    var a2 = {
        is:[35, 35],
        ia:[17, 34],
        pa:[0, -35],
        p:"img/markers/"
    };
    this.markers= {
        mall:{
           iconUrl: a1.p+'mall.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        security:{
           iconUrl: a1.p+'security.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        store:{
           iconUrl: a1.p+'askeri.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        religion:{
           iconUrl: a1.p+'religion.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        pharmacy:{
           iconUrl: a1.p+'pharmacy.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        pharmacyA:{
           iconUrl: a1.p+'pharmacyActive.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        education:{
           iconUrl: a1.p+'education.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        clothing:{
           iconUrl: a1.p+'clothing.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        hospital:{
           iconUrl: a1.p+'hospital.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        hotel:{
           iconUrl: a1.p+'hotel.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        restaurant:{
           iconUrl: a1.p+'restaurant.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        government:{
           iconUrl: a1.p+'government.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        spor:{
           iconUrl: a1.p+'spor.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        tourist:{
           iconUrl: a1.p+'tourist.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        tram:{
           iconUrl: a1.p+'tram.svg',
           iconSize: a1.is,
           iconAnchor: a1.ia,
           popupAnchor: a1.pa,
       },
        taxi:{
            iconUrl: a2.p+'taxi.svg',
            iconSize: a2.is,
            iconAnchor: a2.ia,
            popupAnchor: a2.pa,
        }
    };
    this.shadow = {
        shadowUrl: a1.p+'marker-shadow.png',
        shadowSize: [60, 95],
        shadowAnchor: [22, 94]
    };
    this.getMarker = function (name,obj) {
        if(obj==true){
            obj=tis.shadow;
        }
        for(i in obj){
            tis.markers[name][i]=obj[i];
        }
      return L.icon(tis.markers[name]);
    };

    return this;
});