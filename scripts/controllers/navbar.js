app.controller("navbar",function($scope,$accordion,$timeout,$mdDialog) {

    $scope.menuJSON =$accordion;

    $timeout(function () {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {

                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    });



    $scope.factoryDesign=function (fn) {

       $scope[fn["fonk"]]();
    }




    $scope.menuContact=function () {

        alert = $mdDialog.alert({
            title: 'İletişim',
            textContent: 'Bizimle iletişim bilgileri falan filan!',
            ok: 'Close'
        });

        $mdDialog
            .show( alert )
            .finally(function() {
                alert = undefined;
            });
    }

    $scope.parselmenu1=function () {


        alert("parsel menu1 ")
    }








});
