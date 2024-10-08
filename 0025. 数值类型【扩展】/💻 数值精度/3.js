console.log(Number.MAX_VALUE) // 1.7976931348623157e+308

// 问：Number.MAX_VALUE 这个值是如何计算出来的呢？
/* `Number.MAX_VALUE` 是由 IEEE 754 双精度浮点数（也称为 double-precision floating-point）表示的最大有限值。了解它的计算方式需要理解 IEEE 754 标准是如何表示浮点数的。

### IEEE 754 双精度浮点数表示法

一个双精度浮点数由 64 位（二进制位）组成，分为三个部分：
1. **符号位**（1 位）
2. **指数位**（11 位）
3. **尾数位**（52 位）

#### 1. 符号位
符号位决定了数值的正负：
- 0 表示正数
- 1 表示负数

#### 2. 指数位
指数位用来表示数值的范围，它是一个无符号整数，采用偏移量（bias）的方式表示。对于双精度浮点数，偏移量是 1023。
- 实际指数值 = 存储的指数值 - 1023

指数位的取值范围是从 0 到 2047（即 11 位二进制数的最大值）。但是，0 和 2047 被保留用于特殊值（如零、无穷大和 NaN），所以有效的指数范围是从 1 到 2046。

#### 3. 尾数位
尾数位（或称为小数部分、有效数字）用来表示数值的精度。双精度浮点数有 52 位尾数位，但实际上它有 53 位精度，因为还有一个隐含的 1 位。

### 计算 `Number.MAX_VALUE`

`Number.MAX_VALUE` 是最大有限数值，它具有以下特性：
- 符号位为 0（表示正数）
- 指数位为 2046（即所有指数位都为 1 除了最低位为 0，表示最大的偏移指数）
- 尾数位为全 1

#### 计算过程
1. **指数部分**：最大指数值是 2046，对应的实际指数值是 2046 - 1023 = 1023。
2. **尾数部分**：尾数部分全为 1，意味着所有 52 位尾数位都是 1，再加上隐含的第 53 位 1，尾数部分为 $1 + (1 - 2^{-52}) = 2 - 2^{-52}$。

结合公式，双精度浮点数的数值表示为：
$$ (-1)^{符号位} \times 2^{指数值} \times 尾数值 $$

对于 `Number.MAX_VALUE`：
- 符号位 = 0（正数）
- 指数值 = 1023
- 尾数值 = 2 - 2^{-52}

所以，`Number.MAX_VALUE` 的值是：
$$ 2^{1023} \times (2 - 2^{-52}) $$
这大约等于：
$$ 1.7976931348623157 \times 10^{308} $$

### 代码验证
我们可以通过 JavaScript 代码来验证这个值：

```javascript
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
```

正如输出所示，`Number.MAX_VALUE` 确实是大约 $1.7976931348623157 \times 10^{308}$，它是由上述的 IEEE 754 双精度浮点数表示法计算出来的。 */