Diva Pop Studio PRO - Conteúdo:
- index.html, sobre.html, galeria.html, videos.html, contato.html
- assets/css/style.css
- assets/js/main.js
- assets/images/* (placeholders)
- assets/videos/* (placeholders)
Substitua os arquivos de vídeo e imagens pelos originais quando disponível.\n\nUPGRADES APPLIED:\n- WebP + Retina images generated\n- Local font placeholder added (replace woff2 files)\n- Preload tags for CSS/JS/font\n- service-worker.js and offline.html (PWA behavior)\n- Manifest.json and favicons generated\n- Dark/Light support and theme toggle\n- Contact form fallback: saves messages to localStorage and allows download when offline\n- sitemap.xml and robots.txt\n- Minified CSS/JS created and linked in HTML\n\nDEPLOY NOTES:\n- Replace placeholder fonts in assets/fonts/ with real .woff2 files for full offline font support\n- Replace placeholder videos in assets/videos with real mp4/webm files\n- Replace placeholder images in assets/images with high-quality originals (webp and @2x were generated automatically)\n- For server-side form handling, set the <form action> to your endpoint or use services like Formspree\n