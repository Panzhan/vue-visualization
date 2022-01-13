// FilterEmptyData

let BD = require('./BaseData'); // 基础数据源
let DC = require('./DeepClone') // 深拷贝方法

const filterData = (obj)=>{
    for(let item in obj){
        if(typeof obj[item] == 'object' && Object.keys(obj[item]).length){
            filterData(obj[item])
        }
        if((typeof obj[item] == 'object' && !Object.keys(obj[item]).length) || obj[item] === ''){
            delete obj[item] 
        }
    }
}
// test 

// console.log('DC', DC.deepClone.toLocaleString())
// let _objData = DC.deepClone(BD.objData)
// filterData(_objData)
// console.log('_objData', JSON.stringify(_objData))
module.exports = {
    filterData,
}
