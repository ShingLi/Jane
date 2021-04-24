<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'App',
    watch: {
        $route (to, from) {
            document.title = to.meta.title || 'Fang'
        }
    }
}
</script>
