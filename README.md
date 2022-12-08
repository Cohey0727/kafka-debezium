- 起動

```sh
docker compose up
```

- コネクタの作成

```sh
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-postgres.json
```

- コネクタの削除

```sh
curl -X DELETE http://localhost:8083/connectors/example-connector
```

- データの初期化

```sh


```
