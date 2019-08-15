<template>
  <div id="label-pill">
    <button 
      type="button" 
      class="btn btn-lg" 
      :style="{'background-color': label.color, color:'white'}"
    >
      {{ label.type }} 
      <span class="badge badge-light" style="margin-right: 5px;">{{ label.annotations.length }}</span>
      <svg class="octicon octicon-trashcan" @mousedown.prevent="$emit('removelabel', label.type)"
      viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path></svg>
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
