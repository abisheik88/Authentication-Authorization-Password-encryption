<h2>Password Encryption</h2>

- The Password encryption is done using the package called 'argon2'

<b>npm i argon2</b>

- If a user is created and stored in Database then the password should be stored only as encrypted version.

- This is done in service file by
  <code>
  async createUser(userData: CreateUser) {
  const { name, email, password } = userData;
  const hashPassword = await argon2.hash(password);

      const updatedUser = await this.user.create({
        name,
        email,
        password: hashPassword,
      });
      return await this.user.save(updatedUser);

  }
  </code>

  - Now the password is stored as the encrypted version in the Db

  - <b>How to check the stored password is correctly hashed?</b>

  <code>
  async validateUser(validateData) {
    const { email, password } = validateData;
    const user = await this.user.findOne({ where: { email } });
    if (!user) {
      throw new Error('User Not Found');
    }
    const passwordValid = await argon2.verify(user.password, password);
    return passwordValid;
  }
  </code>

  - By this we can get a boolean value which checks the hashed password is correct or not.

  <h2>Authentication</h2>

- To implement authentication and authorization we use Passport Js which is a middleware which makes us easy to implement authentication and authorization.

- To implement Authentication and Authorization we have to install few dependencies such as

- <b>npm i @nestjs/passport passport passport-local</b>

- We also install few type definitions which are to be installed as dev dependencies. They are

- <b>npm i --D @types/passport-local @types/passport</b>

- Now we create a module for Auth which should have module.ts,service.ts,controller.ts file for the authentication.

- If any route should be authenticated we normally use the guards to check whether it matches certain condition. For this purpose we use Guards.

- So create <b>local-auth.guard.ts</b> inside the auth module.

- Inside the guard we just have to define the strategy to be followed.

- To know the name of the guard we just refer passport js for particular strategy.

- For example, If we use the local strategy, 'local' specifies the strategy to authenticate requests.

- Now in the controller file if we want to authenticate a particular end point we may just use the guard decorator before the route decorator as,

<code>
@UseGuards(guard_name)
@Post('localauth')
async login(){

}
</code>

- Like this we use the guards before the route.

- When we try to execute the passport strategy or guards it will try to validate the credentials if it is correct. It will add the user object in the request.

- To do the above thing.....

<code>
@UseGuards(guard_name)
@Post('localauth')
async login(@Request() req){
return req.user
}
</code>

- In above here, I am doing like the user credentials is checked by the guard and if it validated then it will store the user object in the request.

- To create a strategy just create a file inside the auth module called local.strategy.ts

-This is going to extends the passport strategy like
<code>
export class LocalStrategy extends PassportStrategy(Strategy){}
</code>

- The PassportStrategy is imported from @nestjs/passport and Strategy is imported from the passport-local

- This LocalStrategy file should be Injectable file and it is to be added to the auth.module.ts providers.

- Now we go to the LocalStrategy file we just add the super constructor because it is a derived class.

<code>
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }
}
</code>

- It is a local strategy so our super function does not have any configuration but when we go to Jwt Strategy the super functions have many configurations. At that time the super function is more important.

- Inside the localStrategy we just creating guard strategy. For Ex:

<code>
async validate(email:string,password:string){
  const user = await this.authService.validateUserCreds(email, password);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
}
</code>

Here it takes two parameters to check whether the user is present in our db or not.

      For this thing we must pass two arguments as email and password, if there is no user we throw an unauthorized Exception.

      Else we returns the user.

-
