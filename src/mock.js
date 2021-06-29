const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '',
    obj: null
}

Mock.mock('/user/nav', 'get', () => {
    Result.obj = [
        {
            title: '用户信息管理',
            name: 'UserInfoManage',
            icon: 'el-icon-s-operation',
            component: '',
            path: '',
            children: [
                {
                    title: '用户信息',
                    name: 'UserInfo',
                    icon: 'far fa-id-card',
                    component: 'sys/UserInfo',
                    path: '/sys/userInfo',
                    children: []
                }
            ]
        },
        {
            title: '桥梁信息管理',
            name: 'BridgeInfoManage',
            icon: 'el-icon-setting',
            component: '',
            path: '',
            children: [
                {
                    title: '桥梁资料卡',
                    name: 'BridgeInfo',
                    icon: 'fa fa-table',
                    component: 'sys/BridgeInfo',
                    path: '/sys/bridgeInfo',
                    children: []
                }
            ]
        },
        {
            title: '桥梁检测管理',
            name: 'BridgeDetectionManage',
            icon: 'el-icon-setting',
            component: '',
            path: '',
            children: [
                {
                    title: '日常检测',
                    name: 'BridgeDailyDetection',
                    icon: 'el-icon-document',
                    component: 'sys/BridgeDailyDetection',
                    path: '/sys/bridgeDailyDetection',
                    children: []
                },
                {
                    title: '定期检测',
                    name: 'BridgePeriodicDetection',
                    icon: 'el-icon-document',
                    component: 'sys/BridgeDailyDetection',
                    path: '/sys/bridgePeriodicDetection',
                    children: []
                },
            ]
        }
    ]
     return Result
})