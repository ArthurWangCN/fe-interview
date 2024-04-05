export const navConst = [
    // { text: 'Home', link: '/' },
    // { text: 'Examples', link: '/markdown-examples' },
    { text: 'HTML/CSS', link: '/html/'},
    // { text: 'CSS', link: '/css/'},
    { text: 'JavaScript', link: '/js/'},
    { text: 'Vue.js', link: '/vue/'},
    { text: 'React', link: '/react/'},
    { text: 'TypeScript', link: '/ts/'},
    { text: '工程化', link: '/engineering/', activeMatch: '/engineering/'},
    { text: '开放题', link: '/open/', activeMatch: '/open/'},
]

export const sidebarConst = {
    '/html/': [{
        text: 'HTML/CSS',
        items: [
            { text: '前端基础', link: '/html/' },
            { text: 'HTML', link: '/html/html' },
            { text: 'CSS', link: '/html/css' }
        ]
    }],
    '/css/': [{
        text: 'CSS',
        items: [
            { text: '基础', link: '/css/' }
        ]
    }],
    '/js/': [{
        text: ' JavaScript',
        items: [
            { text: '基础', link: '/js/' },
            { text: '继承与原型', link: '/js/prototype' },
        ]
    }],
    '/vue/': [{
        text: 'Vue.js',
        items: [
            { text: '基础', link: '/vue/' }
        ]
    }],
    '/react/': [{
        text: 'React',
        items: [
            { text: '基础', link: '/react/' },
            { text: 'React 对比 Vue3', collapsed: true,
                items: [
                    { text: '响应式', link: '/react/reactvsvue-reactive'},
                    { text: '最小模版', link: '/react/reactvsvue-template'},
                    { text: '生命周期', link: '/react/reactvsvue-lifecycle'},
                    { text: '组件组合使用', link: '/react/reactvsvue-component'},
                    { text: '表单', link: '/react/reactvsvue-form'},
                    { text: 'Web功能', link: '/react/reactvsvue-web'}
                ]
            }
        ]
    }],
    '/ts/': [{
        text: 'TypeScript',
        items: [
            { text: '基础', link: '/ts/' }
        ]
    }],
    '/engineering/': [{
        text: '工程化',
        items: [
            { text: '基础', link: '/engineering/' },
            { text: 'Vite', link: '/engineering/vite' },
            { text: 'Webpack', link: '/engineering/webpack' },
        ]
    }],
    '/open/': [{
        text: '开放题',
        items: [
            { text: '基础', link: '/open/' }
        ]
    }],
}