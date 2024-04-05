# 生命周期

## 页面加载

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

## 页面卸载

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
