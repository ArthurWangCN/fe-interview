## 响应式

### 声明
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

### 更新

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

### 计算属性

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

## 模板语法

### 最小Template

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

