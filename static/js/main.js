var app = angular.module('app', ['duScroll']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
}]);

app.run(function() {
	FastClick.attach(document.body);
})

app.controller('WeddingController', ['$location', '$document', '$scope', function($location, $document, $scope) {
    $scope.mobileMenu = false;

    $scope.menuClick = function() {
        $scope.mobileMenu = !$scope.mobileMenu;
    };

    $scope.setHash = function(target) {
        $scope.mobileMenu = false;
        var elem = angular.element(document.getElementById(target));

        if(!elem || !elem.length) {
            return;
        }

        if(window.history && window.history.pushState) {
            if($location.hash() != target) {
                window.history.pushState({}, "", window.location.pathname + '#' + target);
            }

            $document.scrollToElementAnimated(elem, 50);

        } else {
            $location.hash(target);
        }
    };

    $scope.toggleDetails = function($event) {
        var element = angular.element(angular.element($event.currentTarget).parent().parent().children()[1]),
            showClass = 'venue-info-block-show';

        (element.hasClass(showClass)) ? element.removeClass(showClass) : element.addClass(showClass);
    }
}]);
