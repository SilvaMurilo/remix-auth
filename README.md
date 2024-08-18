
# Autenticação com Remix e Supabase

Bem-vindo ao projeto de autenticação utilizando Remix e Supabase! Este projeto demonstra como integrar Remix com Supabase para criar um sistema de autenticação simples e funcional.

## 🚀 Funcionalidades

- **Login e Signup:** Permite aos usuários acessar ou criar contas de forma intuitiva.
- **Rota Livre:** Acesso livre com links para login e criação de conta.
- **Rota Logada:** Exibe informações sobre usuários genéricos cadastrados manualmente no banco de dados, além de detalhes da autenticação e um endpoint para logout.

## 🔗 Links

- [URL do Deploy](https://remixauth.silvamurilo.com.br)
- [URL do Repositório](https://github.com/SilvaMurilo/remix-auth)

## 💡 Tecnologias Utilizadas

- **Remix:** Framework para desenvolvimento de aplicações web.
- **Supabase:** Plataforma para backend, oferecendo banco de dados e autenticação.

## 📖 Documentação do Remix

Para mais informações sobre o Remix, consulte a [documentação do Remix](https://remix.run/docs).

## 🚀 Começando

Para executar o projeto localmente, siga as instruções abaixo:

### 1. Clone o Repositório

```bash
git clone git@github.com:SilvaMurilo/remix-auth.git
cd remix-auth
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente. Exemplos:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=seu-anon-key
```

### 4. Execute o Projeto

```bash
npm run dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## 📦 Build e Deploy

Para criar um build para produção, use:

```bash
npm run build
```

Depois, execute o aplicativo em modo de produção:

```bash
npm start
```

Para deploy, você pode usar qualquer serviço de hospedagem compatível com Node.js. Certifique-se de fazer o deploy da saída de `npm run build`:

- `build/server`
- `build/client`

## 🎨 Estilização

Este projeto utiliza [Tailwind CSS](https://tailwindcss.com/) para estilização. Você pode usar qualquer framework CSS de sua preferência. Para mais informações sobre como personalizar o Tailwind CSS, consulte a [documentação do Vite sobre CSS](https://vitejs.dev/guide/features.html#css).

## 🛠️ Estrutura do Projeto

- `src/routes/login.tsx`: Página de login.
- `src/routes/signup.tsx`: Página de cadastro.
- `src/routes/home.tsx`: Página principal com informações dos usuários.
- `src/utils/supabaseClient.ts`: Configuração do cliente Supabase.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. Se você tiver sugestões de melhorias ou novos recursos, adoraríamos ouvir sua opinião.

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📫 Contato

Se tiver dúvidas ou sugestões, você pode me encontrar no LinkedIn: [Murilo Silva](https://www.linkedin.com/in/sousamurilo/).
