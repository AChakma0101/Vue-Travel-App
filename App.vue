<template>
  <TheNavigation />

  <div class="container">
    <router-view v-slot="{Component}">
      <!--<transition name="slide" mode="out-in">-->
      <!--<transition name="moveUp">-->
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation.vue'

export default{
  components: {TheNavigation}
}
</script>
<style lang="css">
  /*.slide-enter-active,
  .slide-leave-active{
    transition: opacity 1s, transform 1s;
  }
  .slide-enter-from,
  .slide-leave-to{
    opacity: 0;
    transform: translateX(-30%);
  }
  .moveUp-enter-active {
    animation: fadeIn 1s ease-in;
  }
  @keyframes fadeIn {
    0% { opacity: 0;}
    50% { opacity: 0.5;}
    100% { opacity: 1;}
  }
  .moveUp-leave-active {
    animation: moveUp 0.3s ease-in;
  }
  @keyframes moveUp {
    0% { transform: translateY(0);}
    100% { transform: translateY(-400px);}
  }*/
  .fade-enter-active,
  .fadde-leave-active{
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fadde-leave-to{
    opacity: 0;
  }
</style>