app.service("ajax",function ($http) {


    var deger=$http.get("https://jsonplaceholder.typicode.com/posts").then(function (a) {


        return a;

        console.log(a)
    });


    return deger;

})