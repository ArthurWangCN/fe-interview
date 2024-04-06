## 响应式-声明
![](/vue.png)

```vue
<script setup>
import { ref } from "vue";
const name = ref("张三");
</script>

<template>
  <h1>你好 {{ name }}</h1>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function Name() {
  const [name] = useState("张三");

  return <h1>你好 {name}</h1>;
}
```

---

## 响应式-更新

![](/vue.png)

```vue
<script setup>
import { ref } from "vue";
const name = ref("张三");
name.value = "李四";
</script>

<template>
  <h1>你好 {{ name }}</h1>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function Name() {
  const [name, setName] = useState("张三");
  setName("李四");

  return <h1>你好 {name}</h1>;
}
```

---

## 响应式-计算属性

![](/vue.png)

```vue
<script setup>
import { ref, computed } from "vue";
const count = ref(10);
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <div>{{ doubleCount }}</div>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function DoubleCount() {
  const [count] = useState(10);
  const doubleCount = count * 2;

  return <div>{doubleCount}</div>;
}
```

## 模板语法-最小Template

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

## 生命周期-页面加载

![](/vue.png)

```vue
<script setup>
import { ref, onMounted } from "vue";
const pageTitle = ref("");
onMounted(() => {
  pageTitle.value = document.title;
});
</script>

<template>
  <p>页面标题: {{ pageTitle }}</p>
</template>
```

![](/react.png)

```jsx
import { useState, useEffect } from "react";

export default function PageTitle() {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(document.title);
  }, []);

  return <p>页面标题: {pageTitle}</p>;
}
```

## 生命周期-页面卸载

![](/vue.png)

```vue
<script setup>
import { ref, onUnmounted } from "vue";

const time = ref(new Date().toLocaleTimeString());

const timer = setInterval(() => {
  time.value = new Date().toLocaleTimeString();
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <p>当前时间: {{ time }}</p>
</template>
```

![](/react.png)

```jsx
import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <p>当前时间: {time}</p>;
}
```

## props

![](/vue.png)

App.vue

```vue
<script setup>
import UserProfile from "./UserProfile.vue";
</script>

<template>
  <UserProfile
    name="张三"
    :age="20"
    :favourite-colors="['green', 'blue', 'red']"
    is-available
  />
</template>
```

UserProfile.vue

```vue
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
  age: {
    type: Number,
    required: true,
    default: null,
  },
  favouriteColors: {
    type: Array,
    required: true,
    default: () => [],
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<template>
  <p>我的名字是 {{ props.name }}!</p>
  <p>我的年龄是 {{ props.age }}!</p>
  <p>我喜欢的颜色是 {{ props.favouriteColors.join(", ") }}!</p>
  <p>我现在 {{ props.isAvailable ? '离职状态' : '在职' }}</p>
</template>
```

![](/react.png)

App.jsx

```jsx
import UserProfile from "./UserProfile.jsx";

export default function App() {
  return (
    <UserProfile
      name="张三"
      age={20}
      favouriteColors={["green", "blue", "red"]}
      isAvailable
    />
  );
}
```

UserProfile.jsx

```jsx
import PropTypes from "prop-types";

export default function UserProfile({
  name = "",
  age = null,
  favouriteColors = [],
  isAvailable = false,
}) {
  return (
    <>
      <p>我的名字是 {name}!</p>
      <p>我的年龄是 {age}!</p>
      <p>我喜欢的颜色是 {favouriteColors.join(", ")}!</p>
      <p>我现在 {isAvailable ? '离职状态' : '在职'}</p>
    </>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  favouriteColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAvailable: PropTypes.bool.isRequired,
};
```


https://component-party.jason-liang.com/






