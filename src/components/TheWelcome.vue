<template>
  <p class="title">画板Visit</p>

  <div class="contetn">
    <el-link type="primary">图片编辑To</el-link> 
    <!-- href="/image-edit" -->
    <el-link href="/canvas-img">画布编辑To</el-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>