<template>
  <div class="box-block">
    <div class="zhai-block btn" v-if="price == 0" @click="excerpt">
      立即摘录
    </div>

    <!-- <router-link :to="{ path: `/resource/resourceorder/${id}` }"> -->
    <div class="buy-block btn" v-if="price != 0">
      <div class="buy">
        <span class="buy-btn">立即购买</span>
      </div>
      <div class="price">￥{{ price }}</div>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
// import axios from 'axios';
import Resource from '@/api/resource'

export default {
  props: {
    price: {},
    id: {}
  },
  methods: {
    excerpt() {
      this.$message({
        message: '摘录成功',
        type: 'success'
      })
      Resource.ResourcePackage.excerptPackage(this.id)
        .then(rec => {
          console.log('rec=', rec)
        })
        .catch(err => {
          console.log('err=', err)
          this.$message({
            message: err.data,
            type: 'error'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-block {
  text-align: center;
  margin-bottom: 40px;
}
.btn {
  height: 50px;
  border-radius: 5px;
  position: relative;
  z-index: 500;
  margin-bottom: 40px;
  cursor: pointer;
  margin: 0 auto;
  color: #fff;
}
.buy-block {
  width: 200px;
  background: rgba(240, 20, 20, 1);
  box-shadow: 0px 4px 11px 0px rgba(240, 20, 20, 0.41);
  padding: 14px 0;
  display: flex;
  &:hover {
    background: #d81414;
    transition: 0.4s;
  }
  .buy {
    text-align: center;
    border-right: 1px solid #fff;
    flex: 1;
  }
  .price {
    text-align: center;
    padding: 0 16px;
  }
  .buy-btn {
    color: #fff;
  }
}
.zhai-block {
  width: 180px;
  background: rgba(255, 120, 60, 1);
  box-shadow: 0px 4px 11px 0px rgba(240, 20, 20, 0.41);
  line-height: 50px;
  text-align: center;
  transition: 0.4s;
  &:hover {
    background: #ff611b !important;
  }
}
</style>
