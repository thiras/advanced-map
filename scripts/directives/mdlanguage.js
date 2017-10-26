app.directive("mdLanguage",function ($rootScope) {
    return{

        restrict:"E",
        template:' <md-button ng-click="$mdOpenMenu()" aria-label="Google Hangout" class="md-fab md-raised md-mini"><md-tooltip md-direction="left">{{lang.general.moduls}}</md-tooltip>{{langFlag}}<!--<md-icon md-svg-src="img/icons/{{langFlag}}" style="margin-top: 0;" class="mat-icon material-icons accordion-icons ng-binding" role="img" aria-hidden="true">{{langFlag}}</md-icon>--></md-button>',
        link:function ($scope,$el,$attr) {

            $scope.langFlag="TR";
            var durum=0;
            $el.on("click",function () {

              if(durum==true){
                  $scope.langFlag="TR";

              }
               else{

                  $scope.langFlag="EN";

              }
                durum=!durum;

            });

        }

    }

});