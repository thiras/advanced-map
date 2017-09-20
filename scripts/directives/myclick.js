app.directive('myClick', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        compile: function ($element, attrs) {
            var fn = $parse(attrs.myClick, null, true);
            return function myClick(scope, element) {
                element.on('click', function (event) {
                    var callback = function () {
                        fn(scope, { $event: event });
                    };
                    scope.$apply(callback);
                })
            }
        }
    }
});



