// RANDOMVERIFICATIONCODE 
const strList = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// 生成随机数
function getRandomNum(list){
    return Math.round(Math.random()*(list.length-1))
}

//获取四个不等随机数，将其当作数组下标，在strList取字符串
function getIndexArr(list, codeLength){
    let indexArr = []
    do{
        let idx = getRandomNum(list)
        if(!indexArr.includes(idx)){
            indexArr.push(idx)
        }
    }
    while(indexArr.length<codeLength)
    return indexArr
}

// 输出字符串, codeLength为输出字符串长度
function outputCode(list, codeLength){
    let resIndexArr = getIndexArr(list, codeLength)
    let resCode = ''
    resIndexArr.forEach(item=>{
        resCode += list[item]
    })
    return resCode
}

let code = outputCode(strList, 6)
console.log('code',code)