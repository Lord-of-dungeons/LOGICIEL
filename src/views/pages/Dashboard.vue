<template>
<div id="dashboard" class="pb-10">
    <v-responsive>
        <v-container>
            <v-overlay :absolute="isAbsolute" :opacity="opacity" :value="isOverlay">
                <v-progress-circular color="primary" indeterminate size="80"></v-progress-circular>
            </v-overlay>
            <v-row dense justify="center" align="center" align-content="center">
                <v-col cols="12" md="12" sm="12" class="pb-0">
                    <v-hover v-slot="{ hover }">
                        <base-material-card :kinesisActive="false" :color="hover ? 'green lighten-1' :'green'" max-width="100%" width="auto" :style="hover ? 'filter: drop-shadow(3px 3px 7px green) invert(5%);' : 'filter: opacity(100%);'" class="py-3 mx-auto">
                            <template v-slot:heading>
                                <div class="text-center">
                                    <span class="display-1 font-weight-bold">
                                        <v-icon large left>mdi-map-legend</v-icon>CARD 1
                                    </span>
                                </div>
                            </template>
                        </base-material-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" md="12" sm="12" class="py-0">
                    <v-hover v-slot="{ hover }">
                        <base-material-card :kinesisActive="false" :color="hover ? 'red lighten-1' :'red'" max-width="100%" width="auto" :style="hover ? 'filter: drop-shadow(3px 3px 7px red) invert(5%);' : 'filter: opacity(100%);'" class="py-3 mx-auto">
                            <template v-slot:heading>
                                <div class="text-center">
                                    <span class="display-1 font-weight-bold">
                                        <v-icon large left>mdi-package-variant</v-icon>CARD 2
                                    </span>
                                </div>
                            </template>
                        </base-material-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                    <v-hover v-slot="{ hover }">
                        <base-material-card :kinesisActive="false" :color="hover ? 'indigo lighten-1' : 'indigo'" max-width="100%" width="auto" :style="hover ? 'filter: drop-shadow(3px 3px 7px indigo) invert(5%);' : 'filter: opacity(100%);'" class="py-3 mx-auto">
                            <template v-slot:heading>
                                <div class="text-center">
                                    <span class="display-1 font-weight-bold">
                                        <v-icon large left>mdi-chair-school</v-icon>CARD 3
                                    </span>
                                </div>
                            </template>
                        </base-material-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                    <v-hover v-slot="{ hover }">
                        <base-material-card :kinesisActive="false" :color="hover ? 'pink lighten-1' : 'pink'" max-width="100%" width="auto" :style="hover ? 'filter: drop-shadow(3px 3px 7px pink) invert(5%);' : 'filter: opacity(100%);'" class="py-3 mx-auto">
                            <template v-slot:heading>
                                <div class="text-center">
                                    <span class="display-1 font-weight-bold">
                                        <v-icon large left>mdi-account-group-outline</v-icon>CARD 4
                                    </span>
                                </div>
                            </template>
                        </base-material-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" md="12" sm="12" class="py-0">
                    <v-hover v-slot="{ hover }">
                        <base-material-card :kinesisActive="false" :color="hover ? 'orange lighten-1' :'orange'" max-width="100%" width="auto" :style="hover ? 'filter: drop-shadow(3px 3px 7px orange) invert(5%);' : 'filter: opacity(100%);'" class="py-3 mx-auto">
                            <template v-slot:heading>
                                <div class="text-center">
                                    <span class="display-1 font-weight-bold">
                                        <v-icon large left>mdi-finance</v-icon>CARD 5
                                    </span>
                                </div>
                            </template>
                        </base-material-card>
                    </v-hover>
                </v-col>
                <!--<v-col cols="12" md="12">
                    <v-parallax src="https://zdnet1.cbsistatic.com/hub/i/r/2020/05/11/703e8b53-6149-47dd-9969-f7de6b044b3e/resize/1200xauto/311e6c882043a19e7b68cef0de73456f/apple-music.png" aspect-ratio="1" ></v-parallax>
                    <vuetify-audio file="../../test.mp3" color="success" :ended="audioFinish" downloadable></vuetify-audio>
                </v-col>-->
                <v-col cols="12" md="12">
                    <v-expansion-panels style="z-index: 0" focusable v-model="panel">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="info--text">Calendrier des événements</v-expansion-panel-header>
                            <v-expansion-panel-content class="mb-n9">
                                <Calendar />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
            <v-snackbar shaped v-model="isSnackbarOpened" elevation="24" :color="isSuccess ? 'success' : 'error'" v-filter="'opacity(95%)'">
                <div class="text-center subtitle-1">
                    <v-icon v-if="!isSuccess" color="white" left>mdi-alert-outline</v-icon>
                    <v-icon v-else color="white" left>mdi-checkbox-marked-circle-outline</v-icon>
                    <span>{{ snackbarMessage }}</span>
                </div>
                <template v-slot:action="{ attrs }">
                    <v-btn dark icon @click="isSnackbarOpened = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </v-responsive>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Gestion from "@/mixins/Gestion"
import axiosApi from '@/plugins/axiosApi';
import {
    AxiosResponse,
    AxiosError
} from 'axios';
import moment from 'moment';
import {
    bus
} from "@/main";
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
    Store
} from 'vuex';

export default Vue.extend({
    name: 'Dashboard',
    props: {},
    mixins: [Gestion],
    components: {
        Calendar: () => import('@/views/pages/Calendar.vue'),
        VuetifyAudio: () => import('vuetify-audio')
    },
    data: (): any => ({
        panel: 1,
    }),
    created() {
        bus.$on("synchro", () => {
            axiosApi.get("/synchro").then(async (response: AxiosResponse) => {
                if (response) {
                    await this.getData();
                }
            }).catch((error: AxiosError) => {
                this.catchAxios(error)
            }).finally(() => {
                this.isOverlay = false;
            });
        });
    },
    beforeMount() {},
    async mounted() {
        await this.getData();
    },
    computed: {},
    methods: {
        getData: function (): void {
            this.isOverlay = true;
            this.isOverlay = false;
        },
    }
});
</script>

<style>
</style>
