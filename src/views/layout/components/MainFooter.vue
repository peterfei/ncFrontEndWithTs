<template>
  <div class="footer">
    <div class="content">
      <div>
        <ul class="list-nav">
          <li v-for="item in listItem" :key="item.index">
            {{ item.name }}
          </li>
        </ul>
        <div class="address">
          <p>
            Copyright © 2013-2018 ibodao.com All Rights Reserved |
            北京博导前程信息技术股份有限公司
          </p>
          <p>
            京公网安备11010802022973号 | 京ICP备09019949号-9 |
            增值电信业务经营许可证：京B2-20171584
          </p>
        </div>
      </div>
      <div class="icons">
        <span><i class="icon iconfont icon-qq1"></i></span>
        <span><i class="icon iconfont icon-weibo"></i></span>
        <span><i class="icon iconfont icon-web_weixin"></i></span>
        <i></i>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IListItemFooter } from "@/types/index";
import { listItemFooter } from "@/mocks/index";
@Component
export default class AppFooter extends Vue {
  public listItem: Array<IListItemFooter> = listItemFooter;
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 120px;
  background-color: #0d131a;
  border-top: 1px solid #ccc;
  padding-top: 2px;
  .content {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    .list-nav {
      color: #fff;
      display: flex;
      margin-bottom: 17px;
      li {
        margin-right: 34px;
        font-size: 14px;
      }
    }
    .address {
      color: #525a62;
      font-size: 14px;
      p:first-child {
        margin-bottom: 5px;
      }
      p:last-child {
        margin-top: 2px;
      }
    }
    .icons {
      padding-top: 22px;
      span {
        width: 40px;
        height: 40px;
        display: inline-block;
        text-align: center;
        border: 2px solid #aaaaaa;
        line-height: 40px;
        border-radius: 50%;
        margin-right: 20px;
        transition: 0.3s;
        &:hover {
          border-color: #fff;
          i {
            color: #fff;
          }
        }
      }
      i {
        font-size: 27px;
        transition: 0.3s;
        color: #aaaaaa;
      }
    }
  }
}
</style>
