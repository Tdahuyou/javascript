const foo = Object.freeze({})
// 如果真的想将对象冻结，应该使用 Object.freeze 方法。

console.log(foo) // {}

foo.prop = 123
// 常规模式时，下面一行不起作用；严格模式时，该行会报错。

console.log(foo) // {}

// 上面代码中，常量 foo 指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。
