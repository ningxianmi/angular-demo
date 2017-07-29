/**
 * Created by Administrator on 2016/12/6.
 */
var md = require("../../module/app");
md.controller('subMenu', subMenu);

subMenu.$inject = ["$rootScope","$state","$scope"];
function subMenu($rootScope,$state,$scope) {
    $scope.jump=function (item) {
        $state.transitionTo(item.url);
        angular.forEach($rootScope.subMenu.menuTwo,function (obj) {
            obj.active=false
        });
        item.active=true
    };
}