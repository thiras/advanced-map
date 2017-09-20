var app = angular.module("app", ['ngMaterial', 'ngAnimate']);

function autoload($array) {






    for( a in $array) {
        debugger;

        var el = document.createElement("script");

        el.type = "text/javascript";
        el.src = $array[a];

        var secici =document.querySelector("#laodScripts");

        angular.element(secici).after(el);


}




}