var g=Object.defineProperty,C=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var p=(t,n,e)=>n in t?g(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,r=(t,n)=>{for(var e in n||(n={}))k.call(n,e)&&p(t,e,n[e]);if(c)for(var e of c(n))O.call(n,e)&&p(t,e,n[e]);return t},m=(t,n)=>C(t,x(n));import{P as w}from"./papaparse.9bbc0042.js";import{n as d,C as S,z as l,h as s,E as F,G as $,s as I}from"./index.4d358bc2.js";import{A as j}from"./ActionDialog.33ce5101.js";import{M as D}from"./Dialog.0ed384f0.js";import{A as T,B as A}from"./Content.99000758.js";import{C as R}from"./ImageOptions.aeec04f2.js";import{I as f}from"./TextField.7c039659.js";import{I as b}from"./DropDown.50fa413d.js";import{I as v}from"./CheckBox.937cf4c7.js";import{I as M}from"./TextButton.5dd309b2.js";import"./buffer.4460b8ba.js";import"./vendor.b1428349.js";import"./devterm.9e5b33a4.js";import"./canvas-text-wrapper.5613b40d.js";var G=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"controls-font-options"},[e("input-drop-down",{attrs:{label:"Family",options:t.fontOptions},on:{input:t.onInputFontFamily},model:{value:t.model.fontFamily,callback:function(a){t.$set(t.model,"fontFamily",a)},expression:"model.fontFamily"}}),e("input-drop-down",{attrs:{label:"Variante",options:t.variantOptions},on:{input:t.onInputVariante},model:{value:t.variant,callback:function(a){t.variant=a},expression:"variant"}}),e("input-drop-down",{attrs:{label:"Align",options:t.alignOptions},on:{input:function(a){t.model.align=a}},model:{value:t.model.align,callback:function(a){t.$set(t.model,"align",a)},expression:"model.align"}}),e("input-text-field",{attrs:{step:"1",min:"0",type:"number",value:t.model.fontSize,label:"Font Size"},on:{input:function(a){t.model.fontSize=a||0}}}),e("input-text-field",{attrs:{step:"1",min:"0",type:"number",value:t.model.wordGap,label:"Word Gap"},on:{input:function(a){t.model.wordGap=a||0}}}),e("input-text-field",{attrs:{step:"1",min:"0",type:"number",value:t.model.lineSpace,label:"Line Space"},on:{input:function(a){t.model.lineSpace=a||0}}}),t._v(" "),e("div",{staticClass:"cols"},[e("div",[e("input-check-box",{attrs:{label:"Underline"},model:{value:t.model.underline,callback:function(a){t.$set(t.model,"underline",a)},expression:"model.underline"}})],1),e("div",[e("input-check-box",{attrs:{label:"Text justify"},model:{value:t.model.justify,callback:function(a){t.$set(t.model,"justify",a)},expression:"model.justify"}})],1)])],1)},E=[];const N={components:{InputTextField:f,InputDropDown:b,InputCheckBox:v},props:{value:{type:Object,default(){return S()}}},data(){const t=this.$config.fonts;return{variant:"0",fonts:t,alignOptions:[["Left",l.LEFT],["Center",l.CENTER],["Right",l.RIGHT]].map(([n,e])=>new s({title:n,value:String(e)})),fontOptions:[{title:"Select Font",value:""}].concat(this.$config.fonts.map(n=>new s({title:n.name,group:n.group,value:n.value}))),model:this.value}},computed:{currentFont(){return this.$config.fonts.find(t=>t.value===this.model.fontFamily)},variantOptions(){return this.currentFont?this.currentFont.variants.map(({weight:t,italic:n},e)=>new s({title:String(t),group:n?"Iatlic":"Normal",value:String(e)})):[]}},watch:{variant(t){if(this.currentFont.variants[Number(t)]){const{weight:e,italic:a}=this.currentFont.variants[Number(t)];this.model=m(r({},this.model),{weight:e,italic:a})}},model:{handler(t){this.$emit("input",t)},deep:!0}},methods:{onInputFontFamily(){this.variant="0"},onInputVariante(){},onInput(t){this.$emit("input",t)},onSubmit(t){t.preventDefault(),this.close()}}},h={};var B=d(N,G,E,!1,L,"509816ee",null,null);function L(t){for(let n in h)this[n]=h[n]}var V=function(){return B.exports}(),z=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("action-dialog",t._g(t._b({staticClass:"action-dialog-table",style:{"--columns":t.model.columns.length},attrs:{title:"Table",form:""},on:{submit:t.onSubmit},scopedSlots:t._u([{key:"default",fn:function(){return[e("app-tab-container",{staticClass:"tab-container",scopedSlots:t._u([{key:"general",fn:function(a){return[e("base-tab-container-content",t._b({attrs:{title:"General"}},"base-tab-container-content",a,!1),[e("div",{staticClass:"table-wrapper"},[e("table",[e("tbody",t._l(t.model.data,function(o,i){return e("tr",{key:i},[t._l(t.model.columns.length,function(u){return e("td",{key:u-1},[e("input-text-field",{staticClass:"value",attrs:{placeholder:"Empty\u2026",label:null},model:{value:o[u-1],callback:function(y){t.$set(o,u-1,y)},expression:"row[index - 1]"}})],1)}),e("td",[e("input-text-button",{attrs:{disabled:t.model.data.length===1},on:{click:function(u){return t.onClickDeleteRow(i)}}},[t._v(" X ")])],1)],2)}),0)])]),e("div",{staticClass:"buttons"},[e("input-text-button",{on:{click:t.onClickAddRow}},[t._v(" Add Row ")])],1),e("div",{staticClass:"buttons"},[e("input-text-button",{on:{click:t.onClickImportCsv}},[t._v(" Import CSV ")]),e("input-text-button",{on:{click:t.onClickReset}},[t._v(" Reset ")])],1)])]}},{key:"tableOptions",fn:function(a){return[e("base-tab-container-content",t._b({attrs:{title:"Table"}},"base-tab-container-content",a,!1),[e("div",{staticClass:"cols"},[e("div",[e("input-text-field",{attrs:{label:"Column Gutter",step:1,min:0,value:String(t.value.options.columnGutter),type:"number"},on:{input:function(o){t.model.options.columnGutter=Number(o),t.updateModel()}}})],1),e("div",[e("input-check-box",{attrs:{label:"Head active"},model:{value:t.model.options.headActive,callback:function(o){t.$set(t.model.options,"headActive",o)},expression:"model.options.headActive"}})],1),e("div",[e("input-text-field",{attrs:{label:"Row Gutter",step:1,min:0,value:String(t.value.options.rowGutter),type:"number"},on:{input:function(o){t.model.options.rowGutter=Number(o),t.updateModel()}}})],1),e("div",[e("input-check-box",{attrs:{label:"Foot active"},model:{value:t.model.options.footActive,callback:function(o){t.$set(t.model.options,"footActive",o)},expression:"model.options.footActive"}})],1),e("div"),e("div",[e("input-check-box",{attrs:{label:"Column Styles"},model:{value:t.model.options.useColumnStyles,callback:function(o){t.$set(t.model.options,"useColumnStyles",o)},expression:"model.options.useColumnStyles"}})],1)]),e("app-tab-container",{staticClass:"tab-container",scopedSlots:t._u([{key:"body",fn:function(o){return[e("base-tab-container-content",t._b({attrs:{title:"Body"}},"base-tab-container-content",o,!1),[e("controls-font-options",{attrs:{value:t.model.options.bodyOptions},on:{input:function(i){t.model.options.bodyOptions=i,t.updateModel()}}})],1)]}},{key:"head",fn:function(o){return[e("base-tab-container-content",t._b({attrs:{title:"Head"}},"base-tab-container-content",o,!1),[e("controls-font-options",{attrs:{value:t.model.options.headOptions},on:{input:function(i){t.model.options.headOptions=i,t.updateModel()}}})],1)]}},{key:"foot",fn:function(o){return[e("base-tab-container-content",t._b({attrs:{title:"Foot"}},"base-tab-container-content",o,!1),[e("controls-font-options",{attrs:{value:t.model.options.footOptions},on:{input:function(i){t.model.options.footOptions=i,t.updateModel()}}})],1)]}}],null,!0)})],1)]}},{key:"columnOptions",fn:function(a){return[e("base-tab-container-content",t._b({attrs:{title:"Columns"}},"base-tab-container-content",a,!1),[e("input-text-field",{attrs:{label:"Column Count",step:1,min:1,value:String(t.model.columns.length),type:"number"},on:{input:function(o){t.updateColumns(Math.max(parseInt(o),1))}}}),e("input-drop-down",{attrs:{label:"Column",options:t.columnOptions},model:{value:t.column,callback:function(o){t.column=o},expression:"column"}}),t.column?e("div",{key:t.column},[e("hr"),e("input-text-field",{attrs:{label:"Width",step:.01,max:1,min:.01,value:String(t.model.columns[t.column].width),type:"number"},on:{input:function(o){t.model.columns[t.column].width=Number(o),t.updateModel()}}}),e("hr"),e("app-tab-container",{staticClass:"tab-container",scopedSlots:t._u([{key:"body",fn:function(o){return[e("base-tab-container-content",t._b({attrs:{title:"Body"}},"base-tab-container-content",o,!1),[e("controls-font-options",{attrs:{value:t.model.columns[t.column].options},on:{input:function(i){t.model.columns[t.column].options=i,t.updateModel()}}})],1)]}},{key:"head",fn:function(o){return[e("base-tab-container-content",t._b({attrs:{title:"Head"}},"base-tab-container-content",o,!1),[e("controls-font-options",{attrs:{value:t.model.columns[t.column].headOptions},on:{input:function(i){t.model.columns[t.column].headOptions=i,t.updateModel()}}})],1)]}},{key:"foot",fn:function(o){return[e("base-tab-container-content",t._b({attrs:{title:"Foot"}},"base-tab-container-content",o,!1),[e("controls-font-options",{attrs:{value:t.model.columns[t.column].footOptions},on:{input:function(i){t.model.columns[t.column].footOptions=i,t.updateModel()}}})],1)]}}],null,!0)})],1):t._e()],1)]}},{key:"options",fn:function(a){return[e("base-tab-container-content",t._b({attrs:{title:"Options"}},"base-tab-container-content",a,!1),[e("controls-image-options",{model:{value:t.model.imageOptions,callback:function(o){t.$set(t.model,"imageOptions",o)},expression:"model.imageOptions"}})],1)]}}])})]},proxy:!0}])},"action-dialog",t.$attrs,!1),Object.assign({},t.$listeners,{input:[]})))},H=[];const P={components:{AppTabContainer:T,BaseTabContainerContent:A,ActionDialog:j,InputTextField:f,InputDropDown:b,InputTextButton:M,InputCheckBox:v,ControlsImageOptions:R,ControlsFontOptions:V},mixins:[D],inheritAttrs:!1,props:{value:{type:Object,default(){return F()}}},data(){var n;const t=r({},this.value);return t.columns=t.columns||this.createColumns(((n=t.data[0])==null?void 0:n.length)||0),{model:t,column:null,label:"Select align",options:[["Left",l.LEFT],["Center",l.CENTER],["Right",l.RIGHT]].map(([e,a])=>new s({title:e,value:String(a)}))}},computed:{columnOptions(){return[new s({title:"Select Column",value:""}),...this.model.columns.map((t,n)=>new s({title:`${n+1}`,value:String(n)}))]}},watch:{model:{handler(){this.$emit("input",this.model)},deep:!0}},methods:{updateColumns(t){this.model.columns=this.model.columns.slice(0,t),this.model.columns.push(...this.createColumns(t-this.model.columns.length))},createColumns(t){return Array(t).fill({}).map(()=>$())},updateModel(t=this.model){this.model=r({},t),this.$emit("input",r({},t))},onClickAddRow(){this.model.data.push([])},onClickDeleteRow(t){this.model.data.splice(t,1)},onClickReset(){this.model.data=[[]]},async onClickImportCsv(){try{const t=await I([]);if(t.length){const{data:n}=await new Promise(e=>{w.parse(t[0],{complete:a=>e(a)})});this.model.data=n||[[]],this.updateColumns(this.model.data[0].length)}}catch(t){this.$errorList.add(t)}},onSubmit(t){t.preventDefault(),this.close()}}},_={};var W=d(P,z,H,!1,U,"f052df6c",null,null);function U(t){for(let n in _)this[n]=_[n]}var rt=function(){return W.exports}();export{rt as default};
