import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Recupera os dados do localStorage ao carregar a página
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const { token, user } = await fakeLogin(identifier, password);
      setUser(user);
      setToken(token);
      // Salva os dados no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Remove os dados do localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Troca o tipo de conta do usuário logado
  const switchAccount = (tipoConta) => {
    if (!user) return;
    if (!user.contas.includes(tipoConta)) return;
    const updatedUser = { ...user, tipoConta };
    setUser(updatedUser);
    // Atualiza o usuário no localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
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