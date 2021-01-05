
export const state = () => ({
    clicked: false,
})

export const mutations = {
    changeClick (state, isAboutClick) {
        state.clicked = isAboutClick
    }
}