/**
 * Created by Administrator on 2016/12/6.
 */
var md = angular.module("admin", []);

md.config(appConfig);
appConfig.$inject = ["$stateProvider"];
function appConfig($stateProvider) {
    var routeList=[
        {
            name:"admin",
            abstract: true,
            url: '/admin',
            templateUrl:('page/common/admin.html'),
            reloadOnSearch: false,
            controller: 'adminCtrl'
        },
        {
            name:"admin.ent",
            abstract: true,
            url: '/ent',
            templateUrl:('page/page/subMenu.html'),
            reloadOnSearch: false,
            controller: 'subMenu'
        },
        {
            name:"admin.ent.page1",
            url: '/page1',
            templateUrl:('page/page/page1.html'),
            reloadOnSearch: false,
            controller: 'page1'
        }
    ];
    angular.forEach(routeList,function (item) {
        $stateProvider.state(item.name,item);
    });
}
module.exports = md;