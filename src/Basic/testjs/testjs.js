const arr = [
    {
        id: 1,
        name: 'aaa'
    },
    {
        id: 2,
        name: 'bbb'
    }
]

const res = arr.findIndex((it,idx,arr)=>
    it.id == 2
)
console.log('res', res)