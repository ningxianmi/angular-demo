/**
 * Created by Administrator on 2016/12/6.
 */
var md = require("../../module/app");
md.controller('adminCtrl', adminCtrl);

adminCtrl.$inject = ["$rootScope","$scope","$state"];
function adminCtrl($rootScope,$scope,$state) {
    $scope.jump=function (item) {
        $state.transitionTo(item.url);
        $rootScope.subMenu=item
        angular.forEach($scope.navData,function (obj) {
            obj.active=false
        });
        item.active=true;
        if(item.menuTwo&&item.menuTwo.length){
            angular.forEach(item.menuTwo,function (obj) {
                obj.active=false
            })
            item.menuTwo[0].active=true
        }
    };

    $scope.navData=[
        {
            menu:"企业信息管理",
            url:"admin.ent.entList",
            active:true,
            menuTwo:[
                {
                    menu:"入孵企业列表",url:"admin.ent.entList",active:true
                },
                {
                    menu:"新增入孵企业",url:"admin.ent.entNewAdd"
                },
                {
                    menu:"企业员工信息列表",url:"admin.ent.entMemberList"
                },
                {
                    menu:"入孵企业信息完善",url:"admin.ent.entInfoPerfect"
                },
                {
                    menu:"新增企业员工",url:"admin.ent.entAddMember"
                }
            ]
        },
        {
            menu:"孵化器资源管理",
            url:"admin.inc.incManagementRecord",
            menuTwo:[
                {
                    menu:"资源管理记录",url:"admin.inc.incManagementRecord"
                },
                {
                    menu:"会议室预定",url:"admin.inc.incMeetReservation"
                },
                {
                    menu:"投影仪借租",url:"admin.inc.incProjectorRent"
                }
            ]
        },
        {
            menu:"用户管理",
            url:"admin.user.userManagement",
            active:false,
            menuTwo:[
                {
                    menu:"账户信息修改",url:"admin.xx",active:true
                }
            ]}
    ];
    $rootScope.subMenu=$scope.navData[0]
}


