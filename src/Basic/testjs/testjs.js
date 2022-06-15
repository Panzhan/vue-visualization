var arr = [1,2,3,4,7,9]
var index = [0,2,5,4,0,4,3,0,4,4,1]
var telephone = ''
for(var i=0;i<index.length;i++){
    telephone += arr[index[i]]
}
console.log(telephone) // 13971741772