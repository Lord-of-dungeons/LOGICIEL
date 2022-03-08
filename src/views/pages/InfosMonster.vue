<template>
<v-container id="monster" fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="12">
            <base-material-card color="brown" :kinesisActive="false">
                <template v-slot:heading>
                    <div v-if="$route.params.isEdit === false">
                        <div class="text-h5 white--text"><span>Monster</span><br /></div>
                    </div>
                    <div v-else>
                        <div class="text-h5 white--text mb-4">
                            <v-icon large left>mdi-pencil-circle-outline</v-icon>Modification monster
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
                                                        <span class="brown--text text-h6">Monster</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="brown">{{ monster.idMonster }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ monster.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Max loot item</td>
                                                    <td>{{ monster.maxLootItem }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Xp</td>
                                                    <td>{{ monster.xp }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ultimate ratio</td>
                                                    <td>{{ monster.ultimateRatio }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4" order="auto" v-if="isObjectNotEmpty(monster.monsterAppearance)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="brown--text text-h6">Monster appearance</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="brown">{{ monster.monsterAppearance.idMonsterAppearance }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ monster.monsterAppearance.imgPath }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + monster.monsterAppearance.imgPath" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="2" order="auto" v-if="isObjectNotEmpty(monster.monsterAppearance) && isObjectNotEmpty(monster.monsterAppearance.gameAnimation)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="brown--text text-h6">Monster appearance - game animation</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="brown">{{ monster.monsterAppearance.gameAnimation.idGameAnimation }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ monster.monsterAppearance.gameAnimation.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ monster.monsterAppearance.gameAnimation.path }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + monster.monsterAppearance.gameAnimation.path" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="6" order="auto" v-if="isObjectNotEmpty(monster.baseFeature)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="brown--text text-h6">Base feature</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="brown">{{ monster.baseFeature.idBaseFeature }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Health</td>
                                                    <td>{{ monster.baseFeature.health }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mana</td>
                                                    <td>{{ monster.baseFeature.mana }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Armor</td>
                                                    <td>{{ monster.baseFeature.armor }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attack</td>
                                                    <td>{{ monster.baseFeature.attack }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attack_speed</td>
                                                    <td>{{ monster.baseFeature.attackSpeed }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Critical</td>
                                                    <td>{{ monster.baseFeature.critical }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wisdom</td>
                                                    <td>{{ monster.baseFeature.wisdom }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4" order="auto" v-if="isObjectNotEmpty(monster.ultimate)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="brown--text text-h6">Ultimate</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="brown">{{ monster.ultimate.idSpecialFeature }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ monster.ultimate.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Base</td>
                                                    <td>{{ monster.ultimate.base }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mana</td>
                                                    <td>{{ monster.ultimate.mana }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ monster.ultimate.imgPath }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + monster.ultimate.imgPath" aspect-ratio="1" class="grey lighten-2">
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
                            <v-col cols="12" md="2" order="auto" v-if="isObjectNotEmpty(monster.ultimate) && isObjectNotEmpty(monster.ultimate.gameAnimation)">
                                <v-card outlined>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span class="brown--text text-h6">Ultimate - game animation</span>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>
                                                        <v-chip dark small color="brown">{{ monster.ultimate.gameAnimation.idGameAnimation }}</v-chip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{{ monster.ultimate.gameAnimation.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image path</td>
                                                    <td>{{ monster.ultimate.gameAnimation.path }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>
                                                        <v-img transition="scale-transition" height="200" width="300" :src="'http://localhost:5000/' + monster.ultimate.gameAnimation.path" aspect-ratio="1" class="grey lighten-2">
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
                                <v-btn class="mr-1" outlined color="error" text to="/monsters">
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
                                                <v-divider /> <span class="brown--text">Monster</span>
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Name*" v-model.trim="monster.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Max loot item*" v-model.trim="monster.maxLootItem" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Xp*" v-model.trim="monster.xp" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Ultimate ratio*" v-model.trim="monster.ultimateRatio" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="py-0">
                                                <v-divider /> <span class="brown--text">Monster appearance</span>
                                            </v-col>
                                            <v-col cols="12" md="12" class="py-0">
                                                <v-file-input color="brown" small-chips v-model="monster.monsterAppearance.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                            </v-col>
                                            <v-col cols="12" md="12" class="pl-15">
                                                <v-row>
                                                    <v-col cols="12" class="py-0">
                                                        <v-divider />
                                                        <v-switch v-model="monster.monsterAppearance.isMonsterMonsterAppearanceGameAnimation" class="brown--text my-0" color="brown">
                                                            <template v-slot:label>
                                                                <span :class="monster.monsterAppearance.isMonsterMonsterAppearanceGameAnimation ? 'brown--text' : 'grey--text'">Monster appearance - Game animation</span>
                                                            </template>
                                                        </v-switch>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-if="monster.monsterAppearance.isMonsterMonsterAppearanceGameAnimation" class="my-0">
                                                    <v-col cols="12" md="6" class="py-0">
                                                        <v-text-field color="brown" label="Name*" v-model.trim="monster.monsterAppearance.gameAnimation.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                                    </v-col>
                                                    <v-col cols="12" md="6" class="py-0">
                                                        <v-file-input color="brown" small-chips v-model="monster.monsterAppearance.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="py-0">
                                                <v-divider /> <span class="brown--text">Base feature</span>
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Health*" v-model.trim="monster.baseFeature.health" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Mana*" v-model.trim="monster.baseFeature.mana" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Armor*" v-model.trim="monster.baseFeature.armor" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Attack*" v-model.trim="monster.baseFeature.attack" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Attack speed*" v-model.trim="monster.baseFeature.attackSpeed" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Critical*" v-model.trim="monster.baseFeature.critical" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Wisdom*" v-model.trim="monster.baseFeature.wisdom" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="py-0">
                                                <v-divider />
                                                <v-switch v-model="monster.isMonsterUltimate" class="brown--text my-0" color="brown">
                                                    <template v-slot:label>
                                                        <span :class="monster.isMonsterUltimate ? 'brown--text' : 'grey--text'">Ultimate</span>
                                                    </template>
                                                </v-switch>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="monster.isMonsterUltimate" class="my-0">
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Name*" v-model.trim="monster.ultimate.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Base*" v-model.trim="monster.ultimate.base" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-text-field color="brown" label="Mana*" v-model.trim="monster.ultimate.mana" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                                            </v-col>
                                            <v-col cols="12" md="3" class="py-0">
                                                <v-file-input color="brown" small-chips v-model="monster.ultimate.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                            </v-col>
                                            <v-col cols="12" md="12" class="pl-15">
                                                <v-row>
                                                    <v-col cols="12" class="py-0">
                                                        <v-divider />
                                                        <v-switch v-model="monster.ultimate.isMonsterUltimateGameAnimation" class="brown--text my-0" color="brown">
                                                            <template v-slot:label>
                                                                <span :class="monster.ultimate.isMonsterUltimateGameAnimation ? 'brown--text' : 'grey--text'">Ultimate - Game animation</span>
                                                            </template>
                                                        </v-switch>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-if="monster.ultimate.isMonsterUltimateGameAnimation" class="my-0">
                                                    <v-col cols="12" md="6" class="py-0">
                                                        <v-text-field color="brown" label="Name*" v-model.trim="monster.ultimate.gameAnimation.name" prepend-icon="mdi-alphabetical" clearable :rules="rules.caractereRules" required />
                                                    </v-col>
                                                    <v-col cols="12" md="6" class="py-0">
                                                        <v-file-input color="brown" small-chips v-model="monster.ultimate.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15"></v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-col cols="12" class="text-right">
                                        <v-btn class="mr-1" outlined color="error" text to="/monsters" small>
                                            <v-icon left>mdi-close-circle-outline</v-icon>Retour
                                        </v-btn>
                                        <v-btn outlined color="success" text @click="modificationMonster" small>
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
    name: "InfosMonster",
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isFirstload: false as boolean,
            isLoading: false as boolean,
            monster: {
                name: null,
                maxLootItem: null,
                xp: null,
                ultimateRatio: null,
                monsterAppearance: {
                    img: null,
                    imgPath: 'monster_monsterAppearance',
                    isMonsterMonsterAppearanceGameAnimation: true,
                    gameAnimation: {
                        name: null,
                        img: null,
                        path: 'monster_monsterAppearance_gameAnimation'
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
                isMonsterUltimate: true,
                ultimate: {
                    name: null,
                    base: null,
                    mana: null,
                    img: null,
                    imgPath: 'monster_ultimate',
                    isMonsterUltimateGameAnimation: true,
                    gameAnimation: {
                        name: null,
                        img: null,
                        path: 'monster_ultimate_gameAnimation'
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
            this.isDataOk(this.$route.params.infosMonster) &&
            this.$route.params.infosMonster != 0
        ) {
            this.monster = this.$route.params.infosMonster;
            setTimeout(() => {
                this.isLoading = false;
                this.isFirstLoad = false;
            }, 1000);
        } else {
            return this.$router.push({
                name: "Monsters",
            });
        }
    },
    methods: {
        modificationMonster: function () {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            let monster = this.cloneObject(this.monster);
            const payload = new FormData();
            monster.monsterAppearance.gameAnimation = monster.isMonsterMonsterAppearanceGameAnimation ? monster.monsterAppearance.gameAnimation : null;
            monster.ultimate = monster.isMonsterUltimate ? monster.ultimate : null;
            if (monster.isMonsterUltimate) {
                monster.ultimate.gameAnimation = monster.ultimate.isMonsterUltimateGameAnimation ? monster.ultimate.gameAnimation : null;
            }
            delete monster.monsterAppearance.img; // ATTENTION ORDRE  
            delete monster.monsterAppearance.gameAnimation.img; // ATTENTION ORDRE  
            delete monster.ultimate.img; // ATTENTION ORDRE  
            delete monster.ultimate.gameAnimation.img; // ATTENTION ORDRE  
            delete monster.isMonsterMonsterAppearanceGameAnimation // ATTENTION ORDRE
            delete monster.isMonsterUltimate // ATTENTION ORDRE
            delete monster.ultimate.isMonsterUltimateGameAnimation // ATTENTION ORDRE
            monster = this.renameKeyPayload(monster)
            payload.append('monster_monsterAppearance', this.monster.monsterAppearance.img)
            payload.append('monster_monsterAppearance_gameAnimation', this.monster.monsterAppearance.gameAnimation.img)
            payload.append('monster_ultimate', this.monster.ultimate.img)
            payload.append('monster_ultimate_gameAnimation', this.monster.ultimate.gameAnimation.img)
            payload.append('data', JSON.stringify(monster))
            axiosApi
                .put(
                    "http://localhost:5000/api/admin/monster/update/" + this.monster.idMonster,
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
                            name: "Monsters",
                        });
                    }, 1000);
                })
                .catch((error: any) => {
                    this.catchAxios(error);
                });
        },
        renameKeyPayload(data: any) {
            data = this.renameKey(data, 'maxLootItem', 'max_loot_item')
            data = this.renameKey(data, 'ultimateRatio', 'ultimate_ratio')
            data.monsterAppearance = this.renameKey(data.monsterAppearance, 'imgPath', 'img_path')
            data.ultimate = this.renameKey(data.ultimate, 'imgPath', 'img_path')
            data.baseFeature = this.renameKey(data.baseFeature, 'attackSpeed', 'attack_speed')
            delete data.maxLootItem;
            delete data.ultimateRatio;
            delete data.monsterAppearance.imgPath;
            delete data.ultimate.imgPath;
            delete data.baseFeature.attackSpeed;
            return data
        }
    },
});
</script>
