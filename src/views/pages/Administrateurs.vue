<template>
<v-container id="administrateurs" tag="section" fluid>
    <v-dialog v-model="isDialogNewAdministrateur" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="info--text">
                    Ajout administrateur
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewAdministrateur = false">mdi-close</v-icon>
                </v-card-title>
                <v-col cols="12">
                    <div class="text-center">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field color="info" label="Nom*" v-model.trim="user.lastname" prepend-inner-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field color="info" label="Prénom*" v-model.trim="user.firstname" prepend-inner-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                        </v-row>
                        <v-row class="mt-n4">
                            <v-col cols="12" md="6">
                                <v-text-field color="info" label="Email*" v-model.trim="user.email" prepend-inner-icon="mdi-email-outline" clearable :rules="rules.emailRules" required />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field color="info" label="Password*" v-model="user.password" prepend-inner-icon="mdi-lock-outline" clearable :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="rules.passwordRules" required />
                            </v-col>
                        </v-row>
                        <v-row class="mt-n4">
                            <v-col cols="12" md="4">
                                <v-select color="info" prepend-inner-icon="mdi-format-list-bulleted-type" v-model.trim="user.civilite" :items="['Homme', 'Femme']" label="Civilité*" :rules="rules.champRules" required></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-menu v-model="isDialogDateNaissanceOpen" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" color="info">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field color="info" v-model="user.dateNaissance" :rules="rules.dateEnRules" required label="Date de naissance*" prepend-inner-icon="mdi-calendar-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker color="info" locale="fr" first-day-of-week="1" v-model="user.dateNaissance" @input="isDialogDateNaissanceOpen = false" :rules="rules.dateEnRules" required></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field color="info" label="Numéro de téléphone" v-model.trim="user.portable" prepend-inner-icon="mdi-deskphone" clearable />
                            </v-col>
                        </v-row>
                    </div>
                    <v-col cols="12">
                        <v-switch disabled class="ml-n3 my-n2" v-model="user.isAdmin" label="Administrateur" :color="user.isAdmin ? 'info' : 'error'"></v-switch>
                    </v-col>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prevent="isDialogNewAdministrateur = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prevent="saveNewAdministrateur">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteAdministrateur" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer l'administrateur {{ administrateurToDelete.firstname }}
                {{ administrateurToDelete.lastname }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteAdministrateur = false" class="mx-2" icon outlined color="red" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteAdministrateur" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDisableAdministrateur" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Désactiver l'administrateur {{ administrateurToDelete.firstname }}
                {{ administrateurToDelete.lastname }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDisableAdministrateur = false" class="mx-2" icon outlined color="red" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="disableAdministrateur" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="info" icon="mdi-account-tie" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Administrateurs</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="info" @click="isDialogNewAdministrateur = true" class="ml-3" :disabled="!isAdmin">
                <v-icon left>mdi-account-plus-outline</v-icon>Ajouter Administrateur
            </v-btn>
            <v-btn color="info" icon @click="getAdministrateursData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="info" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="items" :search.sync="search" :sort-by="['lastname']" :sort-desc="[false]" show-expand single-expand item-key="email" :expanded.sync="expanded">
            <template v-slot:[`item.role`]="{ item }">
                <v-chip dark :color="item.role.toLowerCase() !== 'administrateur' ? 'indigo' : 'orange'">{{ item.role }}</v-chip>
            </template>
            <template v-slot:[`item.createdAt`]="{ item }"> {{ item.createdAt | moment("YYYY-MM-DD HH:mm") }} </template>
            <template v-slot:[`item.lastLogin`]="{ item }"> {{ item.lastLogin | moment("YYYY-MM-DD HH:mm") }} </template>
            <template v-slot:[`item.checked`]="{ item }">
                <v-icon color="success" v-if="item.checked">mdi-checkbox-marked-circle-outline</v-icon>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>
            <template v-slot:[`item.disabled`]="{ item }">
                <v-icon color="error" v-if="item.disabled">mdi-close-circle-outline</v-icon>
                <v-icon color="success" v-else>mdi-checkbox-marked-circle-outline</v-icon>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn small color="blue" :class="{
                        'ml-0': $vuetify.breakpoint.mdAndUp,
                        'ml-3': $vuetify.breakpoint.smAndDown,
                    }" outlined @click="PageInfosAdministrateur(item, false)">
                        <v-icon left>mdi-card-account-details-outline</v-icon>
                        Informations {{ item.civilite.toLowerCase() === "homme" ? 'M. '+ item.lastname : 'Mme '+ item.lastname }}
                    </v-btn>
                    <v-btn :disabled="item.disabled || !isAdmin || item.role.toLowerCase() === 'administrateur'" small outlined color="orange" @click="PageInfosAdministrateur(item, true)" class="ml-3">
                        <v-icon left>mdi-account-edit-outline</v-icon>
                        Modifier {{ item.civilite.toLowerCase() === "homme" ? 'M. '+ item.lastname : 'Mme '+ item.lastname }}
                    </v-btn>
                    <v-btn :disabled="item.disabled || !isAdmin || item.role.toLowerCase() === 'administrateur'" small outlined color="red" @click="dialogDisableAdministrateur(item)" class="ml-3">
                        <v-icon left>mdi-account-remove</v-icon>
                        Désactiver {{ item.civilite.toLowerCase() === "homme" ? 'M. '+ item.lastname : 'Mme '+ item.lastname }}
                    </v-btn>
                    <v-btn :disabled="item.disabled || !isAdmin || item.role.toLowerCase() === 'administrateur'" small outlined color="pink" @click="dialogDeleteAdministrateur(item)" class="ml-3">
                        <v-icon left>mdi-account-remove-outline</v-icon>
                        Supprimer {{ item.civilite.toLowerCase() === "homme" ? 'M. '+ item.lastname : 'Mme '+ item.lastname }}
                    </v-btn>
                </td>
            </template>
            <div slot="no-results" :value="true" icon="warning" class="error--text">
                La recherche "{{ search }}" est inconnu.
            </div>
        </v-data-table>
    </base-material-card>
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
</template>

<script lang="ts">
import Vue from 'vue';
import Gestion from "@/mixins/Gestion"
import axiosApi from '@/plugins/axiosApi';
import qs from "qs";
import {
    AxiosResponse
} from 'axios';
import moment from 'moment';

export default Vue.extend({
    name: 'Administrateurs',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewAdministrateur: false as boolean,
            isDialogDateNaissanceOpen: false as boolean,
            isDialogDeleteAdministrateur: false as boolean,
            isDialogDisableAdministrateur: false as boolean,
            administrateurToDelete: [] as Array < any > ,
            administrateurToDisable: [] as Array < any > ,
            user: {
                email: "",
                password: "",
                lastname: "",
                firstname: "",
                dateNaissance: "", //new Date().toISOString().substr(0, 10)
                civilite: "",
                portable: "",
                isAdmin: true,
                role: "Administrateur",
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "Rôle",
                value: "role",
            }, {
                text: "Nom",
                value: "lastname",
            }, {
                text: "Prénom",
                value: "firstname",
            }, {
                text: "Email",
                value: "email",
            }, {
                sortable: false,
                text: "Dernière connexion",
                value: "lastLogin",
            }, {
                sortable: false,
                text: "Checked",
                value: "checked",
            }, {
                sortable: false,
                text: "Actif",
                value: "disabled",
            }, ] as Array < any > ,
            items: [] as Array < any > ,
        }
    },
    watch: {},
    created() {
        //console.log('created')
    },
    beforeMount() {
        //console.log('beforeMount')
    },
    async mounted() {
        await this.getAdministrateursData();
    },
    methods: {
        getAdministrateursData: function (): void {
            //https://jsonplaceholder.typicode.com/users
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("/user/all/Administrateur") //tous les users
                .then((response: AxiosResponse) => {
                    this.items = response.data.users;
                    for (let i = 0; i < this.items.length; i++) {
                        this.items[i].isAdmin = this.items[i].role.toLowerCase() === "administrateur" ? true : false
                    }
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isFirstLoad = false;
                    }, 1000);
                })
                .catch((error) => {
                    this.catchAxios(error)
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isFirstLoad = false;
                    }, 1000);
                });
        },
        saveNewAdministrateur: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");

            this.user.role = this.user.isAdmin === true ? 'Administrateur' : 'Administrateur'
            axiosApi.post("/register", qs.stringify(this.user))
            .then((response) => {
                Object.assign(this.$data, this.$options.data()); //reset data
                this.$refs.form.reset();
                this.successMessage("L'administrateur a bien été ajouté !");
                setTimeout(() => {
                    this.getAdministrateursData();
                }, 1000);
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteAdministrateur: async function (): Promise < void > {
            this.isDialogDeleteAdministrateur = false;
            axiosApi
            .delete("/user/delete/" + this.administrateurToDelete._id)
            .then((response) => {
                console.log(response.data.message)
                const administrateurFirstname = this.administrateurToDelete.firstname;
                const administrateurLastname = this.administrateurToDelete.lastname;
                Object.assign(this.$data, this.$options.data()); //reset data
                //this.$refs.form.reset();
                this.successMessage(`L'administrateur ${administrateurFirstname} ${administrateurLastname} a été supprimé avec succès`);
                setTimeout(() => {
                    this.getAdministrateursData();
                }, 1000);
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        disableAdministrateur: async function (): Promise < void > {
            this.isDialogDeleteAdministrateur = false;
            axiosApi
            .put("/user/disable/" + this.administrateurToDisable._id)
            .then((response) => {
                console.log(response.data.message)
                const administrateurFirstname = this.administrateurToDisable.firstname;
                const administrateurLastname = this.administrateurToDisable.lastname;
                Object.assign(this.$data, this.$options.data()); //reset data
                this.successMessage(`L'administrateur ${administrateurFirstname} ${administrateurLastname} a été désactivé avec succès`);
                setTimeout(() => {
                    this.getAdministrateursData();
                }, 1000);
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteAdministrateur: function (infosAdministrateur: Record < string, any > ) {
            this.isDialogDeleteAdministrateur = true;
            this.administrateurToDelete = infosAdministrateur;
        },
        dialogDisableAdministrateur: function (infosAdministrateur: Record < string, any > ) {
            this.isDialogDisableAdministrateur = true;
            this.administrateurToDisable = infosAdministrateur;
        },
        PageInfosAdministrateur: function (infosAdministrateur: Record < string, any > , isEdit: boolean) {
            this.$router.push({
                name: "Informations-Administrateur",
                params: {
                    isEdit: isEdit,
                    infosAdministrateur: infosAdministrateur
                },
            });
        }
    }
});
</script>

<style></style>
