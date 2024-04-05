# 模板语法

## 最小Template

![](/vue.png)

```vue
<template>
  <h1>这是一段示范文字</h1>
</template>
```

![](/react.png)

```jsx
export default function HelloWorld() {
  return <h1>这是一段示范文字</h1>;
}
```

## 样式

![](/vue.png)

```vue
<template>
  <h1 class="title">
    我是红色的
  </h1>
  <button style="font-size: 10rem">
    我是一个按钮
  </button>
</template>

<style scoped>
.title {
  color: red;
}
</style>
```

![](/react.png)

```jsx
import "./style.css";

export default function CssStyle() {
  return (
    <>
      <h1 className="title">我是红色的</h1>
      <button style={{ fontSize: "10rem" }}>我是一个按钮</button>
    </>
  );
}
```

## DOM循环

![](/vue.png)

```vue
<script setup>
const colors = ["红", "绿", "蓝"];
</script>

<template>
  <ul>
    <li
      v-for="color in colors"
      :key="color"
    >
      {{ color }}
    </li>
  </ul>
</template>
```

![](/react.png)

```jsx
export default function Colors() {
  const colors = ["红", "绿", "蓝"];
  return (
    <ul>
      {colors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  );
}
```

## 点击事件

![](/vue.png)

```vue
<script setup>
import { ref } from "vue";
const count = ref(0);

function incrementCount() {
  count.value++;
}
</script>

<template>
  <p>计数器: {{ count }}</p>
  <button @click="incrementCount">
    +1
  </button>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <p>计数器: {count}</p>
      <button onClick={incrementCount}>+1</button>
    </>
  );
}
```

## DOM的Ref

![](/vue.png)

```vue
<script setup>
import { ref, onMounted } from "vue";

const inputElement = ref();

onMounted(() => {
  inputElement.value.focus();
});
</script>

<template>
  <input ref="inputElement">
</template>
```

![](/react.png)

```jsx
import { useEffect, useRef } from "react";

export default function InputFocused() {
  const inputElement = useRef(null);

  useEffect(() => inputElement.current.focus(), []);

  return <input type="text" ref={inputElement} />;
}
```

## 条件渲染

![](/vue.png)

```vue
<script setup>
import { ref, computed } from "vue";
const TRAFFIC_LIGHTS = ["红灯", "黄灯", "绿灯"];
const lightIndex = ref(0);

const light = computed(() => TRAFFIC_LIGHTS[lightIndex.value]);

function nextLight() {
  if (lightIndex.value + 1 > TRAFFIC_LIGHTS.length - 1) {
    lightIndex.value = 0;
  } else {
    lightIndex.value++;
  }
}
</script>

<template>
  <button @click="nextLight">
    下一个灯
  </button>
  <p>现在亮着的是: {{ light }}</p>
  <p>
    你应该
    <span v-if="light === '红灯'">停下</span>
    <span v-else-if="light === '黄灯'">慢行</span>
    <span v-else-if="light === '绿灯'">赶紧走</span>
  </p>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

const TRAFFIC_LIGHTS = ["红灯", "黄灯", "绿灯"];

export default function TrafficLight() {
  const [lightIndex, setLightIndex] = useState(0);

  const light = TRAFFIC_LIGHTS[lightIndex];

  function nextLight() {
    if (lightIndex + 1 > TRAFFIC_LIGHTS.length - 1) {
      setLightIndex(0);
    } else {
      setLightIndex(lightIndex + 1);
    }
  }

  return (
    <>
      <button onClick={nextLight}>下一个灯</button>
      <p>现在亮着的是: {light}</p>
      <p>
        你应该
        {light === "红灯" && <span>停下</span>}
        {light === "黄灯" && <span>慢行</span>}
        {light === "绿灯" && <span>赶紧走</span>}
      </p>
    </>
  );
}
```