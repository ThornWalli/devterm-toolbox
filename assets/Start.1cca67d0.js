import{A as n}from"./View.c40cc634.js";import{I as s}from"./TextButton.8a136169.js";import{n as a}from"./index.67fd3a58.js";import"./vendor.b1428349.js";import"./devterm.eed8f68c.js";import"./buffer.89012e65.js";var i=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("app-view",{staticClass:"view-start"},[t("div",[t("h2",[e._v("Welcome DevTerm User!")]),e.$server.disabled?t("p",[e._v(" Your session does not support server, only available in remote. ")]):t("p",[e._v(" Do you work locally or remotely? ")]),t("p",[e._v(' Click on "Use Remote" and enter the connection data '),t("br"),e._v("to connect to the DevTerm. ")]),t("div",{staticClass:"buttons"},[e.$server.disabled?e._e():t("input-text-button",{attrs:{color:"primary",text:"Use Local"},on:{click:e.onClickLocal}}),t("input-text-button",{attrs:{color:"primary",text:"Use Remote"},on:{click:e.onClickRemote}})],1)])])},c=[];const l={components:{AppView:n,InputTextButton:s},methods:{onClickLocal(){this.$emit("apply",{type:"local"})},onClickRemote(){this.$emit("apply",{type:"remote"})}}},r={};var p=a(l,i,c,!1,_,"d01424a4",null,null);function _(e){for(let o in r)this[o]=r[o]}var x=function(){return p.exports}();export{x as default};
