# Web功能

## 渲染app

![](/vue.png)

::: code-group

```html [index.html]
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```vue [App.vue]
<template>
  <h1>这是一段示范文字</h1>
</template>
```

```js{4} [main.js]
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

:::


![](/react.png)

::: code-group

```html [index.html]
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.jsx"></script>
  </body>
</html>
```

```jsx [App.jsx]
export default function App() {
  return <h1>这是一段示范文字</h1>;
}
```

```jsx{5-9} [main.jsx]
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

:::


## Fetch data

![](/vue.png)

::: code-group

```vue{2-4} [App.vue]
<script setup>
import useFetchUsers from "./useFetchUsers";

const { isLoading, error, data: users } = useFetchUsers();
</script>

<template>
  <p v-if="isLoading">
    正在获取用户信息
  </p>
  <p v-else-if="error">
    获取用户信息出错
  </p>
  <ul v-else-if="users">
    <li
      v-for="user in users"
      :key="user.login.uuid"
    >
      <img
        :src="user.picture.thumbnail"
        alt="user"
      >
      <p>
        {{ user.name.first }}
        {{ user.name.last }}
      </p>
    </li>
  </ul>
</template>
```

```js{4-6,23} [useFetchUsers.js]
import { ref } from "vue";

export default function useFetchUsers() {
  const data = ref();
  const error = ref();
  const isLoading = ref(false);

  async function fetchData() {
    isLoading.value = true;
    try {
      const response = await fetch("https://randomuser.me/api/?results=3");
      const { results: users } = await response.json();
      data.value = users;
      error.value = undefined;
    } catch (err) {
      data.value = undefined;
      error.value = err;
    }
    isLoading.value = false;
  }
  fetchData();

  return { isLoading, error, data };
}
```

:::

![](/react.png)

::: code-group

```jsx{4} [App.jsx]
import useFetchUsers from "./useFetchUsers";

export default function App() {
  const { isLoading, error, data: users } = useFetchUsers();

  return (
    <>
      {isLoading ? (
        <p>正在获取用户信息</p>
      ) : error ? (
        <p>获取用户信息出错</p>
      ) : (
        users && (
          <ul>
            {users.map((user) => (
              <li key={user.login.uuid}>
                <img src={user.picture.thumbnail} alt="user" />
                <p>
                  {user.name.first} {user.name.last}
                </p>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}
```

```js{4-6,25} [useFetchUsers]
import { useEffect, useState } from "react";

export default function useFetchUsers() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("https://randomuser.me/api/?results=3");
        const { results: users } = await response.json();
        setData(users);
        setError();
      } catch (err) {
        setData();
        setError(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { isLoading, error, data };
}
```

:::


## Router link

![](/vue.png)

With Nuxt 3

```vue
<template>
  <ul>
    <li>
      <NuxtLink to="/"> 首页 </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/about"> 关于 </NuxtLink>
    </li>
  </ul>
</template>
```

![](/react.png)

With NextJS

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/">首页</Link>
      </li>
      <li>
        <Link href="/about">关于</Link>
      </li>
    </ul>
  );
}
```



