import{A as o,n as c,t as d,q as l,M as h,m as s}from"./index.11d5081d.js";import u from"./NativeText.397300c3.js";import"./vendor.b1428349.js";import"./devterm.9e5b33a4.js";import"./buffer.4460b8ba.js";var v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.error?r("preview-native-text",{attrs:{value:e.error.message,colors:e.colors,options:e.options}}):r("canvas",{ref:"canvas"})],1)},p=[];const _={components:{PreviewNativeText:u},props:{colors:{type:Object,default(){return{base:[255,0,0]}}},value:{type:Object,default(){return d()}},width:{type:Number,default:384},options:{type:Object,default(){return{}}}},data(){return{error:null,ctx:null}},watch:{async value(){await this.render()}},async mounted(){await this.render()},methods:{render(){this.error=null,this.$nextTick(()=>{const e=this.$refs.canvas.getContext("2d");window.requestAnimationFrame(async()=>{try{let t=await m(this.value);t=l(t,{background:this.colors.printer.preview.background,foreground:this.colors.printer.preview.foreground},.6+.4*(this.options.density/h)),e.canvas.width=this.width,e.canvas.height=t.height,e.fillStyle=`rgb(${this.colors.printer.preview.background.join(" ")})`,e.fillRect(0,0,e.canvas.width,e.canvas.height);const r=this.width,i=parseInt(this.options.margin*r);let a=0;switch(this.options.align){case s.RIGHT:a+=this.width-t.width;break;case s.CENTER:a+=(this.width-t.width)/2;break;default:a+=i;break}e.drawImage(t,a,0)}catch(t){throw this.error=t,t}this.$emit("ready")})})}}},m=async e=>(await o.grid.beforePrinterCommand({value:e},!1)).value,n={};var f=c(_,v,p,!1,w,"271f07e6",null,null);function w(e){for(let t in n)this[t]=n[t]}var I=function(){return f.exports}();export{I as default,m as render};
