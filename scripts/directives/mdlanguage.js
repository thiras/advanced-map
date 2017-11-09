app.directive("mdLanguage", function ($rootScope, $changelang, $timeout, $accordion) {
    return {

        restrict: "E",
        templateUrl:'html/directives/mdlanguage.html',
        link: function ($scope, $el, $attr) {

            var $supportLang = ["en", $rootScope.browserLanguage];
            $scope.langFlag = $supportLang[0];
            var indis = true;
            $scope.activeLanguage = true;
            if ($rootScope.browserLanguage == "en") {
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