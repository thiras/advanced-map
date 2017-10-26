app.service("$getlang", function ($http,$rootScope) {
    var $supportLang = ["tr", "en", "ar"];
    var $lang = (function () {
        var $userLang = navigator.languages[1];
        $existLang = $supportLang.find(function (a) {
            return a == $userLang;
        });
        return $existLang ? $existLang : "en";
    })();

    $rootScope.langName=$lang;
    /*$lang="tr";*/

    var $url = "scripts/languages/lang-" + $lang + ".json";
    return $http.get($url).then(function (a) {
        return a;
    })
});
