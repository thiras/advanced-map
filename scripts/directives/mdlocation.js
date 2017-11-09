app.directive("mdLocation",function ($mylocation) {

    return {

        restrict:"E",
        templateUrl:'html/directives/mdlocation.html',
        link:function ($scope,$el,$attr) {
            $scope.active = false;
            $scope.status =["passive","findme","followme","trackme"];
            var mdicon = $el[0].children[0].children[0];
            $scope.num = 0;
            $scope.types = {
                passive:{
                    options : {loop:false,show:true,panto:false,flyto:true,line:false,color:"#999",radius:1,semiCircle:false},
                    icon:'location_disabled'
                },
                findme:{
                    options : {loop:false,show:true,panto:false,flyto:true,line:false,color:"#2196f3",radius:30,semiCircle:true},
                    icon:'my_location'
                },
                followme:{
                    options : {loop:true,show:true,panto:true,flyto:true,line:false,color:"#8bc34a",radius:"auto",semiCircle:true},
                    icon:"directions_walk"
                },
                trackme:{
                    options : {loop:true,show:true,panto:true,flyto:true,line:true,color:"#ff9800",radius:"auto",semiCircle:true},
                    icon:"timeline"
                }
            };

            mdicon.innerText = $scope.types[$scope.status[$scope.num]].icon;
            mdicon.style.color = $scope.types[$scope.status[$scope.num]].options.color;

            $el.on("click",function () {
                $scope.num++;
                $scope.num=$scope.num%4;
                var secilen = $scope.types[$scope.status[$scope.num]];
                mdicon.innerText = secilen.icon;
                mdicon.style.color = secilen.options.color;

                if($scope.num==0){
                    $mylocation.hiddenLocation();
                }else{
                    $mylocation.findMyLocation(secilen.options);
                }



            })

        }
    }

});