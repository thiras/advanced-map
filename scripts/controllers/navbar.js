app.controller("navbar", function ($scope, $accordion, $timeout, $mdDialog, $rootScope) {

    $scope.menuJSON = $accordion;
    /*  menu acma ayar bas*/
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');


    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    }


    /* menu acma ayar son */

    $timeout(function () {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {

                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    });


    $scope.factoryDesign = function (fn) {

        $scope[fn["fonk"]]();
    }


    $scope.menuContact = function () {

        alert = $mdDialog.alert({
            title: 'İletişim',
            textContent: 'Bizimle iletişim bilgileri falan filan!',
            ok: 'Close'
        });

        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
    }


    $scope.findAddress = function (event) {


        // $scope.toggleLeft();

        $mdDialog.show({
            controller: navbarCtrl,
            templateUrl: 'dialogs/findaddress.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            closeTo: '#closeBtn'
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    }


    $scope.ulasim = function () {

        alert("ulaşım methodu")
    }


    function navbarCtrl($scope, $sahtejson) {


        $scope.il = $sahtejson.il;
        $scope.ilce = $sahtejson.ilce;
        $scope.mahalle = $sahtejson.mahalle;
        $scope.yol = $sahtejson.yol;
        $scope.numarataj = $sahtejson.numarataj;
        $scope.filterIlce = {};
        $scope.filterMahalle = {};
        $scope.isActiveIlce = false;
        $scope.isActiveMahalle = false;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.changeIlce = function (ilid) {
            debugger;
            $scope.filterIlce = {};
            for (i in $scope.il) {
                if (ilid == $scope.il[i].id) {
                    var il = L.geoJSON($scope.il[i].geojson, {
                        style: {color: "#ff0000"}
                    }).bindPopup($scope.il[i].label).addTo($rootScope.leaflet);
                    var ilbbox = il.getBounds();
                    $rootScope.leaflet.fitBounds(ilbbox);
                    $scope.isActiveIlce = true;
                }
            }
            for (i in $scope.ilce) {
                if (ilid == $scope.ilce[i].ilid) {
                    $scope.filterIlce[i] = $scope.ilce[i];
                }
            }
        };
        $scope.changeMahelle = function (ilceid) {
            debugger;
            $scope.filterMahalle = {};
            for (i in $scope.ilce) {
                if (ilceid == $scope.ilce[i].id) {
                    var il = L.geoJSON($scope.ilce[i].geojson, {
                        style: {color: "#ff0000"}
                    }).bindPopup($scope.ilce[i].label).addTo($rootScope.leaflet);
                    var ilbbox = il.getBounds();
                    $rootScope.leaflet.fitBounds(ilbbox);
                    $scope.isActiveMahalle = true;
                }
            }
            $scope.mahalle = $sahtejson.mahalle;
            for (i in $scope.mahalle) {
                if (ilid == $scope.mahalle[i].ilid) {
                    $scope.filterMahalle[i] = $scope.mahalle[i];
                }
            }

        }


    }


});
