<template>
<v-container id="equipment" fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="12">
            <base-material-card color="orange" :kinesisActive="false">
                <template v-slot:heading>
                    <div v-if="$route.params.isEdit === false">
                        <div class="text-h5 white--text"><span>Equipment</span><br /></div>
                    </div>
                    <div v-else>
                        <div class="text-h5 white--text mb-4">
                            <v-icon large left>mdi-pencil-circle-outline</v-icon>Modification equipment
                        </div>
                    </div>
                </template>
                <v-skeleton-loader v-if="isFirstload" :loading="isLoading" type="table"></v-skeleton-loader>
                <div v-else>
                    <div v-if="$route.params.isEdit === false">
                        <v-row>
                            <v-col cols="12" md="6" order="1">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="orange--text text-h6">Equipment</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="orange">{{ equipment.idEquipment }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ equipment.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Legendaire</td>
                                                    <td>
                                                        <v-icon color="success" v-if="equipment.isLegendary == 1 || equipment.isLegendary">mdi-checkbox-marked-circle-outline</v-icon>
                                                        <v-icon color="error" v-else>mdi-close-circle-outline</v-icon>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ equipment.imgPath }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Price</td>
                                                    <td>{{ equipment.price }} fluz</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + equipment.imgPath" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="6" order="3" v-if="isObjectNotEmpty(equipment.equipmentCategory)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="orange--text text-h6">Equipment category</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="orange">{{ equipment.equipmentCategory.idEquipmentCategory }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ equipment.equipmentCategory.name }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6" order="2" v-if="isObjectNotEmpty(equipment.baseFeature)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="orange--text text-h6">Base feature</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="orange">{{ equipment.baseFeature.idBaseFeature }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Health</td>
                                                    <td>{{ equipment.baseFeature.health }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mana</td>
                                                    <td>{{ equipment.baseFeature.mana }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Armor</td>
                                                    <td>{{ equipment.baseFeature.armor }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attack</td>
                                                    <td>{{ equipment.baseFeature.attack }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attack_speed</td>
                                                    <td>{{ equipment.baseFeature.attackSpeed }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Critical</td>
                                                    <td>{{ equipment.baseFeature.critical }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wisdom</td>
                                                    <td>{{ equipment.baseFeature.wisdom }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6" order="4" v-if="isObjectNotEmpty(equipment.specialFeature)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="orange--text text-h6">Special feature</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="orange">{{ equipment.specialFeature.idSpecialFeature }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ equipment.specialFeature.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Probability</td>
                                                    <td>{{ equipment.specialFeature.probability }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Base</td>
                                                    <td>{{ equipment.specialFeature.base }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Duration</td>
                                                    <td>{{ equipment.specialFeature.duration }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Coeff</td>
                                                    <td>{{ equipment.specialFeature.coeff }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2">
                            <v-col cols="12" class="text-left">
                                <v-btn class="mr-1" outlined color="error" text to="/equipments">
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
                                            <v-col cols="12" class="py-0">
                                                <span class="orange--text">Equipment</span>
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="orange" label="Name*" v-model.trim="equipment.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="orange" label="Price*" v-model.trim="equipment.price" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-file-input color="orange" small-chips v-model="equipment.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-checkbox v-model="equipment.isLegendary" label="Legendaire" color="orange"></v-checkbox>
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
                                                <v-text-field color="orange" label="Attack speed*" v-model.trim="equipment.baseFeature.attackSpeed" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
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
                                        <v-row v-if="isObjectNotEmpty(equipment.specialFeature) && (equipment.isEquipmentSpecialFeature || equipment.isEquipmentSpecialFeature == 1)" class="mt-n2">
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
                                    <v-col cols="12" class="text-right">
                                        <v-btn class="mr-1" outlined color="error" text to="/equipments" small>
                                            <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                        </v-btn>
                                        <v-btn outlined color="success" text @click="modificationEquipment" small>
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
    name: "InfosEquipment",
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isFirstload: false as boolean,
            isLoading: false as boolean,
            equipment: {
                idEquipment: null,
                name: null,
                isLegendary: false,
                img_path: 'equipment',
                img: null,
                price: null,
                equipmentCategory: {
                    name: null
                },
                isEquipmentSpecialFeature: false,
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
                    attackSpeed: null, //
                    critical: null, //
                    wisdom: null, //
                },
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
            this.isDataOk(this.$route.params.infosEquipment) &&
            this.$route.params.infosEquipment != 0
        ) {
            this.equipment = this.$route.params.infosEquipment;
            setTimeout(() => {
                this.isLoading = false;
                this.isFirstLoad = false;
            }, 1000);
        } else {
            return this.$router.push({
                name: "Equipments",
            });
        }
    },
    methods: {
        modificationEquipment: function () {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            let equipment = this.cloneObject(this.equipment);
            const payload = new FormData();
            equipment.specialFeature = equipment.isEquipmentSpecialFeature ? equipment.specialFeature : null;
            delete equipment.img; // ATTENTION ORDRE  
            delete equipment.isEquipmentSpecialFeature // ATTENTION ORDRE
            equipment = this.renameKeyPayload(equipment)
            payload.append('equipment', this.equipment.img)
            payload.append('data', JSON.stringify(equipment))
            axiosApi
                .put(
                    "http://localhost:5000/api/admin/equipment/update/" + this.equipment.idEquipment,
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
                        return this.$router.push({
                            name: "Equipments",
                        });
                    }, 1000);
                })
                .catch((error: any) => {
                    this.catchAxios(error);
                });
        },
        renameKeyPayload(equipment: any){
            equipment.baseFeature = this.renameKey(equipment.baseFeature, 'attackSpeed', 'attack_speed')
            equipment = this.renameKey(equipment, 'isLegendary', 'is_legendary')
            equipment = this.renameKey(equipment, 'imgPath', 'img_path')
            delete equipment.baseFeature.attackSpeed;
            delete equipment.isLegendary;
            delete equipment.imgPath;
            return equipment
        }
    },
});
</script>
