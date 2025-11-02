const exercises = [
  {
    id: "exercice-semantique",
    title: "S&eacute;mantique HTML &mdash; mise en page pas &agrave; pas",
    level: "Fondamentaux",
    focus: "Structure s&eacute;mantique ? landmarks RGAA",
    context:
      "Une page de destination est compos&eacute;e uniquement de <div> sans rep&egrave;res s&eacute;mantiques ni navigation clavier structur&eacute;e.",
    goal:
      "Ajouter progressivement une structure s&eacute;mantique compl&egrave;te (landmarks, titres, navigation et contenu principal).",
    steps: [
      {
        title: "&Eacute;tape 1 ? Landmarks",
        description:
          "Remplacez les <code>&lt;div&gt;</code> g&eacute;n&eacute;riques par les balises structurelles <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> et <code>&lt;footer&gt;</code>."
      },
      {
        title: "&Eacute;tape 2 ? Titres et hi&eacute;rarchie",
        description:
          "Assurez-vous que la page contient un <code>&lt;h1&gt;</code> unique et que les sections logiques sont introduites par des titres structur&eacute;s."
      },
      {
        title: "&Eacute;tape 3 ? Navigation accessible",
        description:
          "Ajoutez un lien d'&eacute;vitement et un libell&eacute; accessible sur la navigation (par exemple <code>aria-label=&quot;Navigation principale&quot;</code>)."
      }
    ],
    starterCode: `<div class="page">
  <div class="top">
    <div class="logo">AccessiWorld</div>
    <div class="menu">
      <a href="#">Accueil</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </div>
  </div>
  <div class="content">
    <div class="title">Construisons un web inclusif</div>
    <div class="intro">
      Cr&eacute;ons des exp&eacute;riences accessibles et conformes au RGAA pour tous vos utilisateurs.
    </div>
  </div>
  <div class="bottom">&copy; 2025 AccessiWorld</div>
</div>`,
    solution: `<a class="skip-link" href="#contenu-principal">Passer au contenu</a>
<header class="hero-header">
  <div class="logo">AccessiWorld</div>
  <nav aria-label="Navigation principale">
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
      Cr&eacute;ons des exp&eacute;riences accessibles et conformes au RGAA pour tous vos utilisateurs.
    </p>
  </article>
</main>
<footer>
  <p>&copy; 2025 AccessiWorld</p>
</footer>`,
    success:
      "Excellent : la page est s&eacute;mantiquement structur&eacute;e, les landmarks sont pr&eacute;sents et la navigation est accessible.",
    failure:
      "V&eacute;rifiez la pr&eacute;sence des landmarks (<code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code>), d'un <code>h1</code> unique et d'un lien d'&eacute;vitement.",
    validator: (code) => {
      const str = code.toLowerCase();
      return (
        str.includes("<header") &&
        str.includes("<nav") &&
        str.includes("aria-label") &&
        str.includes("skip-link") &&
        str.includes("<main") &&
        str.includes("<footer") &&
        str.includes("<h1")
      );
    },
  },
  {
    id: "exercice-alt",
    title: "Image bouton &mdash; alternative pertinente",
    level: "Fondamentaux",
    focus: "Th&egrave;me 1 &middot; Alternatives textuelles",
    context:
      "Un bouton illustr&eacute; par une photo de chien guide ouvre un formulaire de contact d'adoption.",
    goal:
      "D&eacute;crire l'action r&eacute;elle d&eacute;clench&eacute;e par l'image tout en conservant la coh&eacute;rence visuelle.",
    starterCode: `<button type="button">
  <img src="chien-guide.png" width="160" height="120">
  <span class="visually-hidden">Contact</span>
</button>`,
    solution: `<button type="button" class="cta-contact">
  <img src="chien-guide.png" alt="Ouvrir le formulaire de demande d'adoption d'un chien guide" width="160" height="120">
  <span class="visually-hidden">Contact</span>
</button>`,
    success:
      "Parfait&nbsp;: l'alternative d&eacute;crit correctement l'action d&eacute;clench&eacute;e par le bouton visuel.",
    failure:
      "Ajoutez un attribut <code>alt</code> descriptif de l'action (formulaire, adoption, contact).",
    validator: (code) => {
      const normalised = code.toLowerCase().replace(/\s+/g, " ");
      return (
        normalised.includes("<img") &&
        normalised.includes("alt=") &&
        !normalised.includes("alt=\"\"") &&
        (normalised.includes("formulaire") || normalised.includes("adoption") || normalised.includes("contact"))
      );
    },
  },
  {
    id: "exercice-formulaire",
    title: "Champ e-mail &mdash; &eacute;tiquettes et erreurs",
    level: "Interm&eacute;diaire",
    focus: "Th&egrave;me 11 &middot; Formulaires",
    context:
      "Un champ obligatoire se contente d'un placeholder et d'un message d'erreur g&eacute;n&eacute;rique.",
    goal:
      "Relier label, aide et message d'erreur afin qu'ils soient annonc&eacute;s aux aides techniques.",
    starterCode: `<form class="newsletter">
  <input type="email" name="email" placeholder="Votre email" required>
  <span class="error">Invalide</span>
  <button type="submit">Envoyer</button>
</form>`,
    solution: `<form class="newsletter" novalidate>
  <label for="email">Adresse e-mail professionnelle</label>
  <input id="email" type="email" name="email" aria-describedby="email-help email-error" required>
  <span id="email-help">Utilisez le format prenom.nom@domaine.fr.</span>
  <span id="email-error" class="error" role="alert">Veuillez saisir une adresse valide.</span>
  <button type="submit">Envoyer</button>
</form>`,
    success:
      "Excellent&nbsp;: le champ, l'aide et l'erreur sont reli&eacute;s pour une annonce vocale claire.",
    failure:
      "Associez <code>label</code>/<code>for</code>, un identifiant sur l'input et <code>aria-describedby</code> pointant vers l'aide et l'erreur.",
    validator: (code) => {
      const str = code.toLowerCase();
      return (
        str.includes("<label") &&
        str.includes("for=\"email\"") &&
        str.includes("id=\"email\"") &&
        str.includes("aria-describedby") &&
        str.includes("role=\"alert\"")
      );
    },
  },
  {
    id: "exercice-table",
    title: "Tableau de disponibilit&eacute;s",
    level: "Interm&eacute;diaire",
    focus: "Th&egrave;me 5 &middot; Tableaux",
    context:
      "Les en-t&ecirc;tes de colonnes et de lignes sont absents, la lecture crois&eacute;e est impossible.",
    goal:
      "Structurer le tableau avec <code>caption</code>, <code>thead</code>/<code>tbody</code> et port&eacute;e des cellules d'en-t&ecirc;te.",
    starterCode: `<table class="planning">
  <tr>
    <td></td>
    <td>Lundi</td>
    <td>Mardi</td>
  </tr>
  <tr>
    <td>Accueil</td>
    <td>9h-17h</td>
    <td>9h-17h</td>
  </tr>
  <tr>
    <td>Support</td>
    <td>10h-18h</td>
    <td>10h-18h</td>
  </tr>
</table>`,
    solution: `<table class="planning">
  <caption>Disponibilit&eacute;s de l'&eacute;quipe accessibilit&eacute;</caption>
  <thead>
    <tr>
      <th scope="col">P&ocirc;le</th>
      <th scope="col">Lundi</th>
      <th scope="col">Mardi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Accueil</th>
      <td>9h-17h</td>
      <td>9h-17h</td>
    </tr>
    <tr>
      <th scope="row">Support</th>
      <td>10h-18h</td>
      <td>10h-18h</td>
    </tr>
  </tbody>
</table>`,
    success:
      "Parfait&nbsp;: lecteurs d'&eacute;cran et loupe annoncent correctement lignes et colonnes.",
    failure:
      "Ajoutez <code>caption</code>, <code>thead</code>/<code>tbody</code> et les attributs <code>scope=\"col\"</code> / <code>scope=\"row\"</code>.",
    validator: (code) => {
      const str = code.toLowerCase();
      return (
        str.includes("<caption") &&
        str.includes("<thead") &&
        str.includes("scope=\"col\"") &&
        str.includes("scope=\"row\"")
      );
    },
  },
  {
    id: "exercice-live",
    title: "Message de confirmation dynamique",
    level: "Avanc&eacute;",
    focus: "Th&egrave;me 7 &middot; Scripts et ARIA",
    context:
      "Une confirmation s'affiche apr&egrave;s l'envoi du formulaire mais rien n'est lu vocalement.",
    goal:
      "Ajouter une r&eacute;gion vivante adapt&eacute;e au niveau d'urgence du message.",
    starterCode: `<form id="demo-form">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" required>
  <button type="submit">Envoyer</button>
</form>
<p id="confirmation" class="hidden">Votre demande a &eacute;t&eacute; transmise.</p>`,
    solution: `<form id="demo-form">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" required>
  <button type="submit">Envoyer</button>
</form>
<p id="confirmation" role="status" aria-live="polite" class="hidden">Votre demande a &eacute;t&eacute; transmise.</p>`,
    success:
      "Tr&egrave;s bien&nbsp;: le message est diffus&eacute; automatiquement via <code>aria-live</code> polite.",
    failure:
      "Ajoutez <code>aria-live</code> (polite ou assertive) et <code>role=\"status\"</code> ou <code>role=\"alert\"</code> sur la zone.",
    validator: (code) => {
      const str = code.toLowerCase();
      return (
        str.includes("aria-live") &&
        (str.includes("polite") || str.includes("assertive")) &&
        (str.includes("role=\"status\"") || str.includes("role=\"alert\""))
      );
    },
  },
  {
    id: "exercice-navigation",
    title: "Navigation clavier &amp; lien d'&eacute;vitement",
    level: "Avanc&eacute;",
    focus: "Th&egrave;me 12 &middot; Navigation",
    context:
      "La page ne propose pas de raccourci clavier pour atteindre le contenu et la navigation n'est pas nomm&eacute;e.",
    goal:
      "Mettre en place un lien d'&eacute;vitement visible au focus et nommer la zone de navigation.",
    starterCode: `<header>
  <nav>
    <ul>
      <li><a href="#">Accueil</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>Bienvenue</h1>
</main>`,
    solution: `<a class="skip-link" href="#contenu">Aller au contenu principal</a>
<header>
  <nav aria-label="Navigation principale">
    <ul>
      <li><a href="#">Accueil</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
<main id="contenu">
  <h1>Bienvenue</h1>
</main>`,
    success:
      "Navigation pr&ecirc;te&nbsp;: l'utilisateur peut atteindre le contenu et la navigation est annonc&eacute;e.",
    failure:
      "Ajoutez un lien d'&eacute;vitement ciblant le contenu principal et un <code>aria-label</code> sur <code>&lt;nav&gt;</code>.",
    validator: (code) => {
      const str = code.toLowerCase();
      return str.includes("skip-link") && str.includes("aria-label") && str.includes("main id=");
    },
  },
];

const quizQuestions = [
  {
    id: "quiz-contrast",
    question:
      "Quel contraste minimum le RGAA exige-t-il pour un texte courant sur un fond uni&nbsp;?",
    answers: [
      { value: "21", label: "2&nbsp;:&nbsp;1", correct: false },
      { value: "31", label: "3&nbsp;:&nbsp;1", correct: false },
      { value: "45", label: "4,5&nbsp;:&nbsp;1", correct: true },
      { value: "71", label: "7&nbsp;:&nbsp;1", correct: false },
    ],
    explanation:
      "Le crit&egrave;re RGAA 3.2 reprend WCAG 1.4.3&nbsp;: 4,5&nbsp;:&nbsp;1 pour le texte normal et 3&nbsp;:&nbsp;1 pour le texte large.",
  },
  {
    id: "quiz-alt",
    question: "Quand est-il pertinent de laisser un attribut <code>alt</code> vide&nbsp;?",
    answers: [
      { value: "decor", label: "Lorsque l'image est strictement d&eacute;corative", correct: true },
      { value: "info", label: "Quand l'image contient une information essentielle", correct: false },
      { value: "cta", label: "Pour les ic&ocirc;nes de bouton sans texte visible", correct: false },
      { value: "logo", label: "Pour le logo du site", correct: false },
    ],
    explanation:
      "Un <code>alt</code> vide n'est acceptable que si l'image est pure d&eacute;coration et qu'aucune information n'est perdue.",
  },
  {
    id: "quiz-landmarks",
    question: "Combien d'&eacute;l&eacute;ments <code>&lt;main&gt;</code> une page conforme peut-elle contenir&nbsp;?",
    answers: [
      { value: "zero", label: "Aucun", correct: false },
      { value: "one", label: "Un seul", correct: true },
      { value: "two", label: "Deux, un par section", correct: false },
      { value: "multi", label: "Autant que n&eacute;cessaire", correct: false },
    ],
    explanation: "La zone principale doit &ecirc;tre unique pour garantir un rep&egrave;re clair aux aides techniques.",
  },
  {
    id: "quiz-form",
    question: "Quel dispositif respecte le crit&egrave;re RGAA 11.9 sur l'aide &agrave; la saisie&nbsp;?",
    answers: [
      { value: "placeholder", label: "Un placeholder d&eacute;taill&eacute; uniquement", correct: false },
      { value: "hint", label: "Un texte reli&eacute; via <code>aria-describedby</code>", correct: true },
      { value: "color", label: "La coloration du champ en rouge", correct: false },
      { value: "popup", label: "Une fen&ecirc;tre modale non focusable", correct: false },
    ],
    explanation:
      "Les aides doivent &ecirc;tre textuelles, accessibles et reli&eacute;es au champ (aria-describedby, aria-details).",
  },
  {
    id: "quiz-focus",
    question: "Quelle strat&eacute;gie garantit un ordre de tabulation coh&eacute;rent&nbsp;?",
    answers: [
      { value: "tabindex10", label: "Utiliser <code>tabindex=&quot;10&quot;</code> sur les &eacute;l&eacute;ments cl&eacute;s", correct: false },
      { value: "dom", label: "Aligner l'ordre du DOM et l'ordre visuel", correct: true },
      { value: "css", label: "Inverser l'ordre avec flexbox", correct: false },
      { value: "skip", label: "Supprimer les liens d'&eacute;vitement", correct: false },
    ],
    explanation:
      "L'ordre du focus d&eacute;pend de l'ordre du DOM&nbsp;: gardez un DOM logique et &eacute;vitez les <code>tabindex</code> positifs.",
  },
  {
    id: "quiz-media",
    question:
      "Quel dispositif est obligatoire pour une vid&eacute;o contenant des dialogues selon le RGAA&nbsp;?",
    answers: [
      { value: "sub", label: "Sous-titres synchronis&eacute;s", correct: true },
      { value: "chapter", label: "Chapitres interactifs", correct: false },
      { value: "poster", label: "Image de couverture avec <code>alt</code>", correct: false },
      { value: "transcript", label: "Transcription uniquement", correct: false },
    ],
    explanation: "Les vid&eacute;os avec dialogues doivent fournir des sous-titres synchronis&eacute;s (crit&egrave;re 4.1).",
  },
];

const flashcards = [
  {
    term: "Langue du document",
    when: "D&eacute;clarer l'attribut <code>lang</code> sur <code>&lt;html&gt;</code> pour informer les aides techniques.",
    avoid: "Oublier les changements de langue pour des citations &eacute;trang&egrave;res.",
    tip: "Utilisez <code>lang=&quot;fr&quot;</code> sur <code>&lt;html&gt;</code> et <code>lang=&quot;en&quot;</code> (ou autre) sur les segments concern&eacute;s.",
  },
  {
    term: "aria-live",
    when: "Notifier une mise &agrave; jour dynamique (r&eacute;sultat, confirmation).",
    avoid: "Appliquer <code>aria-live</code> sur des zones changeant en continu.",
    tip: "Pr&eacute;f&eacute;rez <code>polite</code> pour &eacute;viter de couper la lecture en cours.",
  },
  {
    term: "role=button",
    when: "Dernier recours si aucun &eacute;l&eacute;ment natif ne convient.",
    avoid: "L'utiliser &agrave; la place d'un <code>&lt;button&gt;</code> disponible.",
    tip: "Ajoutez gestion clavier (Entr&eacute;e, Espace) et <code>aria-pressed</code> pour les boutons &agrave; &eacute;tat.",
  },
  {
    term: "Focus visible",
    when: "Toujours&nbsp;: tout &eacute;l&eacute;ment focusable doit afficher un focus contrast&eacute;.",
    avoid: "Supprimer <code>outline</code> sans alternative accessible.",
    tip: "Utilisez <code>:focus-visible</code> pour un rendu propre souris/clavier.",
  },
  {
    term: "Liens d'&eacute;vitement",
    when: "Pages longues ou menus r&eacute;p&eacute;titifs.",
    avoid: "Les masquer via <code>display:none</code> (le focus serait impossible).",
    tip: "Positionnez-les avant le header, rendez-les visibles au focus.",
  },
];

const interviewQA = [
  {
    question: "Comment menez-vous un audit RGAA complet sur une application riche&nbsp;?",
    answer:
      "Je combine une analyse documentaire, un audit manuel th&eacute;matique et des tests utilisateurs cibl&eacute;s.",
    bullets: [
      "D&eacute;finir le p&eacute;rim&egrave;tre, les parcours critiques et l'&eacute;chantillon repr&eacute;sentatif.",
      "&Eacute;valuer chaque crit&egrave;re en documentant r&egrave;gle, &eacute;cart, impact et correction attendue.",
      "Prioriser les actions selon la gravit&eacute; et orchestrer un plan de rem&eacute;diation.",
      "Clore par une d&eacute;claration d'accessibilit&eacute; mise &agrave; jour et un plan pluriannuel.",
    ],
  },
  {
    question: "Quelles pratiques int&eacute;grez-vous dans un cycle agile pour garantir l'accessibilit&eacute;&nbsp;?",
    answer:
      "Je rends l'accessibilit&eacute; visible &agrave; chaque sprint via crit&egrave;res d'acceptation, revues et tests int&eacute;gr&eacute;s.",
    bullets: [
      "Definition of done incluant contraste, navigation clavier, messages d'erreur.",
      "Revues de design/code avec checklist RGAA partag&eacute;e.",
      "Tests automatis&eacute;s (axe-core), revues NVDA/VoiceOver, bin&ocirc;mes design-dev.",
      "R&eacute;trospectives d&eacute;di&eacute;es pour traiter la dette et partager les retours utilisateurs.",
    ],
  },
  {
    question: "Donnez trois erreurs critiques souvent d&eacute;tect&eacute;es en audit RGAA.",
    answer:
      "Alternatives manquantes, formulaires non labellis&eacute;s et focus clavier absent.",
    bullets: [
      "Images ou ic&ocirc;nes CTA sans description.",
      "Champs dynamiques sans <code>aria-live</code>/<code>role=\"alert\"</code> pour les erreurs.",
      "Modales qui pi&egrave;gent le focus &agrave; l'ouverture ou &agrave; la fermeture.",
    ],
  },
  {
    question: "Quelle approche adoptez-vous pour accompagner un client vers la conformit&eacute;&nbsp;?",
    answer:
      "Je construis une trajectoire m&ecirc;lant quick wins, transfert de comp&eacute;tences et gouvernance durable.",
    bullets: [
      "Audit initial et priorisation des chantiers critiques.",
      "Coaching des &eacute;quipes (design, d&eacute;veloppement, contenu) avec ateliers pratiques.",
      "Suivi d'indicateurs, mise &agrave; jour de la feuille de route et communication r&eacute;guli&egrave;re.",
    ],
  },
  {
    question: "Comment expliquez-vous les b&eacute;n&eacute;fices business de l'accessibilit&eacute; &agrave; un d&eacute;cideur&nbsp;?",
    answer:
      "Je d&eacute;montre l'impact sur l'exp&eacute;rience client, la conformit&eacute; l&eacute;gale et la performance produit.",
    bullets: [
      "+15&nbsp;% de clients potentiels concern&eacute;s par un handicap permanent ou temporaire.",
      "R&eacute;duction des co&ucirc;ts de maintenance en int&eacute;grant l'accessibilit&eacute; d&egrave;s la conception.",
      "Am&eacute;lioration SEO/performance via une structure s&eacute;mantique claire.",
    ],
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPreviewDocument(markup) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aper&ccedil;u</title>
    <style>
      :root { color-scheme: light dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: system-ui, sans-serif;
        background: #f9fafb;
        color: #0f172a;
        line-height: 1.6;
        padding: 1.25rem;
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        clip: rect(0,0,0,0);
        overflow: hidden;
      }
      .skip-link {
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        padding: 0.4rem 0.75rem;
        background: #2563eb;
        color: #fff;
        text-decoration: none;
        border-radius: 0.5rem;
      }
      .skip-link:not(:focus) {
        transform: translateY(-150%);
      }
      a:focus {
        outline: 3px solid #2563eb;
        outline-offset: 2px;
      }
    </style>
  </head>
  <body>${markup}</body>
</html>`;
}

function renderExercises() {
  const container = document.getElementById("exercises-container");
  if (!container) return;

  exercises.forEach((exercise) => {
    const card = document.createElement("article");
    card.className = "exercise-card";

    const title = document.createElement("h3");
    title.innerHTML = exercise.title;
    card.appendChild(title);

    const meta = document.createElement("p");
    meta.innerHTML = `<strong>Niveau :</strong> ${exercise.level} &mdash; <strong>Focus :</strong> ${exercise.focus}`;
    card.appendChild(meta);

    const context = document.createElement("p");
    context.innerHTML = exercise.context;
    card.appendChild(context);

    const goal = document.createElement("p");
    goal.innerHTML = `<strong>Objectif :</strong> ${exercise.goal}`;
    card.appendChild(goal);

    if (exercise.steps?.length) {
      const stepsList = document.createElement("ol");
      stepsList.className = "exercise-steps";
      exercise.steps.forEach((step) => {
        const stepItem = document.createElement("li");
        const stepTitle = document.createElement("strong");
        stepTitle.innerHTML = step.title;
        stepItem.appendChild(stepTitle);

        if (step.description) {
          const stepDescription = document.createElement("p");
          stepDescription.innerHTML = step.description;
          stepItem.appendChild(stepDescription);
        }

        stepsList.appendChild(stepItem);
      });
      card.appendChild(stepsList);
    }

    const starter = document.createElement("details");
    starter.innerHTML = `<summary>Voir le code initial</summary><pre><code>${escapeHtml(
      exercise.starterCode
    )}</code></pre>`;
    card.appendChild(starter);

    const editor = document.createElement("div");
    editor.className = "exercise-editor";

    const textarea = document.createElement("textarea");
    textarea.value = exercise.starterCode;
    textarea.setAttribute("aria-label", `Zone de correction pour ${exercise.title.replace(/<[^>]+>/g, "")}`);

    const preview = document.createElement("div");
    preview.className = "exercise-preview";

    const previewHeader = document.createElement("header");
    previewHeader.innerHTML = "Aper&ccedil;u accessible";

    const iframe = document.createElement("iframe");
    iframe.className = "exercise-iframe";
    iframe.setAttribute("title", `Apercu du code pour ${exercise.title.replace(/<[^>]+>/g, "")}`);
    iframe.srcdoc = buildPreviewDocument(exercise.starterCode);

    preview.append(previewHeader, iframe);
    editor.append(textarea, preview);
    card.appendChild(editor);

    const actions = document.createElement("div");
    actions.className = "exercise-actions";

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "btn btn--primary";
    checkButton.textContent = "Valider";

    const runButton = document.createElement("button");
    runButton.type = "button";
    runButton.className = "btn btn--tertiary";
    runButton.innerHTML = "Ex&eacute;cuter le code";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "btn btn--secondary";
    resetButton.innerHTML = "R&eacute;initialiser";

    const solutionButton = document.createElement("button");
    solutionButton.type = "button";
    solutionButton.className = "btn btn--secondary";
    solutionButton.innerHTML = "Afficher le corrig&eacute;";

    actions.append(checkButton, runButton, resetButton, solutionButton);
    card.appendChild(actions);

    const feedback = document.createElement("div");
    feedback.className = "exercise-feedback";
    feedback.setAttribute("aria-live", "polite");
    card.appendChild(feedback);

    const solution = document.createElement("div");
    solution.className = "solution";
    solution.innerHTML = `<strong>Corrig&eacute; propos&eacute; :</strong><pre><code>${escapeHtml(
      exercise.solution
    )}</code></pre>`;
    card.appendChild(solution);

    checkButton.addEventListener("click", () => {
      const isValid = exercise.validator(textarea.value);
      if (isValid) {
        feedback.innerHTML = exercise.success;
        feedback.classList.remove("error");
        feedback.classList.add("success");
      } else {
        feedback.innerHTML = exercise.failure;
        feedback.classList.remove("success");
        feedback.classList.add("error");
      }
    });

    runButton.addEventListener("click", () => {
      iframe.srcdoc = buildPreviewDocument(textarea.value);
      feedback.innerHTML = "Aper&ccedil;u mis &agrave; jour. Testez la navigation clavier et le contraste.";
      feedback.classList.remove("error");
      feedback.classList.add("success");
    });

    resetButton.addEventListener("click", () => {
      textarea.value = exercise.starterCode;
      iframe.srcdoc = buildPreviewDocument(exercise.starterCode);
      feedback.innerHTML = "";
      feedback.classList.remove("success", "error");
      solution.style.display = "none";
      solutionButton.innerHTML = "Afficher le corrig&eacute;";
    });

    solutionButton.addEventListener("click", () => {
      const open = solution.style.display === "block";
      solution.style.display = open ? "none" : "block";
      solutionButton.innerHTML = open ? "Afficher le corrig&eacute;" : "Masquer le corrig&eacute;";
      if (!open) {
        iframe.srcdoc = buildPreviewDocument(exercise.solution);
      }
    });

    container.appendChild(card);
  });
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  quizQuestions.forEach((question) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-card";

    const legend = document.createElement("legend");
    legend.innerHTML = question.question;
    fieldset.appendChild(legend);

    question.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.setAttribute("for", `${question.id}-${answer.value}`);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.id = `${question.id}-${answer.value}`;
      input.value = answer.value;

      const span = document.createElement("span");
      span.innerHTML = answer.label;

      label.append(input, span);
      fieldset.appendChild(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "quiz-feedback";
    feedback.setAttribute("aria-live", "polite");
    fieldset.appendChild(feedback);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn--primary";
    button.innerHTML = "V&eacute;rifier";
    fieldset.appendChild(button);

    button.addEventListener("click", () => {
      const selected = fieldset.querySelector(`input[name="${question.id}"]:checked`);
      if (!selected) {
        feedback.innerHTML = "S&eacute;lectionnez une r&eacute;ponse avant de valider.";
        feedback.classList.remove("success");
        feedback.classList.add("error");
        return;
      }

      const chosen = question.answers.find((answer) => answer.value === selected.value);
      if (chosen?.correct) {
        feedback.innerHTML = `Bonne r&eacute;ponse&nbsp;! ${question.explanation}`;
        feedback.classList.remove("error");
        feedback.classList.add("success");
      } else {
        feedback.innerHTML = `Ce n'est pas exact. ${question.explanation}`;
        feedback.classList.remove("success");
        feedback.classList.add("error");
      }
    });

    container.appendChild(fieldset);
  });
}

function renderFlashcards() {
  const container = document.getElementById("flashcards-list");
  if (!container) return;

  flashcards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "flashcard-item";

    const title = document.createElement("h4");
    title.innerHTML = card.term;
    article.appendChild(title);

    const when = document.createElement("p");
    when.innerHTML = `<strong>&Agrave; utiliser :</strong> ${card.when}`;
    article.appendChild(when);

    const avoid = document.createElement("p");
    avoid.innerHTML = `<strong>&Agrave; &eacute;viter :</strong> ${card.avoid}`;
    article.appendChild(avoid);

    const tip = document.createElement("p");
    tip.innerHTML = `<strong>Astuce :</strong> ${card.tip}`;
    article.appendChild(tip);

    container.appendChild(article);
  });
}

function renderInterviewQA() {
  const container = document.getElementById("interview-qa");
  if (!container) return;

  interviewQA.forEach((item) => {
    const card = document.createElement("article");
    card.className = "qa-card";

    const title = document.createElement("h3");
    title.innerHTML = item.question;
    card.appendChild(title);

    const answer = document.createElement("p");
    answer.innerHTML = `<strong>R&eacute;ponse structur&eacute;e :</strong> ${item.answer}`;
    card.appendChild(answer);

    if (item.bullets?.length) {
      const intro = document.createElement("p");
      intro.innerHTML = "<strong>Points cl&eacute;s &agrave; couvrir :</strong>";
      card.appendChild(intro);

      const list = document.createElement("ul");
      item.bullets.forEach((bullet) => {
        const li = document.createElement("li");
        li.innerHTML = bullet;
        list.appendChild(li);
      });
      card.appendChild(list);
    }

    container.appendChild(card);
  });
}

function setupAuditForm() {
  const form = document.getElementById("audit-form");
  const feedback = document.getElementById("audit-feedback");
  if (!form || !feedback) return;

  const expected = new Set(["contrast", "label", "focus", "carrousel"]);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const selected = new Set(formData.getAll("audit"));

    if (selected.size === 0) {
      feedback.innerHTML = "Cochez au moins une non-conformit&eacute; d&eacute;tect&eacute;e.";
      feedback.className = "feedback error";
      return;
    }

    const isExact = selected.size === expected.size && [...selected].every((value) => expected.has(value));

    if (isExact) {
      feedback.innerHTML = "Bravo, vous avez identifi&eacute; l'ensemble des &eacute;carts critiques (contraste, labels, focus, carrousel).";
      feedback.className = "feedback success";
    } else {
      feedback.innerHTML = "Revoyez vos priorit&eacute;s&nbsp;: contraste, labels, focus et contr&ocirc;le des carrousels restent essentiels.";
      feedback.className = "feedback error";
    }
  });
}

function updateFooterDate() {
  const span = document.getElementById("last-update");
  if (!span) return;
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  span.textContent = formatter.format(new Date());
}

document.addEventListener("DOMContentLoaded", () => {
  renderExercises();
  renderQuiz();
  renderFlashcards();
  renderInterviewQA();
  setupAuditForm();
  updateFooterDate();
});
