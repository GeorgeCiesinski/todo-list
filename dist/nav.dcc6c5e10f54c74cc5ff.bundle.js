"use strict";(self.webpackChunktodo_list=self.webpackChunktodo_list||[]).push([[411],{172:(e,t,a)=>{a.d(t,{Z:()=>n});const n=function(e,t,a,n){const s=function(a){const n=e.createElement({parent:a,tag:"li",idName:"lists",className:"nav-items"}),s=e.createElement({parent:n,tag:"a",idName:"list-link",className:"nav-links",innerHTML:"Lists"}),l=e.createElement({parent:n,tag:"div",className:"list-menu"});e.addClass(s,"active-nav-links"),e.clickEvent(s,t.showPage),function(t){const a=e.createElement({parent:t,tag:"button",className:"list-collapse",innerHTML:'Select <span class="material-symbols-rounded">expand_more</span>'});e.clickEvent(a,e.createCollapseNav)}(l),function(a){const n=e.createElement({parent:a,tag:"div",className:"collapse"});!function(a){const n=e.createElement({parent:a,tag:"a",className:"add-list-link",innerHTML:'<span class="material-symbols-rounded">add</span>New List'});e.clickEvent(n,t.switchAndCreate)}(n),function(t){const a=e.createElement({parent:t,tag:"ul",idName:"list-items"});e.setNavElement(a)}(n)}(l)},l=function(t){e.createElement({parent:t,tag:"span",className:"bar"})};return{build:function(t){!function(t){const a=e.createElement({parent:t,tag:"div",className:"hamburger"});for(let e=0;e<3;e+=1)l(a);e.clickEvent(a,e.createCollapseNav)}(t);const c=e.createElement({parent:t,tag:"ul",idName:"nav-list"});s(c),function(t){const n=e.createElement({parent:t,tag:"li",idName:"settings",className:"nav-items"}),s=e.createElement({parent:n,tag:"a",idName:"settings-link",className:"nav-links",innerHTML:"Settings"});e.clickEvent(s,a.showPage)}(c),function(t){const a=e.createElement({parent:t,tag:"li",idName:"about",className:"nav-items"}),s=e.createElement({parent:a,tag:"a",idName:"about-link",className:"nav-links",innerHTML:"About"});e.clickEvent(s,n.showPage)}(c)}}}}},e=>{e(e.s=172)}]);