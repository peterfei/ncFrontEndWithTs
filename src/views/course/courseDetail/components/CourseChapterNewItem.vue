<template>
  <div class="course-chapter-new-item">
    <div class="left"><i :class="iCls"></i></div>
    <div class="mid">
      <course-chapter-item :item="item"></course-chapter-item>
    </div>
    <div class="right">
      {{ item.mediaTime }}
    </div>
  </div>
</template>

<script>
import CourseChapterItem from './CourseChapterItem.vue'

export default {
  name: 'CourseChapterNewItem',
  components: {
    CourseChapterItem
  },
  props: ['item'],
  computed: {
    iCls() {
      const t = {
        'el-icon-success': this.item.id % 2 === 1,
        'el-icon-question': this.item.id % 2 === 0
      }
      return t
    }
  }
}
</script>

<style lang="scss" scoped>
.course-chapter-new-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 0 0 30px;
  }
  .mid {
    flex: 1;
  }
  .right {
    flex: 0 0 100px;
  }
}
</style>
