// DEEPCLONE
// 深拷贝数组，对象
let BD = require('./BaseData'); // 基础数据源
const deepClone = (obj)=>{
    if(typeof obj !== 'object') return ;
    // 判断目标类型，来创建返回值
    let resObj = obj.constructor === Array ? [] : {}
    for(let item in obj){
        // 只复制元素自身的属性，不复制原型链上的
        if(obj.hasOwnProperty(item)){
            resObj[item] = typeof obj[item] == 'object' ? deepClone(obj[item]) : obj[item]
        }
    }
    return resObj
}
// test

// let deepCloneData = deepClone(BD.objData)
// deepCloneData.hobbies[0].time = 'afternoon'
// console.log('objData', BD.objData)
// console.log('deepCloneData', deepCloneData)
module.exports = {
    deepClone,
}