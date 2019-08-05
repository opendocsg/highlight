<template>
  <div id="label-pill">
    {{ label.id }}
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
#label-pill {
}
</style>
