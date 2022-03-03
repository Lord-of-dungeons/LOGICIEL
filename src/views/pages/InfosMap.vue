<template>
<v-container id="map" fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="12">
            <base-material-card color="indigo">
                <template v-slot:heading>
                    <div v-if="$route.params.isEdit === false">
                        <div class="text-h5 white--text">
                            <span>Map</span><br />
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-h5 white--text mb-4">
                            <v-icon large left>mdi-pencil-circle-outline</v-icon>Modification map
                        </div>
                    </div>
                </template>
                <v-skeleton-loader v-if="isFirstload" :loading="isLoading" type="table"></v-skeleton-loader>
                <div v-else>
                    <div v-if="$route.params.isEdit === false">
                        <v-simple-table dense v-if="isObjectNotEmpty(map)">
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>{{ map.idMap }}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{{ map.name }}</td>
                                    </tr>
                                    <tr>
                                        <td>Map path</td>
                                        <td>{{ map.mapPath }}</td>
                                    </tr>
                                    <tr>
                                        <td>Image</td>
                                        <td>
                                            <v-img transition="scale-transition" height="300" width="400" :src="'http://localhost:5000/' + map.mapPath" aspect-ratio="1" class="grey lighten-2">
                                                <template v-slot:placeholder>
                                                    <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                                                </template>
                                            </v-img>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-row class="mt-2">
                            <v-col cols="12" class="text-left">
                                <v-btn class="mr-1" outlined color="error" text to="/maps">
                                    <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="px-4" v-else>
                        <v-form ref="form" v-model="rules.valid" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <div class="text-center">
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field color="indigo" label="Name*" v-model.trim="map.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                            </v-col>
                                            <!--<v-col cols="12" md="4">
                                                <v-text-field color="indigo" label="Map path*" v-model.trim="map.mapPath" prepend-icon="mdi-alphabetical" clearable :rules="rules.contentRules" required />
                                            </v-col>-->
                                            <v-col cols="12" md="6">
                                                <v-file-input color="indigo" small-chips v-model="map.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-col cols="12" class="text-right">
                                        <v-btn class="mr-1" outlined color="error" text to="/maps" small>
                                            <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                        </v-btn>
                                        <v-btn outlined color="success" text @click="modificationMap" small>
                                            <v-icon left>mdi-content-save-outline</v-icon>Sauvegarder
                                        </v-btn>
                                    </v-col>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                </div>
            </base-material-card>
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

export default Vue.extend({
    name: 'InfosMap',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isFirstload: false as boolean,
            isLoading: false as boolean,
            map: {
                name: null,
                mapPath: 'map',
                img: null
            },
        }
    },
    computed: {},
    watch: {},
    created() {
        //console.log('created')
    },
    beforeMount() {
        //console.log('beforeMount')
    },
    mounted(): any {
        //modification 
        if (this.isDataOk(this.$route.params.infosMap) && this.$route.params.infosMap != 0) {
            this.map = this.$route.params.infosMap;
            setTimeout(() => {
                this.isLoading = false;
                this.isFirstLoad = false;
            }, 1000);
        } else {
            return this.$router.push({
                name: "Maps"
            });
        }
    },
    methods: {
        modificationMap: function () {
            if (!this.$refs.form.validate() && !this.$refs.form.validate())
                return this.errorMessage("Veuillez vérifier les champs !");
            const map = {
                name: this.map.name,
                map_path: this.map.mapPath
            }
            const payload = new FormData();
            payload.append('data', JSON.stringify(map))
            payload.append('map', this.map.img)
            axiosApi
                .put("http://localhost:5000/api/admin/map/update/" + this.map.idMap, payload, this.configAxiosFormData()) //update
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.$refs.form.reset();
                        this.successMessage("Sauvegarde des modifications effectuée !");
                        this.isLoading = true;
                        this.isFirstLoad = true;
                    }
                    setTimeout(() => {
                        this.$router.push({
                            name: "Maps"
                        });
                    }, 1000);
                })
                .catch((error: any) => {
                    this.catchAxios(error)
                });
        },
    }
});
</script>
