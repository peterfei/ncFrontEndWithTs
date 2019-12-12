<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
</template>
<script>
// import CategoriesApi from '@/api/categories/categories';
// import { CategoryCourses } from '@/api/courses/courses';
// import BannerNavItem from './BannerNavItem.vue'
// import BannerNavFilter from './BannerNavFilter.vue'
// import RecommentCourse from './RecommentCourse.vue'

export default {
    name: 'BannerNav',
    components: {
        // BannerNavItem,
        // BannerNavFilter,
        // RecommentCourse,
    },
    data() {
        return {
            sideNavBar: [{}, {}, {}, {}],
            categoryCoursesList: [],
        }
    },
    created() {},
    mounted() {
        // 回去分类列表
    },
    methods: {
        // 设置子分类
        setCateList(itemData) {
            const children = []
            const obj = {
                id: itemData.id,
                name: itemData.name,
            }

            if (itemData.children) {
                itemData.children.forEach(item => {
                    children.push(this.setCateList(item))
                })
            }
            obj.children = children || []
            return obj
        },
        // 获取鼠标移入分类的id
        getMouseenter(name) {
            const obj = this.sideNavBar.find(rec => rec.name === name)
            if (!obj.id) return
            CategoryCourses.getList(obj.id)
                .then(rec => {
                    if (rec.length > 0) {
                        this.categoryCoursesList = []
                        this.categoryCoursesList = rec
                    } else {
                        this.categoryCoursesList = []
                    }
                })
                .catch(() => {
                    this.categoryCoursesList = []
                })
        },

        change() {},
    },
}
</script>

<style lang="scss" scoped>
.banner-nav-box {
    width: 264px;
    height: 100%;
    position: relative;
    background: rgba(48, 50, 51, 0.9);
    border-radius: 10px 0px 0px 10px;
    & > div:first-child ::v-deep .banner-nav-item {
        border-radius: 10px 0px 0px 0px;
    }
    & > div:last-child ::v-deep .banner-nav-item {
        border-radius: 0px 0px 0px 10px;
    }
}
.recomment-course {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px 0;
    width: 648px;
}
</style>
