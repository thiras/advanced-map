app.service("$getlang", function ($rootScope,$http) {
    var $supportLang = ["tr", "en", "ar", "es"];
    $rootScope.supportLang = $supportLang;
    var $lang = (function () {
        var $userLang = navigator.languages[1];
        $existLang = $supportLang.find(function (a) {
            return a == $userLang;
        });
        return $existLang ? $existLang : "en";
    })();

    $lang="tr";
    $rootScope.browserLangugae = $lang;

    var $url = "scripts/languages/lang-" + $lang + ".json";
    return $http.get($url).then(function (a) {
        return a;
    })
});
