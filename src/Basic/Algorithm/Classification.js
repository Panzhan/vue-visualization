// CLASSIFICATION 
const list = [
    {id:1,type:1,name:'aaa'},
    {id:2,type:2,name:'bbb'},
    {id:3,type:3,name:'ccc'},
    {id:4,type:1,name:'ccc'},
    {id:5,type:3,name:'ccc'},
    {id:6,type:4,name:'ddd'},
    {id:7,type:2,name:'ccc'},
    {id:8,type:3,name:'eee'},
    {id:9,type:1,name:'eee'},
    {id:10,type:1,name:'bbb'},
    {id:11,type:1,name:'fff'},
    {id:12,type:2,name:'bbb'},
    {id:13,type:3,name:'fff'},
    {id:14,type:1,name:'ccc'},
    {id:15,type:3,name:'ccc'},
    {id:16,type:4,name:'ddd'},
    {id:17,type:2,name:'ccc'},
    {id:18,type:3,name:'bbb'},
    {id:19,type:1,name:'ddd'},
    {id:20,type:1,name:'aaa'},
    {id:21,type:1,name:'ggg'}
]

// resArrayData = [
//     {"aaa":[{"id":1,"type":1,"name":"aaa"},{"id":20,"type":1,"name":"aaa"}]},
//     {"bbb":[{"id":2,"type":2,"name":"bbb"},{"id":10,"type":1,"name":"bbb"},{"id":12,"type":2,"name":"bbb"},{"id":18,"type":3,"name":"bbb"}]},
//     {"ccc":[{"id":3,"type":3,"name":"ccc"},{"id":4,"type":1,"name":"ccc"},{"id":5,"type":3,"name":"ccc"},{"id":7,"type":2,"name":"ccc"},{"id":14,"type":1,"name":"ccc"},{"id":15,"type":3,"name":"ccc"},{"id":17,"type":2,"name":"ccc"}]},
//     {"ddd":[{"id":6,"type":4,"name":"ddd"},{"id":16,"type":4,"name":"ddd"},{"id":19,"type":1,"name":"ddd"}]},
//     {"eee":[{"id":8,"type":3,"name":"eee"},{"id":9,"type":1,"name":"eee"}]},
//     {"fff":[{"id":11,"type":1,"name":"fff"},{"id":13,"type":3,"name":"fff"}]},
//     {"ggg":[{"id":21,"type":1,"name":"ggg"}
// ]

// 拼接原始结构
function statistical(list){
    let obj = []
    return list.reduce((prev,cur,idx,arr)=>{
        !obj[cur.name] ? (prev.push({[cur.name]: []}) && (obj[cur.name] = true)) : ''
        return prev
    }, [])
}
const arrayName = statistical(list)
console.log('arrayName', arrayName)

// 将值push进去
function setArrayData(list, arrayName){
    // 深拷贝解决参数中引用类型数据问题
    let _list = JSON.parse(JSON.stringify(list))
    let _arrayName = JSON.parse(JSON.stringify(arrayName))
    for(var i=0;i<_list.length;i++){
        for(var j=0;j<_arrayName.length;j++){
            if(_list[i].name == Object.keys(_arrayName[j])[0]){
                _arrayName[j][Object.keys(_arrayName[j])[0]].push(_list[i])
            }
        }
    }
    return _arrayName
}

const resArrayData = setArrayData(list, arrayName)

console.log('resArrayData', JSON.stringify(resArrayData))