(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-936b481a"],{"1a33":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panelsbox"},[a("cube-scroll",{staticClass:"leftpanels"},[a("ul",t._l(t.tabslabel,(function(e,n){return a("li",{key:n,class:e.active?"active":"",on:{click:function(e){return t.selectlist(n)}}},[t._v(" "+t._s(e.label)+" ")])})),0)]),a("cube-scroll",{staticClass:"rightpanels"},[a("ul",t._l(t.tags,(function(e,n){return a("li",{key:n},[a("img",{attrs:{src:e.image,alt:""}}),a("p",[t._v(t._s(e.label)+" "),a("i",{staticClass:"cubeic-add",on:{click:function(a){return t.addtocart(a,e)}}})])])})),0)]),a("div",{staticClass:"ball-wrap"},[a("transition",{on:{"before-enter":t.beforeEnter,enter:t.enter,afterEnter:t.afterEnter}},[t.ball.show?a("div",{staticClass:"ball"},[a("div",{staticClass:"inner"},[a("i",{staticClass:"cubeic-add"})])]):t._e()])],1)],1)},l=[],s=a("1da1"),i=(a("96cf"),a("4160"),a("159b"),{data:function(){return{ball:{show:!1,el:""},tags:[],tabslabel:[{label:"热门推荐",active:!0},{label:"手机数码",active:!1},{label:"家用电器",active:!1},{label:"电脑办公",active:!1},{label:"家居厨具",active:!1},{label:"家具家装",active:!1},{label:"美妆护肤",active:!1},{label:"医药保健",active:!1},{label:"钟表珠宝",active:!1},{label:"计生情趣",active:!1},{label:"生活旅行",active:!1},{label:"国际名牌",active:!1}]}},methods:{selectlist:function(t){var e=this;this.tabslabel.forEach((function(a,n){t==n?(a.active=!0,e.getclassify(t)):a.active=!1}))},getclassify:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$http.get("/api/classify",{params:{type:t}});case 2:n=a.sent,e.tags=n.data;case 4:case"end":return a.stop()}}),a)})))()},addtocart:function(t,e){this.$store.commit("tocart",e),this.ball.show=!0,this.ball.el=t.target},beforeEnter:function(t){var e=this.ball.el;console.log(e);var a=e.getBoundingClientRect();console.log(a);var n=a.left-.7*window.innerWidth,l=-(window.innerHeight-a.top);console.log(n,l),t.style.display="block",t.style.transform="translate3d(0,".concat(l,"px,0)");var s=t.querySelector(".inner");s.style.transform="translate3d(".concat(n,"px,0,0)")},enter:function(t,e){document.body.offsetHeight,t.style.transform="translate3d(0,0,0)";var a=t.querySelector(".inner");a.style.transform="translate3d(0,0,0)",t.addEventListener("transitionend",e)},afterEnter:function(t){this.ball.show=!1,t.style.display="none"}},created:function(){this.getclassify(0)},mounted:function(){var t=document.querySelector(".leftpanels"),e=document.querySelector(".rightpanels"),a=document.documentElement.clientHeight;t.style.height=a-57+"px",e.style.height=a-57+"px"}}),c=i,r=(a("32fb"),a("2877")),o=Object(r["a"])(c,n,l,!1,null,"7edbee9f",null);e["default"]=o.exports},"32fb":function(t,e,a){"use strict";a("aaa6")},aaa6:function(t,e,a){}}]);
//# sourceMappingURL=chunk-936b481a.7c27a867.js.map