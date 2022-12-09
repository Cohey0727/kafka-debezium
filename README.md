- 起動

```sh
docker compose up
```

## Debezium

### Connect Rest API

#### コネクタの取得

```sh
curl -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/
```

#### コネクタの作成

```sh
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-postgres.json
```

#### コネクタの削除

```sh
curl -X DELETE http://localhost:8083/connectors/example-connector
```

- シードデータ

```sh


```

## トラブルシューティング

### kafka が起動しない

- エラー内容

```sh
org.apache.zookeeper.KeeperException$NodeExistsException: KeeperErrorCode = NodeExists
```

log ファイルが悪さをしている可能性があるので、ボリュームを消して再起動。

```sh
docker volume prune
docker compose up
```
