(function(){
  var TRACK="https://script.google.com/macros/s/AKfycby2v7n5snIg7Kme66DfrfgaAdmKI30-L44I-w7OTJQf_dsNi4fxV_BI-8cMsyFUMQSKNw/exec";
  var q=new URLSearchParams(location.search||"");
  var id=q.get("id")||"", src=q.get("src")||"";
  function beacon(ev,btn){ if(!TRACK) return;
    try{ var u=TRACK+"?ev="+ev+"&id="+encodeURIComponent(id)+"&src="+encodeURIComponent(src)+(btn?("&btn="+encodeURIComponent(btn)):"");
      if(navigator.sendBeacon){navigator.sendBeacon(u);}else{var im=new Image();im.src=u;} }catch(e){}
  }
  // CTA 클릭(폼/워커 링크) — 사람이 눌러야 발사(신뢰 신호). 원래 그대로.
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a[href]"); if(!a) return;
    var href=a.getAttribute("href")||"";
    if(/workers\.dev|docs\.google\.com\/forms|forms\.gle/i.test(href)){ beacon("click",a.getAttribute("data-btn")||""); }
  },true);
  // 열람(open) — 보이는 상태로 3초 이상 머물면 1회만 발사(스캐너 거름). index.html 즉시발사는 제거됨.
  var openSent=false, openTimer=null;
  function armOpen(){ if(openSent) return; clearTimeout(openTimer);
    openTimer=setTimeout(function(){ if(!openSent && !document.hidden){ openSent=true; beacon("open",""); } },3000); }
  if(!document.hidden) armOpen();
  document.addEventListener("visibilitychange",function(){ if(!document.hidden) armOpen(); });
})();
