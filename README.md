# DASHBOARD
## Панель инструментов для админов и пользователей

**Requirements:**
1. Admin dashboard
    - Admin should be able to create / edit / remove user
    - Admin can set other admins.
2. SignUp / SignIn
    - User should be able to Sign up 
    - User should be able to confirm his email
    - User should be able to Sign in 
3. After sign in user should be able to see his profile
4. Profile should have next fields: email, name.

**Technologies:**
- *VCS:* git
- *Backend:* node.js
- *Database:* mongoDB
- *Frontend:* angular | react | svelte | vue. (as you wish)
- *Deployment:* everywhere you can (heroku as example)

**Bonus points:**
- Frontend. Responsive, look'n'feel on Desktop, Tablet, Phones...
- Integration Tests
- Swagger API
- UI Tests
- CI/CD
- Coverage
- Clean code
- Clean architecture

## Deployments
### Required NPM environment variables:
| Variable | Description | Example |
|:---:|:---:|:---:|
| MAILER_HOST | Address of email server | smtp.gmail.com |
| MAILER_PORT | Port of email server | 465 |
| MAILER_USER | Email account login | dashboard-admin@gmail.com |
| MAILER_PASSWORD | Email account password | 1234 |
| APP_URL | Url that be inserted as application address for email confirmation | http://localhost:4200 |
