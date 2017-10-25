app.directive("bgColor", function () {

    return {

        restrict: "A",
        link: function ($scope, $el, $attr) {


            $el.css({"background-color": $attr.bgColor})
            console.log($attr)

        }
    }
});

/* front color directive */
app.directive("frontColor", function () {
    return {

        restrict: "A",
        link: function ($scope, $el, $attr) {


            $el.css({"color": $attr.frontColor})
            console.log($attr)

        }

    }

});