<template>
  <div class="sponsor__container">
    <div class="title">您的每一分付出，都是对我们的肯定与鼓励!</div>
    <div class="title">赞助名单</div>
    <ul>
      <li>阳光明媚 60￥</li>
      <li>皮里丘 18.88￥</li>
      <li>河北杨科科技有限责任公司 100￥</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'sponsor'
})
</script>
<style lang="scss" scoped>
.sponsor__container {
  padding: 20px;
  font-size: 14px;
  & .title {
    font-size: 18px;
    font-weight: 700;
  }
  & .collection {
    display: flex;
    & .img__box {
      width: 200px;
      height: 270px;
      margin: 20px 50px 20px 0;
      & img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  & ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & li {
      margin: 10px 40px 0 0;
      font-weight: 700;
    }
  }
}
</style>