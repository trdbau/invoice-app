<template>
  <div id="app">
    <notifications />
    <Nav />
    <div class="container mx-auto flex-grow py-4 flex items-center z-0">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/layout/Nav';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  @apply w-screen min-h-screen bg-gray-200 pt-16 flex;
}
</style>
