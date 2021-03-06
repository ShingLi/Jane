
export const state = () => ({
    clicked: false,
    menuState: false, // 菜单栏展开 or 收起
})

export const mutations = {
    changeClick (state, isAboutClick) {
        state.clicked = isAboutClick
    },
    changeMenuState (state, value) {
        state.menuState = value
    }
}