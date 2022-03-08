<template>
<v-container id="maps" tag="section" fluid>
    <v-dialog v-model="isDialogNewMap" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="info--text">
                    Ajout Map
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewMap = false">mdi-close</v-icon>
                </v-card-title>
                <v-col cols="12">
                    <div class="text-center mb-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field color="indigo" label="Name*" v-model.trim="map.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-file-input color="indigo" small-chips v-model="map.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                            </v-col>
                        </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prevent="isDialogNewMap = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prevent="saveNewMap">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteMap" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer la map {{ mapToDelete.name }}  ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteMap = false" class="mx-2" icon outlined color="red" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteMap" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="indigo" icon="mdi-map" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Maps</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="indigo" @click="isDialogNewMap = true" class="ml-3" :disabled="!isAdmin" dark>
                <v-icon left>mdi-map-plus</v-icon>Ajouter Map
            </v-btn>
            <v-btn color="indigo" icon @click="getMapsData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="indigo" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="maps" :search.sync="search" :sort-by="['idMap']" :sort-desc="[false]" show-expand single-expand item-key="name" :expanded.sync="expanded">
            <template v-slot:[`item.idMap`]="{ item }">
                <v-chip dark>{{ item.idMap }}</v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                <v-chip dark color="indigo">{{ item.name }}</v-chip>
            </template>

            <template v-slot:[`item.img`]="{ item }">
                <v-img transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.mapPath" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                    </template>
                </v-img>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn small color="blue" :class="{
                        'ml-0': $vuetify.breakpoint.mdAndUp,
                        'ml-3': $vuetify.breakpoint.smAndDown,
                    }" outlined @click="PageInfosMap(item, false)">
                        <v-icon left>mdi-information-outline</v-icon>
                        Informations
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="orange" @click="PageInfosMap(item, true)" class="ml-3">
                        <v-icon left>mdi-pencil-circle-outline</v-icon>
                        Modification
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="red" @click="dialogDeleteMap(item)" class="ml-3">
                        <v-icon left>mdi-delete-circle-outline</v-icon>
                        Suppression
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
    name: 'Maps',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewMap: false as boolean,
            isDialogDeleteMap: false as boolean,
            mapToDelete: [] as Array < any > ,
            map: {
                name: null,
                map_path: 'map',
                img: null
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "ID",
                value: "idMap",
            }, {
                text: "Image",
                value: "img",
            }, {
                text: "Name",
                value: "name",
            }, {
                text: "Map path",
                value: "mapPath",
            }] as Array < any > ,
            maps: [] as Array < any > ,
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
        try {
            await this.getMapsData();
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        getMapsData: function (): void {
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("http://localhost:5000/api/admin/map/all") //tous les maps
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.maps = response.data.data;
                        setTimeout(() => {
                            this.isLoading = false;
                            this.isFirstLoad = false;
                        }, 1000);
                    }
                })
                .catch((error) => {
                    this.catchAxios(error)
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isFirstLoad = false;
                    }, 1000);
                });
        },
        saveNewMap: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            const map = {
                name: this.map.name,
                map_path: this.map.map_path
            }
            const payload = new FormData();
            payload.append('data', JSON.stringify(map))
            payload.append('map', this.map.img)
            axiosApi.post("http://localhost:5000/api/admin/map/add", payload, this.configAxiosFormData())
            .then((response) => {
                if (this.isDataOk(response)) {
                    Object.assign(this.$data, this.$options.data()); //reset data
                    this.$refs.form.reset();
                    this.successMessage("La map a bien été ajouté !");
                    setTimeout(() => {
                        this.getMapsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteMap: async function (): Promise < void > {
            this.isDialogDeleteMap = false;
            axiosApi
            .delete("http://localhost:5000/api/admin/map/delete/" + this.mapToDelete.idMap)
            .then((response) => {
                if (this.isDataOk(response)) {
                    console.log(response.data.message)
                    Object.assign(this.$data, this.$options.data()); //reset data
                    //this.$refs.form.reset();
                    this.successMessage(`La map a été supprimé avec succès`);
                    setTimeout(() => {
                        this.getMapsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteMap: function (infosMap: Record < string, any > ) {
            this.isDialogDeleteMap = true;
            this.mapToDelete = infosMap;
        },
        PageInfosMap: function (infosMap: Record < string, any > , isEdit: boolean) {
            this.$router.push({
                name: "Informations-Map",
                params: {
                    isEdit: isEdit,
                    infosMap: infosMap
                },
            });
        }
    }
});
</script>

<style></style>
