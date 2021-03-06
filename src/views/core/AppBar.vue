<template>
<v-app-bar style="filter:opacity(99%)" v-scroll="onScroll" tile dense :hide-on-scroll="isHideOnScroll" flat :color="isTransparent ? 'transparent' : $vuetify.theme.dark ? '#424242' : 'primary'" id="app-bar" app :absolute="isAbsolute">
    <v-app-bar-nav-icon @click.stop="setDrawer(!drawer)"></v-app-bar-nav-icon>
    <v-toolbar-title :style="$vuetify.theme.dark ? 'filter: drop-shadow(4px 4px 9px white) invert(5%);' : 'filter: drop-shadow(4px 4px 9px black) invert(10%);'" class="hidden-sm-and-down font-weight-light" v-text="$route.name"></v-toolbar-title>
    <v-spacer class="mx-2"></v-spacer>

    <v-tooltip bottom v-if="$router.history.current.name === 'Accueil'">
        <template v-slot:activator="{ on }">
            <v-btn color="indigo" :disabled="isDisabledSynchro" class="ml-2" min-width="0" v-on="on" @click="synchronisation" text>
                <v-icon :color="$vuetify.theme.dark ? 'info' : 'black'">mdi-cloud-refresh</v-icon>
            </v-btn>
        </template>
        <span>Synchronisation</span>
    </v-tooltip>

    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn class="ml-2" :color="$vuetify.theme.dark ? 'orange' : 'indigo'" min-width="0" v-on="on" @click="$vuetify.theme.dark = !$vuetify.theme.dark;openNotification('top-right', !$vuetify.theme.dark ? 'warn' : 'primary', !$vuetify.theme.dark ? 'Mode Jour' : 'Mode Nuit', '')" text>
                <v-icon color="orange" v-if="$vuetify.theme.dark">mdi-weather-sunny</v-icon>
                <v-icon color="indigo" v-else>mdi-weather-night</v-icon>
            </v-btn>
        </template>
        <span>{{ $vuetify.theme.dark ? 'Mode Jour' : 'Mode Nuit' }}</span>
    </v-tooltip>

    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn class="ml-2" min-width="0" v-on="on" text to="/">
                <v-icon color="anchor">mdi-view-dashboard</v-icon>
            </v-btn>
        </template>
        <span>Accueil</span>
    </v-tooltip>

    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn class="ml-2" min-width="0" v-on="on" text to="/parametres">
                <v-icon>mdi-account-cog-outline</v-icon>
            </v-btn>
        </template>
        <span>Paramètres</span>
    </v-tooltip>

    <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-2" min-width="0" v-on="on" text>
                <v-icon color="anchor">mdi-web</v-icon> {{ $i18n.locale }}
            </v-btn>
        </template>
        <v-list style="cursor:pointer">
            <v-list-item>
                <v-list-item-title @click.prevent="changeLang('fr')"> {{ $t('languageFr') }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title @click.prevent="changeLang('en')"> {{ $t('languageEn') }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn @click="deconnexion" v-on="on" class="ml-2" min-width="0" text color="error">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </template>
        <span>Déconnexion</span>
    </v-tooltip>
</v-app-bar>
</template>

<script lang="ts">
// Utilities
import {
    mapState,
    mapMutations
} from "vuex";
import Vue from 'vue';
import {
    bus
} from "@/main";
import io from 'socket.io-client';
import Gestion from "@/mixins/Gestion"

export default Vue.extend({
    name: "DashboardCoreAppBar",
    data: () => ({
        isDisabledSynchro: false as boolean,
        valueTraitement: 0 as number,
        isProgress: false as boolean,
        isAbsolute: false as boolean,
        isHideOnScroll: false as boolean,
        isTransparent: true as boolean
    }),
    mixins: [Gestion],
    computed: {
        ...mapState(["drawer"])
    },
    components: {},
    beforeMount() {
        this.socketServer()
        if (this.valueTraitement !== 0) this.isProgress = true;
    },
    methods: {
        socketServer: function () {},
        ...mapMutations({
            setDrawer: "SET_DRAWER"
        }),
        deconnexion: async function () {
            await this.logOut();
            this.$router.push({
                name: "Connexion",
                //params: {},
            });
        },
        synchronisation: function () {
            this.isDisabledSynchro = true;
            bus.$emit("synchro");
            this.openNotification('top-right', 'primary', 'Synchronisation', 'La synchronisation est en cours d\'exécution')
            setTimeout(() => {
                this.isDisabledSynchro = false;
            }, 7500);
        },
        onScroll: function () {
            this.isTransparent = window.pageYOffset < 25
        },
        changeLang: function (lang: string) {
            this.$i18n.locale = lang
            this.$vuetify.lang.current = lang
            /*this.$router.push({
                params: {
                    lang: lang
                }
            })*/
        }
    }
});
</script>
