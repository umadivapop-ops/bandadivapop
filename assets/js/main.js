
// Minimal JS for menu toggle and simple lightbox gallery
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');
  if(btn) btn.addEventListener('click', ()=>{ nav.classList.toggle('open'); });
  // Lightbox for gallery
  const items = document.querySelectorAll('.gallery a');
  const lightbox = document.createElement('div');
  lightbox.id='lightbox'; lightbox.style.cssText='position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);padding:20px;z-index:999;visibility:hidden;opacity:0;transition:opacity .2s';
  const img = document.createElement('img'); img.style.maxWidth='90%'; img.style.maxHeight='90%'; img.style.borderRadius='8px';
  lightbox.appendChild(img); document.body.appendChild(lightbox);
  lightbox.addEventListener('click',()=>{ lightbox.style.opacity=0; lightbox.style.visibility='hidden'; });
  items.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      img.src = a.href;
      lightbox.style.visibility='visible'; lightbox.style.opacity=1;
    });
  });
});


// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/assets/js/service-worker.js').catch(()=>{});
}
// Dark/light mode automatic + toggle
(function(){
  const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  if(prefers) root.setAttribute('data-theme','dark');
  // add small toggle if any
  window.toggleTheme = function(){
    if(root.getAttribute('data-theme')==='dark') root.setAttribute('data-theme','light'); else root.setAttribute('data-theme','dark');
  };
})();

// Contact form offline storage and download
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector('form');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {};
    new FormData(form).forEach((v,k)=>data[k]=v);
    // try to POST to Formspree (placeholder) else store locally
    fetch(form.action || '/submit', {method:'POST', body: JSON.stringify(data), headers:{'Content-Type':'application/json'}}).then(r=>{
      alert('Mensagem enviada (modo online). Obrigado!');
      form.reset();
    }).catch(err=>{
      // offline fallback: save to localStorage and prompt download
      const stash = JSON.parse(localStorage.getItem('divapop_offline_msgs')||'[]');
      stash.push({ts:Date.now(), data});
      localStorage.setItem('divapop_offline_msgs', JSON.stringify(stash));
      alert('Você está offline. Mensagem salva localmente. Você também pode baixar um arquivo com os dados.');
      // create downloadable blob
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'mensagem_divapop.json'; a.click();
      URL.revokeObjectURL(url);
      form.reset();
    });
  });
});
