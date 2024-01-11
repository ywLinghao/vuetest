import{c as e,r as t,o as i,a as o,w as n,b as r,d as s,n as l,e as a,f as d,t as c,i as h,g as u,h as g,j as p,k as m,F as f,l as b}from"./index-3524f8e7.js";import{_ as w}from"./uni-icons.312dfc27.js";import{r as y}from"./uni-app.es.2df0d4c9.js";import{_}from"./_plugin-vue_export-helper.1b428a4d.js";const x=_({name:"UniNoticeBar",emits:["click","getmore","close"],props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#FFF9EA"},speed:{type:Number,default:100},color:{type:String,default:"#FF9A43"},fontSize:{type:Number,default:14},moreColor:{type:String,default:"#FF9A43"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:()=>({textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,elIdBox:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}),computed:{isShowGetMore(){return!0===this.showGetMore||"true"===this.showGetMore},isShowClose(){return!(!0!==this.showClose&&"true"!==this.showClose||!1!==this.showGetMore&&"false"!==this.showGetMore)}},mounted(){this.$nextTick((()=>{this.initSize()}))},methods:{initSize(){if(this.scrollable){let t=[],i=new Promise(((t,i)=>{e().in(this).select(`#${this.elId}`).boundingClientRect().exec((e=>{this.textWidth=e[0].width,t()}))})),o=new Promise(((t,i)=>{e().in(this).select(`#${this.elIdBox}`).boundingClientRect().exec((e=>{this.boxWidth=e[0].width,t()}))}));t.push(i),t.push(o),Promise.all(t).then((()=>{this.animationDuration=this.textWidth/this.speed+"s",this.animationDelay=`-${this.boxWidth/this.speed}s`,setTimeout((()=>{this.animationPlayState="running"}),1e3)}))}},loopAnimation(){},clickMore(){this.$emit("getmore")},close(){this.show=!1,this.$emit("close")},onClick(){this.$emit("click")}}},[["render",function(e,g,p,m,f,b){const _=y(t("uni-icons"),w),x=h,S=u;return f.show?(i(),o(S,{key:0,class:"uni-noticebar",style:a({backgroundColor:p.backgroundColor}),onClick:b.onClick},{default:n((()=>[!0===p.showIcon||"true"===p.showIcon?(i(),o(_,{key:0,class:"uni-noticebar-icon",type:"sound",color:p.color,size:1.5*p.fontSize},null,8,["color","size"])):r("",!0),s(S,{ref:"textBox",class:l(["uni-noticebar__content-wrapper",{"uni-noticebar__content-wrapper--scrollable":p.scrollable,"uni-noticebar__content-wrapper--single":!p.scrollable&&(p.single||p.moreText)}]),style:a({height:p.scrollable?1.5*p.fontSize+"px":"auto"})},{default:n((()=>[s(S,{id:f.elIdBox,class:l(["uni-noticebar__content",{"uni-noticebar__content--scrollable":p.scrollable,"uni-noticebar__content--single":!p.scrollable&&(p.single||p.moreText)}])},{default:n((()=>[s(x,{id:f.elId,ref:"animationEle",class:l(["uni-noticebar__content-text",{"uni-noticebar__content-text--scrollable":p.scrollable,"uni-noticebar__content-text--single":!p.scrollable&&(p.single||p.showGetMore)}]),style:a({color:p.color,fontSize:p.fontSize+"px",lineHeight:1.5*p.fontSize+"px",width:f.wrapWidth+"px",animationDuration:f.animationDuration,"-webkit-animationDuration":f.animationDuration,animationPlayState:f.webviewHide?"paused":f.animationPlayState,"-webkit-animationPlayState":f.webviewHide?"paused":f.animationPlayState,animationDelay:f.animationDelay,"-webkit-animationDelay":f.animationDelay})},{default:n((()=>[d(c(p.text),1)])),_:1},8,["id","class","style"])])),_:1},8,["id","class"])])),_:1},8,["class","style"]),b.isShowGetMore?(i(),o(S,{key:1,class:"uni-noticebar__more uni-cursor-point",onClick:b.clickMore},{default:n((()=>[p.moreText.length>0?(i(),o(x,{key:0,style:a({color:p.moreColor,fontSize:p.fontSize+"px"})},{default:n((()=>[d(c(p.moreText),1)])),_:1},8,["style"])):(i(),o(_,{key:1,type:"right",color:p.moreColor,size:1.1*p.fontSize},null,8,["color","size"]))])),_:1},8,["onClick"])):r("",!0),b.isShowClose?(i(),o(S,{key:2,class:"uni-noticebar-close uni-cursor-point"},{default:n((()=>[s(_,{type:"closeempty",color:p.color,size:1.1*p.fontSize,onClick:b.close},null,8,["color","size","onClick"])])),_:1})):r("",!0)])),_:1},8,["style","onClick"])):r("",!0)}],["__scopeId","data-v-009e372d"]]);const S=_({name:"UniGridItem",inject:["grid"],props:{index:{type:Number,default:0}},data:()=>({column:0,showBorder:!0,square:!0,highlight:!0,left:0,top:0,openNum:2,width:0,borderColor:"#e5e5e5"}),created(){this.column=this.grid.column,this.showBorder=this.grid.showBorder,this.square=this.grid.square,this.highlight=this.grid.highlight,this.top=0===this.hor?this.grid.hor:this.hor,this.left=0===this.ver?this.grid.ver:this.ver,this.borderColor=this.grid.borderColor,this.grid.children.push(this),this.width=this.grid.width},beforeDestroy(){this.grid.children.forEach(((e,t)=>{e===this&&this.grid.children.splice(t,1)}))},methods:{_onClick(){this.grid.change({detail:{index:this.index}})}}},[["render",function(e,t,d,c,h,p){const m=u;return h.width?(i(),o(m,{key:0,style:a("width:"+h.width+";"+(h.square?"height:"+h.width:"")),class:"uni-grid-item"},{default:n((()=>[s(m,{class:l([{"uni-grid-item--border":h.showBorder,"uni-grid-item--border-top":h.showBorder&&d.index<h.column,"uni-highlight":h.highlight},"uni-grid-item__box"]),style:a({"border-right-color":h.borderColor,"border-bottom-color":h.borderColor,"border-top-color":h.borderColor}),onClick:p._onClick},{default:n((()=>[g(e.$slots,"default",{},void 0,!0)])),_:3},8,["class","style","onClick"])])),_:3},8,["style"])):r("",!0)}],["__scopeId","data-v-ad485346"]]);const C=_({name:"UniGrid",emits:["change"],props:{column:{type:Number,default:3},showBorder:{type:Boolean,default:!0},borderColor:{type:String,default:"#D2D2D2"},square:{type:Boolean,default:!0},highlight:{type:Boolean,default:!0}},provide(){return{grid:this}},data:()=>({elId:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,width:0}),created(){this.children=[]},mounted(){this.$nextTick((()=>{this.init()}))},methods:{init(){setTimeout((()=>{this._getSize((e=>{this.children.forEach(((t,i)=>{t.width=e}))}))}),50)},change(e){this.$emit("change",e)},_getSize(t){e().in(this).select(`#${this.elId}`).boundingClientRect().exec((e=>{this.width=parseInt((e[0].width-1)/this.column)+"px",t(this.width)}))}}},[["render",function(e,t,r,d,c,h){const p=u;return i(),o(p,{class:"uni-grid-wrap"},{default:n((()=>[s(p,{id:c.elId,ref:"uni-grid",class:l(["uni-grid",{"uni-grid--border":r.showBorder}]),style:a({"border-left-color":r.borderColor})},{default:n((()=>[g(e.$slots,"default",{},void 0,!0)])),_:3},8,["id","class","style"])])),_:3})}],["__scopeId","data-v-a0c79dbb"]]);const k=_({data:()=>({navigatorBars:[{id:1,name:"ICPC联盟",icon:"vip"},{id:2,name:"竞赛",icon:"medal"},{id:3,name:"社团",icon:"staff"},{id:4,name:"面试宝典",icon:"gift"}]}),methods:{change(e){console.log(e)}}},[["render",function(e,r,l,a,g,_){const k=y(t("uni-notice-bar"),x),B=y(t("uni-icons"),w),z=h,I=u,v=y(t("uni-grid-item"),S),D=y(t("uni-grid"),C),M=b;return i(),o(I,null,{default:n((()=>[s(k,{"show-icon":"",scrollable:"",text:"uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"}),s(D,{column:4,highlight:!0,onChange:_.change},{default:n((()=>[(i(!0),p(f,null,m(g.navigatorBars,((e,t)=>(i(),o(v,{index:t,key:t},{default:n((()=>[s(I,{class:"grid-item-box",style:{"background-color":"#fff"}},{default:n((()=>[s(B,{type:e.icon,size:40,color:"#777"},null,8,["type"]),s(z,{class:"text"},{default:n((()=>[d(c(e.name),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["index"])))),128))])),_:1},8,["onChange"]),s(M,{url:"/pages/index/crop"},{default:n((()=>[d("crop")])),_:1}),s(M,{url:"/pages/index/mqttui","open-type":"switchTab"},{default:n((()=>[d("mqtt")])),_:1}),s(M,{url:"/pages/index/login"},{default:n((()=>[d("login")])),_:1}),s(M,{url:"/pages/index/wxlogin","open-type":"switchTab"},{default:n((()=>[d("wx-login")])),_:1})])),_:1})}],["__scopeId","data-v-9c2ed365"]]);export{k as default};
