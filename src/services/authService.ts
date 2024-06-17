export interface User {
  username: string;
  password: string;
}

const mockUser: User = {
  username: 'Satoshi',
  password: 'Nakamoto',
}

export const login = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === mockUser.username && password === mockUser.password) {
        resolve({
          username: mockUser.username,
          password: mockUser.password,
        });
      } else {
        reject("Invalid credentials");
      }
    }, 2000);
  })
}
