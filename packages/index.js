import HtEditor from './src/ht-editor';

HtEditor.install = function (Vue){
  Vue.component(HtEditor.name,HtEditor);
}

export default HtEditor;