// structure
// 解构赋值
let BD = require('./BaseData'); // 基础数据源
let DC = require('./DeepClone') // 深拷贝方法
const cloneObj = DC.deepClone(BD.objData)
let obj = {
    "name":"Nocholas",
    "isStudent":false,
    "phone":"",
    "hobbies":[
        {
            "type":"ball",
            "time":"",
            "companion":["bob","li"]
        },
        {
            "type":"swimming",
            "time":"morning",
            "companion":[]
        }
    ],
    "work":{
        "type":"coding",
        "colleagues":[],
        "jd":{}
    }
}

// 变量重新命名，newName 值等于 obj.name
let { name: newName } = obj
console.log('newName', newName)

// 深层解构 & 重新命名 deepNewType 等于 obj.work.type
let { work: { type: deepNewType }} = obj
console.log('deepNewType', deepNewType)

// 深层解构 & 重新命名 & 默认值 deepNewDefaultReword 等于 obj.work.reword
let { work: { reword: deepNewDefaultReword = '123' } }  = obj
console.log('deepNewDefaultReword', deepNewDefaultReword)