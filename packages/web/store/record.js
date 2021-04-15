
export const state = () => ({
    scrollTop: 0
})

export const mutations = {
    setScrollTop (state, distance) {
        state.scrollTop = distance
    }
}