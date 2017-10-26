app.directive("mdLanguage", function ($rootScope) {
    return {

        restrict: "E",
        template: ' <md-button aria-label="Google Hangout" class="md-fab md-raised md-mini"><md-tooltip md-direction="left">{{lang.general.languages}}</md-tooltip>{{langFlag}}</md-button>',
        link: function ($scope, $el, $attr) {
            let $supportLang = ["TR", "EN", "AR"];
            $scope.langFlag = navigator.languages[1].toUpperCase();

            let indis = $supportLang.indexOf($scope.langFlag);
            let yenisayi = $supportLang.indexOf($scope.langFlag);
            let singletion=false;
            $el.on("click", function () {


                if (yenisayi >= $supportLang.length) {

                    yenisayi = 0;
                }
                if(!singletion){

                    yenisayi+=1;
                    singletion=true;
                }

                $scope.langFlag = $supportLang[yenisayi];

                yenisayi += 1;

            });

        }

    }

});