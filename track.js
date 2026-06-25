(function(){
  var TRACK="https://script.google.com/macros/s/AKfycbwgD4eyR0Z0Wxu9VQ27-8inBtDlKJz94krjvmP9SKKE35-0E-zObKRSTSoqVH_AKHXzqw/exec";
  var q=new URLSearchParams(location.search||"");
  var id=q.get("id")||"", src=q.get("src")||"";
  function beacon(ev,btn){ if(!TRACK) return;
    try{ var u=TRACK+"?ev="+ev+"&id="+encodeURIComponent(id)+"&src="+encodeURIComponent(src)+(btn?("&btn="+encodeURIComponent(btn)):"");
      if(navigator.sendBeacon){navigator.sendBeacon(u);}else{var im=new Image();im.src=u;} }catch(e){}
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a[href]"); if(!a) return;
    var href=a.getAttribute("href")||"";
    if(/workers\.dev|docs\.google\.com\/forms|forms\.gle/i.test(href)){ beacon("click",a.getAttribute("data-btn")||""); }
  },true);
})();
