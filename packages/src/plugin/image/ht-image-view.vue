<template>
  <div class="ht-image">
    <div class="ht-image-list">
      <div class="ht-image-item" title="返回" v-if="dir.length" @click="dir_back">
        <svg t="1632367072613" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4046" width="50" height="50"><path d="M710.153924 8.980397L266.007127 460.692524a81.118646 81.118646 0 0 0 0.861532 114.476097l446.192936 441.050666a26.922883 26.922883 0 0 0 37.853573-38.284339L304.722232 536.884282a27.27288 27.27288 0 0 1-0.323074-38.445877L748.545955 46.726278A26.922883 26.922883 0 1 0 710.180847 9.00732z" p-id="4047" fill="#cdcdcd"></path></svg>
      </div>
      <template v-for="(val,key) in list">
        <template v-if="val.is_dir">
          <div class="ht-image-item" :key="key" :title="'名称：'+val.name+'\n创建时间：'+val.time" @click="dir_change(val.name)">
            <svg t="1632366323008" class="icon" viewBox="0 0 1228 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3191" width="50" height="50"><path d="M1051.307 143.36c78.916 0 143.36 64.375 143.36 143.36v546.133c0 78.848-64.376 143.292-143.36 143.292H177.493c-78.916 0-143.36-64.375-143.36-143.36V177.493c0-78.848 64.376-143.36 143.36-143.36h341.812L628.53 143.36h422.776zM177.493 102.4c-41.233 0-75.093 33.86-75.093 75.093v655.36c0 41.165 33.86 75.025 75.093 75.025h873.814c41.233 0 75.093-33.86 75.093-75.093V286.652c0-41.233-33.86-75.094-75.093-75.094H600.269L491.042 102.4H177.493z" p-id="3192" fill="#cdcdcd"></path></svg>
            <div class="ht-image-item-title">{{val.name}}</div>
          </div>
        </template>
        <template v-if="!val.is_dir">
          <div class="ht-image-item" :key="key" :title="'名称：'+val.name+'\n宽：'+val.width+'px\n高：'+val.height+'px\n大小：'+val.size+'KB\n创建时间：'+val.time" @click="image_choose(val.url)">
            <img :src="val.url" :alt="val.name">
          </div>
        </template>
      </template>

    </div>
    <div class="ht-image-button-choose">
      <div class="ht-image-choose">
        <template v-for="(val,key) in choose">
          <div class="ht-image-option" :key="key" @click="image_del(key)" :title="val">
            <img :src="val" alt="val">
          </div>
        </template>
      </div>
      <div class="ht-image-button">
        <div class="ht-image-inline" @click="image_inline">在线图片</div>
        <div class="ht-image-dir" @click="image_dir">创建文件夹</div>
        <div class="ht-image-upload" title="如果不是在目录中，会自动上传至生成当前年月文件夹中">上传
          <input type="file" @change="image_upload" multiple accept=".jpg,.jpeg,.png,.gif">
        </div>
        <div class="ht-image-cancel" @click="image_cancel">取消</div>
        <div class="ht-image-success" @click="image_submit">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ht-image-view",
  props : {
    requestApi : { type : [String,Object,Array], default:'' }
  },
  data() {
    return {
      list: [],
      dir : [],
      choose : [],
    };
  },
  mounted: async function() {
    if(this.requestApi){
      await this.get_list();
    }
  },
  methods: {
    get_list : async function() {
      try {
        let res = await this.requestApi.post({ ac:'image', dir : this.dir.join('/') });
        if(res){
          this.list = res.list;
        }
      }catch (e) {
        console.log(e);
        return false;
      }
    },
    dir_change : async function (name){
      try {
        if(name){
          this.dir.push(name);
          this.list = [];
          await this.get_list();
        }
      }catch (e) {
        console.log(e);
        return false;
      }
    },
    dir_back : async function (){
      try {
        let dir = this.dir
        dir.pop();
        this.dir = dir;
        this.list = [];
        await this.get_list();
      }catch (e) {
        console.log(e);
        return false;
      }
    },
    image_choose : function (url){
      let check = this.choose.indexOf(url);
      if(check == -1){
        this.choose.push(url);
      }
    },
    image_del : function (key) {
      let choose = this.choose;
      choose.splice(key, 1);
      this.choose = choose;
    },
    image_cancel : function (){
      this.$emit('submit',false);
    },
    image_submit : function (){
      if(this.choose.length){
        this.$emit('submit',this.choose);
      }else{
        this.$emit('submit',false);
      }
    },
    image_upload : async function (e){
      try {
        let that = this;
        let files = e.target.files || false;
        if(files){
          files.forEach(async function (item){
            let form = new FormData();
            form.append('file',item);
            form.append('ac','upload');
            form.append('dir',that.dir.join('/'));
            await that.requestApi.post(form);
          })
          setTimeout(()=>{
            this.get_list();
          },500);
        }
      }catch (e) {
        console.log(e);
        return false;
      }
    },
    image_inline : async function (){
      try {
        let url = window.prompt('请填写在线图片地址');
        if(url && /^http/.test(url)){
          this.choose.push(url);
        }
      }catch (e) {
        console.log(e);
        return false;
      }
    },
    image_dir : async function (){
      let dir = window.prompt('请填写文件夹名称，只能是英文/数字');
      if(dir && /^\w+$/.test(dir)){
        await this.requestApi.post({ac:'create_dir', dir :this.dir.join('/'),name : dir});
        setTimeout(()=>{
          this.get_list();
        },500);
      }
    },
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.2);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(0, 0, 0, .5);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, .5);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(0, 0, 0, .5);
  background-color: #f2f2f2;
}

.ht-image-list { padding: 0 10px; padding-top: 10px; width: 800px; height: 530px; overflow-x: hidden; overflow-y: auto; }
.ht-image-list:after { content: ''; display: table; clear: both; }
.ht-image-item { width: 100px; height: 100px; line-height: 100px; text-align: center; float: left; border: 1px solid #ebebeb; border-radius: 5px; overflow: hidden; margin-right: 10px; margin-bottom: 10px; cursor: pointer; position: relative; }
.ht-image-item img { width: 100%; margin-top: 50%; transform: translateY(-50%); }
.ht-image-item svg { margin: 25px; }
.ht-image-item-title { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); color: #ffffff; padding: 0 10px; height: 24px; line-height: 24px; font-size: 12px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; }

.ht-image-item:hover { border-color: #409eff; }
.ht-image-item:hover .ht-image-item-title { background: #409eff; color: #ffffff; }


.ht-image-button-choose { padding: 10px; height: 40px; line-height: 40px; display: flex; overflow: hidden; }
.ht-image-choose { padding-right: 10px; flex: 1; display: flex; overflow: hidden; }
.ht-image-option { width: 40px; height: 40px; box-sizing: border-box; border: 1px solid #ebebeb; border-radius: 5px; margin-right: 5px; cursor: pointer; }
.ht-image-option img { width: 100%; margin-top: 50%; transform: translateY(-50%); }
.ht-image-option:hover { border-color: #409eff; }
.ht-image-button { display: flex; }
.ht-image-cancel { background: #f2f2f2; color: #999999; padding: 0 20px; margin-right: 10px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; }
.ht-image-upload { background: #67C23A; color: #ffffff; padding: 0 20px; margin-right: 10px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; position: relative; }
.ht-image-inline { background: #E6A23C; color: #ffffff; padding: 0 20px; margin-right: 10px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; position: relative; }
.ht-image-dir { background: #F56C6C; color: #ffffff; padding: 0 20px; margin-right: 10px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; position: relative; }
.ht-image-upload input { opacity: 0; position: absolute; left: 0; right: 0; width: 100%; height: 40px; cursor: pointer; }
.ht-image-success { background: #409eff; color: #ffffff; padding: 0 20px; height: 40px; line-height: 40px; border-radius: 5px; cursor: pointer; }
</style>