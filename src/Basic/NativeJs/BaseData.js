// basedaba
// 基础数据原

const objData = {
    name: 'Nocholas',
    isStudent: false,
    phone: '',
    hobbies: [
        {
            type: 'ball',
            time: '',
            companion: ['bob', 'li']
        },
        {
            type: 'swimming',
            time: 'morning',
            companion: []
        }
    ],
    work: {
        type: 'coding',
        colleagues: [],
        jd:{}
    }
}

module.exports = {
    objData,
}