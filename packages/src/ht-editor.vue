<template>
  <div class="editor-wrap" :style="{ width :width+'px' }">
    <div class="editor" :id="editId" :style="{ width : width+'px' }"></div>

    <ht-pop v-if="is_image_pop && is_server">
      <ht-image-view :list="image_list" :request-api="requestApi" @submit="ht_image_submit"></ht-image-view>
    </ht-pop>

    <ht-pop v-if="is_image_pop && !is_server" width="500" height="308">
      <ht-image-input @submit="ht_image_input"></ht-image-input>
    </ht-pop>

  </div>
</template>

<script>
import E from "wangeditor";
import HtPop from "./ht-pop";
import HtImage from "./plugin/image/ht-image";
import HtImageView from "./plugin/image/ht-image-view";
import axiosRequest from "./request";
import HtImageInput from "./plugin/image/ht-image-input";


E.registerMenu("ht_image", HtImage);
export default {
  name: "ht-editor",
  components: { HtImageInput, HtImageView, HtPop },
  model: { event: "change", prop: "content" },
  props: {
    editId: { type: String, default: "", required: true },
    content: { type: String, default: "" },
    width: { type: [String, Number], default: 820 },
    height: { type: [String, Number], default: 450 },
    uploadApi: { type: String, default: "" },
    baseUrl : { type :String, default:'' },
    excludeMenus: {
      type: Array, default: function() {
        return ["link", "emoticon", "table", "code", "todo", "image", "video"];
      }
    }
  },
  data() {
    return {
      is_image_pop : false,
      image_list : [],
      is_video_pop : false,
      video_list : [],
    };
  },
  mounted() {
    if (this.editor) {
      this.init();
    }
  },
  computed: {
    editor() {
      return new E("#" + this.editId);
    },
    requestApi(){
      if(this.baseUrl){
        console.log(axiosRequest(this.baseUrl));
        return axiosRequest(this.baseUrl)
      }else{
        return false;
      }
    },
    is_server(){
      if(this.baseUrl){
        return true;
      }else{
        return false;
      }
    }
  },
  watch: {
    content(newValue,oldValue) {
      if(!oldValue){
        this.editor.txt.html(newValue)
      }else{
        if(newValue!=oldValue){
          this.$emit("change", newValue);
        }
      }
    }
  },
  methods: {
    init() {
      let that = this;
      let editor = this.editor;
      editor.config.height = this.height;
      editor.config.zIndex = 99;
      editor.config.excludeMenus = this.excludeMenus;
      editor.config.menus = editor.config.menus.concat("ht_image");
      editor.config.htImageCallback = function() {
        that.is_image_pop = !that.is_image_pop;
      };
      editor.config.onchange = function(html) {
        that.$emit("change", html);
      };
      editor.create();
      if (this.content) {
        editor.txt.html(this.content);
      }
    },
    //图片地址直接填写
    ht_image_input : function (e){
      if(e){
        console.log(e);
        if(!e.image || !/^(http|https)/.test(e.image)){
          window.alert('请填写正确图片地址');
          return;
        }
        let html = '';
        if(e.url){
          if(!/^(http|https)/.test(e.url)){
            window.alert('请填写正确链接地址');
            return;
          }
          html = '<p><a href="'+e.url+'"><img src="'+e.image+'" alt="'+e.alt+'" ';
          if(e.width){
            html = html + ' width="'+e.width+'" ';
          }
          if(e.height){
            html = html + ' height="'+e.height+'" '
          }
          html = html + '/></a></p>';
        }else{
          html = '<p><img src="'+e.image+'" alt="'+e.alt+'" ';
          if(e.width){
            html = html + ' width="'+e.width+'" ';
          }
          if(e.height){
            html = html + ' height="'+e.height+'" '
          }
          html = html + '/></p>';
        }
        this.editor.cmd.do('insertHTML',html);
        this.is_image_pop = false;
      }else{
        this.is_image_pop = false;
      }
    },
    ht_image_submit :function (e){
      let that = this;
      if(e){
        e.map(function (item){
          let html = '<p><img src="'+item+'" alt="'+item+'"/></p>';
          that.editor.cmd.do('insertHTML',html);
        })
      }
      this.is_image_pop = false;
    },
  }
};
</script>

<style>
.editor-wrap { }
.editor img { max-width: 100%; }
</style>