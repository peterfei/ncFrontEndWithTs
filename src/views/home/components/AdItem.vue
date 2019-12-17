<template>
    <div class="home-ad-item" style="styleObj">
        <img :src="item.url" alt="" />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class AdItem extends Vue {
    @Prop({ default: {} }) item: any
    @Prop({ default: '590px' }) width!: string
    @Prop({ default: '100px' }) height!: string
    get styleObj() {
        return {
            width: this.width,
            height: this.height,
        }
    }
}
</script>
<style lang="scss" scoped>
.home-ad-item {
    width: 590px;
    border-radius: 10px;
    overflow: hidden;
    & > img {
        display: inline-block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: all 0.6s;
        &:hover {
            transform: scale(1.1);
        }
    }
}
</style>
