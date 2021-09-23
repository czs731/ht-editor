<template>
  <div>
    <ht-editor edit-id="test" v-model="content" base-url="http://192.168.0.121/service_api/api_v2/wang.php"></ht-editor>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    setTimeout(()=>{
      this.content = '<p>1111111111111111111</p><p>1111111111111111111</p><p>1111111111111111111</p>';
    },200)
  }
};
</script>
