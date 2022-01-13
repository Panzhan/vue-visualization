// CLASSIFICATION 
const list = [
    {id:1,type:1,name:'aaaaa'},
    {id:2,type:2,name:'bbbbb'},
    {id:3,type:3,name:'ccccc'},
    {id:4,type:1,name:'ccccc'},
    {id:5,type:3,name:'ccccc'},
    {id:6,type:4,name:'ddddd'},
    {id:7,type:2,name:'ccccc'},
    {id:8,type:3,name:'eeeee'},
    {id:9,type:1,name:'eeeee'},
    {id:10,type:1,name:'bbbbb'},
    {id:11,type:1,name:'fffff'},
    {id:12,type:2,name:'bbbbb'},
    {id:13,type:3,name:'fffff'},
    {id:14,type:1,name:'ccccc'},
    {id:15,type:3,name:'ccccc'},
    {id:16,type:4,name:'ddddd'},
    {id:17,type:2,name:'ccccc'},
    {id:18,type:3,name:'bbbbb'},
    {id:19,type:1,name:'ddddd'},
    {id:20,type:1,name:'aaaaa'},
    {id:21,type:1,name:'ggggg'}
]

// resArrayData = [
//     {"aaaaa":[{"id":1,"type":1,"name":"aaaaa"},{"id":20,"type":1,"name":"aaaaa"}]},
//     {"bbbbb":[{"id":2,"type":2,"name":"bbbbb"},{"id":10,"type":1,"name":"bbbbb"},{"id":12,"type":2,"name":"bbbbb"},{"id":18,"type":3,"name":"bbbbb"}]},
//     {"ccccc":[{"id":3,"type":3,"name":"ccccc"},{"id":4,"type":1,"name":"ccccc"},{"id":5,"type":3,"name":"ccccc"},{"id":7,"type":2,"name":"ccccc"},{"id":14,"type":1,"name":"ccccc"},{"id":15,"type":3,"name":"ccccc"},{"id":17,"type":2,"name":"ccccc"}]},
//     {"ddddd":[{"id":6,"type":4,"name":"ddddd"},{"id":16,"type":4,"name":"ddddd"},{"id":19,"type":1,"name":"ddddd"}]},
//     {"eeeee":[{"id":8,"type":3,"name":"eeeee"},{"id":9,"type":1,"name":"eeeee"}]},
//     {"fffff":[{"id":11,"type":1,"name":"fffff"},{"id":13,"type":3,"name":"fffff"}]},
//     {"ggggg":[{"id":21,"type":1,"name":"ggggg"}]}
// ]

// 拼接原始结构
function statistical(list){
    let obj = {}
    return list.reduce((prev,cur,idx,arr)=>{
        !obj[cur.name] ? (prev.push({[cur.name]: []}) && (obj[cur.name] = true)) : ''
        return prev
    }, [])
}

// 将值push进去
function setArrayData(list){
    const arrayName = statistical(list)
    // 深拷贝解决参数中引用类型数据问题
    let li = JSON.parse(JSON.stringify(list))
    let names = JSON.parse(JSON.stringify(arrayName))
    for(var i=0;i<li.length;i++){
        for(var j=0;j<names.length;j++){
            if(li[i].name == Object.keys(names[j])[0]){
                names[j][Object.keys(names[j])[0]].push(li[i])
            }
        }
    }
    return names
}

function outputArr(){
    const resArrayData = setArrayData(list)
    for(let i = 0;i<resArrayData.length;i++){
        console.log(`${Object.keys(resArrayData[i])[0]}`, resArrayData[i])
    }
}

outputArr()