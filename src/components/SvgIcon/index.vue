<template>
  <svg :style="{width,height}">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>
<script setup lang="ts">
    defineProps({
        //xlink:herf的前缀
        prefix:{
            type:String,
            default:'#icon-'
        },
        //提供组件的名字
        name:String,
        //接收父组件传递的颜色
        color:{
            type:String,
            default:''
        },
        //接收父组件传来的图标宽度
        width:{
            type:String,
            default:'16px'
        },
        //接收父组件传来的图标高度
        height:{
            type:String,
            default:'16px'
        }

    })
</script>
<style scoped>

</style>
