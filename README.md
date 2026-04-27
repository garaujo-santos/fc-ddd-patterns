# DDD: Implementação de Repository e Testes

## Sobre o Projeto

Implementação da camada de infraestrutura de uma aplicação de vendas utilizando Domain Driven Design (DDD) e Test Driven Development (TDD).

O foco principal é a classe `OrderRepository`, que implementa completamente a interface `OrderRepositoryInterface`, incluindo os métodos `create`, `update`, `find` e `findAll`.

## Tecnologias

- **TypeScript**
- **Jest** — testes automatizados
- **Sequelize + SQLite** — persistência em memória nos testes
- **SWC** — compilação rápida para os testes

## Pré-requisitos

- Node.js >= 16
- npm >= 7

## Instalação

```bash
npm install
```

## Rodando os Testes

Para rodar todos os testes:

```bash
npm test
```

Para rodar apenas os testes do `OrderRepository`:

```bash
npx jest --testPathPattern="order.repository"
```

## Casos de Teste

| Teste | Descrição |
|-------|-----------|
| `should create a new order` | Cria um pedido e valida os dados persistidos |
| `should update an order` | Atualiza itens de um pedido e valida as alterações |
| `should find an order` | Busca um pedido por ID |
| `should throw an error when order is not found` | Lança erro ao buscar ID inexistente |
| `should find all orders` | Retorna todos os pedidos cadastrados |

## Base do Projeto

Este projeto utiliza o repositório base fornecido pelo curso Full Cycle:  
https://github.com/devfullcycle/fc-ddd-patterns
