## 响应式

### 声明

<div style="display: flex; align-items: center;">
    <img src="https://cn.vuejs.org/logo.svg" width="32" height="32" />
    <span style="margin-left: 5px;">Vue3：</span>
</div>

```vue
<script setup>
import { ref } from "vue";
const name = ref("张三");
</script>

<template>
  <h1>你好 {{ name }}</h1>
</template>
```

<div style="display: flex; align-items: center;">
    <img src="https://react.dev/favicon.ico" width="32" height="32" />
    <span style="margin-left: 5px;">react：</span>
</div>

```jsx
import { useState } from "react";

export default function Name() {
  const [name] = useState("张三");

  return <h1>你好 {name}</h1>;
}
```

---

### 更新

<div style="display: flex; align-items: center;">
    <img src="https://cn.vuejs.org/logo.svg" width="32" height="32" />
    <span style="margin-left: 5px;">Vue3：</span>
</div>

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

<div style="display: flex; align-items: center;">
    <img src="https://react.dev/favicon.ico" width="32" height="32" />
    <span style="margin-left: 5px;">react：</span>
</div>

```jsx
import { useState } from "react";

export default function Name() {
  const [name, setName] = useState("张三");
  setName("李四");

  return <h1>你好 {name}</h1>;
}
```




