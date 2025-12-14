import { comparePassword, hashPassword } from './password.utils';

describe('Password Utils', () => {
  const userPassword1 = 'mySecretPassword123';
  const userPassword2 = 'mySecondPassword987';

  it('Hash Password should be return string', async () => {
    const passwordHash = await hashPassword(userPassword1);
    expect(typeof passwordHash).toBe('string');
  });

  it('Hash Password should be return different', async () => {
    const passwordHash1 = await hashPassword(userPassword1);
    const passwordHash2 = await hashPassword(userPassword1);
    console.log(passwordHash1, passwordHash2);
    expect(passwordHash1).not.toBe(passwordHash2);
  });

  it('Compare Password should be return true', async () => {
    const passwordHash = await hashPassword(userPassword1);
    const isValid = await comparePassword(userPassword1, passwordHash);
    expect(isValid).toBe(true);

    const passwordHash2 = await hashPassword(userPassword2);
    const isValid2 = await comparePassword(userPassword2, passwordHash2);
    expect(isValid2).toBe(true);
  });
  it('Compare Password should be return false', async () => {
    const passwordHash = await hashPassword(userPassword1);
    const isValid = await comparePassword(userPassword2, passwordHash);
    expect(isValid).toBe(false);

    const passwordHash2 = await hashPassword(userPassword2);
    const isValid2 = await comparePassword(userPassword1, passwordHash2);
    expect(isValid2).toBe(false);
  });
});
