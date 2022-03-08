<template>
<v-container id="monsters" tag="section" fluid>
    <v-dialog v-model="isDialogNewMonster" persistent max-width="1000px" overlay-opacity="0.8">
        <v-card class="px-6" outlined>
            <v-form ref="form" v-model="rules.valid" lazy-validation>
                <v-card-title class="brown--text">
                    Ajout Monster
                    <v-icon aria-label="Close" class="ml-auto" @click="isDialogNewMonster = false">mdi-close</v-icon>
                </v-card-title>
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
                                <v-text-field color="brown" label="Max loot item*" v-model.trim="monster.max_loot_item" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="brown" label="Xp*" v-model.trim="monster.xp" prepend-icon="mdi-numeric" clearable :rules="rules.numericRules" required />
                            </v-col>
                            <v-col cols="12" md="3" class="py-0">
                                <v-text-field color="brown" label="Ultimate ratio*" v-model.trim="monster.ultimate_ratio" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" required />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">
                                <v-divider /> <span class="brown--text">Monster appearance</span>
                            </v-col>
                            <v-col cols="12" md="12" class="py-0">
                                <v-file-input color="brown" small-chips v-model="monster.monsterAppearance.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
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
                                        <v-file-input color="brown" small-chips v-model="monster.monsterAppearance.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
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
                                <v-text-field color="brown" label="Attack speed*" v-model.trim="monster.baseFeature.attack_speed" prepend-icon="mdi-numeric" clearable :rules="rules.floatRules" suffix="(0.00)" required />
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
                                <v-file-input color="brown" small-chips v-model="monster.ultimate.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
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
                                        <v-file-input color="brown" small-chips v-model="monster.ultimate.gameAnimation.img" accept="image/*" label="Image*" truncate-length="15" :rules="rules.champRules" required></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                    <v-col cols="12" class="text-right">
                        <v-btn class="mr-1" color="error" text @click.prevent="isDialogNewMonster = false">Fermer</v-btn>
                        <v-btn color="success" text @click.prevent="saveNewMonster">Sauvegarder</v-btn>
                    </v-col>
                </v-col>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogDeleteMonster" width="500" overlay-opacity="0.8">
        <v-card outlined>
            <v-card-title>
                Supprimer le monster {{ monsterToDelete.name }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isDialogDeleteMonster = false" class="mx-2" icon outlined color="brown" dark>
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
                <v-btn @click="deleteMonster" class="mx-2" icon outlined color="green darken-1">
                    <v-icon dark>mdi-check-bold</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <base-material-card :kinesisActive="false" color="brown" icon="mdi-emoticon-devil-outline" max-width="100%" width="auto" inline class="py-3 mx-auto">
        <template v-slot:after-heading>
            <div class="display-1 font-weight-light">Monsters</div>
        </template>
        <v-row class="mt-8 mr-1">
            <v-btn color="brown" @click="isDialogNewMonster = true" class="ml-3" :disabled="!isAdmin" dark>
                <v-icon left>mdi-plus-box-outline</v-icon>Ajouter Monster
            </v-btn>
            <v-btn color="brown" icon @click="getMonstersData" class="ml-3">
                <v-icon large>mdi-refresh</v-icon>
            </v-btn>
            <v-text-field v-model="search" prepend-icon="mdi-magnify" class="ml-auto" label="Recherche" color="brown" hide-details single-line style="max-width: 250px" clearable />
        </v-row>
        <v-divider class="mt-6" />

        <v-skeleton-loader v-if="isFirstLoad" :loading="isLoading" type="table"></v-skeleton-loader>
        <v-data-table v-else :headers="headers" :items="monsters" :search.sync="search" :sort-by="['idMonster']" :sort-desc="[false]" show-expand single-expand item-key="name" :expanded.sync="expanded">
            <template v-slot:[`item.idMonster`]="{ item }">
                <v-chip dark>{{ item.idMonster }}</v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
                <v-chip dark color="brown">{{ item.name }}</v-chip>
            </template>

            <template v-slot:[`item.monsterAppearanceImg`]="{ item }">
                <v-img transition="scale-transition" height="80" width="120" :src="'http://localhost:5000/' + item.monsterAppearance.imgPath" aspect-ratio="1" class="grey lighten-2">
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
                    }" outlined @click="PageInfosMonster(item, false)">
                        <v-icon left>mdi-information-outline</v-icon>
                        Informations
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="orange" @click="PageInfosMonster(item, true)" class="ml-3">
                        <v-icon left>mdi-pencil-circle-outline</v-icon>
                        Modification
                    </v-btn>
                    <v-btn :disabled="(isDataOk(item.disabled) ? item.disabled : false) || !isAdmin" small outlined color="red" @click="dialogDeleteMonster(item)" class="ml-3">
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
//import monster from '../../../autres/equipement_data.json'

export default Vue.extend({
    name: 'Monsters',
    mixins: [Gestion],
    props: {},
    components: {},
    //data: () => ({}),
    data(): any {
        return {
            isDialogNewMonster: false as boolean,
            isDialogDeleteMonster: false as boolean,
            monsterToDelete: [] as Array < any > ,
            monster: {
                name: null,
                max_loot_item: null,
                xp: null,
                ultimate_ratio: null,
                monsterAppearance: {
                    img: null,
                    img_path: 'monster_monsterAppearance',
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
                    attack_speed: null, //
                    critical: null, //
                    wisdom: null, //
                },
                isMonsterUltimate: true,
                ultimate: {
                    name: null,
                    base: null,
                    mana: null,
                    img: null,
                    img_path: 'monster_ultimate',
                    isMonsterUltimateGameAnimation: true,
                    gameAnimation: {
                        name: null,
                        img: null,
                        path: 'monster_ultimate_gameAnimation'
                    }
                }
            },
            search: undefined as string | null | undefined,
            expanded: [] as Array < any > ,
            headers: [{
                text: "ID",
                value: "idMonster",
            }, {
                text: "Name",
                value: "name",
            }, {
                text: "ID monster appearance",
                value: "monsterAppearance.idMonsterAppearance",
            }, {
                text: "Image monster appearance",
                value: "monsterAppearanceImg",
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
            monsters: [] as Array < any > ,
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
            await this.getMonstersData();
            //this.monster = monster
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        getMonstersData: function (): void {
            this.isLoading = true;
            this.isFirstLoad = true;
            axiosApi.get("http://localhost:5000/api/admin/monster/all") //tous les monsters
                .then((response: AxiosResponse) => {
                    if (this.isDataOk(response)) {
                        this.monsters = response.data.data;
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
        saveNewMonster: async function (): Promise < void > {
            if (!this.$refs.form.validate()) return this.errorMessage("Veuillez vérifier les champs !");
            const monster = this.cloneObject(this.monster);
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
            payload.append('monster_monsterAppearance', this.monster.monsterAppearance.img)
            payload.append('monster_monsterAppearance_gameAnimation', this.monster.monsterAppearance.gameAnimation.img)
            payload.append('monster_ultimate', this.monster.ultimate.img)
            payload.append('monster_ultimate_gameAnimation', this.monster.ultimate.gameAnimation.img)
            payload.append('data', JSON.stringify(monster))
            axiosApi.post("http://localhost:5000/api/admin/monster/add", payload, this.configAxiosFormData())
            .then((response) => {
                if (this.isDataOk(response)) {
                    Object.assign(this.$data, this.$options.data()); //reset data
                    this.$refs.form.reset();
                    this.successMessage("Le monster a bien été ajouté !");
                    setTimeout(() => {
                        this.getMonstersData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        deleteMonster: async function (): Promise < void > {
            this.isDialogDeleteMonster = false;
            axiosApi
            .delete("http://localhost:5000/api/admin/monster/delete/" + this.monsterToDelete.idMonster)
            .then((response) => {
                if (this.isDataOk(response)) {
                    console.log(response.data.message)
                    Object.assign(this.$data, this.$options.data()); //reset data
                    //this.$refs.form.reset();
                    this.successMessage(`Le monster a été supprimé avec succès`);
                    setTimeout(() => {
                        this.getMonstersData();
                    }, 1000);
                }
            })
            .catch((error) => {
                this.catchAxios(error)
            });
        },
        dialogDeleteMonster: function (infosMonster: Record < string, any > ) {
            this.isDialogDeleteMonster = true;
            this.monsterToDelete = infosMonster;
        },
        PageInfosMonster: function (infosMonster: Record < string, any > , isEdit: boolean) {
            infosMonster.isMonsterMonsterAppearanceGameAnimation = true
            infosMonster.isMonsterUltimate = true
            infosMonster.isMonsterUltimateGameAnimation = true
            if (!this.isObjectNotEmpty(infosMonster.monsterAppearance.gameAnimation)) {
                infosMonster.monsterAppearance.gameAnimation = {
                    name: null,
                    img: null,
                    path: 'monster_monsterAppearance_gameAnimation'
                }
                infosMonster.isMonsterMonsterAppearanceGameAnimation = false
            }
            if (!this.isObjectNotEmpty(infosMonster.ultimate)) {
                infosMonster.ultimate = {
                    name: null,
                    base: null,
                    mana: null,
                    img: null,
                    imgPath: 'monster_ultimate',
                    isMonsterUltimateGameAnimation: true,
                    gameAnimation: this.isObjectNotEmpty(infosMonster.ultimate.gameAnimation) ? infosMonster.ultimate.gameAnimation : null ,
                }
                infosMonster.isMonsterUltimate = false
                if (!this.isObjectNotEmpty(infosMonster.ultimate.gameAnimation)) {
                    infosMonster.ultimate.gameAnimation = {
                        name: null,
                        img: null,
                        path: 'monster_ultimate_gameAnimation'
                    }
                    infosMonster.isMonsterUltimateGameAnimation = false
                }
            }
            return this.$router.push({
                name: "Informations-Monster",
                params: {
                    isEdit: isEdit,
                    infosMonster: infosMonster
                },
            });
        }
    }
});
</script>

<style></style>
