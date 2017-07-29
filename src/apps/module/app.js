/**
 * Created by Administrator on 2016/12/5.
 */

window.angular=require("angular");
require("angular-ui-router");
require("angular-resource");
require("angular-animate");
var md=angular.module("idcubeApp",[
    "ui.router",
    "ngResource",
    "ngAnimate",
    "admin"
]);
md.config(["$urlRouterProvider","$stateProvider",function ($urlRouterProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/login');
    var routeList=[
        {
            name:"login",
            url: '/login',
            templateUrl:('page/user/login.html'),
            reloadOnSearch: false,
            controller: 'loginCtrl',
            data:{
                name:"登录"
            }
        }
    ];
    angular.forEach(routeList,function (item) {
        $stateProvider.state(item.name,item);
    });
}]);
md.run(["$rootScope","$state", function ($rootScope,$state) {
        var routeList = $state.get();
        $rootScope.$on('$stateChangeStart', onBeforeChange);
        function onBeforeChange(ev, toState, toStateParams) {
            debugger
        }
    }
]);

module.exports = md;