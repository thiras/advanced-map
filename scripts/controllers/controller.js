app.controller("controller", async function ($scope, $http, $timeout, $mdSidenav, $rootScope, $window, $storage, $leftmenujson, $leafletFonk, $getlang, $mdDialog,$mylocation) {
    var lang = await $getlang;
    $rootScope.lang = lang.data;
    $rootScope.adress = {
        ulke: false,
        il: false,
        ilce: false,
        mahalle: false,
        yol: false,
        kapi: false,
        ulkeActive: false,
        ilActive: false,
        ilceActive: false,
        mahalleActive: false,
        yolActive: false,
        kapiActive: false,
        filterIlce: {},
        filterMahalle: {},
        filterYol: {},
        filterNumarataj: {},
        featureIl: false,
        featureIlce: false,
        featureMahalle: false,
        featureYol: false,
        featureKapi: false
    };
    $rootScope.pharmacy = {
        pharmacyName: "",
        dutyPharmayControl: false,
        pharmacySearchResults: false
    };
    $rootScope.taxi = {
        taxiName: "",
        taxiSearchResults: false
    };
    $rootScope.buildLicense = {
        buildOwnerName: "",
        buildConstName: ""
    };
    $rootScope.poi={
        database:{},
        google:{totalGooglePointsID:[],totalGooglePoints:[]},
        foursquare:{}
    };
    $rootScope.security = {};
    $rootScope.health = {};
    $rootScope.transport = {
        shipType:[],
        shipTypeSelect: "",
        shipLines:[],
        aircraft:{}
    };
    document.querySelector('title').innerText = $rootScope.lang.general.title;
    $rootScope.parcell = {
        parcellLandNo: "",
        parcellNo: "",
        parcellSearchResults: false
    };
    $rootScope.location = {};
    $rootScope.mobileAngle = {alpha:0,beta:0,gamma:0};
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

    $scope.searchAdress = function (data) {


        $rootScope.leaflet.flyTo(L.latLng(data.split(",")[0], data.split(",")[1]), 10);


    };

    $leafletFonk.createMap(35.3540039, 38.891032);

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');


    $rootScope.$on("closeNavbar", function (e, a) {


        $scope.toggleLeft();
    });


    function buildToggler(componentId) {
        return function () {
            $timeout(function () {
                $mdSidenav(componentId).toggle();
            });
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
    };

    function messageConroller($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }


    $rootScope.$on("message", function (e, obj) {

        var status = obj.status;
        var header = obj.header;
        var content = obj.content;
        closeTime = obj.time;
        var color = {bg: "", c: ""};
        if (status === "success") {
            color = {bg: "#8bc34a", c: "#ffffff", bc: "#699b2e", icon: "check"};
        }
        if (status === "error") {
            color = {bg: "#D84315", c: "#ffffff", bc: "#D84315", icon: "error"};
        }
        if (status === "warning") {
            color = {bg: "#ff9800", c: "#ffffff", bc: "#ec8d00", icon: "warning"};
        }
        if (status === "info") {
            color = {bg: "#2196F3", c: "#ffffff", bc: "#0070c9", icon: "info"};
        }
        var mdicon = '<md-icon style="color:' + color.c + ';font-size: 25px;margin-top: -6px;" class="mat-icon material-icons accordion-icons ng-binding" role="img" aria-hidden="true">' + color.icon + '</md-icon>';
        $mdDialog.show(
            {
                targetEvent: null,
                template:
                '<md-dialog style="width: 450px;border-radius: 5px;">' +
                '  <md-dialog-content style="padding: 0; ">' +
                '<h2 style="background-color: ' + color.bg + ';font-size: 15px; padding: 10px;color: ' + color.c + ';">' + mdicon + ' ' + header + '</h2>' +
                '<div style="padding: 10px;font-size: 13px;color: #5c5c5c;">' + content + '</div>' +
                '</md-dialog-content>' +
                '  <md-dialog-actions>' +
                '<md-button ng-click="cancel()" style="color:' + color.bc + ';font-weight: bold;">' + $rootScope.lang.general.gotit + '</md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
                controller: 'customDialog'
                /* onComplete: afterShowAnimation,*/
                /* locals: { employee: $scope.userName }*/
            }
        );
        if (closeTime === "auto") {
            var wordNum = content.split(" ").length;
            var closeTime = (wordNum / 1.5) * 1000;
            $timeout(function () {
                $mdDialog.cancel();
            }, closeTime);
        } else {
            if (closeTime === "stay") {

            } else {
                closeTime = parseInt(closeTime);
                if (closeTime > 0) {
                    $timeout(function () {
                        $mdDialog.cancel();
                    }, closeTime);
                }
            }

        }


    });


    window.addEventListener('deviceorientation', function(e) {
        $rootScope.mobileAngle = {alpha:e.alpha,beta:e.beta,gamma:e.gamma};
        $mylocation.setMobileAngle($rootScope.mobileAngle);

    });
});
