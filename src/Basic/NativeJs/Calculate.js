// RORO: 即函数的参数和返回值都为单个对象
// 参数命名
// 简化默认参数
// 丰富你的返回值
// 函数组合更简单

// 小数点位数获取
const getDecimalLength = ({ x, y } = {}) => {
    let lx, ly, lmax
    try {
        lx = x.toString().split('.')[1].length
    } catch {
        lx = 0
    }
    try {
        ly = y.toString().split('.')[1].length
    } catch {
        ly = 0
    }
    lmax = Math.max(lx, ly)
    return {
        lx, ly, lmax
    }
}
// 加
const addition = ({ x, y } = {}) => {
    const {
        lx = 0,
        ly = 0,
        lmax = 0
    } = getDecimalLength({ x, y })
    return (x * Math.pow(10, lx) + y * Math.pow(10, ly)) / Math.pow(10, lmax)
}
// 减
const subtraction = ({ x, y } = {}) => {
    const {
        lmax = 0
    } = getDecimalLength({ x, y })
    return (x * Math.pow(10, lmax) - y * Math.pow(10, lmax)) / Math.pow(10, lmax)
}
// 乘
const multiplication = ({ x, y }) => {
    const {
        lx = 0,
        ly = 0
    } = getDecimalLength({ x, y })
    return (x * Math.pow(10, lx)) * (y * Math.pow(10, ly)) / Math.pow(10, lx + ly)
}
// 除
const division = ({ x, y } = {}) => {
    const {
        lmax = 0
    } = getDecimalLength({ x, y })
    return (x * Math.pow(10, lmax)) / (y * Math.pow(10, lmax))
}
// 保留n位小数
const intercept = ({ resources, digits } = {}) => {
    const {
        lx = 0
    } = getDecimalLength({ x: resources })
    if (lx == digits) {
        return resources
    }
    if (lx < digits) {
        for (let i = 0; i < digits - lx; i++) {
            resources += '0'
        }
        return resources
    }
    if (lx > digits) {
        let result = resources + ''
        return result.substring(0, result.length - (lx - digits))
    }
}
// let testCalc = [100, 5.55]
// let divisionRes = division({ x: testCalc[0], y: testCalc[1] })
// let interceptRes = intercept({ resources: divisionRes, digits: 3 })
// console.log(interceptRes)

module.exports = {
    getDecimalLength, // 小数点位数获取
    addition, // 加
    subtraction, // 减
    multiplication, // 乘
    division, // 除
    intercept // 保留n位小数
}

