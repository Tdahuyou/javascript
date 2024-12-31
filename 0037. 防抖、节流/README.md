# [0037. 防抖、节流](https://github.com/Tdahuyou/javascript/tree/main/0037.%20%E9%98%B2%E6%8A%96%E3%80%81%E8%8A%82%E6%B5%81)


<!-- region:toc -->
- [1. 🔗 leetcode 相关例题](#1--leetcode-相关例题)
- [2. 📒 防抖](#2--防抖)
- [3. 📒 节流](#3--节流)
- [4. 📒 防抖 vs. 节流](#4--防抖-vs-节流)
- [5. 💻 demos.1 - 防抖](#5--demos1---防抖)
- [6. 💻 demos.2 - 节流](#6--demos2---节流)
<!-- endregion:toc -->
- 知识点：
  - 理解防抖
  - 理解节流
  - 完成 leetcode 算法题
- 防抖（debouncing）和节流（throttling）都是用来控制函数调用频率的技术解决方案。
  - ![](assets/2024-12-31-17-34-54.png)

## 1. 🔗 leetcode 相关例题

- https://www.yuque.com/huyouda/leetcode/2627
  - leetcode，实现函数防抖。
- https://www.yuque.com/huyouda/leetcode/2676
  - leetcode，实现函数节流。

## 2. 📒 防抖

- **防抖是什么**
  - 防抖是指短时间内大量触发同一事件，只会在 **最后一次事件完成后** 延迟执行一次函数。
- **防抖的应用场景**
  - 例如，在输入用户名的过程中，需要反复验证用户名。此时应该等待用户停止输入，然后进行验证，否则将影响用户体验及程序性能。
- **防抖的实现**
  - 防抖实现的原理是在每次触发事件后，清空之前的计时器，并重启一个新的计时器。在 delay 时间内，若事件触发多次，只有最有一次的事件会在延迟 delay 时间后被执行。

```javascript
var debounce = function (fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(_ => fn(...args), delay)
  }
};
```

## 3. 📒 节流

- **节流是什么**
  - 可以通过类比来理解“节流”这个词，它就好比未拧紧的水龙头一样，水龙头每隔一段时间就会滴水（节流是每隔一段时间就执行一次函数）。即使在这段时间管道里有更多的水，水龙头也不会掉更多的水。
- **节流的一些细节**
  - 节流是有分类的，可以来思考一个问题：如果我们设定的延迟时间是 50ms，某个事件 fn 在 10ms、30ms 触发，那么这个事件的分别会在什么时刻被执行呢？
- **问：首次触发时，也就是 10ms 时，是否需要执行？**
  - 答：都行，看具体要求。比如 LeetCode 上的题目就要求在首次触发的时候，立刻执行一遍 fn。但是，也有很多时候并不是这么处理的，而是直接采取延迟处理的方式。
  - 其实，防抖也有这么一个首次触发的细节问题，具体要如何处理，看具体的需求而定。不过，首次不触发的情况会更加常见一些。
- **问：在 fn 被触发时（即 10ms 时，记作 fn1），需要进入延迟等待阶段，在这个阶段中再去触发 fn（记作 fn2），这个 fn2 的调用是否需要被记录下来，等上一个阶段的 fn1 调用结束后再调用延迟 50ms 调用 fn2？**
  - 答：还是都行，得看具体要求。
  - 比如 LeetCode 上的题目就要求在要把那些在延迟期间触发的事件以及参数都给记录下来，等待延迟结束后，再拿来执行。
  - 但是，也有很多时候我们会在有计时器的情况下直接 return，不去管那些在 delay 期间触发的事件。
- **节流的实现**
  - 节流的原理是在触发事件后设置计时器。在计时器延迟过程中，即使事件再次触发，计时器的延迟时间也不会改变。在计时器执行功能之前，计时器不会复位。

```javascript
var throttle = function (fn, t) {

  const now = Date.now

  let timer
  let nextTimeToCallFn = 0
  return (...args) => {
    const delay = Math.max(0, nextTimeToCallFn - now())
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      nextTimeToCallFn = now() + t
    }, delay)
  }
}
```

## 4. 📒 防抖 vs. 节流

- **防抖**：确保在一段时间内没有新的事件触发后，才执行一次函数。它适用于用户停止频繁操作后才需要执行函数的场景。
- **节流**：限制函数在一定时间间隔内最多执行一次，适用于高频率触发但希望在指定时间间隔内执行固定次数的场景。
- **应用场景举例**

```javascript
// 【debounce】
// 搜索框输入
// 用户输入时实时搜索，但希望只在用户停止输入后一段时间才发起搜索请求。
input.addEventListener('input', debounce(handleSearch, 300));

// 窗口大小调整
// 用户调整浏览器窗口大小时，重新布局或渲染页面，只在用户停止调整窗口大小后进行操作。
window.addEventListener('resize', debounce(handleResize, 200));

// 表单验证
// 用户输入表单内容时，实时验证但希望只在用户停止输入后进行验证。
input.addEventListener('input', debounce(validateInput, 300));

// 【throttle】
// 滚动事件
// 页面滚动时，每隔一段时间执行一次函数，避免因为高频率滚动事件导致性能问题。
window.addEventListener('scroll', throttle(handleScroll, 100));

// 窗口大小调整
// 用户调整浏览器窗口大小时，每隔一段时间执行一次重新布局或渲染操作。
window.addEventListener('resize', throttle(handleResize, 200));

// 按钮点击
// 防止用户在短时间内多次点击按钮，确保在规定时间内按钮点击事件只触发一次。
button.addEventListener('click', throttle(handleClick, 500));

// 拖拽事件
// 用户拖拽元素时，每隔一段时间更新一次位置，避免频繁计算导致性能问题。
element.addEventListener('drag', throttle(handleDrag, 100));
```

- 根据具体需求选择适合的方法，目的在于解决由于事件高频触发导致的一些类似性能方面的问题。

## 5. 💻 demos.1 - 防抖

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>防抖示例</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      #errTip {
        margin-top: 20px;
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>防抖（Debounce）示例</h1>
    <input type="text" id="inputField" placeholder="输入内容..." />
    <div id="errTip"></div>

    <script>
      function debounce(fn, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
          }, delay || 1000 / 60)
        }
      }

      const inputField = document.getElementById('inputField')
      const errTip = document.getElementById('errTip')

      function handleInput(event) {
        errTip.textContent = `${event.target.value} 不满足要求 ...`
      }

      const debouncedHandleInput = debounce(handleInput, 300)

      inputField.addEventListener('input', debouncedHandleInput)
    </script>
  </body>
</html>
```

- ![](assets/2024-12-31-17-37-47.png)
- 当用户在输入框中输入内容时，输入事件会被防抖函数处理，只有在用户停止输入 300 毫秒后，才会更新显示的内容。这样可以避免频繁的事件触发，提高性能。

## 6. 💻 demos.2 - 节流

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>节流示例</title>
  </head>
  <body>
    <h1>节流（Throttle）示例</h1>
    <p>尝试改变浏览器窗口大小，看看控制台的输出。</p>

    <script>
      // 定义节流函数
      var throttle = function (fn, delay) {
        let lastCall = 0
        return function (...args) {
          const now = Date.now()
          if (now - lastCall >= delay) {
            lastCall = now
            fn.apply(this, args)
          }
        }
      }

      // 使用节流函数包装的函数
      const logWindowSize = throttle(() => {
        console.log(`Window size: ${window.innerWidth} x ${window.innerHeight}`)
      }, 250) // 设置延迟时间为 250 毫秒

      // 添加事件监听器
      window.addEventListener('resize', logWindowSize)
    </script>
  </body>
</html>
```

- ![](assets/2024-12-31-17-38-06.png)

