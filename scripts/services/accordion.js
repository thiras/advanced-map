app.service("$accordion",function () {



var json={
    menu1:{
        label:"Adres Bul",
        fonk:"menu",
        submenu:{
            menu1e1:{
                label:"İlçe, Mahalle, Yol ve Kapı Numarası Seçerek",
                fonk:"menu"
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
        submenu:{
            menu2e1:{
                label:"Menü 2-1",
                fonk:"parselmenu1"
            },
            menu2e2:{
                label:"Menü 2-2",
                fonk:"menu"
            }
        }
    },
    menu3:{
        label:"Ulaşım Hatları",
        fonk:"menu",
        submenu:{
            menu3e1:{
                label:"Menü 3-1",
                fonk:"menu"
            },
            menu3e2:{
                label:"Menü 3-2",
                fonk:"menu"
            },
            menu3e3:{
                label:"Menü 3-3",
                fonk:"menu"
            },
            menu4e3:{
                label:"Menü 3-4",
                fonk:"menu"
            }
        }
    },
    menu4:{
        label:"Taksi Durakları",
        fonk:"menu",
        submenu:false
    },
    menu5: {
        label: "Önemli Merkezler",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },

    menu6: {
        label: "Tescilli yapı",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu7: {
        label: "İnşaat Ruhsatı",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu8: {
        label: "Otel ve Restaurantlar",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu9: {
        label: "Sağlık Kurumları",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu10: {
        label: "Güvenlik Merkezleri",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu11: {
        label: "Kent Analizleri",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu12: {
        label: "Kent Analizleri",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu13: {
        label: "Güzergah Oluşturma",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu14: {
        label: "Uzunluk ölçümü",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu15: {
        label: "Alan ölçümü",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },

    menu16: {
        label: "Yardım",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menu"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menu"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menu"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menu"
            }
        }
    },
    menu17: {
        label: "İletişim",
        fonk: "menu",
        submenu: {
            menu3e1: {
                label: "Menü 3-1",
                fonk: "menuContact"
            },
            menu3e2: {
                label: "Menü 3-2",
                fonk: "menuContact"
            },
            menu3e3: {
                label: "Menü 3-3",
                fonk: "menuContact"
            },
            menu4e3: {
                label: "Menü 3-4",
                fonk: "menuContact"
            }
        }
    },
}


return json;
});