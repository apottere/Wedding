angular.module('app', []).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');

}]).controller('WeddingController', ['$anchorScroll', '$location', '$scope', function($anchorScroll, $location, $scope) {
    $scope.mobileMenu = false;

    $scope.menuClick = function() {
        $scope.mobileMenu = !$scope.mobileMenu;
    };

    $scope.setHash = function(target) {
        $scope.mobileMenu = false;
        $location.hash(target);
        $anchorScroll();
    };
}]);