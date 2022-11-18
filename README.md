# [Link Shortener API](https://linkshortner-starter.herokuapp.com/YmXz)

  

This is a simple link shortener API that takes a long URL and returns the equivalent short URL. This also serves a project starter template with the following feature: 
- Advance logging to Elastic search in production
- Inversion of control pattern
- Object oriented design
- Continous deployment to heroku using Git actions

  

## Configuration

  

- Run the following command to install all dependencies

  

```bash

npm install

```

  

- Configure Database credentials

  

```env

DB_USER=root

DB_PASSWORD=password

DB_HOST=localhost

DB_NAME=shortener

DB_PORT=3306

HOST=http://localhost/

DOMAIN=localhost

PORT=80

NODE_ENV=development

API_KEY=12345678

SHOW_DB_NAME_QUERIES=true

```

  

- Start locally by running

  

```npm

npm run dev

```

  

- To run all test cases

  

```bash

npm test

```

  

- To build

  

```npm

npm build

```

## Documentation

- Short a new Url
 
```
POST http://localhost/api/v1/url
{
	"originalUrl":  "https://documenter.getpostman.com/view/5618136/UUy7b4NP"
}
```
 
 - Load a shorten Url
 
```
GET http://localhost/oU4L
 ```

 - Delete a shorten Url
 
```
DELETE localhost:8080/api/v1/url/oU4L
 ```
  

## Contributing

  

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  

Please make sure to update tests as appropriate.