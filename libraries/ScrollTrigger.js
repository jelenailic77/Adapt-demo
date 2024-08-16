import{Observer as Observer,_getTarget as _getTarget,_vertical as _vertical,_horizontal as _horizontal,_scrollers as _scrollers,_proxies as _proxies,_getScrollFunc as _getScrollFunc,_getProxyProp as _getProxyProp,_getVelocityProp as _getVelocityProp}from"./Observer.js";var gsap,_coreInitted,_win,_doc,_docEl,_body,_root,_resizeDelay,_toArray,_clamp,_time2,_syncInterval,_refreshing,_pointerIsDown,_transformProp,_i,_prevWidth,_prevHeight,_autoRefresh,_sort,_suppressOverwrites,_ignoreResize,_normalizer,_ignoreMobileResize,_baseScreenHeight,_baseScreenWidth,_limitCallbacks,_rafID,_creatingMedia,_lastMediaTick,_refreshingAll,_primary,_startup=1,_getTime=Date.now,_time1=_getTime(),_lastScrollTime=0,_enabled=0,_pointerDownHandler=function(){return _pointerIsDown=1},_pointerUpHandler=function(){return _pointerIsDown=0},_passThrough=function(e){return e},_round=function(e){return Math.round(1e5*e)/1e5||0},_windowExists=function(){return"undefined"!=typeof window},_getGSAP=function(){return gsap||_windowExists()&&(gsap=window.gsap)&&gsap.registerPlugin&&gsap},_isViewport=function(e){return!!~_root.indexOf(e)},_getBoundsFunc=function(e){return _getProxyProp(e,"getBoundingClientRect")||(_isViewport(e)?function(){return _winOffsets.width=_win.innerWidth,_winOffsets.height=_win.innerHeight,_winOffsets}:function(){return _getBounds(e)})},_getSizeFunc=function(e,r,t){var n=t.d,i=t.d2,o=t.a;return(o=_getProxyProp(e,"getBoundingClientRect"))?function(){return o()[n]}:function(){return(r?_win["inner"+i]:e["client"+i])||0}},_getOffsetsFunc=function(e,r){return!r||~_proxies.indexOf(e)?_getBoundsFunc(e):function(){return _winOffsets}},_maxScroll=function(e,r){var t=r.s,n=r.d2,i=r.d,r=r.a;return(t="scroll"+n)&&(r=_getProxyProp(e,t))?r()-_getBoundsFunc(e)()[i]:_isViewport(e)?(_docEl[t]||_body[t])-(_win["inner"+n]||_docEl["client"+n]||_body["client"+n]):e[t]-e["offset"+n]},_iterateAutoRefresh=function(e,r){for(var t=0;t<_autoRefresh.length;t+=3)r&&!~r.indexOf(_autoRefresh[t+1])||e(_autoRefresh[t],_autoRefresh[t+1],_autoRefresh[t+2])},_isString=function(e){return"string"==typeof e},_isFunction=function(e){return"function"==typeof e},_isNumber=function(e){return"number"==typeof e},_isObject=function(e){return"object"==typeof e},_callIfFunc=function(e){return _isFunction(e)&&e()},_combineFunc=function(t,n){return function(){var e=_callIfFunc(t),r=_callIfFunc(n);return function(){_callIfFunc(e),_callIfFunc(r)}}},_endAnimation=function(e,r,t){return e&&e.progress(r?0:1)&&t&&e.pause()},_callback=function(e,r){!e.enabled||(r=r(e))&&r.totalTime&&(e.callbackAnimation=r)},_abs=Math.abs,_scrollLeft="scrollLeft",_scrollTop="scrollTop",_left="left",_top="top",_right="right",_bottom="bottom",_width="width",_height="height",_Right="Right",_Left="Left",_Top="Top",_Bottom="Bottom",_padding="padding",_margin="margin",_Width="Width",_Height="Height",_px="px",_getComputedStyle=function(e){return _win.getComputedStyle(e)},_makePositionable=function(e){var r=_getComputedStyle(e).position;e.style.position="absolute"===r||"fixed"===r?r:"relative"},_setDefaults=function(e,r){for(var t in r)t in e||(e[t]=r[t]);return e},_getBounds=function(e,r){r=r&&"matrix(1, 0, 0, 1, 0, 0)"!==_getComputedStyle(e)[_transformProp]&&gsap.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),e=e.getBoundingClientRect();return r&&r.progress(0).kill(),e},_getSize=function(e,r){r=r.d2;return e["offset"+r]||e["client"+r]||0},_getLabelRatioArray=function(e){var r,t=[],n=e.labels,i=e.duration();for(r in n)t.push(n[r]/i);return t},_getClosestLabel=function(r){return function(e){return gsap.utils.snap(_getLabelRatioArray(r),e)}},_snapDirectional=function(i){var o=gsap.utils.snap(i),s=Array.isArray(i)&&i.slice(0).sort(function(e,r){return e-r});return s?function(e,r,t){var n;if(void 0===t&&(t=.001),!r)return o(e);if(0<r){for(e-=t,n=0;n<s.length;n++)if(s[n]>=e)return s[n];return s[n-1]}for(n=s.length,e+=t;n--;)if(s[n]<=e)return s[n];return s[0]}:function(e,r,t){void 0===t&&(t=.001);var n=o(e);return!r||Math.abs(n-e)<t||n-e<0==r<0?n:o(r<0?e-i:e+i)}},_getLabelAtDirection=function(t){return function(e,r){return _snapDirectional(_getLabelRatioArray(t))(e,r.direction)}},_multiListener=function(r,t,e,n){return e.split(",").forEach(function(e){return r(t,e,n)})},_addListener=function(e,r,t,n,i){return e.addEventListener(r,t,{passive:!n,capture:!!i})},_removeListener=function(e,r,t){return e.removeEventListener(r,t)},_wheelListener=function(e,r,t){return t&&t.wheelHandler&&e(r,"wheel",t)},_markerDefaults={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},_defaults={toggleActions:"play",anticipatePin:0},_keywords={top:0,left:0,center:.5,bottom:1,right:1},_offsetToPx=function(e,r){var t,n;return _isString(e)&&(n=~(t=e.indexOf("="))?+(e.charAt(t-1)+1)*parseFloat(e.substr(t+1)):0,~t&&(e.indexOf("%")>t&&(n*=r/100),e=e.substr(0,t-1)),e=n+(e in _keywords?_keywords[e]*r:~e.indexOf("%")?parseFloat(e)*r/100:parseFloat(e)||0)),e},_createMarker=function(e,r,t,n,i,o,s,a){var l=i.startColor,_=i.endColor,c=i.fontSize,d=i.indent,g=i.fontWeight,u=_doc.createElement("div"),p=_isViewport(t)||"fixed"===_getProxyProp(t,"pinType"),f=-1!==e.indexOf("scroller"),i=p?_body:t,t=-1!==e.indexOf("start"),_=t?l:_,g="border-color:"+_+";font-size:"+c+";color:"+_+";font-weight:"+g+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return g+="position:"+((f||a)&&p?"fixed;":"absolute;"),!f&&!a&&p||(g+=(n===_vertical?_right:_bottom)+":"+(o+parseFloat(d))+"px;"),s&&(g+="box-sizing:border-box;text-align:left;width:"+s.offsetWidth+"px;"),u._isStart=t,u.setAttribute("class","gsap-marker-"+e+(r?" marker-"+r:"")),u.style.cssText=g,u.innerText=r||0===r?e+"-"+r:e,i.children[0]?i.insertBefore(u,i.children[0]):i.appendChild(u),u._offset=u["offset"+n.op.d2],_positionMarker(u,0,n,t),u},_positionMarker=function(e,r,t,n){var i={display:"block"},o=t[n?"os2":"p2"],s=t[n?"p2":"os2"];e._isFlipped=n,i[t.a+"Percent"]=n?-100:0,i[t.a]=n?"1px":0,i["border"+o+_Width]=1,i["border"+s+_Width]=0,i[t.p]=r+"px",gsap.set(e,i)},_triggers=[],_ids={},_sync=function(){return 34<_getTime()-_lastScrollTime&&_updateAll()},_onScroll=function(){_normalizer&&_normalizer.isPressed||(_scrollers.cache++,_rafID=_rafID||requestAnimationFrame(_updateAll),_lastScrollTime||_dispatch("scrollStart"),_lastScrollTime=_getTime())},_setBaseDimensions=function(){_baseScreenWidth=_win.innerWidth,_baseScreenHeight=_win.innerHeight},_onResize=function(){_scrollers.cache++,_refreshing||_ignoreResize||_doc.fullscreenElement||_ignoreMobileResize&&_baseScreenWidth===_win.innerWidth&&!(Math.abs(_win.innerHeight-_baseScreenHeight)>.25*_win.innerHeight)||_resizeDelay.restart(!0)},_listeners={},_emptyArray=[],_media=[],_onMediaChange=function(e){var r,t=gsap.ticker.frame,n=[],i=0;if(_lastMediaTick!==t||_startup){for(_revertAll();i<_media.length;i+=4)(r=_win.matchMedia(_media[i]).matches)!==_media[i+3]&&((_media[i+3]=r)?n.push(i):_revertAll(1,_media[i])||_isFunction(_media[i+2])&&_media[i+2]());for(_revertRecorded(),i=0;i<n.length;i++)r=n[i],_creatingMedia=_media[r],_media[r+2]=_media[r+1](e);_creatingMedia=0,_coreInitted&&_refreshAll(0,1),_lastMediaTick=t,_dispatch("matchMedia")}},_softRefresh=function e(){return _removeListener(ScrollTrigger,"scrollEnd",e)||_refreshAll(!0)},_dispatch=function(e){return _listeners[e]&&_listeners[e].map(function(e){return e()})||_emptyArray},_savedStyles=[],_revertRecorded=function(e){for(var r=0;r<_savedStyles.length;r+=5)e&&_savedStyles[r+4]!==e||(_savedStyles[r].style.cssText=_savedStyles[r+1],_savedStyles[r].getBBox&&_savedStyles[r].setAttribute("transform",_savedStyles[r+2]||""),_savedStyles[r+3].uncache=1)},_revertAll=function(e,r){var t;for(_i=0;_i<_triggers.length;_i++)t=_triggers[_i],r&&t.media!==r||(e?t.kill(1):t.revert());r&&_revertRecorded(r),r||_dispatch("revert")},_clearScrollMemory=function(){return _scrollers.cache++&&_scrollers.forEach(function(e){return"function"==typeof e&&(e.rec=0)})},_refreshID=0,_refreshAll=function(e,r){!_lastScrollTime||e?(_refreshingAll=!0,e=_dispatch("refreshInit"),_sort&&ScrollTrigger.sort(),r||_revertAll(),_triggers.slice(0).forEach(function(e){return e.refresh()}),_triggers.forEach(function(e){return"max"===e.vars.end&&e.setPositions(e.start,_maxScroll(e.scroller,e._dir))}),e.forEach(function(e){return e&&e.render&&e.render(-1)}),_clearScrollMemory(),_resizeDelay.pause(),_refreshID++,_refreshingAll=!1,_dispatch("refresh")):_addListener(ScrollTrigger,"scrollEnd",_softRefresh)},_lastScroll=0,_direction=1,_updateAll=function(){if(!_refreshingAll){_primary&&_primary.update(0),ScrollTrigger.isUpdating=!0;var e=_triggers.length,r=_getTime(),t=50<=r-_time1,n=e&&_triggers[0].scroll();if(_direction=n<_lastScroll?-1:1,_lastScroll=n,t&&(_lastScrollTime&&!_pointerIsDown&&200<r-_lastScrollTime&&(_lastScrollTime=0,_dispatch("scrollEnd")),_time2=_time1,_time1=r),_direction<0){for(_i=e;0<_i--;)_triggers[_i]&&_triggers[_i].update(0,t);_direction=1}else for(_i=0;_i<e;_i++)_triggers[_i]&&_triggers[_i].update(0,t);ScrollTrigger.isUpdating=!1}_rafID=0},_propNamesToCopy=[_left,_top,_bottom,_right,_margin+_Bottom,_margin+_Right,_margin+_Top,_margin+_Left,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],_stateProps=_propNamesToCopy.concat([_width,_height,"boxSizing","max"+_Width,"max"+_Height,"position",_margin,_padding,_padding+_Top,_padding+_Right,_padding+_Bottom,_padding+_Left]),_swapPinOut=function(e,r,t){_setState(t);t=e._gsap;t.spacerIsNative?_setState(t.spacerState):e.parentNode!==r||(t=r.parentNode)&&(t.insertBefore(e,r),t.removeChild(r))},_swapPinIn=function(e,r,t,n){if(e.parentNode!==r){for(var i,o=_propNamesToCopy.length,s=r.style,a=e.style;o--;)s[i=_propNamesToCopy[o]]=t[i];s.position="absolute"===t.position?"absolute":"relative","inline"===t.display&&(s.display="inline-block"),a[_bottom]=a[_right]=s.flexBasis="auto",s.overflow="visible",s.boxSizing="border-box",s[_width]=_getSize(e,_horizontal)+_px,s[_height]=_getSize(e,_vertical)+_px,s[_padding]=a[_margin]=a[_top]=a[_left]="0",_setState(n),a[_width]=a["max"+_Width]=t[_width],a[_height]=a["max"+_Height]=t[_height],a[_padding]=t[_padding],e.parentNode.insertBefore(r,e),r.appendChild(e)}},_capsExp=/([A-Z])/g,_setState=function(e){if(e){var r,t,n=e.t.style,i=e.length,o=0;for((e.t._gsap||gsap.core.getCache(e.t)).uncache=1;o<i;o+=2)t=e[o+1],r=e[o],t?n[r]=t:n[r]&&n.removeProperty(r.replace(_capsExp,"-$1").toLowerCase())}},_getState=function(e){for(var r=_stateProps.length,t=e.style,n=[],i=0;i<r;i++)n.push(_stateProps[i],t[_stateProps[i]]);return n.t=e,n},_copyState=function(e,r,t){for(var n,i=[],o=e.length,s=t?8:0;s<o;s+=2)n=e[s],i.push(n,n in r?r[n]:e[s+1]);return i.t=e.t,i},_winOffsets={left:0,top:0},_parsePosition=function(e,r,t,n,i,o,s,a,l,_,c,d,g){_isFunction(e)&&(e=e(a)),_isString(e)&&"max"===e.substr(0,3)&&(e=d+("="===e.charAt(4)?_offsetToPx("0"+e.substr(3),t):0));var u,p,f,h,m=g?g.time():0;return g&&g.seek(0),_isNumber(e)?s&&_positionMarker(s,t,n,!0):(_isFunction(r)&&(r=r(a)),f=e.split(" "),p=_getTarget(r)||_body,(r=_getBounds(p)||{})&&(r.left||r.top)||"none"!==_getComputedStyle(p).display||(u=p.style.display,p.style.display="block",r=_getBounds(p),u?p.style.display=u:p.style.removeProperty("display")),u=_offsetToPx(f[0],r[n.d]),f=_offsetToPx(f[1]||"0",t),e=r[n.p]-l[n.p]-_+u+i-f,s&&_positionMarker(s,f,n,t-f<20||s._isStart&&20<f),t-=t-f),o&&(f=o._isStart,h="scroll"+n.d2,_positionMarker(o,t=e+t,n,f&&20<t||!f&&(c?Math.max(_body[h],_docEl[h]):o.parentNode[h])<=t+1),c&&(l=_getBounds(s),c&&(o.style[n.op.p]=l[n.op.p]-n.op.m-o._offset+_px))),g&&p&&(h=_getBounds(p),g.seek(d),p=_getBounds(p),g._caScrollDist=h[n.p]-p[n.p],e=e/g._caScrollDist*d),g&&g.seek(m),g?e:Math.round(e)},_prefixExp=/(webkit|moz|length|cssText|inset)/i,_reparent=function(e,r,t,n){if(e.parentNode!==r){var i,o,s=e.style;if(r===_body){for(i in e._stOrig=s.cssText,o=_getComputedStyle(e))+i||_prefixExp.test(i)||!o[i]||"string"!=typeof s[i]||"0"===i||(s[i]=o[i]);s.top=t,s.left=n}else s.cssText=e._stOrig;gsap.core.getCache(e).uncache=1,r.appendChild(e)}},_getTweenCreator=function(l,e){function _(e,r,t,n,i){var o=_.tween,s=r.onComplete,a={};return t=t||g(),i=n&&i||0,n=n||e-t,o&&o.kill(),c=Math.round(t),r[u]=e,(r.modifiers=a)[u]=function(e){return(e=_round(g()))!==c&&e!==d&&2<Math.abs(e-c)&&2<Math.abs(e-d)?(o.kill(),_.tween=0):e=t+n*o.ratio+i*o.ratio*o.ratio,d=c,c=_round(e)},r.onComplete=function(){_.tween=0,s&&s.call(o)},o=_.tween=gsap.to(l,r)}var c,d,g=_getScrollFunc(l,e),u="_scroll"+e.p2;return(l[u]=g).wheelHandler=function(){return _.tween&&_.tween.kill()&&(_.tween=0)},_addListener(l,"wheel",g.wheelHandler),_},ScrollTrigger=function(){function xe(e,r){_coreInitted||xe.register(gsap)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),this.init(e,r)}return xe.prototype.init=function(m,v){var g,u,n,p,S,f,y,b,w,T,h,r,x,P,A,k,L,C,z,M,O,R,I,E,D,F,B,N,H,W,V,U,Y,j,G,i,X,q,K,Z,$,J,Q,ee,re,te,ne,ie,oe,se,ae,le,_e,ce,de,ge,ue,t,pe,fe,he,me,ve,Se,e,o,ye,be,s,a,we,Te,l,_;this.progress=this.start=0,this.vars&&this.kill(!0,!0),_enabled?(g=(m=_setDefaults(_isString(m)||_isNumber(m)||m.nodeType?{trigger:m}:m,_defaults)).onUpdate,u=m.toggleClass,n=m.id,p=m.onToggle,S=m.onRefresh,f=m.scrub,y=m.trigger,b=m.pin,w=m.pinSpacing,T=m.invalidateOnRefresh,h=m.anticipatePin,r=m.onScrubComplete,x=m.onSnapComplete,P=m.once,A=m.snap,k=m.pinReparent,o=m.pinSpacer,L=m.containerAnimation,C=m.fastScrollEnd,z=m.preventOverlaps,M=m.horizontal||m.containerAnimation&&!1!==m.horizontal?_horizontal:_vertical,O=!f&&0!==f,R=_getTarget(m.scroller||_win),e=gsap.core.getCache(R),I=_isViewport(R),E="fixed"===("pinType"in m?m.pinType:_getProxyProp(R,"pinType")||I&&"fixed"),D=[m.onEnter,m.onLeave,m.onEnterBack,m.onLeaveBack],F=O&&m.toggleActions.split(" "),a=("markers"in m?m:_defaults).markers,B=!I&&parseFloat(_getComputedStyle(R)["border"+M.p2+_Width])||0,N=this,H=m.onRefreshInit&&function(){return m.onRefreshInit(N)},W=_getSizeFunc(R,I,M),V=_getOffsetsFunc(R,I),Y=U=0,j=_getScrollFunc(R,M),N.media=_creatingMedia,N._dir=M,h*=45,N.scroller=R,N.scroll=L?L.time.bind(L):j,q=j(),N.vars=m,v=v||m.animation,"refreshPriority"in m&&(_sort=1,-9999===m.refreshPriority&&(_primary=N)),e.tweenScroll=e.tweenScroll||{top:_getTweenCreator(R,_vertical),left:_getTweenCreator(R,_horizontal)},N.tweenTo=G=e.tweenScroll[M.p],N.scrubDuration=function(e){(t=_isNumber(e)&&e)?ue?ue.duration(e):ue=gsap.to(v,{ease:"expo",totalProgress:"+=0.001",duration:t,paused:!0,onComplete:function(){return r&&r(N)}}):(ue&&ue.progress(1).kill(),ue=0)},v&&(v.vars.lazy=!1,v._initted||!1!==v.vars.immediateRender&&!1!==m.immediateRender&&v.render(0,!0,!0),N.animation=v.pause(),(v.scrollTrigger=N).scrubDuration(f),de=0,n=n||v.vars.id),_triggers.push(N),A&&(_isObject(A)&&!A.push||(A={snapTo:A}),"scrollBehavior"in _body.style&&gsap.set(I?[_body,_docEl]:R,{scrollBehavior:"auto"}),X=_isFunction(A.snapTo)?A.snapTo:"labels"===A.snapTo?_getClosestLabel(v):"labelsDirectional"===A.snapTo?_getLabelAtDirection(v):!1!==A.directional?function(e,r){return _snapDirectional(A.snapTo)(e,_getTime()-Y<500?0:r.direction)}:gsap.utils.snap(A.snapTo),pe=A.duration||{min:.1,max:2},pe=_isObject(pe)?_clamp(pe.min,pe.max):_clamp(pe,pe),fe=gsap.delayedCall(A.delay||t/2||.1,function(){var e,r,t,n,i,o,s,a,l,_=j(),c=_getTime()-Y<500,d=G.tween;!(c||Math.abs(N.getVelocity())<10)||d||_pointerIsDown||U===_?N.isActive&&U!==_&&fe.restart(!0):(e=(_-Z)/J,r=v&&!O?v.totalProgress():e,t=!c&&(r-ge)/(_getTime()-_time2)*1e3||0,n=gsap.utils.clamp(-e,1-e,_abs(t/2)*t/.185),i=e+(!1===A.inertia?0:n),o=_clamp(0,1,X(i,N)),s=Math.round(Z+o*J),c=A.onStart,a=A.onInterrupt,l=A.onComplete,_<=$&&Z<=_&&s!==_&&(d&&!d._initted&&d.data<=_abs(s-_)||(!1===A.inertia&&(n=o-e),G(s,{duration:pe(_abs(.185*Math.max(_abs(i-r),_abs(o-r))/t/.05||0)),ease:A.ease||"power3",data:_abs(s-_),onInterrupt:function(){return fe.restart(!0)&&a&&a(N)},onComplete:function(){N.update(),U=j(),de=ge=v&&!O?v.totalProgress():N.progress,x&&x(N),l&&l(N)}},_,n*J,s-_-n*J),c&&c(N,G.tween))))}).pause()),n&&(_ids[n]=N),e=(e=(y=N.trigger=_getTarget(y||b))&&y._gsap&&y._gsap.stRevert)&&e(N),b=!0===b?y:_getTarget(b),_isString(u)&&(u={targets:y,className:u}),b&&(!1===w||w===_margin||(w=!(!w&&"flex"===_getComputedStyle(b.parentNode).display)&&_padding),N.pin=b,!1!==m.force3D&&gsap.set(b,{force3D:!0}),(i=gsap.core.getCache(b)).spacer?Q=i.pinState:(o&&((o=_getTarget(o))&&!o.nodeType&&(o=o.current||o.nativeElement),i.spacerIsNative=!!o,o&&(i.spacerState=_getState(o))),i.spacer=te=o||_doc.createElement("div"),te.classList.add("pin-spacer"),n&&te.classList.add("pin-spacer-"+n),i.pinState=Q=_getState(b)),N.spacer=te=i.spacer,s=_getComputedStyle(b),ae=s[w+M.os2],ne=gsap.getProperty(b),ie=gsap.quickSetter(b,M.a,_px),_swapPinIn(b,te,s),re=_getState(b)),a&&(o=_isObject(a)?_setDefaults(a,_markerDefaults):_markerDefaults,ye=_createMarker("scroller-start",n,R,M,o,0),be=_createMarker("scroller-end",n,R,M,o,0,ye),s=ye["offset"+M.op.d2],a=_getTarget(_getProxyProp(R,"content")||R),we=this.markerStart=_createMarker("start",n,a,M,o,s,0,L),Te=this.markerEnd=_createMarker("end",n,a,M,o,s,0,L),L&&(Se=gsap.quickSetter([we,Te],M.a,_px)),E||_proxies.length&&!0===_getProxyProp(R,"fixedMarkers")||(_makePositionable(I?_body:R),gsap.set([ye,be],{force3D:!0}),_e=gsap.quickSetter(ye,M.a,_px),ce=gsap.quickSetter(be,M.a,_px))),L&&(l=L.vars.onUpdate,_=L.vars.onUpdateParams,L.eventCallback("onUpdate",function(){N.update(0,0,1),l&&l.apply(_||[])})),N.previous=function(){return _triggers[_triggers.indexOf(N)-1]},N.next=function(){return _triggers[_triggers.indexOf(N)+1]},N.revert=function(e){var r=!1!==e||!N.enabled,e=_refreshing;r!==N.isReverted&&(r&&(!N.scroll.rec&&_refreshing&&_refreshingAll&&(N.scroll.rec=j()),me=Math.max(j(),N.scroll.rec||0),he=N.progress,ve=v&&v.progress()),we&&[we,Te,ye,be].forEach(function(e){return e.style.display=r?"none":"block"}),r&&(_refreshing=1),N.update(r),_refreshing=e,b&&(r?_swapPinOut(b,te,Q):k&&N.isActive||_swapPinIn(b,te,_getComputedStyle(b),le)),N.isReverted=r)},N.refresh=function(e,r){if(!_refreshing&&N.enabled||r)if(b&&e&&_lastScrollTime)_addListener(xe,"scrollEnd",_softRefresh);else{!_refreshingAll&&H&&H(N),_refreshing=1,Y=_getTime(),G.tween&&(G.tween.kill(),G.tween=0),ue&&ue.pause(),T&&v&&v.time(-.01,!0).invalidate(),N.isReverted||N.revert();for(var t,n,i,o,s,a,l=W(),_=V(),c=L?L.duration():_maxScroll(R,M),d=0,g=0,r=m.end,e=m.endTrigger||y,u=m.start||(0!==m.start&&y?b?"0 0":"0 100%":0),p=N.pinnedContainer=m.pinnedContainer&&_getTarget(m.pinnedContainer),f=y&&Math.max(0,_triggers.indexOf(N))||0,h=f;h--;)(i=_triggers[h]).end||i.refresh(0,1)||(_refreshing=1),!(o=i.pin)||o!==y&&o!==b||i.isReverted||((a=a||[]).unshift(i),i.revert()),i!==_triggers[h]&&(f--,h--);for(_isFunction(u)&&(u=u(N)),Z=_parsePosition(u,y,l,M,j(),we,ye,N,_,B,E,c,L)||(b?-.001:0),_isFunction(r)&&(r=r(N)),_isString(r)&&!r.indexOf("+=")&&(~r.indexOf(" ")?r=(_isString(u)?u.split(" ")[0]:"")+r:(d=_offsetToPx(r.substr(2),l),r=_isString(u)?u:Z+d,e=y)),$=Math.max(Z,_parsePosition(r||(e?"100% 0":c),e,l,M,j()+d,Te,be,N,_,B,E,c,L))||-.001,J=$-Z||(Z-=.01)&&.001,d=0,h=f;h--;)(o=(i=_triggers[h]).pin)&&i.start-i._pinPush<Z&&!L&&0<i.end&&(t=i.end-i.start,o!==y&&o!==p||_isNumber(u)||(d+=t*(1-i.progress)),o===b&&(g+=t));if(Z+=d,$+=d,N._pinPush=g,we&&d&&((t={})[M.a]="+="+d,p&&(t[M.p]="-="+j()),gsap.set([we,Te],t)),b)t=_getComputedStyle(b),l=M===_vertical,_=j(),oe=parseFloat(ne(M.a))+g,!c&&1<$&&((I?_body:R).style["overflow-"+M.a]="scroll"),_swapPinIn(b,te,t),re=_getState(b),n=_getBounds(b,!0),c=E&&_getScrollFunc(R,l?_horizontal:_vertical)(),w&&((le=[w+M.os2,J+g+_px]).t=te,(h=w===_padding?_getSize(b,M)+J+g:0)&&le.push(M.d,h+_px),_setState(le),E&&j(me)),E&&((s={top:n.top+(l?_-Z:c)+_px,left:n.left+(l?c:_-Z)+_px,boxSizing:"border-box",position:"fixed"})[_width]=s["max"+_Width]=Math.ceil(n.width)+_px,s[_height]=s["max"+_Height]=Math.ceil(n.height)+_px,s[_margin]=s[_margin+_Top]=s[_margin+_Right]=s[_margin+_Bottom]=s[_margin+_Left]="0",s[_padding]=t[_padding],s[_padding+_Top]=t[_padding+_Top],s[_padding+_Right]=t[_padding+_Right],s[_padding+_Bottom]=t[_padding+_Bottom],s[_padding+_Left]=t[_padding+_Left],ee=_copyState(Q,s,k)),v?(s=v._initted,_suppressOverwrites(1),v.render(v.duration(),!0,!0),se=ne(M.a)-oe+J+g,J!==se&&ee.splice(ee.length-2,2),v.render(0,!0,!0),s||v.invalidate(),_suppressOverwrites(0)):se=J;else if(y&&j()&&!L)for(n=y.parentNode;n&&n!==_body;)n._pinOffset&&(Z-=n._pinOffset,$-=n._pinOffset),n=n.parentNode;a&&a.forEach(function(e){return e.revert(!1)}),N.start=Z,N.end=$,q=K=j(),L||(q<me&&j(me),N.scroll.rec=0),N.revert(!1),fe&&(U=-1,N.isActive&&j(Z+J*he),fe.restart(!0)),_refreshing=0,v&&O&&(v._initted||ve)&&v.progress()!==ve&&v.progress(ve,!0).render(v.time(),!0,!0),he===N.progress&&!L||(v&&!O&&v.totalProgress(he,!0),N.progress=he,N.update(0,0,1)),b&&w&&(te._pinOffset=Math.round(N.progress*se)),S&&S(N)}},N.getVelocity=function(){return(j()-K)/(_getTime()-_time2)*1e3||0},N.endAnimation=function(){_endAnimation(N.callbackAnimation),v&&(ue?ue.progress(1):v.paused()?O||_endAnimation(v,N.direction<0,1):_endAnimation(v,v.reversed()))},N.labelToScroll=function(e){return v&&v.labels&&(Z||N.refresh()||Z)+v.labels[e]/v.duration()*J||0},N.getTrailing=function(r){var e=_triggers.indexOf(N),e=0<N.direction?_triggers.slice(0,e).reverse():_triggers.slice(e+1);return(_isString(r)?e.filter(function(e){return e.vars.preventOverlaps===r}):e).filter(function(e){return 0<N.direction?e.end<=Z:e.start>=$})},N.update=function(e,r,t){var n,i,o,s,a,l,_,c,d;L&&!t&&!e||(n=N.scroll(),d=(l=e?0:(n-Z)/J)<0?0:1<l?1:l||0,a=N.progress,r&&(K=q,q=L?j():n,A&&(ge=de,de=v&&!O?v.totalProgress():d)),(d=h&&!d&&b&&!_refreshing&&!_startup&&_lastScrollTime&&Z<n+(n-K)/(_getTime()-_time2)*h?1e-4:d)!==a&&N.enabled&&(t=(c=(_=N.isActive=!!d&&d<1)!=(!!a&&a<1))||!!d!=!!a,N.direction=a<d?1:-1,N.progress=d,t&&!_refreshing&&(i=d&&!a?0:1===d?1:1===a?2:3,O&&(o=!c&&"none"!==F[i+1]&&F[i+1]||F[i],s=v&&("complete"===o||"reset"===o||o in v))),z&&(c||s)&&(s||f||!v)&&(_isFunction(z)?z(N):N.getTrailing(z).forEach(function(e){return e.endAnimation()})),O||(!ue||_refreshing||_startup?v&&v.totalProgress(d,!!_refreshing):((L||_primary&&_primary!==N)&&ue.render(ue._dp._time-ue._start),ue.resetTo?ue.resetTo("totalProgress",d,v._tTime/v._tDur):(ue.vars.totalProgress=d,ue.invalidate().restart()))),b&&(e&&w&&(te.style[w+M.os2]=ae),E?t&&(l=!e&&a<d&&n<$+1&&n+1>=_maxScroll(R,M),k&&(e||!_&&!l?_reparent(b,te):(r=_getBounds(b,!0),a=n-Z,_reparent(b,_body,r.top+(M===_vertical?a:0)+_px,r.left+(M===_vertical?0:a)+_px))),_setState(_||l?ee:re),se!==J&&d<1&&_||ie(oe+(1!==d||l?0:se))):ie(_round(oe+se*d))),!A||G.tween||_refreshing||_startup||fe.restart(!0),u&&(c||P&&d&&(d<1||!_limitCallbacks))&&_toArray(u.targets).forEach(function(e){return e.classList[_||P?"add":"remove"](u.className)}),!g||O||e||g(N),t&&!_refreshing?(O&&(s&&("complete"===o?v.pause().totalProgress(1):"reset"===o?v.restart(!0).pause():"restart"===o?v.restart(!0):v[o]()),g&&g(N)),!c&&_limitCallbacks||(p&&c&&_callback(N,p),D[i]&&_callback(N,D[i]),P&&(1===d?N.kill(!1,1):D[i]=0),c||D[i=1===d?1:3]&&_callback(N,D[i])),C&&!_&&Math.abs(N.getVelocity())>(_isNumber(C)?C:2500)&&(_endAnimation(N.callbackAnimation),ue?ue.progress(1):_endAnimation(v,!d,1))):O&&g&&!_refreshing&&g(N)),ce&&(d=L?n/L.duration()*(L._caScrollDist||0):n,_e(d+(ye._isFlipped?1:0)),ce(d)),Se&&Se(-n/L.duration()*(L._caScrollDist||0)))},N.enable=function(e,r){N.enabled||(N.enabled=!0,_addListener(R,"resize",_onResize),_addListener(I?_doc:R,"scroll",_onScroll),H&&_addListener(xe,"refreshInit",H),!1!==e&&(N.progress=he=0,q=K=U=j()),!1!==r&&N.refresh())},N.getTween=function(e){return e&&G?G.tween:ue},N.setPositions=function(e,r){b&&(oe+=e-Z,se+=r-e-J),N.start=Z=e,N.end=$=r,J=r-e,N.update()},N.disable=function(e,r){if(N.enabled&&(!1!==e&&N.revert(),N.enabled=N.isActive=!1,r||ue&&ue.pause(),me=0,i&&(i.uncache=1),H&&_removeListener(xe,"refreshInit",H),fe&&(fe.pause(),G.tween&&G.tween.kill()&&(G.tween=0)),!I)){for(var t=_triggers.length;t--;)if(_triggers[t].scroller===R&&_triggers[t]!==N)return;_removeListener(R,"resize",_onResize),_removeListener(R,"scroll",_onScroll)}},N.kill=function(e,r){N.disable(e,r),ue&&!r&&ue.kill(),n&&delete _ids[n];var t=_triggers.indexOf(N);0<=t&&_triggers.splice(t,1),t===_i&&0<_direction&&_i--,t=0,_triggers.forEach(function(e){return e.scroller===N.scroller&&(t=1)}),t||(N.scroll.rec=0),v&&(v.scrollTrigger=null,e&&v.render(-1),r||v.kill()),we&&[we,Te,ye,be].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),_primary===N&&(_primary=0),b&&(i&&(i.uncache=1),t=0,_triggers.forEach(function(e){return e.pin===b&&t++}),t||(i.spacer=0)),m.onKill&&m.onKill(N)},N.enable(!1,!1),e&&e(N),v&&v.add&&!J?gsap.delayedCall(.01,function(){return Z||$||N.refresh()})&&(J=.01)&&(Z=$=0):N.refresh()):this.update=this.refresh=this.kill=_passThrough},xe.register=function(e){return _coreInitted||(gsap=e||_getGSAP(),_windowExists()&&window.document&&xe.enable(),_coreInitted=_enabled),_coreInitted},xe.defaults=function(e){if(e)for(var r in e)_defaults[r]=e[r];return _defaults},xe.disable=function(r,t){_enabled=0,_triggers.forEach(function(e){return e[t?"kill":"disable"](r)}),_removeListener(_win,"wheel",_onScroll),_removeListener(_doc,"scroll",_onScroll),clearInterval(_syncInterval),_removeListener(_doc,"touchcancel",_passThrough),_removeListener(_body,"touchstart",_passThrough),_multiListener(_removeListener,_doc,"pointerdown,touchstart,mousedown",_pointerDownHandler),_multiListener(_removeListener,_doc,"pointerup,touchend,mouseup",_pointerUpHandler),_resizeDelay.kill(),_iterateAutoRefresh(_removeListener);for(var e=0;e<_scrollers.length;e+=3)_wheelListener(_removeListener,_scrollers[e],_scrollers[e+1]),_wheelListener(_removeListener,_scrollers[e],_scrollers[e+2])},xe.enable=function(){if(_win=window,_doc=document,_docEl=_doc.documentElement,_body=_doc.body,gsap&&(_toArray=gsap.utils.toArray,_clamp=gsap.utils.clamp,_suppressOverwrites=gsap.core.suppressOverwrites||_passThrough,gsap.core.globals("ScrollTrigger",xe),_body)){_enabled=1,Observer.register(gsap),xe.isTouch=Observer.isTouch,_addListener(_win,"wheel",_onScroll),_root=[_win,_doc,_docEl,_body],xe.matchMedia({"(orientation: portrait)":function(){return _setBaseDimensions(),_setBaseDimensions}}),_addListener(_doc,"scroll",_onScroll);var e,r,t=_body.style,n=t.borderTopStyle;for(t.borderTopStyle="solid",e=_getBounds(_body),_vertical.m=Math.round(e.top+_vertical.sc())||0,_horizontal.m=Math.round(e.left+_horizontal.sc())||0,n?t.borderTopStyle=n:t.removeProperty("border-top-style"),_syncInterval=setInterval(_sync,250),gsap.delayedCall(.5,function(){return _startup=0}),_addListener(_doc,"touchcancel",_passThrough),_addListener(_body,"touchstart",_passThrough),_multiListener(_addListener,_doc,"pointerdown,touchstart,mousedown",_pointerDownHandler),_multiListener(_addListener,_doc,"pointerup,touchend,mouseup",_pointerUpHandler),_transformProp=gsap.utils.checkPrefix("transform"),_stateProps.push(_transformProp),_coreInitted=_getTime(),_resizeDelay=gsap.delayedCall(.2,_refreshAll).pause(),_autoRefresh=[_doc,"visibilitychange",function(){var e=_win.innerWidth,r=_win.innerHeight;_doc.hidden?(_prevWidth=e,_prevHeight=r):_prevWidth===e&&_prevHeight===r||_onResize()},_doc,"DOMContentLoaded",_refreshAll,_win,"load",_refreshAll,_win,"resize",_onResize],_iterateAutoRefresh(_addListener),_triggers.forEach(function(e){return e.enable(0,1)}),r=0;r<_scrollers.length;r+=3)_wheelListener(_removeListener,_scrollers[r],_scrollers[r+1]),_wheelListener(_removeListener,_scrollers[r],_scrollers[r+2])}},xe.config=function(e){"limitCallbacks"in e&&(_limitCallbacks=!!e.limitCallbacks);var r=e.syncInterval;r&&clearInterval(_syncInterval)||(_syncInterval=r)&&setInterval(_sync,r),"ignoreMobileResize"in e&&(_ignoreMobileResize=1===xe.isTouch&&e.ignoreMobileResize),"autoRefreshEvents"in e&&(_iterateAutoRefresh(_removeListener)||_iterateAutoRefresh(_addListener,e.autoRefreshEvents||"none"),_ignoreResize=-1===(e.autoRefreshEvents+"").indexOf("resize"))},xe.scrollerProxy=function(e,r){var t=_getTarget(e),n=_scrollers.indexOf(t),e=_isViewport(t);~n&&_scrollers.splice(n,e?6:2),r&&(e?_proxies.unshift(_win,r,_body,r,_docEl,r):_proxies.unshift(t,r))},xe.matchMedia=function(e){var r,t,n,i,o;for(t in e)n=_media.indexOf(t),i=e[t],"all"===(_creatingMedia=t)?i():(r=_win.matchMedia(t))&&(r.matches&&(o=i()),~n?(_media[n+1]=_combineFunc(_media[n+1],i),_media[n+2]=_combineFunc(_media[n+2],o)):(n=_media.length,_media.push(t,i,o),r.addListener?r.addListener(_onMediaChange):r.addEventListener("change",_onMediaChange)),_media[n+3]=r.matches),_creatingMedia=0;return _media},xe.clearMatchMedia=function(e){e||(_media.length=0),0<=(e=_media.indexOf(e))&&_media.splice(e,4)},xe.isInViewport=function(e,r,t){e=(_isString(e)?_getTarget(e):e).getBoundingClientRect(),r=e[t?_width:_height]*r||0;return t?0<e.right-r&&e.left+r<_win.innerWidth:0<e.bottom-r&&e.top+r<_win.innerHeight},xe.positionInViewport=function(e,r,t){var n=(e=_isString(e)?_getTarget(e):e).getBoundingClientRect(),e=n[t?_width:_height],r=null==r?e/2:r in _keywords?_keywords[r]*e:~r.indexOf("%")?parseFloat(r)*e/100:parseFloat(r)||0;return t?(n.left+r)/_win.innerWidth:(n.top+r)/_win.innerHeight},xe}();ScrollTrigger.version="3.10.3",ScrollTrigger.saveStyles=function(e){return e?_toArray(e).forEach(function(e){var r;e&&e.style&&(0<=(r=_savedStyles.indexOf(e))&&_savedStyles.splice(r,5),_savedStyles.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),gsap.core.getCache(e),_creatingMedia))}):_savedStyles},ScrollTrigger.revert=function(e,r){return _revertAll(!e,r)},ScrollTrigger.create=function(e,r){return new ScrollTrigger(e,r)},ScrollTrigger.refresh=function(e){return e?_onResize():(_coreInitted||ScrollTrigger.register())&&_refreshAll(!0)},ScrollTrigger.update=_updateAll,ScrollTrigger.clearScrollMemory=_clearScrollMemory,ScrollTrigger.maxScroll=function(e,r){return _maxScroll(e,r?_horizontal:_vertical)},ScrollTrigger.getScrollFunc=function(e,r){return _getScrollFunc(_getTarget(e),r?_horizontal:_vertical)},ScrollTrigger.getById=function(e){return _ids[e]},ScrollTrigger.getAll=function(){return _triggers.filter(function(e){return"ScrollSmoother"!==e.vars.id})},ScrollTrigger.isScrolling=function(){return!!_lastScrollTime},ScrollTrigger.snapDirectional=_snapDirectional,ScrollTrigger.addEventListener=function(e,r){e=_listeners[e]||(_listeners[e]=[]);~e.indexOf(r)||e.push(r)},ScrollTrigger.removeEventListener=function(e,r){e=_listeners[e],r=e&&e.indexOf(r);0<=r&&e.splice(r,1)},ScrollTrigger.batch=function(e,r){var t,n=[],i={},o=r.interval||.016,s=r.batchMax||1e9;for(t in r)i[t]="on"===t.substr(0,2)&&_isFunction(r[t])&&"onRefreshInit"!==t?function(e){var r=[],t=[],n=gsap.delayedCall(o,function(){e(r,t),r=[],t=[]}).pause();return function(e){r.length||n.restart(!0),r.push(e.trigger),t.push(e),s<=r.length&&n.progress(1)}}(r[t]):r[t];return _isFunction(s)&&(s=s(),_addListener(ScrollTrigger,"refresh",function(){return s=r.batchMax()})),_toArray(e).forEach(function(e){var r={};for(t in i)r[t]=i[t];r.trigger=e,n.push(ScrollTrigger.create(r))}),n};var _inputIsFocused,_clampScrollAndGetDurationMultiplier=function(e,r,t,n){return n<r?e(n):r<0&&e(0),n<t?(n-r)/(t-r):t<0?r/(r-t):1},_allowNativePanning=function e(r,t){!0===t?r.style.removeProperty("touch-action"):r.style.touchAction=t?"pan-"+t:"none",r===_docEl&&e(_body)},_overflow={auto:1,scroll:1},_nestedScroll=function(e){var r=e.event,t=e.target,n=e.axis,i=(r.changedTouches?r.changedTouches[0]:r).target,o=i._gsap||gsap.core.getCache(i),e=_getTime();if(!o._isScrollT||2e3<e-o._isScrollT){for(;i&&i.scrollHeight<=i.clientHeight;)i=i.parentNode;o._isScroll=i&&!_isViewport(i)&&i!==t&&(_overflow[(t=_getComputedStyle(i)).overflowY]||_overflow[t.overflowX]),o._isScrollT=e}!o._isScroll&&"x"!==n||(r._gsapAllow=!0)},_inputObserver=function(e,r,t,n){return Observer.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:r,onWheel:n=n&&_nestedScroll,onPress:n,onDrag:n,onScroll:n,onEnable:function(){return t&&_addListener(_doc,Observer.eventTypes[0],_captureInputs,!1,!0)},onDisable:function(){return _removeListener(_doc,Observer.eventTypes[0],_captureInputs)}})},_inputExp=/(input|label|select|textarea)/i,_captureInputs=function(e){var r=_inputExp.test(e.target.tagName);(r||_inputIsFocused)&&(e._gsapAllow=!0,_inputIsFocused=r)},_getScrollNormalizer=function(e){(e=!_isObject(e)?{}:e).preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";function r(){return s=!1}function o(){i=_maxScroll(f,_vertical),T=_clamp(0,i),g&&(w=_clamp(0,_maxScroll(f,_horizontal))),a=_refreshID}function t(){o(),l.isActive()&&l.vars.scrollY>i&&l.resetTo("scrollY",_maxScroll(f,_vertical))}var n,i,s,a,l,_,c,d,g=e.normalizeScrollX,u=e.momentum,p=e.allowNestedScroll,f=_getTarget(e.target)||_docEl,h=_getScrollFunc(f,_vertical),m=_getScrollFunc(f,_horizontal),v=1,S=0,y=_isFunction(u)?function(){return u(n)}:function(){return u||2.8},b=_inputObserver(f,e.type,!0,p),w=_passThrough,T=_passThrough,x=ScrollTrigger.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);return e.ignoreCheck=function(e){return x&&"touchmove"===e.type&&function(){if(s)return requestAnimationFrame(r),!0;s=!0}()||1<v||n.isGesturing||e.touches&&1<e.touches.length},e.onPress=function(){var e=v;v=_win.visualViewport&&_win.visualViewport.scale||1,l.pause(),e!==v&&_allowNativePanning(f,1<v||!g&&"x"),s=!1,_=m(),c=h(),o(),a=_refreshID},e.onRelease=e.onGestureStart=function(e,r){var t,n;r?(r=y(),g&&(n=(t=m())+.05*r*-e.velocityX/.227/v,r*=_clampScrollAndGetDurationMultiplier(m,t,n,_maxScroll(f,_horizontal)),l.vars.scrollX=w(n)),n=(t=h())+.05*r*-e.velocityY/.227/v,r*=_clampScrollAndGetDurationMultiplier(h,t,n,_maxScroll(f,_vertical)),l.vars.scrollY=T(n),l.invalidate().duration(r).play(.01)):d.restart(!0)},e.onWheel=function(){l._ts&&l.pause(),1e3<_getTime()-S&&(a=0,S=_getTime())},e.onChange=function(e,r,t,n,i){_refreshID!==a&&o(),r&&g&&m(w(n[2]===r?_+(e.startX-e.x)/v:m()+r-n[1])),t&&h(T(i[2]===t?c+(e.startY-e.y)/v:h()+t-i[1])),_updateAll()},e.onEnable=function(){_allowNativePanning(f,!g&&"x"),_addListener(_win,"resize",t),b.enable()},e.onDisable=function(){_allowNativePanning(f,!0),_removeListener(_win,"resize",t),b.kill()},n=new Observer(e),d=n._dc,l=gsap.to(n,{ease:"power4",paused:!0,scrollX:g?"+=0.1":"+=0",scrollY:"+=0.1",onComplete:d.vars.onComplete}),n};ScrollTrigger.sort=function(e){return _triggers.sort(e||function(e,r){return-1e6*(e.vars.refreshPriority||0)+e.start-(r.start+-1e6*(r.vars.refreshPriority||0))})},ScrollTrigger.observe=function(e){return new Observer(e)},ScrollTrigger.normalizeScroll=function(e){if(void 0===e)return _normalizer;if(!0===e&&_normalizer)return _normalizer.enable();if(!1===e)return _normalizer&&_normalizer.kill();e=e instanceof Observer?e:_getScrollNormalizer(e);return _normalizer&&_normalizer.target===e.target&&_normalizer.kill(),_isViewport(e.target)&&(_normalizer=e),e},ScrollTrigger.core={_getVelocityProp:_getVelocityProp,_inputObserver:_inputObserver,_scrollers:_scrollers,_proxies:_proxies,bridge:{ss:function(){_lastScrollTime||_dispatch("scrollStart"),_lastScrollTime=_getTime()},ref:function(){return _refreshing}}},_getGSAP()&&gsap.registerPlugin(ScrollTrigger);export{ScrollTrigger as ScrollTrigger,ScrollTrigger as default};