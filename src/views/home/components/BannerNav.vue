<template>
    <div class="banner-nav-box"></div>
</template>
<script lang="ts">
// import CategoriesApi from '@/api/categories/categories';
// import { CategoryCourses } from '@/api/courses/courses';
import BannerNavItem from './BannerNavItem.vue'
import BannerNavFilter from './BannerNavFilter.vue'
import RecommentCourse from './RecommentCourse.vue'
import { Component, Vue } from 'vue-property-decorator'
import { INavItemData, INavSideBar } from '@/types/index'
import { CategoryCourses } from '@/api/course'
@Component({
    components: {
        BannerNavItem,
        BannerNavFilter,
        RecommentCourse,
    },
})
export default class BannerNav extends Vue {
    public sideNavBar: Array<INavSideBar> = [{ id: 0, name: '' }]
    public categoryCoursesList: Array<any> = []
    public children: Array<any> = []
    public obj: INavItemData = { id: 0, name: '', children: [] }
    // 设置子分类
    public setCateList(itemData: INavItemData | any): INavItemData {
        if (itemData.children) {
            itemData.children.forEach((item: any) => {
                this.children.push(this.setCateList(item))
            })
        }
        this.obj.children = this.children || []
        return this.obj
    }
    private objSideBar: any = {
        id: 0,
        name: '',
    }
    // 获取鼠标移入分类的id
    public getMouseenter(name: string): void {
        this.objSideBar = this.sideNavBar.find(
            (rec: INavSideBar) => rec.name === name
        )
        if (!this.objSideBar.id) return
        CategoryCourses.getList(this.objSideBar.id)
            .then((rec: any) => {
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
    }

    //change() {},
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
