<template>
    <div class="app">
        <Menu/>
        <Nuxt />
    </div>
</template>
<script>
export default {
    name: 'Layout',
    watch: {
        $route (val, oldVal) {
            const { $route, $nextTick } = this
            $nextTick(() => {
                this.setBgColor(val, oldVal)
            })
        }
    },
    methods: {
        setBgColor ({ name }, oldVal) {
            const dom = document.querySelector('.app')
            if (dom.classList.contains(oldVal.name)) {
                dom.classList.remove(oldVal.name)
            }
            dom.classList.add(name)
        },
    },
    head () {
        let scrollBarstyle = {}
        /* 客户端环境并且是window平台优化滚动条样式
        -------------------------- */
        if (process.client && navigator.platform == 'Win32') {
            style = {
                type: 'text/css',
                custom: 'jane',
                cssText: `
                    ::-webkit-scrollbar {
                        width: 7px;
                        height: 7px;
                        background-color:#f5f5f5;
                        border-radius: 20px;
                    }

                    ::-webkit-scrollbar-thumb{
                        border-radius:8px;
                        background-color:#aaa;
                        box-shadow:inset 0 0 6px rgba(0,0,0,.3);
                    }

                    ::-webkit-scrollbar-thumb:hover{
                        background-color:#666;
                    }
                    
                    body {
                        overflow-x: hidden;
                    }
                `
            }
        }
        
        return {
            style: [ scrollBarstyle ]
        }
    }
}
</script>
