import{a as p,S as v,i as M}from"./assets/vendor-BDaiwwc1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();let f=15;const I="47396202-c5f2839f415e9ee9a67459191";p.defaults.baseURL="https://pixabay.com/api/";async function q(e,t){if(!e||e.trim()==="")throw new Error("Search query cannot be empty.");try{return(await p.get("",{params:{key:I,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:f}})).data}catch(a){throw console.error("Error fetching images:",a),a}}const E=new v(".gallery a",{captionsData:"alt",captionDelay:250});function h(e,t){t.insertAdjacentHTML("beforeend",O(e)),E.refresh()}function O(e){return e.map(({webformatURL:t,largeImageURL:a,tags:i,likes:r,views:o,comments:n,downloads:L})=>`<li class = 'list-item'>
            <a class='gallery-link' href='${a}'>
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
                        <p>${n}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Downloads</h3>
                        <p>${L}</p>
                    </li>
                </ul>
            </a>
        </li>`).join("")}const g=document.querySelector(".search-form"),y=document.querySelector('[name="search"]'),u=document.querySelector(".gallery"),s=document.querySelector(".load-more-images"),w="input-name-image",l={search:""};let d=1,D={totalHits:0};P();function P(){s.style.display="none";const e=JSON.parse(localStorage.getItem(w));e&&(y.value=e.search,l.search=e.search),g.addEventListener("input",T),g.addEventListener("submit",$),s.addEventListener("click",H)}function T(e){l.search=e.target.value.trim(),localStorage.setItem(w,JSON.stringify(l))}async function $(e){e.preventDefault(),N();const t=y.value.trim();if(!t)return c("info","The field must be filled");await b(t,1)}async function H(){d+=1;try{await b(l.search,d,!0)}catch(e){console.error("Error loading more images:",e),c("error","Failed to load more images. Please try again later!")}}async function b(e,t,a=!1){m(!0);try{const i=await q(e,t),{hits:r,totalHits:o}=i;if(!r.length)return c("warning","Sorry, no images match your query!");D.totalHits=o,a?B(r):h(r,u),r.length<f||t*f>=o?S():C()}catch(i){console.error(i),c("error","Something went wrong. Please try again later!")}finally{m(!1)}}function N(){u.innerHTML="",S(),m(!1),d=1}function B(e){h(e,u),x()}function m(e){const t=document.querySelector(".loader");e?t||u.insertAdjacentHTML("beforeend",'<div class="loader"></div>'):t&&t.remove()}function C(){s.style.display="block"}function S(){s.style.display="none"}function x(){const e=document.querySelector(".list-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function c(e,t){const a={success:"rgb(0, 255, 128, 0.7)",info:"rgb(76, 153, 255, 0.7)",warning:"rgb(255, 193, 7, 0.7)",error:"rgb(255, 76, 76, 0.7)"};M.show({message:t,messageColor:"white",position:"topRight",backgroundColor:a[e]})}
//# sourceMappingURL=index.js.map
