// (function() {
//   'use strict';

//   function headerCtrl($scope, $log, BackandService) {
//     $log.debug('Header loaded');

// 	  $scope.logout = function(){
// 	  	console.log('logoud');
// 	  	$log('logout clicked in header');
// 	  };
//   }

//   angular.module('common.header', [])
//     .controller('HeaderCtrl', ['$scope', '$log', 'BackandService', headerCtrl]);
// })();


(function() {
  'use strict';

  function headerCtrl($log, $scope, BackandService) {
    $log.debug('Header loaded');

    $scope.logout = function(){
    	$log.debug('logout clicked');
    	BackandService.logout();
    }
  }

  angular.module('common.header', [])
    .controller('HeaderCtrl', ['$log','$scope', 'BackandService', headerCtrl]);
})();
