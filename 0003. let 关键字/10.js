var x1 = x1 // ok
let x2 = x2 // ❌ ReferenceError: x2 is not defined

// 上面代码报错，也是因为暂时性死区。
// 使用 let 声明变量时，只要变量在还没有声明完成前使用，就会报错。
// 上面这行就属于这个情况，在变量 x2 的声明语句还没有执行完成前，就去取 x 的值，导致报错“”。