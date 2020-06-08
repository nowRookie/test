<template>
  <div>
    <div class="w100 bgtheme cf between header">
      <div class="tc logo">小卡优宠管理平台</div>
      <div class="between navigator">
        <div>
          <ul class="row" v-show="isCarsvs">
            <li>
              <span
                @click="directive({
                  path: '/carsvs_insure_list',
                  query: { instance: 'searchUnsend' }
                })"
                class="a"
              >未发送({{numlanren1}}条)</span>
            </li>
            <li>
              <span
                @click="directive({path:'/carsvs_insure_list',query:{instance:'searchNeedupload'}})"
                class="a"
              >需重传({{numlanren2}}条)</span>
            </li>
            <li>
              <span
                @click="$router.push({path:'/carsvs_pre_compensate'})"
                class="a"
              >待发起预理赔({{numlanren3}}条)</span>
            </li>
            <li>
              <span
                @click="$router.push({path:'/carsvs_full_compensate',query:{instance:'searchWaitSubmit'}})"
                class="a"
              >待提交保险公司案件({{numlanren4}}条)</span>
            </li>
          </ul>
        </div>
        <div class="row user">
          <label class="vertical">
            <i
              class="iconfont a"
              slot="prefix"
              style="margin-right:5px;"
              @click="doResetPassword"
            >&#xe6af;</i>
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
        <!-- <el-submenu index="1">
                  <template slot="title">
                    <span>管理中心</span>
                  </template>
                  <el-menu-item index="/organizational_manage">机构管理</el-menu-item>
                  <el-menu-item index="/staff_manage">员工管理</el-menu-item>
                  <el-menu-item index="/role_manage">角色管理</el-menu-item>
                  <el-menu-item index="/user_manage">用户管理</el-menu-item>
                </el-submenu>
                <el-submenu index="1001">
                  <template slot="title">
                    <span>医院端</span>
                  </template>
                  <el-menu-item index="/Verification">核销</el-menu-item>
                  <el-menu-item index="/Claims_consumption">理赔消费订单</el-menu-item>
                  <el-menu-item index="/Verification_order">核销订单</el-menu-item>
                  <el-submenu index="1-4">
                    <template slot="title">理赔管理</template>
                    <el-menu-item index="hospital_compensate">理赔信息列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-5">
                    <template slot="title">对账管理</template>
                    <el-menu-item index="/Claims_order_reconciliation">理赔订单对账</el-menu-item>
                    <el-menu-item index="/Verification_order_reconciliation">核销订单对账</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="/Contracted_products">签约产品</el-menu-item>
                </el-submenu>
                <el-submenu index="1002">
                  <template slot="title">
                    <span>保险公司端</span>
                  </template>
                  <el-submenu index="2-4">
                    <template slot="title">投保管理</template>
                    <el-menu-item index="/Insured_info_list">投保信息列表</el-menu-item>
                    <el-menu-item index="/Import_insurance_information">投保信息导入</el-menu-item>
                  </el-submenu>
                  <el-submenu index="2-5">
                    <template slot="title">理赔管理</template>
                    <el-menu-item index="insureCompany_compensate">理赔信息列表</el-menu-item>
                    <el-menu-item index="insureCompany_compensate_imports">理赔信息导入</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-submenu index="1003">
                  <template slot="title">
                    <span>卡萨端</span>
                  </template>

                  <el-submenu index="3-4">
                    <template slot="title">基础设置</template>
                    <el-submenu index="3-4-1">
                      <template slot="title">组织机构</template>
                      <el-menu-item index="/organizational_manage">机构管理</el-menu-item>
                      <el-menu-item index="/staff_manage">员工管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3-4-2">
                      <template slot="title">用户权限</template>
                      <el-menu-item index="/role_manage">角色管理</el-menu-item>
                      <el-menu-item index="/user_manage">用户管理</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-submenu index="3-5">
                    <template slot="title">产品中心</template>
                    <el-menu-item index="carsvs_product_manage">产品管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="marketing_center">
                    <template slot="title">营销中心</template>
                    <el-menu-item index="carsvs_cooperate_ambassador_product">产品包管理</el-menu-item>
                    <el-menu-item index="carsvs_member_ambassador_channel">营销渠道管理</el-menu-item>
                    <el-menu-item index="carsvs_activate_code_manage">免费激活码管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-6">
                    <template slot="title">用户管理</template>
                    <el-menu-item index="carsvs_personal_customer">用户管理列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-7">
                    <template slot="title">订单管理</template>
                    <el-menu-item index="carsvs_purchase_order">购买会员订单</el-menu-item>
                    <el-menu-item index="carsvs_buyAmbassador_order">购买大使订单</el-menu-item>
                    <el-menu-item index="carsvs_verify_order">会员核销订单</el-menu-item>
                    <el-menu-item index="carsvs_compensate_comsume_order">理赔消费订单</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-8">
                    <template slot="title">商户管理</template>
                    <el-menu-item index="carsvs_business_list">商户列表</el-menu-item>
                    <el-menu-item index="carsvs_clinic_medicine">医院药品库</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-9">
                    <template slot="title">投保管理</template>
                    <el-menu-item index="/carsvs_insure_list">投保信息订单列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3-10">
                    <template slot="title">理赔管理</template>
                    <el-menu-item index="carsvs_compensate">理赔信息列表</el-menu-item>
                    <el-menu-item index="carsvs_pre_compensate">代理赔款审核及发起</el-menu-item>
                    <el-menu-item index="carsvs_full_compensate">完整赔案提交保险公司</el-menu-item>
                  </el-submenu>

                  <el-submenu index="3-11">
                    <template slot="title">对账管理</template>
                    <el-submenu index="3-11-1">
                      <template slot="title">收款对账管理</template>
                      <el-menu-item index="/Insurance_company_claims_reconciliation">保险公司理赔款对账管理</el-menu-item>
                      <el-menu-item index="/Buy_member_reconciliations">购买会员对账</el-menu-item>
                      <el-menu-item index="/Buy_Promotion_Ambassadors_reconciliations">购买推广大使对账</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3-11-2">
                      <template slot="title">付款对账管理</template>
                      <el-menu-item index="/Personal_claims_reconciliation">代理赔款对账</el-menu-item>
                      <el-menu-item index="/Hospital_claims_order_reconciliation">理赔消费订单对账</el-menu-item>
                      <el-menu-item index="/Hospital_verification_reconciliation">核销订单对账</el-menu-item>
                      <el-menu-item index="/Channel_Rebate_Reconciliation">渠道返佣对账</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-submenu index="3-12">
                    <template slot="title">结算管理</template>
                    <el-submenu index="3-12-1">
                      <template slot="title">付款结算</template>
                      <el-menu-item index="/Personal_pre_claims_settlement">代理赔款结算</el-menu-item>
                      <el-menu-item index="/Hospital_claims_order_settlement">理赔消费订单结算</el-menu-item>
                      <el-menu-item index="/Hospital_writeOff_order_fee_settlement">核销订单结算</el-menu-item>
                      <el-menu-item index="/Channel_Rebate_Settlement">渠道返佣结算</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3-12-2">
                      <template slot="title">收款结算</template>
                      <el-menu-item index="/Insurance_Company_Claims_Collection">保险公司理赔款结算</el-menu-item>
                    </el-submenu>
                  </el-submenu>

                  <el-submenu index="3-13">
                    <template slot="title">完结确认</template>
                    <el-menu-item index="/Hospital_claims_end">理赔消费订单转款完结</el-menu-item>
                    <el-menu-item index="/Hospital_writeOff_end">核销订单转款完结</el-menu-item>
                    <el-menu-item index="/Insurance_Company_Claims_end">保险公司理赔款收款完结</el-menu-item>
                    <el-menu-item index="/Channel_Rebate_end">渠道返佣转款完结</el-menu-item>
                  </el-submenu>
                </el-submenu>

                <el-menu-item index="/HelloWorld">hellowrold</el-menu-item>
                <el-menu-item index="/router">router</el-menu-item>
        <el-menu-item index="/code">生成二维码</el-menu-item>-->

        <div :key="'lv1Key'+lv1Key" v-for="(lv1Unit,lv1Key) in menuList">
          <el-submenu :index="lv1Unit.resUrl" v-if="(lv1Unit.childs&&lv1Unit.childs.length)">
            <template slot="title">
              <span>{{lv1Unit.resName}}</span>
            </template>
            <div :key="'lv2Key'+lv2Key" v-for="(lv2Unit,lv2Key) in lv1Unit.childs">
              <el-submenu :index="lv2Unit.resUrl" v-if="lv2Unit.childs&&lv2Unit.childs.length">
                <template slot="title">
                  <span>{{lv2Unit.resName}}</span>
                </template>
                <div :key="'lv3Key'+lv3Key" v-for="(lv3Unit,lv3Key) in lv2Unit.childs">
                  <el-menu-item :index="lv3Unit.resUrl">{{lv3Unit.resName}}</el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item
                v-else
                :index="lv2Unit.resUrl"
                :key="'lv2Key'+lv2Key"
              >{{lv2Unit.resName}}</el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item :index="lv1Unit.resUrl" v-else>{{lv1Unit.resName}}</el-menu-item>
        </div>
      </el-menu>
    </div>
    <div class="container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
    </div>
    <!-- 修改密码弹窗 -->
    <base-modal
      v-if="modalVisible"
      :visible.sync="modalVisible"
      :items="modalItems"
      :type="modalType"
      :params="modalParams"
      :title="modalTitle"
      labelWidth="120px"
      width="1000px"
      :span="12"
      @edit="modalEdit"
      @cancel="modalCancel"
    >
      <template v-slot:customer="scope">
        这是一段自定义内容
        <el-button @click="operate(scope)">按钮</el-button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import baseModal from "@/components/base_modal";
import { getOptions } from "@/utils/utils";
import axios from "axios";
import _ from "lodash";

export default {
  name: "base_menu",
  components: { baseModal },
  data() {
    return {
      username: "admin",
      menuList: [],
      modalVisible: false,
      modalType: "edit",
      modalTitle: "修改密码",
      modalParams: {},
      modalItems: [
        {
          title: "旧密码",
          key: "oldpwd"
        },
        {
          title: "新密码",
          key: "newpwd"
        }
      ],
      isCarsvs: false,
      numlanren1: 0, //未发送
      numlanren2: 0, //需重传
      numlanren3: 0, //预理赔
      numlanren4: 0 //待提交
    };
  },
  methods: {
    directive({ path, query }) {
      this.$router.push({
        path: "/carsvs_insure_list",
        query
      });
    },
    modalEdit(data, params) {
      const postParams = { ...data };
      const options = getOptions({
        url: "/system/auth/updateUserPwd",
        method: "get",
        params: postParams
      });
      axios(options)
        .then(res => {
          if (res.data.code != 0) {
            this.$message.error(res.data.message || "网络错误!");
            return;
          }
          this.$message({
            type: "success",
            message: res.data.message || "修改密码成功"
          });
          this.modalCancel();
          this.$router.push({
            path: "/login",
            query: { message: "修改密码成功", type: "success" }
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "请求错误"
          });
        });
    },
    modalCancel() {
      this.modalVisible = false;
    },
    doResetPassword() {
      this.modalVisible = true;
    },
    signOut() {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    },
    getUserAuth() {
      let options = getOptions({
        url: "/system/auth/getUserAuth",
        method: "get",
        params: {}
      });
      axios(options)
        .then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$message({
              type: "error",
              showClose: true,
              // duration: 0,
              message: res.statusText || res.data.message || "请求错误!"
            });
            return;
          }
          let data = (res.data && res.data.data) || [];
          if (sessionStorage.getItem("username") === "test") {
            data = data.concat([
              { resName: "router", resUrl: "router", menu: 1 },
              {
                resName: "HelloWorld",
                resUrl: "HelloWorld",
                menu: 1
              }
            ]);
          }
          this.menuList = (function deepMenu(list) {
            const sortList = list
              .filter(unit => {
                return unit.menu;
              })
              .sort((a, b) => {
                return a.sort - b.sort;
              });
            return _.map(sortList, unit => {
              if (unit.childs && unit.childs.length) {
                return { ...unit, childs: deepMenu(unit.childs) };
              } else {
                return {
                  ...unit,
                  label: unit.resName,
                  value: unit.resUrl,
                  childs: []
                };
              }
            });
          })(data);
          console.log("menuList====", this.menuList);
        })
        .catch(err => {
          this.$message({
            type: "error",
            showClose: true,
            // duration: 0,
            message: err || "请求错误!"
          });
        });
    },
    getSendState() {
      let options = getOptions({
        url: "/policy/cntPolicyOrderList",
        method: "get",
        params: {
          sendState: "2"
        }
      });
      axios(options)
        .then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          let Data = res.data && res.data.data ? res.data.data : "";
          this.numlanren1 = Data;
          console.log(Data);
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "请求错误！"
          });
        });
    },
    getNeedReupload() {
      let options = getOptions({
        url: "/policy/cntPolicyOrderList",
        method: "get",
        params: {
          needReupload: 3
        }
      });
      axios(options)
        .then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          let Data = res.data && res.data.data ? res.data.data : "";
          console.log(Data);
          this.numlanren2 = Data;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "请求错误！"
          });
        });
    },
    getPreCompensate() {
      let options = getOptions({
        url: "/claim/carsvs/claim/prepay/list",
        method: "get",
        params: {
          pageSize: 100000
        }
      });
      axios(options)
        .then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          this.numlanren3 = res.data.totalSize || 0;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "请求错误！"
          });
        });
    },
    getFullCompensate() {
      let options = getOptions({
        url: "/claim/carsvs/claim/getFullClaimInfoList",
        method: "get",
        params: {
          pageSize: 100000
        }
      });
      axios(options)
        .then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          this.numlanren4 = res.data.totalSize || 0;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "请求错误！"
          });
        });
    }
  },
  mounted() {
    this.username = sessionStorage.getItem("username") || this.username;
    // 获取用户权限
    this.getUserAuth();
    let userBaseInfo = JSON.parse(sessionStorage.getItem("userBaseInfo"));
    console.log("userBaseInfo===", userBaseInfo);
    if (userBaseInfo.type !== "hospital" && userBaseInfo.type !== "insurance") {
      this.isCarsvs = true;
      this.getSendState(); //获取未发送数据总数
      this.getNeedReupload(); //获取需重传数据总数
      this.getPreCompensate(); //获取预理赔数据总数
      this.getFullCompensate(); //获取完整理赔数据总数
      return;
    }
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
  z-index: 1000;
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
  width: 250px;
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
  margin: 10vh 0 0 250px;
  min-height: 90vh;
  padding: 20px 20px 40px;
}

.logo {
  width: 250px;
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