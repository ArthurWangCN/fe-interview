# 响应式

## 声明
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

## 更新

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

## 计算属性

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