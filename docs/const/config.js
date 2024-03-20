export const navConst = [
    { text: 'Home', link: '/' },
    { text: 'Examples', link: '/markdown-examples' },
    { text: 'HTML', link: '/html/'},
    { text: 'CSS', link: '/css/'},
    { text: 'JavaScript', link: '/js/'},
    { text: 'Vue.js', link: '/vue/'},
    { text: 'React', link: '/react/'},
    { text: 'TypeScript', link: '/ts/'},
    { text: '工程化', link: '/engineering/', activeMatch: '/engineering/'},
]

export const sidebarConst = {
    '/html/': [{
        text: 'HTML',
        items: [
            { text: '基础', link: '/html/' }
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
            { text: '原型和原型链', link: '/js/prototype' },
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
            { text: '基础', link: '/react/' }
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
            { text: 'Vite', link: '/engineering/vite' }
        ]
    }],
}