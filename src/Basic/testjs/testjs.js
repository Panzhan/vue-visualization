let userInfo = {
    item: {
        id: 1,
        name: '',
        info: {
            age: 12,
            phone: ''
        },
        detail: {
            a: [],
            b: 'b',
            c: {}
        }
    },
    isOpen: false,
    address: ''
}

function filterEmpty(obj){
    for(let item in obj){
        if(typeof obj[item] == 'object' && (Object.keys(obj[item]).length)){
            filterEmpty(obj[item])
        }
        if(obj[item] === '' || (typeof obj[item] == 'object' && (!Object.keys(obj[item]).length))){
            delete obj[item]
        }
    }
}
filterEmpty(userInfo)
console.log('userInfo', userInfo)