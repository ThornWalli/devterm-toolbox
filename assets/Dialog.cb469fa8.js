import{o as c,O as u,n as i,k as _}from"./index.0deb44c4.js";function p(e,t){return c(function(s,n){var a=0;s.subscribe(new u(n,function(o){return e.call(t,o,a++)&&n.next(o)}))})}var d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.open?s("dialog",{staticClass:"app-dialog",class:{embed:e.embed}},[s("span",{on:{click:function(n){return e.close()}}}),e.title?s("div",{staticClass:"dialog-title"},[e._v(" "+e._s(e.title)+" ")]):e._e(),s(e.form?"form":"div",{tag:"component",staticClass:"dialog-content",on:{submit:function(n){return e.$emit("submit",n)}}},[s("div",[e._t("default",function(){return[e._v("Dialog Content")]})],2),e.$slots.buttons?s("div",{staticClass:"buttons"},[e._t("buttons")],2):e._e()]),s("div",{staticClass:"display-look"})],1):e._e()},h=[];const f={inheritAttrs:!0,props:{embed:{type:Boolean,default:!1},escapeClose:{type:Boolean,default:!0},initOpen:{type:Boolean,default:!1},title:{type:String,default:null},form:{type:Boolean,default:!1}},data(){return{open:!1,subscriptions:[]}},watch:{open(e){e?this.subscriptions=[_.pipe(p(({key:t})=>t==="Escape"&&this.escapeClose)).subscribe(t=>{this.close()})]:(this.subscriptions.forEach(t=>t.unsubscribe()),this.subscriptions=[])}},mounted(){this.$emit("ready"),this.initOpen&&this.$nextTick(()=>{this.show()})},destroyed(){this.subscriptions.forEach(e=>e.unsubscribe())},methods:{show(){return new Promise(e=>{this.open=!0,this.$nextTick(()=>{this.embed?this.$el.show():this.$el.showModal(),this.$emit("open"),this.$once("close",e)})})},close(e){this.open=!1,this.$el.close(e),this.$emit("close",e)}}},r={};var v=i(f,d,h,!1,m,"508944f0",null,null);function m(e){for(let t in r)this[t]=r[t]}var C=function(){return v.exports}();const b={data(){return{open:!1}},mounted(){const e=this.$children[0];this.open=e.open,e.$on("open",()=>this.open=!0).$on("close",()=>this.open=!1)},methods:{show(...e){return this.$children[0].show(...e)},close(...e){return this.$children[0].close(...e)}}};let $,y;const l={};var g=i(b,$,y,!1,x,null,null,null);function x(e){for(let t in l)this[t]=l[t]}var k=function(){return g.exports}();export{C as A,k as M,p as f};
