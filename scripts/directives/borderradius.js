app.directive("borderRadius", function () {


    return {


        link: function ($scopoe, $el, $attr) {


            var deger = parseInt($attr.borderRadius);
            $el.css({"border-radius": deger + "%"});

        }
    }
});