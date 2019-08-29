export default function (options) {
  let w = window.clientWidth
  let h = window.clientHeight

  const canvas = options.el ? document.querySelector(options.el) : document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const num = options.num ? options.num : 50;
  const beginNum = options.beginNum ? options.beginNum : 0;

  const snows=[]
}