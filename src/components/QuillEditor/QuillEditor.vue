<template>
  <div class="quill-editor">
    <images-uploader ref="imgUploader" @selected="addImages"></images-uploader>
    <quill-editor
      :content="content"
      @change="onContentChange"
      ref="editor"
      :options="editorOption"
    ></quill-editor>
    <!-- <el-button @click="testing">测试按钮</el-button> -->
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill-emoji/dist/quill-emoji.css'
// 引入Emoji表情插件
import Emoji from 'quill-emoji/dist/quill-emoji'
import { quillEditor, Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module' // 图片resize插件
import ImagesUploader from './ImagesUploader.vue' // 图片上传组件
// import { ImageExtend, QuillWatch } from 'quill-image-extend-module';
// import { ImageDrop } from 'quill-image-drop-module';
import { ImageDrop } from './ImageDropExt' // 图片粘贴，拖拽组件

Quill.register('modules/quill-emoji', Emoji)
Quill.register('modules/ImageResize', ImageResize)
Quill.register('modules/ImageDrop', ImageDrop)
// Quill.register('modules/ImageExtend', ImageExtend);

export default {
  name: 'QuillEditor',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },

    height: {
      type: String,
      default: '300px'
    },
    type: {
      type: String,
      default: 'full'
    }
  },
  components: {
    quillEditor,
    ImagesUploader
  },
  computed: {
    editorHeight() {
      if (this.type !== 'none') {
        return `${parseInt(this.height, 10) + 42}px`
      }
      return this.height
    }
  },
  data() {
    return {
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          // toolbar: '#q-toolbar',
          toolbar: this.toolbarOptions(),
          'emoji-textarea': true,
          'emoji-shortname': true,
          ImageResize: {},
          ImageDrop: true
          // container: '#q-toolbar',
          // handlers: {
          //   image() {
          //     QuillWatch.emit(this.quill.id);
          //   },
          // },
          // ImageExtend: {
          //   loading: true,
          //   name: 'pic',
          //   action: 'http://crm.test/api/pic-uploader',
          //   response: (res) => {
          //     console.log('res', res);
          //     return res.imgUrl;
          //   },
          // },
        }
        // theme: 'bubble',
      }
    }
  },
  methods: {
    toolbarOptions() {
      let ret
      switch (this.type) {
        case 'mini':
          ret = [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'video']
          ]
          break
        case 'none':
          ret = null
          break
        default:
          ret = [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            // [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
      }
      return ret
    },
    // testing() {
    //   console.log(this.content);
    // },
    // 当文档内容发生变化
    onContentChange({ html }) {
      this.$emit('change', html)
      // this.$emit('update:content', html)
    },
    openImageDailog() {
      this.$refs.imgUploader.open()
    },
    addImages(imgUrls) {
      if (imgUrls.length > 0) {
        imgUrls.forEach(rec => {
          this.addImageToEditor(rec.href)
        })
      }
    },
    // 打开图片上传组价
    callImageUp() {
      this.$refs.imgUploader.open()
    },
    addImageToEditor(imageUrl) {
      const range = this.$refs.editor.quill.getSelection() || {}
      this.$refs.editor.quill.insertEmbed(range.index || 0, 'image', imageUrl)
    },
    getContent() {
      return this.content
    }
  },
  mounted() {
    this.$refs.editor.$el.querySelector(
      '.ql-container'
    ).style.height = this.height
    if (this.type === 'full' || this.type === 'mini') {
      const qe = this.$refs.editor.quill
      const tb = qe.getModule('toolbar')
      tb.addHandler('image', () => {
        this.callImageUp()
        // QuillWatch.emit(this.quill.id);
      })
      tb.addHandler('emoji', () => {})
    }
  }
}
</script>

<style></style>
