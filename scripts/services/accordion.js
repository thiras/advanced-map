app.service("$accordion",function ($rootScope) {


var lang = $rootScope.lang;
var json={
    menu1:{
        label:lang.menu.menu1.label,
        fonk:"menu",
        icon:"home",
        submenu:{
            menu1e1:{
                label:lang.menu.menu1.menu1e1,
                fonk:"findAdressPanel"
            },
            menu1e2:{
                label:"Harita Üzerinde Tıklayarak ",
                fonk:"menu"
            }
        }
    },
    menu2:{
        label:"Parsel bul",
        fonk:"menu",
        icon:"dashboard",
        submenu:{
            menu2e1:{
                label:"Adresten Ada Parsell Bilgisi İle Bul",
                fonk:"findParcellPanel"
            },
            menu2e2:{
                label:"Bulunduğunuz Noktanın Ada Parsel Bilgileri",
                fonk:"findParcelWithLocation"
            }
        }
    },
    menu3:{
        label:"Ulaşım Hat ve Kalkış Bilgileri",
        fonk:"menu",
        icon:"directions bus",
        submenu:{
            menu3e1:{
                label:"Otobüs & Minibüs",
                fonk:"findBusDialog"
            },
            menu3e2:{
                label:"Metro,Tren & Tramvay",
                fonk:"findTrainDialog"
            },
            menu3e3:{
                label:"Vapur & Feribot",
                fonk:"findShipDialog"
            },
            menu3e4:{
                label:"Uçak & Hava Taşıtları",
                fonk:"findAircraftDialog"
            }
        }
    },
    pharmacy:{
        label:"Ezcane",
        fonk:"menu",
        icon:"dashboard",
        submenu:{
            menu2e1:{
                label:"Adresten Eczane Bul",
                fonk:"findPharmacyAtAdress"
            },
            menu2e2:{
                label:"En Yakın Eczaneyi Bul",
                fonk:"findNearestPharmacy"
            },
            menu2e3:{
                label:"En Yakın Nöbetçi Eczaneyi Bul",
                fonk:"findNearestSentinelPharmacy"
            }
        }
    },
    menu4:{
        label:"Taksi Durakları",
        fonk:"menu",
        icon:"local_taxi",
        submenu:{
            menu4e1:{
                label:"Adreste ki Taksi Durağını Bul",
                fonk:"findTaxiAtAdress"
            },
            menu4e2:{
                label:"En Yakın Taksi Durağını Bul",
                fonk:"findTaxiAtLocation"
            }
    }},

    menu6: {
        label: "Tescilli yapı",
        fonk: "menu",
        icon:"account_balance",
        submenu:false
    },
    menu7: {
        label: "İnşaat Ruhsatı",
        fonk: "menu",
        icon:"location_city",
        submenu: false
    },
    menu5: {
        label: "Önemli Merkezler ve POI Noktaları",
        fonk: "menu",
        icon:"location_on",
        submenu: {
            menu3e0: {
                label: "En Yakınımda Neler Var?",
                fonk: "menu"
            },
            menu3e1: {
                label: "Türüne Göre POI Noktaları Bul",
                fonk: "menu"
            },
            menu3e2: {
                label: "Alan Çizerek POI Noktaları Bul",
                fonk: "menu"
            },
            menu3e3: {
                label: "Adres Belirterek POI Noktaları Bul",
                fonk: "menu"
            }
        }
    },
    menu9: {
        label: "Sağlık Kurumları",
        fonk: "menu",
        icon:"local_florist",
        submenu: {
            menu3e1: {
                label: "Aile Hekimini Bul",
                fonk: "findMyDoctor"
            },
            menu3e2: {
                label: "Adresten Hastane Bul",
                fonk: "findHospital"
            },
            menu3e3: {
                label: "En Yakın Sağlık Ocağını Bul",
                fonk: "findNearPoliclinic"
            },
            menu4e3: {
                label: "En Yakın Hastaneyi Bul",
                fonk: "findNearHospital"
            }
        }
    },
    menu10: {
        label: "Güvenlik Merkezleri",
        fonk: "menu",
        icon:"security",
        submenu: {
            menu3e1: {
                label: "Adreste ki Polis Karakolu",
                fonk: "menu"
            },
            menu3e2: {
                label: "En Yakın Polis Karakolu",
                fonk: "menu"
            },
            menu3e3: {
                label: "Adreste ki Askeri Merkez",
                fonk: "menu"
            },
            menu4e3: {
                label: "En Yakın Askeri Merkez",
                fonk: "menu"
            }
        }
    },
    menu12: {
        label: "Güzergah Oluşturma",
        fonk: "menu",
        icon:"navigation",
        submenu: {
            menu3e1: {
                label: "Adres Belirterek Güzergah Oluştur",
                fonk: "openNavigationByAdress"
            },
            menu3e2: {
                label: "Haritayı İşaretleyerek Güzergah Oluşur",
                fonk: "openNavigationByMarker"
            }
        }
    },
    menu13: {
        label: "Uzunluk ölçümü",
        fonk: "menu",
        icon:"timeline",
        submenu: {
            menu3e1: {
                label: "Haritada Çizerek Uzunluk Ölç",
                fonk: "openDrawRulerByMouse"
            },
            menu3e2: {
                label: "El ile Nokta Girerek Uzunluk Ölç",
                fonk: "openDrawRulerByManuel"
            }
        }
    },
    menu15: {
        label: "Alan ölçümü",
        fonk: "menu",
        icon:"view_agenda",
        submenu: {
            menu3e1: {
                label: "Çizerek Alan Ölç",
                fonk: "openDrawAreaByMouse"
            },
            menu3e2: {
                label: "El ile Nokta Girerek Alan Bul",
                fonk: "openDrawAreaByManuel"
            }
        }
    },

    menu16: {
        label: "Yardım",
        fonk: "menu",
        icon:"help",
        submenu: {
            menu3e1: {
                label: "Siteyi Nasıl Kullanırım ?",
                fonk: "openHelpUsingApp"
            },
            menu3e2: {
                label: "Sıkça Sorulan Sorular",
                fonk: "openHelpSSS"
            }
        }
    },
    menu17: {
        label: "İletişim",
        fonk: "menu",
        icon:"contact_phone",
        submenu: {
            menu3e1: {
                label: "Adres ve Telefon Bilgileri",
                fonk: "openContactAdressPhone"
            },
            menu3e2: {
                label: "Bize Yazın",
                fonk: "openContactWriteUs"
            },
            menu3e3: {
                label: "Destek Talebi Oluşturun",
                fonk: "openContactSupport"
            }
        }
    },
};


return json;
});