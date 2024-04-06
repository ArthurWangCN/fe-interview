# 50+Vue经典面试题源码级详解

## 1、Vue组件之间通信方式

组件通信常用方式有以下8种：

- props
- $emit/$on
- $children/$parent
- $attrs/$listeners
- ref
- $root
- eventbus
- vuex

根据组件之间关系讨论组件通信最为清晰有效：

- 父子组件：props/$emit/$parent/ref/$attrs
- 兄弟组件：$parent/$root/eventbus/vuex
- 跨层级关系：eventbus/vuex/provide+inject



## 2、v-if 和 v-for 哪个优先级更高

不应该把v-for和v-if放一起。

在vue2中，v-for的优先级是高于v-if，把它们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件；在vue3中则完全相反，v-if的优先级高于v-for，所以v-if执行时，它调用的变量还不存在，就会导致异常。

通常有两种情况下导致我们这样做：

- 为了过滤列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如 activeUsers)，让其返回过滤后的列表即可（比如users.filter(u=>u.isActive)）。
- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。此时把 v-if 移动至容器元素上 (比如 ul、ol)或者外面包一层template即可。



## 3、Vue 的生命周期

每个Vue组件实例被创建后都会经过一系列初始化步骤，比如，它需要数据观测，模板编译，挂载实例到dom上，以及数据变化时更新dom。这个过程中会运行叫做生命周期钩子的函数，以便用户在特定阶段有机会添加他们自己的代码。

Vue生命周期总共可以分为8个阶段：创建前后, 载入前后, 更新前后, 销毁前后，以及一些特殊场景的生命周期（activated、deactivated、errorCaptured）。

vue3中变更了销毁前后钩子名（beforeUnmount、unmounted），新增了三个用于调试和服务端渲染场景（renderTracked、renderTriggered、serverPrefetch）。

结合实践：

- beforeCreate：通常用于插件开发中执行一些初始化任务
- created：组件初始化完毕，可以访问各种数据，获取接口数据等
- mounted：dom已创建，可用于获取访问数据和dom元素；访问子组件等。
- beforeUpdate：此时view层还未更新，可用于获取更新前各种状态
- updated：完成view层的更新，更新后，所有状态已是最新
- beforeunmount：实例被销毁前调用，可用于一些定时器或订阅的取消
- unmounted：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器

vue2相关源码：

```js
initLifeCycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjection(vm)
initState(vm)
initProvide(vm)
callHook(vm, 'created')
```

vue3相关源码：

```js
export function applyOptions(instance: ComponentInternalInstance) {
    // ....
}
```

::: info

setup中为什么没有beforeCreate和created？

setup最先执行，此时组件实例在setup内部已经创建，所以created的处理对于setup来讲明显在后面，对于开发者来说已经没有意义， 所以setup中没必要再使用beforeCreate和created。官方对 setup 中的 beforeCreate 和 created 给的解释是 not needed，也就是说不需要显式地定义它们。

:::



## 4、双向绑定使用和原理

- vue中双向绑定是一个指令v-model，可以绑定一个响应式数据到视图，同时视图中变化能改变该值。
- v-model是语法糖，默认情况下相当于 `:value` 和 `@input`。
- 通常在表单项上使用v-model，还可以在自定义组件上使用，表示某个值的输入和输出控制。
- v-model用在自定义组件上时，在vue3中它类似于sync修饰符（vue3中已删除），最终展开的结果是**modelValue属性和update:modelValue**事件，可以用参数形式指定多个不同的绑定，例如 `v-model:foo=“xxx”`，相当于 `<my :foo.sync="xxx" />`
- v-model实际上是vue的编译器完成的，包含v-model的模板，转换为渲染函数之后，实际上还是是value属性的绑定以及input事件监听，事件回调函数中会做相应变量更新操作。

渲染函数：

```js
// <input type="text" v-model="foo">
_c('input', { 
  directives: [{ name: "model", rawName: "v-model", value: (foo), expression: "foo" }], 
  attrs: { "type": "text" }, 
  domProps: { "value": (foo) }, 
  on: { 
    "input": function ($event) { 
      if ($event.target.composing) return; 
      foo = $event.target.value 
    } 
  } 
})
```



## 5、Vue中如何扩展一个组件

常见的组件扩展方法有：mixins，slots，extends等

1. 混入mixins是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

   ```js
   const mymixin = {}
   Vue.mixin(mymixin)
   mixins: [mymixin]
   ```

2. 插槽主要用于vue组件中的内容分发，也可以用于组件扩展。

3. 组件选项中还有extends也可以起到扩展组件的目的

   ```js
   { extends: myextends }
   ```

混入的数据和方法**不能明确判断来源且可能和当前组件内变量产生命名冲突**，vue3中引入的composition api，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据，然后在setup选项中组合使用，增强代码的可读性和维护性。



## 6、子组件可以直接改变父组件的数据吗

所有的 prop 都使得其父子之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器控制台中发出警告。

- prop 如果用来传递一个初始值，最好定义一个**本地的 data**，并将这个 prop 用作其初始值；
- prop 如果以一种原始的值传入且需要进行转换，最好使用这个 prop 的值来定义一个**计算属性**。

实践中如果确实想要改变父组件属性应该**emit一个事件**让父组件去做这个变更。



## 7、Vue权限管理该怎么做

权限管理一般需求是**页面权限**和**按钮权限**的管理

具体实现的时候分后端和前端两种方案：

- 前端方案会**把所有路由信息在前端配置**，通过路由守卫要求用户登录，用户**登录后根据角色过滤出路由表**。比如我会配置一个asyncRoutes数组，需要认证的页面在其路由的meta中添加一个roles字段，等获取用户角色之后取两者的交集，若结果不为空则说明可以访问。此过滤过程结束，剩下的路由就是该用户能访问的页面，最后通过router.addRoutes(accessRoutes)方式动态添加路由即可。
- 后端方案会**把所有页面路由信息存在数据库中**，用户登录的时候根据其角色查询得到其能访问的所有页面路由信息返回给前端，前端再通过addRoutes动态添加路由信息

按钮权限的控制通常会实现一个指令，例如**v-permission**，将按钮要求角色通过值传给v-permission指令，在指令的moutned钩子中可以判断当前用户角色和按钮是否存在交集，有则保留按钮，无则移除按钮。

纯前端方案的优点是实现简单，不需要额外权限管理页面，但是维护起来问题比较大，有新的页面和角色需求就要修改前端代码重新打包部署；服务端方案就不存在这个问题，通过专门的角色和权限管理页面，配置页面和按钮权限信息到数据库，应用每次登陆时获取的都是最新的路由信息，可谓一劳永逸！

:::info

服务端返回的路由信息如何添加到路由器中

```js
// 前端组件名和组件映射表
const map = {
  //xx: require('@/views/xx.vue').default // 同步的⽅式
  xx: () => import('@/views/xx.vue') // 异步的⽅式
}
// 服务端返回的asyncRoutes
const asyncRoutes = [
  { path: '/xx', component: 'xx',... }
]
// 遍历asyncRoutes，将component替换为map[component]
function mapComponent(asyncRoutes) {
  asyncRoutes.forEach(route => {
    route.component = map[route.component];
    if(route.children) {
      route.children.map(child => mapComponent(child))
    }
	})
}
mapComponent(asyncRoutes)
```

:::



## 8、对vue响应式的理解

所谓数据响应式就是能够**使数据变化可以被检测并对这种变化做出响应的机制**。

MVVM框架中要解决的一个核心问题是**连接数据层和视图层**，通过数据驱动应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。

以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，开发人员只需要操作数据，关心业务，完全不用接触繁琐的DOM操作，从而大大提升开发效率，降低开发难度。

vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用**Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖数组对象原型的7个变更方法**，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新产生的Map、Set这些数据结构不支持等问题。

为了解决这些问题，vue3重新编写了这一部分的实现：利用**ES6的Proxy代理**要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，第三方的扩展开发起来更加灵活了。

:::info

vue3相关源码：

reactive：

```js
function createReactiveObject() {
  // ...
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy)
  return proxy
}
```

ref:

```js
class RefImpl<T> {
  // ...
  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }
  // ...
}
```

:::



## 9、对虚拟 DOM 的理解

虚拟dom顾名思义就是虚拟的dom对象，它本身就是一个 **JavaScript 对象**，只不过它是**通过不同的属性去描述一个视图结构**。

通过引入vdom我们可以获得如下好处：

1. 将真实元素节点抽象成 VNode，有效减少直接操作 dom 次数，从而提高程序性能
2. 方便实现跨平台（比如：渲染在浏览器是 dom 元素节点，渲染在 Native( iOS、Android) 变为对应的控件、可以实现 SSR 、渲染到 WebGL 中等等）

**vdom如何生成**：在vue中我们常常会为组件编写模板 - template， 这个模板会被编译器 - compiler编译为渲染函数，在接下来的挂载（mount）过程中会调用render函数，返回的对象就是虚拟dom。但它们还不是真正的dom，所以会在后续的patch过程中进一步转化为dom。

挂载过程结束后，vue程序进入更新流程。如果某些响应式数据发生变化，将会引起组件重新render，此时就会生成新的vdom，和上一次的渲染结果diff就能得到变化的地方，从而转换为最小量的dom操作，高效更新视图。



## 10、了解diff算法吗

Vue中的diff算法称为patching算法，它由Snabbdom修改而来，虚拟DOM要想转化为真实DOM就需要通过patch方法转换。

最初**Vue1.x视图中每个依赖均有更新函数对应**，可以做到精准更新，因此并不需要虚拟DOM和patching算法支持，但是这样粒度过细导致Vue1.x无法承载较大应用；**Vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应**，此时就需要**引入patching算法**才能精确找到发生变化的地方并高效更新。

vue中**diff执行的时刻是组件内响应式数据变更触发实例执行其更新函数时**，更新函数会再次执行render函数获得最新的虚拟DOM，然后执行patch函数，并传入新旧两次虚拟DOM，通过比对两者找到变化的地方，最后将其转化为对应的DOM操作。

patch过程是一个递归过程，遵循深度优先、同层比较的策略；以vue3的patch为例：

- 首先判断两个节点是否为相同同类节点，不同则删除重新创建
- 如果双方都是文本则更新文本内容
- 如果双方都是元素节点则递归更新子元素，同时更新元素属性
- 更新子节点时又分了几种情况：
  - 新的子节点是文本，老的子节点是数组则清空，并设置文本；
  - 新的子节点是文本，老的子节点是文本则直接更新文本；
  - 新的子节点是数组，老的子节点是文本则清空文本，并创建新子节点数组中的子元素；
  - 新的子节点是数组，老的子节点也是数组，那么比较两组子节点，更新细节blabla

vue3中引入的更新策略：编译期优化patchFlags、block等

:::info

源码：

```js
const patch: PatchFn = (xxx) {
  // ...
  switch (type) {
    case Text:
        processText(n1, n2, container, anchor)
        break
      case Comment:
        processCommentNode(n1, n2, container, anchor)
        break
      // ...
  }
  // ...
}
```

:::



## 11、你知道哪些vue3新特性

**api层面**Vue3新特性主要包括：Composition API、SFC Composition API语法糖、Teleport传送门、Fragments 片段、Emits选项、自定义渲染器、SFC CSS变量、Suspense

另外，Vue3.0在**框架层面**也有很多亮眼的改进：

- 更快（虚拟DOM重写；编译器优化：静态提升、patchFlags、block等；基于Proxy的响应式系统）
- 更小：更好的摇树优化
- 更容易维护：TypeScript + 模块化
- 更容易扩展：独立的响应化模块；自定义渲染器



## 12、怎么定义动态路由

很多时候，我们需要**将给定匹配模式的路由映射到同一个组件**，这种情况就需要定义动态路由。

例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，例如：{ path: '/users/:id', component: User }，其中:id就是路径参数

路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件中以 **this.$route.params** 的形式暴露出来。

参数还可以有多个，例如/users/:username/posts/:postId；除了 $route.params 之外，$route 对象还公开了其他有用的信息，如 $route.query、$route.hash 等。

:::info

响应路由参数的变化：

使用带有参数的路由时需要注意的是，当用户从 /users/johnny 导航到 /users/jolyne 时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch $route 对象上的任意属性，在这个场景中，就是 $route.params ：

```js
// vue2
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}

// vue3
const User = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    )
  },
}
```

或者，使用 beforeRouteUpdate 导航守卫：

```js
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

:::



## 13、写一个vue路由的思路

**思路分析：**

首先思考vue路由要解决的问题：用户点击跳转链接内容切换，页面不刷新。

- 借助hash或者history api实现url跳转页面不刷新
- 同时监听hashchange事件或者popstate事件处理跳转
- 根据hash值或者state值从routes表中匹配对应component并渲染之

**回答：**

一个SPA应用的路由需要解决的问题是**页面跳转内容改变同时不刷新**，同时路由还需要以插件形式存在，所以：

首先我会定义一个createRouter函数，返回路由器实例，实例内部做几件事：

1. 保存用户传入的配置项
2. 监听hash或者popstate事件
3. 回调里根据path匹配对应路由

将router定义成一个Vue插件，即实现install方法，内部做两件事：

1. 实现两个全局组件：router-link和router-view，分别实现页面跳转和内容显示
2. 定义两个全局变量：$route和$router，组件内可以访问当前路由和路由器实例

```js
export function createRouter(options: RouterOptions): Router {
  // ...
  const router: Router = {
    // ...
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    // ...
    install(app: App) {
        // ... 
    }
  }
  return router
}
```

install方法：

```js
install(app: App) {
  const router = this
  app.component('RouterLink', RouterLink)
  app.component('RouterView', RouterView)

  app.config.globalProperties.$router = router
  Object.defineProperty(app.config.globalProperties, '$route', {
    enumerable: true,
    get: () => unref(currentRoute),
  })
  // ...
}
```



## 14、key的作用

key的作用主要是为了**更高效的更新虚拟DOM**。

vue在patch过程中判断两个节点是否是相同节点是key是一个必要条件，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。

实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

从源码中可以知道，vue判断两个节点是否相同时主要判断两者的key和元素类型等，因此如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。

:::info

源码：

```js
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  if (
    __DEV__ &&
    n2.shapeFlag & ShapeFlags.COMPONENT &&
    hmrDirtyComponents.has(n2.type as ConcreteComponent)
  ) {
    // HMR only: if the component has been hot-updated, force a reload.
    return false
  }
  return n1.type === n2.type && n1.key === n2.key
}
```

:::



## 15、nextTick的使用和原理

nextTick是等待下一次 DOM 更新刷新的工具方法。

Vue有个异步更新策略，意思是如果数据变化，Vue不会立刻更新DOM，而是**开启一个队列，把组件更新函数保存在队列中**，在同一事件循环中发生的所有数据变更**会异步的批量更新**。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用nextTick。

开发时，有两个场景我们会用到nextTick：

- created中想要获取DOM时；
- 响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度。

nextTick签名如下：`function nextTick(callback?: () => void): Promise<void>`

所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以await nextTick()方法返回的Promise之后做这件事。

在Vue内部，nextTick之所以能够让我们看到DOM更新后的结果，是因为我们传入的callback会被添加到队列刷新函数(flushSchedulerQueue)的后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，callback自然能够获取到最新的DOM值。



## 16、watch和computed的区别

1. 计算属性可以从组件数据派生出新数据，最常见的使用方式是设置一个函数，**返回计算之后的结果**，computed和methods的差异是它**具备缓存性**，如果依赖项不变时不会重新计算。侦听器可以侦测某个响应式数据的变化并执行副作用，常见用法是传递一个函数，执行副作用，watch没有返回值，但**可以执行异步操作**等复杂逻辑。
2. 计算属性常用场景是简化行内模板中的复杂表达式，模板中出现太多逻辑会是模板变得臃肿不易维护。侦听器常用场景是状态变化之后做一些额外的DOM操作或者异步操作。选择采用何用方案时首先看是否需要派生出新值，基本能用计算属性实现的方式首选计算属性。
3. 使用过程中有一些细节，比如计算属性也是可以传递对象，成为既可读又可写的计算属性。watch可以传递对象，设置deep、immediate等选项。
4. vue3中watch选项发生了一些变化，例如不再能侦测一个点操作符之外的字符串形式的表达式； reactivity API中新出现了watch、watchEffect可以完全替代目前的watch选项，且功能更加强大。



## 17、Vue 子组件和父组件创建和挂载顺序

父beforeCreate→ 父created→ 父beforeMounte→ 子beforCreate→ 子created→ 子beforeMount→ 父mounted



## 18、怎么缓存当前的组件？缓存后怎么更新？

开发中缓存组件使用keep-alive组件，keep-alive是vue内置组件，keep-alive包裹动态组件component时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

```html
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

结合属性include和exclude可以明确指定缓存哪些组件或排除缓存指定组件。vue3中结合vue-router时变化较大，之前是keep-alive包裹router-view，现在需要反过来用router-view包裹keep-alive：

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```



缓存后如果要获取数据，解决方案可以有以下两种：

- beforeRouteEnter：在有vue-router的项目，每次进入路由的时候，都会执行beforeRouteEnter

  ```js
  beforeRouteEnter(to, from, next){
    next(vm=>{
      console.log(vm)
      // 每次进入路由执行
      vm.getData()  // 获取数据
    })
  },
  ```

- actived：在keep-alive缓存的组件被激活的时候，都会执行actived钩子

  ```js
  activated(){
    this.getData() // 获取数据
  }
  ```

keep-alive是一个通用组件，它内部定义了一个map，缓存创建过的组件实例，它返回的渲染函数内部会查找内嵌的component组件对应组件的vnode，如果该组件在map中存在就直接返回它。由于component的is属性是个响应式数据，因此只要它变化，keep-alive的render函数就会重新执行。



## 19、从0到1自己构架一个vue项目

从0创建一个项目我大致会做以下事情：项目构建、引入必要插件、代码规范、提交规范、常用库和组件

1. 目前vue3项目我会用vite或者create-vue创建项目
2. 接下来引入必要插件：路由插件vue-router、状态管理vuex/pinia、ui库我比较喜欢element-plus和antd-vue、http工具我会选axios
3. 其他比较常用的库有vueuse，nprogress，图标可以使用vite-svg-loader
4. 下面是代码规范：结合prettier和eslint即可
5. 最后是提交规范，可以使用husky，lint-staged，commitlint

目录结构我有如下习惯：

- .vscode：用来放项目中的 vscode 配置
- plugins：用来放 vite 插件的 plugin 配置
- public：用来放一些诸如 页头icon 之类的公共文件，会被打包到dist根目录下
- src：用来放项目代码文件
- api：用来放http的一些接口配置
- assets：用来放一些 CSS 之类的静态资源
- components：用来放项目通用组件
- layout：用来放项目的布局
- router：用来放项目的路由配置
- store：用来放状态管理Pinia的配置
- utils：用来放项目中的工具方法类
- views：用来放项目的页面文件



## 20、总结的vue最佳实践有哪些

我从编码风格、性能、安全等方面说几条：

编码风格方面：

- 命名组件时使用“多词”风格避免和HTML元素冲突
- 使用“细节化”方式定义属性而不是只有一个属性名
- 属性名声明时使用“驼峰命名”，模板或jsx中使用“肉串命名”
- 使用v-for时务必加上key，且不要跟v-if写在一起

性能方面：

- 路由懒加载减少应用尺寸
- 利用SSR减少首屏加载时间
- 利用v-once渲染那些不需要更新的内容
- 一些长列表可以利用虚拟滚动技术避免内存过度占用
- 对于深层嵌套对象的大数组可以使用shallowRef或shallowReactive降低开销
- 避免不必要的组件抽象

安全：

- 不使用不可信模板，例如使用用户输入拼接模板：`template: <div> + userProvidedString + </div>`
- 小心使用v-html，:url，:style等，避免html、url、样式等注入



## 21、简单说一说你对vuex理解？

Vuex 是一个专为 Vue.js 应用开发的**状态管理模式 + 库**。它采用**集中式存储**，管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

我们期待以一种简单的“单向数据流”的方式管理应用，即状态 -> 视图 -> 操作单向循环的方式。但当我们的应用遇到多个组件共享状态时，比如：多个视图依赖于同一状态或者来自不同视图的行为需要变更同一状态。此时单向数据流的简洁性很容易被破坏。因此，我们有必要**把组件的共享状态抽取出来，以一个全局单例模式管理**。通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。这是vuex存在的必要性，它和react生态中的redux之类是一个概念。

Vuex 解决状态管理的同时引入了不少概念：例如state、mutation、action等，是否需要引入还需要根据应用的实际情况衡量一下：如果不打算开发大型单页应用，使用 Vuex 反而是繁琐冗余的，一个简单的 store 模式就足够了。但是，如果要构建一个中大型单页应用，Vuex 基本是标配。

:::info

vuex 为什么要区分 actions 和 mutations？

官方文档说明：

> “在 mutations 中混合异步调用会导致你的程序很难调试。例如，当你能调用了两个包含异步回调的 mutations 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，我们将全部的改变都用同步方式实现。我们将全部的异步操作都放在 Actions 中。”

尤雨溪的回答：

> 区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。

事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutations 就行。**异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutations 必须是同步的这一点**（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。

**同步的意义在于这样每一个 mutations 执行完成后都可以对应到一个新的状态**（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。

如果你开着 devtool 调用一个异步的 actions，你可以清楚地看到它所调用的 mutations 是何时被记录下来的，并且可以立刻查看它们对应的状态。

:::



## 22、从 template 到 render 处理过程

Vue中有个独特的编译器模块，称为“compiler”，它的主要作用是将用户编写的template编译为js中可执行的render函数。

之所以需要这个编译过程是为了便于前端程序员能高效的编写视图模板。相比而言，我们还是更愿意用HTML来编写视图，直观且高效。手写render函数不仅效率底下，而且失去了编译期的优化能力。

在Vue中编译器会先对template进行解析，这一步称为parse，结束之后会得到一个JS对象，我们成为抽象语法树AST，然后是对AST进行深加工的转换过程，这一步成为transform，最后将前面得到的AST生成为JS代码，也就是render函数。

:::info

源码：

```js
export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {
  // ...
  const ast = isString(template) ? baseParse(template, options) : template
  // ...
  transform(ast, xxx )
  return generate(ast, xxx)
}
```

:::



## 23、Vue实例挂载的过程中发生了什么

- 挂载过程指的是app.mount()过程，这个过程中整体上做了两件事：**初始化**和**建立更新机制**
- 初始化会创建组件实例、初始化组件状态，创建各种响应式数据
- 建立更新机制这一步会立即执行一次组件更新函数，这会首次执行组件渲染函数并执行patch将前面获得vnode转换为dom；同时首次执行渲染函数会创建它内部响应式数据之间和组件更新函数之间的依赖关系，这使得以后数据变化时会执行对应的更新函数。

:::info

```ts
mount(
  rootContainer: HostElement,
  isHydrate?: boolean,
  isSVG?: boolean
): any {
  // ...
  const vnode = createVNode(
    rootComponent as ConcreteComponent,
    rootProps
  )
  // ...
  if (isHydrate && hydrate) {
    hydrate(vnode as VNode<Node, Element>, rootContainer as any)
  } else {
    render(vnode, rootContainer, isSVG)
  }
  isMounted = true
  app._container = rootContainer
  // ...
}
```

Render.ts

```ts
const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    flushPreFlushCbs()
    flushPostFlushCbs()
    container._vnode = vnode
  }
```

:::



## 24、Vue 3.0的设计目标是什么，做了哪些优化

Vue3的最大设计目标是替代Vue2，为了实现这一点，Vue3在以下几个方面做了很大改进，如：易用性、框架性能、扩展性、可维护性、开发体验等

1. 易用性方面主要是API简化，比如v-model在Vue3中变成了Vue2中v-model和sync修饰符的结合体，用户不用区分两者不同，也不用选择困难。类似的简化还有用于渲染函数内部生成VNode的h(type, props, children)，其中props不用考虑区分属性、特性、事件等，框架替我们判断，易用性大增。
2. 开发体验方面，新组件Teleport传送门、Fragments 、Suspense等都会简化特定场景的代码编写，SFC Composition API语法糖更是极大提升我们开发体验。
3. 扩展性方面提升如独立的reactivity模块，custom renderer API等
4. 可维护性方面主要是Composition API，更容易编写高复用性的业务逻辑。还有对TypeScript支持的提升。
5. 性能方面的改进也很显著，例如编译期优化、基于Proxy的响应式系统



## 25、Vue性能优化方法

- 最常见的路由懒加载：有效拆分App尺寸，访问时才异步加载
- keep-alive缓存页面：避免重复创建组件实例，且能保留缓存组件状态
- 使用v-show复用DOM：避免重复创建组件
- v-for 遍历避免同时使用 v-if
- v-once和v-memo：不再变化的数据使用v-once；按条件跳过更新时使用v-memo
- 长列表性能优化：如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容
- 事件的销毁：Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。
- 图片懒加载
- 第三方插件按需引入
- 子组件分割策略：较重的状态组件适合拆分
- 服务端渲染/静态网站生成：SSR/SSG



## 26、Vue组件为什么只能有一个根元素

vue2中组件确实只能有一个根，但vue3中组件已经可以多根节点了。

之所以需要这样是因为**vdom是一颗单根树形结构，patch方法在遍历的时候从根节点开始遍历，它要求只有一个根节点**。组件也会转换为一个vdom，自然应该满足这个要求。

vue3中之所以可以写多个根节点，是因为**引入了Fragment的概念**，这是一个抽象的节点，如果发现组件是多根的，就创建一个Fragment节点，把多个根节点作为它的children。将来patch的时候，如果发现是一个Fragment节点，则直接遍历children创建或更新。

:::info

patch方法接收单根vdom：

```js
// 直接获取type等，没有考虑数组的可能性
const { type, ref, shapeFlag } = n2
```

patch方法对Fragment的处理：

```js
mountChildren(n2.children as VNodeArrayChildren, container, ...)
```

:::



## 27、vuex的module

用过module，项目规模变大之后，单独一个store对象会过于庞大臃肿，通过模块方式可以拆分开来便于维护。

可以按之前规则单独编写子模块代码，然后在主文件中通过modules选项组织起来：createStore({modules:{...}})

不过使用时要注意访问子模块状态时需要加上注册时模块名：store.state.a.xxx，但同时getters、mutations和actions又在全局空间中，使用方式和之前一样。如果要做到完全拆分，需要在子模块加上namespace选项，此时再访问它们就要加上命名空间前缀。

很显然，模块的方式可以拆分代码，但是缺点也很明显，就是使用起来比较繁琐复杂，容易出错。而且类型系统支持很差，不能给我们带来帮助。pinia显然在这方面有了很大改进，是时候切换过去了。

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}
const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
store.getters.c // -> moduleA里的getters
store.commit('d') // -> 能同时触发子模块中同名mutation
store.dispatch('e') // -> 能同时触发子模块中同名action
```

---

Pinia没有modules，如果想使用多个store，直接定义多个store传入不同的id即可，如：

```js
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {...});
export const storeB = defineStore("storeB", {...});
export const storeC = defineStore("storeB", {...});
```



## 28、怎么实现路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。利用路由懒加载我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样会更加高效，是一种优化手段。

一般来说，对所有的路由都使用动态导入是个好主意。

给component选项配置一个**返回 Promise 组件的函数就可以定义懒加载路由**。例如：
`{ path: '/users/:id', component: () => import('./views/UserDetails') }`

结合注释 `() => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')` 可以做webpack代码分块
vite中结合rollupOptions

路由中不能使用异步组件

:::info

component (和 components) 配置如果接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。

```ts
if (isRouteComponent(rawComponent)) {
    // __vccOpts is added by vue-class-component and contain the regular options
    const options: ComponentOptions =
      (rawComponent as any).__vccOpts || rawComponent
    const guard = options[guardType]
    guard && guards.push(guardToPromiseFn(guard, to, from, record, name))
  } else {
    // start requesting the chunk already
    let componentPromise: Promise<
      RouteComponent | null | undefined | void
    > = (rawComponent as Lazy<RouteComponent>)()
    // ...
}
```

:::



## 29、ref和reactive异同

- ref接收内部值（inner value）返回响应式Ref对象，reactive返回响应式代理对象
- 从定义上看ref通常用于处理单值的响应式，reactive用于处理对象类型的数据响应式
- 两者均是用于构造响应式数据，但是ref主要解决原始值的响应式问题
- ref返回的响应式数据在JS中使用需要加上.value才能访问其值，在视图中使用会自动脱ref，不需要.value；ref可以接收对象或数组等非原始值，但内部依然是reactive实现响应式；reactive内部如果接收Ref对象会自动脱ref；使用展开运算符(...)展开reactive返回的响应式对象会使其失去响应性，可以结合toRefs()将值转换为Ref对象之后再展开。
- reactive内部使用Proxy代理传入对象并拦截该对象各种操作（trap），从而实现响应式。ref内部封装一个RefImpl类，并设置get value/set value，拦截用户对值的访问，从而实现响应式。

:::info

reactive：

```ts
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  // ...
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy)
  return proxy
}
```

ref:

```ts
class RefImpl<T> {
  // ...
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newVal) {
    // ...
    this._rawValue = newVal
    this._value = useDirectValue ? newVal : toReactive(newVal)
    triggerRefValue(this, newVal)
    // ...
  }
}
```

:::



## 30、watch和watchEffect异同

- watchEffect立即运行一个函数，然后**被动地追踪它的依赖**，当这些依赖改变时重新执行该函数。watch**侦测一个或多个响应式数据源**并在数据源变化时调用一个回调函数。
- watchEffect(effect)是一种特殊watch，传入的函数既是依赖收集的数据源，也是回调函数。如果我们**不关心响应式数据变化前后的值**，只是想拿这些数据做些事情，那么watchEffect就是我们需要的。watch更底层，可以接收多种数据源，包括用于依赖收集的getter函数，因此它完全可以实现watchEffect的功能，同时由于可以指定getter函数，依赖可以控制的更精确，还能获取数据变化前后的值，因此如果需要这些时我们会使用watch。
- watchEffect在使用时，传入的函数会**立刻执行一次**。watch默认情况下并不会执行回调函数，除非我们手动设置immediate选项。
- 从实现上来说，watchEffect(fn)相当于watch(fn,fn,{immediate:true})

:::info

watchEffect定义：

```ts
export function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  return doWatch(effect, null, options)
}
```

watch定义：

```ts
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  return doWatch(source as any, cb, options)
}
```

:::