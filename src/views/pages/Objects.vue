<template>
<v-container id="objects" tag="section" fluid>
    <v-dialog v-model="isDialogNewObject" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="purple--text">
                    Ajout Object
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewObject = false">mdi-close</v-icon>
                </v-card-title>
                <v-col cols="12">
                    <div class="mb-5">
                        <v-row>
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="purple" label="Name*" v-model.trim="object.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required/>
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="purple" label="Price*" v-model.trim="object.price" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required/>
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <v-file-input color="purple" small-chips v-model="object.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="purple--text">Type</span>
                            </v-col>
                            <v-col cols="12" md="12" class="py-0">
                                <v-text-field color="orange" label="Name*" v-model.trim="object.type.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                        </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prevent="isDialogNewObject = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prevent="saveNewObject">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteObject" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer l'object {{ objectToDelete.name }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteObject = false" class="mx-2" icon outlined color="purple" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteObject" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="purple" icon="mdi-calendar-star" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Objects</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="purple" @click="isDialogNewObject = true" class="ml-3" :disabled="!isAdmin" dark>
                <v-icon left>mdi-plus-box-outline</v-icon>Ajouter Object
            </v-btn>
            <v-btn color="purple" icon @click="getObjectsData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="purple" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="objects" :search.sync="search" :sort-by="['idObject']" :sort-desc="[false]" show-expand single-expand item-key="name" :expanded.sync="expanded">
            <template v-slot:[`item.idObject`]="{ item }">
                <v-chip dark>{{ item.idObject }}</v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                <v-chip dark color="purple">{{ item.name }}</v-chip>
            </template>

            <template v-slot:[`item.img`]="{ item }">
                <v-img transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.imgPath" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                    </template>
                </v-img>
            </template>

            <template v-slot:[`item.imgPath`]="{ item }">
                <span>{{ item.imgPath }}</span>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn small color="blue" :class="{
                        'ml-0': $vuetify.breakpoint.mdAndUp,
                        'ml-3': $vuetify.breakpoint.smAndDown,
                    }" outlined @click="PageInfosObject(item, false)">
                        <v-icon left>mdi-information-outline</v-icon>
                        Informations
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="orange" @click="PageInfosObject(item, true)" class="ml-3">
                        <v-icon left>mdi-pencil-circle-outline</v-icon>
                        Modification
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="pink" @click="dialogDeleteObject(item)" class="ml-3">
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
    name: 'Objects',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewObject: false as boolean,
            isDialogDeleteObject: false as boolean,
            objectToDelete: [] as Array < any > ,
            object: {
                name: null,
                img_path: 'object',
                img: null,
                price: null,
                type: {
                    name: null,
                }
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "ID",
                value: "idObject",
            }, {
                text: "Name",
                value: "name",
            }, {
                text: "Image",
                value: "img",
            }, {
                text: "Name map",
                value: "imgPath",
            }, {
                text: "Price",
                value: "price",
            }, {
                text: "Name type",
                value: "type.name",
            }] as Array < any > ,
            objects: [] as Array < any > ,
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
            await this.getObjectsData();
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        getObjectsData: function (): void {
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("http://localhost:5000/api/admin/object/all") //tous les objects
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.objects = response.data.data;
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
        saveNewObject: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            const object = this.cloneObject(this.object);
            const payload = new FormData();
            delete object.img; // ATTENTION ORDRE  
            payload.append('object', this.object.img)
            payload.append('data', JSON.stringify(object))
            axiosApi.post("http://localhost:5000/api/admin/object/add", payload, this.configAxiosFormData())
            .then((response) => {
                if (this.isDataOk(response)) {
                    Object.assign(this.$data, this.$options.data()); //reset data
                    this.$refs.form.reset();
                    this.successMessage("L'object a bien été ajouté !");
                    setTimeout(() => {
                        this.getObjectsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteObject: async function (): Promise < void > {
            this.isDialogDeleteObject = false;
            axiosApi
            .delete("http://localhost:5000/api/admin/object/delete/" + this.objectToDelete.idObject)
            .then((response) => {
                if (this.isDataOk(response)) {
                    console.log(response.data.message)
                    Object.assign(this.$data, this.$options.data()); //reset data
                    //this.$refs.form.reset();
                    this.successMessage(`L'object a été supprimé avec succès`);
                    setTimeout(() => {
                        this.getObjectsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteObject: function (infosObject: Record < string, any > ) {
            this.isDialogDeleteObject = true;
            this.objectToDelete = infosObject;
        },
        PageInfosObject: function (infosObject: Record < string, any > , isEdit: boolean) {
            this.$router.push({
                name: "Informations-Object",
                params: {
                    isEdit: isEdit,
                    infosObject: infosObject
                },
            });
        }
    }
});
</script>

<style></style>
