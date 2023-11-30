# fastapi-vue3-oauth-example

This project demonstrates the implementation of [Google login](https://console.cloud.google.com/apis/credentials) using [fastapi-users](https://fastapi-users.github.io/fastapi-users/12.1/) for the backend, complemented by a [Vue 3](https://vuejs.org/) frontend.

## Library Version

| Library                                                         | Version | Frontend/Backend |
| --------------------------------------------------------------- | ------- | ---------------- |
| Python                                                          | 3.10    | Backend          |
| [FastAPI](https://github.com/tiangolo/fastapi)                  | 0.104.1 | Backend          |
| [FastAPI-Users](https://github.com/fastapi-users/fastapi-users) | 12.1.2  | Backend          |
| Vite                                                            | 4.4.11  | Frontend         |
| Vue                                                             | 3.3.4   | Frontend         |

## 🚀 Get Started

### Backend (fastapi)

```sh
# install poetry
curl -sSL https://install.python-poetry.org | python3 -

poetry install
poetry run uvicorn app.main:app --reload
```

Open your browser at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### Frontend (vue3 with vite)

```sh
npm install
npm run dev
```

---

## ⚙️ Development

### Backend (fastapi)

```sh
python3 -m venv .venv
source .venv/bin/activate
poetry init
poetry add 'fastapi[all]' 'fastapi-users[sqlalchemy,oauth]' aiosqlite loguru python-decouple
poetry run uvicorn app.main:app --reload
```

### Frontend (vue3 with vite)

```sh
npm init vue@latest
cd frontend
npm install axios
npm install
npm run dev
```

---

## 📚 References

- [Docs: Fastapi Lifespan Events](https://fastapi.tiangolo.com/advanced/events/)
- [Discussion: Google OAth integration with Fastapi](https://github.com/fastapi-users/fastapi-users/discussions/1183#discussioncomment-5488661) 💎💎💎
- [Reddit: Google oauth with fastapi-users procedure](https://www.reddit.com/r/pythonhelp/comments/14xjmyr/google_oauth_with_fastapiusers_procedure/)
