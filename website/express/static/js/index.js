var add = importScripts("http://23.13.5.222:8000/js/add.js")
console.log(add)
this.addEventListener("message", (event) => {
    var data = event.data
    console.log("data:::", data)
    var result = []
    for (var i = 0; i < data.name.length; i++) {
        result.push({ key: data.name[i], index: i })
    }
    this.postMessage(result)
})

this.addEventListener("error", err => {
    console.log(err)
})