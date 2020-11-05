<template>
  <div class="index">
    <div id="canvas"></div>
    <catClaw></catClaw>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import catClaw from "@/components/page/catClaw.vue";

import {
  getOptions,
  typeOf,
  randomScope,
  outerScope,
  randomColor,
  getStyle,
  debounce,
} from "@/utils/utils";

var starSkyPng = require("@/assets/img/starSky.png");

export default {
  name: "index",
  components: { catClaw },
  data() {
    return {};
  },
  methods: {
    initCanvas() {
      var body = document.getElementsByTagName("body")[0];
      // var width = parseInt(getStyle(body, "width"));
      // var height = parseInt(getStyle(body, "height"));
      var width = parseInt(window.innerWidth);
      var height = parseInt(window.innerHeight);

      var canvas = document.createElement("canvas");
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);

      var container = document.getElementById("canvas");
      container.style.width = width + "px";
      container.style.height = height + "px";
      container.appendChild(canvas);

      var ctx = canvas.getContext("2d");
      ctx.width = width;
      ctx.height = height;

      function Ball() {}
      Ball.prototype.draw = function () {
        this.drawTrack(); // 轨迹
        this.drawBall(); // 小球
      };
      Ball.prototype.rotate = function () {
        var ctx = this.ctx;
        var rotAngle = this.rotAngle || 0;
        ctx.save();
        ctx.translate(this.circle[0], this.circle[1]);
        ctx.rotate((rotAngle * Math.PI) / 180);
        ctx.translate(-this.circle[0], -this.circle[1]);
      };
      Ball.prototype.drawTrack = function () {
        var ctx = this.ctx;
        this.rotate();
        ctx.beginPath();
        var ratioX = this.xAxis / this.radius; //这里是用的ball的半径来作为的轨迹半径
        var ratioY = this.yAxis / this.radius;
        ctx.scale(ratioX, ratioY);
        ctx.arc(
          this.circle[0] / ratioX,
          this.circle[1] / ratioY,
          this.radius,
          0,
          2 * Math.PI,
          false
        );
        ctx.restore();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.stroke();
      };
      Ball.prototype.drawBall = function () {
        var ctx = this.ctx;
        this.rotate();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      };

      var circle = [width / 2, height / 2];
      var ballArr = [];
      for (let i = 0; i < 10; i++) {
        var ball = new Ball();
        ball.ctx = ctx;
        ball.rotAngle = 14; //坐标系倾度
        ball.circle = circle; //围绕运动的(轨迹)圆心
        ball.radius = i == 0 ? 15 : 3 + randomScope(1, 4);
        ball.scale = (i * 2) / 10; //轨迹缩放比例
        ball.color = i == 0 ? "red" : randomColor();
        ball.step = randomScope(4, 6) / 1000; //小球旋转角度步长
        ball.angle = 0 + Math.random() * 20; //围绕轨迹的角度
        ball.xAxis = 450 * ball.scale; //椭圆x半径
        ball.yAxis = 100 * ball.scale; //椭圆y半径
        ballArr.push(ball);
      }

      function Meteor() {}
      Meteor.prototype.init = function () {
        requestAnimationFrame(() => {
          this.init();
        });
        if (this.run) {
          this.move();
          this.draw();
        }
      };
      Meteor.prototype.move = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.endX = this.x - this.dx * this.scale;
        this.endY = this.y - this.dy * this.scale;
        if (this.dx > 0) {
          if (this.dy > 0) {
            if (this.x > ctx.width || this.y > ctx.height) {
              this.x = this.startX;
              this.y = this.startY;
              this.endX = this.x;
              this.endY = this.y;
              this.run = false;
            }
          } else {
            if (this.x > ctx.width || this.y < 0) {
              this.x = this.startX;
              this.y = this.startY;
              this.endX = this.x;
              this.endY = this.y;
              this.run = false;
            }
          }
        } else {
          if (this.dy > 0) {
            if (this.x < 0 || this.y > ctx.height) {
              this.x = this.startX;
              this.y = this.startY;
              this.endX = this.x;
              this.endY = this.y;
              this.run = false;
            }
          } else {
            if (this.x < 0 || this.y < 0) {
              this.x = this.startX;
              this.y = this.startY;
              this.endX = this.x;
              this.endY = this.y;
              this.run = false;
            }
          }
        }
      };
      Meteor.prototype.draw = function () {
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 3;
        var gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.endX,
          this.endY
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.1, "rgba(255,255,255,.3)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = gradient;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
        ctx.restore();
      };
      var meteorArr = [];
      for (var i = 0; i < 300; i++) {
        var meteor = new Meteor();
        meteor.random = Math.random();
        meteor.ctx = ctx;
        meteor.startX = 0;
        meteor.startY = 0;
        meteor.scale = 8;
        if (meteor.random < 0.5) {
          meteor.startX = outerScope(0, ctx.width, 10);
          meteor.startY = randomScope(10, ctx.height - 10);
        } else {
          meteor.startX = randomScope(10, ctx.width - 10);
          meteor.startY = outerScope(0, ctx.height, 10);
        }
        meteor.x = meteor.startX;
        meteor.y = meteor.startY;
        meteor.dx =
          Math.random() < 0.5 ? -1 * randomScope(1, 5) : randomScope(1, 5);
        meteor.dy =
          Math.random() < 0.5 ? -1 * randomScope(1, 5) : randomScope(1, 5);
        meteorArr.push(meteor);
      }

      var imgbg = new Image();
      imgbg.src = starSkyPng;
      var drawStarSky = function (ctx) {
        ctx.save();
        ctx.globalAlpha = "0.8";
        ctx.drawImage(
          imgbg,
          0,
          0,
          imgbg.width,
          imgbg.height,
          0,
          0,
          ctx.width,
          ctx.height
        );
        ctx.restore();
      };
      /* 
        椭圆极坐标公式：
        x=a*cos(θ)
        y=b*cos(θ)
      */
      (function animation() {
        requestAnimationFrame(animation);
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        drawStarSky(ctx); //星空背景
        if (Math.random() < 0.03) {
          let meteor =
            meteorArr[Math.ceil(Math.random() * (meteorArr.length - 1))];
          meteor.run = true;
          meteor.init();
        }
        ballArr.forEach((ball) => {
          ball.x = circle[0] + ball.xAxis * Math.cos(ball.angle);
          ball.y = circle[1] + ball.yAxis * Math.sin(ball.angle);
          ball.angle += ball.step;
          ball.draw(ctx);
        });
      })();
    },
  },
  mounted() {
    this.initCanvas();
  },
};
</script>

<style lang="less" scoped>
</style>