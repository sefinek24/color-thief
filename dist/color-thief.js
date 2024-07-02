if(!t)var t={map:function(t,r){var n={};return r?t.map(function(t,o){return n.index=o,r.call(n,t)}):t.slice()},naturalOrder:function(t,r){return t<r?-1:t>r?1:0},sum:function(t,r){var n={};return t.reduce(r?function(t,o,e){return n.index=e,t+r.call(n,o)}:function(t,r){return t+r},0)},max:function(r,n){return Math.max.apply(null,n?t.map(r,n):r)}};var r=function(){var r=5,n=8-r;function o(t,n,o){return(t<<2*r)+(n<<r)+o}function e(t){var r=[],n=!1;function o(){r.sort(t),n=!0}return{push:function(t){r.push(t),n=!1},peek:function(t){return n||o(),void 0===t&&(t=r.length-1),r[t]},pop:function(){return n||o(),r.pop()},size:function(){return r.length},map:function(t){return r.map(t)},debug:function(){return n||o(),r}}}function u(t,r,n,o,e,u,i){var a=this;a.r1=t,a.r2=r,a.g1=n,a.g2=o,a.b1=e,a.b2=u,a.histo=i}function i(){this.vboxes=new e(function(r,n){return t.naturalOrder(r.vbox.count()*r.vbox.volume(),n.vbox.count()*n.vbox.volume())})}function a(r,n){if(n.count()){var e=n.r2-n.r1+1,u=n.g2-n.g1+1,i=t.max([e,u,n.b2-n.b1+1]);if(1==n.count())return[n.copy()];var a,c,f,s,h=0,v=[],l=[];if(i==e)for(a=n.r1;a<=n.r2;a++){for(s=0,c=n.g1;c<=n.g2;c++)for(f=n.b1;f<=n.b2;f++)s+=r[o(a,c,f)]||0;v[a]=h+=s}else if(i==u)for(a=n.g1;a<=n.g2;a++){for(s=0,c=n.r1;c<=n.r2;c++)for(f=n.b1;f<=n.b2;f++)s+=r[o(c,a,f)]||0;v[a]=h+=s}else for(a=n.b1;a<=n.b2;a++){for(s=0,c=n.r1;c<=n.r2;c++)for(f=n.g1;f<=n.g2;f++)s+=r[o(c,f,a)]||0;v[a]=h+=s}return v.forEach(function(t,r){l[r]=h-t}),function(t){var r,o,e,u,i,c=t+"1",f=t+"2",s=0;for(a=n[c];a<=n[f];a++)if(v[a]>h/2){for(e=n.copy(),u=n.copy(),i=(r=a-n[c])<=(o=n[f]-a)?Math.min(n[f]-1,~~(a+o/2)):Math.max(n[c],~~(a-1-r/2));!v[i];)i++;for(s=l[i];!s&&v[i-1];)s=l[--i];return e[f]=i,u[c]=e[f]+1,[e,u]}}(i==e?"r":i==u?"g":"b")}}return u.prototype={volume:function(t){var r=this;return r._volume&&!t||(r._volume=(r.r2-r.r1+1)*(r.g2-r.g1+1)*(r.b2-r.b1+1)),r._volume},count:function(t){var r=this,n=r.histo;if(!r._count_set||t){var e,u,i,a=0;for(e=r.r1;e<=r.r2;e++)for(u=r.g1;u<=r.g2;u++)for(i=r.b1;i<=r.b2;i++)a+=n[o(e,u,i)]||0;r._count=a,r._count_set=!0}return r._count},copy:function(){var t=this;return new u(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(t){var n=this,e=n.histo;if(!n._avg||t){var u,i,a,c,f=0,s=1<<8-r,h=0,v=0,l=0;for(i=n.r1;i<=n.r2;i++)for(a=n.g1;a<=n.g2;a++)for(c=n.b1;c<=n.b2;c++)f+=u=e[o(i,a,c)]||0,h+=u*(i+.5)*s,v+=u*(a+.5)*s,l+=u*(c+.5)*s;n._avg=f?[~~(h/f),~~(v/f),~~(l/f)]:[~~(s*(n.r1+n.r2+1)/2),~~(s*(n.g1+n.g2+1)/2),~~(s*(n.b1+n.b2+1)/2)]}return n._avg},contains:function(t){var r=this,o=t[0]>>n;return gval=t[1]>>n,bval=t[2]>>n,o>=r.r1&&o<=r.r2&&gval>=r.g1&&gval<=r.g2&&bval>=r.b1&&bval<=r.b2}},i.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var r=this.vboxes,n=0;n<r.size();n++)if(r.peek(n).vbox.contains(t))return r.peek(n).color;return this.nearest(t)},nearest:function(t){for(var r,n,o,e=this.vboxes,u=0;u<e.size();u++)((n=Math.sqrt(Math.pow(t[0]-e.peek(u).color[0],2)+Math.pow(t[1]-e.peek(u).color[1],2)+Math.pow(t[2]-e.peek(u).color[2],2)))<r||void 0===r)&&(r=n,o=e.peek(u).color);return o},forcebw:function(){var r=this.vboxes;r.sort(function(r,n){return t.naturalOrder(t.sum(r.color),t.sum(n.color))});var n=r[0].color;n[0]<5&&n[1]<5&&n[2]<5&&(r[0].color=[0,0,0]);var o=r.length-1,e=r[o].color;e[0]>251&&e[1]>251&&e[2]>251&&(r[o].color=[255,255,255])}},{quantize:function(c,f){if(!c.length||f<2||f>256)return!1;var s=function(t){var e,u=new Array(1<<3*r);return t.forEach(function(t){e=o(t[0]>>n,t[1]>>n,t[2]>>n),u[e]=(u[e]||0)+1}),u}(c);s.forEach(function(){});var h=function(t,r){var o,e,i,a=1e6,c=0,f=1e6,s=0,h=1e6,v=0;return t.forEach(function(t){(o=t[0]>>n)<a?a=o:o>c&&(c=o),(e=t[1]>>n)<f?f=e:e>s&&(s=e),(i=t[2]>>n)<h?h=i:i>v&&(v=i)}),new u(a,c,f,s,h,v,r)}(c,s),v=new e(function(r,n){return t.naturalOrder(r.count(),n.count())});function l(t,r){for(var n,o=t.size(),e=0;e<1e3;){if(o>=r)return;if(e++>1e3)return;if((n=t.pop()).count()){var u=a(s,n),i=u[0],c=u[1];if(!i)return;t.push(i),c&&(t.push(c),o++)}else t.push(n),e++}}v.push(h),l(v,.75*f);for(var g=new e(function(r,n){return t.naturalOrder(r.count()*r.volume(),n.count()*n.volume())});v.size();)g.push(v.pop());l(g,f);for(var p=new i;g.size();)p.push(g.pop());return p}}}().quantize,n=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=t.naturalWidth,this.height=this.canvas.height=t.naturalHeight,this.context.drawImage(t,0,0,this.width,this.height)};n.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var o=function(){};o.prototype.getColor=function(t,r){return void 0===r&&(r=10),this.getPalette(t,5,r)[0]},o.prototype.getPalette=function(t,o,e){var u=function(t){var r=t.colorCount,n=t.quality;if(void 0!==r&&Number.isInteger(r)){if(1===r)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");r=Math.max(r,2),r=Math.min(r,20)}else r=10;return(void 0===n||!Number.isInteger(n)||n<1)&&(n=10),{colorCount:r,quality:n}}({colorCount:o,quality:e}),i=new n(t),a=function(t,r,n){for(var o,e,u,i,a,c=t,f=[],s=0;s<r;s+=n)a=c[i=4*s],u=c[i+1],e=c[i+2],(void 0===(o=c[i+3])||o>=125)&&(a>250&&u>250&&e>250||f.push([a,u,e]));return f}(i.getImageData().data,i.width*i.height,u.quality),c=r(a,u.colorCount);return c?c.palette():null},o.prototype.getColorFromUrl=function(t,r,n){var o=this,e=document.createElement("img");e.addEventListener("load",function(){var u=o.getPalette(e,5,n);r(u[0],t)}),e.src=t},o.prototype.getImageData=function(t,r){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="arraybuffer",n.onload=function(){if(200==this.status){var t=new Uint8Array(this.response);i=t.length;for(var n=new Array(i),o=0;o<t.length;o++)n[o]=String.fromCharCode(t[o]);var e=n.join(""),u=window.btoa(e);r("data:image/png;base64,"+u)}},n.send()},o.prototype.getColorAsync=function(t,r,n){var o=this;this.getImageData(t,function(t){var e=document.createElement("img");e.addEventListener("load",function(){var t=o.getPalette(e,5,n);r(t[0],this)}),e.src=t})},module.exports=o;
