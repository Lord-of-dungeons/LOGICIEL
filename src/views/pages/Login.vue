<template>
<v-img style="height:97vh;" :gradient="$vuetify.theme.dark ? 'to top right, rgba(0,0,0,.6), rgba(0,0,0,.6)' : 'to top right, rgba(0,0,0,.2), rgba(0,0,0,.2)'" transition="scale-transition" src="https://picsum.photos/1920/1080?">
    <v-overlay :absolute="isAbsolute" :opacity="opacity" :value="isOverlay">
        <v-progress-circular :color="$vuetify.theme.dark ? 'indigo' : 'primary'" indeterminate size="80"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="isDialogForgotPassword" width="400px" overlay-opacity="0.9">
        <v-card class="px-6" v-filter="'opacity(90%)'">
            <v-card-title class="indigo--text">
                Mot de passe oublié ?
                <v-icon aria-label="Close" class="ml-auto" @click="isDialogForgotPassword = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <div class="text-center">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field :color="$vuetify.theme.dark ? 'indigo' : 'primary darken-1'" label="Email*" v-model.trim="email_reset" prepend-inner-icon="mdi-email-outline" clearable />
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-1" color="error" text @click.prevent="isDialogForgotPassword = false;">Fermer</v-btn>
                <v-btn color="success" text @click="resetPassword(email_reset)">
                    <v-icon left>mdi-check</v-icon> Sauvegarder
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-row justify="center" align-content="center" align="center">
        <v-col cols="12" align-self="center">
            <v-slide-y-transition appear>
                <center>
                    <base-material-card :kinesisType="$vuetify.breakpoint.mdAndUp ? 'depth' : 'scale'" :kinesisStrength="$vuetify.breakpoint.mdAndUp ? 20 : 0.15" v-filter="'opacity(85%)'" :color="$vuetify.theme.dark ? 'indigo' : 'primary'" max-width="100%" width="600" class="px-5 mt-10 py-3">
                        <template v-slot:heading>
                            <div class="text-center">
                                <h1 class="display-1 font-weight-bold">
                                    <v-icon large left>mdi-account-lock</v-icon>
                                    C<v-icon v-if="isActive" color="green" > mdi-emoticon-happy-outline</v-icon>
                                    <v-icon v-else color="red"> mdi-emoticon-sad-outline</v-icon>nnexion
                                </h1>
                            </div>
                        </template>
                        <!--<v-card>-->
                        <v-card-text class="text-center">
                            <v-form ref="form">
                                <v-row dense align="center" align-content="center" justify="center">
                                    <v-col cols="12" class="py-2">
                                        <v-text-field :color="$vuetify.theme.dark ? 'indigo' : 'primary darken-1'" @keyup.enter="connexion(auth.email, auth.password)" label="Adresse email" v-model="auth.email" prepend-icon="mdi-alphabetical" clearable />
                                    </v-col>
                                    <v-col cols="12" class="py-2">
                                        <v-text-field :color="$vuetify.theme.dark ? 'indigo' : 'primary darken-1'" @keyup.enter="connexion(auth.email, auth.password)" label="Mot de passe" v-model="auth.password" prepend-icon="mdi-lock-outline" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" clearable />
                                    </v-col>
                                    <v-col cols="12" class="py-2">
                                        <span @click="isDialogForgotPassword = true" style="cursor: pointer">Mot de passe oublié ?</span>
                                    </v-col>
                                </v-row>
                                <v-badge bordered :color="isActive ? 'primary' : 'grey'" icon="mdi-lock-open-outline" overlap>
                                    <v-btn dark rounded :disabled="!isActive" :color="$vuetify.theme.dark ? 'indigo' : 'primary'" @click="connexion(auth.email, auth.password)">
                                        <v-icon left>mdi-check-circle-outline</v-icon>
                                        <span>Connexion</span>
                                    </v-btn>
                                </v-badge>
                            </v-form>
                        </v-card-text>
                        <!--</v-card>-->
                        <!--<router-link to="register" class="indigo--text">Inscription</router-link>-->
                    </base-material-card>
                </center>
            </v-slide-y-transition>
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
</v-img>
</template>

<script lang="ts">
import Vue, {
    VNode
} from 'vue';
import {
    bus
} from "@/main";
import axiosApi from "@/plugins/axiosApi";
import qs from "qs";
import {
    AxiosResponse
} from 'axios';
import Gestion from "@/mixins/Gestion"
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
    Store
} from 'vuex';

export default Vue.extend({
    name: 'Login',
    props: {},
    components: {},
    mixins: [Gestion],
    data: (): any => ({
        isDialogForgotPassword: false as boolean,
        auth: {
            email: '',
            password: '',
        },
        isActive: false as boolean,
        email_reset: '',
        window: {}
    }),
    created() {
        this.window = window
    },
    beforeMount() {},
    mounted() {
        bus.$emit("connected", false);
        this.isOverlay = false;
    },
    watch: {
        /*auth: {
            handler(val: any) {
                this.isActive = true
            },
            deep: true
        }*/
        'auth.email': function (val) {
            this.isActive = val !== null && val !== "";
        }
    },
    computed: {},
    beforeDestroy() {
        bus.$emit("connected", true);
    },
    methods: {
        connexion: function (email: string, password: string): void {
            if (email == null || email == "")
                return this.errorMessage("L'email est vide !");
            if (password == null || password == "")
                return this.errorMessage("Email/password incorrect");

            this.isOverlay = true;
            this.$store.dispatch('authLogin', {
                email,
                password
            }).then(async (response: AxiosResponse) => {
                const token: string | null = localStorage.getItem('SET_TOKEN'); // ou response.data.token
                if (token == null || response === null) {
                    this.isOverlay = false;
                    this.auth.password = '';
                    await this.$store.dispatch('clearToken');
                    return this.errorMessage("L'utilisateur est introuvable !");
                } else {
                    if (response.data.user.role.toLowerCase() !== "administrateur" && response.data.user.role.toLowerCase() !== "commercial") {
                        this.isOverlay = false;
                        this.auth.password = '';
                        await this.$store.dispatch('clearToken');
                        return this.errorMessage('Vous n\'avez pas l\'autorisation d\'accéder à la plateforme');
                    } else {
                        setTimeout(() => {
                            this.setUser(response.data.user); //this.$store.commit("SET_USER", response.data.user) / $store.state.auth.user
                            //this.setToken(token)//this.$store.commit("SET_TOKEN", token);
                            bus.$emit("connected", true);
                            return this.$router.push({
                                name: "Accueil",
                            });
                        }, 500);
                    }
                }
            }).catch((error: any) => {
                this.catchAxios(error);
                this.isOverlay = false;
                this.auth.password = '';
            })
        },
        /*oldConnexion: function (email: string, password: string): void {
            //bus.$emit("connected", true);
            if (email == null || email == "")
                return this.errorMessage("Identifiant vide !");
            if (password == null || password == "")
                return this.errorMessage("Mot de passe vide !");

            this.isOverlay = true;
            const payload = {
                email: email,
                password: password
            };
            axiosApi
                .post("/login", qs.stringify(payload))
                .then((response: AxiosResponse) => {
                    localStorage.setItem("SET_TOKEN", response.data.token);
                    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("SET_TOKEN")}`;
                    if (localStorage.getItem("SET_TOKEN") == null) return this.errorMessage("Token inconnu !");
                    const isAdmin = response.data.user.role.toLowerCase() === "administrateur" ? true : false;
                    if (response.data.user.role.toLowerCase() !== "administrateur" && response.data.user.role.toLowerCase() !== "commercial") {
                        this.isOverlay = false;
                        localStorage.clear();
                        return this.errorMessage('Vous n\'avez pas l\'autorisation d\'accéder à la plateforme');
                    } else {
                        if (isAdmin === undefined || isAdmin === null) {
                            this.isOverlay = false;
                            localStorage.clear();
                            return this.errorMessage('Erreur');
                        } else {
                            this.setAdminStatus(isAdmin) //this.$store.commit("SET_IS_ADMIN", isAdmin);
                            bus.$emit("connected", true);
                            return this.$router.push({
                                name: "Accueil",
                            });
                        }
                    }
                })
                .catch((error) => {
                    this.catchAxios(error);
                    this.isOverlay = false;
                    this.auth.password = '';
                })
        },*/
        resetPassword: function (email: string) {
            if (email == null || email == "") return this.errorMessage("Email vide !");

            this.isOverlay = true;
            axiosApi
                .put("/user/forgot", qs.stringify({
                    email: email
                }))
                .then((response: AxiosResponse) => {
                    if (response.data.error === false) {
                        this.isOverlay = false;
                        Object.assign(this.$data, this.$options.data()); //reset data
                        this.$refs.form.reset();
                        this.successMessage("Votre mot de passe a bien été réinitialisé, veuillez consulter votre boîte mail");
                        setTimeout(() => {
                            this.isDialogForgotPassword = false;
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.catchAxios(error);
                    this.isOverlay = false;
                })
        }
    }
});
</script>

<style>
</style>
