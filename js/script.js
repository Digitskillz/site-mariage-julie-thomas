/* ============================================================
   Site de mariage — Julie & Thomas
   Script partagé : navigation, animation enveloppe,
   affichage/masquage RSVP, envoi du formulaire (Formspree),
   galerie photos dynamique, lecteur musique.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initEnvelope();
  initRsvpForm();
  initGallery();
  initMusicPlayer();
});

/* ---------------- Navigation ---------------- */
function initNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  // Highlight current page link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach((a) => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // On the homepage the nav stays hidden until the envelope has been opened
  if (!document.body.classList.contains('subpage')) return;
  nav.classList.add('visible');
}

/* ---------------- Envelope opening animation ---------------- */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const envelopeScreen = document.getElementById('envelope-screen');
  const invitationScreen = document.getElementById('invitation-screen');
  const envelopeHint = document.querySelector('.envelope-hint');
  const scrollCue = document.getElementById('scroll-cue');
  const nav = document.querySelector('.site-nav');
  if (!envelope || !envelopeScreen || !invitationScreen) return;

  let opened = false;

  const openEnvelope = () => {
    if (opened) return;
    opened = true;
    envelope.classList.add('open');
    envelopeHint?.classList.add('hidden');

    // L'enveloppe reste visible, ouverte : le faire-part apparaît juste
    // en-dessous (et non à sa place). La flèche invite à scroller
    // manuellement, pas de défilement automatique.
    setTimeout(() => {
      invitationScreen.classList.remove('hidden');
      requestAnimationFrame(() => {
        invitationScreen.classList.add('visible');
      });
      if (nav) nav.classList.add('visible');
      scrollCue?.classList.add('visible');
    }, 900);
  };

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
}

/* ---------------- Formulaire RSVP ---------------- */
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const attendingRadios = form.querySelectorAll('input[name="Présence"]');
  const guestsField = document.getElementById('guests-field');

  attendingRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const attending = form.querySelector('input[name="Présence"]:checked')?.value === 'Présent(e)';
      if (guestsField) guestsField.classList.toggle('show', attending);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const formBody = document.getElementById('rsvp-form-body');
    const successMsg = document.getElementById('rsvp-success');
    const errorMsg = document.getElementById('rsvp-error');

    errorMsg?.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formBody.classList.add('hidden');
        successMsg.classList.remove('hidden');
      } else {
        throw new Error('Formspree error');
      }
    } catch (err) {
      errorMsg?.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer ma réponse';
    }
  });
}

/* ---------------- Galerie photos ----------------
   Pour ajouter vos photos : déposez vos fichiers dans le
   dossier /images/gallery/ puis ajoutez leur nom ci-dessous.
------------------------------------------------------------ */
const GALLERY_IMAGES = [
  // 'images/gallery/photo-1.jpg',
  // 'images/gallery/photo-2.jpg',
];

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');
  if (!grid) return;

  if (GALLERY_IMAGES.length === 0) {
    empty?.classList.remove('hidden');
    return;
  }

  empty?.classList.add('hidden');
  grid.innerHTML = GALLERY_IMAGES.map(
    (src) => `<div class="gallery-item"><img src="${src}" alt="Photo de Julie & Thomas" loading="lazy"></div>`
  ).join('');
}

/* ---------------- Lecteur musique (vinyle) ----------------
   Déposez votre morceau dans /music/song.mp3 (voir README.md).
------------------------------------------------------------ */
function initMusicPlayer() {
  const btn = document.getElementById('vinyl-button');
  const audio = document.getElementById('bg-audio');
  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {
        // Le fichier music/song.mp3 n'existe pas encore (voir README.md)
      });
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Mettre la musique en pause');
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Lancer la musique');
    }
  });

  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
  });
}
