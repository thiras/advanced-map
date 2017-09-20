angular.module('app').config(function ($provide) {
        {
            $provide.decorator('mdFabSpeedDialDirective', function ($delegate, $controller) {
                directive = $delegate[0];

                controllerName = directive.controller;

                directive.controller = ['$scope', '$element', '$animate', '$mdUtil', '$mdConstant', function ($scope, $element, $animate, $mdUtil, $mdConstant) {
                    controller = $controller(controllerName, {
                        $scope: $scope,
                        $element: $element,
                        $animate: $animate,
                        $mdUtil: $mdUtil,
                        $mdConstant: $mdConstant
                    });
                    controller.close =
                        function () {


                        };
                    return controller;
                }]
                ;

                return $delegate;
            })
            ;
        }
    }
);
