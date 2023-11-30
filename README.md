# fastapi-vue3-oauth-example


## Version

- python: 3.10
- fastapi 0.104.1
- fastapi-users: 12.1.2



## Get Started

```sh
# install poetry
curl -sSL https://install.python-poetry.org | python3 -

poetry install
poetry run uvicorn app.main:app --reload
```

Open your browser at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## Development

```sh
python3 -m venv .venv
source .venv/bin/activate
poetry init
poetry add 'fastapi[all]' 'fastapi-users[sqlalchemy,oauth]' aiosqlite loguru python-decouple
poetry run uvicorn app.main:app --reload
```

## References

- [docs: Lifespan Events](https://fastapi.tiangolo.com/advanced/events/)
- [discussion: Google OAth integration with Fastapi](https://github.com/fastapi-users/fastapi-users/discussions/1183#discussioncomment-5488661)
- [reddit: Google oauth with fastapi-users procedure](https://www.reddit.com/r/pythonhelp/comments/14xjmyr/google_oauth_with_fastapiusers_procedure/)
