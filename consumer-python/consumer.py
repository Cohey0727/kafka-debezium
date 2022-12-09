from kafka import KafkaConsumer

print("Start consumer")

consumer = KafkaConsumer(
    'database.example.books', bootstrap_servers=['localhost:9092']
)

print("Consumer created")

for msg in consumer:
    print(msg)

print("End consumer")
