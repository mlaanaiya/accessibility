const exercises = [
  {
    id: "exercice-alt",
    title: "Rendre une image informative accessible",
    context:
      "Une image d'un chien guide est utilis?e comme bouton d'acc?s au formulaire de contact.",
    instructions:
      "Ajoutez une alternative textuelle pertinente et garantissez que le bouton reste compr?hensible pour tous.",
    starterCode: `<button type="button">
  <img src="chien-guide.png" />
  <span class="visually-hidden">Contact</span>
</button>`,
    solution: `<button type="button" class="cta-contact">
  <img src="chien-guide.png" alt="Acc?der au formulaire de contact pour adopter un chien guide" />
  <span class="visually-hidden">Contact</span>
</button>`,
    success:
      "Bravo ! L'image poss?de une alternative descriptive qui refl?te l'action du bouton.",
    failure:
      "Assurez-vous de fournir un attribut alt explicite d?crivant l'action : ici, l'acc?s au formulaire de contact.",
    validator: (code) => {
      const normalised = code.toLowerCase().replace(/\s+/g, " ");
      return (
        normalised.includes("<img") &&
        normalised.includes("alt=") &&
        !normalised.includes("alt=\"\"") &&
        (normalised.includes("contact") || normalised.includes("formulaire"))
      );
    },
  },
  {
    id: "exercice-formulaire",
    title: "Associer correctement un label et un champ",
    context:
      "Un champ d'email ne poss?de pas d'?tiquette accessible et renvoie une erreur non descriptive.",
    instructions:
      "Ajoutez une ?tiquette li?e au champ, un message d'aide et un retour d'erreur accessible.",
    starterCode: `<form>
  <input type="email" name="email" placeholder="Votre email" required />
  <span class="error">Invalide</span>
  <button type="submit">Envoyer</button>
</form>`,
    solution: `<form novalidate>
  <label for="email">Adresse e-mail professionnelle</label>
  <input id="email" type="email" name="email" aria-describedby="email-help email-error" required />
  <span id="email-help">Nous vous enverrons la confirmation de votre entretien.</span>
  <span id="email-error" class="error" role="alert">Veuillez saisir une adresse e-mail valide (ex. prenom@domaine.fr).</span>
  <button type="submit">Envoyer</button>
</form>`,
    success:
      "Excellent : le champ est correctement ?tiquet? et les aides sont annonc?es par les lecteurs d'?cran.",
    failure:
      "Recherchez une association label/for et l'utilisation d'aria-describedby pour relier aides et erreurs.",
    validator: (code) => {
      const normalised = code.toLowerCase();
      const hasLabel = normalised.includes("<label") && normalised.includes("for=\"email\"");
      const hasId = normalised.includes("<input") && normalised.includes("id=\"email\"");
      const hasDescribedBy = normalised.includes("aria-describedby") && normalised.includes("email-error");
      const hasRoleAlert = normalised.includes("role=\"alert\"");
      return hasLabel && hasId && hasDescribedBy && hasRoleAlert;
    },
  },
  {
    id: "exercice-table",
    title: "Structurer un tableau de donn?es",
    context:
      "Un tableau de disponibilit?s ne pr?cise pas la nature des cellules d'en-t?te et l'ordre de lecture n'est pas clair.",
    instructions:
      "D?finissez correctement les en-t?tes de colonne et de ligne et annoncez les mises ? jour de disponibilit?.",
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
  <caption>Disponibilit?s de l'?quipe accessibilit?</caption>
  <thead>
    <tr>
      <th scope="col">P?le</th>
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
      "Parfait : le tableau est annonc? avec un titre et les relations d'en-t?te sont clairement d?finies.",
    failure:
      "Pensez aux balises thead/tbody, ? une l?gende avec caption et aux attributs scope sur th.",
    validator: (code) => {
      const normalised = code.toLowerCase();
      return (
        normalised.includes("<caption") &&
        normalised.includes("<thead") &&
        normalised.includes("scope=\"col\"") &&
        normalised.includes("scope=\"row\"")
      );
    },
  },
  {
    id: "exercice-aria",
    title: "Annoncer dynamiquement un message",
    context:
      "Un message de confirmation appara?t apr?s l'envoi d'un formulaire, mais il n'est pas communiqu? aux lecteurs d'?cran.",
    instructions:
      "Ajoutez un m?canisme aria-live appropri? pour que les aides techniques soient inform?es du changement.",
    starterCode: `<form id="demo-form">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" required />
  <button type="submit">Envoyer</button>
</form>
<p id="confirmation" class="hidden">Votre demande a ?t? transmise.</p>`,
    solution: `<form id="demo-form">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" required />
  <button type="submit">Envoyer</button>
</form>
<p id="confirmation" role="status" aria-live="polite" class="hidden">Votre demande a ?t? transmise.</p>`,
    success:
      "Bien jou? : le message est d?sormais annonc? automatiquement par les lecteurs d'?cran.",
    failure:
      "Ajoutez un r?le ou un aria-live sur la zone de message pour garantir son annonce.",
    validator: (code) => {
      const normalised = code.toLowerCase();
      return (
        normalised.includes("aria-live") &&
        (normalised.includes("polite") || normalised.includes("assertive")) &&
        (normalised.includes("role=\"status\"") || normalised.includes("role=\"alert\""))
      );
    },
  },
];

const quizQuestions = [
  {
    id: "quiz-contrast",
    question:
      "Quel est le contraste minimum requis par le RGAA pour un texte de paragraphe sur un fond uni ?",
    answers: [
      { value: "2", label: "2:1", correct: false },
      { value: "3", label: "3:1", correct: false },
      { value: "4.5", label: "4.5:1", correct: true },
      { value: "7", label: "7:1", correct: false },
    ],
    explanation: "Le RGAA reprend le crit?re WCAG 1.4.3 : 4.5:1 pour le texte normal, 3:1 pour les titres.",
  },
  {
    id: "quiz-aria",
    question: "Quand est-il pertinent d'utiliser aria-label ?",
    answers: [
      {
        value: "always",
        label: "? chaque fois qu'un ?l?ment poss?de d?j? un texte visible",
        correct: false,
      },
      {
        value: "icon",
        label: "Pour d?crire une ic?ne sans texte visible correspondant",
        correct: true,
      },
      {
        value: "table",
        label: "Pour remplacer des en-t?tes de tableau",
        correct: false,
      },
      {
        value: "landmark",
        label: "Pour nommer les zones principales <main> et <nav>",
        correct: false,
      },
    ],
    explanation:
      "aria-label sert ? fournir un nom accessible lorsqu'il n'existe pas de texte visible pertinent, par exemple sur un bouton ic?ne.",
  },
  {
    id: "quiz-focus",
    question:
      "Quelle pratique garantit le respect du crit?re RGAA sur l'ordre de tabulation ?",
    answers: [
      {
        value: "tabindex10",
        label: "Attribuer tabindex=10 aux ?l?ments importants",
        correct: false,
      },
      {
        value: "dom",
        label: "Structurer l'ordre du DOM selon l'ordre visuel",
        correct: true,
      },
      {
        value: "css",
        label: "Utiliser flexbox pour inverser l'ordre visuel",
        correct: false,
      },
      {
        value: "skip",
        label: "?viter les liens d'?vitement pour ne pas rompre la navigation",
        correct: false,
      },
    ],
    explanation:
      "L'ordre de tabulation suit l'ordre du DOM. Les tabindex positifs doivent ?tre ?vit?s au profit d'une structure logique.",
  },
  {
    id: "quiz-media",
    question: "Quel dispositif est requis pour un contenu vid?o avec dialogues ?",
    answers: [
      {
        value: "sous-titres",
        label: "Sous-titres synchronis?s",
        correct: true,
      },
      {
        value: "chapitrage",
        label: "Chapitres interactifs",
        correct: false,
      },
      {
        value: "poster",
        label: "Image d'aper?u avec alt d?taill?",
        correct: false,
      },
      {
        value: "posteralt",
        label: "Poster anim?",
        correct: false,
      },
    ],
    explanation:
      "Le crit?re 4.1 impose des sous-titres synchronis?s pour tous les dialogues audibles.",
  },
  {
    id: "quiz-error",
    question:
      "Quel m?canisme est recommand? pour expliquer une erreur dans un formulaire RGAA ?",
    answers: [
      {
        value: "placeholder",
        label: "Afficher un placeholder rouge",
        correct: false,
      },
      {
        value: "couleur",
        label: "Changer uniquement la couleur du champ",
        correct: false,
      },
      {
        value: "description",
        label: "Fournir un message d'erreur textuel li? par aria-describedby",
        correct: true,
      },
      {
        value: "popup",
        label: "Ouvrir une fen?tre modale non focusable",
        correct: false,
      },
    ],
    explanation:
      "Le RGAA 11.10 demande une indication textuelle pr?cise reli?e au champ pour comprendre et corriger l'erreur.",
  },
];

const flashcards = [
  {
    term: "aria-live",
    when: "Annoncer des mises ? jour asynchrones (r?sultat de recherche, confirmation de formulaire).",
    avoid: "Ne pas l'utiliser sur de grandes sections changeant fr?quemment, ni sur des ?l?ments d?j? visibles.",
    tip: "Privil?giez 'polite' pour les messages non critiques afin d'?viter de couper la lecture en cours.",
  },
  {
    term: "role=button",
    when: "Rendre un ?l?ment non interactif (div, span) semblable ? un bouton en dernier recours.",
    avoid: "Ne pas appliquer si un <button> natif peut ?tre utilis?.",
    tip: "Ajoutez gestion du clavier (Enter et Espace) et aria-pressed si l'?tat est binaire.",
  },
  {
    term: "aria-hidden",
    when: "Masquer un ?l?ment aux aides techniques lorsqu'il est purement d?coratif ou dupliqu?.",
    avoid: "Ne pas masquer des ?l?ments focusables ou utiles ? la compr?hension.",
    tip: "Contr?lez l'effet de aria-hidden sur les enfants : ils h?ritent du masquage.",
  },
  {
    term: "landmark header/main/footer",
    when: "Structurer une page pour permettre la navigation rapide via les rep?res.",
    avoid: "?viter la duplication de <main> (un seul par page) et veiller ? l'ordre logique.",
    tip: "Complementer avec des titres <h2> pour d?crire les sections internes.",
  },
];

const interviewQA = [
  {
    question: "D?crivez votre m?thodologie pour auditer l'accessibilit? d'une application web.",
    answer:
      "Je combine une revue documentaire, des tests manuels bas?s sur le RGAA, puis des tests utilisateurs cibl?s.",
    bullets: [
      "D?finir le p?rim?tre et s?lectionner un ?chantillon repr?sentatif (types de pages, composants critiques).",
      "R?aliser les tests RGAA par th?me en documentant chaque non-conformit?, son impact et la piste de correction.",
      "Prioriser les corrections selon la gravit? (bloquant, majeur, mineur) et proposer un plan d'action mesurable.",
      "V?rifier les corrections et mettre ? jour la d?claration d'accessibilit? ainsi que le plan pluriannuel.",
    ],
  },
  {
    question: "Comment int?grer l'accessibilit? dans un cycle de d?veloppement agile ?",
    answer:
      "En d?finissant des crit?res d'acceptation accessibility-ready, en pairant designers et d?veloppeurs, et en automatisant les v?rifications.",
    bullets: [
      "Inclure des crit?res RGAA dans les user stories (par ex. focus visible, tests clavier).",
      "Mettre en place une checklist de revue de code et de tests exploratoires ax?s sur l'accessibilit?.",
      "Utiliser des tests automatis?s (axe-core, pa11y) en CI pour d?tecter les r?gressions ?videntes.",
      "Former r?guli?rement l'?quipe et partager une biblioth?que de composants accessibles.",
    ],
  },
  {
    question: "Citez trois erreurs r?currentes observ?es lors des audits RGAA.",
    answer: "Absence d'alternatives pertinentes, contraste insuffisant, et mauvaise gestion du focus.",
    bullets: [
      "Images utilis?es comme boutons sans texte ou avec alt g?n?rique.",
      "Choix de couleurs branding sans v?rification de contraste.",
      "Modales non focusables ou focus pi?g? apr?s fermeture.",
    ],
  },
  {
    question: "Quels outils recommandez-vous pour v?rifier la conformit? RGAA au quotidien ?",
    answer:
      "Une combinaison d'outils exploratoires (Extension Tanaguru, Wave), de tests contraste et de lecteurs d'?cran.",
    bullets: [
      "Extensions de navigateur (axe DevTools, RGAA Assistant) pour une premi?re passe rapide.",
      "Analyse de contraste avec Colour Contrast Analyser ou Stark.",
      "Tests lecteurs d'?cran (NVDA, VoiceOver) et navigation clavier syst?matique.",
    ],
  },
];

function renderExercises() {
  const container = document.getElementById("exercises-container");
  if (!container) return;

  exercises.forEach((exercise) => {
    const card = document.createElement("article");
    card.className = "exercise-card";

    const title = document.createElement("h3");
    title.textContent = exercise.title;
    card.appendChild(title);

    const context = document.createElement("p");
    context.textContent = exercise.context;
    card.appendChild(context);

    const instructions = document.createElement("p");
    instructions.innerHTML = `<strong>Consigne :</strong> ${exercise.instructions}`;
    card.appendChild(instructions);

    const starter = document.createElement("details");
    starter.innerHTML = `<summary>Voir le code initial</summary><pre><code>${
      exercise.starterCode
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
    }</code></pre>`;
    card.appendChild(starter);

    const textarea = document.createElement("textarea");
    textarea.value = exercise.starterCode;
    textarea.setAttribute("aria-label", `Zone de correction pour ${exercise.title}`);
    card.appendChild(textarea);

    const actions = document.createElement("div");
    actions.className = "exercise-actions";

    const checkButton = document.createElement("button");
    checkButton.className = "primary";
    checkButton.type = "button";
    checkButton.textContent = "Valider";

    const resetButton = document.createElement("button");
    resetButton.className = "secondary";
    resetButton.type = "button";
    resetButton.textContent = "R?initialiser";

    const showSolutionButton = document.createElement("button");
    showSolutionButton.className = "secondary";
    showSolutionButton.type = "button";
    showSolutionButton.textContent = "Afficher le corrig?";

    actions.append(checkButton, resetButton, showSolutionButton);
    card.appendChild(actions);

    const feedback = document.createElement("div");
    feedback.className = "exercise-feedback";
    feedback.setAttribute("aria-live", "polite");
    card.appendChild(feedback);

    const solution = document.createElement("div");
    solution.className = "solution";
    solution.innerHTML = `<strong>Corrig? propos? :</strong><pre><code>${
      exercise.solution
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
    }</code></pre>`;
    card.appendChild(solution);

    checkButton.addEventListener("click", () => {
      const isValid = exercise.validator(textarea.value);
      if (isValid) {
        feedback.textContent = exercise.success;
        feedback.classList.remove("error");
        feedback.classList.add("success");
      } else {
        feedback.textContent = exercise.failure;
        feedback.classList.remove("success");
        feedback.classList.add("error");
      }
    });

    resetButton.addEventListener("click", () => {
      textarea.value = exercise.starterCode;
      feedback.textContent = "";
      feedback.classList.remove("success", "error");
      solution.style.display = "none";
    });

    showSolutionButton.addEventListener("click", () => {
      const isHidden = solution.style.display === "none" || solution.style.display === "";
      solution.style.display = isHidden ? "block" : "none";
      showSolutionButton.textContent = isHidden ? "Masquer le corrig?" : "Afficher le corrig?";
    });

    container.appendChild(card);
  });
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  quizQuestions.forEach((question) => {
    const card = document.createElement("fieldset");
    card.className = "quiz-card";

    const legend = document.createElement("legend");
    legend.textContent = question.question;
    card.appendChild(legend);

    question.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.setAttribute("for", `${question.id}-${answer.value}`);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.id = `${question.id}-${answer.value}`;
      input.value = answer.value;
      input.required = true;

      label.appendChild(input);
      label.append(answer.label);
      card.appendChild(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "quiz-feedback";
    feedback.setAttribute("aria-live", "polite");
    card.appendChild(feedback);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "primary";
    button.textContent = "V?rifier";
    card.appendChild(button);

    button.addEventListener("click", () => {
      const selected = card.querySelector(`input[name="${question.id}"]:checked`);
      if (!selected) {
        feedback.textContent = "S?lectionnez une r?ponse avant de valider.";
        feedback.classList.remove("success");
        feedback.classList.add("error");
        return;
      }

      const answer = question.answers.find((item) => item.value === selected.value);
      if (answer?.correct) {
        feedback.textContent = `Bonne r?ponse ! ${question.explanation}`;
        feedback.classList.remove("error");
        feedback.classList.add("success");
      } else {
        feedback.textContent = `Ce n'est pas exact. ${question.explanation}`;
        feedback.classList.remove("success");
        feedback.classList.add("error");
      }
    });

    container.appendChild(card);
  });
}

function renderFlashcards() {
  const container = document.getElementById("flashcards-list");
  if (!container) return;

  flashcards.forEach((item) => {
    const card = document.createElement("article");
    card.className = "flashcard-item";

    const title = document.createElement("h4");
    title.textContent = item.term;
    card.appendChild(title);

    const when = document.createElement("p");
    when.innerHTML = `<strong>? utiliser :</strong> ${item.when}`;
    card.appendChild(when);

    const avoid = document.createElement("p");
    avoid.innerHTML = `<strong>? ?viter :</strong> ${item.avoid}`;
    card.appendChild(avoid);

    const tip = document.createElement("p");
    tip.innerHTML = `<strong>Astuce :</strong> ${item.tip}`;
    card.appendChild(tip);

    container.appendChild(card);
  });
}

function renderInterviewQA() {
  const container = document.getElementById("interview-qa");
  if (!container) return;

  interviewQA.forEach((item) => {
    const card = document.createElement("article");
    card.className = "qa-card";

    const title = document.createElement("h3");
    title.textContent = item.question;
    card.appendChild(title);

    const answer = document.createElement("p");
    answer.innerHTML = `<strong>R?ponse structur?e :</strong> ${item.answer}`;
    card.appendChild(answer);

    if (item.bullets?.length) {
      const listTitle = document.createElement("p");
      listTitle.innerHTML = "<strong>Points cl?s ? couvrir :</strong>";
      card.appendChild(listTitle);

      const list = document.createElement("ul");
      item.bullets.forEach((bullet) => {
        const li = document.createElement("li");
        li.textContent = bullet;
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

  const expected = new Set(["contrast", "label", "focus"]);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const choices = new Set(formData.getAll("audit"));

    if (choices.size === 0) {
      feedback.textContent = "S?lectionnez au moins un crit?re non conforme.";
      feedback.className = "feedback error";
      return;
    }

    const isExact = choices.size === expected.size && [...choices].every((value) => expected.has(value));

    if (isExact) {
      feedback.textContent = "Analyse coh?rente : vous avez identifi? les probl?mes prioritaires (contraste, labels, focus).";
      feedback.className = "feedback success";
    } else {
      feedback.textContent = "R?visez votre s?lection : concentrez-vous sur les d?fauts impactant l'exp?rience utilisateur (contraste, labels, focus).";
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
