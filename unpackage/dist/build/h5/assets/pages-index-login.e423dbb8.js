import{u as e,y as s,z as a,o,a as l,w as r,g as t,d as i,f as u,A as n,B as m,C as d,x as c,r as p,D as f}from"./index-3524f8e7.js";import{_ as g,a as _,b as y}from"./uni-forms.25ec0a0d.js";import{r as j}from"./uni-app.es.2df0d4c9.js";import{_ as h}from"./logo.04cf753c.js";import{p as x}from"./index.c80e8371.js";import"./mqtt.309f83a6.js";import{_ as V}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.312dfc27.js";const k=V({__name:"login",setup(V){const k=e(),w=s(null),v=a({email:"",password:""}),z={email:{rules:[{required:!0,errorMessage:"必填项"},{format:"email",errorMessage:"邮件格式错误"}]}},C=()=>{w.value.validate().then((e=>{x("api/mobile/elogin",v).then((e=>{if(console.log(e),e.success){const s=e.data.userinfo;k.setToken(s.token),k.fillUser(s),n({key:"isLogin",data:"1",success:function(){console.log("setStorage success")}}),m({url:"/pages/my/my"})}})).catch((e=>{console.log(e)}))})).catch((e=>{console.log(e)}))};function U(){d({url:"/pages/index/register",success(e){console.log(e)},fail(e){console.log(e)}})}return(e,s)=>{const a=c,n=t,m=j(p("uni-easyinput"),g),d=j(p("uni-forms-item"),_),x=f,V=j(p("uni-forms"),y);return o(),l(n,null,{default:r((()=>[i(n,{class:"logo"},{default:r((()=>[i(a,{src:h})])),_:1}),i(V,{class:"myForm",ref_key:"myForm",ref:w,modelValue:v,rules:z},{default:r((()=>[i(d,{name:"email"},{default:r((()=>[i(m,{class:"input",modelValue:v.email,"onUpdate:modelValue":s[0]||(s[0]=e=>v.email=e),placeholder:"请输入电子邮箱","suffix-icon":"email"},null,8,["modelValue"])])),_:1}),i(d,{name:"password"},{default:r((()=>[i(m,{class:"input",type:"password",modelValue:v.password,"onUpdate:modelValue":s[1]||(s[1]=e=>v.password=e),placeholder:"请输入密码"},null,8,["modelValue"])])),_:1}),i(x,{type:"primary",onClick:C},{default:r((()=>[u("用户登录")])),_:1}),i(n,{class:"logo-extra"},{default:r((()=>[i(x,{type:"default",size:"mini"},{default:r((()=>[u("忘记密码")])),_:1}),i(x,{type:"default",size:"mini",onClick:U},{default:r((()=>[u("用户注册")])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}}},[["__scopeId","data-v-2a561dce"]]);export{k as default};
