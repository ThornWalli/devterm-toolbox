import{n as s,s as a}from"./index.93fb1dd0.js";import{B as i}from"./DropDown.2c6980f4.js";import{I as r}from"./TextButton.18db395f.js";var u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("base-input-label",{staticClass:"input-file-select",attrs:{tag:"div",text:e.label,delimiter:e.$attrs.delimiter||void 0}},[n("button",e._b({staticClass:"select",attrs:{type:"button",title:e.displayValue},on:{click:e.onClickSelect}},"button",e.$attrs,!1),[e._v(" "+e._s(e.displayValue)+" ")]),e.currentValue?n("input-text-button",{on:{click:e.onClickReset}},[e._v(" Reset ")]):e._e()],1)},c=[];const o={components:{BaseInputLabel:i,InputTextButton:r},inheritAttrs:!1,props:{accept:{type:Array,default(){return["image/png","image/jpg","image/jpeg","application/json"]}},label:{type:String,default:"TextField"},value:{type:String,default:null}},data(){return{currentValue:this.value}},computed:{displayValue(){var t;const e=((t=this.currentValue)==null?void 0:t.name)||this.value;return this.currentValue?`${e}`:"Select File"}},methods:{async onClickSelect(){const e=await a(this.accept);e.length&&(this.currentValue=e[0],this.$emit("input",e[0]))},onClickReset(){this.currentValue=null,this.$emit("input",null)}}},l={};var p=s(o,u,c,!1,_,"441b53e8",null,null);function _(e){for(let t in l)this[t]=l[t]}var v=function(){return p.exports}();export{v as I};
