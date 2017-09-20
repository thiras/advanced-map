app.factory("$autoload",function () {



this.autoload=function ($path) {


    var el=document.createElement("script");
    el.type="text/javascript";
    el.src=$path;
    angular.element(document.querySelector("script-area")).append(el);
}

return this;
});