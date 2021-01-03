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
}
</script>
