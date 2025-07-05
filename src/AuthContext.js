import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Simulação de backend: credenciais válidas
const FAKE_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@email.com',
    phone: '11999999999',
    cpf: '12345678909',
    password: 'Senha@123',
    name: 'Admin',
    avatar: '',
    contas: ['Aluno', 'Professor', 'Empresa'], // tipos de conta vinculados
    tipoConta: 'Aluno', // tipo de conta atual
  },
  // Adicione mais usuários fake se quiser
];

function fakeLogin(identifier, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = FAKE_USERS.find(
        (u) =>
          u.email === identifier ||
          u.phone === identifier ||
          u.cpf === identifier ||
          u.username === identifier
      );
      if (!user) return reject(new Error('Usuário não encontrado.'));
      if (user.password !== password) return reject(new Error('Senha incorreta.'));
      resolve({ token: 'fake-jwt-token', user });
    }, 900);
  });
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (identifier, password) => {
    const { token, user } = await fakeLogin(identifier, password);
    setUser(user);
    setToken(token);
    return user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Troca o tipo de conta do usuário logado
  const switchAccount = (tipoConta) => {
    if (!user) return;
    if (!user.contas.includes(tipoConta)) return;
    setUser({ ...user, tipoConta });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 