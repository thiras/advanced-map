app.directive("bgColor", function () {
    return {

        restrict: "A",
        link: function ($scope, $el, $attr) {
            $el.css({"background-color": $attr.bgColor});
          }
    }
});

/* front color directive */
app.directive("frontColor", function () {
    return {
        restrict: "A",
        link: function ($scope, $el, $attr) {
            $el.css({"color": $attr.frontColor});
        }
    }

});