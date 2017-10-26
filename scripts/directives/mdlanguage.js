app.directive("mdLanguage", function ($rootScope, $changelang, $timeout) {
    return {

        restrict: "E",
        template: ' <md-button aria-label="Google Hangout" class="md-fab md-raised md-mini"><md-tooltip md-direction="left">{{lang.general.languages}}</md-tooltip>{{langFlag}}</md-button>',
        link: function ($scope, $el, $attr) {
            let $supportLang = ["tr", "en"];
            $scope.langFlag = navigator.languages[1].toUpperCase();

            let indis = $supportLang.indexOf($scope.langFlag);
            let yenisayi = $supportLang.indexOf($scope.langFlag);
            let singletion = false;
            $el.on("click", function () {

                /*
                  var lang = await $getlang;
    $rootScope.lang = lang.data;
    */


                if (yenisayi >= $supportLang.length) {

                    yenisayi = 0;
                }
                if (!singletion) {

                    yenisayi += 1;
                    singletion = true;
                }

                $scope.langFlag = $supportLang[yenisayi];
                $changelang.change($scope.langFlag.toLowerCase()).then(function (a) {
                    return a;
                }).then(function (b) {


                    angular.element(document.querySelector("#navbar")).scope().lang = b.data;
                    $rootScope.lang = b.data;


                });


                yenisayi += 1;

            });

        }

    }

});