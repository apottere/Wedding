var app = angular.module('app', ['duScroll']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
}]);

app.run(function() {
	FastClick.attach(document.body);
});

app.controller('WeddingController', ['$location', '$document', '$scope', function($location, $document, $scope) {
    $scope.mobileMenu = false;

    $scope.rsvp = {
        attending: null,
        childrenUnder4: [],
        children4AndOlder: [],
        food: {
            beef: null,
            fish: null,
            veggie: null
        }
    };

    $scope.childrenAreValid = function() {
        if(!$scope.rsvp.childrenUnder4.length && !$scope.rsvp.children4AndOlder.length) {
            return false;
        }

        var checkChildren = function (child) {
            return !!child.name;
        };

        return _.every($scope.rsvp.childrenUnder4, checkChildren) && _.every($scope.rsvp.children4AndOlder, checkChildren);
    };

    $scope.addedChildren = function() {
        return $scope.rsvp.children ? $scope.childrenAreValid() : true;
    };

    $scope.chosenFood = function () {
        return $scope.rsvp.food.beef || $scope.rsvp.food.fish || $scope.rsvp.food.veggie;
    };

    $scope.readyToSubmit = function() {
        if($scope.rsvp.attending === null || !$scope.rsvp.name) {
            return false;
        }

        if(!$scope.isAttending()) {
            return true;
        }

        return $scope.addedChildren() && $scope.chosenFood();
    };

    $scope.addChild = function(list) {
        list.push({name: ''});
    };

    $scope.removeChild = function(list, index) {
        list.splice(index, 1);
    };

    $scope.isAttending = function () {
        return 'attending' in $scope.rsvp && $scope.rsvp.attending == 'yes';
    };

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
