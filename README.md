# DDD: Implementação de Domain Events e Repository

## Sobre o Projeto

Implementação da camada de domínio de uma aplicação de vendas utilizando Domain Driven Design (DDD), focando especialmente em **Domain Events** para o agregado Customer e a camada de infraestrutura com Repository.


## Tecnologias

- **Linguagem**: TypeScript
- **Testes**: Jest (testes unitários)
- **ORM**: Sequelize + SQLite (persistência em memória)
- **Compilação**: SWC

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

Para rodar apenas os testes de Domain Events do Customer:

```bash
npm test -- customer.events.spec.ts
```

Para rodar apenas os testes do Repository:

```bash
npm test -- repository.spec.ts
```


## Eventos Implementados

### 1. CustomerCreatedEvent
- **Gatilho**: Disparado automaticamente quando um novo Customer é criado
- **Handlers**: 
  - `EnviaConsoleLog1Handler`: Imprime "Esse é o primeiro console.log do evento: CustomerCreated"
  - `EnviaConsoleLog2Handler`: Imprime "Esse é o segundo console.log do evento: CustomerCreated"

### 2. CustomerAddressChangedEvent
- **Gatilho**: Disparado quando o endereço do Customer é alterado via `changeAddress()`
- **Dados**: Transporta `id`, `name` e `address` do cliente
- **Handler**: 
  - `EnviaConsoleLogHandler`: Imprime "Endereço do cliente: {id}, {name} alterado para: {street}"

## Testes Implementados

### Customer Domain Events Tests (customer.events.spec.ts)

| Teste | Descrição |
|-------|-----------|
| `should dispatch CustomerCreatedEvent when a customer is created` | Valida que o evento é disparado na criação |
| `should execute EnviaConsoleLog1Handler when CustomerCreatedEvent is dispatched` | Valida primeiro handler |
| `should execute EnviaConsoleLog2Handler when CustomerCreatedEvent is dispatched` | Valida segundo handler |
| `should execute both handlers when CustomerCreatedEvent is dispatched` | Valida execução de múltiplos handlers |
| `should dispatch CustomerAddressChangedEvent when customer address is changed` | Valida disparo do evento de endereço |
| `should include id, name, and address in CustomerAddressChangedEvent data` | Valida dados do evento |
| `should log with correct format when address changes` | Valida formato do log |

### Resultado dos Testes

✅ **51 testes passando** (13 test suites)

```
Test Suites: 13 passed, 13 total
Tests:       51 passed, 51 total
```

## Padrões Utilizados

- **Domain Events**: Implementa o padrão de eventos de domínio do DDD
- **Event Dispatcher**: Registra e notifica handlers sobre eventos
- **Observer Pattern**: Handlers observam eventos e reagem
- **Repository Pattern**: Persiste agregados (Customer, Order, Product)
- **Factory Pattern**: Criação de agregados (CustomerFactory, OrderFactory, ProductFactory)
- **Value Objects**: Address é um value object imutável

## Base do Projeto

Este projeto utiliza o repositório base fornecido pelo curso Full Cycle:
https://github.com/devfullcycle/fc-ddd-patterns
