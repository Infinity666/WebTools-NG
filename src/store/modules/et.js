import axios from 'axios';


const state = {
    sections:   []
};

const mutations = {
    UPDATE_SECTIONS(state, payload) {
        state.sections = payload;
      }
};

const actions = {
    fetchSections({ commit, getters }) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:32400/library/sections/all',
            responseType: 'json',
            headers: {
                'Accept':       "application/json",
                'X-Plex-Token': getters.getAuthToken
            }
        }).then((response) => {
            console.log(response.data)
            console.log(response.status)
            console.log(response.data.MediaContainer.Directory)
            
            commit('UPDATE_SECTIONS', response.data)

        }
        ).catch((error) => {
                if (error.response) {                  
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data)
                    console.log(error.response.status)
                    alert(error.response.data.error)
                    //this.danger(error.response.status, error.response.data.error);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            }
        )
    }
}

const getters = {
};

const etModule = {
  state,
  mutations,
  actions,
  getters
}

export default etModule;