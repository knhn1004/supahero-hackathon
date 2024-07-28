FROM python:3.10-slim

WORKDIR /app

RUN pip install poetry

COPY . .

RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

EXPOSE 5001

CMD ["poetry", "run", "uvicorn", "shop_crew.main:app", "--host", "0.0.0.0", '--port', '5000']