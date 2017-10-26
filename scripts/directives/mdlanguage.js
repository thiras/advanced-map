app.directive("mdLanguage", function ($rootScope) {
    return {

        restrict: "E",
        template: ' <md-button ng-click="$mdOpenMenu()" aria-label="Google Hangout" class="md-fab md-raised md-mini"><md-tooltip md-direction="left">{{lang.general.languages}}</md-tooltip>{{langFlag}}<!--<md-icon md-svg-src="img/icons/{{langFlag}}" style="margin-top: 0;" class="mat-icon material-icons accordion-icons ng-binding" role="img" aria-hidden="true">{{langFlag}}</md-icon>--></md-button>',
        link: function ($scope, $el, $attr) {
            let $supportLang = ["TR", "EN", "AR"];
            $scope.langFlag = navigator.languages[1].toUpperCase();

            let indis = $supportLang.indexOf($scope.langFlag);
            let yenisayi = $supportLang.indexOf($scope.langFlag);
            $el.on("click", function () {



                if (yenisayi >= $supportLang.length) {

                    yenisayi = 0;
                }

                $scope.langFlag = $supportLang[yenisayi];

                yenisayi += 1;

            });

        }

    }

});