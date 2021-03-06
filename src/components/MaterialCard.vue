<template>
    <kinesis-container :active="kinesisActive" :perspective="1000" :duration="2000" class="mt-12 mb-10">
        <kinesis-element :cycle="0" :strength="kinesisStrength" :type="kinesisType">
            <v-card v-bind="$attrs" hover :class="classes" class="v-card--material pa-3">
                <div class="d-flex grow flex-wrap">
                    <v-avatar v-if="avatar" size="128" class="mx-auto v-card--material__avatar elevation-6" color="grey">
                        <v-img transition="scale-transition" :src="avatar" />
                    </v-avatar>

                    <v-sheet dark v-else style="border-radius: 4px;" v-ripple :class="{
            'pa-7': !$slots.image
        }" :color="color" :max-height="icon ? 90 : undefined" :width="icon ? 'auto' : '100%'" elevation="6" class="text-start v-card--material__heading mb-n6">
                        <slot v-if="$slots.heading" name="heading" />

                        <slot v-else-if="$slots.image" name="image" />

                        <div v-else-if="title && !icon" class="display-1 font-weight-light" v-text="title" />

                        <v-icon v-else-if="icon" size="35" v-text="icon" />

                        <div v-if="text" class="headline font-weight-thin" v-text="text" />
                    </v-sheet>

                    <div v-if="$slots['after-heading']" class="ml-6">
                        <slot name="after-heading" />
                    </div>

                    <div v-else-if="icon && title" class="ml-4">
                        <div class="card-title font-weight-light" v-text="title" />
                    </div>
                </div>

                <slot />

                <template v-if="$slots.actions">
                    <v-divider class="mt-2" />

                    <v-card-actions class="pb-0">
                        <slot name="actions" />
                    </v-card-actions>
                </template>
            </v-card>
        </kinesis-element>
    </kinesis-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MaterialCard',
    data(): any {
        return {

        }
    },
    props: {
        avatar: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'primary',
        },
        icon: {
            type: String,
            default: undefined,
        },
        image: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        kinesisActive: {
            type: Boolean,
            default: true
        },
        kinesisStrength: {
            type: Number,
            default: 0.15
        },
        kinesisType: {
            type: String,
            default: 'scale' //translate - rotate - scale - scaleX - scaleY - depth - depth_inv
        }
    },
    computed: {
        classes() {
            return {
                'v-card--material--has-heading': Boolean(this.$slots.heading || this.title || this.icon),
            }
        },
    },
    methods: {}
});
</script>
<style lang="sass">
  .v-sheet--offset 
    top: -24px
    position: relative
    
  .v-card--material
    &__avatar
      position: relative
      top: -64px
      margin-bottom: -32px

    &__heading
      position: relative
      top: -40px
      transition: .3s ease
      z-index: 1

</style>