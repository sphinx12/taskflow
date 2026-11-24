# Guide de Démonstration en Direct devant le Jury — PFE TaskFlow
**Candidat :** Mohamed Aziz DRIDI  
**Institution :** ISET Sousse  
**Entreprise :** Creto  
**Encadrant :** Monsieur Adnen ROUATBI  
**Durée estimée :** 5 à 7 minutes  

---

## 🎯 Objectif de la Démonstration
Prouver concrètement au jury que l'ensemble de la chaîne DevOps fonctionne en temps réel sur le Cloud AWS :
1. L'application **TaskFlow** est accessible en ligne avec une interface réactive.
2. Tout `git push` déclenche automatiquement le pipeline **Jenkins** sans intervention humaine.
3. Les **tests automatisés** Jest valident la qualité du code avant déploiement.
4. Les métriques applicatives sont collectées en direct par **Prometheus** et projetées visuellement sous **Grafana**.

---

## 📋 Prérequis avant l'entrée dans la salle
1. Vérifier que l'instance AWS EC2 est démarrée (`34.206.71.95`).
2. Ouvrir 4 onglets dans votre navigateur :
   * **Onglet 1 :** `http://34.206.71.95/` (Portail TaskFlow)
   * **Onglet 2 :** `http://34.206.71.95:8080/job/TaskFlow-Pipeline/` (Jenkins)
   * **Onglet 3 :** `http://34.206.71.95:3000/d/taskflow-overview/taskflow-e28094-microservices-monitoring-dashboard` (Grafana)
   * **Onglet 4 :** `https://github.com/sphinx12/taskflow` (Dépôt GitHub)

---

## 🚀 Déroulement pas-à-pas (Script Jury)

### Étape 1 : Présentation de l'Interface Utilisateur (1 min 30 s)
* **Action :** Basculer sur l'**Onglet 1** (`http://34.206.71.95/`).
* **Ce que vous dites :**
  > « Voici l'interface de TaskFlow hébergée sur notre instance AWS EC2. Vous observez en haut les deux badges verts qui interrogent en direct les sondes `/health` des microservices `user-service` et `task-service`. »
* **Action :**
  * Créer un collaborateur (ex. : *Adnen Rouatbi - Encadrant*).
  * Créer une tâche : *« Validation Démonstration Jury »*.
  * Faire avancer la carte de `TODO` vers `IN_PROGRESS` puis `DONE`.
* **Ce que vous dites :**
  > « L'interface est une Single Page Application réactive avec Tailwind CSS. Chaque mouvement de carte déclenche un appel REST asynchrone vers notre API Gateway Nginx qui route les requêtes vers les microservices concernés. »

---

### Étape 2 : Démonstration du Pipeline CI/CD et Webhook (2 min)
* **Action :** Basculer sur l'**Onglet 4** (GitHub) ou votre terminal VS Code local.
* **Ce que vous faites :**
  * Effectuez une modification mineure de titre ou un commentaire dans le code.
  * Tapez dans le terminal :
    ```bash
    git commit -am "demo: test direct jury soutenance"
    git push origin master
    ```
* **Action :** Basculez immédiatement sur l'**Onglet 2** (Jenkins).
* **Ce que vous montrez :**
  > « Regardez l'écran Jenkins : dès l'exécution du `git push`, le Webhook GitHub a réveillé le job. Le build démarre instantanément sans aucun clic de ma part ! »
* **Montrez les 5 étapes du pipeline :**
  1. `Checkout` du code.
  2. `Install & Test` : exécution des 20 tests unitaires Jest.
  3. `Build Docker Images` : compilation des conteneurs.
  4. `Deploy Containers` : recréation à chaud via Docker Compose.
  5. `Healthcheck Verification` : requêtes curl confirmant que les 5 services sont vivants.
* **Résultat :** Le build se termine en vert (SUCCESS) en ~38 secondes.

---

### Étape 3 : Démonstration de l'Observabilité Grafana & Prometheus (1 min 30 s)
* **Action :** Basculer sur l'**Onglet 3** (Grafana).
* **Ce que vous montrez :**
  > « Passons maintenant à l'observabilité. Grâce au middleware `prom-client` intégré dans nos microservices, Prometheus interroge toutes les 5 secondes les métriques internes. Grafana projette ces séries temporelles en temps réel. »
* **Montrez les 4 panneaux du tableau de bord :**
  * **Service Health Status** : Badges `UP (1)`.
  * **HTTP Request Throughput** : Montrez le pic d'activité généré par les clics précédents sur le Kanban.
  * **Average Latency** : Montrez que le temps de traitement est bien inférieur à 50 ms.
  * **Memory Heap Usage** : Montrez l'empreinte mémoire stable du runtime Node.js.

---

### Étape 4 : Conclusion de la Démonstration (30 secondes)
* **Ce que vous dites :**
  > « Comme vous venez de le constater, la chaîne complète est opérationnelle : le code écrit est testé, livré automatiquement sur le cloud AWS en moins de 40 secondes, et supervisé en continu. Je vous remercie et je suis prêt à répondre à l'ensemble de vos questions. »
