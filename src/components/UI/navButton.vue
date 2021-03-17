<template>

  <q-item
    class="rounded-borders"
    :class="$router.currentRoute.path == page.route ? 'shadow-10 bg-hover' : ''"
    clickable
    @click="$router.push(page.route)">

      <q-item-section avatar>
        <q-icon
          size="20px"
          :name="page.icon"/>
      </q-item-section>

      <q-item-section class="text-weight-light">
        {{page.name}}
      </q-item-section>

  </q-item>

</template>

<script>
export default {
  props:{
    page: Object
  },
  data() {
    return {
      pages:
      [
        {
        name: 'Chat',
        icon: 'chat',
        route: '/chat'
        },
        {
        name: 'Classes',
        icon: 'class',
        route: '/classes'
        },
        {
        name: 'Calendar',
        icon: 'event',
        route: '/calendar'
        },

      ]
    }
  },

  watch:{
    '$route':{
      handler(){
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style>

</style>