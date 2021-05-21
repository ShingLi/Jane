<template>
    <div id="app">
        <transition name="routerIn" mode="out-in">
            <router-view/>
        </transition>
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
