app.service("$getlang", function ($http, $rootScope) {

    var deger="";
    var url = "scripts/languages/lang-en.json";


    return $http.get(url).then(function (a) {
        return a;
    })




})