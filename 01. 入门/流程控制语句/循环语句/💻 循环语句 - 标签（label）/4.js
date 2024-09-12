// 区块 1
block1: {
  console.log(1)
}

// 区块 2
block2: {
  console.log(2)
  break block1 // 可以 break block2
  // 报错：
  // A 'break' statement can only jump to a label of an enclosing statement.
}