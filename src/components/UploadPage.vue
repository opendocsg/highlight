<template>
  <div class="upload-page">
    <div class="container-fluid d-flex justify-content-center">
      <div id="dropbox">
        <p>
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: 'Drag and drop a text file here!'
    }
  },
  mounted() {
    let dropbox = document.getElementById("dropbox")
    dropbox.addEventListener("dragenter", this.dragenter, false)
    dropbox.addEventListener("dragover", this.dragover, false)
    dropbox.addEventListener("drop", this.drop, false)
  },
  beforeDestroy() {
    let dropbox = document.getElementById("dropbox")
    if (dropbox === null) return
    dropbox.removeEventListener("dragenter", this.dragenter)
    dropbox.removeEventListener("dragover", this.dragover)
    dropbox.removeEventListener("drop", this.drop)
  },
  methods: {
    dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragover(e) {
      e.stopPropagation();
      e.preventDefault();
      this.message = 'Drop your file here!'
    },
    drop(e) {
      e.stopPropagation();
      e.preventDefault();

      const dt = e.dataTransfer;
      const file = dt.files[0];
      // TODO: Check file extension
      let reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.onSuccessUpload(file.name, reader.result)
      }
    },
    onSuccessUpload(title, rawText) {
      this.$router.push({
        name: 'highlightPage',
        params: {
          title: title,
          processedText: this.processText(rawText)
        }
      })
    },
    processText(text) {
      return text.split('\n')
    }
  }
}
</script>

<style>
.upload-page {
}

#dropbox {
  background-color: #EBEBEB;
  display: flex; 
  align-items: center;
  justify-content: center;
  border: 5px dashed #C4C4C4;
  border-radius: 25px;
  width: 650px;
  height: 450px;
}
</style>
