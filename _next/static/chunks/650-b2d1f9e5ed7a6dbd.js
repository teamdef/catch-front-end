"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[650],{1128:function(n,e,t){var o=t(29),i=t(6835),r=t(7794),s=t.n(r),c=t(7294),a=t(2125),l=t(2586),d=t(1163),p=t(4237),u=t(6724),m=t(4604),f=t(5893),g=a.ZP.div.withConfig({displayName:"Comment__Wrapper",componentId:"sc-fl2zfy-0"})(["margin-top:48px;"]),x=a.ZP.div.withConfig({displayName:"Comment__CommentHeader",componentId:"sc-fl2zfy-1"})(["display:flex;align-items:center;justify-content:space-between;margin-bottom:13px;"]),h=a.ZP.div.withConfig({displayName:"Comment__HeaderLeft",componentId:"sc-fl2zfy-2"})(["display:flex;align-items:baseline;"]),y=a.ZP.h1.withConfig({displayName:"Comment__Title",componentId:"sc-fl2zfy-3"})(["color:",";font-weight:",";font-size:",";"],p.r.colors.blackColors.grey_900,p.r.fontWeight.bold,p.r.fontSize.body_1),b=a.ZP.span.withConfig({displayName:"Comment__Count",componentId:"sc-fl2zfy-4"})(["margin-left:8px;color:",";font-size:",";"],p.r.colors.blackColors.grey_800,p.r.fontSize.caption),_=a.ZP.button.withConfig({displayName:"Comment__More",componentId:"sc-fl2zfy-5"})(["color:",";font-size:",";padding:8px 12px;"],p.r.colors.secondary_300,p.r.fontSize.caption),C=a.ZP.div.withConfig({displayName:"Comment__Empty",componentId:"sc-fl2zfy-6"})(["display:flex;align-items:center;justify-content:center;margin-top:25px;margin-bottom:40px;color:",";font-size:",";"],p.r.colors.blackColors.grey_500,p.r.fontSize.caption);e.Z=function(){var n=(0,d.useRouter)(),e=(0,c.useState)([]),t=e[0],r=e[1],a=n.query.quizset_id,p=(0,u.d)({escClickable:!0,backgroundClickable:!0,bottomSheet:!0,contents:(0,f.jsx)(m.xz,{})}),v=(0,i.Z)(p,3),k=v[0],w=v[2],j=(0,c.useCallback)((0,o.Z)(s().mark((function n(){var e;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,l.BJ)(a);case 3:e=n.sent,r(e),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])}))),[a]);return(0,c.useEffect)((function(){j()}),[a]),(0,f.jsxs)(g,{children:[(0,f.jsxs)(x,{children:[(0,f.jsxs)(h,{children:[(0,f.jsx)(y,{children:"\ud55c\uc904\ud3c9"}),(0,f.jsx)(b,{children:t.length})]}),(0,f.jsx)(_,{onClick:k,children:"\ub354\ubcf4\uae30"})]}),t[0]&&(0,f.jsx)(m.HI,{comment:t[0]}),!t[0]&&(0,f.jsx)(C,{children:"\ub4f1\ub85d\ub41c \ud55c\uc904\ud3c9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,f.jsx)(w,{})]})}},4604:function(n,e,t){t.d(e,{sv:function(){return o.Z},HI:function(){return u},xz:function(){return P}});var o=t(1128),i=t(2697),r=t(2125),s=t(4237),c=t(5893),a=r.ZP.div.withConfig({displayName:"CommentItem__Wrapper",componentId:"sc-1ltces9-0"})(["display:flex;align-items:start;margin-bottom:28px;"]),l=r.ZP.div.withConfig({displayName:"CommentItem__TextBox",componentId:"sc-1ltces9-1"})(["margin-left:16px;"]),d=r.ZP.span.withConfig({displayName:"CommentItem__Nickname",componentId:"sc-1ltces9-2"})(["color:",";font-weight:",";"],s.r.colors.blackColors.grey_900,s.r.fontWeight.bold),p=r.ZP.p.withConfig({displayName:"CommentItem__Content",componentId:"sc-1ltces9-3"})(["color:",";"],s.r.colors.blackColors.grey_800),u=function(n){var e,t=n.comment;return(0,c.jsxs)(a,{children:[(0,c.jsx)(i.Z,{src:null===(e=t.user)||void 0===e?void 0:e.profile_img}),(0,c.jsxs)(l,{children:[(0,c.jsx)(d,{children:t.nickname}),(0,c.jsx)(p,{children:t.content})]})]})},m=r.ZP.div.withConfig({displayName:"CommentList__Wrapper",componentId:"sc-40zn0c-0"})(["position:relative;width:100%;margin-bottom:74px;padding-left:24px;padding-right:15px;overflow-y:scroll;"]),f=function(n){return(0,c.jsx)(m,{children:n.comments.map((function(n,e){return(0,c.jsx)(u,{comment:n},"comment-".concat(e))}))})},g=t(29),x=t(7794),h=t.n(x),y=t(7294),b=t(2586),_=t(1163),C=r.ZP.div.withConfig({displayName:"Empty",componentId:"sc-nav1c-0"})(["display:flex;flex-grow:1;width:100%;justify-content:center;align-items:center;"]),v=t(1204),k=t(6835),w=t(6724),j=t(9473),z=r.ZP.div.withConfig({displayName:"CommentInput__Wrapper",componentId:"sc-iphnbt-0"})(["position:absolute;display:flex;bottom:0;width:100%;flex:none;justify-content:end;padding:12px;background-color:#fff;box-shadow:0px -4px 13px 0px rgba(180,160,255,0.12);input{position:relative;width:100%;border-radius:8px;border:1px solid ",";flex-grow:1;padding:16px 24px;::placeholder{color:",";}}button{position:absolute;background-color:transparent;padding:16px 24px;display:block;color:",";font-weight:",";font-size:",";&:disabled{opacity:0.5;}}"],(function(n){return n.theme.colors.secondary_500}),(function(n){return n.theme.colors.blackColors.grey_400}),(function(n){return n.theme.colors.secondary_500}),(function(n){return n.theme.fontWeight.bold}),(function(n){return n.theme.fontSize.body_2})),Z=function(n){var e=n.commentsHandler,t=(0,_.useRouter)().query.quizset_id,o=(0,w.G)(""),i=(0,k.Z)(o,4),r=i[0],s=i[2],a=i[3],l=(0,j.v9)((function(n){return n.user})),d=l.isLoggedin,p=l.userId,u=(0,j.v9)((function(n){return n.user_solve})).solveUserName,m=(0,y.useCallback)((0,g.Z)(h().mark((function n(){var o;return h().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,b.dH)(u,r,t,d&&p);case 3:o=n.sent,e(o),console.log(r),s(),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),console.log(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])}))),[r,t,u,d,p]);return(0,c.jsxs)(z,{children:[(0,c.jsx)("input",{type:"text",value:r,onChange:a,id:"comment-input",maxLength:50,placeholder:"\ud55c\uc904\ud3c9 \ub0a8\uae30\uae30.."}),(0,c.jsx)("button",{disabled:!r,onClick:m,children:"\ub4f1\ub85d"})]})},I=r.ZP.div.withConfig({displayName:"CommentModal__Wrapper",componentId:"sc-p8jqo7-0"})(["position:relative;display:flex;height:428px;flex-direction:column;align-items:center;"]),N=r.ZP.div.withConfig({displayName:"CommentModal__Title",componentId:"sc-p8jqo7-1"})(["font-size:",";font-weight:",";color:",";height:69px;display:flex;justify-content:center;align-items:center;flex:none;"],(function(n){return n.theme.fontSize.subtitle_2}),(function(n){return n.theme.fontWeight.bold}),(function(n){return n.theme.colors.blackColors.grey_900})),P=function(n){var e=n.closeModal,t=(0,_.useRouter)().query.quizset_id,o=(0,y.useState)([]),i=o[0],r=o[1],s=(0,y.useCallback)((0,g.Z)(h().mark((function n(){var e;return h().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,b.BJ)(t);case 3:e=n.sent,r(e),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])}))),[t]);return(0,y.useEffect)((function(){s()}),[t]),(0,c.jsxs)(I,{children:[(0,c.jsxs)(N,{children:["\ud55c\uc904\ud3c9",(0,c.jsx)(v.Z,{onClick:e})]}),i[0]&&(0,c.jsx)(f,{comments:i}),!i[0]&&(0,c.jsx)(C,{children:"\ub4f1\ub85d\ub41c \ud55c\uc904\ud3c9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,c.jsx)(Z,{commentsHandler:function(n){r(n)}})]})}},8430:function(n,e,t){t.d(e,{bX:function(){return p},LJ:function(){return f},lo:function(){return k}});var o=t(7294),i=t(2125),r=t(4237),s=t(5893),c=i.ZP.div.withConfig({displayName:"RankCard__Box",componentId:"sc-1pwb1vt-0"})(["position:relative;display:flex;gap:12px;border-radius:8px;background-color:",";align-items:center;padding:12px 20px;"],r.r.colors.primary_50),a=i.ZP.span.withConfig({displayName:"RankCard__UserRank",componentId:"sc-1pwb1vt-1"})(["color:",";font-weight:",";font-size:",";"],r.r.colors.blackColors.grey_900,r.r.fontWeight.medium,r.r.fontSize.subtitle_2),l=i.ZP.span.withConfig({displayName:"RankCard__UserName",componentId:"sc-1pwb1vt-2"})(["flex-grow:1;color:",";font-weight:",";font-size:",";"],r.r.colors.blackColors.grey_800,r.r.fontWeight.bold,r.r.fontSize.caption),d=i.ZP.span.withConfig({displayName:"RankCard__UserScore",componentId:"sc-1pwb1vt-3"})(["color:",";font-weight:",";font-size:",";"],r.r.colors.blackColors.grey_900,r.r.fontWeight.medium,r.r.fontSize.caption),p=function(n){var e=n.user;return(0,s.jsxs)(c,{children:[(0,s.jsx)(a,{children:e.ranking}),(0,s.jsx)(l,{children:e.nickname}),(0,s.jsxs)(d,{children:[e.score," / ",e.quizCount]})]})},u=i.ZP.span.withConfig({displayName:"Ranker__Tag",componentId:"sc-2oxdvl-0"})(["margin-top:4px;display:flex;align-items:center;justify-content:center;width:56px;height:24px;border-radius:18px;border:1px solid ",";text-align:center;"],(function(n){return n.theme.colors.blackColors.grey_800})),m=i.ZP.div.withConfig({displayName:"Ranker__Box",componentId:"sc-2oxdvl-1"})([""," "," display:flex;flex:1;flex-direction:column;align-items:center;text-align:center;color:",";font-size:",";"],(function(n){return 2===n.rank&&"padding-top:20px;"}),(function(n){return 3===n.rank&&"padding-top:40px;"}),(function(n){return n.theme.colors.blackColors.grey_800}),(function(n){return n.theme.fontSize.caption})),f=function(n){var e=n.ranker;return e?(0,s.jsxs)(m,{rank:e.ranking,children:[e.nickname,(0,s.jsxs)(u,{children:[e.score," / ",e.quizCount]})]},e.ranking):(0,s.jsx)(m,{})},g=t(29),x=t(7794),h=t.n(x),y=t(1163),b=t(2586),_=i.ZP.ul.withConfig({displayName:"RankingBoard__Wrapper",componentId:"sc-1bo6tv7-0"})(["position:relative;"]),C=i.ZP.div.withConfig({displayName:"RankingBoard__Empty",componentId:"sc-1bo6tv7-1"})(["position:relative;display:flex;justify-content:center;margin-top:22px;margin-bottom:43px;"]),v=i.ZP.div.withConfig({displayName:"RankingBoard__Podium",componentId:"sc-1bo6tv7-2"})(["padding:0 8px;display:flex;width:100%;background-size:100%;background-repeat:no-repeat;background-position:100% 100%;margin-bottom:10px;aspect-ratio:294/200;background-image:url(/assets/img/rebranding/anyquiz/podium.svg);"]),k=function(n){var e=n.quizRankingList,t=(0,y.useRouter)(),i=t.query,r=i.quizset_id,c=i.solver_id,a=(0,o.useState)(e||null),l=a[0],d=a[1],u=(0,o.useState)(),m=u[0],x=u[1],k=function(){var n=(0,g.Z)(h().mark((function n(){var e;return h().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,b.JL)(r);case 3:e=n.sent,d(e.slice(0,3)),x(e[e.findIndex((function(n){return n.id===c}))]),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),console.log(n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(){return n.apply(this,arguments)}}();return(0,o.useEffect)((function(){r&&!e&&k()}),[t.isReady]),0!==(null===l||void 0===l?void 0:l.length)||m?(0,s.jsxs)(_,{children:[(0,s.jsxs)(v,{children:[l&&(0,s.jsx)(f,{ranker:l[1]}),l&&(0,s.jsx)(f,{ranker:l[0]}),l&&(0,s.jsx)(f,{ranker:l[2]})]}),m&&m.ranking>3&&(0,s.jsx)(p,{user:m})]}):(0,s.jsx)(C,{children:"\uc544\uc9c1 \ub4f1\ub85d\ub41c \uc21c\uc704\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."})}},1204:function(n,e,t){var o=t(2125).ZP.button.withConfig({displayName:"CloseBtn",componentId:"sc-1j6y7dw-0"})(["position:absolute;display:block;top:21px;right:16px;width:24px;height:24px;z-index:1;background:url(/assets/img/rebranding/icon/close_24px.svg) no-repeat center;"]);e.Z=o}}]);