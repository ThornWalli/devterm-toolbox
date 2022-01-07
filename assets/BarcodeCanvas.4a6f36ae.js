import{d as c,p as h,A as s}from"./devterm.23ce4049.js";import{n as l,p as d}from"./index.ea8592d1.js";import{g as p}from"./Printer.3defcc86.js";import m from"./TextCanvas.941c96db.js";import"./vendor.b1428349.js";import"./View.d0aa6925.js";import"./TextButton.1266465a.js";import"./DropDown.c5bf28cc.js";import"./InputLabel.6abe9ff9.js";import"./Dialog.63a7cd91.js";import"./TextField.b58da684.js";import"./CheckBox.69e0dcf6.js";var u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.error?a("preview-text-canvas",{attrs:{value:e.error.message,colors:e.colors,options:e.options}}):a("canvas",{ref:"canvas"})],1)},v=[];const f={components:{PreviewTextCanvas:m},props:{colors:{type:Object,default(){return{base:[255,0,0]}}},value:{type:Object,default(){return p()}},width:{type:Number,default:384},options:{type:Object,default(){return{}}}},data(){return{error:null,ctx:null}},watch:{async value(){this.value.file&&await this.changeImage(this.value.file),this.render()}},async mounted(){this.value.file&&await this.changeImage(this.value.file),this.render()},methods:{changeImage(e){return new Promise(t=>{this.img=document.createElement("img"),this.img.onload=()=>{this.$refs.canvas.height=this.img.naturalHeight,t()},this.img.src=e})},getColor(e){return`rgb(${this.colors.primary.join(" ")} / ${e*100}%)`},render(){this.error=null,this.$nextTick(()=>{const e=this.$refs.canvas.getContext("2d");window.requestAnimationFrame(async()=>{try{const t=await c(this.value.text||"empty",this.value.options||{}),a=h(t,this.value.imageOptions);e.canvas.width=this.width,e.canvas.height=a.height;const n=this.width,o=parseInt(this.options.margin*n);let r=0;switch(this.options.align){case s.RIGHT:r+=this.width-a.width;break;case s.CENTER:r+=(this.width-a.width)/2;break;default:r+=o;break}e.drawImage(a,r,0)}catch(t){this.error=t}d(e.canvas,this.colors)})})}}},i={};var g=l(f,u,v,!1,_,"e91622d8",null,null);function _(e){for(let t in i)this[t]=i[t]}var P=function(){return g.exports}();export{P as default};
