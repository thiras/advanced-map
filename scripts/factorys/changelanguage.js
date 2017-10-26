app.factory("$changelang", function ($http) {


    this.change = function (name) {
        var $supportLang = ["tr", "en", "ar"];
        var $lang = (function () {
            var $userLang = name;
            $existLang = $supportLang.find(function (a) {
                return a == $userLang;
            });
            return $existLang ? $existLang : "en";
        })();


        var $url = "scripts/languages/lang-" + $lang + ".json";
        return $http.get($url).then(function (a) {
            return a;
        })

    }

    return this;

});