# TaskFlow — CI/CD DevOps Project

A microservices-based task management backend built as a Master's PFE project demonstrating a complete DevOps CI/CD pipeline deployed on AWS EC2 Cloud with automated GitHub Webhooks.

## Architecture

```
taskflow/
├── Jenkinsfile               ← CI/CD pipeline definition
├── docker-compose.yml        ← Container orchestration
├── user-service/             ← User microservice (port 3001)
│   ├── Dockerfile
│   ├── src/
│   │   ├── app.js            ← Express API
│   │   └── index.js          ← Server entrypoint
│   └── tests/
│       └── user.test.js      ← Jest + Supertest tests
└── task-service/             ← Task microservice (port 3002)
    ├── Dockerfile
    ├── src/
    │   ├── app.js            ← Express API
    │   └── index.js          ← Server entrypoint
    └── tests/
        └── task.test.js      ← Jest + Supertest tests
```

## Technology Stack

* **Cloud Provider:** Amazon Web Services (AWS EC2)
* **CI/CD:** Jenkins (Pipeline-as-Code)
* **Containerization:** Docker & Docker Compose
* **Microservices:** Node.js, Express
* **Testing:** Jest, Supertest
* **Automation:** GitHub Webhooks (Real-Time Push Triggers)
| **Node.js / Express** | Microservice runtime |
| **Jest + Supertest** | Automated testing |
| **Docker** | Containerization |
| **Docker Compose** | Service orchestration |
| **Jenkins** | CI/CD pipeline |
| **Git** | Version control |

## Microservices

### User Service (port 3001)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Healthcheck |
| POST | `/api/users` | Create user |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |

### Task Service (port 3002)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Healthcheck |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | List all tasks (supports `?userId=` and `?status=` filters) |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Quick Start

```bash
# Run all tests
cd user-service && npm test
cd task-service && npm test

# Build and run with Docker
docker compose up -d

# Check services
curl http://localhost:3001/health
curl http://localhost:3002/health
```

## CI/CD Pipeline Stages

1. **Checkout** — Pull source code from Git
2. **Install Dependencies** — `npm ci` for both services (parallel)
3. **Run Tests** — Jest tests for both services (parallel) — **FAILED TESTS BLOCK DEPLOYMENT**
4. **Build Docker Images** — `docker compose build`
5. **Deploy** — `docker compose up -d`
6. **Health Check** — Verify both services respond on `/health`
