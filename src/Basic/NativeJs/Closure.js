// CLOSURE
// 闭包

// 理论上的闭包
// MDN定义闭包: 闭包是指那些能够访问自由变量的函数
// 自由变量: 在函数中使用，但既不是函数参数，也不是函数局部变量的变量
// 闭包: 函数 + 函数能访问的自由变量

var a = 1
function foo() {
    console.log(a)
}
foo()

// 实践角度讲闭包
// 创建他的上下文已经销毁，他仍然存在（内部函数从父函数中返回）
// 在代码中引用了自由变量
var scope = 'global scope'
function checkscope() {
    var scope = 'local scope'
    function f() {
        return scope
    }
    return f
}

var foo = checkscope()
foo()