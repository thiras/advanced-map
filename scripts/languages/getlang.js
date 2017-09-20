app.service("$getlang",function ($http) {



    var $a=$http.get("scripts/languages/lang-en.json").then(function (d) {

        return d;

    });


  return $a;

})