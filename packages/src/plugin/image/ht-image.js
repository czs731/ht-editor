import E from 'wangeditor';
const {BtnMenu} = E;

class HtImage extends BtnMenu {
  constructor(editor) {
    const $elem = E.$(
      `<div class="w-e-menu" data-title="上传图片">
               <i class="w-e-icon-image"></i>
            </div>`
    )
    super($elem, editor)
  }

  clickHandler(e) {
    this.editor.config.htImageCallback(e);
  }

  tryChangeActive(){
    if(this.isActive){
      this.unActive();
    }else{
      this.active();
    }
  }
}

export default HtImage;