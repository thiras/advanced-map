app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('red')
            .primaryPalette('red');

        $mdThemingProvider.theme('blue')
            .primaryPalette('blue');

    })
    .controller('AppCtrl', function($scope, $mdDialog, $interval, $rootScope) {
        $scope.theme = 'red';

        var isThemeRed = true;


        $interval(function () {
            $scope.theme = isThemeRed ? 'blue' : 'red';

            isThemeRed = !isThemeRed;
        }, 2000);

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialogs/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog,$sce) {



            $scope.lang = $rootScope.lang;
            $scope.agreement=$sce.trustAsHtml($rootScope.lang.login.contract);
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };


        }
    });