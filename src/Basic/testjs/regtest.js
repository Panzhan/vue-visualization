var reg = /^[a-zA-Z][0-9A-Z\-\/\.]{0,10}/
var rreegg = /^[A-Za-z](?=.*\d)(?=.*[a-zA-Z])(?=.*[-\.\/])[\da-zA-Z-\.\/]{1,10}$/
var testdata = 'www?1'
var res = reg.test(testdata)
console.log(res)