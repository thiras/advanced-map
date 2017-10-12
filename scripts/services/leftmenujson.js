app.service("$leftmenujson", function ($http, $rootScope) {


    this.jsonData = {
        label: "Harita ve Analizler",
        lastActive: "freeGoogleStreet",
        showLayer: ["basemap", "uydu2012", "analizHeatmap"],
        layerBox: [
            {
                id: "base", label: "BaseMap Haritalar", img: "img/icons/map.svg", active: false, layers: [
                {id: "basemap", label: "BaseMap", opacity: 0.5, active: true, show: false, img: "img/icons/map.svg"},
                {
                    id: "gecebasmap",
                    label: "Gece Haritası",
                    opacity: 0.2,
                    active: true,
                    show: false,
                    img: "http://data.pixiz.com/output/user/frame/preview/400x400/9/4/5/2/2532549_04ed8.jpg"
                }
            ]
            }
            , {
                id: "uydu", label: "Uygu Görüntüleri", img: "img/icons/map.svg", active: false, layers: [
                    {
                        id: "uydu2012",
                        label: "2012 Uydu Görüntüleri",
                        opacity: 0.6,
                        active: true,
                        show: false,
                        img: "img/icons/map.svg",
                        "border": false
                    },
                    {
                        id: "uydu2015",
                        label: "2015 Uydu Görüntüleri",
                        opacity: 0.75,
                        active: true,
                        show: false,
                        img: "img/icons/map.svg"
                    },
                    {
                        id: "uydu2017",
                        label: "2017 Uydu Görüntüleri",
                        opacity: 0.85,
                        active: true,
                        show: false,
                        img: "img/icons/map.svg"
                    }
                ]
            }
            , {
                id: "analiz", label: "Analizler", img: "img/icons/map.svg", active: false, layers: [
                    {
                        id: "analizHeatmap",
                        label: "Heatmap Analizi",
                        opacity: 0.95,
                        active: true,
                        show: false,
                        img: "img/icons/map.svg"
                    },
                    {
                        id: "analizNufus",
                        label: "Nufus Analizi",
                        opacity: 1,
                        active: true,
                        show: false,
                        img: "img/icons/map.svg",
                        color: "red"
                    },
                    {
                        id: "analizTrafik",
                        label: "Trafik Analizi",
                        opacity: 0,
                        active: false,
                        show: false,
                        img: "img/icons/map.svg"
                    }
                ]
            }
            , {
                id: "freeMap", label: "Ücretsiz Haritalar", img: "img/icons/map.svg", active: true, layers: [
                    {
                        id: "freeGoogleStreet",
                        label: "Google Sokak Haritası",
                        opacity: 1,
                        active: true,
                        show: false,
                        img: "img/basemapIcons/googlestreet.png",
                        leafletMap : {
                            method:"freeWMS",
                            url:"http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                            attribution:{
                                tr:"Balista Bilişim Yazılım A.Ş.",
                                en:"Balista Informatics Software Inc"
                            },
                            maxZoom: 20,
                            subdomains:['mt0','mt1','mt2','mt3']
                        }
                    },
                    {
                        id: "freeGoogleHybrid",
                        label: "Google Uydu Haritası",
                        opacity: 1,
                        active: true,
                        show: false,
                        img: "img/basemapIcons/hybrid.png",
                        leafletMap : {
                            method:"freeWMS",
                            url:"http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
                            attribution:{
                                tr:"Balista Bilişim Yazılım A.Ş.",
                                en:"Balista Informatics Software Inc"
                            },
                            maxZoom: 20,
                            subdomains:['mt0','mt1','mt2','mt3']
                        }
                    },
                    {
                        id: "freeGoogleTerrain",
                        label: "Google Yükseklik Haritası",
                        opacity: 1,
                        active: true,
                        show: false,
                        img: "img/basemapIcons/terrain.png",
                        leafletMap : {
                            method:"freeWMS",
                            url:"http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
                            attribution:{
                                tr:"Balista Bilişim Yazılım A.Ş.",
                                en:"Balista Informatics Software Inc"
                            },
                            maxZoom: 20,
                            subdomains:['mt0','mt1','mt2','mt3']
                        }
                    },
                    {
                        id: "freeNightMap",
                        label: "Gece Haritası",
                        opacity: 1,
                        active: true,
                        show: false,
                        img: "img/basemapIcons/gece.png",
                        leafletMap : {
                            method:"freeWMS",
                            url:"http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                            attribution:{
                                tr:"Balista Bilişim Yazılım A.Ş.",
                                en:"Balista Informatics Software Inc"
                            },
                            maxZoom: 19,
                            subdomains: 'abcd'
                        }
                    },
                    {
                        id: "freeOpenStreetMap",
                        label: "Open Street Maps Haritası",
                        opacity: 1,
                        active: true,
                        show: false,
                        img: "img/basemapIcons/osm.png",
                        leafletMap : {
                            method:"freeWMS",
                            url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            attribution:{
                                tr:"Balista Bilişim Yazılım A.Ş.",
                                en:"Balista Informatics Software Inc"
                            },
                            maxZoom: 19
                        }
                    }
                ]
            }
        ]
    };


    return this;

});