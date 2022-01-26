import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        komentari: [],
    },

    mutations: {
        setKomentari: function(state, komentari) {
            state.komentari = komentari;
        },

        newKomentar: function(state, komentar) {
            state.komentari.push(komentar);
        },

        removeKomentar: function(state, id) {
            for (let i = 0; i < state.komentari.length; i++) {
                if (state.komentari[i].id === id) {
                    state.komentari.splice(i, 1);
                    break;
                }
            }
        },

        updateKomentar: function(state, payload) {
            for (let i = 0; i < state.komentari.length; i++) {
                if (state.komentari[i].id === parseInt(payload.id)) {
                    state.komentari[i].ime = payload.novi.ime;
                    state.komentari[i].komentar = payload.novi.komentar;
                    state.komentari[i].ocena = payload.novi.ocena;
                    break;
                }
            }
        },
    },

    actions: {
        getKomentari: function({ commit }) {
            fetch("http://localhost:8000/api/komentari", { method: "get" })
                .then((response) => {
                    if (!response.ok) throw response;

                    return response.json();
                })
                .then((jsonData) => {
                    commit("setKomentari", jsonData);
                })
                .catch((error) => {
                    if (typeof error.text === "function")
                        error.text().then((errorMessage) => {
                            console.log(errorMessage);
                        });
                    else console.log(error);
                });
        },

        deleteKomentar: function({ commit }, id) {
            fetch(`http://localhost:8000/api/komentari/${id}`, {
                method: "delete",
            })
                .then((response) => {
                    if (!response.ok) throw response;

                    return response.json();
                })
                .then((jsonData) => {
                    commit("removeKomentar", jsonData.id);
                })
                .catch((error) => {
                    if (typeof error.text === "function")
                        error.text().then((errorMessage) => {
                            console.log(errorMessage);
                        });
                    else console.log(error);
                });
        },

        addKomentar: function({ commit }, novi) {
            fetch("http://localhost:8000/api/komentari", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    komentar: novi.komentar,
                    ime: novi.ime,
                    ocena: novi.ocena,
                }),
            })
                .then((response) => {
                    if (!response.ok) throw response;

                    return response.json();
                })
                .then((jsonData) => {
                    commit("newKomentar", jsonData);
                })
                .catch((error) => {
                    if (typeof error.text === "function")
                        error.text().then((errorMessage) => {
                            console.log(errorMessage);
                        });
                    else console.log(error);
                });
        },

        changeKomentar: function({ commit }, payload) {
            fetch(`http://localhost:8000/api/komentari/${payload.id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.novi),
            })
                .then((response) => {
                    if (!response.ok) throw response;

                    return response.json();
                })
                .then((jsonData) => {
                    commit("updateKomentar", {
                        id: payload.id,
                        novi: jsonData,
                    });
                })
                .catch((error) => {
                    if (typeof error.text === "function")
                        error.text().then((errorMessage) => {
                            console.log(errorMessage);
                        });
                    else console.log(error);
                });
        },
    },
});
