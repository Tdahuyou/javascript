var o1 = {}
var o2 = { bar: 'hello' }

o1.foo = o2
o1.foo.bar // "hello"

// 如果属性的值还是一个对象，就形成了链式引用。
// 上面代码中，对象 o1 的属性 foo 指向对象 o2，就可以链式引用 o2 的属性。
// 有关对象引用的更多细节，请参考《对象的引用》章节。