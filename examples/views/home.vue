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
      content: '<p>1111</p><p>222222</p><p>33333</p><p>444444</p><p>555</p>'
    };
  }
};
</script>
