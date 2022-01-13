// SORT
const nums = [12,23,1,44,234,10,3]
function bubbleSort(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-i-1;j++) {
            if (arr[j+1]<arr[j]) {
                let minNum = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = minNum
            }
        }
    }
    return arr
}
const resBubbleSort = bubbleSort(nums)
console.log('resBubbleSort', resBubbleSort)