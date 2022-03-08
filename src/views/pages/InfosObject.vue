<template>
<v-container id="object" fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="12">
            <base-material-card color="purple" :kinesisActive="false">
                <template v-slot:heading>
                    <div v-if="$route.params.isEdit === false">
                        <div class="text-h5 white--text"><span>Object</span><br /></div>
                    </div>
                    <div v-else>
                        <div class="text-h5 white--text mb-4">
                            <v-icon large left>mdi-pencil-circle-outline</v-icon>Modification object
                        </div>
                    </div>
                </template>
                <v-skeleton-loader v-if="isFirstload" :loading="isLoading" type="table"></v-skeleton-loader>
                <div v-else>
                    <div v-if="$route.params.isEdit === false">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="purple--text text-h6">Object</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="purple">{{ object.idObject }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ object.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ object.imgPath }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Price</td>
                                                    <td>{{ object.price }} fluz</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + object.mapPath" aspect-ratio="1" class="grey lighten-2">
                                                            <template v-slot:placeholder>
                                                                <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                                                            </template>
                                                        </v-img>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6" v-if="isObjectNotEmpty(object.type)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="purple--text text-h6">Type</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="purple">{{ object.type.idType }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ object.type.name }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2">
                            <v-col cols="12" class="text-left">
                                <v-btn class="mr-1" outlined color="error" text to="/objects">
                                    <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="px-4" v-else>
                        <v-form ref="form" v-model="rules.valid" lazy-validation>
                            <v-row>
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
                                                <v-file-input color="purple" small-chips v-model="object.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
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
                                    <v-col cols="12" class="text-right">
                                        <v-btn class="mr-1" outlined color="error" text to="/objects" small>
                                            <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                        </v-btn>
                                        <v-btn outlined color="success" text @click="modificationObject" small>
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
} from "vue";
import {
    bus
} from "@/main";
import axiosApi from "@/plugins/axiosApi";
import qs from "qs";
import {
    AxiosResponse
} from "axios";
import Gestion from "@/mixins/Gestion";

export default Vue.extend({
    name: "InfosObject",
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isFirstload: false as boolean,
            isLoading: false as boolean,
            object: {
                name: null,
                imgPath: 'object',
                img: null,
                price: null,
                type: {
                    name: null,
                }
            },
        };
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
        if (
            this.isDataOk(this.$route.params.infosObject) &&
            this.$route.params.infosObject != 0
        ) {
            this.object = this.$route.params.infosObject;
            setTimeout(() => {
                this.isLoading = false;
                this.isFirstLoad = false;
            }, 1000);
        } else {
            return this.$router.push({
                name: "Objects",
            });
        }
    },
    methods: {
        modificationObject: function () {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            let object = this.cloneObject(this.object);
            const payload = new FormData();
            delete object.img; // ATTENTION ORDRE  
            object = this.renameKeyPayload(object)
            payload.append('object', this.object.img)
            payload.append('data', JSON.stringify(object))
            axiosApi
                .put(
                    "http://localhost:5000/api/admin/object/update/" + this.object.idObject,
                    payload,
                    this.configAxiosFormData()
                ) //update
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.$refs.form.reset();
                        this.successMessage("Sauvegarde des modifications effectuée !");
                        this.isLoading = true;
                        this.isFirstLoad = true;
                    }
                    setTimeout(() => {
                        this.$router.push({
                            name: "Objects",
                        });
                    }, 1000);
                })
                .catch((error: any) => {
                    this.catchAxios(error);
                });
        },
        renameKeyPayload(data: any) {
            data = this.renameKey(data, 'imgPath', 'img_path')
            delete data.imgPath;
            return data
        }
    },
});
</script>
