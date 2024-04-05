# 组件组合使用

## props

![](/vue.png)

::: code-group

```vue [App.vue]
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

```vue [UserProfile.vue]
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

:::

![](/react.png)

::: code-group

```jsx [App.jsx]
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

```jsx [UserProfile.jsx]
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

:::


## Emit事件

![](/vue.png)

::: code-group

```vue [App.vue]
<script setup>
import { ref } from "vue";
import AnswerButton from "./AnswerButton.vue";

let happy = ref(true);

function onAnswerNo() {
  happy.value = false;
}

function onAnswerYes() {
  happy.value = true;
}
</script>

<template>
  <p>你快乐吗?</p>
  <AnswerButton
    @yes="onAnswerYes"
    @no="onAnswerNo"
  />
  <p style="font-size: 50px">
    {{ happy ? "😀" : "😥" }}
  </p>
</template>
```

```vue [AnswerButton.vue]
<script setup>
const emit = defineEmits(["yes", "no"]);

function clickYes() {
  emit("yes");
}

function clickNo() {
  emit("no");
}
</script>

<template>
  <button @click="clickYes">
    是的！
  </button>

  <button @click="clickNo">
    不是！
  </button>
</template>
```

:::


![](/react.png)

::: code-group

```jsx [App.jsx]
import { useState } from "react";
import AnswerButton from "./AnswerButton.jsx";

export default function App() {
  const [happy, setHappy] = useState(true);

  function onAnswerNo() {
    setHappy(false);
  }

  function onAnswerYes() {
    setHappy(true);
  }

  return (
    <>
      <p>你快乐吗?</p>
      <AnswerButton onYes={onAnswerYes} onNo={onAnswerNo} />
      <p style={{ fontSize: 50 }}>{happy ? "😀" : "😥"}</p>
    </>
  );
}
```

```jsx [AnswerButton.jsx]
import PropTypes from "prop-types";

export default function AnswerButton({ onYes, onNo }) {
  return (
    <>
      <button onClick={onYes}>是的！</button>

      <button onClick={onNo}>不是！</button>
    </>
  );
}

AnswerButton.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
};
```

:::


## Slot

![](/vue.png)

::: code-group

```vue [App.vue]
<script setup>
import FunnyButton from "./FunnyButton.vue";
</script>

<template>
  <FunnyButton> 点我! </FunnyButton>
</template>
```

```vue [FunnyButton.vue]
<template>
  <button
    style="
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 10px 20px;
      font-size: 30px;
      border: 2px solid #fff;
      margin: 8px;
      transform: scale(0.9);
      box-shadow: 4px 4px rgba(0, 0, 0, 0.4);
      transition: transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s;
      outline: 0;
    "
  >
    <slot />
  </button>
</template>
```

:::

![](/react.png)

::: code-group

```jsx [App.jsx]
import FunnyButton from "./FunnyButton.jsx";

export default function App() {
  return <FunnyButton>点我!</FunnyButton>;
}
```

```jsx [FunnyButton.jsx]
import PropTypes from "prop-types";

export default function FunnyButton({ children }) {
  return (
    <button
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0",
      }}
    >
      {children}
    </button>
  );
}

FunnyButton.propTypes = {
  children: PropTypes.node,
};
```

:::


## Slot 内容

![](/vue.png)

::: code-group

```vue [App.vue]
<script setup>
import FunnyButton from "./FunnyButton.vue";
</script>

<template>
  <FunnyButton />
  <FunnyButton> 这是传到slot的内容! </FunnyButton>
</template>
```

```vue [FunnyButton.vue]
<template>
  <button
    style="
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 10px 20px;
      font-size: 30px;
      border: 2px solid #fff;
      margin: 8px;
      transform: scale(0.9);
      box-shadow: 4px 4px rgba(0, 0, 0, 0.4);
      transition: transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s;
      outline: 0;
    "
  >
    <slot>
      <span>默认slot内容</span>
    </slot>
  </button>
</template>
```

:::

![](/react.png)

::: code-group

```jsx [App.jsx]
import FunnyButton from "./FunnyButton.jsx";

export default function App() {
  return (
    <>
      <FunnyButton />
      <FunnyButton>这是传到slot的内容!</FunnyButton>
    </>
  );
}
```

```jsx [FunnyButton.jsx]
import PropTypes from "prop-types";

export default function FunnyButton({ children }) {
  return (
    <button
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0",
      }}
    >
      {children || <span>默认slot内容</span>}
    </button>
  );
}

FunnyButton.propTypes = {
  children: PropTypes.node,
};
```
:::


## 多层级组件通信

![](/vue.png)

::: code-group

```vue{15} [App.vue]
<script setup>
import { ref, provide } from "vue";
import UserProfile from "./UserProfile.vue";

const user = ref({
  id: 1,
  username: "abcdefg",
  email: "abcdefg@example.com",
});

function updateUsername(username) {
  user.value.username = username;
}

provide("user", { user, updateUsername });
</script>

<template>
  <h1>欢迎回来, {{ user.username }}</h1>
  <UserProfile />
</template>
```

```vue{3} [UserProfile.vue]
<script setup>
import { inject } from "vue";
const { user, updateUsername } = inject("user");
</script>

<template>
  <div>
    <h2>我的简介</h2>
    <p>用户名: {{ user.username }}</p>
    <p>邮箱: {{ user.email }}</p>
    <button @click="() => updateUsername('李四')">
      更新用户名为李四
    </button>
  </div>
</template>
```

:::

![](/react.png)

::: code-group

```jsx{4,21-23} [App.jsx]
import { useState, createContext } from "react";
import UserProfile from "./UserProfile";

export const UserContext = createContext();

export default function App() {
  // In a real app, you would fetch the user data from an API
  const [user, setUser] = useState({
    id: 1,
    username: "abcdefg",
    email: "abcdefg@example.com",
  });

  function updateUsername(newUsername) {
    setUser((userData) => ({ ...userData, username: newUsername }));
  }

  return (
    <>
      <h1>欢迎回来, {user.username}</h1>
      <UserContext.Provider value={{ ...user, updateUsername }}>
        <UserProfile />
      </UserContext.Provider>
    </>
  );
}
```

```jsx{5} [UserProfile.jsx]
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function UserProfile() {
  const { username, email, updateUsername } = useContext(UserContext);

  return (
    <div>
      <h2>我的简介</h2>
      <p>用户名: {username}</p>
      <p>邮箱: {email}</p>
      <button onClick={() => updateUsername("李四")}>
        更新用户名为李四
      </button>
    </div>
  );
}
```

:::

