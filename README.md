# Sistema de Controle de Atendimento

Aplicativo criado para controle de emissão de senhas e atendimento em laboratório médico.

## Funcionalidades

- Emissão de senhas para clientes:
  - Senha Prioritária (SP)
  - Senha Geral (SG)
  - Senha de Retirada de Exames (SE)
- Atendimento por atendentes com prioridade:
  - Alternância SP -> SE/SG -> SP -> SE/SG
- Painel com as últimas 5 senhas chamadas
- Encerramento de expediente
- Contador de senhas emitidas e pendentes

## Tecnologias usadas

- Ionic Framework (v7+)
- Angular (v16+)
- LocalStorage para persistência de dados

## Como rodar o projeto

```bash
npm install
ionic serve
