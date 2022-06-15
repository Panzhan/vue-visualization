// PROTOTYPE
// 原型链

const prototyprImg = 'https://cdn.jsdelivr.net/gh/mqyqingfeng/Blog/Images/prototype5.png'
// 构造函数创建对象
function Person() {

}
Person.prototype.name = 'kan'
var person1 = new Person()
var person2 = new Person()
console.log(person1.name) // kan
console.log(person2.name) // kan

// prototyp: 每一个函数都有一个prototype属性，这个属性指向了一个对象，即构造函数创建的实例的原型

// 原型: 每一个javascript对象（null除外）在创建的时候就会与之关联另一个对象，这个对象就是原型，每个对象都会从原型‘继承’属性

// __proto__: 每一个javascript对象（null除外）都具有一个属性，叫做__proto__，这个属性会指向对象的原型

console.log(person1.__proto__ === Person.prototype) // true

// constructor: 每个原型都有一个constructor属性指向关联的构造函数

// Object.getPrototypeOf(obj) ES5获取对象的原型

console.log(Person === Person.prototype.constructor) // true
console.log(person1.__proto__ == Person.prototype) // true
console.log(Object.getPrototypeOf(person1) === Person.prototype) // true

// 实例与原型
var person3 = new Person()
person3.name = 'deft'
console.log(person1.name,person2.name,person3.name) // kan kan deft
delete person3.name

// person实例删除了name属性，找不到，就会沿着 person.__proto__, 即person的原型 查找，找到的就是 Person.prototype, 刚好这个上面有name属性

console.log(person1.name,person2.name,person3.name) // kan kan kan

// 若person.__proto__ 也没有,则会找到 null

console.log(Object.prototype.__proto__ === null) // true

// 当实例person中没有constructor属性时，会沿着 person.__proto__ 从 Person.prototype中读取

console.log(person1.constructor === Person) // true
console.log(person1.constructor === Person.prototype.constructor) // true
console.log(person1.__proto__.constructor === Person.prototype.constructor) // true

// 继承意味着复制，javascript中只是在两个对象之间创建关联，这样一个对象通过委托访问另一个对象的属相和函数，与其说继承，委托更准确