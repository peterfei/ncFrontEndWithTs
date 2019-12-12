<template>
    <div class="home-page">
        <div class="nav-banner-card" :body-style="bodyStle">
            <div class="content banner-box">
                <div class="banner-nav">
                    <banner-nav></banner-nav>
                </div>
                <div class="banner-carousel">
                    <banner-carousel></banner-carousel>
                </div>
            </div>
        </div>
        <div class="content">
            <row-title
                row-icon="icon-mima2"
                row-title="好课推荐"
                sub-title="为您精心挑选"
                style="margin:20px 0;"
            >
            </row-title>
            <!-- 好课推荐  列表 -->
            <!-- v-loading.lock="courseHide" -->
            <carousel-more
                :carouselLists="courseList"
                :show-num="5"
                height="170px"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <template slot-scope="item">
                    <courser-poster-item
                        ref="ccc"
                        :id="item.row.id"
                        :imgUrl="item.row.cover"
                        :courseTitle="item.row ? item.row.name : ''"
                        :labelTitle="item.row.mark"
                        :title="item.row.posterTitle"
                        :studyMember="item.row.learners_count"
                        :basePrice="item.row.base_price"
                        :rateValue="item.row.stars"
                        :category="item.row.category.name"
                    ></courser-poster-item>
                </template>
            </carousel-more>
            <row-title
                row-icon="icon-mima2"
                row-title="职业路径"
                sub-title="为您精心挑选"
                style="margin:20px 0;"
            >
            </row-title>
            <!-- 职业路径  列表 -->
            <div v-if="creersRecomment.length > 0">
                <carousel-more
                    :carouselLists="creersRecomment"
                    :show-num="5"
                    height="130px"
                >
                    <career-path-item
                        :item="item.row"
                        slot-scope="item"
                    ></career-path-item>
                </carousel-more>
            </div>
            <div v-else class="no-data">
                暂无数据
            </div>

            <div class="ad-item">
                <ad-item
                    :item="item"
                    v-for="item in homeAd"
                    :key="item.id"
                ></ad-item>
            </div>
            <row-title
                row-icon="icon-mima2"
                row-title="热门活动"
                sub-title="为您精心挑选"
                :moreInfo="true"
                style="margin:20px 0;"
            >
            </row-title>
            <!-- 热门活动  列表 -->
            <div v-if="homeAdActive.length > 0">
                <carousel-more
                    :carouselLists="homeAdActive"
                    :show-num="2"
                    height="238px"
                >
                    <template slot-scope="item">
                        <ad-item
                            :item="item.row"
                            width="590px"
                            height="240px"
                        ></ad-item>
                    </template>
                </carousel-more>
            </div>
            <div v-else class="no-data">
                暂无数据
            </div>
        </div>
        <div class="sch-inner">
            <div class="content">
                <row-title
                    row-title="入驻院校"
                    text-center="center"
                    style="margin:20px 0 8px 0;"
                ></row-title>
                <div class="sch-inner-subtitle">
                    打造将高端设计平民化，打造最新、最全、最便捷的一站式学习平台。
                </div>
                <div v-if="schInner.length > 0">
                    <carousel-more
                        :carouselLists="schInner"
                        :show-num="1"
                        height="230px"
                    >
                        <template slot-scope="item">
                            <sch-inner
                                v-for="(itemlist, index) in item"
                                :key="index"
                                :sch-inner="itemlist"
                            >
                            </sch-inner>
                        </template>
                    </carousel-more>
                </div>
                <div v-else class="no-data">
                    暂无数据
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import QuillEditor from '@/components/share/QuillEditor/QuillEditor.vue'
// import { mapState, mapActions } from 'vuex'
// import BannerCarousel from './components/BannerCarousel.vue'
import BannerNav from './components/BannerNav.vue'
// import CareerPathItem from './components/CareerPathItem.vue'
// import CarouselMore from './components/CarouselMore.vue'
// import AdItem from './components/AdItem.vue'
// import SchInner from './components/SchInner.vue'
// import RowTitle from '../../components/RowTitle/RowTitle.vue'
// import CourserPosterItem from '../../components/CourserPosterItem/CourserPosterItem.vue'

export default {
    name: 'HomePage',
    components: {
        // BannerCarousel,
        BannerNav,
        // RowTitle,
        // CarouselMore,
        // CourserPosterItem,
        // CareerPathItem,
        // AdItem,
        // SchInner,
    },
    computed: {
        // ...mapState('CoursesDetail', {
        //     courseList: state => state.recommendCourseList,
        // }),
    },
    methods: {
        // ...mapActions('CoursesDetail', ['getRecommendCourseList']),
    },
    mounted() {
        // document.dispatchEvent(new Event('render-event'))
    },
    data() {
        return {
            // richText: '<h1>hahahahaha</h1>',
            courseRecomment: [], // 推荐课程数据
            courseHide: true,
            creersRecomment: [], // 职业路径数据
            homeAd: [], // 职业路径 广告位数据
            homeAdActive: [], // 热门活动数据
            schInner: [], // 入驻院校
            bodyStle: {
                width: '100%',
                height: '364px',
            },
        }
    },
    async created() {
        // await this.getRecommendCourseList()
    },
}
</script>

<style lang="scss" scoped>
.home-page {
    width: 100%;
}
.nav-banner-card {
    width: 100%;
    height: 364px;
    margin-bottom: 50px;
    padding-top: 30px;
    background: linear-gradient(
        -2deg,
        white,
        50%,
        rgba(241, 238, 252, 0.85) 100%
    );
    .banner-box {
        display: flex;
        flex-direction: row;
        flex: 1;
        // margin-top: 30px;
        height: 324px;
        border-radius: 10px;
        box-shadow: 0px 20px 30px 0px rgba(186, 188, 191, 1);
        .banner-carousel {
            display: flex;
            flex-direction: row;
            flex: 1;
        }
    }
}
.ad-item {
    margin: 30px 0 60px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
}
.sch-inner {
    width: 100%;
    padding: 18px 0;
    background: rgba(244, 244, 244, 1);
    box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
    .sch-inner-subtitle {
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        color: rgba(138, 145, 153, 1);
        margin-bottom: 26px;
    }
}
.loading-box {
    width: 100%;
    height: 300px;
}
.el-icon-loading {
    color: #fff !important;
}
.el-loading-spinner .el-loading-text {
    color: #fff !important;
}
.frult-img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.no-data {
    width: 100%;
    height: 200px;
    line-height: 200px;
    color: #cccccc;
    text-align: center;
}
</style>
