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
