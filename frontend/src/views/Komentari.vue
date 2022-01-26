<template>
    <div>
        <h1 style="margin-bottom: 10px">Komentari za ugostiteljski objekat</h1>
        <ListaKomentara />
    </div>
</template>

<script>
import ListaKomentara from "../components/ListaKomentara";

export default {
    name: "Komentari",
    components: {
        ListaKomentara,
    },
};
</script>

<style lang="scss" scoped></style>
