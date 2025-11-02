const exercises = [
  {
    id: "semantique-step",
    title: "S&eacute;mantique HTML &mdash; page marketing pas &agrave; pas",
    level: "Fondamentaux",
    focus: "Landmarks, titres, navigation",
    context:
      "Une page marketing a &eacute;t&eacute; impl&eacute;ment&eacute;e uniquement avec des &lt;div&gt;. Aucun rep&egrave;re s&eacute;mantique ni lien d&rsquo;&eacute;vitement n&rsquo;est pr&eacute;sent.",
    goal:
      "Structurer la page avec des balises pertinentes, ajouter un lien d&rsquo;&eacute;vitement, des titres hi&eacute;rarchis&eacute;s et un contenu principal unique.",
    steps: [
      {
        title: "&Eacute;tape&nbsp;1 &mdash; Landmarks",
        description:
          "Remplacez les conteneurs g&eacute;n&eacute;riques par &lt;header&gt;, &lt;nav&gt;, &lt;main&gt; et &lt;footer&gt; avec des libell&eacute;s accessibles."
      },
      {
        title: "&Eacute;tape&nbsp;2 &mdash; Titres",
        description:
          "Ajoutez un &lt;h1&gt; unique et structurez les sections secondaires avec &lt;h2&gt; ou &lt;h3&gt;."
      },
      {
        title: "&Eacute;tape&nbsp;3 &mdash; Navigation",
        description:
          "Ajoutez un lien d&rsquo;&eacute;vitement avant le header et attribuez un <code>aria-label</code> &agrave; la navigation."
      }
    ],
    starterCode: String.raw`<div class="page">
  <div class="top">
    <div class="brand">AccessiWorld</div>
    <div class="menu">
      <a href="#">Accueil</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </div>
  </div>
  <div class="content">
    <div class="title">Construisons un web inclusif</div>
    <div class="intro">
      Nous accompagnons vos &eacute;quipes produit vers la conformit&eacute; RGAA.
    </div>
  </div>
  <div class="bottom">&copy; 2025 AccessiWorld</div>
</div>`,
    solution: String.raw`<a class="skip-link" href="#contenu-principal">Passer au contenu</a>
<header class="top" role="banner">
  <div class="brand">AccessiWorld</div>
  <nav class="menu" aria-label="Navigation principale">
    <ul>
      <li><a href="#">Accueil</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
<main id="contenu-principal">
  <article>
    <header>
      <h1>Construisons un web inclusif</h1>
    </header>
    <p>
      Nous accompagnons vos &eacute;quipes produit vers la conformit&eacute; RGAA.
    </p>
  </article>
</main>
<footer role="contentinfo">
  <p>&copy; 2025 AccessiWorld</p>
</footer>`,
    success:
      "Excellent&nbsp;! Les landmarks sont en place, la hi&eacute;rarchie de titres est coh&eacute;rente et la navigation dispose d&rsquo;un libell&eacute;.",
    failure:
      "V&eacute;rifiez la pr&eacute;sence de &lt;header&gt;, &lt;nav aria-label=&quot;...&quot;&gt;, &lt;main&gt;, &lt;footer&gt;, d&rsquo;un lien d&rsquo;&eacute;vitement et d&rsquo;un &lt;h1&gt; unique.",
    validator: (code) => {
      const normalized = code.toLowerCase();
      return (
        normalized.includes("skip-link") &&
        normalized.includes("<header") &&
        normalized.includes("aria-label") &&
        normalized.includes("<main") &&
        normalized.includes("<footer") &&
        normalized.includes("<h1")
      );
    }
  },
  {
    id: "form-errors",
    title: "Formulaire &mdash; gestion des erreurs",
    level: "Interm&eacute;diaire",
    focus: "aria-invalid, aria-describedby, alert",
    context:
      "Un formulaire de contact n&rsquo;annonce pas les erreurs et le focus ne se place pas sur le premier champ invalide.",
    goal:
      "Relier les labels, annoncer les erreurs via <code>aria-live</code>, ajouter un message r&eacute;capitulatif et g&eacute;rer le focus.",
    starterCode: String.raw`<form id="contact">
  <div>
    <label>Nom</label>
    <input type="text" id="name" />
  </div>
  <div>
    <label>Email</label>
    <input type="email" id="email" />
  </div>
  <button type="submit">Envoyer</button>
</form>
<div id="messages"></div>
<script>
  const form = document.getElementById('contact');
  const messages = document.getElementById('messages');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const errors = [];
    if (!form.name.value.trim()) errors.push('Nom requis');
    if (!form.email.value.includes('@')) errors.push('Email invalide');
    if (errors.length) {
      messages.textContent = errors.join(', ');
    } else {
      messages.textContent = 'Envoy&eacute;';
    }
  });
</script>`,
    solution: String.raw`<form id="contact" novalidate>
  <div>
    <label for="name">Nom</label>
    <input type="text" id="name" aria-describedby="name-error" aria-invalid="false" required />
    <p id="name-error" class="visually-hidden"></p>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" aria-describedby="email-error" aria-invalid="false" required />
    <p id="email-error" class="visually-hidden"></p>
  </div>
  <button type="submit">Envoyer</button>
</form>
<div id="messages" role="alert" aria-live="assertive"></div>
<script>
  const form = document.getElementById('contact');
  const messages = document.getElementById('messages');
  const fields = ['name', 'email'];

  form.addEventListener('submit', event => {
    event.preventDefault();
    let firstInvalid = null;
    const errors = [];

    fields.forEach(id => {
      const input = form.querySelector('#' + id);
      const error = document.getElementById(id + '-error');
      input.setAttribute('aria-invalid', 'false');
      error.textContent = '';
      error.classList.add('visually-hidden');

      if (!input.value.trim() || (id === 'email' && !input.value.includes('@'))) {
        input.setAttribute('aria-invalid', 'true');
        error.textContent = id === 'email' ? 'Saisissez une adresse valide.' : 'Ce champ est obligatoire.';
        error.classList.remove('visually-hidden');
        errors.push(error.textContent);
        if (!firstInvalid) {
          firstInvalid = input;
        }
      }
    });

    if (errors.length) {
      messages.textContent = 'Formulaire incomplet : ' + errors.join(' ');
      firstInvalid?.focus();
    } else {
      messages.textContent = 'Demande envoy&eacute;e avec succ&egrave;s.';
    }
  });
</script>`,
    success:
      "Parfait&nbsp;: les erreurs sont annonc&eacute;es via un <code>role=&quot;alert&quot;</code>, les champs sont reli&eacute;s aux messages et le focus est redirig&eacute;.",
    failure:
      "Assurez-vous d&rsquo;utiliser <code>aria-invalid</code>, <code>aria-describedby</code>, <code>role=&quot;alert&quot;</code> et de placer le focus sur le premier champ invalide.",
    validator: (code) => {
      const normalized = code.toLowerCase();
      return (
        normalized.includes("aria-invalid") &&
        normalized.includes("aria-describedby") &&
        normalized.includes("role=\"alert\"") &&
        normalized.includes("focus()")
      );
    }
  },
  {
    id: "tabs-aria",
    title: "Composant onglets ARIA",
    level: "Avanc&eacute;",
    focus: "role=tablist, aria-selected, aria-controls",
    context:
      "Des onglets sont styl&eacute;s mais ne sont pas accessibles au clavier et n&rsquo;annoncent pas la section active.",
    goal:
      "Impl&eacute;menter les r&ocirc;les ARIA, g&eacute;rer les fl&egrave;ches de navigation et mettre &agrave; jour les attributs dynamiques.",
    starterCode: String.raw`<div class="tabs">
  <button class="tab active">Introduction</button>
  <button class="tab">Audit</button>
  <button class="tab">Livraison</button>
</div>
<section class="panel">Bienvenue</section>
<section class="panel" hidden>Audit RGAA</section>
<section class="panel" hidden>Livraison</section>`,
    solution: String.raw`<div class="tabs" role="tablist" aria-label="Parcours RGAA">
  <button
    id="tab-intro"
    class="tab"
    role="tab"
    aria-controls="panel-intro"
    aria-selected="true"
    tabindex="0"
  >Introduction</button>
  <button
    id="tab-audit"
    class="tab"
    role="tab"
    aria-controls="panel-audit"
    aria-selected="false"
    tabindex="-1"
  >Audit</button>
  <button
    id="tab-livraison"
    class="tab"
    role="tab"
    aria-controls="panel-livraison"
    aria-selected="false"
    tabindex="-1"
  >Livraison</button>
</div>
<section
  id="panel-intro"
  class="panel"
  role="tabpanel"
  aria-labelledby="tab-intro"
>Bienvenue</section>
<section
  id="panel-audit"
  class="panel"
  role="tabpanel"
  aria-labelledby="tab-audit"
  hidden
>Audit RGAA</section>
<section
  id="panel-livraison"
  class="panel"
  role="tabpanel"
  aria-labelledby="tab-livraison"
  hidden
>Livraison</section>
<script>
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(tab) {
    tabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.setAttribute('tabindex', selected ? '0' : '-1');
    });

    panels.forEach(panel => {
      const isAssociated = panel.getAttribute('aria-labelledby') === tab.id;
      panel.toggleAttribute('hidden', !isAssociated);
    });

    tab.focus();
  }

  tabs.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', event => {
      const { key } = event;
      if (key === 'ArrowRight' || key === 'ArrowLeft') {
        event.preventDefault();
        const delta = key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (index + delta + tabs.length) % tabs.length;
        activateTab(tabs[nextIndex]);
      }
      if (key === 'Home') {
        event.preventDefault();
        activateTab(tabs[0]);
      }
      if (key === 'End') {
        event.preventDefault();
        activateTab(tabs[tabs.length - 1]);
      }
    });
  });
</script>`,
    success:
      "Les onglets sont pleinement accessibles au clavier et annoncent les panneaux actifs. Bravo&nbsp;!",
    failure:
      "Assurez-vous d&rsquo;utiliser <code>role=&quot;tablist&quot;</code>, <code>aria-selected</code>, <code>aria-controls</code> et de g&eacute;rer les fl&egrave;ches.",
    validator: (code) => {
      const normalized = code.toLowerCase();
      return (
        normalized.includes("role=\"tablist\"") &&
        normalized.includes("role=\"tab\"") &&
        normalized.includes("aria-controls") &&
        normalized.includes("aria-selected")
      );
    }
  },
  {
    id: "angular-focus-monitor",
    title: "Angular &mdash; gestion du focus",
    level: "Expert",
    focus: "Angular CDK FocusMonitor",
    context:
      "Le dialogue Angular Material n&rsquo;annonce pas son ouverture et ne rend pas le focus aux boutons appelants.",
    goal:
      "Utiliser <code>cdkFocusInitial</code>, <code>FocusMonitor</code> et un service d&rsquo;annonce pour g&eacute;rer l&rsquo;exp&eacute;rience.",
    starterCode: String.raw`@Component({
  selector: 'app-dialog',
  template: `
    <h2>Suppression</h2>
    <button (click)="close()">Fermer</button>
  `
})
export class DialogComponent {
  close() {}
}

@Component({
  selector: 'app-dashboard',
  template: `
    <button (click)="open()">Supprimer</button>
  `
})
export class DashboardComponent {
  open() {}
}
`,
    solution: String.raw`@Component({
  selector: 'app-dialog',
  template: `
    <h2 id="dialog-title">Suppression</h2>
    <p id="dialog-desc">Confirmez la suppression de l&apos;&eacute;l&eacute;ment.</p>
    <div>
      <button mat-stroked-button (click)="close()">Annuler</button>
      <button mat-flat-button color="warn" cdkFocusInitial (click)="confirm()">Confirmer</button>
    </div>
  `,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'dialog-title',
    'aria-describedby': 'dialog-desc',
    cdkTrapFocus: ''
  }
})
export class DialogComponent {
  constructor(private readonly ref: MatDialogRef<DialogComponent>, private readonly accessibility: AccessibilityService) {
    this.accessibility.announce('Dialogue ouvert : confirmer la suppression', 'assertive');
  }

  close(): void {
    this.ref.close(false);
  }

  confirm(): void {
    this.ref.close(true);
  }
}

@Component({
  selector: 'app-dashboard',
  template: `
    <button #trigger mat-raised-button color="warn" (click)="open(trigger)">Supprimer</button>
  `
})
export class DashboardComponent {
  constructor(private readonly dialog: MatDialog, private readonly fm: FocusMonitor) {}

  open(trigger: HTMLElement): void {
    const ref = this.dialog.open(DialogComponent);
    ref.afterClosed().subscribe(() => {
      this.fm.focusVia(trigger, 'program');
    });
  }
}
`,
    success:
      "La bo&icirc;te de dialogue annonce son ouverture, capture le focus et le restitue apr&egrave;s fermeture.",
    failure:
      "Employez <code>cdkFocusInitial</code>, <code>FocusMonitor</code> et une annonce via le service d&rsquo;accessibilit&eacute;.",
    validator: (code) => {
      const normalized = code.toLowerCase();
      return (
        normalized.includes("cdkfocusinitial") &&
        normalized.includes("focusmonitor") &&
        normalized.includes("aria-modal")
      );
    }
  }
];

const quizQuestions = [
  {
    id: "contrast",
    category: "Th&egrave;me 3",
    question:
      "Quel contraste minimum le RGAA 4.1 exige-t-il pour un texte courant (niveau AA) ?",
    options: [
      { label: "2.5:1", correct: false },
      { label: "3:1", correct: false },
      { label: "4.5:1", correct: true },
      { label: "7:1", correct: false }
    ],
    explanation:
      "Le RGAA reprend les exigences WCAG&nbsp;2.1&nbsp;: 4.5:1 pour les textes normaux, 3:1 pour les gros titres (> 24&nbsp;px ou 19&nbsp;px gras)."
  },
  {
    id: "aria-label",
    category: "ARIA",
    question: "Quand laisser un attribut <code>alt</code> vide est-il recommand&eacute; ?",
    options: [
      { label: "Pour toutes les ic&ocirc;nes", correct: false },
      { label: "Pour les images purement d&eacute;coratives", correct: true },
      { label: "Pour les images de texte", correct: false },
      { label: "Jamais", correct: false }
    ],
    explanation:
      "Les images purement d&eacute;coratives doivent avoir <code>alt=&quot;&quot;</code> et <code>role=&quot;presentation&quot;</code> pour &ecirc;tre ignor&eacute;es."
  },
  {
    id: "main-element",
    category: "HTML",
    question: "Combien d&rsquo;&eacute;l&eacute;ments <code>&lt;main&gt;</code> une page conforme doit-elle contenir ?",
    options: [
      { label: "Autant que de sections", correct: false },
      { label: "Un seul", correct: true },
      { label: "Deux (desktop/mobile)", correct: false },
      { label: "Un par layout", correct: false }
    ],
    explanation:
      "RGAA 9.1 exige un contenu principal unique, donc un seul <code>&lt;main&gt;</code> ou <code>role=&quot;main&quot;</code> par page."
  },
  {
    id: "keyboard-order",
    category: "Th&egrave;me 7",
    question: "Quelle strat&eacute;gie garantit un ordre de tabulation coh&eacute;rent ?",
    options: [
      { label: "Utiliser tabindex &gt; 0", correct: false },
      { label: "Respecter l&rsquo;ordre du DOM et les balises natives", correct: true },
      { label: "Masquer les &eacute;l&eacute;ments focusables", correct: false },
      { label: "Inverser l&rsquo;ordre du DOM", correct: false }
    ],
    explanation:
      "L&rsquo;ordre de tabulation suit le DOM. Utilisez les balises natives, &eacute;vitez <code>tabindex</code> positif et ajustez l&rsquo;ordre via CSS si besoin."
  },
  {
    id: "angular-testing",
    category: "Angular",
    question: "Quel outil int&eacute;grer pour automatiser les v&eacute;rifications accessibilit&eacute; dans Cypress ?",
    options: [
      { label: "jest-axe", correct: false },
      { label: "axe-core / cypress-axe", correct: true },
      { label: "pa11y", correct: false },
      { label: "loki", correct: false }
    ],
    explanation:
      "<code>cypress-axe</code> injecte <code>axe-core</code> dans les tests end-to-end pour d&eacute;tecter des violations WCAG/RGAA automatiquement."
  }
];

const flashcards = [
  {
    front: "Quand utiliser <code>aria-live=&quot;assertive&quot;</code> ?",
    back: "Pour des alertes critiques &agrave; annoncer imm&eacute;diatement (erreur bloquante, d&eacute;connexion).",
    tag: "ARIA"
  },
  {
    front: "ARIA &mdash; <code>aria-describedby</code>",
    back: "Associe un texte d&rsquo;aide ou une erreur suppl&eacute;mentaire. Utiliser l&rsquo;id de l&rsquo;&eacute;l&eacute;ment descriptif.",
    tag: "Formulaire"
  },
  {
    front: "RGAA &mdash; Th&egrave;me 8",
    back: "Traitement des documents. Fournir une alternative structur&eacute;e (HTML, PDF balis&eacute;, ePub).",
    tag: "RGAA"
  },
  {
    front: "Angular CDK &mdash; FocusMonitor",
    back: "Suivre l&rsquo;origine du focus (clavier, souris) pour afficher des styles adapt&eacute;s.",
    tag: "Angular"
  }
];

const interviewQuestions = [
  {
    title: "Comment conduire un audit RGAA ?",
    answer:
      "Expliquer la constitution de l&rsquo;&eacute;chantillon, le test manuel par crit&egrave;re, la collecte de preuves (captures, code) et la r&eacute;daction du rapport avec priorit&eacute;s et d&eacute;lais.",
    focus: "Audit"
  },
  {
    title: "Comment g&eacute;rer la dette accessibilit&eacute; dans un sprint agile ?",
    answer:
      "Int&eacute;grer des jalons de revue a11y, inclure des tests axe-core dans la CI, faire des d&eacute;mos accessibles et planifier des chantiers de correction.",
    focus: "Processus"
  },
  {
    title: "Expliquez l&rsquo;utilit&eacute; de <code>aria-describedby</code> dans un formulaire.",
    answer:
      "Il relie un champ &agrave; un message d&rsquo;aide ou d&rsquo;erreur. Les technologies d&rsquo;assistance lisent ce texte apr&egrave;s le label, ce qui contextualise l&rsquo;entr&eacute;e.",
    focus: "Formulaire"
  },
  {
    title: "Comment justifier l&rsquo;investissement accessibilit&eacute; aupr&egrave;s d&rsquo;un d&eacute;cideur ?",
    answer:
      "Insister sur la conformit&eacute; l&eacute;gale, la r&eacute;duction des risques, l&rsquo;ouverture &agrave; 20&nbsp;% de la population et l&rsquo;am&eacute;lioration de l&rsquo;exp&eacute;rience client.",
    focus: "Business"
  }
];

function updateLastUpdate() {
  const output = document.getElementById("last-update");
  if (!output) return;
  const now = new Date();
  output.textContent = now.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function renderExercises(root) {
  exercises.forEach((exercise) => {
    const article = document.createElement("article");
    article.className = "exercise";
    article.setAttribute("data-id", exercise.id);

    const stepsFragment = exercise.steps
      ? `<ol class="exercise-steps">${exercise.steps
          .map(
            (step) =>
              `<li><strong>${step.title}</strong> &mdash; ${step.description}</li>`
          )
          .join("")}</ol>`
      : "";

    article.innerHTML = `
      <header>
        <h3>${exercise.title}</h3>
        <p class="exercise__meta">
          <span class="tag">${exercise.level}</span>
          <span>${exercise.focus}</span>
        </p>
      </header>
      <p>${exercise.context}</p>
      <p><strong>Objectif :</strong> ${exercise.goal}</p>
      ${stepsFragment}
      <label for="code-${exercise.id}" class="visually-hidden">Zone de saisie pour l&rsquo;exercice ${exercise.title}</label>
      <textarea id="code-${exercise.id}" class="exercise__editor" spellcheck="false"></textarea>
      <div class="exercise__actions">
        <button type="button" data-action="preview">Pr&eacute;visualiser</button>
        <button type="button" data-action="validate">Valider</button>
        <button type="button" data-action="reset">R&eacute;initialiser</button>
        <button type="button" data-action="solution">Afficher le corrig&eacute;</button>
        <button type="button" data-action="copy-solution">Copier le corrig&eacute;</button>
      </div>
      <div class="exercise__feedback" role="status" aria-live="polite"></div>
      <div class="exercise__preview">
        <iframe title="Pr&eacute;visualisation exercice ${exercise.title}"></iframe>
      </div>
      <details class="exercise__solution">
        <summary>Corrig&eacute; d&eacute;taill&eacute;</summary>
        <pre><code>${escapeHtml(exercise.solution)}</code></pre>
      </details>
    `;

    const textarea = article.querySelector("textarea");
    if (textarea) {
      textarea.value = exercise.starterCode;
      textarea.addEventListener("keydown", (event) => {
        if (event.ctrlKey && !event.shiftKey && event.key === "Enter") {
          event.preventDefault();
          validateExercise(article, exercise);
        }
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "p") {
          event.preventDefault();
          previewExercise(article, exercise);
        }
        if (event.ctrlKey && !event.shiftKey && event.key === "Backspace") {
          event.preventDefault();
          resetExercise(article, exercise);
        }
      });
    }

    article.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.getAttribute("data-action");
      if (!action) return;
      switch (action) {
        case "preview":
          previewExercise(article, exercise);
          break;
        case "validate":
          validateExercise(article, exercise);
          break;
        case "reset":
          resetExercise(article, exercise);
          break;
        case "solution":
          toggleSolution(article, target);
          break;
        case "copy-solution":
          copySolution(exercise.solution, target);
          break;
        default:
          break;
      }
    });

    root.appendChild(article);
    previewExercise(article, exercise);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildPreviewDocument(code) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Pr&eacute;visualisation</title>
    <style>
      :root { font-family: "Inter", system-ui, sans-serif; color: #0f172a; }
      body { margin: 1.5rem; background: #f8fafc; line-height: 1.6; }
      a { color: #1d4ed8; }
      .skip-link { position: absolute; left: -999px; }
      .skip-link:focus { left: 1rem; top: 1rem; background: #fde68a; padding: 0.5rem 1rem; }
      nav ul { list-style: none; padding: 0; display: flex; gap: 1rem; }
      nav a { text-decoration: none; }
      .visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; border: 0; padding: 0; clip: rect(0 0 0 0); overflow: hidden; }
      button:focus, a:focus, input:focus { outline: 2px solid #2563eb; outline-offset: 2px; }
    </style>
  </head>
  <body>
    ${code}
  </body>
</html>`;
}

function previewExercise(article, exercise) {
  const iframe = article.querySelector("iframe");
  const textarea = article.querySelector("textarea");
  if (!iframe || !textarea) return;
  iframe.setAttribute("srcdoc", buildPreviewDocument(textarea.value));
}

function validateExercise(article, exercise) {
  const textarea = article.querySelector("textarea");
  const feedback = article.querySelector(".exercise__feedback");
  if (!textarea || !feedback) return;
  let success = false;
  try {
    success = Boolean(exercise.validator?.(textarea.value));
  } catch (error) {
    success = false;
  }
  feedback.dataset.state = success ? "success" : "error";
  feedback.innerHTML = success ? exercise.success : exercise.failure;
  feedback.style.display = "block";
}

function resetExercise(article, exercise) {
  const textarea = article.querySelector("textarea");
  const feedback = article.querySelector(".exercise__feedback");
  if (textarea) {
    textarea.value = exercise.starterCode;
  }
  if (feedback) {
    feedback.style.display = "none";
    feedback.textContent = "";
  }
  previewExercise(article, exercise);
}

function toggleSolution(article, button) {
  const details = article.querySelector("details.exercise__solution");
  if (!details) return;
  const isOpen = details.hasAttribute("open");
  if (isOpen) {
    details.removeAttribute("open");
    button.innerHTML = "Afficher le corrig&eacute;";
  } else {
    details.setAttribute("open", "open");
    button.innerHTML = "Masquer le corrig&eacute;";
  }
}

function copySolution(solution, trigger) {
  const text = solution.replace(/<br\s*\/>/g, "\n");
  navigator.clipboard
    .writeText(text)
    .then(() => {
      trigger.textContent = "Copi? !";
      setTimeout(() => {
        trigger.textContent = "Copier le corrig?";
      }, 2000);
    })
    .catch(() => {
      trigger.textContent = "Copie impossible";
    });
}

function renderQuiz(root) {
  quizQuestions.forEach((quiz) => {
    const block = document.createElement("section");
    block.className = "quiz-block";
    block.innerHTML = `
      <header>
        <h3>${quiz.question}</h3>
        <p class="tag">${quiz.category}</p>
      </header>
      <form>
        <fieldset>
          <legend class="visually-hidden">${quiz.question}</legend>
          <div class="quiz-options">
            ${quiz.options
              .map(
                (option, index) => `
                  <label>
                    <input
                      type="radio"
                      name="quiz-${quiz.id}"
                      value="${index}"
                      required
                    />
                    <span>${option.label}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </fieldset>
        <button type="submit" class="btn btn--surface">V&eacute;rifier</button>
      </form>
      <div class="quiz-feedback" role="status" aria-live="polite"></div>
    `;

    const form = block.querySelector("form");
    const feedback = block.querySelector(".quiz-feedback");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const selected = formData.get(`quiz-${quiz.id}`);
      if (selected === null) return;
      const option = quiz.options[Number(selected)];
      const isCorrect = option?.correct ?? false;
      if (feedback) {
        feedback.dataset.state = isCorrect ? "success" : "error";
        feedback.style.display = "block";
        feedback.innerHTML = `${isCorrect ? "Bonne r&eacute;ponse&nbsp;!" : "R&eacute;ponse incorrecte."} ${quiz.explanation}`;
      }
    });

    root.appendChild(block);
  });
}

function renderFlashcards(root) {
  flashcards.forEach((card) => {
    const container = document.createElement("article");
    container.className = "flashcard";
    container.tabIndex = 0;
    container.innerHTML = `
      <span class="tag">${card.tag}</span>
      <div class="flashcard__label">${card.front}</div>
      <div class="flashcard__answer" hidden>${card.back}</div>
    `;

    const answer = container.querySelector(".flashcard__answer");
    const label = container.querySelector(".flashcard__label");

    const toggle = () => {
      if (!answer || !label) return;
      const isHidden = answer.hasAttribute("hidden");
      if (isHidden) {
        answer.removeAttribute("hidden");
        label.setAttribute("aria-hidden", "true");
      } else {
        answer.setAttribute("hidden", "hidden");
        label.removeAttribute("aria-hidden");
      }
    };

    container.addEventListener("click", toggle);
    container.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });

    root.appendChild(container);
  });
}

function renderInterview(root) {
  interviewQuestions.forEach((item) => {
    const card = document.createElement("article");
    card.className = "qa-item";
    card.innerHTML = `
      <p class="tag">${item.focus}</p>
      <h3>${item.title}</h3>
      <p>${item.answer}</p>
    `;
    root.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateLastUpdate();

  const exercisesRoot = document.getElementById("exercises-container");
  if (exercisesRoot) {
    renderExercises(exercisesRoot);
  }

  const quizRoot = document.getElementById("quiz-container");
  if (quizRoot) {
    renderQuiz(quizRoot);
  }

  const flashcardsRoot = document.getElementById("flashcards-list");
  if (flashcardsRoot) {
    renderFlashcards(flashcardsRoot);
  }

  const interviewRoot = document.getElementById("interview-qa");
  if (interviewRoot) {
    renderInterview(interviewRoot);
  }
});
