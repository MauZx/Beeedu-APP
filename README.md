# 🐝 Beeedu Platform

Uma plataforma educacional inovadora que conecta estudantes de escolas públicas ao mercado de trabalho através de cursos, freelas, gamificação e Drafts de Vagas.

## 📋 Sobre o Projeto

O Beeedu é um ecossistema educacional que transforma a educação em oportunidades reais de emprego. A plataforma oferece:

- **Educação de qualidade** com cursos práticos
- **Experiência real** através de freelas e projetos
- **Gamificação** para engajamento e progresso
- **Drafts de Vagas** para conexão direta com empresas
- **Sistema de múltiplas contas** (Aluno, Professor, Empresa)

## ✨ Funcionalidades Principais

### 🎓 Para Estudantes
- Dashboard personalizado com progresso
- Cursos matriculados e em andamento
- Sistema de gamificação com níveis e badges
- Acesso a freelas e projetos práticos
- Perfil profissional completo
- Sistema de moeda virtual (HCT)

### 👨‍🏫 Para Professores (Em desenvolvimento)
- Criação e gerenciamento de cursos
- Acompanhamento de alunos
- Sistema de avaliação

### 🏢 Para Empresas (Em desenvolvimento)
- Publicação de vagas (Drafts)
- Busca por talentos
- Projetos e freelas

## 🚀 Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **React Router DOM 6.30.1** - Roteamento da aplicação
- **CSS3** - Estilização moderna e responsiva
- **Context API** - Gerenciamento de estado global
- **LocalStorage** - Persistência de dados do usuário

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/beeedu-plataform.git
   cd beeedu-plataform
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🌐 Deploy no Netlify

### Método 1: Deploy via Git (Recomendado)

1. **Faça push do código para o GitHub**
   ```bash
   git add .
   git commit -m "Deploy para Netlify"
   git push origin main
   ```

2. **Acesse o Netlify**
   - Vá para [netlify.com](https://netlify.com)
   - Faça login ou crie uma conta

3. **Conecte com GitHub**
   - Clique em "New site from Git"
   - Escolha GitHub
   - Selecione seu repositório

4. **Configure o build**
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - Clique em "Deploy site"

### Método 2: Deploy Manual

1. **Faça o build local**
   ```bash
   npm run build
   ```

2. **Faça upload da pasta `build`**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `build` para a área de deploy

### Configurações do Netlify

O projeto já inclui:
- `netlify.toml` - Configurações de build
- `public/_redirects` - Configuração de rotas para SPA

## 🎯 Como Usar

### Primeiro Acesso
1. Acesse a página inicial
2. Clique em "Criar Conta"
3. Selecione "Cadastrar como Aluno"
4. Preencha o formulário de cadastro
5. Faça login com suas credenciais

### Login de Teste
Para testar rapidamente, use as credenciais:
- **Email:** admin@email.com
- **Senha:** Senha@123

### Navegação Principal
- **Dashboard:** Visão geral do progresso e atividades
- **Cursos Matriculados:** Acompanhe seus cursos
- **Pesquisa Global:** Encontre cursos, empresas e projetos
- **Perfil:** Gerencie suas informações e contas

## 📁 Estrutura do Projeto

```
beeedu-plataform/
├── public/
│   ├── _redirects
│   ├── beeedu-coin.svg
│   ├── beeedu-logo.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BannerRotativo.js
│   │   ├── DraftsReceivedPage.js
│   │   ├── EnrolledCourses.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Homepage.js
│   │   ├── LogoCarousel.js
│   │   ├── ProgressPage.js
│   │   ├── ProjectsInProgressPage.js
│   │   ├── StudentDashboard.js
│   │   ├── StudentLoginForm.js
│   │   ├── StudentRegistrationForm.js
│   │   └── UXDesignCoursePage.js
│   ├── App.js
│   ├── App.css
│   ├── AuthContext.js
│   ├── index.js
│   └── index.css
├── netlify.toml
├── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta a configuração do Create React App

## 🎨 Componentes Principais

### AuthContext
Gerenciamento de autenticação e estado do usuário com:
- Login/logout
- Troca de tipos de conta
- Persistência no localStorage

### StudentDashboard
Dashboard principal do estudante com:
- Header com navegação
- Banner rotativo
- Atividades em andamento
- Recomendações personalizadas

### Homepage
Página inicial com:
- Apresentação da plataforma
- Formulários de cadastro e login
- Design responsivo e moderno

## 🔐 Sistema de Autenticação

O sistema utiliza um contexto React para gerenciar:
- Estado do usuário logado
- Token de autenticação
- Troca entre tipos de conta
- Persistência de dados

### Tipos de Conta
- **Aluno:** Acesso completo aos cursos e freelas
- **Professor:** Criação e gerenciamento de cursos (em desenvolvimento)
- **Empresa:** Publicação de vagas e projetos (em desenvolvimento)

## 🎮 Sistema de Gamificação

- **Níveis:** Sistema de progressão por nível
- **Badges:** Conquistas visuais
- **Moeda Virtual:** HCT (Beeedu Coin)
- **Progresso:** Acompanhamento de atividades

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🚧 Funcionalidades em Desenvolvimento

- [ ] Cadastro de Professores
- [ ] Cadastro de Empresas
- [ ] Sistema de Drafts de Vagas
- [ ] Chat em tempo real
- [ ] Sistema de pagamentos
- [ ] API backend completa
- [ ] Testes automatizados

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Email:** contato@beeedu.com
- **Website:** [beeedu.com](https://beeedu.com)
- **LinkedIn:** [Beeedu Platform](https://linkedin.com/company/beeedu)

## 🙏 Agradecimentos

- Comunidade React
- Escolas públicas parceiras
- Empresas colaboradoras
- Estudantes e professores

---

**Desenvolvido com ❤️ pela equipe Beeedu** 
