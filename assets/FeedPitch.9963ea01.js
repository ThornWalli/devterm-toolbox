import{n as i,x as s}from"./index.11d5081d.js";import"./vendor.b1428349.js";import"./devterm.9e5b33a4.js";import"./buffer.4460b8ba.js";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"preview-feed-pitch",style:{"--height":e.height}})},a=[];const u={props:{type:{type:String,default:"font"},value:{type:[Number,String],default:0},options:{type:Object,default(){return{}}}},computed:{height(){const e=Number(this.value);return this.type==="font"?s[this.options.font][1]*e:e}},mounted(){this.$emit("ready")}},r={};var _=i(u,o,a,!1,c,"8bc43308",null,null);function c(e){for(let t in r)this[t]=r[t]}var f=function(){return _.exports}();export{f as default};
