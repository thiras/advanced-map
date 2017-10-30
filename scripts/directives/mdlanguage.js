app.directive("mdLanguage", function ($rootScope, $changelang, $timeout, $accordion) {
    return {

        restrict: "E",
        template: ' <md-button ng-if="activeLanguage" aria-label="Google Hangout" class="md-fab md-raised md-mini"><md-tooltip md-direction="left">{{lang.general.languages}}</md-tooltip>{{langFlag}}</md-button>',
        link: function ($scope, $el, $attr) {

            var $supportLang = ["en", $rootScope.browserLangugae];
            $scope.langFlag = $supportLang[0];
            var indis = true;
            $scope.activeLanguage = true;
            if ($rootScope.browserLangugae == "en") {
                $scope.activeLanguage = false;
            }
            $el.on("click", function () {

                indis = !indis;
                var a = indis ? 1 : 0;
                $scope.langFlag = $supportLang[a];

                $changelang.change($scope.langFlag).then(function (a) {
                    return a;
                }).then(function (b) {
                    $rootScope.lang = b.data;
                    $accordion.json = $accordion.refreshAccordion(b.data);
                    $rootScope.$broadcast("updateAcordion", $accordion.json);
                    $rootScope.accordion = $accordion.json;
                    var indis2 = !indis;
                    var b = indis2 ? 1 : 0;
                    $scope.langFlag = $supportLang[b];
                });


            });

        }

    }

});