<template>
    <div class="app">
        <Menu/>
        <Nuxt />
    </div>
</template>
<script>
import Menu from '../components/Menu/Menu.vue'
export default {
    name: 'Layout',
    components: { Menu },
    mounted () {
        const { $route, $nextTick } = this
        $nextTick(() => {
            this.setBgColor($route)
        })
    },
    methods: {
        setBgColor ({ name }) {
            if (name == 'about') {
                document.querySelector('.app').classList.add('about')
            }
        },
    },
}
</script>
