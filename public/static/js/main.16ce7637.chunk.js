(window.webpackJsonpnode_with_react=window.webpackJsonpnode_with_react||[]).push([[0],{41:function(e,t,n){e.exports=n(69)},46:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(21),c=n.n(s);n(46),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=n(1),i=n(2),l=n(4),u=n(3),p=n(5),m=n(8),h=n(18),d=n(17),E=n(9),b=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onChange=n.onChange.bind(Object(E.a)(n)),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"onChange",value:function(e){this.props.setValue(e.target.value)}},{key:"render",value:function(){return r.a.createElement("div",{className:"block"+this.props.class},r.a.createElement("label",{htmlFor:"login",className:"label"+this.props.class},"Login"),r.a.createElement("input",{type:"text",id:"login",name:"login",className:"input"+this.props.class,onChange:this.onChange,placeholder:this.props.login}))}}]),t}(r.a.Component),g=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onChange=n.onChange.bind(Object(E.a)(n)),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"onChange",value:function(e){this.props.setValue(e.target.value)}},{key:"render",value:function(){return r.a.createElement("div",{className:"block"+this.props.class},r.a.createElement("label",{htmlFor:"password",className:"label"+this.props.class},"Password"),r.a.createElement("input",{type:"password",id:"password",name:"password",className:"input"+this.props.class,onChange:this.onChange,placeholder:this.props.password}))}}]),t}(r.a.Component),f=n(7),O=n.n(f),j="CHANGE_LOGIN",v="CHANGE_PASSWORD",k="SIGN_IN_SUCCESS",y="SIGN_IN_REQUEST",_="SIGN_IN_FAILED",S="SIGN_OUT",T="RESTORE_TOKEN",N="AUTH_WITH_TOKEN_REQUEST",w="AUTH_WITH_TOKEN_SUCCESS",U="AUTH_WITH_TOKEN_FAILED",I="REFRESH_TOKEN_REQUEST",C="REFRESH_TOKEN_SUCCESS",R="REFRESH_TOKEN_FAILED",F=n(16),z=n.n(F);function D(e){return function(t){t({type:N}),z.a.post("/request/login/token-auth",{},{headers:{authorization:"Bearer "+e}}).then((function(e){if(200!==e.status)throw new Error;t({type:w,payload:Object.assign({message:"Welcome, ".concat(e.data.user.login)},e.data.user)})})).catch((function(e){localStorage.removeItem("accessToken"),t({type:U,payload:{accessToken:null,accessExpiresIn:0,message:"\u041d\u0435\u0432\u0430\u043b\u0438\u0434\u043d\u044b\u0439 \u0438\u043b\u0438 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u0442\u043e\u043a\u0435\u043d"}})}))}}var L=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(h.c,{exact:this.props.exact,className:"nav__link",activeClassName:"nav__link__active",to:this.props.link},this.props.name)}}]),t}(r.a.Component),A=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"nav-bar"},r.a.createElement("div",{className:"nav-bar__container"},r.a.createElement(L,{exact:!0,link:"/",name:"Home page"}),r.a.createElement(L,{link:"/login",name:"Login"}),r.a.createElement(L,{link:"/authenticated",name:"Authenticated"}),r.a.createElement(L,{link:"/users",name:"User list"})))}}]),t}(r.a.Component),x=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"header"},r.a.createElement("img",{src:"/react-gif.gif",alt:""}))}}]),t}(r.a.Component),H=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("footer",{className:"footer"},r.a.createElement("div",{className:"footer--logo"},r.a.createElement("img",{src:"/logo192.png",alt:""})),r.a.createElement("div",{className:"footer--content"},r.a.createElement("p",null,"\xa9 design by Infernet")))}}]),t}(r.a.Component),q=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleSubmit=n.handleSubmit.bind(Object(E.a)(n)),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.signIn({login:this.props.login,password:this.props.password})}},{key:"render",value:function(){var e=this.props,t=e.setLogin,n=e.setPassword,a=e.login,s=e.password,c=e.isFetching,o=e.message;return r.a.createElement("div",null,r.a.createElement(x,null),r.a.createElement(A,null),r.a.createElement("div",{className:"authorization-body"},r.a.createElement("div",{className:"authorization__title"},r.a.createElement("h3",null,"Login Page")),r.a.createElement("div",{className:"authorization__content"},r.a.createElement("form",{className:"authorization__content--form",onSubmit:this.handleSubmit},r.a.createElement(b,{login:a,setValue:t,class:"Login"}),r.a.createElement(g,{password:s,class:"Password",setValue:n}),r.a.createElement("button",{type:"submit"},"sign in")),r.a.createElement("div",{className:"authorization__content--status"},r.a.createElement("p",null,"Login: ",a),r.a.createElement("p",null,"Password: ",s),c?r.a.createElement("p",null,"\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u043d\u0430 Node.js..."):r.a.createElement("p",null,o)))),r.a.createElement(H,null))}}]),t}(r.a.Component);q.propsTypes={isFetching:O.a.bool.isRequired,message:O.a.string,login:O.a.string.isRequired,password:O.a.string.isRequired,setLogin:O.a.func.isRequired,setPassword:O.a.func.isRequired};var G=Object(m.b)((function(e){return console.log(e),{login:e.authorization.login,password:e.authorization.password,isFetching:e.authorization.isFetching,message:e.authorization.message}}),(function(e){return{setLogin:function(t){return e(function(e){return{type:j,payload:e}}(t))},setPassword:function(t){return e(function(e){return{type:v,payload:e}}(t))},signIn:function(t){return e(function(e){return function(t){t({type:y}),z.a.post("/request/login/login-auth",{login:e.login,password:e.password}).then((function(e){if(400===e.status)throw new Error;localStorage.setItem("accessToken",e.data.accessToken),localStorage.setItem("refreshToken",e.data.refreshToken),t({type:k,payload:{message:"Welcome, "+e.data.login,accessToken:e.data.accessToken,refreshToken:e.data.refreshToken,accessExpiresIn:e.data.accessExpiresIn}})})).catch((function(e){return t({type:_,payload:{message:"Error: uncorrected login or password"}})}))}}(t))}}}))(q),P=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:this.props.class.container},r.a.createElement("p",{className:this.props.class.title},this.props.title),r.a.createElement("p",{className:this.props.class.content},this.props.content))}}]),t}(r.a.Component),W=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.store,t={container:"home__content--container",title:"home__content--title",content:"home__content--content"};return r.a.createElement("div",null,r.a.createElement(x,null),r.a.createElement(A,null),r.a.createElement("div",{className:"home-body"},r.a.createElement("div",{className:"home__title"},r.a.createElement("h3",null,"Home page")),r.a.createElement("div",{className:"home__content"},null!==e.authorization.token?Object.keys(e.authorization).map((function(n){if("token"!==n&&""!==e.authorization[n])return r.a.createElement(P,{key:n,class:t,title:n+":",content:e.authorization[n]})})):r.a.createElement(P,{class:t,title:"\u041e\u0448\u0438\u0431\u043a\u0430:",content:"\u0412\u044b \u043d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d\u044b"}))),r.a.createElement(H,null))}}]),t}(r.a.Component),K=Object(m.b)((function(e){return{store:e}}))(W),Q=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).check=n.check.bind(Object(E.a)(n)),n.interval=setInterval(n.check,1e3),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"check",value:function(){var e=(new Date).getTime()/1e3,t=this.props.store.authorization.accessExpiresIn;e>t&&(alert("Token was broken"),alert("Now time: ".concat(new Date(e).toLocaleTimeString(),"\nToken time: ").concat(new Date(t).toLocaleTimeString())),clearInterval(this.interval))}},{key:"render",value:function(){var e=this.props.store;return r.a.createElement("div",null,r.a.createElement(x,null),r.a.createElement(A,null),r.a.createElement("div",{className:"authenticated-body"},r.a.createElement("div",{className:"authenticated--title"},r.a.createElement("h3",null,"Authenticated page")),r.a.createElement("ul",{className:"authenticated--content"},Object.keys(e.authorization).map((function(t){return"token"!==t&&r.a.createElement("li",{key:t},t,": ",e.authorization[t])}))),r.a.createElement("button",{className:"authenticated--button",onClick:this.props.signOut},"Log out")),r.a.createElement(H,null))}}]),t}(r.a.Component),B=Object(m.b)((function(e){return{store:e}}),(function(e){return{signOut:function(){return e((localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),{type:S,login:"",password:"",accessToken:null,refreshToken:null,accessExpiresIn:0}))}}}))(Q),V=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onInsertUser=n.onInsertUser.bind(Object(E.a)(n)),n.onUpdateUser=n.onUpdateUser.bind(Object(E.a)(n)),n.onDeleteUser=n.onDeleteUser.bind(Object(E.a)(n)),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"onInsertUser",value:function(e){}},{key:"onUpdateUser",value:function(e){}},{key:"onDeleteUser",value:function(e){}},{key:"render",value:function(){return r.a.createElement("div",{className:"users__control-panel--container"},r.a.createElement("button",{className:"users__control-panel--btn",onClick:this.onInsertUser},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"),r.a.createElement("button",{className:"users__control-panel--btn",onClick:this.onUpdateUser},"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c"),r.a.createElement("button",{className:"users__control-panel--btn",onClick:this.onDeleteUser},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))}}]),t}(r.a.Component);V.propsTypes={user:O.a.object.isRequired};var J=Object(m.b)((function(e){return{store:e}}),(function(e){return{insertUser:function(t){return e(D(t))}}}))(V),M="GET_USERS_REQUEST",$="GET_USERS_SUCCESS",X="GET_USERS_FAILED",Y="CHANGE_USER",Z="INSERT_USER_REQUEST",ee="INSERT_USER_SUCCESS",te="INSERT_USER_FAILED",ne="UPDATE_USER_REQUEST",ae="UPDATE_USER_SUCCESS",re="UPDATE_USER_FAILED",se="DELETE_USER_REQUEST",ce="DELETE_USER_SUCCESS",oe="DELETE_USER_FAILED",ie=n(19),le={id:null,login:"",password:"",isFetching:!1,message:"",accessToken:null,refreshToken:null,accessExpiresIn:0};var ue={selectedId:null,users:[],isFetching:!1,message:""};var pe=Object(ie.c)({authorization:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j:return Object.assign({},e,{login:t.payload});case v:return Object.assign({},e,{password:t.payload});case y:return Object.assign({},e,{isFetching:!0});case k:return Object.assign({},e,t.payload,{password:"",isFetching:!1});case _:return Object.assign({},e,t.payload,{isFetching:!1});case S:return Object.assign({},le);case T:return Object.assign({},e,t.payload);case N:return Object.assign({},e);case w:case U:return Object.assign({},e,t.payload);case I:return Object.assign({},e);case C:return Object.assign({},e,t.payload);case R:return le;default:return e}},users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Y:return Object.assign({},e,{selectedId:t.payload});case M:return Object.assign({},e,{isFetching:!0,message:"\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445"});case Z:return Object.assign({},e,{isFetching:!0,message:"\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435"});case ne:return Object.assign({},e,{isFetching:!0,message:"\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435"});case se:return Object.assign({},e,{isFetching:!0,message:"\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435"});case $:return Object.assign({},e,{users:t.payload});case ee:return Object.assign({},e,{users:t.payload,isFetching:!0,message:"\u0423\u0441\u043f\u0435\u0448\u043d\u043e\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435"});case ae:return Object.assign({},e,{users:t.payload,isFetching:!0,message:"\u0423\u0441\u043f\u0435\u0448\u043d\u043e\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435"});case ce:return Object.assign({},e,{users:t.payload,isFetching:!0,message:"\u0423\u0441\u043f\u0435\u0448\u043d\u043e\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435"});case te:case re:case oe:case X:return Object.assign({},e,{isFetching:!0,message:t.message,users:[]});default:return e}}}),me=n(39),he=n.n(me),de=n(40),Ee=Object(ie.d)(pe,Object(ie.a)((function(e){return function(t){return function(n){if(n.type===M){alert(M);var a=e.getState().authorization,r=Math.floor((new Date).getTime()/1e3);a.accessExpiresIn<=r?(e.dispatch(function(e,t,n){return function(a){a({type:I}),z.a.post("/request/login/refresh-token",{},{headers:{refresh:"Bearer "+e}}).then((function(e){if(200!==e.status)throw new Error;localStorage.setItem("accessToken",e.data.accessToken),localStorage.setItem("refreshToken",e.data.refreshToken),a({type:C,payload:e.data}),t(n)})).catch((function(e){localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),a({type:R})}))}}(a.refreshToken,t,n)),t(n)):(console.log("\u0442\u043e\u043a\u0435\u043d \u0435\u0449\u0435 \u0432\u0430\u043b\u0438\u0434\u043d\u044b\u0439"),t(n))}else console.log("\u041d\u0435 \u0442\u043e\u0442 action"),t(n)}}}),de.a,he.a));var be=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onSelect=n.onSelect.bind(Object(E.a)(n)),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"onSelect",value:function(e){e.preventDefault(),this.props.select(this.props.user.id)}},{key:"render",value:function(){var e=this.props.user;return r.a.createElement(h.b,{to:"",onClick:this.onSelect,className:"users__list--item-container"},Object.keys(e).map((function(t){return r.a.createElement("p",{className:"users__list--item-content",key:t},e[t])})))}}]),t}(r.a.Component);be.propsTypes={user:O.a.object.isRequired,select:O.a.func.isRequired};var ge=be,fe=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).props.getUsers(n.props.user.accessToken),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.users.users;return r.a.createElement("div",null,r.a.createElement(x,null),r.a.createElement(A,null),t.length>0?r.a.createElement("div",{className:"users-body"},r.a.createElement(J,{user:t[0]}),r.a.createElement("div",{className:"users__list-header"},Object.keys(t[0]).map((function(e){return r.a.createElement("p",{className:"users__list-header--title",key:e},e)}))),t.map((function(t){return r.a.createElement(ge,{user:t,key:t.id,select:e.props.selectUser})}))):r.a.createElement("div",{style:{height:"100%",width:"100%"}},"false"),r.a.createElement(H,null))}}]),t}(r.a.Component),Oe=Object(m.b)((function(e){return{user:e.authorization,users:e.users}}),(function(e){return{getUsers:function(t){return e(function e(t){return function(n){n({type:M}),z.a.post("/request/user/get",{token:t}).then((function(e){if(!e.data.users)throw new Error("Empty result");n({type:$,payload:e.data.users})})).catch((function(t){t.response&&401===t.response.status?n(e(Ee.getState().authorization.accessToken)):n({type:X,payload:t})}))}}(t))},selectUser:function(t){return e(function(e){return{type:Y,payload:e}}(t))}}}))(fe),je=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(d.d,null,r.a.createElement(d.b,{path:"/",exact:!0,component:K}),null!==this.props.store.accessToken?r.a.createElement(d.a,{from:"/login",to:"/authenticated"}):r.a.createElement(d.a,{from:"/authenticated",to:"/login"}),r.a.createElement(d.b,{path:"/login",component:G}),r.a.createElement(d.b,{path:"/authenticated",component:B}),r.a.createElement(d.b,{path:"/users",component:Oe}))}}]),t}(r.a.Component),ve=Object(m.b)((function(e){return{store:e.authorization}}))(je),ke=function(e){function t(e){var n;Object(o.a)(this,t);var a=(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).props.authorization;return null!==a.accessToken||null!=a.refreshToken||a.accessExpiresIn||null!==a.accessToken&&""===a.login&&null===a.id&&n.props.bearerToken(a.accessToken),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement(ve,null))}}]),t}(r.a.Component);ke.propsTypes={authorization:O.a.object.isRequired};var ye=Object(m.b)((function(e){return{authorization:e.authorization}}),(function(e){return{bearerToken:function(t){return e(D(t))},restoreToken:function(){return e(function(){var e=localStorage.getItem("accessToken"),t=localStorage.getItem("refreshToken");return{type:T,payload:{accessToken:null!==e?e:null,refreshToken:null!==t?t:null}}}())}}}))(ke);c.a.render(r.a.createElement(m.a,{store:Ee},r.a.createElement(ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.16ce7637.chunk.js.map