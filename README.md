# buyume


To start, Just Setup nodeJS and run the following commands:
1. npm i
2. npm start

There is 01 route working as of now, in the local environment.
It can be invoked in the following way:
curl --location --request POST 'http://127.0.0.1:3000/home' \
--header 'Content-Type: application/json' \
--data-raw '{
    "payload": [
        {
            "productId": 123,
            "quantity": 10,
            "operation": "add"
        },
        {
            "productId": 143,
            "quantity": 14,
            "operation": "add"
        },
        {
            "productId": 193,
            "quantity": 17,
            "operation": "subtract"
        }
    ]
}'
