var a = []
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() // 6

// 如果使用 let，声明的变量仅在块级作用域内有效，最后输出的是 6。

// 上面代码中，变量 i 是 let 声明的，当前的 i 只在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量，所以最后输出的是 6。
// 这里其实用到了 闭包。