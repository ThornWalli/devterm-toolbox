import{A as o,n as c,u as h,q as l,M as d,m as i}from"./index.11d5081d.js";import u from"./NativeText.397300c3.js";import"./vendor.b1428349.js";import"./devterm.9e5b33a4.js";import"./buffer.4460b8ba.js";var v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.error?r("preview-native-text",{attrs:{value:e.error.message,colors:e.colors,options:e.options}}):r("canvas",{ref:"canvas"})],1)},m=[];const p={components:{PreviewNativeText:u},props:{colors:{type:Object,default(){return{base:[255,0,0]}}},value:{type:Object,default(){return h()}},width:{type:Number,default:384},options:{type:Object,default(){return{}}}},data(){return{error:null,ctx:null}},watch:{async value(){this.value.file&&await this.changeImage(this.value.file),this.render()}},async mounted(){this.value.file&&await this.changeImage(this.value.file),this.render()},methods:{changeImage(e){return new Promise(t=>{this.img=document.createElement("img"),this.img.onload=()=>{this.$refs.canvas.height=this.img.naturalHeight,t()},this.img.src=e})},render(){this.error=null,this.$nextTick(()=>{const e=this.$refs.canvas.getContext("2d");window.requestAnimationFrame(async()=>{try{let t=await f(this.value);t=l(t,{background:this.colors.printer.preview.background,foreground:this.colors.printer.preview.foreground},.6+.4*(this.options.density/d)),e.canvas.width=this.width,e.canvas.height=t.height,e.fillStyle=`rgb(${this.colors.printer.preview.background.join(" ")})`,e.fillRect(0,0,e.canvas.width,e.canvas.height);const r=this.width,n=parseInt(this.options.margin*r);let a=0;switch(this.options.align){case i.RIGHT:a+=this.width-t.width;break;case i.CENTER:a+=(this.width-t.width)/2;break;default:a+=n;break}e.drawImage(t,a,0)}catch(t){this.error=t}this.$emit("ready")})})}}},f=async e=>(await o.barcode.beforePrinterCommand({value:e},!1)).value,s={};var g=c(p,v,m,!1,_,"5c7aec13",null,null);function _(e){for(let t in s)this[t]=s[t]}var j=function(){return g.exports}();export{j as default,f as render};
