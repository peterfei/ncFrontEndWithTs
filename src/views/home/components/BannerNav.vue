<template>
  <div class="banner-nav-box">
    <banner-nav-item
      v-for="navitem in sideNavBar"
      :key="navitem.id"
      :cate-name="navitem.name"
      @mouseenter="getMouseenter"
    >
      <template
        slot="bannerNavFilter"
        v-if="navitem.children && navitem.children.length"
      >
        <div v-for="navitemline in navitem.children" :key="navitemline.id">
          <template v-if="navitemline.children">
            <banner-nav-filter
              :title="navitemline.name"
              :category-list="navitemline.children"
              @change="change"
            ></banner-nav-filter>
          </template>
        </div>
      </template>

      <template slot="bannerNavFilter" v-else>
        <div>暂无数据</div>
      </template>
      <template slot="recommentCourse">
        <div class="recomment-course">
          <recomment-course
            :category-courses="categoryCoursesList"
          ></recomment-course>
        </div>
      </template>
    </banner-nav-item>
  </div>
</template>
<script lang="ts">
import { CategoryCourses } from '@/api/course'
import { Categories } from '@/api/categories'
import BannerNavItem from './BannerNavItem.vue'
import BannerNavFilter from './BannerNavFilter.vue'
import RecommentCourse from './RecommentCourse.vue'
import { Component, Vue } from 'vue-property-decorator'
import { INavItemData, INavSideBar } from '@/types/index'
@Component({
  components: {
    BannerNavItem,
    BannerNavFilter,
    RecommentCourse
  }
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
    name: ''
  }
  async mounted() {
    const _list = await Categories.getCategoriesList()
    this.sideNavBar = _list
    console.log(`sideNavBar list is ${JSON.stringify(this.sideNavBar)}`)
  }
  // 获取鼠标移入分类的id
  public async getMouseenter(name: string): Promise<any> {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    )
    console.log(`| ：获取鼠标移入分类 `)

    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    )

    this.objSideBar = this.sideNavBar.find(
      (rec: INavSideBar) => rec.name === name
    )
    if (this.objSideBar === undefined) return
    const _getLists = await CategoryCourses.getList(this.objSideBar.id)
    this.categoryCoursesList = _getLists
    console.log(
      `categoryCoursesList is ${JSON.stringify(this.categoryCoursesList)}`
    )
  }

  change() {}
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
