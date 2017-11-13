app.directive("mdToggleToast", function () {

    return {

        restrict: "E",
        template: ` <md-icon  style="transform:rotate({{transfrm}})">keyboard_arrow_left</md-icon>`,

        link: function ($scope, $el, $attr) {

            var status = true;
            let angles = ["0deg", "180deg"];
            $el.on("click", function () {
                status = !status;
                let toast = document.querySelector("md-toast");

                $scope.transfrm = status == true ? angles[0] : angles[1];
                toast.classList.toggle("slideLeft");




            })

        }

    }

});