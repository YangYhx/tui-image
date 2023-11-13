<template>
  <div>
    <p class="title">拖拽上传</p>
    <div class="flex">
      <div class="img-box">
        <img :src="item" alt="" v-for="item in imgList" :key="item" draggable="true" />
      </div>
      <div ref="contentRef" class="canvas-content">
        <canvas ref="canvasRef" id="canvas"></canvas>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

// const imgList = Object.values(import.meta.glob('/src/assets/img/*',{eager:true})).map(((v:any) => v.default))
const imgList = [
  'https://static1.bitautoimg.com/arkweb/mess-warning.png',
  'https://static1.bitautoimg.com/arkweb/mess-error.png',
  'https://static1.bitautoimg.com/arkweb/mess-success.png',
  'https://static1.bitautoimg.com/arkweb/extension.png'
]

const canvasRef = ref(null)
const contentRef = ref(null)
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (canvasRef.value) {
    ctx = (canvasRef.value as HTMLCanvasElement).getContext('2d');

    canvasRef.value.addEventListener('dragover', function(e) {
      e.preventDefault();
    }, false);

    canvasRef.value.addEventListener('drop', function(e) {
      e.preventDefault();
      let file = e.dataTransfer?.files[0];
      console.log('canvasRef==>', file)
      if (file) {
        let reader = new FileReader();
        reader.onload = function(event){
          let img = new Image();
          img.onload = function(){
            if (ctx) {
              canvasRef.value.width = img.width;
              canvasRef.value.height = img.height
              ctx.drawImage(img,0,0);
            }
          }
          img.src = event?.target?.result as string;
        }
        reader.readAsDataURL(file);
      }
    }, false)
  }

  if (contentRef.value) {
    contentRef.value.addEventListener('dragover', function(e) {
      e.preventDefault();
    }, false);

    contentRef.value.addEventListener('drop', function(e) {
      e.preventDefault()
      let file = e.dataTransfer?.files[0];
      console.log('contentRef==>', file)
    }, false)
  }
})
</script>

<style lang="scss" scoped>
.img-box {
  width: 300px;

  & img {
    width: 80px; height: 80px;
  }
}

.canvas-content {
  flex: 1;

  & #canvas {
    width: 100%; height: 100%;
    border: 1px solid #1a1a1a;
  }
}
</style>