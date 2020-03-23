import addContent from "./addContent"

document.write("My First Webpack app <br>")
document.write("优化打包命令 <br>")
document.write("添加 webpack-dev-server <br>")

let fn = () => {
    console.log("11111");
}
fn()

class A {
    a = 1
}


addContent()

require('./css/index.scss')

import img from "./imgs/timg.jpg"
let image = new Image()
image.src = img
document.body.appendChild(image)

console.log("8888888888");


let xhr = new XMLHttpRequest()
xhr.open('get', '/api/user')
xhr.send()
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
}


