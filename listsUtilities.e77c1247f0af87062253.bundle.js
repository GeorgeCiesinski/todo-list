"use strict";(self.webpackChunktodo_list=self.webpackChunktodo_list||[]).push([[923],{854:(e,t,n)=>{n.d(t,{Z:()=>i});const s=JSON.parse('{"lists":[{"title":"Default List","description":"Basic list for any kind of todo\'s","todos":[{"name":"Clean fridge","added":"2023-01-05","description":"Throw out rotten food and wash stains","checklist":[],"due":null,"priority":1,"checked":true},{"name":"Car Maintenance","added":"2023-01-06","description":"Prepare car for spring","checklist":[{"name":"Change Tires","checked":false},{"name":"Replace Oil","checked":false},{"name":"Car Wash","checked":false}],"due":"2023-03-01","priority":3,"checked":false},{"name":"Submit Tax Return","added":"2023-01-07","description":"Throw out rotten food and wash stains","checklist":[],"due":"2023-04-01","priority":2,"checked":false}]}],"newList":{"title":"","description":"","todos":[]}}'),i=function(){let e=null,t=null,n=null,i=null,o=null;const l=function(e){console.log("New save occurred."),localStorage.setItem("lists",JSON.stringify(e)),o=new Date},c=function(){return JSON.parse(localStorage.getItem("lists"))},r=function(){e=c()||function(){const e=s.lists;return l(e),e}()};r(),console.log(e);const u=function(s){n=function(t){return e[t]}(s),t=s};return u(0),setInterval((function(){(null===o&&null!==i||i>o)&&new Date-i>=3e3&&l(e)}),3e3),{createNewList:function(){const{newList:t}=s;e.push(t);const n=e.indexOf(t);u(n)},titleFocus:function(){document.querySelector("#list-title").focus()},titleEmpty:function(){const e=document.querySelector("#list-title");return""===e.value||null===e.value},listNavData:function(){const t=[];for(let n=0;n<e.length;n+=1)t[n]=e[n].title;return t},saveLists:l,loadLists:c,listsLength:function(){return e.length},switchCurrent:u,deleteCurrent:function(){e.splice(t,1),u(0)},deleteRefresh:function(){r(),u(0)},getCurrent:function(){return{list:n,index:t}},updateChange:function(){i=new Date}}}}},e=>{e(e.s=854)}]);