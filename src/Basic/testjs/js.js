function getsize() {
    let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth; //有些浏览器documentElement获取不到,那就使用后面的body
    // 2.获取html标签
    let html = document.getElementsByTagName("html")[0]
    html.style.fontSize = htmlwidth / 375 + 'px';
}
window.onresize = function () {
    getsize()
}
window.onload = function () {
    getsize()
}