# [0013. 转义符](https://github.com/Tdahuyou/javascript/tree/main/0013.%20%E8%BD%AC%E4%B9%89%E7%AC%A6)


## 📒 notes

- 在普通字符串和模板字符串中，使用 `\\` 来表示一个实际的反斜杠。
- 在正则表达式中，同样使用 `\\` 来表示一个实际的反斜杠。

## 🤖 AI - 在 js 的字符串中，\ 反斜杠表示转义，如何不转义，输入反斜杠呢？

在 JavaScript 中，如果你想要在字符串中包含一个实际的反斜杠（`\`），你需要使用双反斜杠（`\\`）来表示。这是因为单个反斜杠是转义字符，它告诉 JavaScript 解释器接下来的字符应该被特殊处理。

### 示例

假设你想要创建一个包含路径的字符串，这个路径中包含了反斜杠。你可以这样做：

```javascript
const path = "C:\\Users\\Username\\Documents\\file.txt";
console.log(path); // 输出: C:\Users\Username\Documents\file.txt
```

在这个例子中，每一个 `\\` 都会被解释为一个单独的反斜杠。

### 使用模板字符串

如果你使用的是 ES6 的模板字符串（用反引号 `` ` `` 包围的字符串），你也可以使用相同的双反斜杠来表示一个实际的反斜杠：

```javascript
const path = `C:\\Users\\Username\\Documents\\file.txt`;
console.log(path); // 输出: C:\Users\Username\Documents\file.txt
```

### 特殊情况

如果你需要在正则表达式中包含反斜杠，也需要使用双反斜杠：

```javascript
const regex = /C:\\Users\\Username\\Documents\\file\.txt/;
console.log(regex); // 输出: /C:\\Users\\Username\\Documents\\file\.txt/
```

在这个例子中，每个 `\` 都需要被转义，因为正则表达式本身也使用反斜杠作为转义字符。

### 总结

- 在普通字符串和模板字符串中，使用 `\\` 来表示一个实际的反斜杠。
- 在正则表达式中，同样使用 `\\` 来表示一个实际的反斜杠。

通过这种方式，你可以确保在字符串中正确地包含反斜杠而不被当作转义字符处理。