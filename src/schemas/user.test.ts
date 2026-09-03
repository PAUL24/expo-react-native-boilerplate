import { UserSchema } from './user';

const validUser = {
  company: { name: 'Romaguera-Crona' },
  email: 'sincere@april.biz',
  id: 1,
  name: 'Leanne Graham',
};

describe('UserSchema', () => {
  it('accepts the expected API contract', () => {
    expect(UserSchema.parse(validUser)).toEqual(validUser);
  });

  it('rejects malformed external data', () => {
    expect(() => UserSchema.parse({ ...validUser, email: 'not-an-email' })).toThrow();
  });
});
