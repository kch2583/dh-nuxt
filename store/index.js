import axios from "axios";

export const strict = false;
export const state = () => ({
  authUser: null
});

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user;
  }
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit("SET_USER", req.session.authUser);
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password
      });
      commit("SET_USER", data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("아이디나 비밀번호가 틀렸습니다.");
      }
      throw error;
    }
  },

  async logout({ commit }) {
    await axios.post("/api/logout");
    commit("SET_USER", null);
  }
};
