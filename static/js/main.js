var app = angular.module('app', ['duScroll']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
}]);

app.run(function() {
    FastClick.attach(document.body);
});

app.controller('WeddingController', ['$location', '$document', '$scope', '$http', function($location, $document, $scope, $http) {
    var googleUrl = 'https://docs.google.com/a/averill-potter-wedding.com/forms/d/1TjrFY7PgQmRGir1tFN4fVgggf6cATYuh_UMrJFASfTk/formResponse';

    $scope.mobileMenu = false;

    var createNewRsvp = function () {
        return {
            attending: null,
            childrenUnder4: [],
            children4AndOlder: []
        }
    };

    $scope.rsvp = createNewRsvp();
    $scope.rsvpSubmitted = false;
    $scope.submittingRsvp = false;
    $scope.rsvpError = null;

    var getChildrenJoined = function(children) {
        return _.map(children, function(o) {
            return o.name;
        }).join(', ');
    };

    $scope.submitRsvp = function() {
        if(!$scope.readyToSubmit()) {
            return;
        }

        $scope.submittingRsvp = true;
        $http({
            method: 'POST',
            url: googleUrl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                'entry.236789417': $scope.rsvp.name,
                'entry.812866607': $scope.rsvp.attending,
                'entry.1026480432': $scope.rsvp.childrenUnder4.length ? getChildrenJoined($scope.rsvp.childrenUnder4) : '',
                'entry.1667147661': $scope.rsvp.children4AndOlder.length ? getChildrenJoined($scope.rsvp.children4AndOlder) : ''
            })
        }).success(function() {
            $scope.rsvpError = false;
        }).error(function(data, status, headers, config) {
            $scope.rsvpError = status !== 0;
        }).finally(function() {
            $scope.submittingRsvp = false;
            $scope.rsvpSubmitted = true;
        });
    };

    $scope.getEmail = function() {
        return 'apottere' + '@' + 'gmail.com';
    };

    $scope.showRsvpForm = function() {
        return !$scope.submittingRsvp && !$scope.rsvpSubmitted;
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

    $scope.readyToSubmit = function() {
        if($scope.rsvp.attending === null || !$scope.rsvp.name) {
            return false;
        }

        if(!$scope.isAttending()) {
            return true;
        }

        return $scope.addedChildren();
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
