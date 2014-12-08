var app = angular.module('app', ['duScroll']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
}]);

app.controller('WeddingController', ['$location', '$document', '$scope', function($location, $document, $scope) {
    $scope.mobileMenu = false;

    $scope.menuClick = function() {
        $scope.mobileMenu = !$scope.mobileMenu;
    };

    $scope.setHash = function(target) {
        $scope.mobileMenu = false;
        if(window.history && window.history.pushState) {
            if($location.hash() != target) {
                window.history.pushState({}, "", window.location.pathname + '#' + target);
            }

            var elem = angular.element(document.getElementById(target));
            $document.scrollToElementAnimated(elem);

        } else {
            $location.hash(target);
        }
    };
}]);
