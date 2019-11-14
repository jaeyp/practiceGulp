---
title: 'Practice Gulp'
disqus: hackmd
---

Practice Gulp
===
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

## Table of Contents

[TOC]

Custom Email Address
---

### Mailgun + AWS Route 53

> **Adding New Domain**
> If you add new domain on mailgun.com, the domain would be disabled.
> To enable it, you need to [Setup DNS records](https://app.mailgun.com/app/sending/domains/jaeyp.xyz/dns)

> **DNS records**
> The 255 character limit per string on TXT records is imposed by the DNS protocol itself. However, each TXT record can have multiple strings, each 255 characters long. You will need to split your DKIM into multiple strings for your TXT record. You can do this via the console by entering each string encapsulated in quotes, one string per line.
> e.g. "p=sdfgkjhsdfg...." "sdklfjsdf.....": don't forget space between.

| Name                  | Type     | Value    |
| --------              | -------- | -------- |
| domain                | MX       | 10 mxa.mailgun.org<br/>10 mxb.mailgun.org |
| domain                | TXT      | "v=spf1 include:mailgun.org ~all"         |
| k1.\_domainkey.domain | TXT      | "k=rsa; p=... " "..." "..." |
| email.domain          | CNAME    | mailgun.org |

### Setup django-dotenv in order to separate secret codes
> Install django-dotenv
```shell=
~$ pipenv install django-dotenv
```
> manage.py
```python=
import dotenv

...

if __name__ == "__main__":
    # get environment variables from .env file
    dotenv.read_dotenv(override=True)
    main()
```
> .env
```python=
# MAILGUN_USERNAME = "airbnb@....mailgun.org"
# MAILGUN_PASSWORD = "dbe3...-...-..."
MAILGUN_DOMAIN = "your.domain.here"
MAILGUN_USERNAME = "airbnb@your.domain.here"
MAILGUN_PASSWORD = "given mailgun password once you create new domain"
```
> .gitignore
```shell=
# Environments
.env
...
```

### Django Email Configuration
> **config/settings.py**
```python=
# Email Configuration
# https://app.mailgun.com/app/sending/domains/sandbox6e7e5be91a774358b8dc111d98d2e4f1.mailgun.org/credentials
EMAIL_HOST = "smtp.mailgun.org"
EMAIL_PORT = "587"  # 587: TLS, 465: SSL, 25: SMTP
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get("MAILGUN_USERNAME")
EMAIL_HOST_PASSWORD = os.environ.get("MAILGUN_PASSWORD")
# with this given domain by mailgun, mail would go to the spam folder
EMAIL_FROM = "noreply@" + os.environ.get("MAILGUN_DOMAIN")
```


OAuth 2.0
---

### OAuth

What is OAuth

Basic knowledge
Roles
Tokens

### Social Login with OAuth

**1. Creating OAuth App**
Save Client ID and Client Secret carefully so that it's not exposed
* [Github](https://github.com/settings/developers)
* [Google](https://console.developers.google.com/apis/credentials)
* [Facebook](https://developers.facebook.com/apps/3158824864189974/settings/basic)

**2. Login Sequence**
```sequence
Resource Owner (User)->Client (Web/App): Request Social Login
Client (Web/App)->Authorization/Resource Server (REST API server): Authentication Reqeust with client_id, redirect_uri, scope
Note right of Authorization/Resource Server (REST API server):authorization endpoint
Authorization/Resource Server (REST API server)->Resource Owner (User): Allow access to your profile?
Resource Owner (User)->Authorization/Resource Server (REST API server): Yes
Note left of Client (Web/App): redirect_uri\n(callback url)
Authorization/Resource Server (REST API server)->Client (Web/App): Response: Code
Client (Web/App)->Authorization/Resource Server (REST API server): Token Request with client_id, client_secret, code
Note right of Authorization/Resource Server (REST API server):token endpoint
Authorization/Resource Server (REST API server)->Client (Web/App): Response: Access Token
Client (Web/App)->Authorization/Resource Server (REST API server): Access userinfo with Access Token
Note right of Authorization/Resource Server (REST API server):userinfo endpoint\nor other REST APIs
Authorization/Resource Server (REST API server)->Client (Web/App): Response: User Profile
Client (Web/App)->Client (Web/App): Do login or signin user by using response JSON data
Client (Web/App)->Resource Owner (User): Redirect Home page
```

### Github Login

### Google Login

### Facebook Login

###### tags: `Project` `Document`
