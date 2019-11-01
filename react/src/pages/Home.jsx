import React from "react";
import { HashRouter as Router } from "react-router-dom";
import _ from "lodash";
import { plane, notebook } from "../source/images";

// 优化onresize事件
(function() {
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  throttle("resize", "optimizedResize");
})();
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [], //桌面图标-集合
      isShow: false, //是否显示弹窗
      modalTitle: "弹窗", //弹窗-标题
      modalContent: [] //弹窗-内容
    };
  }
  componentDidMount() {
    let self = this;
    this.getUnits();
    this.grid();
    window.addEventListener("optimizedResize", self.grid.bind(this));
  }
  // 栅格化
  grid() {
    let x = 12; //桌面图标-列数
    let y = 8; //桌面图标-行数
    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    let height =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 50;
    if (1000 < width < 1600) {
      x = 8;
    }
    if (width < 1000) {
      x = 4;
    }
    if (height < 900) {
      y = 5;
    }
    let unitHeight = Math.floor(height / y);
    let unitWidth = Math.floor(width / x);
    let units = this.state.units;
    _.each(units, (item, i) => {
      item.xAxis = Math.ceil((i + 1) / y);
      item.yAxis = (i + 1) % y == 0 ? y : (i + 1) % y;
      item.translateX = (item.xAxis - 1) * unitWidth;
      item.translateY = (item.yAxis - 1) * unitHeight;
    });
    this.setState({
      units: units,
      unitWidth: unitWidth,
      unitHeight: unitHeight
    });
  }
  // 获取桌面图标
  getUnits() {
    setTimeout(() => {
      let units = [
        {
          id: 1,
          title: "学习笔记",
          imgUrl: notebook,
          content: [
            {
              title: "资料篇",
              name: "",
              id: 1,
              path: "/lessons"
            },
            {
              title: "植物篇detail",
              name: "",
              id: 2,
              path: "/detail"
            }
          ]
        },
        {
          id: 2,
          title: "其他资讯",
          imgUrl: plane
        },
        {
          id: 3,
          title: "3",
          imgUrl: plane
        },
        {
          id: 4,
          title: "4",
          imgUrl: plane
        },
        {
          id: 5,
          title: "5",
          imgUrl: plane
        },
        {
          id: 6,
          title: "6",
          imgUrl: plane
        },
        {
          id: 7,
          title: "7",
          imgUrl: plane
        }
      ];
      this.setState(
        {
          units: units
        },
        this.grid.bind(this)
      );
    }, 500);
  }
  // 显示弹窗
  show(data) {
    document.querySelector(".modal").style.opacity = "1";
    document.querySelector(".modal").style.width = "400px";
    document.querySelector(".modal").style.height = "300px";
    document.querySelector(".modal").style.marginLeft = "-200px";
    document.querySelector(".modal").style.marginTop = "-150px";
    this.setState({
      modalTitle: data.title,
      modalContent: data.content ? data.content : []
    });
  }
  // 关闭弹窗
  close() {
    document.querySelector(".modal").style.opacity = "0";
    document.querySelector(".modal").style.width = "0";
    document.querySelector(".modal").style.height = "0";
    document.querySelector(".modal").style.marginLeft = "0";
    document.querySelector(".modal").style.marginTop = "0";
  }
  // 弹窗内容-链接
  linkTo(data) {
    this.props.history.push(data.path);
    // console.log(Router, this.props)
  }
  // 拖动桌面图标
  move(event) {
    event.preventDefault();
    event.persist();
    let unit = event.target.offsetParent;
    unit.style.transition = "0s";
    unit.style.zIndex = 2;
    unit.style.opacity = 0.7;
    console.log(unit.style.top.substr(0, unit.style.top.length - 2));
    let divLeft = unit.style.left; //"160px"
    let divTop = unit.style.top;
    let dx = event.pageX - parseInt(divLeft.substr(0, divLeft.length - 2));
    let dy = event.pageY - parseInt(divTop.substr(0, divTop.length - 2));
    document.onmousemove = function(e) {
      let x = e.pageX;
      let y = e.pageY;
      // let translateX=x-unit.clientWidth/2
      // let translateY=y-unit.clientHeight/2
      console.log(dx, x, x - dx);
      unit.style.top = y - dy + "px";
      unit.style.left = x - dx + "px";
    };
    document.onmouseup = function(e) {
      document.onmousemove = null;
      unit.style.transition = "1s";
      unit.style.zIndex = 0;
      unit.style.opacity = 1;
    };
  }
  // 设置新位置
  newPosition() {
    document.onmousemove = null;
  }
  render() {
    return (
      <div className="home">
        {/* 菜单 */}
        <div className="cf desktop">
          {_.map(this.state.units, (item, i) => {
            return (
              <div
                key={item.id}
                className="tc item"
                onDoubleClick={this.show.bind(this, item)}
                onMouseDown={this.move.bind(this)}
                style={{
                  width: this.state.unitWidth,
                  height: this.state.unitHeight,
                  // transform: `translate(${item.translateX}px, ${item.translateY}px)`
                  top: item.translateY,
                  left: item.translateX
                }}
              >
                <div className="g">
                  <p
                    className="p1"
                    style={{ height: this.state.unitHeight - 14 }}
                  >
                    <img
                      src={item.imgUrl}
                      style={{
                        width: "80%",
                        height: this.state.unitHeight - 24
                      }}
                    />
                  </p>
                  <p className="p2">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* 弹出框 */}
        <div className="oh modal">
          <div className="bb header">
            <span className="fb c3">{this.state.modalTitle}</span>
            <a className="fr close" onClick={this.close}>
              &#xe685;
            </a>
          </div>
          <div className="content">
            {this.state.modalContent.length ? (
              _.map(this.state.modalContent, (item, i) => {
                return (
                  <a
                    className="fl a"
                    key={item.id}
                    onClick={this.linkTo.bind(this, item)}
                  >
                    {item.title}
                  </a>
                );
              })
            ) : (
              <span className="fl a">暂无资料！</span>
            )}
          </div>
          <div className="bt oh tc footer">
            <a className="fl w50 br block">确认</a>
            <a className="fl w50 block">取消</a>
          </div>
        </div>
      </div>
    );
  }
}
