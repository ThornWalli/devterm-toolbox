import{o as u,h as p,n as a,k as _}from"./index.ae9fd7ab.js";import{I as f}from"./TextButton.82eb343c.js";function h(e,t){return u(function(s,n){var c=0;s.subscribe(p(n,function(o){return e.call(t,o,c++)&&n.next(o)}))})}var d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.open?s("dialog",{staticClass:"app-dialog",class:{embed:e.embed,fullscreen:e.fullscreen}},[s("span",{on:{click:function(n){return e.close()}}}),e.title?s("div",{staticClass:"dialog-title"},[s("span",[e._v(" "+e._s(e.title)+" ")]),s("input-text-button",{staticClass:"fullscreen-button",attrs:{color:"primary"},on:{click:function(n){e.fullscreen=!e.fullscreen}}},[e._v(" "+e._s(e.fullscreen?"Minimize":"Maximize")+" ")])],1):e._e(),s(e.form?"form":"div",{tag:"component",staticClass:"dialog-content",on:{submit:function(n){return e.$emit("submit",n)}}},[s("div",[e._t("default",function(){return[e._v("Dialog Content")]})],2),e.$slots.buttons?s("div",{staticClass:"buttons"},[e._t("buttons")],2):e._e()]),s("div",{staticClass:"display-look"})],1):e._e()},m=[];const i=[],v={components:{InputTextButton:f},inheritAttrs:!0,props:{embed:{type:Boolean,default:!1},escapeClose:{type:Boolean,default:!0},initOpen:{type:Boolean,default:!1},title:{type:String,default:null},form:{type:Boolean,default:!1}},data(){return{fullscreen:!1,open:!1,subscriptions:[]}},watch:{open(e){e?this.subscriptions=[_.pipe(h(({key:t})=>t==="Escape"&&this.escapeClose)).subscribe(t=>{i[i.length-1]===this&&this.close()})]:(this.subscriptions.forEach(t=>t.unsubscribe()),this.subscriptions=[])}},mounted(){this.$emit("ready"),this.initOpen&&this.$nextTick(()=>{this.show()})},destroyed(){this.subscriptions.forEach(e=>e.unsubscribe())},methods:{show(){return new Promise(e=>{this.open=!0,i.push(this),this.$nextTick(()=>{this.embed?this.$el.show():this.$el.showModal(),this.$emit("open"),this.$once("close",e)})})},close(e){this.open=!1,i.splice(i.indexOf(this),1),this.$el.close(e),this.$emit("close",e)}}},l={};var b=a(v,d,m,!1,$,"32e72906",null,null);function $(e){for(let t in l)this[t]=l[t]}var D=function(){return b.exports}();const g={data(){return{open:!1}},mounted(){const e=this.$children[0];this.open=e.open,e.$on("open",()=>this.open=!0).$on("close",()=>this.open=!1)},methods:{show(...e){return this.$children[0].show(...e)},close(...e){return this.$children[0].close(...e)}}};let x,y;const r={};var C=a(g,x,y,!1,w,null,null,null);function w(e){for(let t in r)this[t]=r[t]}var B=function(){return C.exports}();export{D as A,B as M,h as f};
