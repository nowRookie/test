<template>
    <div>
        <div class="w100 bgtheme cf between header">
            <div class="tc logo">经纪人系统</div>
            <div class="between navigator">
                <div>
                    <!-- <ul class="row">
                    <li>
                      <a>
                        <i class="iconfont icon">&#xe6fb;</i>
                        <span>首页</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <img src="../assets/images/icon2.png" class="icon" />
                        <span>新瓶入库</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <img src="../assets/images/icon2.png" class="icon" />
                        <span>旧瓶入库</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <img src="../assets/images/icon2.png" class="icon" />
                        <span>出库</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i class="iconfont icon">&#xe68f;</i>
                        <span>历史记录</span>
                      </a>
                    </li>
                    </ul>-->
                </div>
                <div class="row user">
                    <label class="vertical">
                        <i class="iconfont" slot="prefix" style="margin-right:5px;">&#xe6af;</i>
                        <span>您好，{{username}}</span>
                    </label>
                    <a @click="signOut">
                        <i class="iconfont" slot="prefix">&#xe672;</i>
                    </a>
                </div>
            </div>
        </div>
        <div class="slider">
            <el-menu
                    ref="menu"
                    default-active="1"
                    class="el-menu-vertical-demo"
                    text-color="#fff"
                    background-color="#3e424b"
                    router
                    unique-opened
            >
                <el-submenu index="1">
                    <template slot="title">
                        <!-- <i class="el-icon-location"></i> -->
                        <span>管理中心</span>
                    </template>
                    <el-menu-item index="/organizational_manage">机构管理</el-menu-item>
                    <el-menu-item index="/staff_manage">员工管理</el-menu-item>
                    <el-menu-item index="/role_manage">角色管理</el-menu-item>
                    <el-menu-item index="/user_manage">用户管理</el-menu-item>
                    <el-menu-item index="/agent_team">代理/团队</el-menu-item>
                    <el-menu-item index="/project_manage">项目管理</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <span>保险公司管理</span>
                    </template>
                    <el-menu-item index="/insurance_account">保险公司列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <span>客户管理</span>
                    </template>
                    <el-menu-item index="/customer_list">客户信息列表</el-menu-item>
                </el-submenu>
                <el-menu-item index="/ChannelList">渠道管理</el-menu-item>
                <el-submenu index="4">
                    <template slot="title">
                        <span>产品管理</span>
                    </template>
                    <el-menu-item index="/insure_prod_conduct">保险产品管理</el-menu-item>
                    <el-menu-item index="/rate_discount">费率折扣管理</el-menu-item>
                    <el-menu-item index="/brokerage_manage">佣金管理</el-menu-item>
                    <!-- <el-menu-item index="/protocol_manage">协议管理</el-menu-item> -->
                </el-submenu>
                <el-submenu index="11">
                    <template slot="title">
                        <span>合同管理</span>
                    </template>
                    <el-menu-item index="/Contract">合同列表</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <span>保险业务操作</span>
                    </template>
                    <el-menu-item index="/insure">投保</el-menu-item>
                    <el-menu-item index="/modify_list">批单</el-menu-item>
<!--                    <el-menu-item index="/verify_list">保单审核</el-menu-item>-->
                    <el-menu-item index="/batchInsure">批量投保</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <span>业务管理</span>
                    </template>
                    <!-- <el-menu-item index="/order_list">保险订单管理</el-menu-item> -->
                    <el-menu-item index="/insureNum_list">保单管理</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <span>票内对账管理</span>
                    </template>
                    <el-menu-item index="/InList">对账列表</el-menu-item>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                        <span>票外对账管理</span>
                    </template>
                    <el-menu-item index="/OutList">对账列表</el-menu-item>
                </el-submenu>
                <el-submenu index="0">
                    <template slot="title">
                        <span>结算管理</span>
                    </template>
                    <el-menu-item index="/settlement_detail">结算单列表</el-menu-item>
                </el-submenu>

                <el-submenu index="9">
                    <template slot="title">
                        <span>渠道佣金对账</span>
                    </template>
                    <el-menu-item index="/Channel_CommissionsIn">票内对账管理</el-menu-item>
                    <el-menu-item index="/Channel_CommissionsOut">票外对账管理</el-menu-item>
                </el-submenu>
                <el-submenu index="10">
                    <template slot="title">
                        <span>渠道佣金结算</span>
                    </template>
                    <el-menu-item index="/Channel_Settlement">渠道佣金结算列表</el-menu-item>
                </el-submenu>
                <el-menu-item index="/HelloWorld">hellowrold</el-menu-item>
                <el-menu-item index="/router">router</el-menu-item>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "base_menu",
        data() {
            return {
                username: "admin"
            };
        },
        methods: {
            signOut() {
                sessionStorage.removeItem("token");
                this.$router.replace("/login");
            }
        },
        mounted() {
            this.username = sessionStorage.getItem("username") || this.username;
        }
    };
</script>

<style lang="less" scoped>
    .header {
        box-sizing: border-box;
        padding-right: 20px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 500;
        height: 10vh;
        line-height: 10vh;
    }

    .navigator {
        flex: 1;

        li {
            padding: 0 30px;
            display: flex;
            align-items: center;
            font-size: 16px;

            &.active {
                background: #317fcc;
            }

            .icon {
                margin-right: 8px;
            }
        }

        .user {
            i {
                font-size: 24px;
            }

            > label {
                margin-right: 10px;
            }
        }
    }

    .slider {
        position: fixed;
        left: 0;
        top: 10vh;
        bottom: 0;
        z-index: 500;
        width: 200px;
        background: #3e424b;
        overflow-y: scroll;
        overflow-x: hidden;

        .icon {
            margin-right: 8px;
        }

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小块*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            background: #797979;
        }

        &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: #ededed;
        }
    }

    .container {
        margin: 10vh 0 0 200px;
        min-height: 90vh;
        padding: 20px 20px 40px;
    }

    .logo {
        width: 200px;
        font-size: 18px;
    }

    .iconsize {
        font-size: 24px;
    }

    // 清除element默认样式
    .el-menu {
        border: none;
    }
</style>