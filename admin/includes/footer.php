  </main>
</div>
<div class="lightbox" id="lightbox">
  <button type="button" class="lightbox-close" id="lightboxClose" aria-label="Fermer">&times;</button>
  <img id="lightboxImg" src="" alt="">
</div>
<script>
(function(){
  var lb=document.getElementById('lightbox'),img=document.getElementById('lightboxImg');
  function close(){lb.classList.remove('on');img.src=''}
  document.addEventListener('click',function(e){
    var t=e.target.closest('img.thumb,.thumb-sm,.rec-thumb');
    if(t){img.src=t.src;img.alt=t.alt||'';lb.classList.add('on');return}
    if(e.target===lb)close();
  });
  document.getElementById('lightboxClose').addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
</script>
</body>
</html>
