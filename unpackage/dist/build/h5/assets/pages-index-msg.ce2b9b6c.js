import{u as e,B as s,Z as a,o as n,a as o,w as t,g as r,d as i,f as m,r as u,D as l}from"./index-3524f8e7.js";import{_ as d,a as c,b as p}from"./uni-forms.25ec0a0d.js";import{r as f}from"./uni-app.es.2df0d4c9.js";import{p as g}from"./index.c80e8371.js";import{_ as h}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.312dfc27.js";const _=h({data:()=>({msg:{content:""},rules:{content:{rules:[{required:!0,errorMessage:"请输入大事件"}]}}}),methods:{createMsg(){this.$refs.myform.validate().then((n=>{const o=e(),{id:t}=o.userinfo,r=Date.now(),i={content:this.msg.content,happenTime:r,userId:t};g("api/memorabilia/add",i).then((e=>{const{code:n,msg:o,success:t}=e;1==n&&t?(s({url:"/pages/index/index"}),a({title:o,duration:2e3,icon:"none"})):a({title:o,duration:2e3,icon:"none"})}))}))}}},[["render",function(e,s,a,g,h,_){const j=f(u("uni-easyinput"),d),x=f(u("uni-forms-item"),c),y=l,V=f(u("uni-forms"),p),M=r;return n(),o(M,{class:"container"},{default:t((()=>[i(V,{class:"myForm",ref:"myform",modelValue:h.msg,rules:h.rules},{default:t((()=>[i(x,{name:"content"},{default:t((()=>[i(j,{class:"input",modelValue:h.msg.content,"onUpdate:modelValue":s[0]||(s[0]=e=>h.msg.content=e),placeholder:"请输入大事件内容",required:""},null,8,["modelValue"])])),_:1}),i(y,{type:"primary",onClick:_.createMsg},{default:t((()=>[m("添加")])),_:1},8,["onClick"])])),_:1},8,["modelValue","rules"])])),_:1})}]]);export{_ as default};
