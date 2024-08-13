Ao clonar para instalar a node_modules dar: yarn

Para rodar: yarn dev

Criar o banco a primeira vez no docker (não se esqueça de baixar): docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Para rodar o banco após já estar criado: docker run postgres

insert into endereco(rua,bairro,cidade,estado,cep,telefone)
values ('Rua das Flores', 'Bairro dos Bairros', 'São Paulo', 'SP', '13735059', '19993057271');

/precos -> rota de detalhes
/sessions -> rota de autenticação
/posto -> rota de cadastro de posto e listagem de posto (sem detalhes, necessita de passar o tipo de combustivel)
