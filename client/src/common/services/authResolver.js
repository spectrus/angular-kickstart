(function() {
  'use strict';

  function authResolverService($q, $rootScope, $state) {
    return {
      resolve: function () {
        console.log('authResolverService rootscope:', $rootScope.$id);
        var deferred = $q.defer();
        var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
          if (angular.isDefined(currentUser)) {
            console.log('user defined');
            if (currentUser) {
              console.log('user defined');
              deferred.resolve(currentUser);
            } else {
              console.log('user not defined');
              deferred.reject();
              $state.go('/');
            }
            unwatch();
          }
        });
        return deferred.promise;
      }
    };
  }

  angular.module('common.services.authresolver', [])
    .factory('AuthResolver', ['$q', '$rootScope', '$state', authResolverService]);
})();
