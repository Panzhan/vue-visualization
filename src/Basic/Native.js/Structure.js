// structure
// 解构赋值
let obj = {
    data: {
        data: {
            cites: [1, 2, 3]
        }
    }
}

// 变量重新命名，res 值等于 obj.data
let { data: res } = obj
console.log('res', res)

// 深层解构 deepres 等于 obj.data.data
let {data:{data: deepres}} = obj
console.log('deepres', deepres)

// 深层解构&默认值 
let {data:{data1: ddres=[]}}  = obj
console.log('ddres', ddres)