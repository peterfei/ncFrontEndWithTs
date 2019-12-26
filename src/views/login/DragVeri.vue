<template>
  <div class="drag" ref="dragDiv">
    <div class="drag_bg"></div>
    <div class="drag_text">{{ confirmWords }}</div>
    <div
      ref="moveDiv"
      @mousedown="mousedownFn($event)"
      :class="{ handler_ok_bg: confirmSuccess }"
      class="handler handler_bg"
      style="position: absolute;top: 0px;left: 0px;"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beginClientX: 0 /*距离屏幕左端距离*/,
      mouseMoveStata: false /*触发拖动状态  判断*/,
      maxwidth: '' /*拖动最大宽度，依据滑块宽度算出来的*/,
      confirmWords: '拖动滑块验证' /*滑块文字*/,
      confirmSuccess: false /*验证成功判断*/
    }
  },
  methods: {
    mousedownFn: function(e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault() //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true
        this.beginClientX = e.clientX
      }
    }, //mousedoen 事件
    successFunction() {
      this.confirmSuccess = true //判断通过
      this.$emit('verifySuccess', this.confirmSuccess)
      this.confirmWords = '验证通过'
      if (window.addEventListener) {
        document
          .getElementsByTagName('html')[0]
          .removeEventListener('mousemove', this.mouseMoveFn)
        document
          .getElementsByTagName('html')[0]
          .removeEventListener('mouseup', this.moseUpFn)
      } else {
        document
          .getElementsByTagName('html')[0]
          .removeEventListener('mouseup', () => {})
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#fff'
      document.getElementsByClassName('handler')[0].style.left =
        this.maxwidth - 2 + 'px'
      document.getElementsByClassName('drag_bg')[0].style.width =
        this.maxwidth + 'px'
    }, //验证成功函数
    mouseMoveFn(e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left =
            width + 'px'
          document.getElementsByClassName('drag_bg')[0].style.width =
            width + 'px'
        } else if (width > this.maxwidth) {
          this.successFunction()
        }
      }
    }, //mousemove事件
    moseUpFn(e) {
      this.mouseMoveStata = false
      var width = e.clientX - this.beginClientX
      if (width < this.maxwidth) {
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px'
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px'
      }
    } //mouseup事件
  },
  mounted() {
    this.maxwidth =
      this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
    document
      .getElementsByTagName('html')[0]
      .addEventListener('mousemove', this.mouseMoveFn)
    document
      .getElementsByTagName('html')[0]
      .addEventListener('mouseup', this.moseUpFn)
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ffbd9f;
.drag {
  border-radius: 5px;
  position: relative;
  background-color: #f7f9fa;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 5px;
  color: #909499;
}
.handler {
  width: 50px;
  border-radius: 5px 0 0 5px;
  height: 44px;
  border: 1px solid #e3e6e8;
  cursor: move;
  // border-bottom: none;
}
.handler_bg {
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==')
    no-repeat center;
}
.handler_ok_bg {
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG1GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmOWVmZjIyZS0zMGE0LTBmNDItOWI5OC04MmQwNTkwMjU3YTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2U0ZTAwOGQtZTY3Zi1jZTRlLTg5MTAtMGIwODVlOWI1ZTg0IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0xMi0yNlQxNzo1NzozNiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMTItMjZUMTg6MDE6MzcrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMTItMjZUMTg6MDE6MzcrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNlNmNkZTQzLWIxMzMtYmE0My1iYjEwLWI5ZjQ0ODZlNzNlMiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0yNlQxODowMTozNyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2U0ZTAwOGQtZTY3Zi1jZTRlLTg5MTAtMGIwODVlOWI1ZTg0IiBzdEV2dDp3aGVuPSIyMDE5LTEyLTI2VDE4OjAxOjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi79JFkAAAENSURBVDjLY/hfYcOAjI/M1M+71Wty71O95Z+/lTb/QRjEBomB5NDVwxl75+nK3us2eQpk/8eHQWpAalEMAAm8ajH/RkgzDIPUwgwBG3C32+QJsZphGKqHgQHqL6I0/atE5YP0MoAChxjN97tMX+yerytwdorhWpgYSC8DKIQJab7TY3IfqJkL5ORjM/TrYeIgvQx/kZz1vtHi95mphivfNFv8QNPMBtJ8eJZe0o8aq38wOZBeFANOTzOYC1K4b66uxutmi+/4NMMNQPYCyGaQZpCGPfN0FfFphnsBGBB3kQVBNsMMwacZGoh3GY7M0s9Fl3jbZPFz/xw9G5AcLs3waKQ4IVElKVOcmSjJzgBaIWYhweRlQAAAAABJRU5ErkJggg==')
    no-repeat center;
  border-radius: 0 5px 5px 0;
}
.drag_bg {
  background-color: $orange-color;
  height: 44px;
  width: 0px;
  border-radius: 5px 0 0 5px;
}
.drag_text {
  position: absolute;
  top: 0px;
  border: none !important;
  width: 100%;
  // background: #f7f9fa;
  border: 1px solid #e3e6e8;
  border-radius: 5px;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
</style>
