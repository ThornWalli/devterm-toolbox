import{B as l}from"./TextField.c46d9973.js";import{n as r}from"./index.26493afd.js";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("base-input-label",{staticClass:"input-check-box",attrs:{text:e.label,delimiter:e.$attrs.delimiter||void 0,"top-label":e.$attrs["top-label"],"baseline-label":e.$attrs["baseline-label"]}},[n("input",e._b({attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(s){return e.$emit("input",s.target.checked)}}},"input",e.$attrs,!1)),n("span")])},i=[];const c={components:{BaseInputLabel:l},inheritAttrs:!1,props:{label:{type:String,default:"TextBox"},value:{type:Boolean,default:!1}},methods:{onInput(e){this.$emit("input",e.target.value)}}},a={};var u=r(c,o,i,!1,p,"3cd4323c",null,null);function p(e){for(let t in a)this[t]=a[t]}var f=function(){return u.exports}();export{f as I};
