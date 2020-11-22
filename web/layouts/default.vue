<template>
    <div class="app">
        <Nuxt />
    </div>
</template>
<script>
export default {
    name: 'Layout',
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
