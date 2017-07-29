/**
 * Created by Administrator on 2016/12/6.
 */

var md = require("../../module/admin");
md.controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ["$scope","$state"];
function loginCtrl($scope,$state) {
   $scope.loginGo=function () {
       $state.transitionTo("admin.ent.page1");
   }
}