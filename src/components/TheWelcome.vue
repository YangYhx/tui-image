<template>
  <p class="title">画板Visit</p>

  <div class="contetn">
    <el-link type="primary" href="/image-edit">图片编辑To</el-link> 
    <el-link href="/canvas-img">画布编辑To</el-link>
    <el-link href="/canvas-drag">拖拽上传</el-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>