var c=Object.defineProperty;var r=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var s=(t,o,e)=>o in t?c(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e,a=(t,o)=>{for(var e in o||(o={}))p.call(o,e)&&s(t,e,o[e]);if(r)for(var e of r(o))d.call(o,e)&&s(t,e,o[e]);return t};import{n as f,t as v,h as l,A as u}from"./index.bab9ee53.js";import{A as b}from"./ActionDialog.8e7971ac.js";import{A as _,B as h}from"./Content.054782c3.js";import{I as g}from"./DropDown.a9412aaf.js";import{I as C}from"./TextField.0ac45ea9.js";import{I as x}from"./TextButton.7f1048d8.js";import{C as j}from"./ImageOptions.69aade66.js";import{M as y}from"./Dialog.ec3343da.js";import{A as w}from"./Printer.38f70d42.js";import"./vendor.b1428349.js";import"./devterm.9c60640a.js";import"./buffer.89012e65.js";import"./CheckBox.dc1b9740.js";import"./View.44587490.js";var D=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("action-dialog",t._g(t._b({staticClass:"action-dialog-grid",attrs:{title:"Grid",form:""},on:{submit:t.onSubmit},scopedSlots:t._u([{key:"default",fn:function(){return[e("app-tab-container",{staticClass:"tab-container",scopedSlots:t._u([{key:"general",fn:function(i){return[e("base-tab-container-content",t._b({attrs:{title:"General"}},"base-tab-container-content",i,!1),[e("div",{staticClass:"cols"},[e("div",[e("input-text-field",{attrs:{label:"Column Gutter",step:1,min:0,value:String(t.value.options.columnGutter),type:"number"},on:{input:function(n){t.model.options.columnGutter=Number(n),t.updateModel()}}})],1),e("div",[e("input-text-field",{attrs:{label:"Row Gutter",step:1,min:0,value:String(t.value.options.rowGutter),type:"number"},on:{input:function(n){t.model.options.rowGutter=Number(n),t.updateModel()}}})],1)]),e("div",{staticClass:"column"},[e("input-drop-down",{attrs:{options:t.columnOptions,label:"Column"},model:{value:t.column,callback:function(n){t.column=n},expression:"column"}}),e("input-text-button",{attrs:{color:"primary"},on:{click:t.onClickAddColumn}},[t._v(" Add ")]),t._v(" "),e("input-text-button",{attrs:{disabled:t.model.data.length<2},on:{click:t.onClickRemoveColumn}},[t._v(" Remove ")])],1),e("input-text-field",{attrs:{label:"Width",step:.01,max:1,min:.01,value:String(t.value.widths[t.column]),type:"number"},on:{input:function(n){t.model.widths[t.column]=Number(n),t.updateModel()}}}),e("actions",{key:t.column,attrs:{colors:t.colors,embed:"","native-actions":!1,value:t.currentColumn},on:{input:function(n){t.model.data[t.column]=n,t.updateModel()}}})],1)]}},{key:"imageOptions",fn:function(i){return[e("base-tab-container-content",t._b({attrs:{title:"Image Options"}},"base-tab-container-content",i,!1),[e("controls-image-options",{attrs:{value:t.model.imageOptions},on:{input:function(n){t.model.imageOptions=n,t.updateModel()}}})],1)]}}])})]},proxy:!0}])},"action-dialog",t.$attrs,!1),Object.assign({},t.$listeners,{input:[]})))},M=[];const O={components:{ActionDialog:b,AppTabContainer:_,BaseTabContainerContent:h,Actions:w,InputDropDown:g,InputTextField:C,InputTextButton:x,ControlsImageOptions:j},mixins:[y],inheritAttrs:!1,props:{colors:{type:Object,default(){return{primary:[255,0,0],secondary:[0,255,0]}}},value:{type:Object,default(){return v()}}},data(){return{column:0,type:"text",model:a({},this.value),errorCorrectionLevelOptions:[["Low","L"],["Medium","M"],["Quartile","Q"],["High","H"]].map(([t,o])=>new l({title:t,value:o}))}},computed:{currentColumn(){return this.value.data[this.column].map(t=>new u(t))},columnOptions(){return this.value.data.map((t,o)=>new l({title:`${o+1}`,value:String(o)}))}},methods:{updateModel(t=this.model){t.data=t.data.map(o=>o.map(e=>new u(e))),this.model=a({},t),this.$emit("input",a({},t))},onClickAddColumn(){this.model.data.push([]),this.column=this.model.data.length-1,this.updateModel()},onClickRemoveColumn(){const t=this.column;this.column=Math.max(t-1,0),this.model.data.splice(t,1),this.updateModel()},onSubmit(t){t.preventDefault()}}},m={};var A=f(O,D,M,!1,k,"71600a3f",null,null);function k(t){for(let o in m)this[o]=m[o]}var V=function(){return A.exports}();export{V as default};
