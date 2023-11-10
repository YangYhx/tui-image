<template>
  <div class="flex-box">
    <div class="upload-box">
      <p>上传文件</p>
      <el-upload
        class="upload-demo"
        action=""
        multiple
        :before-upload="beforeUpload"
        :limit="3"
        :show-file-list="false"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
    </div>
    <div class="canvas-box">
      <p>画布区域</p>
      <div id="tui-image-editor" @click="clickCancas"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'tui-image-editor/dist/tui-image-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import ImageEditor from 'tui-image-editor'
import { localeZh, customTheme } from './editor-config.js'


import {reactive, ref, nextTick} from 'vue'
const imageInfo = ref({
  name: '',
  suffix: ''
})
const imgUrl = ref('')

// const imageSize:{ width: number, height: number } = reactive({
//   width: 0,
//   height: 0
// })

const beforeUpload = (file: any) => {
  imageInfo.value = JSON.parse(JSON.stringify(file))
      const nameInfo = getFileNameAndExtension(file.name)
      imageInfo.value.name = nameInfo.name
      imageInfo.value.suffix = nameInfo.extension
      // 只允许上传图片
      if (/image/.test(file.type)) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const result = reader.result
          const img = new Image()
          imgUrl.value = result

          handleInit()
          // img.onload = () => {
          //   imageSize.width = img.width
          //   imageSize.height = img.height
          // }
        }
      } else {
        return
      }
}

const getFileNameAndExtension = (filename: String) => {
  let dotIndex = filename.lastIndexOf('.')
  let name = filename.substring(0, dotIndex)
  let extension = filename.substring(dotIndex + 1)
  return {
    name: name,
    extension: extension
  }
}

const clickCancas = () => {
  console.log(12313)
}

const instance:any = ref()
const imageSize:any = ref()
const handleInit = () => {
  console.log('handleInit', imgUrl.value)
  nextTick(() => {
    instance.value = new ImageEditor(document.querySelector('#tui-image-editor'), {
      editVisible: false,
      editUrl: imgUrl.value,
      postAction: '',
      mobjectId: 0,
      nameVisible: false,
      nameInput: '',
      useDefaultUI: !0,
      usageStatistics: false, //这个一定要写要不然会报错
      includeUI: {
        loadImage: {
          path: imgUrl.value, //加载的图片链接
          name: 'image' //图片名称（不重要）
        },
        //操作菜单栏
        menu: [
          'crop', // 裁切
          'flip', // 翻转
          'rotate', // 旋转
          'draw', // 添加绘画
          'shape', // 添加形状
          'icon', // 添加图标
          'text', // 添加文本
          'mask', // 添加覆盖
          // 'filter' // 添加滤镜
        ],
        menuBarPosition: 'left', //操作栏位置
        initMenu: 'filter',
        locale: localeZh, //语言
        theme: customTheme //主题样式
      },
      cssMaxWidth: 700, //宽
      cssMaxHeight: 600 //高
    })

    setTimeout(() => {
      imageSize.value = instance.value.getCanvasSize()
      document.querySelector('.tui-image-editor-help-menu').className = 'tui-image-editor-help-menu  bottom'

      const button = document.querySelector('.tui-image-editor-menu').querySelectorAll('.tui-image-editor-item')
      button.forEach(item => {
        item.addEventListener('click', function() {
          // if (item.classList.contains('active')) {
          //   that.sizeLeft = '296px'
          // } else {
          //   that.sizeLeft = '66px'
          // }
        })
      })
    }, 500)
  })
}
</script>

<style lang="scss" scoped>
.flex-box {
  width: 100vw;
  height: 100vh;
  display: flex;

  & .upload-box {
    width: 200px;
  }

  & .canvas-box {
    flex: 1
  }
}

.canvas-box {
  position: relative;
  width: 100%;
  background: #fff;
  height: calc(100vh - 126px);
  .op-box {
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 999;
    display: flex;
    align-items: center;
    .open-btn {
      margin-right: 8px;
      border-radius: 16px !important;
    }
    .dom-btn {
      z-index: 999;
      border-radius: 16px !important;
    }
  }
  .size-box {
    position: absolute;
    padding: 0 9px;
    height: 23px;
    line-height: 23px;
    background: #f4f6f8;
    border-radius: 12px;

    font-size: 12px;
    top: 16px;
    left: 296px;
    color: #576168;
    z-index: 999;
  }
  .tui-image-editor-container {
    background:#fff;

    :deep(.tui-image-editor-canvas-container){
      background: url(https://static1.bitautoimg.com/arkweb/robot/image-bg.jpeg) repeat;
    }
    :deep(.color-picker-control) {
      top: 40px !important;
    }
    :deep(.color-picker-control .triangle) {
      top: -8px;
      border-right: 7px solid transparent;
      border-top: 0;
      border-left: 7px solid transparent;
      border-bottom: 8px solid #fff;
    }
    :deep( .tie-filter-tint-color),
    :deep(.tie-filter-blend-color) {
      .color-picker-control {
        height: 180px !important;
      }
    }
    :deep(.tie-filter-tint-color) {
      .color-picker-control {
        label {
          display: block;
          margin-top: 8px;
        }
      }
    }
    :deep(.tui-image-editor-main) {
      top: 0;
    }
    :deep(.tui-image-editor-main-container) {
      background: #fff !important;
      border-color: transparent !important;
      border-width: 0 !important;
      left: 50px;
      width: calc(100% - 50px);
      .tui-image-editor-submenu {
        width: 230px;
        border-right: 10px solid #f4f6fa;
      }

      .tui-image-editor-button {
        > div {
          margin-bottom: 8px;
        }
        &.apply,
        &.resetFlip,
        &.cancel {
          width: 96px;
          height: 28px;
          line-height: 28px;
          border-radius: 14px;
          color: #fff;
          background: #3366ff;
          margin: 0;
          label {
            color: #fff;
            font-size: 13px;
          }
          .svg_ic-menu,
          .svg_ic-submenu {
            display: none;
          }
        }
        &.resetFlip {
          width: 200px;
          line-height: 12px;
        }
        &.cancel {
          background: #8a8a8a;
          margin-left: 8px;
        }
      }
      .tie-mask-apply {
        .tui-image-editor-button {
          &.apply {
            width: 200px;
          }
        }
      }
      .tui-image-editor-range-wrap label {
        color: #1a1a1a;
        font-size: 16px;
        font-weight: bold;
        margin-left: 12px;
      }
      .tie-crop-preset-button {
        margin-bottom: -16px;
      }
      // .tui-image-editor-partition.only-left-right {
      //   margin-top: 0;
      // }
      .tui-image-editor-button.preset {
        > div {
          margin-bottom: 8px;
        }
      }
      .tui-image-editor-partition.tui-image-editor-newline {
        display: none;
      }
      .tui-image-editor-submenu > div {
        vertical-align: top;
      }
      .tui-image-editor-submenu-style {
        background: #fff !important;
      }
      .tui-image-editor-partition {
        width: 196px;
        border-top: 1px solid #ebebeb;
        // margin-bottom: 16px;
        // &:first-child {
        //   margin-top: 0;
        // }

        > div {
          display: none;
        }
      }
      .filter-color-item {
        .tui-image-editor-checkbox label > span::before {
          left: -15px;
        }
        .tui-image-editor-checkbox {
          float: none;
        }
        .tui-image-editor-button {
          margin: 0 8px 0 8px;
          margin-bottom: 5px;

          .color-picker-value {
            margin-bottom: 4px;
            border-color: #fff;
            width: 54px;
            height: 54px;
          }
          .color-picker-value + label {
            color: #1c212a;
          }
        }
      }

      .tui-image-editor-submenu-align {
        padding-left: 12px;
        .tui-image-editor-checkbox-wrap.fixed-width {
          width: auto;
        }
        &:first-child {
          margin-bottom: -16px;
          // padding-top: 16px;
        }
        .tui-image-editor-range-wrap {
          margin-left: 16px;
        }
        // margin-top: 0;

        &:nth-child(3) {
          margin-bottom: -16px;
          .tui-image-editor-checkbox-group:nth-child(2),
          .tui-image-editor-checkbox-group:nth-child(3) {
            .tui-image-editor-range-wrap {
              margin-top: -16px;
            }
          }
        }
        &:nth-child(5) {
          margin-bottom: -16px;
          .tui-image-editor-checkbox-group:first-child {
            .tui-image-editor-range-wrap {
              margin-top: -16px;
            }
          }
        }
      }
      .tui-image-editor-checkbox {
        float: left;
        margin-bottom: 16px;
      }
      .tui-image-editor-checkbox input {
        width: 16px;
        height: 16px;
      }
      .tui-image-editor-checkbox input[type='checkbox']:checked + span:before {
        background-image: url('https://static1.bitautoimg.com/arkweb/robot/checked.png');
        background-size: 100% 100%;
        width: 16px;
        height: 16px;
      }
      .tui-image-editor-checkbox label {
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tui-image-editor-checkbox label > span {
        color: #1a1a1a;
        line-height: 16px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        padding-top: 0;
        &::before {
          top: 0;
        }
      }
      .tui-image-editor-range-wrap.short .tui-image-editor-range {
        display: block;
        width: 172px;
        margin-top: 0px;
        margin-bottom: 16px;
      }
      .tui-image-editor-range-wrap.tui-image-editor-newline.short {
        margin-top: -8px;
        .tui-image-editor-ranger {
        }
        label {
          font-weight: normal;
          font-size: 12px;
          margin-left: 0;
          color: #505a71;
        }
      }
      .tui-image-editor-virtual-range-pointer {
        width: 13px;
        height: 13px;
        background-color: #ffffff;
        border: 2px solid #3366ff;
      }
      .tui-image-editor-virtual-range-subbar {
        background-color: #dddddd;
        height: 3px;
      }
      .tui-image-editor-virtual-range-bar {
        background-color: #3366ff;
        height: 3px;
      }
    }
    :deep(.tui-image-editor-controls) {
      background: #ffffff;
      width: 50px;

      .tui-image-editor-menu {
        padding-top: 6px;
        width: 50px;
        vertical-align: top;
        background: #ffffff;
        border-right: 1px solid #ebebeb;
      }
    }
    :deep(.tui-image-editor-help-menu) {
      white-space: nowrap;
      display: block;
      // width: 374px;

      background: #f4f6fa;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      width: 394px;
      height: 40px;
      bottom: 24px;
      top: auto;
      left: 50%;
      margin-left: 180px;
      transform: translateX(-50%);
      .svg_ic-menu {
        height: 16px;
        width: 16px;
      }
      .tui-image-editor-item {
        padding: 8px 10px;
        margin-top: 4px;
        use.normal.use-default {
          fill: #000;
          stroke: #000;
        }

        cursor: not-allowed;
        &.on,
        &.enabled:hover {
          background: #fff;
          cursor: pointer;
        }
        &:nth-child(4),
        &:nth-child(9) {
          display: none;
        }
        .tui-image-editor-icpartition {
          display: none;
        }
      }
    }
  }
}
</style>