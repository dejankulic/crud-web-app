<template>
    <div>
        <h3 style="text-align: left">Dodavanje obaveza</h3>
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
import { mapActions } from "vuex";

export default {
    name: "NewTodo",
    data() {
        return {
            form: {
                ime: "",
                komentar: "",
                ocena: null,
            },
            show: true,
        };
    },
    methods: {
        ...mapActions(["addKomentar"]),
        onSubmit(evt) {
            evt.preventDefault();
            this.addKomentar(this.form);
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
};
</script>

<style lang="scss" scoped></style>
