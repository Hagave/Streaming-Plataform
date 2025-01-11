<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

### Tecnologias Necessárias e

1. Backend
   Nest.js: Para criar a API estruturada e escalável.
   TypeScript: Linguagem principal para tipagem forte e melhor manutenção do código.
   Prisma/TypeORM: ORM para gerenciar o banco de dados relacional (Postgres).
   Docker: Para containerização, garantindo portabilidade do ambiente.
   Postgres: Banco de dados relacional robusto para armazenar informações de usuários, vídeos, playlists, etc.
   Bull (opcional): Para gerenciar filas assíncronas, como transcodificação de vídeos ou envio de e-mails.
   FFmpeg: Ferramenta de linha de comando para transcodificar vídeos, gerar thumbnails e adaptar resoluções (ex.: 720p, 1080p).
2. Frontend
   Next.js: Para criação da interface, utilizando SSR e SEO para melhorar a experiência do usuário.
   Zustand: Para gerenciar o estado global da aplicação.
   React Query (opcional): Gerenciar requisições assíncronas e cache de dados no frontend.
3. Testes Automatizados
   Jest: Para testes unitários e de integração no backend e frontend.
   Cypress ou Playwright: Para testes de ponta a ponta, garantindo a qualidade da experiência do usuário.
4. Infraestrutura e Deploy
   AWS S3: Para armazenamento de vídeos e imagens (thumbnails).
   CloudFront (opcional): CDN da AWS para distribuição de conteúdo de mídia com baixa latência.
   GitHub Actions: Para configurar pipelines de CI/CD, garantindo testes e deploy automatizados.
   Elastic Transcoder (opcional): Serviço da AWS para transcodificar vídeos diretamente no upload.
5. Outras Ferramentas e Bibliotecas
   Auth (JWT e/ou OAuth): Para autenticação e autorização segura de usuários.
   WebSockets: Para notificações em tempo real, como mensagens sobre transcodificação ou novos vídeos.
   Rate Limiter (Nest.js): Para evitar abuso de API, como requisições excessivas de upload.
   Swagger: Documentação da API para facilitar integração com outras partes ou desenvolvedores.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
