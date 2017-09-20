app.directive('rightClick', ["$parse", function($parse) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var fn = $parse(attrs.rightClick);
            element.bind('contextmenu', function(event) {
                domElement=document.querySelector("#rightMenuOpen");
                setTimeout(function() {
                    angular.element(domElement).triggerHandler('click');
                }, 0);
                $scope.$apply(function() {

                    event.preventDefault();
                    fn($scope, {$event:event});
                });
            });
        }
    }
}]);
