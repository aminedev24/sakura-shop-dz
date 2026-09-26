  </main>
</div>
<!-- One photograph viewer for the whole admin. A thumbnail inside a group that
     carries data-shots pages through that group; a lone thumbnail just opens. -->
<div class="lightbox" id="lightbox">
  <button type="button" class="lb-close" id="lbClose" aria-label="Fermer">&times;</button>
  <button type="button" class="lb-nav lb-prev" id="lbPrev" aria-label="Photo précédente">&#8249;</button>
  <figure class="lb-figure">
    <img id="lbImg" src="" alt="">
    <figcaption id="lbCap"></figcaption>
  </figure>
  <button type="button" class="lb-nav lb-next" id="lbNext" aria-label="Photo suivante">&#8250;</button>
</div>
<script>
(function () {
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');
  var prev = document.getElementById('lbPrev');
  var next = document.getElementById('lbNext');
  var shots = [], at = 0, name = '';

  function show() {
    if (!shots.length) return;
    at = (at + shots.length) % shots.length;
    img.src = shots[at].src;
    img.alt = name;
    cap.textContent = shots.length > 1
      ? name + (shots[at].label ? ' — ' + shots[at].label : '') + '  (' + (at + 1) + '/' + shots.length + ')'
      : name + (shots[at].label ? ' — ' + shots[at].label : '');
    prev.hidden = next.hidden = shots.length < 2;
  }

  function open(thumb) {
    var group = thumb.closest('[data-shots]');
    if (group) {
      try { shots = JSON.parse(group.dataset.shots || '[]'); } catch (e) { shots = []; }
      name = group.dataset.name || '';
      at = Number(thumb.dataset.index) || 0;
    } else {
      shots = [];
      name = thumb.alt || '';
    }
    if (!shots.length) shots = [{ src: thumb.src || thumb.dataset.src || '', label: '' }];
    if (!shots[0].src) return;
    box.classList.add('on');
    document.body.style.overflow = 'hidden';
    show();
  }

  function close() {
    box.classList.remove('on');
    document.body.style.overflow = '';
    img.src = '';
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('img.thumb, .thumb-sm, .rec-thumb, [data-shots] [data-index]');
    if (t) { open(t); return; }
    if (e.target === box) close();
  });

  prev.addEventListener('click', function () { at--; show(); });
  next.addEventListener('click', function () { at++; show(); });
  document.getElementById('lbClose').addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') { at--; show(); }
    if (e.key === 'ArrowRight') { at++; show(); }
  });
})();
</script>
</body>
</html>
