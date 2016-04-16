(function() {
  'use strict';

  function sessionService() {
      this.create = function (username, firstName, access_token, role) {
        this.username = username;
        this.firstName = firstName;
        this.access_token = access_token;
        this.role = role;
      };
      this.destroy = function () {
        this.username = null;
        this.firstName = null;
        this.access_token = null;
        this.role = null;
      };
  }

  angular.module('common.services.session', [])
    .service('Session', sessionService);
})();
