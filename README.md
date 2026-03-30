# Nearby - Clube de Benefícios

![Nearby](.github/logoNearby.png)

## Sobre o Projeto

O **Nearby** é uma plataforma de clube de benefícios que utiliza geolocalização para conectar usuários a estabelecimentos parceiros em tempo real. O aplicativo permite a visualização de locais próximos no mapa, filtrados por categorias, e oferece um sistema prático de resgate de cupons via QR Code. Desenvolvido com foco em performance e fidelidade visual, o projeto utiliza componentes nativos para garantir a melhor experiência em dispositivos iOS e Android.

---

## Principais Características

- **Busca Inteligente de Estabelecimentos:** Localização baseada em geolocalização para facilitar o acesso a parceiros próximos.
- **Resgate de Cupons via QR Code:** Simplicidade para desbloquear descontos exclusivos.
- **Filtro por Categorias:** Navegação fluida para encontrar exatamente o tipo de benefício desejado.
- **Interface Intuitiva:** Desenvolvida com foco na experiência do usuário.

---

## Stack Tecnológica

### Backend
- **Linguagem:** Node.js com TypeScript.
- **Banco de Dados:** PostgreSQL hospedado em nuvem pelo **Supabase** (gerenciado com Prisma ORM).
- **Hospedagem (Deploy):** API hospedada e em produção no **Railway**.
- **Principais Ferramentas:**
  - Express.js para estrutura do servidor.
  - Prisma para gerenciamento e modelagem de banco de dados.

### Frontend
- **Linguagem:** React Native com TypeScript.
- **Framework:** Expo para desenvolvimento multiplataforma.
- **Design e UI:**
  - Integração de assets personalizados e bibliotecas de design responsivo.
  - Foco em usabilidade e acessibilidade.

---

## Experiência do Desenvolvedor

- **Estrutura Modular:** Arquitetura do código organizada para facilitar manutenção e expansão.
- **Integração Contínua:** Configuração para testes automatizados e revisão de código.
- **Práticas Modernas:** Implementação de padrões de desenvolvimento como Clean Code e SOLID.
- **Uso de Ambiente .env:** Segurança e flexibilidade na configuração do ambiente.

---

### Como rodar a aplicação:
1. Clone este repositório:
   git clone [[https://github.com/MROR21/Nearby.git](https://github.com/MROR21/Nearby.git)]
   
2. Na pasta "**mobile**"
3. Execute o comando no terminal: "**npm install**"
4. Execute o comando no terminal: "**npx expo start**"

Pronto! Agora é só escanear o QR Code no seu celular usando o app Expo Go (iOS/Android) ou rodar em um emulador.

Como o backend e o banco de dados estão hospedados em instâncias gratuitas na nuvem (Railway e Supabase), **a primeira requisição pode demorar alguns segundos** 
para carregar os dados. Se a tela de carregamento demorar um pouco na primeira vez que você abrir o app, não se preocupe, 
é o servidor "acordando"!


