app.controller("navbar",function($scope,$accordion,$timeout) {



    $scope.menuJSON = {
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
            label:"Menü 2",
            fonk:"menu",
            submenu:{
                menu2e1:{
                    label:"Menü 2-1",
                    fonk:"menu"
                },
                menu2e2:{
                    label:"Menü 2-2",
                    fonk:"menu"
                }
            }
        },
        menu3:{
            label:"Menü 3",
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
            label:"Menü 4",
            fonk:"menu",
            submenu:false
        }

    };


    $timeout(function () {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {

                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    });







});
