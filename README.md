# fc-monolito
Example of a monolithic system developed sustainably by applying software engineering best practices

# migration
$ npx sequelize-cli migration:generate --name create-product-adm-products
$ npx sequelize-cli migration:generate --name add-price-columns-to-products
$ npx sequelize-cli db:migrate