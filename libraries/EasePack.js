var gsap,_coreInitted,_registerEase,_getGSAP=function(){return gsap||"undefined"!=typeof window&&(gsap=window.gsap)&&gsap.registerPlugin&&gsap},_boolean=function(e,a){return!!(void 0===e?a:e&&!~(e+"").indexOf("false"))},_initCore=function(e){if(gsap=e||_getGSAP()){_registerEase=gsap.registerEase;var a,o=gsap.parseEase();for(a in o)o[a].config||o[a];for(a in _registerEase("slow",SlowMo),_registerEase("expoScale",ExpoScaleEase),_registerEase("rough",RoughEase),EasePack)"version"!==a&&gsap.core.globals(a,EasePack[a]);_coreInitted=1}},_createSlowMo=function(e,a,o){var s=(e=Math.min(1,e||.7))<1?a||0===a?a:.7:0,t=(1-e)/2,r=t+e,n=_boolean(o);return function(e){var a=e+(.5-e)*s;return e<t?n?1-(e=1-e/t)*e:a-(e=1-e/t)*e*e*e*a:r<e?n?1===e?0:1-(e=(e-r)/t)*e:a+(e-a)*(e=(e-r)/t)*e*e*e:n?1:a}},_createExpoScale=function(a,e,o){var s=Math.log(e/a),t=e-a;return o=o&&gsap.parseEase(o),function(e){return(a*Math.exp(s*(o?o(e):e))-a)/t}},EasePoint=function(e,a,o){this.t=e,this.v=a,o&&(((this.next=o).prev=this).c=o.v-a,this.gap=o.t-e)},_createRoughEase=function(e){for(var a,o,s,t,r,n,i,c=(e="object"!=typeof e?{points:+e||20}:e).taper||"none",E=[],g=0,p=0|(+e.points||20),l=p,u=_boolean(e.randomize,!0),f=_boolean(e.clamp),S=gsap?gsap.parseEase(e.template):0,_=.4*(+e.strength||1);-1<--l;)a=u?Math.random():1/p*l,o=S?S(a):a,s="none"===c?_:"out"===c?(t=1-a)*t*_:"in"===c?a*a*_:a<.5?(t=2*a)*t*.5*_:(t=2*(1-a))*t*.5*_,u?o+=Math.random()*s-.5*s:l%2?o+=.5*s:o-=.5*s,f&&(1<o?o=1:o<0&&(o=0)),E[g++]={x:a,y:o};for(E.sort(function(e,a){return e.x-a.x}),n=new EasePoint(1,1,null),l=p;l--;)r=E[l],n=new EasePoint(r.x,r.y,n);return i=new EasePoint(0,0,n.t?n:n.next),function(e){var a=i;if(e>a.t){for(;a.next&&e>=a.t;)a=a.next;a=a.prev}else for(;a.prev&&e<=a.t;)a=a.prev;return(i=a).v+(e-a.t)/a.gap*a.c}},SlowMo=_createSlowMo(.7);(SlowMo.ease=SlowMo).config=_createSlowMo;var ExpoScaleEase=_createExpoScale(1,2);ExpoScaleEase.config=_createExpoScale;var RoughEase=_createRoughEase();(RoughEase.ease=RoughEase).config=_createRoughEase;var p,EasePack={SlowMo:SlowMo,RoughEase:RoughEase,ExpoScaleEase:ExpoScaleEase};for(p in EasePack)EasePack[p].register=_initCore,EasePack[p].version="3.10.3";_getGSAP()&&gsap.registerPlugin(SlowMo);export{SlowMo as SlowMo,ExpoScaleEase as ExpoScaleEase,RoughEase as RoughEase,EasePack as EasePack,EasePack as default};