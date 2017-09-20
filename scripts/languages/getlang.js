app.service("$getlang",function ($http) {



    var $a=$http.jsonp("scripts/languages/lang-en.json").then(function (d) {

        return d;

    });


  return $a;

})