app.service("$accordion", function ($rootScope) {


    var lang = $rootScope.lang;
    var json = {
        menu1: {
            label: lang.menu.menu1.label,
            fonk: "menu",
            icon: "home",
            submenu: {
                menu1e1: {
                    label: lang.menu.menu1.menu1e1,
                    fonk: "findAdressPanel"
                },
                menu1e2: {
                    label: lang.menu.menu1.menu1e2,
                    fonk: "menu"
                }
            }
        },
        menu2: {
            label: lang.menu.menu2.label,
            fonk: "menu",
            icon: "dashboard",
            submenu: {
                menu2e1: {
                    label: lang.menu.menu2.menu1e1,
                    fonk: "findParcellPanel"
                },
                menu2e2: {
                    label: lang.menu.menu2.menu1e2,
                    fonk: "findParcelWithLocation"
                }
            }
        },
        menu3: {
            label: lang.menu.menu3.label,
            fonk: "menu",
            icon: "directions bus",
            submenu: {
                menu3e1: {
                    label: lang.menu.menu3.menu1e1,
                    fonk: "findBusDialog"
                },
                menu3e2: {
                    label: lang.menu.menu3.menu1e2,
                    fonk: "findTrainDialog"
                },
                menu3e3: {
                    label: lang.menu.menu3.menu1e3,
                    fonk: "findShipDialog"
                },
                menu3e4: {
                    label: lang.menu.menu3.menu1e4,
                    fonk: "findAircraftDialog"
                }
            }
        },
        pharmacy: {
            label: lang.menu.menu4.label,
            fonk: "menu",
            icon: "dashboard",
            submenu: {
                menu2e1: {
                    label: lang.menu.menu4.menu1e1,
                    fonk: "findPharmacyAtAdress"
                },
                menu2e2: {
                    label: lang.menu.menu4.menu1e2,
                    fonk: "findNearestPharmacy"
                },
                menu2e3: {
                    label: lang.menu.menu4.menu1e3,
                    fonk: "findNearestSentinelPharmacy"
                }
            }
        },
        menu4: {
            label: lang.menu.menu5.label,
            fonk: "menu",
            icon: "local_taxi",
            submenu: {
                menu4e1: {
                    label: lang.menu.menu5.menu1e1,
                    fonk: "findTaxiAtAdress"
                },
                menu4e2: {
                    label: lang.menu.menu5.menu1e2,
                    fonk: "findTaxiAtLocation"
                }
            }
        },

        menu6: {
            label: lang.menu.menu6.label,
            fonk: "menu",
            icon: "account_balance",
            submenu: {

                menu1: {
                    label: lang.menu.menu6.menu1e1,
                    fonk: "findProprietary"
                },
                menu2: {
                    label: lang.menu.menu6.menu1e2,
                    fonk: "findProprietaryByCircle"
                }
            }
        },
        menu7: {
            label: lang.menu.menu7.label,
            fonk: "menu",
            icon: "location_city",
            submenu: {

                menu1: {
                    label: lang.menu.menu7.menu1e1,
                    fonk: "findBuildingLicence"
                }
            }
        },
        menu5: {
            label: lang.menu.menu9.label,
            fonk: "menu",
            icon: "location_on",
            submenu: {
                menu3e0: {
                    label: lang.menu.menu9.menu1e1,
                    fonk: "menu"
                },
                menu3e1: {
                    label: lang.menu.menu9.menu1e2,
                    fonk: "menu"
                },
                menu3e2: {
                    label: lang.menu.menu9.menu1e3,
                    fonk: "menu"
                },
                menu3e3: {
                    label: lang.menu.menu9.menu1e4,
                    fonk: "menu"
                }
            }
        },
        menu9: {
            label: lang.menu.menu10.label,
            fonk: "menu",
            icon: "local_florist",
            submenu: {
                menu5e4:{
                    label:lang.menu.menu10.menu1e5,
                    fonk:"findInstitutionsbyAddress"
                },
                menu3e1: {
                    label: lang.menu.menu10.menu1e1,
                    fonk: "findMyDoctor"
                },
                menu3e3: {
                    label: lang.menu.menu10.menu1e3,
                    fonk: "findNearPoliclinic"
                },
                menu4e3: {
                    label: lang.menu.menu10.menu1e4,
                    fonk: "findNearHospital"
                }
            }
        },
        menu10: {
            label: lang.menu.menu11.label,
            fonk: "menu",
            icon: "security",
            submenu: {
                menu5e3:{
                    label: lang.menu.menu11.menu1e5,
                    fonk: "findSecrtyByAdrs"

                },
                menu3e2: {
                    label: lang.menu.menu11.menu1e2,
                    fonk: "menu"
                },
                menu4e3: {
                    label: lang.menu.menu11.menu1e4,
                    fonk: "menu"
                }

            }
        },
        menu12: {
            label: lang.menu.menu12.label,
            fonk: "menu",
            icon: "navigation",
            submenu: {
                menu3e1: {
                    label: lang.menu.menu12.menu1e1,
                    fonk: "openNavigationByAdress"
                },
                menu3e2: {
                    label: lang.menu.menu12.menu1e2,
                    fonk: "openNavigationByMarker"
                }
            }
        },
        menu13: {
            label: lang.menu.menu13.label,
            fonk: "menu",
            icon: "timeline",
            submenu: {
                menu3e1: {
                    label: lang.menu.menu13.menu1e1,
                    fonk: "openDrawRulerByMouse"
                },
                menu3e2: {
                    label:lang.menu.menu13.menu1e2,
                    fonk: "openDrawRulerByManuel"
                },
                menu3e3: {
                    label: lang.menu.menu13.menu1e3,
                    fonk: "openDrawAreaByMouse"
                },
                menu3e4: {
                    label: lang.menu.menu13.menu1e4,
                    fonk: "openDrawAreaByManuel"
                }
            }
        },
        menu16: {
            label: lang.menu.menu15.label,
            fonk: "menu",
            icon: "help",
            submenu: {
                menu3e1: {
                    label: lang.menu.menu15.menu1e1,
                    fonk: "openHelpUsingApp"
                },
                menu3e2: {
                    label: lang.menu.menu15.menu1e2,
                    fonk: "openHelpSSS"
                }
            }
        },
        menu17: {
            label: lang.menu.menu16.label,
            fonk: "menu",
            icon: "contact_phone",
            submenu: {
                menu3e1: {
                    label: lang.menu.menu16.menu1e1,
                    fonk: "openContactAdressPhone"
                },
                menu3e2: {
                    label:lang.menu.menu16.menu1e2,
                    fonk: "openContactWriteUs"
                },
                menu3e3: {
                    label: lang.menu.menu16.menu1e3,
                    fonk: "openContactSupport"
                }
            }
        },
    };


    return json;
});