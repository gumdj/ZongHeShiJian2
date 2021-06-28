const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '',
    obj: null
}

Mock.mock('/user/nav', 'get', (a) => {
    console.log(a)
    Result.obj = [
        {
            title: '信息管理',
            name: 'InfoManage',
            icon: 'el-icon-s-operation',
            component: '',
            path: '',
            children: [
                {
                    title: '商品信息',
                    name: 'Goods',
                    icon: 'el-icon-shopping-cart-1',
                    component: 'sys/GoodsInformation',
                    path: '/sys/goodsInformation',
                    children: null
                },
                {
                    title: '供应商信息',
                    name: 'Supplier',
                    icon: 'el-icon-s-custom',
                    component: 'sys/Supplier',
                    path: '/sys/supplier',
                    children: null
                },
                {
                    title: '商品品牌',
                    name: 'Brand',
                    icon: 'el-icon-postcard',
                    component: 'sys/Brand',
                    path: '/sys/brand',
                    children: null
                },
                {
                    title: '商品分类',
                    name: 'GoodsType',
                    icon: 'el-icon-menu',
                    component: 'sys/GoodsType',
                    path: '/sys/goodsType',
                    children: []
                },
                {
                    title: '商品规格',
                    name: 'GoodsSpecification',
                    icon: 'el-icon-notebook-2',
                    component: 'sys/GoodsSpecification',
                    path: '/sys/goodsSpecification',
                    children: []
                },
                {
                    title: '供应记录',
                    name: 'Supply',
                    icon: 'el-icon-coin',
                    component: 'sys/Supply',
                    path: '/sys/supply',
                    children: []
                }
            ]
        }
    ]
     return Result
})