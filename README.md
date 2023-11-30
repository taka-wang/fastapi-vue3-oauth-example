# fastapi-vue3-oauth-example

## Get Started

```sh
python3 -m venv .venv
source .venv/bin/activate
poetry init
poetry add 'fastapi[all]' 'fastapi-users[sqlalchemy,oauth]' aiosqlite loguru python-decouple
poetry run uvicorn app.main:app --reload
```

Open your browser at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).
