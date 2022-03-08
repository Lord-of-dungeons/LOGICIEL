<template>
<v-container id="equipments" tag="section" fluid>
    <v-dialog v-model="isDialogNewEquipment" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="orange--text">
                    Ajout Equipment
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewEquipment = false">mdi-close</v-icon>
                </v-card-title>
                <v-col cols="12">
                    <div class="mb-5">
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="orange--text">Equipment</span>
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Name*" v-model.trim="equipment.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Price*" v-model.trim="equipment.price" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-file-input color="orange" small-chips v-model="equipment.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-checkbox v-model="equipment.is_legendary" label="Legendaire" color="orange"></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="orange--text">Equipment category</span>
                            </v-col>
                            <v-col cols="12" md="12" class="py-0">
                                <v-text-field color="orange" label="Name*" v-model.trim="equipment.equipmentCategory.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="orange--text">Base feature</span>
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Health*" v-model.trim="equipment.baseFeature.health" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Mana*" v-model.trim="equipment.baseFeature.mana" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Armor*" v-model.trim="equipment.baseFeature.armor" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Attack*" v-model.trim="equipment.baseFeature.attack" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Attack speed*" v-model.trim="equipment.baseFeature.attack_speed" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Critical*" v-model.trim="equipment.baseFeature.critical" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="orange" label="Wisdom*" v-model.trim="equipment.baseFeature.wisdom" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider />
                                <v-switch v-model="equipment.isEquipmentSpecialFeature" class="orange--text my-0" color="orange">
                                    <template v-slot:label>
                                        <span :class="equipment.isEquipmentSpecialFeature ? 'orange--text' : 'grey--text'">Special feature</span>
                                    </template>
                                </v-switch>
                            </v-col>
                        </v-row>
                        <v-row v-if="equipment.isEquipmentSpecialFeature" class="mt-n2">
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="orange" label="Name*" v-model.trim="equipment.specialFeature.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="orange" label="Probability*" v-model.trim="equipment.specialFeature.probability" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="orange" label="Base*" v-model.trim="equipment.specialFeature.base" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="orange" label="Duration*" v-model.trim="equipment.specialFeature.duration" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <v-text-field color="orange" label="Coeff*" v-model.trim="equipment.specialFeature.coeff" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                            </v-col>
                        </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prequipment="isDialogNewEquipment = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prequipment="saveNewEquipment">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteEquipment" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer l'equipment {{ equipmentToDelete.name }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteEquipment = false" class="mx-2" icon outlined color="orange" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteEquipment" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="orange" icon="mdi-sword-cross" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Equipments</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="orange" @click="isDialogNewEquipment = true" class="ml-3" :disabled="!isAdmin" dark>
                <v-icon left>mdi-plus-box-outline</v-icon>Ajouter Equipment
            </v-btn>
            <v-btn color="orange" icon @click="getEquipmentsData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="orange" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="equipments" :search.sync="search" :sort-by="['idEquipment']" :sort-desc="[false]" show-expand single-expand item-key="name" :expanded.sync="expanded">
            <template v-slot:[`item.idEquipment`]="{ item }">
                <v-chip dark>{{ item.idEquipment }}</v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                <v-chip dark color="orange">{{ item.name }}</v-chip>
            </template>

            <template v-slot:[`item.img`]="{ item }">
                <v-img transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.imgPath" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center"> </v-row>
                    </template>
                </v-img>
            </template>
            <template v-slot:[`item.isLegendary`]="{ item }">
                <v-icon color="success" v-if="item.isLegendary == 1 || item.isLegendary">mdi-checkbox-marked-circle-outline</v-icon>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>
            <template v-slot:[`item.specialFeature.idSpecialFeature`]="{ item }">
                <span v-if="isObjectNotEmpty(item.specialFeature)">{{ item.specialFeature.idSpecialFeature }}</span>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>
            <template v-slot:[`item.specialFeature.name`]="{ item }">
                <span v-if="isObjectNotEmpty(item.specialFeature)">{{ item.specialFeature.name }}</span>
                <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn small color="blue" :class="{
                        'ml-0': $vuetify.breakpoint.mdAndUp,
                        'ml-3': $vuetify.breakpoint.smAndDown,
                    }" outlined @click="PageInfosEquipment(item, false)">
                        <v-icon left>mdi-information-outline</v-icon>
                        Informations
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="orange" @click="PageInfosEquipment(item, true)" class="ml-3">
                        <v-icon left>mdi-pencil-circle-outline</v-icon>
                        Modification
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="pink" @click="dialogDeleteEquipment(item)" class="ml-3">
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
//import equipment from '../../../autres/equipement_data.json'

export default Vue.extend({
    name: 'Equipments',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewEquipment: false as boolean,
            isDialogDeleteEquipment: false as boolean,
            equipmentToDelete: [] as Array < any > ,
            equipment: {
                name: null,
                is_legendary: false,
                img_path: 'equipment',
                img: null,
                price: null,
                equipmentCategory: {
                    name: null
                },
                isEquipmentSpecialFeature: true,
                specialFeature: {
                    name: null,
                    probability: null, //
                    base: null, //
                    duration: null,
                    coeff: null, //
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
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "ID",
                value: "idEquipment",
            }, {
                text: "Name",
                value: "name",
            }, {
                text: "Legendaire",
                value: "isLegendary",
            }, {
                text: "Image",
                value: "img",
            }, {
                text: "ID equipment category",
                value: "equipmentCategory.idEquipmentCategory",
            }, {
                text: "Name equipment category",
                value: "equipmentCategory.name",
            }, {
                text: "ID base feature",
                value: "baseFeature.idBaseFeature",
            }, {
                text: "ID special feature",
                value: "specialFeature.idSpecialFeature",
            }, {
                text: "Name special feature",
                value: "specialFeature.name",
            }] as Array < any > ,
            equipments: [] as Array < any > ,
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
            await this.getEquipmentsData();
            //this.equipment = equipment
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        getEquipmentsData: function (): void {
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("http://localhost:5000/api/admin/equipment/all") //tous les equipments
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.equipments = response.data.data;
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
        saveNewEquipment: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            const equipment = this.cloneObject(this.equipment);
            const payload = new FormData();
            equipment.specialFeature = equipment.isEquipmentSpecialFeature ? equipment.specialFeature : null;
            delete equipment.img; // ATTENTION ORDRE  
            delete equipment.isEquipmentSpecialFeature // ATTENTION ORDRE
            payload.append('equipment', this.equipment.img)
            payload.append('data', JSON.stringify(equipment))
            axiosApi.post("http://localhost:5000/api/admin/equipment/add", payload, this.configAxiosFormData())
            .then((response) => {
                if (this.isDataOk(response)) {
                    Object.assign(this.$data, this.$options.data()); //reset data
                    this.$refs.form.reset();
                    this.successMessage("L'equipment a bien été ajouté !");
                    setTimeout(() => {
                        this.getEquipmentsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteEquipment: async function (): Promise < void > {
            this.isDialogDeleteEquipment = false;
            axiosApi
            .delete("http://localhost:5000/api/admin/equipment/delete/" + this.equipmentToDelete.idEquipment)
            .then((response) => {
                if (this.isDataOk(response)) {
                    console.log(response.data.message)
                    Object.assign(this.$data, this.$options.data()); //reset data
                    //this.$refs.form.reset();
                    this.successMessage(`L'equipment a été supprimé avec succès`);
                    setTimeout(() => {
                        this.getEquipmentsData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteEquipment: function (infosEquipment: Record < string, any > ) {
            this.isDialogDeleteEquipment = true;
            this.equipmentToDelete = infosEquipment;
        },
        PageInfosEquipment: function (infosEquipment: Record < string, any > , isEdit: boolean) {
            infosEquipment.isEquipmentSpecialFeature = true
            if (!this.isObjectNotEmpty(infosEquipment.specialFeature)) {
                infosEquipment.specialFeature = {
                    name: null,
                    probability: null, //
                    base: null, //
                    duration: null,
                    coeff: null, //
                }
                infosEquipment.isEquipmentSpecialFeature = false
            }
            return this.$router.push({
                name: "Informations-Equipment",
                params: {
                    isEdit: isEdit,
                    infosEquipment: infosEquipment
                },
            });
        }
    }
});
</script>

<style></style>
