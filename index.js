import{a as g,S as v,i as M}from"./assets/vendor-BDaiwwc1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();let u=15;const I="47396202-c5f2839f415e9ee9a67459191";g.defaults.baseURL="https://pixabay.com/api/";async function q(e,t){if(!e||e.trim()==="")throw new Error("Search query cannot be empty.");try{return(await g.get("",{params:{key:I,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:u}})).data}catch(n){throw console.error("Error fetching images:",n),n}}const O=new v(".gallery a",{captionsData:"alt",captionDelay:250});function h(e,t){t.innerHTML=D(e),O.refresh()}function D(e){return e.map(({webformatURL:t,largeImageURL:n,tags:i,likes:r,views:o,comments:a,downloads:L})=>`<li class = 'list-item'>
            <a class='gallery-link' href='${n}'>
                <img
                    class = 'gallery-image'
                    src = '${t}'
                    alt =  '${i}'>
                <ul class = 'description-list'>
                    <li class = 'description-item'>
                        <h3>Likes</h3>
                        <p>${r}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Views</h3>
                        <p>${o}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Comments</h3>
                        <p>${a}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Downloads</h3>
                        <p>${L}</p>
                    </li>
                </ul>
            </a>
        </li>`).join("")}const p=document.querySelector(".search-form"),y=document.querySelector('[name="search"]'),c=document.querySelector(".gallery"),s=document.querySelector(".load-more-images"),w="input-name-image",l={search:""};let f=1,E={totalHits:0};T();function T(){s.style.display="none";const e=JSON.parse(localStorage.getItem(w));e&&(y.value=e.search,l.search=e.search),p.addEventListener("input",$),p.addEventListener("submit",H),s.addEventListener("click",N)}function $(e){l.search=e.target.value.trim(),localStorage.setItem(w,JSON.stringify(l))}async function H(e){e.preventDefault(),P();const t=y.value.trim();if(!t)return m("info","The field must be filled");await b(t,1)}async function N(){f+=1,await b(l.search,f,!0)}async function b(e,t,n=!1){d(!0);try{const i=await q(e,t),{hits:r,totalHits:o}=i;if(!r.length)return m("warning","Sorry, no images match your query!");E.totalHits=o,n?B(r):h(r,c),r.length<u||t*u>=o?S():C()}catch(i){console.error(i),m("error","Something went wrong. Please try again later!")}finally{d(!1)}}function P(){c.innerHTML="",S(),d(!1),f=1}function B(e){h(e,c),x()}function d(e){const t=document.querySelector(".loader");e?t||c.insertAdjacentHTML("beforeend",'<div class="loader"></div>'):t&&t.remove()}function C(){s.style.display="block"}function S(){s.style.display="none"}function x(){const e=document.querySelector(".list-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function m(e,t){const n={success:"rgb(0, 255, 128, 0.7)",info:"rgb(76, 153, 255, 0.7)",warning:"rgb(255, 193, 7, 0.7)",error:"rgb(255, 76, 76, 0.7)"};M.show({message:t,messageColor:"white",position:"topRight",backgroundColor:n[e]})}
//# sourceMappingURL=index.js.map
