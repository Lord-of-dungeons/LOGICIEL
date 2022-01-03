<template>
<div id="carousel" v-if="images.length > 0">
    <v-fade-transition>
        <v-carousel cycle show-arrows-on-hover :hide-delimiter-background="$vuetify.breakpoint.mdAndUp">
            <v-carousel-item v-for="(image,i) in images" :key="i" :src="image" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
        </v-carousel>
    </v-fade-transition>
</div>
</template>

<script>

import Vue from 'vue';

export default Vue.extend({
    props: {
        images: {
            type: Array,
            default: () => ([])
        },
        height:{
            type: Number,
            default: 280
        }
    },
    components: {},
    data() {
        return {}
    }
});
</script>

<style></style>
