(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),l=t(2),i=function(e){return r.a.createElement("form",{onSubmit:e.addName},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameInput})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberInput})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:e.search,onChange:e.handleSearch}))},m=t(3),d=t.n(m),f="/api/persons",b=function(){return d.a.get(f).then((function(e){return e.data}))},h=function(e){return d.a.post(f,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(e){return d.a.put("".concat(f,"/").concat(e.id),e).then((function(e){return e.data}))},E=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t},"delete"))},w=function(e){var n=e.message,t=e.style;return null===n?null:r.a.createElement("div",{className:t},n)},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),m=Object(l.a)(c,2),d=m[0],f=m[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),N=O[0],g=O[1],y=Object(a.useState)(""),S=Object(l.a)(y,2),k=S[0],C=S[1],I=Object(a.useState)(null),T=Object(l.a)(I,2),P=T[0],D=T[1],J=Object(a.useState)("success"),L=Object(l.a)(J,2),x=L[0],B=L[1];Object(a.useEffect)((function(){b().then((function(e){return u(e)}))}),[]);var W=t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{style:x,message:P}),r.a.createElement(s,{search:k,handleSearch:function(e){return C(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(i,{addName:function(e){if(e.preventDefault(),!0===t.map((function(e){return e.name})).includes(d)){if(window.confirm("".concat(d," is already added to phonebook. Want to update number?"))){var n=t.find((function(e){return e.name===d})),a=Object(o.a)({},n,{number:N});v(a).then((function(e){u(t.map((function(n){return n.id===a.id?e:n})))})),B("success"),D("".concat(a.name," was successfully updated")),setTimeout((function(){D(null)}),5e3)}}else{var r={name:d,number:N};h(r).then((function(e){u(t.concat(e)),f(""),g(""),B("success"),D("".concat(r.name," was successfully added")),setTimeout((function(){return D(null)}),5e3)})).catch((function(e){B("error"),D(e.response.data.error),setTimeout((function(){return D(null)}),5e3)}))}},newName:d,handleNameInput:function(e){return f(e.target.value)},newNumber:N,handleNumberInput:function(e){return g(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),W.map((function(e){return r.a.createElement(E,{key:e.id,person:e,deletePerson:function(){return function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n,"?"))&&(p(e).catch((function(){B("error"),D("'".concat(n,"' was already removed from server")),setTimeout((function(){return D(null)}),5e3)})),u(t.filter((function(n){return n.id!==e}))))}(e.id)}})})))};t(37);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.a6f24118.chunk.js.map