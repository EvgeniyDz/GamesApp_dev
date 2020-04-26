// initial state
const state = {
  games: [],
}

// getters
const getters = {
  favoritesCount: state => {
    return state.games.length
  },
  favoritesIds: state => {
    const idxs = []
    state.games.forEach(item => idxs.push(item.id))
    return idxs
  },
}

// actions
const actions = {
  addGameToFavorite ({ state, commit }, product) {
    const sroreItem = state.games.filter(item => item.id === product.id)
    if (sroreItem.length === 0) {
      commit('pushGameToFavorite', { game: product })
    } else {
      commit('removeGameFromFavorite', { id: product.id })
    }
  },
}

// mutations
const mutations = {
  pushGameToFavorite (state, { game }) {
    state.games.push({
      ...game,
    })
  },

  removeGameFromFavorite (state, { id }) {
    state.games = state.games.filter(item => item.id !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
