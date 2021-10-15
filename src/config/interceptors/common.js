/** 
 * input框判断数组的正则表达式
 * positiveInteger 正整数
 * interger 整数
 * endingof9 结尾为9的正整数
 */
const checkRule = {
    positiveInteger: (value, rule = /^[1-9]\d*$/) => {
        return rule.test(value);
    },
    integer: (value, rule = /^\d+$/) => {
        return rule.test(value);
    },
    endingWidth9: (value, rule = /^(?!(0[0-9]{0,}$))[0-9]{0,}9$/) => {
        return rule.test(value);
    }
}

const checkNumber = (value, ruleType) => {
    return checkRule[ruleType](value);
}

export {
    checkNumber
};
