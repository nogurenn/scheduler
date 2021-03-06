// create our angular module and inject firebase
angular.module('scheduleApp', ['firebase'])
.constant("FIREBASE_URL", "https://burning-torch-3627.firebaseio.com/")
// create our main controller and get access to firebase
.controller('mainController', function($scope, FIREBASE_URL, $firebase) {
    var ref = new Firebase(FIREBASE_URL + "days");
    var fb = $firebase(ref);

    // sync as object (three-way data binding)
    var syncObject = fb.$asObject();
    syncObject.$bindTo($scope, 'days');

    $scope.set_time = function(timeslot) {
        timeslot.status = (timeslot.status === 'Available') ? "Pending" : "Available";
    };
})

.controller('adminController', function($scope, FIREBASE_URL, $firebase) {
    var ref = new Firebase(FIREBASE_URL + "days");
    var fb = $firebase(ref);

    // sync as object (three-way data binding)
    var syncObject = fb.$asObject();
    syncObject.$bindTo($scope, 'days');

    // function to set the default data
    $scope.reset = function() {
        fb.$set({
            monday: {
                name: 'Monday',
                slots: {
                    0900: {
                        time: '9:00am',
                        status: 'Available',
                    },
                    0110: {
                        time: '11:00am',
                        status: 'Available',
                    },
                }
            },
            tuesday: {
                name: 'Tuesday',
                slots: {
                    0900: {
                        time: '9:00am',
                        status: 'Available',
                    },
                    0110: {
                        time: '11:00am',
                        status: 'Available',
                    }
                }
            }
        });
    };

    // Admin veto power to book
    $scope.set_time = function(timeslot) {
        timeslot.status = (timeslot.status !== 'Booked') ? "Booked" : "Available";
    };

    // Admin decision for pending
    $scope.approve = function(timeslot) {
        timeslot.status = "Booked";
    };

    $scope.reject = function(timeslot) {
        timeslot.status = "Available";
    };
});
