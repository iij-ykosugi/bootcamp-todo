# ToDo API Server

## コンテナイメージを作成する

```sh
docker build . -t bootcamp-todo-api
```

## 実行する

```sh
docker run --rm -p 8080:8080 bootcamp-todo-api --port=8080
# Docker Desktop の場合
docker run --rm -p 8080:8080 bootcamp-todo-api --port=8080 --host=0.0.0.0
```
