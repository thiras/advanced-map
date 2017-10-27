app.factory("$changelang", function ($http) {
    this.change = function (name) {
        var $url = "scripts/languages/lang-" + name + ".json";
        return $http.get($url).then(function (a) {
            return a;
        })

    };
    return this;
});