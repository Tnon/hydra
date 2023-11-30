<template>
  <custom-icon @click="treeFold" :type="fold ? '#axysxzhedieqian' : '#axysxzhedie'" size="20" />
</template>

<script lang="ts" setup>
  // 接收参数
  const props = defineProps({
    fold: Boolean,
  });
  // 派发
  const emit = defineEmits(['update:fold']);
  // 树的折叠
  const treeFold = () => {
    emit('update:fold', !props.fold);
  };
</script>
