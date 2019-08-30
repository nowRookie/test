<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "about",
  data() {
    return {};
  },
  methods: {},
  created() {
    // 一、类型注解
    let isA: boolean = true;
    // let isB: number = undefined;//文档说undefined和null是所有类型的子类型，但是tslint会报错的！估计是--strictNullChecks的原因
    let num: number = 123;
    let str: string = "string";
    let listA: number[] = [1, 2, 3];
    let listB: Array<string> = ["he", "miss", "you"];
    let listC: ReadonlyArray<string> = ["he", "miss", "you"];
    let un: undefined = undefined;
    let nu: null = null;
    let obj: object = function() {};
    // 元组--已知数量和类型的数组
    let tuple: [number, string] = [1, "me"];
    // 枚举
    enum color {
      red,
      blue = 3,
      green
    }
    let c: string = color[4]; //green
    let d: number = color.blue; //3
    // any--任意类型
    let an: any = null;
    an = "str";
    // void--跟any安全相反，即：不是任意类型，通常用来申明没有返回值的函数。文档说申明变量只能赋值undefined和null
    let vo: void = undefined; //赋值null，tslint会报错！
    function warn(): void {
      console.log("void warn!!");
    }
    // never--永不存在的类型
    // let ne: never =?? //(文档说变量也可能是 never类型，当它们被永不为真的类型保护所约束时)不明白怎么做
    function error(msg: string): never {
      throw new Error(msg);
    }
    function infinite(): never {
      while (true) {}
    }
    // 类型断言--其实就是将类型注解转换(告诉编译器别担心，你知道在干嘛)，两种写法，一种<>，一种as(类型转换只能转换可用的类型，如果是number as string，编译器依然会报错)
    let assertA: number = (<string>an).length;
    let assertB: number = (an as number[]).length; //jsx里只能用as

    // 二、接口
    function imitate(val: { label: string }) {
      console.log(val.label);
    }
    // 定义接口
    interface coordinate {
      x: number;
      y: number;
      z?: string; //可选属性
      readonly r: number; //只读属性
    }
    function dose(axis: coordinate) {
      console.log(axis);
    }
    let _axis = { x: 1, y: 12, r: 10 };
    dose(_axis);
    // 只读数组
    let arrA: number[] = [1, 2, 3];
    let arrB: ReadonlyArray<number> = arrA;
    // arrA[0] = 2; //报错
    let newArr = arrB; //文档说ReadonlyArray不能赋值给普通数组，经测试-能赋值给变量
    // arrA = newArr; //报错
    arrA = arrB as number[]; //可以通过类型断言转换之后赋值
    // 额外的属性检查--typescript会对接口的多余属性检查，如果有未定义的，就会报错
    interface SquareConfig {
      color?: string;
      width: number;
    }
    function createSquare(config: SquareConfig): any {
      throw new Error("error");
    }
    // let mySquare = createSquare({ width: 100, cl: "black" }); //直接传对象会报错（额外属性检查）
    // mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); //通过断言处理，可以正确
    let mm = { width: 100, cl: "black" };
    let mySquare = createSquare(mm); //把对象赋值给变量之后-跳过额外属性检查
    // 添加额外属性
    interface deprecate {
      imitate: number;
      [property: string]: any;
    }
    // 函数类型
  }
});
</script>