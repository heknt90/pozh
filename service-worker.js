if(!self.define){let i,n={};const e=(e,c)=>(e=new URL(e+".js",c).href,n[e]||new Promise((n=>{if("document"in self){const i=document.createElement("script");i.src=e,i.onload=n,document.head.appendChild(i)}else i=e,importScripts(e),n()})).then((()=>{let i=n[e];if(!i)throw new Error(`Module ${e} didn’t register its module`);return i})));self.define=(c,a)=>{const o=i||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let d={};const f=i=>e(i,o),r={module:{uri:o},exports:d,require:f};n[o]=Promise.all(c.map((i=>r[i]||f(i)))).then((i=>(a(...i),d)))}}define(["./workbox-d7d409ae"],(function(i){"use strict";self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"browserconfig.xml",revision:"034c3bd464a91228ad2c4a9c1665c5dd"},{url:"favicons/android-icon-144x144.png",revision:"3ad9dfd40c95bd89125c5511ac7a663a"},{url:"favicons/android-icon-192x192.png",revision:"f0e368da4e28dcd13cf4be5aa351f4a0"},{url:"favicons/android-icon-36x36.png",revision:"dfc33d07449776e72c90b18bc4879278"},{url:"favicons/android-icon-48x48.png",revision:"d2ca66643f73e9df32b53c97e3ae5c34"},{url:"favicons/android-icon-72x72.png",revision:"2e70a2a76da77930ce68fb201c34dbd2"},{url:"favicons/android-icon-96x96.png",revision:"131ca264ea70d372fd980974ec482d06"},{url:"favicons/apple-icon-114x114.png",revision:"c405eb64b9f57730c74f85d4260d907d"},{url:"favicons/apple-icon-120x120.png",revision:"aae2cd14758294291c9a5902ff39fbf4"},{url:"favicons/apple-icon-144x144.png",revision:"3ad9dfd40c95bd89125c5511ac7a663a"},{url:"favicons/apple-icon-152x152.png",revision:"ec8280cd12ea5e1cc13b91b92749e287"},{url:"favicons/apple-icon-180x180.png",revision:"7b30015ebfa0e767461b1d5744418f0c"},{url:"favicons/apple-icon-57x57.png",revision:"803185bcf3ee8d1157448ae6a015ac26"},{url:"favicons/apple-icon-60x60.png",revision:"f887a15b383c635150d8af7fe44ffcd4"},{url:"favicons/apple-icon-72x72.png",revision:"2e70a2a76da77930ce68fb201c34dbd2"},{url:"favicons/apple-icon-76x76.png",revision:"3299c34b54239a479af61c34e142d231"},{url:"favicons/apple-icon-precomposed.png",revision:"856a08fbb0a5a6ee0572692883f9037b"},{url:"favicons/apple-icon.png",revision:"856a08fbb0a5a6ee0572692883f9037b"},{url:"favicons/favicon-16x16.png",revision:"bec3211c4323ec7ed0793fc898c60913"},{url:"favicons/favicon-32x32.png",revision:"931e4cb71b5ff0a67b4151fe4b4bd459"},{url:"favicons/favicon-512x512.png",revision:"a2108d02274842079e16d2b10dcd4e02"},{url:"favicons/favicon-96x96.png",revision:"131ca264ea70d372fd980974ec482d06"},{url:"favicons/favicon.ico",revision:"bb9dcad1d0ef72aaf53939a7cf526ff9"},{url:"favicons/ms-icon-144x144.png",revision:"3ad9dfd40c95bd89125c5511ac7a663a"},{url:"favicons/ms-icon-150x150.png",revision:"d9f5f5e3f311a2876ada77122dcc1fd1"},{url:"favicons/ms-icon-310x310.png",revision:"de0ead4e12167457d27785386b344382"},{url:"favicons/ms-icon-70x70.png",revision:"f94ad4da519e1ffe9ed731a893189a41"},{url:"images/background-1000.jpg",revision:"924de00e3b770d31869bb5c75dd9a122"},{url:"images/background-2000.jpg",revision:"568911cc30c1ef862ff448b81ffb13d7"},{url:"images/background.jpg",revision:"e159162f00c88454546202252f98adc3"},{url:"index.js",revision:"15a84271581a3e7849711bdaf57273d0"},{url:"manifest.json",revision:"d4620b10ef4c23d2cfc6f31fa5d9aef6"}],{}),i.registerRoute(/index\.html/,new i.NetworkFirst,"GET"),i.registerRoute(/\.(js|png|jpg)/,new i.StaleWhileRevalidate,"GET")}));
