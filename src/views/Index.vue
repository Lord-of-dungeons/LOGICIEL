<template>
<v-app>
    <dashboard-core-app-bar v-if="connected != false" />

    <dashboard-core-drawer v-if="connected != false" />

    <dashboard-core-view />
</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    bus
} from "../main";
import Gestion from '@/mixins/Gestion';

export default Vue.extend({
    name: 'Index',
    mixins: [Gestion],
    components: {
        DashboardCoreAppBar: () => import('@/views/core/AppBar.vue'),
        DashboardCoreDrawer: () => import('@/views/core/Drawer.vue'),
        DashboardCoreView: () => import('@/views/core/View.vue'),
    },
    data: () => ({
        connected: true as boolean,
    }),
    computed: {},
    created() {
        //console.log(navigator)
        this.$vuetify.theme.dark = new Date().getHours() >= 21 || new Date().getHours() <= 9 ? true : false;
        bus.$on("connected", (data: boolean) => {
            this.connected = data;
        });
    },
    async beforeMount() {
        setTimeout(async () => {
            await this.getOwnUserData();
        }, 250);
    },
    methods: {}
});
</script>
