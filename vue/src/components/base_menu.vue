<template>
  <div>
    <div class="w100 bgtheme cf between header">
      <div class="tc logo">气瓶管理系统</div>
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
        default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        text-color="#fff"
        background-color="#3e424b"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <img src="../assets/images/icon1.png" class="icon" />
            <span>气瓶管理</span>
          </template>
          <el-menu-item index="air_bottle_all">全部气瓶</el-menu-item>
          <el-menu-item index="tips_conduct">标签管理</el-menu-item>
          <el-menu-item index="air_bottle_state1">库存中</el-menu-item>
          <el-menu-item index="air_bottle_state2">已充装</el-menu-item>
          <el-menu-item index="air_bottle_state3">已出库</el-menu-item>
          <el-menu-item index="air_bottle_state0">已过期</el-menu-item>
          <el-menu-item index="air_bottle_state_1">已作废</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <img src="../assets/images/icon1.png" class="icon" />
            <span>操作管理</span>
          </template>
          <el-menu-item index="operate_conduct_out">出库</el-menu-item>
          <el-menu-item index="operate_conduct_in">入库</el-menu-item>
          <el-menu-item index="operate_conduct_fill">充装</el-menu-item>
        </el-submenu>
        <el-menu-item index="customer_index">
          <i class="cf iconfont iconsize icon">&#xe8c7;</i>
          <span slot="title">客户管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="cf iconfont iconsize icon">&#xe642;</i>
            <span>信息维护</span>
          </template>
          <el-menu-item index="add_material">充装介质</el-menu-item>
          <el-menu-item index="specification">规格配置</el-menu-item>
        </el-submenu>
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({ name: key });
      // this.$refs.menu.open(key);
    },
    signOut() {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    }
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
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
  .icon {
    margin-right: 8px;
  }
}
.container {
  margin: 10vh 0 0 200px;
  min-height: 90vh;
  padding: 20px;
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