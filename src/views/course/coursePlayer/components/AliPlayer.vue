<template>
  <div class="polyv-player">
    <div id="player"></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import FileUploader from '@/util/FileUploader'
import { CoursePlayer } from '@/api/courses/courses'

export default {
  name: 'AliPlayer',
  components: {},
  props: {
    vid: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isAutoSnapshot: false,
      player: null,
      aplayer: {
        // vid: '4280ff6dcf754f4fa249ae403782d455',
        playauth: '',
        cover:
          'http://img.videocc.net/uimage/8/812a792458/c/812a79245832268c867f5eab680493fc_0_b.jpg'
      }
    }
  },
  mounted() {
    this.changeVId(this.vid)
  },
  methods: {
    ...mapMutations('CoursePlayer', ['setSnapShoted']),
    // 登陆跳转
    toLogin() {
      console.log('登陆跳转')
    },
    async changeVId(vid) {
      // vod_play_auth 获取播放权限
      const aa = await CoursePlayer.getVideoPlayAuth(vid)
      this.aplayer.playauth = aa.PlayAuth
      // eslint-disable-next-line
      this.player = new Aliplayer({
          id: 'player',
          width: '100%',
          height: '100%',
          autoplay: false,
          vid: this.vid,
          playauth: this.aplayer.playauth,
          cover: this.aplayer.cover,
          qualitySort: true,
          components: [
            {
              name: 'PreviewComponent',
              type: window.AliPlayerComponent.PreviewComponent,
              /* 第一个参数是试看时长, 单位为分钟 */
              /* 第二个参数可以传一个 Dom 字符串, 他将会替换默认的'试看已结束...'等文字 */
              args: [
                2,
                '<div style="color:#ffffff;position: relative;top: 50%;text-align:center;font-size:14px;">观看结束, 请您' +
                  '<span id="toLogin" style="color:#F38622;cursor:pointer;font-size:16px;margin-left:4px;">登陆或注册</span>' +
                  '</div>'
              ]
            }
          ],
          skinLayout: [
            {
              name: 'bigPlayButton',
              align: 'blabs',
              x: 30,
              y: 80
            },
            {
              name: 'H5Loading',
              align: 'cc'
            },
            {
              name: 'errorDisplay',
              align: 'tlabs',
              x: 0,
              y: 0
            },
            { name: 'infoDisplay' },
            {
              name: 'tooltip',
              align: 'blabs',
              x: 0,
              y: 56
            },
            { name: 'thumbnail' },
            {
              name: 'controlBar',
              align: 'blabs',
              x: 0,
              y: 0,
              children: [
                {
                  name: 'progress',
                  align: 'blabs',
                  x: 0,
                  y: 44
                },
                {
                  name: 'playButton',
                  align: 'tl',
                  x: 15,
                  y: 12
                },
                {
                  name: 'timeDisplay',
                  align: 'tl',
                  x: 10,
                  y: 7
                },
                {
                  name: 'fullScreenButton',
                  align: 'tr',
                  x: 10,
                  y: 12
                },
                // {
                //   name: 'subtitle',
                //   align: 'tr',
                //   x: 15,
                //   y: 12,
                // },
                {
                  name: 'setting',
                  align: 'tr',
                  x: 15,
                  y: 12
                },
                {
                  name: 'volume',
                  align: 'tr',
                  x: 15,
                  y: 10
                },
                {
                  name: 'streamSelector',
                  align: 'tr',
                  x: 15,
                  y: 10
                },
                {
                  name: 'snapshot',
                  align: 'tr',
                  x: 5,
                  y: 12
                },
                {
                  name: 'speedButton',
                  align: 'tr',
                  x: 10,
                  y: 23
                }
              ]
            }
          ],
          extraInfo: {
            crossOrigin: 'anonymous'
          }
        },
        () => {
          document
            .getElementById('toLogin')
            .addEventListener('click', this.toLogin)
        }
      )
      this.player.on('ready', () => {
        console.log('ready')
      })
      this.player.on('play', () => {
        console.log('play=')
      })
      this.player.on('pause', () => {
        console.log('pause')
      })
      this.player.on('ended', () => {
        console.log('ended')
      })
      this.player.on('liveStreamStop', () => {
        console.log('liveStreamStop')
      })
      this.player.on('m3u8Retry', () => {
        console.log('m3u8Retry')
      })
      this.player.on('hideBar', () => {
        console.log('hideBar')
      })
      this.player.on('waiting', () => {
        console.log('waiting')
      })
      this.player.on('snapshoted', async data => {
        if (this.isAutoSnapshot) {
          this.isAutoSnapshot = false
          FileUploader.getFileLink(data.paramData.binary).then(imgUrl => {
            const snapObj = {
              time_point: data.paramData.time,
              snapshot: imgUrl
            }
            this.$emit('snapshoted', snapObj)
          })
        } else {
          let pictureData = data.paramData.base64
          const downloadElement = document.createElement('a')
          downloadElement.setAttribute('href', pictureData)
          const fileName = `Aliplayer${Date.now()}.png`
          downloadElement.setAttribute('download', fileName)
          downloadElement.click()
          pictureData = null
        }
      })
      // eslint-disable-next-line
    },
    snapshot() {
      this.isAutoSnapshot = true
      const prismSnapshotBtn = document.getElementsByClassName(
        'prism-snapshot-btn'
      )[0]
      prismSnapshotBtn.click(() => {})
    }
  },
  watch: {
    vid() {
      this.changeVId(this.vid)
    }
  }
}
</script>

<style lang="scss" scoped>
// hover  ff783c  default  93999f

.polyv-player {
  position: relative;
  z-index: 999;
  width: 100%;
  height: 100%;
  margin: 0;
  & /deep/ .prism-player .prism-big-play-btn {
    background: url('../../../../../public/image/player/play.png') no-repeat
      18px center;
    background-size: 50% 50%;
    & > .outter {
      // display: none;
      border: 4px solid #93999f;
    }
  }
  & /deep/ .prism-player .prism-play-btn {
    background: url('../../../../../public/image/player/play-h.png') no-repeat
      center 8px;
    background-size: 60% 60%;
  }
  // 暂停
  & /deep/ .prism-player .prism-play-btn.playing {
    background: url('../../../../../public/image/player/stop.png') no-repeat
      center 8px;
    background-size: 60% 60%;
  }
  // 喇叭-声音
  & /deep/ .prism-player .prism-volume > .volume-icon {
    background: url('../../../../../public/image/player/volume.png') no-repeat
      center 8px;
    background-size: 70% 70%;
    & > .short-horizontal {
      display: none;
    }
    & > .long-horizontal {
      display: none;
    }
  }
  & /deep/ .prism-player .prism-volume > .volume-icon:hover {
    background: url('../../../../../public/image/player/volume-h.png') no-repeat
      center 8px;
    background-size: 70% 70%;
  }
  & /deep/ .prism-player .prism-volume.mute {
    background: url('../../../../../public/image/player/mute.png') no-repeat
      center 8px;
    background-size: 60% 60%;
  }

  // 静音
  & /deep/ .prism-player .volume-value {
    background: $info;
  }

  & /deep/ .prism-player .prism-info-left-bottom > span {
    color: #ffffff;
  }

  & /deep/ .prism-player .volume-cursor:hover {
    background: $info !important;
  }
  // 时间显示总时间
  & /deep/ .prism-player .prism-time-display {
    color: #93999f;
  }
  & /deep/ .prism-player .prism-time-display .current-time {
    color: #93999f;
  }
  // 截图按钮
  & /deep/ .prism-player .prism-snapshot-btn {
    background: url('../../../../../public/image/player/snapshot.png') no-repeat
      center 8px;
    background-size: 60% 60%;
  }
  & /deep/ .prism-player .prism-snapshot-btn:hover {
    background: url('../../../../../public/image/player/snapshot-h.png')
      no-repeat center 8px;
    background-size: 60% 60%;
  }
  // 全屏
  & /deep/ .prism-player .prism-fullscreen-btn {
    background: url('../../../../../public/image/player/fullscreen.png')
      no-repeat center 8px;
    background-size: 60% 60%;
  }
  & /deep/ .prism-player .prism-fullscreen-btn:hover {
    background: url('../../../../../public/image/player/fullscreen-h.png')
      no-repeat center 8px;
    background-size: 60% 60%;
  }
  // 进度条
  & /deep/ .prism-player .prism-progress {
    & .prism-progress-played {
      background-color: $info;
    }
  }
  // 控制器设置
  & /deep/ .prism-player .prism-setting-btn {
    background: url('../../../../../public/image/player/setup.png') no-repeat
      center 8px;
    background-size: 60% 60%;
  }
  & /deep/ .prism-player .prism-setting-btn:hover {
    background: url('../../../../../public/image/player/setup-h.png') no-repeat
      center 8px;
    background-size: 60% 60%;
  }
  // 控制器
  & /deep/ .prism-player .prism-controlbar {
    opacity: 0.9;
    background: black;
  }
}
#player {
  height: 100%;
}
</style>
