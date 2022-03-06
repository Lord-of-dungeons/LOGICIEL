<template>
<v-container id="events" tag="section" fluid>
    <v-dialog v-model="isDialogNewEvent" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="red--text">
                    Ajout Event
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewEvent = false">mdi-close</v-icon>
                </v-card-title>
                <v-col cols="12">
                    <div class="mb-5">
                        <v-row>
                            <v-col cols="12" md="12" class="py-0">
                                <v-text-field color="red" label="Name*" v-model.trim="event.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules"  />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="red--text">Map</span>
                            </v-col>
                            <v-col cols="12" md="7" class="py-0">
                                <v-text-field color="red" label="Name*" v-model.trim="event.map.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                            <v-col cols="12" md="5" class="py-0">
                                <v-file-input color="red" small-chips v-model="event.map.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                            </v-col>
                        </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prevent="isDialogNewEvent = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prevent="saveNewEvent">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteEvent" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer l'event {{ eventToDelete.name }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteEvent = false" class="mx-2" icon outlined color="red" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteEvent" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="red" icon="mdi-calendar-star" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Events</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="red" @click="isDialogNewEvent = true" class="ml-3" :disabled="!isAdmin" dark>
                <v-icon left>mdi-plus-box-outline</v-icon>Ajouter Event
            </v-btn>
            <v-btn color="red" icon @click="getEventsData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="red" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="events" :search.sync="search" :sort-by="['idEvent']" :sort-desc="[false]" show-expand single-expand item-key="name" :expanded.sync="expanded">
            <template v-slot:[`item.idEvent`]="{ item }">
                <v-chip dark>{{ item.idEvent }}</v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                <v-chip dark color="red">{{ item.name }}</v-chip>
            </template>

            <template v-slot:[`item.mapImg`]="{ item }">
                <v-img v-if="isObjectNotEmpty(item.map)" transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.map.mapPath" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                    </template>
                </v-img>
            </template>

            <template v-slot:[`item.mapName`]="{ item }">
                <v-chip v-if="isObjectNotEmpty(item.map)" dark color="indigo">{{ item.map.name }}</v-chip>
            </template>

            <template v-slot:[`item.mapPath`]="{ item }">
                <span v-if="isObjectNotEmpty(item.map)">{{ item.map.mapPath }}</span>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn small color="blue" :class="{
                        'ml-0': $vuetify.breakpoint.mdAndUp,
                        'ml-3': $vuetify.breakpoint.smAndDown,
                    }" outlined @click="PageInfosEvent(item, false)">
                        <v-icon left>mdi-information-outline</v-icon>
                        Informations
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="orange" @click="PageInfosEvent(item, true)" class="ml-3">
                        <v-icon left>mdi-pencil-circle-outline</v-icon>
                        Modification
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="pink" @click="dialogDeleteEvent(item)" class="ml-3">
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
    name: 'Events',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewEvent: false as boolean,
            isDialogDeleteEvent: false as boolean,
            eventToDelete: [] as Array < any > ,
            event: {
                name: null,
                map: {
                    name: null,
                    map_path: 'event_map',
                    img: null
                }
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "ID",
                value: "idEvent",
            }, {
                text: "Name",
                value: "name",
            }, {
                text: "Image map",
                value: "mapImg",
            }, {
                text: "Name map",
                value: "mapName",
            }, {
                text: "Path map",
                value: "mapPath",
            }] as Array < any > ,
            events: [] as Array < any > ,
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
            await this.getEventsData();
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        getEventsData: function (): void {
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("http://localhost:5000/api/admin/event/all") //tous les events
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.events = response.data.data;
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
        saveNewEvent: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            const event = {
                name: this.event.name,
                map: {
                    name: this.event.map.name,
                    map_path: this.event.map.map_path,
                }
            }
            const payload = new FormData();
            payload.append('data', JSON.stringify(event))
            payload.append('event_map', this.event.map.img)
            axiosApi.post("http://localhost:5000/api/admin/event/add", payload, this.configAxiosFormData())
            .then((response) => {
                if (this.isDataOk(response)) {
                    Object.assign(this.$data, this.$options.data()); //reset data
                    this.$refs.form.reset();
                    this.successMessage("L'event a bien été ajouté !");
                    setTimeout(() => {
                        this.getEventsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteEvent: async function (): Promise < void > {
            this.isDialogDeleteEvent = false;
            axiosApi
            .delete("http://localhost:5000/api/admin/event/delete/" + this.eventToDelete.idEvent)
            .then((response) => {
                if (this.isDataOk(response)) {
                    console.log(response.data.message)
                    Object.assign(this.$data, this.$options.data()); //reset data
                    //this.$refs.form.reset();
                    this.successMessage(`L'event a été supprimé avec succès`);
                    setTimeout(() => {
                        this.getEventsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteEvent: function (infosEvent: Record < string, any > ) {
            this.isDialogDeleteEvent = true;
            this.eventToDelete = infosEvent;
        },
        PageInfosEvent: function (infosEvent: Record < string, any > , isEdit: boolean) {
            this.$router.push({
                name: "Informations-Event",
                params: {
                    isEdit: isEdit,
                    infosEvent: infosEvent
                },
            });
        }
    }
});
</script>

<style></style>
