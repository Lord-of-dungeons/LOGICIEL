<template>
<v-container id="vocation" fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="12">
            <base-material-card color="success" :kinesisActive="false">
                <template v-slot:heading>
                    <div v-if="$route.params.isEdit === false">
                        <div class="text-h5 white--text"><span>Vocation</span><br /></div>
                    </div>
                    <div v-else>
                        <div class="text-h5 white--text mb-4">
                            <v-icon large left>mdi-pencil-circle-outline</v-icon>Modification vocation
                        </div>
                    </div>
                </template>
                <v-skeleton-loader v-if="isFirstload" :loading="isLoading" type="table"></v-skeleton-loader>
                <div v-else>
                    <div v-if="$route.params.isEdit === false">
                        <v-row>
                            <v-col cols="12" md="6" order="auto">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="success--text text-h6">Vocation</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="success">{{ vocation.idVocation }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ vocation.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Max loot item</td>
                                                    <td>{{ vocation.maxLootItem }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Xp</td>
                                                    <td>{{ vocation.xp }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ultimate ratio</td>
                                                    <td>{{ vocation.ultimateRatio }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4" order="auto" v-if="isObjectNotEmpty(vocation.vocationAppearance)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="success--text text-h6">Vocation appearance</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="success">{{ vocation.vocationAppearance.idVocationAppearance }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ vocation.vocationAppearance.imgPath }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + vocation.vocationAppearance.imgPath" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="2" order="auto" v-if="isObjectNotEmpty(vocation.vocationAppearance) && isObjectNotEmpty(vocation.vocationAppearance.gameAnimation)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="success--text text-h6">Vocation appearance - game animation</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="success">{{ vocation.vocationAppearance.gameAnimation.idGameAnimation }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ vocation.vocationAppearance.gameAnimation.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ vocation.vocationAppearance.gameAnimation.path }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + vocation.vocationAppearance.gameAnimation.path" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="6" order="auto" v-if="isObjectNotEmpty(vocation.baseFeature)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="success--text text-h6">Base feature</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="success">{{ vocation.baseFeature.idBaseFeature }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Health</td>
                                                    <td>{{ vocation.baseFeature.health }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mana</td>
                                                    <td>{{ vocation.baseFeature.mana }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Armor</td>
                                                    <td>{{ vocation.baseFeature.armor }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attack</td>
                                                    <td>{{ vocation.baseFeature.attack }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attack_speed</td>
                                                    <td>{{ vocation.baseFeature.attackSpeed }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Critical</td>
                                                    <td>{{ vocation.baseFeature.critical }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wisdom</td>
                                                    <td>{{ vocation.baseFeature.wisdom }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4" order="auto" v-if="isObjectNotEmpty(vocation.ultimate)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="success--text text-h6">Ultimate</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="success">{{ vocation.ultimate.idSpecialFeature }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ vocation.ultimate.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Base</td>
                                                    <td>{{ vocation.ultimate.base }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mana</td>
                                                    <td>{{ vocation.ultimate.mana }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ vocation.ultimate.imgPath }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + vocation.ultimate.imgPath" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="2" order="auto" v-if="isObjectNotEmpty(vocation.ultimate) && isObjectNotEmpty(vocation.ultimate.gameAnimation)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="success--text text-h6">Ultimate - game animation</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="success">{{ vocation.ultimate.gameAnimation.idGameAnimation }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ vocation.ultimate.gameAnimation.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ vocation.ultimate.gameAnimation.path }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + vocation.ultimate.gameAnimation.path" aspect-ratio="1" class="grey lighten-2">
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
                        </v-row>
                        <v-row class="mt-2">
                            <v-col cols="12" class="text-left">
                                <v-btn class="mr-1" outlined color="error" text to="/vocations">
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
                                                <v-divider /> <span class="success--text">Vocation</span>
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="success" label="Name*" v-model.trim="vocation.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="success" label="Max loot item*" v-model.trim="vocation.maxLootItem" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="success" label="Xp*" v-model.trim="vocation.xp" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="success" label="Ultimate ratio*" v-model.trim="vocation.ultimateRatio" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="py-0">
                                                <v-divider /> <span class="success--text">Vocation appearance</span>
                                            </v-col>
                                            <v-col cols="12" md="12" class="py-0">
                                                <v-file-input color="success" small-chips v-model="vocation.vocationAppearance.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
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
                                                        <v-file-input color="success" small-chips v-model="vocation.vocationAppearance.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
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
                                                <v-text-field color="success" label="Attack speed*" v-model.trim="vocation.baseFeature.attackSpeed" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
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
                                                <v-file-input color="success" small-chips v-model="vocation.ultimate.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
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
                                                        <v-file-input color="success" small-chips v-model="vocation.ultimate.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-col cols="12" class="text-right">
                                        <v-btn class="mr-1" outlined color="error" text to="/vocations" small>
                                            <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                        </v-btn>
                                        <v-btn outlined color="success" text @click="modificationVocation" small>
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
    name: "InfosVocation",
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isFirstload: false as boolean,
            isLoading: false as boolean,
            vocation: {
                name: null,
                vocationAppearance: {
                    img: null,
                    imgPath: 'vocation_vocationAppearance',
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
                    attackSpeed: null, //
                    critical: null, //
                    wisdom: null, //
                },
                isVocationUltimate: true,
                ultimate: {
                    name: null,
                    base: null,
                    mana: null,
                    img: null,
                    imgPath: 'vocation_ultimate',
                    isVocationUltimateGameAnimation: true,
                    gameAnimation: {
                        name: null,
                        img: null,
                        path: 'vocation_ultimate_gameAnimation'
                    }
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
            this.isDataOk(this.$route.params.infosVocation) &&
            this.$route.params.infosVocation != 0
        ) {
            this.vocation = this.$route.params.infosVocation;
            setTimeout(() => {
                this.isLoading = false;
                this.isFirstLoad = false;
            }, 1000);
        } else {
            return this.$router.push({
                name: "Vocations",
            });
        }
    },
    methods: {
        modificationVocation: function () {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            let vocation = this.cloneObject(this.vocation);
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
            vocation = this.renameKeyPayload(vocation)
            payload.append('vocation_vocationAppearance', this.vocation.vocationAppearance.img)
            payload.append('vocation_vocationAppearance_gameAnimation', this.vocation.vocationAppearance.gameAnimation.img)
            payload.append('vocation_ultimate', this.vocation.ultimate.img)
            payload.append('vocation_ultimate_gameAnimation', this.vocation.ultimate.gameAnimation.img)
            payload.append('data', JSON.stringify(vocation))
            axiosApi
                .put(
                    "http://localhost:5000/api/admin/vocation/update/" + this.vocation.idVocation,
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
                            name: "Vocations",
                        });
                    }, 1000);
                })
                .catch((error: any) => {
                    this.catchAxios(error);
                });
        },
        renameKeyPayload(data: any) {
            data.vocationAppearance = this.renameKey(data.vocationAppearance, 'imgPath', 'img_path')
            data.ultimate = this.renameKey(data.ultimate, 'imgPath', 'img_path')
            data.baseFeature = this.renameKey(data.baseFeature, 'attackSpeed', 'attack_speed')
            delete data.vocationAppearance.imgPath;
            delete data.ultimate.imgPath;
            delete data.baseFeature.attackSpeed;
            return data
        }
    },
});
</script>
