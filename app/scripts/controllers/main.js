/*global Firebase*/

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://angulartester.firebaseio.com/');
    var childRef = rootRef.child('message');

    childRef.on('value', function(snapshot) {
      $timeout(function(){
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.message = snapshotVal;
      });
    });

    $scope.$watch('message.text', function(newVal) {
      if (!newVal) {
        return;
      }
      childRef.update({
        text: newVal
      });
    });

    $scope.setMessage = function() {
      childRef.set({
        user: 'Micah',
        text: 'howdy'
      });
    };

    $scope.updateMessage = function() {
      childRef.update({
        text: 'bye'
      });
    };

  });
