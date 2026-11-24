# RÉPUBLIQUE TUNISIENNE
## MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE SCIENTIFIQUE
### DIRECTION GÉNÉRALE DES ÉTUDES TECHNOLOGIQUES
### INSTITUT SUPÉRIEUR DES ÉTUDES TECHNOLOGIQUES DE SOUSSE
**Département Technologies de l'Informatique**

---

# RAPPORT DE PROJET DE FIN D'ÉTUDES
**En vue de l'obtention de la Licence Nationale en Technologies de l'Informatique**

**Sujet :**
# Conception, Réalisation et Automatisation CI/CD d'une Architecture Microservices avec Monitoring sous le Cloud AWS
### Projet : TaskFlow

---

**Élaboré par :**
**Mohamed Aziz DRIDI**

**Entreprise d'accueil :**
**Creto**

**Encadrant professionnel / académique :**
**Monsieur Adnen ROUATBI**

**Année Universitaire : 2025 - 2026**

---

## Dédicace

Je dédie ce modeste travail :

À mes très chers parents, dont l'amour inconditionnel, les sacrifices perpétuels et les encouragements indéfectibles ont éclairé mon chemin tout au long de mes études. Qu'ils trouvent ici l'expression de ma profonde reconnaissance et de mon respect éternel.

À mes frères et sœurs, pour leur présence bienveillante, leur complicité et leur soutien moral continu dans les moments d'effort comme dans les réussites.

À mes fidèles amis et camarades de promotion, avec qui j'ai partagé des années inoubliables d'apprentissage, d'émulation et de persévérance au sein de l'ISET de Sousse.

À tous ceux qui ont contribué, de près ou de loin, à faire de ce parcours un succès, je vous dédie ce travail avec toute mon affection et ma sincère gratitude.

*Mohamed Aziz Dridi*

---

## Remerciements

Au terme de ce projet de fin d'études, je tiens à exprimer ma profonde gratitude à toutes les personnes qui ont contribué à son accomplissement.

J'adresse mes remerciements les plus sincères et respectueux à mon encadrant, **Monsieur Adnen ROUATBI**, pour avoir accepté de diriger ce travail avec une disponibilité remarquable, pour la pertinence de ses orientations pédagogiques et techniques, ainsi que pour ses précieux conseils qui ont guidé la réussite de ce projet.

J'exprime toute ma reconnaissance aux dirigeants et collaborateurs de l'entreprise **Creto** pour leur accueil chaleureux, la confiance qu'ils m'ont accordée, et pour l'environnement stimulant et professionnel mis à ma disposition durant cette expérience.

Je tiens également à remercier chaleureusement l'ensemble du corps professoral et administratif du **Département Technologies de l'Informatique de l'Institut Supérieur des Études Technologiques de Sousse (ISET Sousse)** pour la qualité de l'enseignement dispensé et les compétences transmises durant mon cursus universitaire.

Enfin, j'adresse mes vifs remerciements aux membres du jury pour l'honneur qu'ils me font en évaluant ce travail.

---

## Liste des abréviations

* **API** : Application Programming Interface
* **AWS** : Amazon Web Services
* **CD** : Continuous Delivery / Continuous Deployment (Déploiement Continu)
* **CI** : Continuous Integration (Intégration Continue)
* **CPU** : Central Processing Unit
* **CRUD** : Create, Read, Update, Delete
* **CSS** : Cascading Style Sheets
* **EC2** : Elastic Compute Cloud
* **HTTP / HTTPS** : HyperText Transfer Protocol (Secure)
* **HTML** : HyperText Markup Language
* **IaaS** : Infrastructure as a Service
* **IaC** : Infrastructure as Code
* **ISET** : Institut Supérieur des Études Technologiques
* **IP** : Internet Protocol
* **JSON** : JavaScript Object Notation
* **OS** : Operating System
* **PFE** : Projet de Fin d'Études
* **RAM** : Random Access Memory
* **REST** : Representational State Transfer
* **SaaS** : Software as a Service
* **SPA** : Single Page Application
* **SSH** : Secure Shell
* **TSDB** : Time Series Database
* **UI / UX** : User Interface / User Experience
* **URI / URL** : Uniform Resource Identifier / Uniform Resource Locator
* **VPC** : Virtual Private Cloud

---

## Table des Matières

- **Introduction générale**
- **Chapitre 1 : Cadre général du projet**
  - 1.1 Présentation des organismes
    - 1.1.1 L'Institut Supérieur des Études Technologiques de Sousse (ISET Sousse)
    - 1.1.2 L'organisme d'accueil : Creto
  - 1.2 Présentation générale du projet TaskFlow
    - 1.2.1 Contexte du projet
    - 1.2.2 Problématique
    - 1.2.3 Objectifs fixés
  - 1.3 Étude de l'existant et étude comparative
    - 1.3.1 Approche monolithique vs Architecture Microservices
    - 1.3.2 Déploiement manuel vs Automatisation CI/CD
    - 1.3.3 Gestion des pannes : Supervision classique vs Observabilité moderne
  - 1.4 Solution proposée : TaskFlow
  - 1.5 Méthodologie de travail adoptée (Agile / Scrum)
  - 1.6 Conclusion du chapitre
- **Chapitre 2 : Étude préalable et environnement technologique**
  - 2.1 La culture et l'approche DevOps
  - 2.2 Intégration et Déploiement Continus (CI/CD)
    - 2.2.1 Principes et bénéfices
    - 2.2.2 Le serveur d'automatisation Jenkins
  - 2.3 Gestion de versions et collaboration avec Git et GitHub
    - 2.3.1 Gestionnaire de versions distribué Git
    - 2.3.2 Plateforme collaborative GitHub et Webhooks
  - 2.4 Conteneurisation avec Docker et Docker Compose
    - 2.4.1 Conteneurisation vs Virtualisation lourde
    - 2.4.2 Docker Compose et orchestration locale
  - 2.5 Architecture Microservices et environnement de développement
    - 2.5.1 Node.js et framework Express
    - 2.5.2 Automatisation des tests avec Jest
    - 2.5.3 Frontend Single Page Application (SPA) et Tailwind CSS
  - 2.6 Système d'observabilité et de surveillance
    - 2.6.1 Prometheus : Métriques TSDB et scraping actif
    - 2.6.2 Grafana : Tableaux de bord et alertes visuelles
  - 2.7 Environnement Cloud Amazon Web Services (AWS)
    - 2.7.1 Présentation d'AWS
    - 2.7.2 Service AWS EC2 et Groupes de Sécurité
  - 2.8 Conclusion du chapitre
- **Chapitre 3 : Analyse et spécification des besoins**
  - 3.1 Introduction
  - 3.2 Identification des acteurs du système
    - 3.2.1 Utilisateur final / Chef de projet
    - 3.2.2 Ingénieur DevOps / Administrateur Système
    - 3.2.3 Systèmes externes communicants
  - 3.3 Besoins fonctionnels
    - 3.3.1 Module Gestion des Utilisateurs (User Management)
    - 3.3.2 Module Gestion des Tâches et Tableau Kanban
    - 3.3.3 Module Supervision et Statuts des Microservices
  - 3.4 Besoins non fonctionnels
    - 3.4.1 Haute Disponibilité et Résilience
    - 3.4.2 Performance et Réactivité
    - 3.4.3 Sécurité des flux et isolation des réseaux
    - 3.4.4 Maintenabilité et Qualité logicielle
  - 3.5 Spécification des exigences : User Stories
  - 3.6 Backlog global du projet (20 éléments détaillés)
  - 3.7 Conclusion du chapitre
- **Chapitre 4 : Conception et architecture de la solution**
  - 4.1 Introduction
  - 4.2 Architecture globale du système (Modèle 3-Tiers Microservices)
    - 4.2.1 Couche Présentation et Passerelle Nginx Reverse Proxy
    - 4.2.2 Couche Métier découpée en Microservices autonomes
    - 4.2.3 Couche Données et isolation de persistance
  - 4.3 Architecture du processus CI/CD automatisé
  - 4.4 Modèle conceptuel des données
    - 4.4.1 Entités User et Task
    - 4.4.2 Relations et intégrité référentielle
  - 4.5 Architecture du système de monitoring
  - 4.6 Conclusion du chapitre
- **Chapitre 5 : Développement et réalisation de la plateforme TaskFlow**
  - 5.1 Introduction
  - 5.2 Environnement de développement et outils
  - 5.3 Développement du Frontend TaskFlow
    - 5.3.1 Interface utilisateur réactive et ergonomique
    - 5.3.2 Tableau Kanban dynamique et interactif
    - 5.3.3 Portail DevOps et résolutions dynamiques d'hôtes
  - 5.4 Développement des Microservices Backend
    - 5.4.1 Service Utilisateurs (user-service)
    - 5.4.2 Service Tâches (task-service)
    - 5.4.3 Exposition des sondes de santé (/health)
    - 5.4.4 Instrumentation des métriques applicatives (/metrics)
  - 5.5 Automatisation de la suite de tests (Jest)
  - 5.6 Conclusion du chapitre
- **Chapitre 6 : Mise en place du processus CI/CD et Monitoring**
  - 6.1 Introduction
  - 6.2 Configuration du serveur d'automatisation Jenkins
    - 6.2.1 Pipeline-as-Code via Jenkinsfile déclaratif
    - 6.2.2 Déclenchement automatique en temps réel via GitHub Webhook
  - 6.3 Les étapes du Pipeline CI/CD TaskFlow
    - 6.3.1 Étape 1 : Checkout du code source
    - 6.3.2 Étape 2 : Installation des dépendances et exécution des tests unitaires
    - 6.3.3 Étape 3 : Construction des images Docker (Build)
    - 6.3.4 Étape 4 : Déploiement et redémarrage des conteneurs
    - 6.3.5 Étape 5 : Vérification de la santé des services en ligne (Healthcheck)
  - 6.4 Mise en œuvre de l'Observabilité
    - 6.4.1 Configuration du collecteur Prometheus (Scraping toutes les 5s)
    - 6.4.2 Provisioning automatique du Dashboard Grafana
    - 6.4.3 Analyse des métriques collectées (Traffic HTTP, Latence, RAM)
  - 6.5 Conclusion du chapitre
- **Chapitre 7 : Déploiement cloud et validation sur AWS**
  - 7.1 Introduction
  - 7.2 L'environnement Cloud AWS Academy
  - 7.3 Provisioning et configuration de l'instance AWS EC2
    - 7.3.1 Caractéristiques de l'instance
    - 7.3.2 Configuration des Groupes de Sécurité (Security Groups)
    - 7.3.3 Préparation de l'environnement d'exécution Docker
  - 7.4 Déploiement en production et validation fonctionnelle
    - 7.4.1 Déploiement orchestré via Docker Compose
    - 7.4.2 Test de bout en bout déclenché par push Git
    - 7.4.3 Validation des points d'accès publics
  - 7.5 Résultats obtenus et limites de la solution
    - 7.5.1 Synthèse des résultats obtenus
    - 7.5.2 Limites et contraintes identifiées
  - 7.6 Conclusion du chapitre
- **Conclusion générale et perspectives d'avenir**
- **Bibliographie et Netographie**

---

# Introduction générale

Les évolutions technologiques récentes dans le génie logiciel et les infrastructures numériques ont profondément transformé la façon dont les organisations conçoivent, livrent et maintiennent leurs systèmes d'information. Face à des exigences croissantes de réactivité, de qualité de service et de mise sur le marché accélérée (time-to-market), les approches traditionnelles reposant sur des architectures monolithiques et des déploiements manuels séquentiels atteignent aujourd'hui leurs limites.

Historiquement, le cloisonnement strict entre les équipes de développement logiciel (*Dev*) et les équipes d'exploitation système (*Ops*) générait d'importantes frictions organisationnelles : ralentissement des cycles de livraison, configurations disparates entre les postes de travail et les serveurs de production (phénomène bien connu du « chez moi ça fonctionne »), et détection tardive des anomalies en production.

Pour répondre à ces défis majeurs, le paradigme **DevOps** s'est imposé comme une réponse incontournable dans l'industrie logicielle. En promouvant une collaboration étroite, une automatisation exhaustive à travers l'Intégration et le Déploiement Continus (**CI/CD**), ainsi qu'une standardisation des environnements d'exécution grâce à la **conteneurisation**, la démarche DevOps assure des cycles de livraison fluides, reproductibles et hautement fiables.

Parallèlement, la décomposition des applications complexes en **microservices** autonomes a offert une flexibilité architecturale inégalée. Toutefois, cette distribution accrue augmente la complexité opérationnelle : orchestrer plusieurs composants indépendants, assurer leur résilience et surveiller leur état de santé en temps réel nécessite une infrastructure d'automatisation et d'observabilité rigoureuse.

C'est dans ce contexte technologique dynamique que s'inscrit le présent Projet de Fin d'Études, élaboré au sein de l'entreprise **Creto** en partenariat avec l'**Institut Supérieur des Études Technologiques de Sousse (ISET Sousse)**. Il est consacré à la conception, la réalisation et le déploiement de **TaskFlow**, une plateforme moderne de gestion collaborative de tâches basée sur une architecture microservices conteneurisée.

La problématique centrale de ce projet peut ainsi se formuler :
> *Comment concevoir, déployer et administrer efficacement une application web modulaire basée sur une architecture microservices, tout en automatisant intégralement son cycle de test et de livraison continue sous le cloud AWS, et en assurant une supervision proactive de ses performances et de sa santé en temps réel ?*

Pour apporter une solution concrète et opérationnelle à cette problématique, notre démarche s'articule autour de trois piliers fondamentaux :
1. **L'ingénierie logicielle et microservices** : concevoir une application découplée comprenant un microservice de gestion des utilisateurs (`user-service`), un microservice de gestion des tâches (`task-service`), orchestrés derrière une passerelle API et servis par une interface web réactive (Tableau Kanban dynamique).
2. **L'usine logicielle CI/CD (Pipeline-as-Code)** : mettre en place une chaîne d'intégration et de déploiement continus avec Jenkins et GitHub Webhook, garantissant que tout engagement de code source déclenche automatiquement une suite de tests unitaires/intégration, la construction des conteneurs Docker et le déploiement sans intervention humaine.
3. **L'observabilité et le déploiement Cloud** : orchestrer la solution sur une instance Cloud **Amazon Web Services (AWS EC2)** et instrumenter une surveillance continue au moyen de **Prometheus** et de tableaux de bord visuels **Grafana**, pour capturer en temps réel le débit de requêtes, la latence et la consommation de ressources.

Le présent rapport est structuré en sept chapitres ordonnés selon une logique méthodologique et académique progressive :
* Le **Chapitre 1** présente le cadre général du projet, les organismes partenaires, la problématique, les objectifs et la méthodologie de travail.
* Le **Chapitre 2** détaille l'état de l'art technologique, décrivant les concepts de DevOps, CI/CD, conteneurisation, microservices, observabilité et cloud computing.
* Le **Chapitre 3** est consacré à l'analyse et à la spécification des besoins, définissant les acteurs, les exigences fonctionnelles et non-fonctionnelles, les user stories et le backlog global du projet.
* Le **Chapitre 4** explicite la conception architecturale, le modèle de données, les flux du pipeline CI/CD et l'architecture de supervision.
* Le **Chapitre 5** retrace le développement et la réalisation de la plateforme TaskFlow, détaillant les composants frontend, les microservices backend et les suites de tests.
* Le **Chapitre 6** expose la mise en place du pipeline CI/CD avec Jenkins, l'intégration du Webhook GitHub et l'instrumentation de la supervision Prometheus et Grafana.
* Le **Chapitre 7** traite du déploiement cloud sur AWS EC2, de la validation des scénarios réels de bout en bout et de l'analyse des résultats obtenus.

Une conclusion générale viendra clore ce rapport en dressant le bilan des compétences acquises et en esquissant les perspectives d'évolution futures du projet.

---

# Chapitre 1 : Cadre général du projet

## Introduction
Ce premier chapitre a pour objectif de situer le projet TaskFlow dans son cadre institutionnel, professionnel et méthodologique. Nous débuterons par la présentation de l'Institut Supérieur des Études Technologiques de Sousse ainsi que de l'organisme d'accueil Creto. Nous exposerons ensuite le contexte précis du projet, la problématique rencontrée ainsi que les objectifs visés. Enfin, nous procèderons à une étude critique de l'existant avant de détailler la solution proposée et la méthodologie de développement Agile adoptée.

## 1.1 Présentation des organismes

### 1.1.1 L'Institut Supérieur des Études Technologiques de Sousse (ISET Sousse)
L'Institut Supérieur des Études Technologiques de Sousse (ISET Sousse) est un établissement public d'enseignement supérieur technologique sous la tutelle du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique de Tunisie. Créé pour répondre aux besoins grandissants du tissu économique et industriel en compétences techniques hautement qualifiées, l'ISET Sousse assure une formation alliant théorie académique rigoureuse et pratique appliquée de pointe.

Le Département Technologies de l'Informatique forme des techniciens supérieurs et des spécialistes capables d'intervenir sur l'ensemble du cycle de vie des projets informatiques : génie logiciel, réseaux, administration de systèmes, cloud computing et cybersécurité. Le Projet de Fin d'Études (PFE) constitue l'aboutissement de ce cursus universitaire, permettant aux étudiants de mettre en pratique leurs acquis dans un contexte professionnel concret.

### 1.1.2 L'organisme d'accueil : Creto
**Creto** est une entreprise innovante spécialisée dans le conseil en ingénierie logicielle, la transformation digitale et l'adoption des architectures Cloud et DevOps. Creto accompagne ses clients, allant des startups aux grandes entreprises, dans la modernisation de leur système d'information, la transition vers le cloud computing, la refactorisation d'applications monolithiques vers des architectures microservices hautement scalables, et la mise en œuvre de pipelines automatisés de livraison logicielle.

L'immersion au sein de Creto a offert un environnement de travail stimulant, conforme aux standards industriels actuels, combinant rigueur méthodologique, utilisation des technologies de référence et partage d'expertise technique.

## 1.2 Présentation générale du projet TaskFlow

### 1.2.1 Contexte du projet
Dans le cadre de projets informatiques collaboratifs, la gestion transparente et agile des tâches d'équipe représente un facteur déterminant de succès. Les outils modernes de gestion de flux de travail (Workflow Management) doivent satisfaire des critères stricts de réactivité, d'ergonomie et de haute disponibilité.

Traditionnellement, la mise à disposition de telles solutions impliquait des infrastructures lourdes, dont les composants étaient étroitement couplés au sein d'une seule base de code monolithique. Lors des montées de version, la moindre mise à jour d'un sous-système (par exemple, la gestion des profils utilisateurs) risquait d'impacter le bon fonctionnement global du système (la gestion des tâches). De plus, les opérations de déploiement et de maintenance étaient réalisées manuellement sur des serveurs dédiés, entraînant des interruptions de service périodiques.

C'est dans cette optique que s'inscrit le projet **TaskFlow** : concevoir une application de gestion de tâches distribuée, agile et légère, reposant sur une architecture moderne de microservices, et accompagnée d'une chaîne d'automatisation intégrale depuis le code source jusqu'au déploiement et à la supervision sous le cloud.

### 1.2.2 Problématique
Au sein des environnements d'ingénierie logicielle contemporains, les équipes techniques font face à une série de goulots d'étranglement qui entravent leur agilité :
1. **Cloisonnement des responsabilités et frictions de déploiement** : Les développeurs livrent des fonctionnalités sans visibilité sur l'environnement de production, tandis que les exploitants système doivent interpréter des procédures manuelles d'installation souvent imprécises.
2. **Incohérence des environnements d'exécution** : Une anomalie qui n'apparaît pas sur le poste de développement local peut se manifester en production en raison de divergences de versions de bibliothèques logicielles, de dépendances du système d'exploitation ou de variables d'environnement.
3. **Absence de rétroaction rapide sur la qualité (Quality Gate)** : Sans tests automatisés intégrés à chaque étape de livraison, des régressions logicielles critiques franchissent régulièrement les barrières de déploiement.
4. **Opacité et manque de visibilité opérationnelle** : Une fois l'application déployée sur le serveur distant, l'absence d'outils d'observabilité centralisés rend le diagnostic des pannes ou des lenteurs particulièrement complexe, reposant sur l'inspection manuelle fastidieuse de fichiers de logs locaux.

Dès lors, la problématique centrale de notre étude peut être énoncée comme suit :
*« Comment concevoir une plateforme collaborative modulaire et mettre en place une chaîne DevOps complète, garantissant l'automatisation sans faille des tests et des déploiements vers le Cloud AWS, tout en fournissant une observabilité en temps réel sur la santé et les performances des microservices ? »*

### 1.2.3 Objectifs fixés
Pour répondre méthodiquement à cette problématique, le projet TaskFlow poursuit les objectifs majeurs suivants :
* **Découplage architectural** : Concevoir et développer deux microservices indépendants, l'un dédié à la gestion des utilisateurs (`user-service`), l'autre à la gestion des tâches (`task-service`), communiquant via des interfaces RESTful normalisées.
* **Passerelle d'accès unifiée et interface ergonomique** : Intégrer un reverse proxy Nginx servant d'API Gateway et offrant une interface web moderne (Single Page Application) munie d'un tableau Kanban interactif.
* **Standardisation et isolation par conteneurs** : Conteneuriser l'ensemble des modules (frontend, microservices, collecteurs de supervision) à l'aide de Docker et orchestrer leur interconnexion avec Docker Compose.
* **Automatisation continue (CI/CD Pipeline-as-Code)** : Mettre en œuvre avec Jenkins un pipeline déclaratif automatisé, réagissant instantanément aux événements de push GitHub via des Webhooks, pour exécuter les suites de tests unitaires Jest, générer les images conteneurisées et assurer le déploiement automatique.
* **Observabilité et surveillance continue** : Déployer un agent collecteur Prometheus qui interroge à intervalle régulier les métriques exposées par les microservices, et configurer un tableau de bord Grafana temps réel visualisant les indicateurs clés de performance (KPI) : santé des services, débit de requêtes, latence et utilisation mémoire.
* **Validation Cloud sur AWS** : Déployer l'intégralité de l'infrastructure sur une instance Cloud Amazon EC2 sécurisée, et prouver la résilience de la chaîne de déploiement par des scénarios de validation bout en bout.

## 1.3 Étude de l'existant et étude comparative

Afin de justifier les choix architecturaux de TaskFlow, nous avons mené une analyse comparative des approches technologiques traditionnelles et modernes.

### 1.3.1 Approche monolithique vs Architecture Microservices
Dans une architecture monolithique, l'ensemble des fonctionnalités (interface utilisateur, logique métier, accès aux données) est regroupé au sein d'un bloc logiciel indivisible. Si cette structure est rapide à initialiser pour de petits prototypes, elle devient un frein considérable lors de la montée en charge :
* Tout changement sur une fonctionnalité impose la recompilation et le redéploiement de l'ensemble de l'application.
* Une faille ou un blocage dans un sous-module entraîne l'indisponibilité globale du système.
* L'équipe est captive d'un unique choix technologique pour l'ensemble du projet.

À l'inverse, l'**architecture en microservices** adoptée pour TaskFlow décompose l'application en services métier autonomes de taille réduite. Chaque microservice dispose de son propre périmètre de données, s'exécute dans un processus distinct, et communique via des protocoles légers (HTTP/REST). Cette modularité favorise la scalabilité ciblée, la tolérance aux pannes et la spécialisation technologique.

### 1.3.2 Déploiement manuel vs Automatisation CI/CD
Le tableau 1.1 synthétise la comparaison entre les méthodes de déploiement manuel traditionnelles et l'approche d'automatisation CI/CD mise en œuvre dans TaskFlow.

| Critère d'évaluation | Approche Manuelle Traditionnelle | Approche Automatisée TaskFlow (CI/CD) |
|---|---|---|
| **Délai de mise en production** | Plusieurs heures voire jours | Moins d'une minute (< 40 secondes) |
| **Fiabilité des déploiements** | Forte vulnérabilité aux erreurs humaines | Répétabilité stricte, processus standardisé |
| **Exécution des tests** | Tests manuels ponctuels et oublis fréquents | Exécution systématique de 20 tests unitaires Jest |
| **Rétroaction développeur** | Découverte tardive des anomalies en production | Rétroaction immédiate (rapport de build Jenkins) |
| **Disponibilité du service** | Interruptions planifiées lors des maintenances | Déploiement sans coupure grâce aux conteneurs |

*Tableau 1.1 – Comparatif entre déploiement manuel et intégration/déploiement continus (CI/CD)*

### 1.3.3 Gestion des pannes : Supervision classique vs Observabilité moderne
Traditionnellement, la détection des dysfonctionnements système repose sur les alertes signalées par les utilisateurs finaux eux-mêmes, obligant les administrateurs à se connecter en SSH sur le serveur pour consulter des fichiers de logs hétérogènes.

L'approche d'**observabilité moderne** retenue pour TaskFlow inverse ce paradigme en instrumentant directement le code applicatif avec le standard Prometheus : les microservices exportent en permanence leurs métriques internes (nombre d'appels HTTP par code de retour, durée de traitement des requêtes, mémoire RAM consommée par le moteur Node.js V8). Ces données temporelles sont centralisées dans une base de données de séries chronologiques (TSDB) et projetées visuellement sous Grafana, autorisant une détection préventive des goulets d'étranglement avant tout impact sur les utilisateurs.

## 1.4 Solution proposée : TaskFlow
La solution proposée consiste en une infrastructure complète combinant génie logiciel moderne et ingénierie d'exploitation Cloud :
1. **Frontend Web moderne** : Une interface utilisateur réactive (Single Page Application) développée en HTML5/JavaScript moderne et stylisée avec Tailwind CSS, intégrant un tableau Kanban interactif, des modales de gestion dynamique, et un panneau d'administration DevOps affichant les liens d'accès dynamiques selon le domaine hôte.
2. **Microservices Node.js / Express** : Deux microservices indépendants, `user-service` (port 3001) et `task-service` (port 3002), dotés de leurs propres modèles de données, de sondes de santé `/health` et d'endpoints d'instrumentation `/metrics`.
3. **Passerelle Nginx** : Un serveur Nginx servant à la fois d'hôte pour l'interface statique et de reverse proxy (API Gateway) unifié sur le port 80, distribuant les flux vers les microservices sous-jacents tout en masquant la topologie réseau interne.
4. **Usine Logicielle Jenkins** : Une instance Jenkins hébergée sur l'environnement AWS, configurée avec Docker-out-of-Docker pour piloter les builds et déploiements en réponse aux déclenchements par Webhook GitHub.
5. **Pile d'Observabilité Prometheus & Grafana** : Un collecteur Prometheus dédié (port 9090) interrogeant les microservices toutes les 5 secondes, couplé à une instance Grafana (port 3000) provisionnée avec un tableau de bord exhaustif prêt à l'emploi.
6. **Infrastructure Cloud AWS EC2** : Une instance Ubuntu Server 24.04 LTS hébergée sur le cloud d'Amazon Web Services, dotée de règles de filtrage réseau strictes (Security Groups).

## 1.5 Méthodologie de travail adoptée (Agile / Scrum)
Afin de mener à bien ce projet dans le respect des délais et d'assurer une adaptabilité continue face aux exigences techniques, nous avons adopté la méthodologie **Agile Scrum**.

Le cycle de vie du projet a été divisé en sprints itératifs de deux semaines, rythmés par :
* La constitution et le découpage d'un **Product Backlog** hiérarchisé.
* Des réunions de cadrage et de planification de sprint (**Sprint Planning**).
* Des démonstrations régulières des fonctionnalités développées auprès de notre encadrant (**Sprint Review**).
* Des phases d'évaluation technique et d'amélioration continue (**Sprint Retrospective**).

Cette démarche itérative a permis de valider étape par étape chaque brique technologique : d'abord la création et le test des microservices, ensuite la conteneurisation et l'orchestration Docker Compose, puis l'automatisation du pipeline CI/CD sous Jenkins, et enfin l'instrumentation de la supervision et le déploiement Cloud sur AWS.

## 1.6 Conclusion du chapitre
Dans ce premier chapitre, nous avons contextualisé le projet TaskFlow en présentant l'ISET de Sousse et l'entreprise d'accueil Creto. Nous avons formulé la problématique liée aux limites des déploiements manuels et des architectures monolithiques, défini les objectifs du projet, et argumenté nos choix technologiques à travers une étude de l'existant rigoureuse. Le chapitre suivant sera consacré à l'étude préalable des technologies et des concepts fondamentaux mis en œuvre dans cette réalisation.

---

# Chapitre 2 : Étude préalable et environnement technologique

## Introduction
La réussite d'un projet d'ingénierie logicielle et d'automatisation d'infrastructure repose sur un choix rigoureux et éclairé des outils et technologies employés. Ce deuxième chapitre est dédié à l'étude des concepts clés et des technologies mobilisées dans le cadre de TaskFlow. Nous aborderons tour à tour la culture DevOps, les concepts d'intégration et de déploiement continus (CI/CD), la gestion de versions avec Git et GitHub, la conteneurisation Docker, l'écosystème Node.js/Express, les mécanismes d'observabilité Prometheus/Grafana, et l'infrastructure Cloud AWS.

## 2.1 La culture et l'approche DevOps
Historiquement, les cycles de développement logiciel étaient marqués par une fracture profonde entre les développeurs (*Dev*), dont l'objectif premier est de produire rapidement de nouvelles fonctionnalités, et les équipes d'exploitation système (*Ops*), dont la priorité fondamentale est de garantir la stabilité et la sécurité des environnements de production. Ce décalage d'objectifs créait le fameux « mur de la confusion » (Wall of Confusion), source de retards, de dysfonctionnements récurrents et de rejets mutuels de responsabilité.

Le mouvement **DevOps** est né de la volonté de briser ce cloisonnement en unissant les personnes, les processus et les technologies. Il repose sur quatre principes directeurs synthétisés sous l'acronyme **CAMS** :
* **Culture** : Responsabilité partagée tout au long du cycle de vie du produit, de la conception à la maintenance opérationnelle.
* **Automation** : Automatisation intégrale de toutes les tâches répétitives (tests, compilation, empaquetage, déploiement, vérification).
* **Measurement** : Mesure systématique des performances applicatives et de la qualité de service par des métriques objectives.
* **Sharing** : Partage transparent des connaissances, des retours d'expérience et des outils entre toutes les parties prenantes.

Dans le projet TaskFlow, l'approche DevOps se traduit concrètement par l'élimination totale de toute intervention manuelle pour la mise en ligne des versions logicielles.

## 2.2 Intégration et Déploiement Continus (CI/CD)

### 2.2.1 Principes et bénéfices
Le concept de **CI/CD** forme l'épine dorsale technique de la méthodologie DevOps :
* **Intégration Continue (CI - Continuous Integration)** : Pratique consistant pour les développeurs à fusionner fréquemment leurs modifications de code dans le référentiel partagé. Chaque validation (commit) déclenche automatiquement la compilation du logiciel et l'exécution d'une batterie de tests automatisés. L'objectif est de détecter les erreurs au plus tôt (fail fast), réduisant drastiquement le coût de correction des régressions.
* **Déploiement Continu (CD - Continuous Deployment)** : Prolongement logique de la CI où chaque version du code source ayant réussi avec succès toutes les étapes de validation automatisées est immédiatement et automatiquement déployée dans l'environnement de production, sans intervention humaine.

### 2.2.2 Le serveur d'automatisation Jenkins
Pour matérialiser ce cycle d'intégration et de déploiement continus, notre choix s'est porté sur **Jenkins**, le serveur d'automatisation open source de référence mondiale.

Jenkins offre des atouts décisifs pour TaskFlow :
* **Pipeline-as-Code** : La description de l'intégralité du processus de livraison est rédigée dans un fichier textuel structuré (`Jenkinsfile`) versionné avec le code source dans le dépôt Git.
* **Extensibilité** : Un catalogue exhaustif de plugins permettant l'intégration transparente avec Git, Docker, les Webhooks et les outils de notification.
* **Exécution distribuée et conteneurisée** : Capacité d'exécuter des pipelines au sein d'agents conteneurisés, évitant ainsi de polluer le système d'exploitation hôte avec des dépendances multiples.

## 2.3 Gestion de versions et collaboration avec Git et GitHub

### 2.3.1 Gestionnaire de versions distribué Git
**Git** est un système de contrôle de versions décentralisé créé par Linus Torvalds. Contrairement aux anciens systèmes centralisés, Git permet à chaque développeur de conserver une copie intégrale de l'historique du projet sur son poste de travail, facilitant le travail hors ligne, les branches parallèles de fonctionnalités et les fusions rapides.

### 2.3.2 Plateforme collaborative GitHub et Webhooks
**GitHub** est une plateforme SaaS d'hébergement de dépôts Git dotée de fonctionnalités avancées de revue de code (Pull Requests) et de suivi de projet.

Dans l'architecture TaskFlow, GitHub joue un rôle déclencheur primordial grâce aux **Webhooks**. Un Webhook est un mécanisme de communication asynchrone par rappel HTTP : dès qu'un développeur effectue un `git push` sur la branche `master` du dépôt TaskFlow, les serveurs de GitHub émettent une requête `POST HTTP` vers l'endpoint public exposé par notre serveur Jenkins (`http://<ip-aws>:8080/github-webhook/`). Cette notification instantanée réveille automatiquement le pipeline CI/CD sans nécessiter d'interrogation périodique (polling).

## 2.4 Conteneurisation avec Docker et Docker Compose

### 2.4.1 Conteneurisation vs Virtualisation lourde
L'un des apports majeurs de l'ingénierie DevOps moderne réside dans la **conteneurisation**, popularisée par la technologie **Docker**.

Contrairement aux machines virtuelles traditionnelles qui exigent un hyperviseur et un système d'exploitation invité complet pour chaque instance (ce qui consomme plusieurs gigaoctets de mémoire et de disque), les conteneurs Docker partagent le noyau (kernel) du système d'exploitation hôte. Chaque conteneur s'exécute dans un espace utilisateur isolé, bénéficiant des fonctionnalités natives du noyau Linux telles que les *Control Groups* (cgroups, pour la limitation des ressources CPU et RAM) et les *Namespaces* (pour l'isolation du réseau, des processus et des systèmes de fichiers).

Les avantages de Docker pour TaskFlow sont manifestes :
* **Immutabilité et reproductibilité** : Une image Docker construite et testée localement fonctionnera exactement de la même manière sur l'environnement de test ou sur le serveur cloud AWS.
* **Démarrage quasi-instantané** : Quelques centaines de millisecondes suffisent pour initialiser un microservice conteneurisé.
* **Légèreté de l'empreinte mémoire** : Nos images basées sur Alpine Linux ne pèsent que quelques dizaines de mégaoctets.

### 2.4.2 Docker Compose et orchestration locale
**Docker Compose** est un outil permettant de définir et d'exécuter des applications multi-conteneurs. À l'aide d'un unique fichier de configuration au format YAML (`docker-compose.yml`), il est possible de déclarer les différents services, leurs variables d'environnement, les ports réseau exposés, les volumes de persistance et les dépendances d'ordonnancement de démarrage (`depends_on`). Pour TaskFlow, Docker Compose permet de démarrer en une seule ligne de commande l'ensemble des six conteneurs constituant l'écosystème complet.

## 2.5 Architecture Microservices et environnement de développement

### 2.5.1 Node.js et framework Express
Pour le développement des microservices `user-service` et `task-service`, nous avons retenu la plateforme **Node.js** couplée au micro-framework **Express** :
* **Node.js** repose sur le moteur d'exécution JavaScript V8 de Google et un modèle d'entrées/sorties non bloquant piloté par événements (Event Loop). Cette conception offre des performances d'exécution remarquables pour les services Web traitant de nombreuses requêtes I/O simultanées avec une consommation de mémoire minimale.
* **Express** est un framework minimaliste et robuste qui simplifie la gestion du routage HTTP, l'interception par middlewares, et la sérialisation des charges utiles au format JSON.

### 2.5.2 Automatisation des tests avec Jest
La fiabilité du pipeline CI/CD repose sur l'intégrité de la suite de tests automatisés. Nous avons sélectionné **Jest**, framework de test JavaScript développé par Meta. Jest se distingue par sa rapidité d'exécution, son moteur de mock intégré, son assertion library claire et sa compatibilité avec la bibliothèque `supertest` pour exécuter des tests d'intégration simulant des requêtes HTTP directes sur les microservices sans avoir à lancer de serveur réseau réel.

### 2.5.3 Frontend Single Page Application (SPA) et Tailwind CSS
Pour l'interface utilisateur, nous avons privilégié une approche sobre, performante et sans surcoût de compilation lourd :
* Une architecture **Single Page Application (SPA)** en JavaScript moderne (ES6+), manipulant le DOM de façon fluide et effectuant des appels asynchrones (`fetch`) vers les microservices via l'API Gateway.
* Le framework utilitaire **Tailwind CSS**, permettant de concevoir rapidement une interface soignée, responsive (adaptée aux ordinateurs et mobiles), avec une palette graphique professionnelle inspirée des standards d'ergonomie actuels.

## 2.6 Système d'observabilité et de surveillance

### 2.6.1 Prometheus : Métriques TSDB et scraping actif
Dans une architecture distribuée, savoir en permanence si les services fonctionnent correctement est un impératif critique. **Prometheus**, projet incubé par la Cloud Native Computing Foundation (CNCF), est un système de supervision et d'alerte open source basé sur une base de données de séries temporelles (**TSDB**).

Contrairement aux outils de supervision classiques qui reçoivent passivement des paquets (push), Prometheus adopte une approche active par tirage (**pull / scraping**) :
* À intervalles réguliers configurables (toutes les 5 secondes dans notre configuration TaskFlow), le serveur Prometheus émet une requête HTTP GET vers l'endpoint `/metrics` de chaque microservice cible.
* Grâce à la bibliothèque officielle `prom-client` intégrée dans nos microservices Node.js, les données sont renvoyées dans le format standardisé OpenMetrics (compteurs, jauges, histogrammes de latence).

### 2.6.2 Grafana : Tableaux de bord et alertes visuelles
Si Prometheus excelle dans la collecte et l'indexation de séries temporelles, il nécessite une couche de visualisation avancée pour être exploité efficacement par les équipes opérationnelles. **Grafana** est la plateforme leader de visualisation analytique.

Relié à Prometheus en tant que source de données (Data Source), Grafana transforme les métriques brutes en graphiques dynamiques, jauges d'état et tableaux de bord interactifs permettant de visualiser d'un coup d'œil l'état de santé globale des microservices, le débit de requêtes par seconde, la latence moyenne et la mémoire consommée.

## 2.7 Environnement Cloud Amazon Web Services (AWS)

### 2.7.1 Présentation d'AWS
**Amazon Web Services (AWS)** est la plateforme de cloud computing la plus complète et la plus largement adoptée au monde. Elle propose une infrastructure mondiale hautement disponible, sécurisée et scalable selon un modèle de paiement à l'usage.

### 2.7.2 Service AWS EC2 et Groupes de Sécurité
Dans le cadre de notre projet réalisé au sein de l'environnement académique AWS Academy Learner Lab, nous avons exploité le service **Amazon EC2 (Elastic Compute Cloud)** :
* Une instance virtuelle sécurisée fonctionnant sous **Ubuntu Server 24.04 LTS**, dotée d'une adresse IP publique routable sur Internet.
* Un **Security Group** faisant office de pare-feu virtuel avec état (stateful firewall), configuré pour filtrer précisément les flux entrants et sortants et n'autoriser que les ports applicatifs strictement nécessaires :
  - Port **22** : Administration distante sécurisée via SSH.
  - Port **80** : Trafic HTTP public vers le Frontend TaskFlow et l'API Gateway Nginx.
  - Port **8080** : Accès à la console d'automatisation Jenkins et réception des Webhooks GitHub.
  - Port **3000** : Accès au tableau de bord Grafana.
  - Ports **3001** et **3002** : Accès direct aux microservices `user-service` et `task-service`.
  - Port **9090** : Accès à l'interface d'exploration Prometheus.

## 2.8 Conclusion du chapitre
Ce chapitre nous a permis de passer en revue l'ensemble des fondements théoriques et techniques qui structurent TaskFlow : la philosophie DevOps, l'automatisation CI/CD avec Jenkins, la conteneurisation Docker, le runtime Node.js/Express, l'observabilité Prometheus/Grafana et le cloud AWS. Forts de cette base technologique, nous pouvons désormais aborder au chapitre 3 l'analyse détaillée des besoins et la spécification des exigences fonctionnelles et techniques du système.

---

# Chapitre 3 : Analyse et spécification des besoins

## Introduction
L'analyse des besoins constitue une étape charnière dans tout projet informatique. Elle permet de circonscrire précisément le périmètre fonctionnel et technique de la solution attendue, d'identifier les acteurs interagissant avec le système, et d'établir un référentiel d'exigences partagé. Ce troisième chapitre détaille l'organisation du développement de TaskFlow, décrit les acteurs identifiés, formalise les besoins fonctionnels et non fonctionnels, et présente le catalogue exhaustif des User Stories ainsi que le Backlog global structuré du projet.

## 3.1 Organisation du développement
Le projet TaskFlow a été conduit selon une approche agile itérative, permettant de découper l'effort de développement en sous-ensembles fonctionnels et techniques cohérents.

L'organisation repose sur une séparation claire entre :
1. Le développement applicatif des services et de l'interface utilisateur.
2. L'instrumentation de la qualité de code et des tests unitaires automatisés.
3. L'ingénierie d'infrastructure, comprenant la conteneurisation, le pipeline CI/CD et l'observabilité.

## 3.2 Identification des acteurs du système
L'analyse des cas d'utilisation de la plateforme TaskFlow a permis de distinguer trois catégories d'acteurs principaux :

### 3.2.1 Utilisateur final / Collaborateur de projet
L'utilisateur final est le membre d'une équipe de développement ou un chef de projet qui interagit directement avec l'application web TaskFlow. Ses actions consistent à :
* Consulter la liste des collaborateurs et ajouter de nouveaux membres.
* Créer des tâches en renseignant un titre, une description et en leur affectant un responsable.
* Faire évoluer le statut des tâches selon le cycle de vie du projet (À faire, En cours, Terminé) directement sur le tableau Kanban interactif.
* Filtrer les tâches par collaborateur ou par état d'avancement pour obtenir une vue ciblée de son activité.

### 3.2.2 Ingénieur DevOps / Administrateur Système
L'ingénieur DevOps est responsable de la maintenance de l'infrastructure logicielle, de l'orchestration des conteneurs et de la chaîne de livraison continue :
* Configurer et maintenir le serveur d'intégration continue Jenkins et ses définitions de pipeline.
* Administrer les conteneurs Docker et les réseaux virtuels sur l'instance cloud AWS EC2.
* Surveiller en temps réel la santé, la latence et la disponibilité des microservices via Prometheus et Grafana.
* Consulter les statuts d'exécution des builds et intervenir en cas d'alerte ou d'échec de tests.

### 3.2.3 Systèmes externes communicants
Le système TaskFlow interagit de manière autonome avec deux entités externes fondamentales :
* **GitHub** : Émetteur automatique de notifications Webhook lors de tout événement de modification de code source.
* **Amazon Web Services (AWS)** : Fournisseur de l'infrastructure d'hébergement Cloud IaaS (calcul, réseau, filtrage de sécurité).

## 3.3 Besoins fonctionnels

### 3.3.1 Module Gestion des Utilisateurs (user-service)
* **BF1.1 - Création d'un utilisateur** : Le système doit permettre d'enregistrer un nouvel utilisateur en saisissant son nom, son adresse e-mail et son rôle professionnel (ex. Développeur, DevOps Engineer, Chef de projet).
* **BF1.2 - Consultation des utilisateurs** : Le système doit lister l'ensemble des collaborateurs enregistrés avec leurs attributs respectifs.
* **BF1.3 - Consultation du détail d'un utilisateur** : Le système doit permettre d'obtenir les informations d'un utilisateur spécifique via son identifiant unique.
* **BF1.4 - Suppression d'un utilisateur** : Le système doit autoriser la suppression d'un utilisateur en s'assurant de la cohérence avec les tâches qui lui sont rattachées.
* **BF1.5 - Contrôle d'intégrité et validation** : Le système doit rejeter toute saisie incomplète (nom ou e-mail manquant) ou mal formatée.

### 3.3.2 Module Gestion des Tâches et Tableau Kanban (task-service)
* **BF2.1 - Création d'une tâche** : Le système doit permettre la création d'une nouvelle tâche avec un titre obligatoire, une description détaillée, et l'affectation à un utilisateur existant.
* **BF2.2 - Consultation des tâches** : Le système doit restituer la liste des tâches sous une présentation visuelle en colonnes Kanban réparties selon trois statuts : `TODO` (À faire), `IN_PROGRESS` (En cours), et `DONE` (Terminé).
* **BF2.3 - Changement d'état d'une tâche** : L'utilisateur doit pouvoir faire progresser une tâche d'un état à un autre d'un simple clic.
* **BF2.4 - Filtrage dynamique** : Le système doit permettre de filtrer instantanément l'affichage des tâches selon leur statut ou selon l'utilisateur auquel elles sont assignées.
* **BF2.5 - Suppression d'une tâche** : L'utilisateur doit pouvoir retirer définitivement une tâche achevée ou obsolète.

### 3.3.3 Module Supervision et Statuts Opérationnels
* **BF3.1 - Vérification de la santé des microservices** : Le frontend doit interroger régulièrement les sondes de santé `/health` de chaque microservice et afficher des badges visuels dynamiques (indicateurs vert/rouge) signalant leur disponibilité immédiate.
* **BF3.2 - Accès direct aux interfaces d'administration DevOps** : Le portail web doit offrir des liens dynamiques menant vers la console Jenkins et vers le tableau de bord Grafana, résolvant automatiquement l'adresse IP de l'hôte distant.

## 3.4 Besoins non fonctionnels

Les besoins non fonctionnels définissent les exigences qualitatives indispensables :
* **BNF1 - Disponibilité et résilience** : L'architecture doit tolérer la défaillance d'un composant sans provoquer l'effondrement de l'ensemble de la plateforme. La conteneurisation Docker doit permettre le redémarrage automatique des services défaillants (`restart: always`).
* **BNF2 - Performance et réactivité** : Les microservices Node.js doivent répondre aux requêtes REST en moins de 200 millisecondes dans des conditions nominales de charge. L'interface utilisateur doit s'actualiser de façon fluide sans rechargement complet de la page.
* **BNF3 - Automatisation et maintenabilité** : Aucune étape de déploiement ne doit être exécutée manuellement. Tout correctif ou évolution de code poussé sur le dépôt Git doit franchir automatiquement la validation des tests Jest avant toute mise en ligne.
* **BNF4 - Observabilité et traçabilité** : Chaque microservice doit exposer ses métriques internes au format OpenMetrics sur une route dédiée `/metrics`, facilitant la détection proactive d'anomalies de performance.
* **BNF5 - Isolation et modularité** : Chaque microservice doit être confiné dans son propre conteneur Docker et ne partager ses ressources qu'à travers des interfaces réseaux clairement régies par le reverse proxy.

## 3.5 Spécification des exigences : User Stories

| Identifiant | En tant que... | Je souhaite... | Afin de... | Critères d'acceptation |
|---|---|---|---|---|
| **US01** | Collaborateur | Créer un profil utilisateur avec nom, e-mail et rôle | M'identifier et me voir assigner des tâches | Nom et email valides, utilisateur immédiatement visible dans la liste |
| **US02** | Collaborateur | Consulter la liste de tous les utilisateurs | Connaître la composition de l'équipe projet | Affichage sous forme de badges clairs avec le rôle respectif |
| **US03** | Collaborateur | Supprimer un utilisateur | Nettoyer les comptes inactifs | L'utilisateur disparaît de la liste et n'est plus assignable |
| **US04** | Collaborateur | Créer une nouvelle tâche Kanban | Enregistrer une action à entreprendre | Titre obligatoire, sélection d'un membre existant, statut initial `TODO` |
| **US05** | Collaborateur | Visualiser les tâches réparties en colonnes Kanban | Appréhender en un coup d'œil l'avancement global | Colonnes distinctes À faire, En cours et Terminé |
| **US06** | Collaborateur | Changer le statut d'une tâche d'un simple clic | Signaler le passage à l'étape suivante | Mise à jour immédiate du statut en base et réorganisation dans la colonne |
| **US07** | Collaborateur | Filtrer les tâches par responsable ou par statut | Isoler mes tâches personnelles ou urgentes | Le tableau ne conserve que les cartes correspondant aux critères |
| **US08** | Collaborateur | Supprimer une tâche du tableau | Éliminer les tâches caduques | Confirmation de suppression, disparition de la carte |
| **US09** | Développeur | Disposer d'une suite de tests automatisés | Détecter immédiatement les régressions logicielles | 100% des tests unitaires Jest validés au build |
| **US10** | Ingénieur DevOps | Automatiser l'exécution des tests à chaque push | Interdire tout déploiement de code instable | Pipeline Jenkins déclenché par GitHub Webhook |
| **US11** | Ingénieur DevOps | Conteneuriser les microservices avec Docker | Éliminer les conflits d'environnements d'exécution | Images légères construites automatiquement par le pipeline |
| **US12** | Ingénieur DevOps | Déployer automatiquement les conteneurs sous AWS | Éliminer les interventions manuelles sur le serveur | Mise à jour des conteneurs via Docker Compose dès le build vert |
| **US13** | Ingénieur DevOps | Vérifier automatiquement la disponibilité des services | Valider la bonne mise en ligne (Quality Gate) | Requêtes HTTP curl sur les sondes `/health` en fin de pipeline |
| **US14** | Administrateur | Consulter l'état de santé en temps réel sur le dashboard | Être rassuré sur la viabilité de l'infrastructure | Badges lumineux vert/rouge sur la barre supérieure de l'interface |
| **US15** | Administrateur | Surveiller le trafic et la latence sous Grafana | Anticiper les goulets d'étranglement | Dashboard Grafana préconfiguré avec graphiques de débit et mémoire |

*Tableau 3.2 – Spécification des exigences sous forme de User Stories*

## 3.6 Backlog global du projet (20 éléments détaillés)

| Réf. | Catégorie | Description du besoin ou de la tâche technique | Priorité |
|---|---|---|---|
| **US1** | Fonctionnel | Créer et consulter les profils collaborateurs via `user-service` | Haute |
| **US2** | Fonctionnel | Supprimer un utilisateur et valider les contrôles d'intégrité | Moyenne |
| **T3** | Technique | Développer le microservice `user-service` avec Express et Node.js | Haute |
| **T4** | Technique | Écrire la suite de tests unitaires Jest pour `user-service` (7 tests) | Haute |
| **US5** | Fonctionnel | Créer des tâches avec assignation et gestion des priorités | Haute |
| **US6** | Fonctionnel | Afficher le tableau Kanban à 3 colonnes (`TODO`, `IN_PROGRESS`, `DONE`) | Haute |
| **US7** | Fonctionnel | Déplacer les tâches entre colonnes et filtrer par utilisateur | Haute |
| **US8** | Fonctionnel | Supprimer une tâche du tableau de flux | Moyenne |
| **T9** | Technique | Développer le microservice `task-service` avec Express et Node.js | Haute |
| **T10** | Technique | Écrire la suite de tests unitaires Jest pour `task-service` (13 tests) | Haute |
| **T11** | Technique | Développer le Frontend Single Page Application avec Tailwind CSS | Haute |
| **T12** | Technique | Configurer le Reverse Proxy Nginx en passerelle API unifiée | Haute |
| **T13** | Technique | Écrire les Dockerfiles multi-étapes pour chaque microservice | Haute |
| **T14** | Technique | Écrire le descripteur d'orchestration `docker-compose.yml` | Haute |
| **T15** | Technique | Instrumenter les métriques Prometheus avec `prom-client` (/metrics) | Haute |
| **T16** | Technique | Provisionner automatiquement la source de données et le dashboard Grafana | Moyenne |
| **T17** | Technique | Configurer le serveur d'intégration continue Jenkins et Docker-in-Docker | Haute |
| **T18** | Technique | Développer le pipeline déclaratif `Jenkinsfile` (5 étapes automatisées) | Haute |
| **T19** | Technique | Interconnecter le Webhook GitHub avec Jenkins pour déclenchement push | Haute |
| **T20** | Technique | Déployer, sécuriser et valider la solution complète sous AWS EC2 | Haute |

*Tableau 3.3 – Backlog global hiérarchisé du projet TaskFlow (20 éléments)*

## 3.7 Conclusion du chapitre
Dans ce troisième chapitre, nous avons identifié les acteurs de la solution, détaillé les exigences fonctionnelles et non-fonctionnelles, et structuré le projet en un Backlog global de 20 éléments hiérarchisés. Cette formalisation constitue le socle indispensable pour aborder avec rigueur la phase de conception architecturale et technique détaillée au chapitre 4.

---

# Chapitre 4 : Conception et architecture de la solution

## Introduction
La phase de conception permet de traduire les exigences fonctionnelles et techniques en une architecture logicielle et matérielle pérenne, modulaire et évolutive. Ce quatrième chapitre détaille l'architecture globale de la plateforme TaskFlow, le découpage en microservices, le rôle de la passerelle d'accès Nginx, la cinématique du pipeline CI/CD automatisé, la structure des modèles de données et l'architecture du système de surveillance continue.

## 4.1 Architecture globale du système (Modèle 3-Tiers Microservices)
L'architecture de TaskFlow s'appuie sur le patron architectural en trois tiers modernisé par l'approche microservices et la conteneurisation Docker :
1. **Couche Présentation & Passerelle (Tier 1)** : Constituée du conteneur `taskflow-frontend` fonctionnant sous Nginx. Il sert les ressources statiques de l'interface utilisateur web et joue le rôle de passerelle d'accès unifiée (API Gateway). Tous les flux clients externes entrent exclusivement par le port HTTP standard 80.
2. **Couche Métier Microservices (Tier 2)** : Composée de deux microservices autonomes s'exécutant dans des conteneurs distincts :
   - `taskflow-user-service` (port interne 3001) : Dédié au traitement de la logique métier relative aux utilisateurs.
   - `taskflow-task-service` (port interne 3002) : Dédié à la gestion des tâches, aux transitions d'état et aux règles de filtrage.
3. **Couche Observabilité & Automatisation (Tier 3)** : Assurée par `taskflow-prometheus` (port 9090) qui collecte les métriques de fonctionnement, `taskflow-grafana` (port 3000) qui les met en forme sur des graphiques dynamiques, et `taskflow-jenkins` (port 8080) qui orchestre l'usine logicielle.

### 4.1.1 Rôle de l'API Gateway Nginx
L'intégration de Nginx en amont des microservices répond à plusieurs impératifs majeurs :
* **Point d'entrée unique** : Le client web n'a pas à connaître la topologie réseau interne ni les numéros de ports individuels des différents microservices.
* **Résolution des problèmes de partage de ressources cross-origin (CORS)** : Comme l'interface utilisateur et les appels d'API transitent sous la même origine HTTP (même adresse IP et même port 80), les risques de blocage liés aux politiques de sécurité des navigateurs sont éliminés à la source.
* **Routage dynamique des requêtes** :
  - Les requêtes préfixées par `/api/users` sont relayées vers `http://user-service:3001`.
  - Les requêtes préfixées par `/api/tasks` sont relayées vers `http://task-service:3002`.
  - Les requêtes de vérification `/api/health/users` et `/api/health/tasks` sont transparentes et routées vers les sondes de santé respectives.

## 4.2 Architecture du processus CI/CD automatisé
La chaîne de livraison continue a été conçue pour garantir une traçabilité totale et une absence d'erreur humaine lors de la mise en ligne. Le processus suit un flux linéaire conditionné par des portes de qualité (Quality Gates) :
1. Le développeur finalise ses modifications de code sur son poste de travail et exécute un `git push origin master`.
2. Le serveur GitHub détecte le commit et déclenche immédiatement une requête HTTP POST via le Webhook configuré vers le serveur Jenkins sous AWS.
3. Jenkins initialise le pipeline `TaskFlow-Pipeline` décrit dans le `Jenkinsfile`.
4. Le pipeline clone la version exacte du code source (étape *Checkout*).
5. Jenkins installe les dépendances et exécute la totalité des tests unitaires Jest pour les deux microservices (étape *Install & Test*). Si un seul test échoue, le pipeline s'arrête net, empêchant toute compilation d'image défectueuse.
6. En cas de succès complet des tests, Jenkins ordonne la construction des nouvelles images Docker conteneurisées (étape *Build Docker Images*).
7. Les conteneurs en production sont recréés et redémarrés de manière transparente via Docker Compose (étape *Deploy Containers*).
8. Une série de vérifications HTTP automatisées (`curl`) sonde la santé effective des 5 conteneurs en ligne pour confirmer la réussite totale de l'opération (étape *Healthcheck Verification*).

## 4.3 Conception des modèles de données
Dans le respect du paradigme des microservices, chaque service conserve la maîtrise de son propre domaine métier et de son schéma de données.

### 4.3.1 Modèle de l'entité User (user-service)
L'entité `User` représente un collaborateur intervenant sur les projets. Ses attributs sont :
* `id` : Identifiant primaire unique de l'utilisateur.
* `name` : Nom complet du collaborateur (obligatoire, non vide).
* `email` : Adresse de messagerie électronique (obligatoire, format email valide).
* `role` : Titre ou fonction au sein de l'équipe (ex. « Lead Developer », « DevOps Engineer »).
* `createdAt` : Horodatage ISO 8601 de création de l'enregistrement.

### 4.3.2 Modèle de l'entité Task (task-service)
L'entité `Task` modélise une activité inscrite sur le tableau Kanban. Ses attributs sont :
* `id` : Clé primaire unique de la tâche.
* `title` : Titre concis décrivant l'action à mener (obligatoire).
* `description` : Explication détaillée des objectifs et critères d'achèvement.
* `status` : État d'avancement de la tâche (`TODO`, `IN_PROGRESS`, ou `DONE`).
* `assignedTo` : Référence logique vers l'identifiant du collaborateur assigné.
* `createdAt` : Horodatage ISO 8601 de soumission de la tâche.

### 4.3.3 Intégrité et découplage inter-services
Conformément aux bonnes pratiques microservices, le microservice `task-service` ne réalise pas de jointure de base de données physique avec `user-service`. Il stocke l'identifiant `assignedTo` en tant que clé logique étrangère. Lorsque le frontend requiert l'affichage des informations utilisateur associées à une carte Kanban, il effectue la corrélation dynamiquement côté client ou interroge l'API Gateway, préservant ainsi l'indépendance de déploiement et de stockage de chaque microservice.

## 4.4 Architecture du système de monitoring
L'infrastructure de surveillance a été pensée pour être totalement non intrusive vis-à-vis du code métier :
1. Chaque microservice intègre le middleware `prom-client` qui intercepte chaque requête HTTP entrante et sortante et calcule :
   - Le compteur global de requêtes : `http_requests_total{method, route, status}`.
   - L'histogramme des durées de réponse : `http_request_duration_seconds`.
   - Les jauges d'état du runtime Node.js : `nodejs_heap_size_used_bytes`, `process_cpu_seconds_total`.
2. Le conteneur `taskflow-prometheus` exécute un démon périodique qui interroge toutes les 5 secondes les endpoints `/metrics` de chaque conteneur via le réseau virtuel Docker interne.
3. Grafana interroge la base de données temporelle de Prometheus au moyen du langage de requête **PromQL** et calcule les taux instantanés (via la fonction `rate()`) pour afficher les graphiques de trafic en temps réel.

## 4.5 Conclusion du chapitre
Dans ce quatrième chapitre, nous avons défini l'architecture 3-tiers de TaskFlow, formalisé le rôle central de l'API Gateway Nginx, modélisé la cinématique du pipeline CI/CD automatisé et exposé la structure des données ainsi que l'infrastructure d'observabilité. Nous pouvons maintenant examiner, au chapitre 5, le développement concret et la réalisation technique des différentes couches logicielles du projet.

---

# Chapitre 5 : Développement et réalisation de la plateforme TaskFlow

## Introduction
Ce cinquième chapitre est dédié à la réalisation technique de la plateforme TaskFlow. Nous y présentons l'environnement de développement, la structure des microservices backend, la conception de l'interface utilisateur frontend et les mécanismes de tests unitaires et d'intégration mis en œuvre pour garantir la robustesse du système.

## 5.1 Environnement de développement et outils
Le développement de TaskFlow a été réalisé sous un environnement moderne combinant les outils suivants :
* **Système d'exploitation** : Ubuntu Linux et Windows 11 avec terminal PowerShell et Bash.
* **Environnement d'exécution** : Node.js (version 20 LTS) et gestionnaire de paquets `npm`.
* **Éditeur de code** : Visual Studio Code doté des extensions Docker, GitLens, et REST Client.
* **Outils de test** : Framework Jest (version 29) et bibliothèque Supertest.
* **Serveurs d'infrastructure locale** : Docker Desktop avec moteur Docker Compose.

## 5.2 Développement du Frontend TaskFlow

### 5.2.1 Interface utilisateur réactive et ergonomique
L'interface utilisateur de TaskFlow a été pensée pour offrir une expérience fluide, intuitive et professionnelle, sans temps de chargement perceptible. Conçue comme une **Single Page Application (SPA)**, elle tire parti du framework CSS utilitaire Tailwind pour composer une charte graphique élégante à dominante sombre et professionnelle.

L'interface se structure autour de trois zones majeures :
1. **La barre d'en-tête (Header)** : Elle affiche le logo de la plateforme TaskFlow, un rappel de l'environnement (« AWS Cloud Edition »), ainsi que des badges de statut en temps réel indiquant la santé opérationnelle des microservices `Users` et `Tasks`. Une pastille verte animée signale la disponibilité immédiate de chaque service.
2. **Le tableau de bord Kanban (Main Board)** : Le cœur fonctionnel de l'application, présentant les cartes de tâches organisées en trois colonnes bien distinctes (`À faire`, `En cours`, `Terminé`).
3. **Le panneau de commande et d'administration** : Permettant d'ajouter de nouveaux collaborateurs via une modale dédiée, de filtrer l'affichage du tableau, et d'accéder aux consoles d'infrastructure (Jenkins et Grafana).

### 5.2.2 Tableau Kanban dynamique et interactif
Chaque tâche est matérialisée par une carte visuelle indiquant :
* Le titre de la tâche et sa description.
* Le nom et le rôle du collaborateur assigné.
* La date de création de l'enregistrement.
* Des boutons d'action rapide permettant de faire avancer la tâche vers le statut suivant ou de la rétrograder, déclenchant instantanément un appel REST `PATCH /api/tasks/:id` sans aucun rafraîchissement global de la page.
* Une option de suppression directe.

### 5.2.3 Portail DevOps et résolutions dynamiques d'hôtes
Pour gérer avec élégance la variabilité des adresses IP sous le cloud AWS Academy, nous avons programmé une résolution dynamique d'hôtes dans le frontend (`app.js`) :
```javascript
const currentHost = window.location.hostname;
const jenkinsUrl = `http://${currentHost}:8080/job/TaskFlow-Pipeline/`;
const grafanaUrl = `http://${currentHost}:3000/d/taskflow-overview/taskflow-e28094-microservices-monitoring-dashboard`;
```
Grâce à ce mécanisme, quel que soit l'hôte sur lequel l'application est consultée (adresse localhost ou IP AWS `34.206.71.95`), les hyperliens de redirection vers Jenkins et Grafana pointent toujours de manière exacte vers l'instance active.

## 5.3 Développement des Microservices Backend

### 5.3.1 Service Utilisateurs (user-service)
Le microservice `user-service` est hébergé dans le répertoire `/user-service` et écoute sur le port 3001. Il implémente les routes d'API suivantes :
* `GET /health` : Sonde de disponibilité renvoyant un statut HTTP 200 et un payload JSON `{ status: "healthy", service: "user-service" }`.
* `GET /metrics` : Point de terminaison exposant les séries temporelles pour Prometheus.
* `GET /api/users` : Restitue la liste complète des collaborateurs enregistrés.
* `POST /api/users` : Enregistre un nouvel utilisateur après validation stricte des champs obligatoires (`name`, `email`).
* `GET /api/users/:id` : Restitue le profil détaillé d'un utilisateur par son identifiant.
* `DELETE /api/users/:id` : Supprime l'utilisateur spécifié.

### 5.3.2 Service Tâches (task-service)
Le microservice `task-service` est situé dans le dossier `/task-service` et écoute sur le port 3002. Il gère l'ensemble du cycle de vie des cartes du tableau :
* `GET /health` : Sonde de santé opérationnelle du service.
* `GET /metrics` : Point de collecte des métriques applicatives.
* `GET /api/tasks` : Retourne la liste des tâches avec filtres de requête (`?status=...` et `?userId=...`).
* `POST /api/tasks` : Crée une nouvelle tâche avec validation du titre.
* `GET /api/tasks/:id` : Récupère les données d'une tâche spécifique.
* `PATCH /api/tasks/:id` : Met à jour partiellement une tâche (changement d'état `TODO` -> `IN_PROGRESS` -> `DONE`).
* `DELETE /api/tasks/:id` : Supprime définitivement la tâche.

## 5.4 Validation et tests automatisés (Jest)
La fiabilité de l'application repose sur une couverture de tests automatisée rigoureuse. Nous avons rédigé deux suites de tests complètes exécutables via `npm test` :
* Dans `user-service` : Le fichier `tests/user.test.js` regroupe **7 tests automatisés** validant la création, le rejet des erreurs de saisie, la sélection par identifiant, la suppression et la sonde `/health`.
* Dans `task-service` : Le fichier `tests/task.test.js` regroupe **13 tests automatisés** vérifiant la création, les statuts, les transitions d'état, le filtrage par statut et utilisateur, la gestion des erreurs 404 et la sonde `/health`.

Le résultat d'exécution des tests confirme un taux de réussite de **100% (20/20 tests passants)** en moins de 2 secondes.

## 5.5 Conclusion du chapitre
Dans ce cinquième chapitre, nous avons détaillé la réalisation des microservices `user-service` et `task-service`, l'implémentation de l'interface réactive Kanban, l'intégration des sondes de santé et d'observabilité, ainsi que la validation exhaustive des 20 tests Jest. Nous allons maintenant examiner au chapitre 6 l'automatisation intégrale du processus CI/CD avec Jenkins et la configuration de la supervision Prometheus et Grafana.

---

# Chapitre 6 : Mise en place du processus CI/CD et Monitoring

## Introduction
L'automatisation du cycle de vie logiciel et la surveillance en temps réel des environnements d'exécution constituent le cœur de la démarche DevOps. Ce sixième chapitre décrit la mise en œuvre de notre pipeline d'intégration et de déploiement continus à l'aide de Jenkins, l'interconnexion instantanée avec GitHub via Webhook, ainsi que le déploiement et la configuration de notre pile d'observabilité Prometheus et Grafana.

## 6.1 Configuration du serveur d'automatisation Jenkins

### 6.1.1 Architecture Jenkins sous Docker
Pour héberger notre serveur d'intégration continue, nous avons construit une image personnalisée basée sur `jenkins/jenkins:lts` (`Dockerfile.jenkins`).

Afin de permettre à Jenkins de piloter la création et le déploiement de conteneurs Docker sans recourir à un démon Docker imbriqué instable, nous avons mis en œuvre la technique **Docker-out-of-Docker (DooD)** :
* Le socket Docker de la machine hôte (`/var/run/docker.sock`) est monté en tant que volume à l'intérieur du conteneur Jenkins.
* Le client Docker CLI officiel et le plugin `docker-compose` ont été installés dans l'image Jenkins.
* L'utilisateur `jenkins` a été inclus dans le groupe d'administration `docker` de l'hôte Linux.
Grâce à cette disposition, Jenkins dispose des pleins pouvoirs pour ordonner au moteur Docker de l'hôte AWS d'instancier, arrêter et redémarrer les conteneurs de l'application TaskFlow.

### 6.1.2 Pipeline-as-Code via Jenkinsfile déclaratif
L'intégralité du comportement du pipeline CI/CD est formalisée dans le fichier `Jenkinsfile` stocké à la racine du dépôt Git. Il orchestre séquentiellement :
1. **Checkout** : Récupération du code source exact depuis GitHub.
2. **Install & Test** : Installation des dépendances et exécution des 20 tests unitaires Jest. Si un seul test échoue, le pipeline s'interrompt immédiatement (Quality Gate).
3. **Build Docker Images** : Compilation des images conteneurisées via `docker compose build`.
4. **Deploy Containers** : Déploiement et recréation à chaud des conteneurs via `docker compose up -d --force-recreate`.
5. **Healthcheck Verification** : Contrôle effectif par requêtes HTTP curl de la disponibilité des 5 conteneurs en ligne.

## 6.2 Déclenchement automatique en temps réel via GitHub Webhook
Afin de rendre le déploiement totalement autonome sans intervention de l'administrateur, nous avons configuré une liaison par Webhook entre le référentiel GitHub `https://github.com/sphinx12/taskflow` et l'instance Jenkins AWS.

Le paramétrage a comporté les étapes suivantes :
1. Installation du plugin officiel `GitHub Plugin` sur Jenkins.
2. Configuration du job `TaskFlow-Pipeline` avec l'option « GitHub hook trigger for GITScm polling ».
3. Enregistrement d'un Webhook dans les paramètres du dépôt GitHub pointant vers : `http://34.206.71.95:8080/github-webhook/`.
4. Validation du ping initial par GitHub renvoyant un code HTTP **200 OK** (pastille verte).

Désormais, tout `git push` déclenche l'exécution du pipeline en moins d'une seconde, assurant une intégration continue en temps réel.

## 6.3 Mise en œuvre de l'Observabilité avec Prometheus
Le conteneur `taskflow-prometheus` embarque le fichier déclaratif `prometheus.yml` configuré pour scraper les microservices toutes les 5 secondes :
* Cible 1 : `user-service:3001`
* Cible 2 : `task-service:3002`

Afin d'éviter tout problème de montage de volume lors des builds Jenkins, la configuration est encapsulée directement dans l'image via `Dockerfile.prometheus` selon le principe d'**infrastructure immuable**.

## 6.4 Visualisation et Tableaux de bord sous Grafana
Dans le respect des bonnes pratiques de l'Infrastructure-as-Code (IaC), nous avons entièrement automatisé le **provisioning** de Grafana :
* **Datasource provisioning** : La source de données Prometheus (`http://prometheus:9090`) est automatiquement configurée dès le lancement.
* **Dashboard provisioning** : Le tableau de bord complet `taskflow-overview.json` est immédiatement chargé dans le répertoire `/var/lib/grafana/dashboards/`.
* **Indicateurs clés affichés** :
  - Disponibilité des microservices (Badges UP/DOWN).
  - Débit des requêtes HTTP (Throughput en req/s calculé via `rate(http_requests_total[1m])`).
  - Latence moyenne de traitement des requêtes HTTP.
  - Empreinte mémoire RAM consommée par le moteur Node.js.

## 6.5 Conclusion du chapitre
Dans ce sixième chapitre, nous avons explicité la configuration du pipeline CI/CD sous Jenkins, le déclenchement automatisé par Webhook GitHub, et la mise en œuvre de la supervision continue sous Prometheus et Grafana. Le chapitre 7 traite du déploiement cloud final sur AWS et de la validation opérationnelle.

---

# Chapitre 7 : Déploiement cloud et validation sur AWS

## Introduction
La dernière phase de notre projet consiste à déployer l'intégralité de la solution TaskFlow dans un environnement Cloud réel et à valider son bon fonctionnement opérationnel. Ce septième chapitre présente l'environnement Cloud Amazon Web Services (AWS), la configuration de l'instance virtuelle EC2 et de ses règles de sécurité réseau, l'orchestration des conteneurs en production, ainsi que l'exécution des tests de validation de bout en bout et l'analyse critique des résultats obtenus.

## 7.1 L'environnement Cloud AWS Academy
Le déploiement de TaskFlow a été réalisé sur la plateforme Cloud d'**Amazon Web Services** au sein du laboratoire **AWS Academy Learner Lab** (région `us-east-1`).

Cet environnement fournit un cadre représentatif des infrastructures de production industrielles, imposant la gestion rigoureuse des adresses IP publiques, des règles de pare-feu virtuel et des contraintes d'allocation de ressources matérielles.

## 7.2 Provisioning et configuration de l'instance AWS EC2

### 7.2.1 Caractéristiques de l'instance
* **Identifiant d'instance** : `i-0f9153778f0e168f7`
* **Système d'exploitation** : Ubuntu Server 24.04 LTS (x86_64)
* **Type d'instance** : `t3.medium` (2 vCPU, 4 Gio RAM)
* **Stockage** : 30 Gio SSD gp3
* **Adresse IPv4 publique** : `34.206.71.95`

### 7.2.2 Configuration des Groupes de Sécurité (Security Groups)
Le Security Group AWS a été configuré pour n'ouvrir que les ports strictement nécessaires :
* Port **22** : SSH (administration système)
* Port **80** : HTTP Frontend et Nginx API Gateway
* Port **8080** : Serveur Jenkins et récepteur du Webhook GitHub
* Port **3000** : Console de supervision Grafana
* Ports **3001** et **3002** : Microservices `user-service` et `task-service`
* Port **9090** : Serveur Prometheus

## 7.3 Déploiement en production et validation fonctionnelle

### 7.3.1 Validation du cycle complet par push Git
Pour valider l'intégralité de la chaîne opérationnelle, un scénario de test complet a été exécuté en conditions réelles :
1. Un commit portant sur l'optimisation des sondes a été poussé vers GitHub (`git push origin master`).
2. GitHub a émis la notification Webhook vers `http://34.206.71.95:8080/github-webhook/`.
3. Jenkins a déclenché le **Build #13** du job `TaskFlow-Pipeline`.
4. Toutes les étapes (Checkout, Tests Jest 20/20, Build Docker, Deploy Docker Compose, Healthcheck) se sont exécutées avec succès en **38 secondes**.

### 7.3.2 Validation des points d'accès publics
Après déploiement, nous avons confirmé l'accessibilité publique sur l'IP `34.206.71.95` :
* **Portail Web TaskFlow** : `http://34.206.71.95/` (Dashboard Kanban réactif et badges de santé verts).
* **Console Jenkins** : `http://34.206.71.95:8080/job/TaskFlow-Pipeline/` (Historique des builds au vert).
* **Supervision Grafana** : `http://34.206.71.95:3000/d/taskflow-overview/taskflow-e28094-microservices-monitoring-dashboard` (Graphiques dynamiques de trafic et latence).
* **Sondes API** : `http://34.206.71.95:3001/health` et `http://34.206.71.95:3002/health` (HTTP 200 OK).

## 7.4 Résultats obtenus et limites de la solution

### 7.4.1 Synthèse des résultats obtenus
* Conception d'une architecture microservices modulaire et réactive.
* Couverture de tests unitaires et d'intégration validée à 100% (20/20 tests Jest).
* Déploiement continu automatisé en moins de 40 secondes via Jenkins et Webhook GitHub.
* Observabilité temps réel via Prometheus et Grafana.
* Déploiement validé sur le Cloud AWS EC2.

### 7.4.2 Limites identifiées
* Instance EC2 unique (point unique de défaillance matériel).
* Renouvellement de l'adresse IP à l'expiration de la session AWS Learner Lab (4 heures).
* Persistance en mémoire nécessitant une transition future vers une base de données relationnelle persistante (PostgreSQL).

## 7.5 Conclusion du chapitre
Dans ce septième chapitre, nous avons décrit le déploiement cloud sur AWS EC2, la configuration réseau et de sécurité, l'exécution réussie du build Jenkins #13 déclenché par Webhook, et validé le fonctionnement en ligne de tous les services.

---

# Conclusion générale et perspectives d'avenir

Au terme de ce projet de fin d'études, nous avons conçu, réalisé et automatisé le déploiement de **TaskFlow**, une plateforme de gestion collaborative de tâches basée sur une architecture moderne en microservices, déployée sur le cloud Amazon Web Services (AWS) et supervisée en continu.

Ce projet a permis de concilier avec succès les exigences du génie logiciel et les pratiques avancées de l'ingénierie DevOps :
* Deux microservices modulaires développés avec Node.js et Express (`user-service` et `task-service`), orchestrés derrière une passerelle API Nginx et servis par une interface web réactive (Tableau Kanban dynamique).
* Une suite de 20 tests automatisés avec Jest assurant une qualité logicielle irréprochable.
* Un pipeline CI/CD automatisé sous Jenkins avec Pipeline-as-Code, interconnecté en temps réel avec les Webhooks GitHub, réalisant le cycle complet de livraison en moins de 40 secondes.
* Une pile d'observabilité complète avec Prometheus et Grafana visualisant la santé, le trafic et la mémoire en temps réel.

Cette expérience au sein de l'entreprise **Creto** et en collaboration étroite avec l'**ISET de Sousse** a constitué une opportunité d'apprentissage majeure dans la manipulation des technologies leaders du marché et l'application des bonnes pratiques professionnelles.

### Perspectives futures d'évolution
* Migration vers un cluster Kubernetes (K8s/K3s) avec autoscaling horizontal (HPA).
* Persistance des données avec PostgreSQL et Prisma ORM sous AWS RDS.
* Sécurisation des flux web en HTTPS avec Let's Encrypt.
* Analyse de la qualité et sécurité du code avec SonarQube dans le pipeline.
* Gestion proactive des alertes par e-mail ou Slack avec Alertmanager.

---

# Bibliographie et Netographie

1. **Docker Inc.** (2024). *Docker Documentation: Containerization and Docker Compose Specification*. Disponible sur : https://docs.docker.com/
2. **Jenkins Community** (2024). *Jenkins User Documentation: Pipeline-as-Code with Jenkinsfile*. Disponible sur : https://www.jenkins.io/doc/
3. **OpenJS Foundation** (2024). *Node.js v20 LTS Documentation & Architecture Guide*. Disponible sur : https://nodejs.org/en/docs/
4. **Express.js Team** (2024). *Express - Fast, unopinionated, minimalist web framework for Node.js*. Disponible sur : https://expressjs.com/
5. **Meta Open Source** (2024). *Jest: Delightful JavaScript Testing Framework*. Disponible sur : https://jestjs.io/
6. **Prometheus Authors** (2024). *Prometheus: An open-source monitoring system with a dimensional data model*. Disponible sur : https://prometheus.io/docs/
7. **Grafana Labs** (2024). *Grafana Documentation: Provisioning Dashboards and Data Sources*. Disponible sur : https://grafana.com/docs/
8. **Amazon Web Services (AWS)** (2024). *Amazon Elastic Compute Cloud (EC2) User Guide for Linux Instances*. Disponible sur : https://docs.aws.amazon.com/ec2/
9. **GitHub Inc.** (2024). *GitHub Webhooks and REST API Documentation*. Disponible sur : https://docs.github.com/en/webhooks
10. **Nginx Software Inc.** (2024). *Nginx Reverse Proxy and Load Balancing Guide*. Disponible sur : https://nginx.org/en/docs/
11. **Tailwind Labs** (2024). *Tailwind CSS Documentation: Modern utility-first CSS framework*. Disponible sur : https://tailwindcss.com/docs
12. **Cloud Native Computing Foundation (CNCF)** (2024). *The DevOps and Cloud Native Landscape*. Disponible sur : https://landscape.cncf.io/
