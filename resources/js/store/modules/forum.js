import axios from "axios"

const state = {
  channels: [],
  discussions: []
}

const getters = {
  channels: state => state.channels,
  discussions: state => state.discussions
}

const mutations = {
  fetchChannelsSuccess(state, {channels}) {
    state.channels = channels
  }
}

const actions = {
  async fetchChannels({commit}) {
    try {
      const { data } = await axios.get("/api/v1/channels")
      commit("fetchChannelsSuccess",{channels: data})
    } catch (err) {
      console.log(err)
    }
  },
  async storeDiscussion({commit}, data) {
    try {
      await axios.post("/api/v1/discussions", {
        title: data.title,
        content: data.content,
        channel_id: data.channel_id,
        user_id: data.user_id,
        slug: data.slug
      })
      console.log("well done")
    } catch (err) {
      console.log(err)
    }
  }
}

export default  {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
