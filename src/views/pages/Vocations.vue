<template>
<v-container id="vocations" tag="section" fluid>
    <v-dialog v-model="isDialogNewVocation" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="success--text">
                    Ajout Vocation
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewVocation = false">mdi-close</v-icon>
                </v-card-title>
                <v-col cols="12">
                    <div class="mb-5">
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="success--text">Vocation</span>
                            </v-col>
                            <v-col cols="12" md="12" class="py-0">
                                <v-text-field color="success" label="Name*" v-model.trim="vocation.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="success--text">Vocation appearance</span>
                            </v-col>
                            <v-col cols="12" md="12" class="py-0">
                                <v-file-input color="success" small-chips v-model="vocation.vocationAppearance.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                            </v-col>
                            <v-col cols="12" md="12" class="pl-15">
                                <v-row>
                                    <v-col cols="12" class="py-0">
                                        <v-divider />
                                        <v-switch v-model="vocation.vocationAppearance.isVocationVocationAppearanceGameAnimation" class="success--text my-0" color="success">
                                            <template v-slot:label>
                                                <span :class="vocation.vocationAppearance.isVocationVocationAppearanceGameAnimation ? 'success--text' : 'grey--text'">Vocation appearance - Game animation</span>
                                            </template>
                                        </v-switch>
                                    </v-col>
                                </v-row>
                                <v-row v-if="vocation.vocationAppearance.isVocationVocationAppearanceGameAnimation" class="my-0">
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-text-field color="success" label="Name*" v-model.trim="vocation.vocationAppearance.gameAnimation.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                    </v-col>
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-file-input color="success" small-chips v-model="vocation.vocationAppearance.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="success--text">Base feature</span>
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Health*" v-model.trim="vocation.baseFeature.health" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Mana*" v-model.trim="vocation.baseFeature.mana" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Armor*" v-model.trim="vocation.baseFeature.armor" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Attack*" v-model.trim="vocation.baseFeature.attack" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Attack speed*" v-model.trim="vocation.baseFeature.attack_speed" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Critical*" v-model.trim="vocation.baseFeature.critical" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Wisdom*" v-model.trim="vocation.baseFeature.wisdom" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider />
                                <v-switch v-model="vocation.isVocationUltimate" class="success--text my-0" color="success">
                                    <template v-slot:label>
                                        <span :class="vocation.isVocationUltimate ? 'success--text' : 'grey--text'">Ultimate</span>
                                    </template>
                                </v-switch>
                            </v-col>
                        </v-row>
                        <v-row v-if="vocation.isVocationUltimate" class="my-0">
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Name*" v-model.trim="vocation.ultimate.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Base*" v-model.trim="vocation.ultimate.base" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="success" label="Mana*" v-model.trim="vocation.ultimate.mana" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-file-input color="success" small-chips v-model="vocation.ultimate.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                            </v-col>
                            <v-col cols="12" md="12" class="pl-15">
                                <v-row>
                                    <v-col cols="12" class="py-0">
                                        <v-divider />
                                        <v-switch v-model="vocation.ultimate.isVocationUltimateGameAnimation" class="success--text my-0" color="success">
                                            <template v-slot:label>
                                                <span :class="vocation.ultimate.isVocationUltimateGameAnimation ? 'success--text' : 'grey--text'">Ultimate - Game animation</span>
                                            </template>
                                        </v-switch>
                                    </v-col>
                                </v-row>
                                <v-row v-if="vocation.ultimate.isVocationUltimateGameAnimation" class="my-0">
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-text-field color="success" label="Name*" v-model.trim="vocation.ultimate.gameAnimation.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                    </v-col>
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-file-input color="success" small-chips v-model="vocation.ultimate.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prevent="isDialogNewVocation = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prevent="saveNewVocation">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteVocation" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer la vocation {{ vocationToDelete.name }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteVocation = false" class="mx-2" icon outlined color="success" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteVocation" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="success" icon="mdi-face-recognition" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Vocations</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="success" @click="isDialogNewVocation = true" class="ml-3" :disabled="!isAdmin" dark>
                <v-icon left>mdi-plus-box-outline</v-icon>Ajouter Vocation
            </v-btn>
            <v-btn color="success" icon @click="getVocationsData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="success" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="vocations" :search.sync="search" :sort-by="['idVocation']" :sort-desc="[false]" show-expand single-expand item-key="name" :expanded.sync="expanded">
            <template v-slot:[`item.idVocation`]="{ item }">
                <v-chip dark>{{ item.idVocation }}</v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                <v-chip dark color="success">{{ item.name }}</v-chip>
            </template>

            <template v-slot:[`item.vocationAppearanceImg`]="{ item }">
                <v-img transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.vocationAppearance.imgPath" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                    </template>
                </v-img>
            </template>

            <template v-slot:[`item.ultimate.idUltimate`]="{ item }">
                <span v-if="isObjectNotEmpty(item.ultimate)">{{ item.ultimate.idUltimate }}</span>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>

            <template v-slot:[`item.ultimateImg`]="{ item }">
                <v-img v-if="isObjectNotEmpty(item.ultimate)" transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.ultimate.imgPath" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                    </template>
                </v-img>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>

            <template v-slot:[`item.ultimate.name`]="{ item }">
                <span v-if="isObjectNotEmpty(item.ultimate)">{{ item.ultimate.name }}</span>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn small color="blue" :class="{
                        'ml-0': $vuetify.breakpoint.mdAndUp,
                        'ml-3': $vuetify.breakpoint.smAndDown,
                    }" outlined @click="PageInfosVocation(item, false)">
                        <v-icon left>mdi-information-outline</v-icon>
                        Informations
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="orange" @click="PageInfosVocation(item, true)" class="ml-3">
                        <v-icon left>mdi-pencil-circle-outline</v-icon>
                        Modification
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="red" @click="dialogDeleteVocation(item)" class="ml-3">
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
//import vocation from '../../../autres/equipement_data.json'

export default Vue.extend({
    name: 'Vocations',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewVocation: false as boolean,
            isDialogDeleteVocation: false as boolean,
            vocationToDelete: [] as Array < any > ,
            vocation: {
                name: null,
                vocationAppearance: {
                    img: null,
                    img_path: 'vocation_vocationAppearance',
                    isVocationVocationAppearanceGameAnimation: true,
                    gameAnimation: {
                        name: null,
                        img: null,
                        path: 'vocation_vocationAppearance_gameAnimation'
                    }
                },
                baseFeature: {
                    health: null,
                    mana: null,
                    armor: null,
                    attack: null,
                    attack_speed: null, //
                    critical: null, //
                    wisdom: null, //
                },
                isVocationUltimate: true,
                ultimate: {
                    name: null,
                    base: null,
                    mana: null,
                    img: null,
                    img_path: 'vocation_ultimate',
                    isVocationUltimateGameAnimation: true,
                    gameAnimation: {
                        name: null,
                        img: null,
                        path: 'vocation_ultimate_gameAnimation'
                    }
                }
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "ID",
                value: "idVocation",
            }, {
                text: "Name",
                value: "name",
            }, {
                text: "ID vocation appearance",
                value: "vocationAppearance.idVocationAppearance",
            }, {
                text: "Image vocation appearance",
                value: "vocationAppearanceImg",
            }, {
                text: "ID base feature",
                value: "baseFeature.idBaseFeature",
            }, {
                text: "ID ultimate",
                value: "ultimate.idUltimate",
            }, {
                text: "Image ultimate",
                value: "ultimateImg",
            }, {
                text: "Name ultimate",
                value: "ultimate.name",
            }] as Array < any > ,
            vocations: [] as Array < any > ,
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
            await this.getVocationsData();
            //this.vocation = vocation
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        getVocationsData: function (): void {
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("http://localhost:5000/api/admin/vocation/all") //tous les vocations
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.vocations = response.data.data;
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
        saveNewVocation: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            const vocation = this.cloneObject(this.vocation);
            const payload = new FormData();
            vocation.vocationAppearance.gameAnimation = vocation.isVocationVocationAppearanceGameAnimation ? vocation.vocationAppearance.gameAnimation : null;
            vocation.ultimate = vocation.isVocationUltimate ? vocation.ultimate : null;
            if (vocation.isVocationUltimate) {
                vocation.ultimate.gameAnimation = vocation.ultimate.isVocationUltimateGameAnimation ? vocation.ultimate.gameAnimation : null;
            }
            delete vocation.vocationAppearance.img; // ATTENTION ORDRE  
            delete vocation.vocationAppearance.gameAnimation.img; // ATTENTION ORDRE  
            delete vocation.ultimate.img; // ATTENTION ORDRE  
            delete vocation.ultimate.gameAnimation.img; // ATTENTION ORDRE  
            delete vocation.isVocationVocationAppearanceGameAnimation // ATTENTION ORDRE
            delete vocation.isVocationUltimate // ATTENTION ORDRE
            delete vocation.ultimate.isVocationUltimateGameAnimation // ATTENTION ORDRE
            payload.append('vocation_vocationAppearance', this.vocation.vocationAppearance.img)
            payload.append('vocation_vocationAppearance_gameAnimation', this.vocation.vocationAppearance.gameAnimation.img)
            payload.append('vocation_ultimate', this.vocation.ultimate.img)
            payload.append('vocation_ultimate_gameAnimation', this.vocation.ultimate.gameAnimation.img)
            payload.append('data', JSON.stringify(vocation))
            axiosApi.post("http://localhost:5000/api/admin/vocation/add", payload, this.configAxiosFormData())
            .then((response) => {
                if (this.isDataOk(response)) {
                    Object.assign(this.$data, this.$options.data()); //reset data
                    this.$refs.form.reset();
                    this.successMessage("La vocation a bien été ajouté !");
                    setTimeout(() => {
                        this.getVocationsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteVocation: async function (): Promise < void > {
            this.isDialogDeleteVocation = false;
            axiosApi
            .delete("http://localhost:5000/api/admin/vocation/delete/" + this.vocationToDelete.idVocation)
            .then((response) => {
                if (this.isDataOk(response)) {
                    console.log(response.data.message)
                    Object.assign(this.$data, this.$options.data()); //reset data
                    //this.$refs.form.reset();
                    this.successMessage(`La vocation a été supprimé avec succès`);
                    setTimeout(() => {
                        this.getVocationsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteVocation: function (infosVocation: Record < string, any > ) {
            this.isDialogDeleteVocation = true;
            this.vocationToDelete = infosVocation;
        },
        PageInfosVocation: function (infosVocation: Record < string, any > , isEdit: boolean) {
            infosVocation.isVocationVocationAppearanceGameAnimation = true
            infosVocation.isVocationUltimate = true
            infosVocation.isVocationUltimateGameAnimation = true
            if (!this.isObjectNotEmpty(infosVocation.vocationAppearance.gameAnimation)) {
                infosVocation.vocationAppearance.gameAnimation = {
                    name: null,
                    img: null,
                    path: 'vocation_vocationAppearance_gameAnimation'
                }
                infosVocation.isVocationVocationAppearanceGameAnimation = false
            }
            if (!this.isObjectNotEmpty(infosVocation.ultimate)) {
                infosVocation.ultimate = {
                    name: null,
                    base: null,
                    mana: null,
                    img: null,
                    imgPath: 'vocation_ultimate',
                    isVocationUltimateGameAnimation: true,
                    gameAnimation: this.isObjectNotEmpty(infosVocation.ultimate.gameAnimation) ? infosVocation.ultimate.gameAnimation : null ,
                }
                infosVocation.isVocationUltimate = false
                if (!this.isObjectNotEmpty(infosVocation.ultimate.gameAnimation)) {
                    infosVocation.ultimate.gameAnimation = {
                        name: null,
                        img: null,
                        path: 'vocation_ultimate_gameAnimation'
                    }
                    infosVocation.isVocationUltimateGameAnimation = false
                }
            }
            return this.$router.push({
                name: "Informations-Vocation",
                params: {
                    isEdit: isEdit,
                    infosVocation: infosVocation
                },
            });
        }
    }
});
</script>

<style></style>
