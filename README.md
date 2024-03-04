## O Surgimento da Ideia

<p>Esse projeto surgiu com o objetivo principal de posibilitar que eu pudesse treinar e desenvolver minha habilidades em desenvolvimento Frontend, e principalmente minhas habilidades em desenvolvimento Backend.</p>
<p>Partindo desse princípio, a minha vontade era de desenvolver algo que eu pudesse criar e validar e, então, surge a ideia de criar uma aplicação de sistema de login. Com um longo tempo de estudo conheci dois conceitos que são os alicerces desse projeto: <strong>Autenticação</strong> e <strong>Autorização</strong>.</p>

## Os Alicerces do Projeto

<p>A aplicação "Sistema de Login" tem como fundamento dois conceitos primordiais, são eles:</p>
<ul>
  <li>
    <strong>Autenticação: </strong>esse conceito tem como objetivo principal verificar se o usuário está autenticado dentro da aplicação, isto é, se o usuário possui algum tipo de cadastro dentro do sistema no qual está acessando. Portanto, dentro da aplicação "Sistema de Login" o usuário será autenticado (vai conseguir ter acesso interno ao sistema) apenas se possuir cadastro dentro da aplicação, caso contrário o mesmo não vai conseguir ter acesso interno à aplicação.
  </li>
  </br>
  <li>
    <strong>Autorização: </strong>esse conceito envolve uma lógica dependente de "autenticação", uma vez que para ter autorização é necessário que o usuário seja autenticado dentro da aplicação, nesse caso dentro de "Sistema de Login". Uma vez o usuário autenticado, será feita a validação de autorização do usuário para verificar se o mesmo possui direito de acesso ou não a tal recurso dentro da aplicação.
  </li>
</ul>

## Sobre o Sistema

<p>A aplicação possui um sistema bem estruturado, intuítivo e explicativo de como funcionam as lógicas de Autenticação e Autorização. De qualquer forma, aqui você pode encontrar um exemplo simples de uso da aplicação.</p>
<ol>
  <li>
    <strong>Criando uma conta: </strong> é necessário preencher todos os campos, <strong>com exceção do campo "Domínio", que é opcional</strong>, de acordo com as informações que são pedidas.
    <strong>Sobre o domínio: </strong> o domínio é o responsável por gerenciar a "autorização" do usuário que está autenticado. Se o usuário inserir o domínio como <i>ADMINAAD</i> (com letras maiúsculas) ele estará autorizado para acessar a rota <i>/admin-only</i>, se for inserido qualquer outro valor diferente o usuário não estará autorizado para acessar a rota de <i>/admin-only</i>.

<strong>Exemplo 1: Usuário Autenticado e Autorizado:</strong>

```
Nome:* Antonio Andre
Email:* admin@aadev.com.br
Senha:* Admin123@
Confirmar Senha:* Admin123@
Domínio: ADMINAAD
```

<strong>Exemplo 2: Usuário Autenticado e Não Autorizado:</strong>

```
Nome:* Antonio Andre
Email:* user@aadev.com.br
Senha:* User123@
Confirmar Senha:* User123@
Domínio: user
```
  </li>

  <li>
    <strong>Entrando na conta: </strong>após a criação da conta o usuário poderá acessar sua conta fazendo o login nela inserindo as informações de <i>email</i> e <i>senha</i> que foram informadas no momento da criação da conta.

<strong>Exemplo 1: Usuário Autenticado e Autorizado:</strong>

```
Email:* admin@aadev.com.br
Senha:* Admin123@
```

<strong>Exemplo 2: Usuário Autenticado e Não Autorizado:</strong>

```
Email:* user@aadev.com.br
Senha:* User123@
```
  </li>
</ol>

## Features

<ul>
  <li>
    <strong>Registro de Contas</strong>
  </li>
  <li>
    <strong>Autenticação de Contas</strong>
  </li>
  <li>
    <strong>Autorização de Contas</strong>
  </li>
</ul>

## Tecnologias Utilizadas
<table>
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Função</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bcrypt</td>
      <td>Biblioteca para criptografia de senhas</td>
    </tr>
    <tr>
      <td>Nextjs</td>
      <td>Framework React para renderização do lado do servidor e do lado do cliente</td>
    </tr>
    <tr>
      <td>Sequelize</td>
      <td>ORM (Object-Relational Mapping) para Node.js, facilitando a interação com bancos de dados relacionais</td>
    </tr>
    <tr>
      <td>Node</td>
      <td>Plataforma de execução de código JavaScript do lado do servidor</td>
    </tr>
    <tr>
      <td>Postgresql</td>
      <td>Sistema de gerenciamento de banco de dados relacional</td>
    </tr>
    <tr>
      <td>Tailwind css</td>
      <td>Biblioteca de classes utilitárias para estilização de interfaces</td>
    </tr>
    <tr>
      <td>Tailwind UI</td>
      <td>Conjunto de componentes pré-projetados construídos com Tailwind CSS</td>
    </tr>
    <tr>
      <td>Shadcn UI</td>
      <td>Uma coleção de componentes reutilizáveis e editáveis</td>
    </tr>
    <tr>
      <td>Sonner</td>
      <td>Uma biblioteca que fornece feedbacks ao usuário por meio de toast</td>
    </tr>
    <tr>
      <td>Zod</td>
      <td>Biblioteca para validação de esquemas em TypeScript</td>
    </tr>
    <tr>
      <td>Express</td>
      <td>Framework web rápido, flexível e minimalista para Node.js</td>
    </tr>
    <tr>
      <td>Cors</td>
      <td>Middleware para Express.js que permite controlar o acesso a recursos de diferentes origens</td>
    </tr>
    <tr>
      <td>Nodemon</td>
      <td>Utilitário que monitora alterações no código fonte e reinicia automaticamente o servidor Node.js</td>
    </tr>
  </tbody>
</table>

## Informações Adicionais
<ul>
  <li>
    <strong>Todos os usuários cadastrados serão excluídos após 1 semana desde a criação de sua conta.</strong>
  </li>
</ul>

