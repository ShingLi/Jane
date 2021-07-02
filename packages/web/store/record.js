
export const state = () => ({
    scrollTop: 0,
    scrollHeight: 0
})

export const mutations = {
    UPDATE_SCROLL_TOP (state, scrollTop) {
        state.scrollTop = scrollTop
    },
    UPDATE_PAGE_SCROLLHEIGHT (state, scrollHeight) {
        state.scrollHeight = scrollHeight
    }
}

export const actions = {
    
}