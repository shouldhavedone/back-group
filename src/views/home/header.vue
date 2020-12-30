<template>
  <div class="header-container">我是头部</div>
</template>
<script>
export default {};
</script>
<style lang="less">
@height: 100vh/960px;

.header-container {
  height: 50px * @height;
  width: 100%;
  padding: 0 24px;
  background-color: #fff;
  box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.08);
}
</style>