<template>
  <div class="image-input-wrap">
    <div class="input-line">
      <div class="line-label">图片地址</div>
      <div class="line-input">
        <input type="text" v-model="post.image" placeholder="图片地址">
      </div>
    </div>
    <div class="input-line">
      <div class="line-label">描述</div>
      <div class="line-input">
        <input type="text" v-model="post.alt" placeholder="描述">
      </div>
    </div>
    <div class="input-line">
      <div class="line-label">宽</div>
      <div class="line-input">
        <input type="text" v-model="post.width" placeholder="宽 默认图片大小">
      </div>
      <div class="line-label">高</div>
      <div class="line-input">
        <input type="text" v-model="post.height" placeholder="高 默认图片大小">
      </div>
    </div>
    <div class="input-line">
      <div class="line-label">链接地址</div>
      <div class="line-input">
        <input type="text" v-model="post.url" placeholder="链接地址">
      </div>
    </div>
    <div class="input-button">
      <div class="input-button-flex"></div>
      <div class="ht-image-button">
        <div class="ht-image-cancel" @click="input_cancel">取消</div>
        <div class="ht-image-success" @click="input_submit">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ht-image-input",
  data() {
    return {
      post: {
        image : '',
        alt : '',
        width : '',
        height : '',
        url : '',
      }
    };
  },
  methods: {
    input_cancel:function() {
      this.$emit('submit',false);
    },
    input_submit : function (){
      this.$emit('submit', this.post);
    },
  }
};
</script>

<style scoped>
.image-input-wrap { padding: 10px; }
.input-line { height: 40px; border: 1px solid #ebebeb; border-radius: 5px; overflow: hidden; display: flex; margin-bottom: 15px; }
.line-label { width: 80px; padding: 0 10px; background: #ebebeb; color: #999999; height: 40px; line-height: 40px; }
.line-input { flex: 1; height: 40px; line-height: 40px; overflow: hidden; }
.line-input input { width: 100%; height: 40px; border: none; outline: none; box-sizing: border-box; padding: 0 10px; }

.input-button { padding: 10px; height: 40px; line-height: 40px; display: flex; overflow: hidden; }
.input-button-flex { padding-right: 10px; flex: 1; display: flex; }
.ht-image-button { display: flex; }
.ht-image-cancel { background: #f2f2f2; color: #999999; padding: 0 20px; margin-right: 10px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; }
.ht-image-success { background: #409eff; color: #ffffff; padding: 0 20px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; }
</style>