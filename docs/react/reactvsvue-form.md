# 表单

## 文字输入框

![](/vue.png)

```vue
<script setup>
import { ref } from "vue";
const text = ref("这是一段示范文字");
</script>

<template>
  <p>{{ text }}</p>
  <input v-model="text">
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function InputHello() {
  const [text, setText] = useState("这是一段示范文字");

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <>
      <p>{text}</p>
      <input value={text} onChange={handleChange} />
    </>
  );
}
```

## 勾选框

![](/vue.png)

```vue
<script setup>
import { ref } from "vue";

const isAvailable = ref(true);
</script>

<template>
  <input
    id="is-available"
    v-model="isAvailable"
    type="checkbox"
  >
  <label for="is-available">这是一个checkbox</label>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function IsAvailable() {
  const [isAvailable, setIsAvailable] = useState(false);

  function handleChange() {
    setIsAvailable(!isAvailable);
  }

  return (
    <>
      <input
        id="is-available"
        type="checkbox"
        checked={isAvailable}
        onChange={handleChange}
      />
      <label htmlFor="is-available">这是一个checkbox</label>
    </>
  );
}
```

## 单选

![](/vue.png)

```vue
<script setup>
import { ref } from "vue";

const picked = ref("red");
</script>

<template>
  <div>你选择了: {{ picked }}</div>

  <input
    id="blue-pill"
    v-model="picked"
    type="radio"
    value="blue"
  >
  <label for="blue-pill">蓝色</label>

  <input
    id="red-pill"
    v-model="picked"
    type="radio"
    value="red"
  >
  <label for="red-pill">红色</label>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

export default function PickPill() {
  const [picked, setPicked] = useState("red");

  function handleChange(event) {
    setPicked(event.target.value);
  }

  return (
    <>
      <div>你选择了: {picked}</div>

      <input
        id="blue-pill"
        checked={picked === "blue"}
        type="radio"
        value="blue"
        onChange={handleChange}
      />
      <label htmlFor="blue-pill">蓝色</label>

      <input
        id="red-pill"
        checked={picked === "red"}
        type="radio"
        value="red"
        onChange={handleChange}
      />
      <label htmlFor="red-pill">红色</label>
    </>
  );
}
```

## 下拉选择

![](/vue.png)

```vue
<script setup>
import { ref } from "vue";

const selectedColorId = ref(2);

const colors = [
  { id: 1, text: "红" },
  { id: 2, text: "蓝" },
  { id: 3, text: "绿" },
  { id: 4, text: "灰", isDisabled: true },
];
</script>

<template>
  <select v-model="selectedColorId">
    <option
      v-for="color in colors"
      :key="color.id"
      :value="color.id"
      :disabled="color.isDisabled"
    >
      {{ color.text }}
    </option>
  </select>
</template>
```

![](/react.png)

```jsx
import { useState } from "react";

const colors = [
  { id: 1, text: "红" },
  { id: 2, text: "蓝" },
  { id: 3, text: "绿" },
  { id: 4, text: "灰", isDisabled: true },
];

export default function ColorSelect() {
  const [selectedColorId, setSelectedColorId] = useState(2);

  function handleChange(event) {
    setSelectedColorId(event.target.value);
  }

  return (
    <select value={selectedColorId} onChange={handleChange}>
      {colors.map((color) => (
        <option key={color.id} value={color.id} disabled={color.isDisabled}>
          {color.text}
        </option>
      ))}
    </select>
  );
}
```

