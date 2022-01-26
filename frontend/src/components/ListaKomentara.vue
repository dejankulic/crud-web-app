<template>
    <div>
        <b-list-group>
            <b-list-group-item
                class="list-item"
                v-for="komentar in komentari"
                :key="komentar.id"
            >
                <div>
                    Ocena: {{ komentar.ocena }}, Ime: {{ komentar.ime }},
                    Komentar: {{ komentar.komentar }}
                </div>
                <b-button
                    variant="primary"
                    v-on:click="editKomentar(komentar.id)"
                    >Izmeni</b-button
                >
                <b-button
                    variant="primary"
                    v-on:click="deleteKomentar(komentar.id)"
                    >Obrisi</b-button
                ></b-list-group-item
            >
        </b-list-group>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../router";

export default {
    name: "Komentari",
    computed: {
        ...mapState(["komentari"]),
    },
    methods: {
        ...mapActions(["getKomentari"]),
        ...mapActions(["deleteKomentar"]),
        editKomentar(id) {
            router.push({ path: `/komentari/${id}` });
        },
    },
    mounted: function() {
        this.getKomentari();
    },
};
</script>

<style></style>
