Run app in docker: 
1) Run 
  ```sh
    docker-compose up
  ```

Run app locally without Docker: 

1) Run database 
  ```sh
    docker-compose up postgres
  ```
2) Run migrations
  ```sh
    yarn typeorm:run-migrations
  ```
3) Run app 
  ```sh
    yarn start
  ```

How to create migrations: 
  ```sh
    yarn typeorm:create-migration MIGRATION_NAME 
  ```
