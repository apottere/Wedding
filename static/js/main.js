angular.module('app', []).controller('WeddingController', function($scope) {
    $scope.mobileMenu = false;

    $scope.menuClick = function() {
        $scope.mobileMenu = !$scope.mobileMenu;
    }
});