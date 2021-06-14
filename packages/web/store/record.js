
export const state = () => ({
    article: {}
})

export const mutations = {
    STOREARTICLE (state, article) {
        state.article = article
    }
}

export const actions = {
    saveArticle ( { commit }, currentArticle ) {
        commit('STOREARTICLE', currentArticle)
    }
}