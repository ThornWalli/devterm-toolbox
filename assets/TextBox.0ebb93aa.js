import{B as l}from"./DropDown.295423ad.js";import{n as r}from"./index.147b260a.js";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-input-label",{staticClass:"input-text-box",attrs:{text:e.label,delimiter:e.$attrs.delimiter||void 0,"top-label":e.$attrs["top-label"],"baseline-label":e.$attrs["baseline-label"]}},[a("textarea",e._b({domProps:{value:e.value},on:{input:e.onInput}},"textarea",e.$attrs,!1))])},s=[];const i={components:{BaseInputLabel:l},inheritAttrs:!1,props:{label:{type:String,default:"TextBox"},topLabel:{type:Boolean,default:!0},value:{type:String,default:""}},methods:{onInput(e){this.$emit("input",e.target.value)}}},n={};var u=r(i,o,s,!1,p,"53bbde24",null,null);function p(e){for(let t in n)this[t]=n[t]}var c=function(){return u.exports}();export{c as I};
