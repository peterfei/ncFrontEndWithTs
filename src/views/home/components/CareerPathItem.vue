<template>
    <div class="career-path-item">
        <poster-img
            :img-url="item.imgUrl"
            :poster-title="item.label"
            :mark="item.mark"
            :height="itemHeight"
        ></poster-img>
        <div class="info-introd-box">
            <div class="career-title word-spot-2 fs16">
                {{ item.careerTitle }}
            </div>
            <div class="career-content word-spot-4 fs12">
                {{ item.content }}
            </div>
        </div>
    </div>
</template>
<script>
import PosterImg from '../../../components/PosterImg/PosterImg.vue'

export default {
    name: 'CareerPathItem',
    props: {
        item: {
            type: Object,
            required: false,
            default: () => {},
        },
    },
    data() {
        return {
            itemHeight: '130',
        }
    },
    components: {
        PosterImg,
    },
}
</script>
<style lang="scss" scoped>
.info-introd-box {
    width: 226px;
    padding: 10px;
    .career-title {
        color: #08111a;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        cursor: pointer;
        -webkit-transition: 0.3s;
        transition: 0.3s;
        &:hover {
            color: rgba(255, 80, 0, 1);
        }
    }
    .career-content {
        margin-top: 8px;
        font-weight: 400;
        color: rgba(138, 145, 153, 1);
        line-height: 23px;
    }
}
</style>
