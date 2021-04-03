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
}
</script>
