<template>
  <div v-if="loading" class="loading">
    <img src="@/assets/images/loading-1.gif" alt="loading">
  </div>
  <RouterView />
</template>

<style>
  .loading{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
  }
</style>

<script>
import { ref,computed} from 'vue';
import { GETTER_LOADING } from '@/store/constants'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()
    const loading = computed(()=> store.getters[GETTER_LOADING])

    return {
      loading,
      store
    }
  },
}
</script>
