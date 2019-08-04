<template>
  <div class="app-header">
    <div class="left-element">
      <b-dropdown
        class="file-dropdown"
        text="File"
        variant="transparent"
      >
        <b-dropdown-item @click="uploadFile()">
          Upload txt file... &nbsp; ⌘U
        </b-dropdown-item>
        <input id="uploadBtn" type="file" @change="loadFile">
        <b-dropdown-item>
          Export csv file... &nbsp; ⌘E
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <span class="title"><i>highlight</i></span>
    <span class="right-element"></span>
  </div>
</template>

<script>
  export default {
    methods: {
      loadFile () {
        const file = document.getElementById('uploadBtn').files[0]
        // TODO: Check file extension
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const text = reader.result
          this.$root.$emit('fileUploaded', file.name, text)
        }
      },
      uploadFile () {
        document.getElementById('uploadBtn').click()
      }
    }
  }
</script>

<style scoped>
  .app-header {
    position: absolute;
    height: 67px;
    left: 0px;
    right: 0px;
    top: 0px;
    background: #F1F3AF;
    display: flex;
    align-items: center;
  }
  .file-dropdown {
    float: left;
    margin-left: 20px;
  }
  input[type="file"] {
    display: none;
  }
  .left-element {
    flex: 1;
  }
  .right-element {
    flex: 1;
  }
  .title {
    font-size: 24px;
    line-height: 67px;
    justify-self: center;
    margin-left: auto;
    flex: 1;
  }
</style>
