
app.directive("whichcontroller",function () {

    return {



  link:function ($scope,$el) {



     console.log("controller name ",angular.element(ctrlName).scope())

  }
    }

});