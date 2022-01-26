<template>
    <div>
        <h3 style="text-align: left">Izmena obaveze</h3>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Ime:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="form.ime"
                    type="text"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Komentar:"
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    v-model="form.komentar"
                    type="text"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Ocena:" label-for="input-3">
                <b-form-input
                    id="input-3"
                    v-model="form.ocena"
                    type="number"
                    required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "komentar",
    data() {
        return {
            form: {
                ime: "",
                komentar: "",
                ocena: null,
            },
            id: this.$route.params.id,
            show: true,
        };
    },
    computed: {
        ...mapState(["komentari"]),
        komentar: function() {
            for (let i = 0; i < this.komentari.length; i++)
                if (this.komentari[i].id === parseInt(this.$route.params.id))
                    return this.komentari[i];
            return null;
        },
    },
    methods: {
        ...mapActions(["changeKomentar"]),
        onSubmit(evt) {
            evt.preventDefault();
            this.changeKomentar({ novi: this.form, id: this.id });
        },
        onReset(evt) {
            evt.preventDefault();
            // Reset our form values
            this.form.ime = "";
            this.form.komentar = "";
            this.form.ocena = null;
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
    },
    mounted: function() {
        this.form.ime = this.komentar.ime;
        this.form.komentar = this.komentar.komentar;
        this.form.ocena = this.komentar.ocena;
    },
};
</script>

<style lang="scss" scoped></style>
