# TypeScript

## 什么是 TypeScript？

TypeScript 是一种由 Microsoft 开发的开源编程语言，它是 JavaScript 的一个**超集**，可以编译成纯 JavaScript。与 JavaScript 相比，TypeScript 引入了**静态类型、类、接口**等概念，以提供更好的代码可维护性、类型检查和开发体验。



## TypeScript 的优势是什么？

- `静态类型检查`： TypeScript 允许声明变量、函数等的类型，从而在开发过程中捕获潜在的类型错误。
- `代码可读性`： 明确的类型声明使代码更易读懂和维护。
- `智能感知`： TypeScript 提供了更好的 IDE 智能感知，增强了代码自动完成和提示功能。
- `重构支持`： 类型信息可以帮助 IDE 在重构代码时更准确地识别变量和函数引用。
- `代码提示`： 使用 TypeScript，您可以在开发过程中获得更多的代码提示和文档。



## TypeScript数据类型

在TypeScript中，常见的数据类型包括以下几种：

- **基本类型**：
  - `number`: 表示数字，包括整数和浮点数。
  - `string`: 表示文本字符串。
  - `boolean`: 表示布尔值，即`true`或`false`。
  - `null`、`undefined`: 分别表示null和undefined。
  - `symbol`: 表示唯一的、不可变的值。
- **复合类型**：
  - `array`: 表示数组，可以使用`number[]`或`Array<number>`来声明其中元素的类型。
  - `tuple`: 表示元组，用于表示固定数量和类型的数组。
  - `enum`: 表示枚举类型，用于定义具名常量集合。
- **对象类型**：
  - `object`: 表示非原始类型，即除number、string、boolean、symbol、null或undefined之外的类型。
  - `interface`: 用于描述对象的结构，并且可以重复使用。
- **函数类型**：
  - `function`: 表示函数类型。
  - `void`: 表示函数没有返回值。
  - `any`: 表示任意类型。
- **高级类型**：
  - `union types`: 表示一个值可以是几种类型之一。
  - `intersection types`: 表示一个值同时拥有多种类型的特性。



## 什么是类型断言？

类型断言是一种在编译时告诉编译器变量的实际类型的方式。在 TypeScript 中，类型断言可以使用尖括号语法或者 `as` 关键字。

```ts
// 使用尖括号语法
let someValue: any = "hello";
let strLength: number = (<string>someValue).length;

// 使用 as 关键字
let someValue: any = "hello";
let strLength: number = (someValue as string).length;
```



## 什么是接口（interface）

接口是用于描述对象的形状的结构化类型。它定义了对象应该包含哪些属性和方法。在TypeScript中，接口可以用来约束对象的结构，以提高代码的可读性和维护性。例如：

```ts
interface Person {
    name: string;
    age: number;
}
function greet(person: Person) {
    return `Hello, ${person.name}!`;
}
```



## type 和 interface的区别

1. 声明时，type 后面有 `=`，interface 没有；
2. type 可以描述任何类型组合，interface 只能描述对象结构；
3. interface 可以继承自（extends）interface 或对象结构的 type。type 也可以通过 `&` 做对象结构的继承；
4. 多次声明的同名 interface 会进行声明合并，type 则不允许多次声明；

大多数情况下，我更推荐使用 interface，因为它扩展起来会更方便，提示也更友好。`&` 真的很难用。







## 什么是联合类型和交叉类型

`联合类型`表示一个值可以是多种类型中的一种，而`交叉类型`表示一个新类型，它包含了多个类型的特性。

- 联合类型示例：

  ```ts
  // typescript
  let myVar: string | number;
  myVar = "Hello"; // 合法
  myVar = 123; // 合法
  ```

- 交叉类型示例：

  ```ts
  interface A {
    a(): void;
  }
  interface B {
    b(): void;
  }
  type C = A & B; // 表示同时具备 A 和 B 的特性
  ```

  