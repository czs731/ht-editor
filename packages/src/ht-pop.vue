<template>
  <div>
    <div class="ht-pop" :style="{ zIndex :zIndex }"></div>
    <div class="ht-wrap" :style="{ zIndex :(zIndex+1), width :width+'px',height :height+'px' }">
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "ht-pop",
  props: {
    zIndex: { type: [String, Number], default: 1000 },
    width: { type: [String, Number], default: 820 },
    height: { type: [String, Number], default: 600 }
  }
};
</script>

<style scoped>
.ht-pop { position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 100; }
.ht-wrap { position: fixed; background: #ffffff; border-radius: 5px; overflow: hidden; left: 50%; top: 50%; transform: translateY(-50%) translateX(-50%); }

</style>