var app = angular.module("app", ['ngMaterial', 'ngAnimate','ngAria','ngMessages']);

app.controller("controller", function ($scope, $http,$timeout, $mdSidenav, $rootScope, $window, $storage, $leftmenujson,$leafletFonk,ajax) {



    var sonuc=ajax.then(function (b) {
        return b;
        $scope.son=b.data;

    });

    $rootScope.language = navigator.languages[1] || navigator.language || "tr";
    $rootScope.language="tr";
    $rootScope.lang = lang[$rootScope.language];
    document.querySelector('title').innerText=$rootScope.lang.general.title;
    $showFabDials = false;
    $scope.contextMenuShow = 0;
    $scope.mouseX = 0 + "px";
    $scope.mouseY = 0 + "px";
    $scope.streetWievImgSrc = "http://i.internethaber.com/uploads/content/sanliurfajpgOpg5wtLv.jpg?v=1474298083";
    $rootScope.ad = "ballista yazılım";
    $scope.leftmenujson = $leftmenujson.jsonData;
    $scope.lastActiveColor = function (id) {
        var lastActive = $leftmenujson.jsonData.lastActive;

        return (lastActive == id);

    };
    $scope.mapType = "default";
    $scope.opacity = 1;


    $rootScope.$emit("updateMdSliderValue", function (a, b) {


        console.log(b)
    });


    $scope.searchAdress = function (data) {


        $rootScope.leaflet.flyTo(L.latLng(data.split(",")[0], data.split(",")[1]), 10);


    };

    $leafletFonk.createMap(35.3540039,38.891032);

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    }


    $scope.openrightmenu = function () {


        event.stopPropagation();

        $timeout(function () {

            btn = document.querySelector("#rightMenuOpen");
            angular.element(btn).triggerHandler('click')
        }, 0);


        $scope.contextMenuShow = 1;


        pozx = event.clientX;
        pozy = event.clientY;


        var inrHeight = $window.innerHeight;
        var inrWidth = $window.innerWidth;


        $scope.mouseX = pozx - 50 + "px";
        $scope.mouseY = pozy - 40 + "px";
    }




});




