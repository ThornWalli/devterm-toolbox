import{a,I as l,D as s}from"./TextField.0ea4c2fc.js";import{A as r,M as p}from"./Dialog.42bcfbff.js";import{I as c}from"./TextButton.2fda835a.js";import{n as u,d}from"./index.d17ffcf7.js";import"./vendor.b1428349.js";import"./devterm.94c2d908.js";var m=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("app-dialog",t._g(t._b({ref:"dialog",staticClass:"dialog-options",attrs:{"escape-close":!1,title:"Options"},on:{open:t.onDialogOpen},scopedSlots:t._u([{key:"default",fn:function(){return[e("input-drop-down",{attrs:{label:"Theme",options:t.themeOptions},model:{value:t.model.theme,callback:function(n){t.$set(t.model,"theme",n)},expression:"model.theme"}}),e("hr"),e("input-drop-down",{attrs:{label:"Start type",options:t.startTypeOptions},model:{value:t.model.startType,callback:function(n){t.$set(t.model,"startType",n)},expression:"model.startType"}}),e("input-text-field",{attrs:{label:"Host",placeholder:"Enter host\u2026"},model:{value:t.model.host,callback:function(n){t.$set(t.model,"host",n)},expression:"model.host"}}),e("input-text-field",{attrs:{type:"Number",label:"Port",min:"1024",step:"1",value:t.model.port},on:{input:function(n){t.model.port=parseInt(n)}}}),e("div",{staticClass:"buttons"},[e("input-text-button",{attrs:{color:"danger",text:"Reset Options and Profiles"},on:{click:t.onClickResetOptions}})],1)]},proxy:!0},{key:"buttons",fn:function(){return[e("input-text-button",{attrs:{color:"primary",text:"Apply"},on:{click:t.onClickApply}}),e("input-text-button",{attrs:{color:"secondary",text:"Close"},on:{click:function(n){return t.close()}}})]},proxy:!0}])},"app-dialog",t.$attrs,!1),t.$listeners))},f=[];const h={components:{AppDialog:r,InputTextButton:c,InputTextField:a,InputDropDown:l},mixins:[p],inheritAttrs:!1,data(){return{model:d(),themeOptions:[["Amber","amber"],["Green","green"],["Black & White","blackWhite"],["White & Black","whiteBlack"]].map(([t,o])=>new s({title:t,value:o})),startTypeOptions:[["Select start type",""],["Local","local"],["Remote","remote"]].map(([t,o])=>new s({title:t,value:o}))}},methods:{onDialogOpen(){this.model=Object.assign({},this.$config.data)},onClickApply(){this.$config.set(this.model),this.$config.save(),this.close()},async onClickResetOptions(){await this.$dialog.prompt("Do you really want to reset everything?","Options Reset")&&this.$config.reset()}}},i={};var _=u(h,m,f,!1,x,"4298ff86",null,null);function x(t){for(let o in i)this[o]=i[o]}var D=function(){return _.exports}();export{D as default};
