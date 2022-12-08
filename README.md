- 起動

```sh
docker compose up
```

- コネクターの作成

```sh
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-postgres.json
```

- データの初期化

```sh


```
