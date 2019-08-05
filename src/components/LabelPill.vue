<template>
  <div id="label-pill">
    <button 
      type="button" 
      class="btn btn-lg" 
      :style="{'background-color': label.color, color:'white'}"
    >
      {{ label.type }} 
      <span class="badge badge-light">{{ label.annotations.length }}</span>
    </button>
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
  margin: 5px;
}
</style>
