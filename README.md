# EDTECH

## Description

AN e-learning platform designed to make education more assible, flexible and engaging.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API endpoints

### Register a user
**POST** `/auth/signup`

**Request Body**
```json
{
	"username": "daniel123",
	"email": "daniel.ochigbo@gmail.com",
	"password": "NGNdaniel0&"
}
```
**Response**
```json
{
	"message": "User successfully created"
}
```

### Login User
**POST**  ``user/login``
**Request**
```json
{
	"username": "daniel123",
	"password": "NGNdaniel0&"
}
```
**Request**
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGFuaWVsLm9jaGlnYm9AbXRuLmNvbSIsImlhdCI6MTc0ODE4MjI5NywiZXhwIjoxNzQ4MTg1ODk3fQ.CpvNG0un47PDyN3z_LLp1m3sg5e9h1AH7_WUHjToyfI",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0ODE4MjI5NywiZXhwIjoxNzQ4MjY4Njk3fQ.0rhNHcA5AdO5vJLA_ZG2n74ZGJg8AZih9wLWDRQWMhU"
}
```

### Get user profile
**PATCH**  ``/users/profile``
**Response**
```json
{
	"id": 1,
	"fullname": null,
	"bio": null,
	"image": null,
	"gender": null,
	"dob": null,
	"updatedAt": "2025-05-24T15:44:53.153Z"
}
```

### Update user profile
**PATCH**  ``/users/profile``
**Request**
```json
{
	"fullname": "Daniel Moses",
	"gender": "Male"
}
```

**Responds**
```json
{
	"id": 1,
	"fullname": "Daniel Moses",
	"bio": null,
	"image": null,
	"gender": "MALE",
	"dob": null,
	"updatedAt": "2025-05-27T10:51:30.528Z"
}
```


### Get all courses recommendation for user based on their tracks
**GET**  ``/users/courses``
**Response**
```json
[
	{
		"id": 1,
		"title": "Introduction to backend",
		"duration": 60,
		"objectives": [
			"understand backend"
		],
		"track": [
			{
				"name": "frontend"
			}
		],
		"createdAt": "2025-05-24T15:44:05.343Z",
		"submitedAt": "2025-05-24T15:44:05.343Z"
	}
]
```

### Update user Track
**PATCH**  ``/users/track``
**Request**
```json
{
	"tracks": ["backend", "frontend"]
}
```
**Response**
```json
{
	"message": "User track updated successfully",
	"tracks": [
		"frontend",
		"backend"
	]
}
```


