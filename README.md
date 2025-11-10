# Sistema de Agendamento para Dermatologista

#### Integrantes
Nome e RA: Erik Samuel Viana Hsu , 10403109

Nome e RA: Thiago Shihan Cardoso Toma , 10400764

## 1. Introdução

### 1.1 Processo de Ideação
Este projeto nasceu da necessidade de otimizar a organização da agenda de um consultório dermatológico. A dermatologista responsável por esse consultório lida diariamente com a gestão manual de agendamentos, o que pode levar a erros e confusões.

Nossa solução é um sistema de agendamento online que atende a essa demanda real. O objetivo é criar uma ferramenta simples e eficiente para a gestão de consultas, permitindo à profissional visualizar a agenda de forma clara e gerenciar os horários dos pacientes de maneira mais intuitiva.

Para guiar o desenvolvimento, passamos por um processo de ideação onde definimos as funcionalidades essenciais e, em seguida, criamos um protótipo em Wireframe. O protótipo fez com que pudéssemos visualizar melhor a interface antes da codificação.

### 1.2 Protótipo

##### Tela de Agendamentos
![telaagendamentos](https://github.com/erikhsu08/webmobile/blob/main/assets/agendamento_web.png?raw=true)
- Essa é a tela principal do nosso site, nela as consultas já agendadas/horarios disponíoveis podem ser conferidos por meio de um calendário que ocupa a maior parte da tela. Além disso a tela também conta com uma barra que contém informações essenciais como número de consultas agendadas no dia/semana e um menu em formato de sidebar que pode ser usado para acessar as outras páginas da aplicação.

##### Receitas e atestados
![telareceitaseatestados](https://github.com/erikhsu08/webmobile/blob/main/assets/receitas_atestados_web.png?raw=true)
- Esta tela é focada na gestão da documentação do paciente. Nela, o profissional médico pode buscar por um paciente específico para visualizar seu histórico de tratamento. A tela apresenta uma barra lateral com a lista de pacientes e, ao selecionar um, exibe seu histórico de receituários e atestados já criados, com a opção de criar novos documentos de forma prática.

##### Tela de Agendamentos (Visualização em Dispositivos Móveis)
![teladetalhesconsulta](https://github.com/erikhsu08/webmobile/blob/main/assets/agendamento_mobile.png?raw=true)
- Esta é a tela principal do nosso site adaptada para visualização em dispositivos móveis. A imagem demonstra como o layout se comporta de forma responsiva, mantendo a usabilidade e a organização das informações mesmo em telas menores.

### 1.3 Caráter Extensionista
O desenvolvimento deste projeto tem um foco extensionista, ou seja, ele foi pensado para resolver um problema específico de nossa comunidade — neste caso, a rotina de trabalho de um profissional de saúde em nossa família. Embora o projeto tenha sido inicialmente pensado para auxiliar uma profissional específica, a natureza da solução — um sistema de agendamento — possui uma relevância que pode se extender para além de um único indivíduo (outros profissionais de saúde, pequenos empreendedores e etc.).

### 1.4 Tecnologias Utilizadas
Para transformar o protótipo em uma aplicação web moderna e escalável, o sistema foi desenvolvido utilizando as seguintes tecnologias:

- **React:** Biblioteca principal para a construção da interface de usuário em componentes.
- **Next.js:** Framework React que fornece otimizações como Roteamento, renderização no servidor e uma estrutura de projeto organizada.
- **JavaScript :** Linguagem base para toda a lógica e interatividade.
- **CSS3 (com CSS Modules):** Para estilização escopada e layout responsivo.

---

## 2. Explicação da Estrutura Next.js

Com a migração para o Next.js, a estrutura do projeto foi fundamentalmente alterada. Em vez de arquivos HTML e um único `script.js` global, agora utilizamos uma arquitetura moderna baseada em componentes, roteamento de arquivos e gerenciamento de estado local.

### 2.1 Roteamento e Navegação (App Router)

A navegação entre telas foi completamente reformulada. O projeto utiliza o **App Router** do Next.js, onde o roteamento é **baseado no sistema de arquivos**.

- **Como funciona:** Não há um arquivo de configuração de rotas. Em vez disso, cada **pasta** criada dentro de `src/app` se torna automaticamente um segmento da URL.
- **Arquivo `page.js`:** Para que uma pasta se torne uma página real, ela deve conter um arquivo `page.js`, que é o componente React responsável por renderizar o conteúdo daquela rota.

**Exemplo da nossa estrutura:**
- `src/app/page.js` → Renderiza a página inicial (`/`).
- `src/app/pacientes/page.js` → Renderiza a página `/pacientes`.
- `src/app/receitas/page.js` → Renderiza a página `/receitas`.

![Estrutura de Rotas no App Router](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-22%20at%2020.53.39.png?raw=true)

### 2.1.1 Roteamento dinamico 

Enquanto a navegação principal (via Sidebar) utiliza o Roteamento Estático (/pacientes, /agendamentos), a tela de Receitas e Atestados, exige o Roteamento Dinâmico.

![telaReceitas](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-02%20at%2016.49.32.png?raw=true)

O Roteamento Dinâmico é fundamental para criar URLs dedicadas a um recurso específico, permitindo que o estado da aplicação seja persistido na URL.

**Aplicação na Página de Receitas:**

A página de Receitas e Atestados precisa exibir o histórico e as informações de documentação de um paciente por vez. Antes, isso era feito com um estado local (useState), mas agora é baseado na URL, tornando-a compartilhável.

**1. Estrutura de Rotas:** 
- O Next.js permite criar rotas dinâmicas aninhando pastas entre colchetes ([]).

- src/app/receitas/page.js → Rota estática base (/receitas).

- src/app/receitas/[patientId]/page.js → Rota dinâmica que recebe o ID do paciente.

**2. Captura do Parâmetro:** 
- Dentro da rota dinâmica ([patientId]/page.js), usamos o Hook useParams para capturar o ID presente na URL.
 ![codigoRotaDinamica](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-02%20at%2017.31.15.png?raw=true)



### 2.2 Arquitetura Baseada em Componentes

Toda a interface foi refatorada em **componentes reutilizáveis**, localizados no diretório `src/components`. Em vez de duplicar código HTML (como o cabeçalho ou a barra lateral em várias páginas), nós criamos um componente e o importamos onde for necessário.

Isso elimina a duplicação, facilita a manutenção e permite que cada parte da interface seja gerenciada de forma isolada.

Nossos principais componentes incluem:
- `Header`
  ![header](https://github.com/erikhsu08/webmobile/blob/main/assets/pxpubazh.png?raw=true)
- `Sidebar`
  ![sidebar](https://github.com/erikhsu08/webmobile/blob/main/assets/nifb1put.png?raw=true)
- `Calendar`
  ![calendar](https://github.com/erikhsu08/webmobile/blob/main/assets/ofnsdmz2.png?raw=true)
- `StatCard`
  ![StatCard](https://github.com/erikhsu08/webmobile/blob/main/assets/py1zkayq.png?raw=true)
- `Modal`
  ![modal](https://github.com/erikhsu08/webmobile/blob/main/assets/vkj31jqk.png?raw=true)

![Estrutura da pasta de Componentes](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-22%20at%2021.10.06.png?raw=true)

### 2.3 Gerenciamento de Estado (Hooks)

O gerenciamento de estado, que antes dependia de um objeto `state` global em um arquivo JavaScript, agora é feito de forma granular. Usamos **Hooks** do React, como o `useState`, diretamente dentro dos componentes que precisam daquela informação.

Isso permite que cada componente controle seu próprio estado. Por exemplo:
- O componente `Calendar` usa `useState` para controlar qual data está selecionada.
- A página principal (`app/page.js`) usa `useState` para controlar se o modal de "Nova Consulta" está aberto ou fechado (`true` ou `false`).

![Exemplo de uso do Hook useState](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-22%20at%2021.06.03.png?raw=true)

### 2.4 Manipulação de Eventos (JSX)

A interatividade foi modernizada. A maior mudança é a forma como lidamos com as ações do usuário (como cliques).

**Antes (JavaScript Puro):**
Era preciso "caçar" elementos no DOM manualmente usando `document.getElementById` e "anexar" um *event listener* a eles.

![Método antigo com document.getElementById](https://github.com/erikhsu08/webmobile/blob/main/assets/h2dht5e0.png?raw=true)

**Agora (React/JSX):**
Os eventos são declarados diretamente no elemento JSX, de forma limpa e declarativa. A lógica é vinculada diretamente ao componente, sem precisar de seletores de ID.

![modalCode](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-23%20at%2016.50.03.png?raw=true)

### 2.5 Layout.js

![lAYOUT](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-23%20at%2021.27.05.png?raw=true)

Este é um dos arquivos mais importantes do App Router. O arquivo src/app/layout.js funciona como um "molde" (template) principal para toda a aplicação.

É neste arquivo que vamos posicionar nossos componentes globais, como o Header e a Sidebar, para que eles apareçam em todas as páginas sem precisarmos importá-los em cada page.js.

A propriedade children que ele recebe é o conteúdo dinâmico da página atual (por exemplo, o page.js de /pacientes ou /receitas).

### 2.6 Componentes de Cliente ('use client')

No Next.js App Router, todos os componentes são Componentes de Servidor (Server Components) por padrão. Isso significa que eles são renderizados no servidor, o que os torna muito rápidos de carregar, mas não interativos (eles não podem usar onClick, useState, etc.).

Para adicionar interatividade, precisamos dizer ao React para tratar aquele componente como um Componente de Cliente (Client Component). Fazemos isso simplesmente adicionando a diretiva 'use client'; no topo do arquivo.

![useClient](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-23%20at%2021.30.07.png?raw=true)


### 2.7 Integração com Google Calendar API

Para garantir que os agendamentos realizados no site sejam imediatamente refletidos no calendário pessoal da profissional (linkado a conta Google), implementamos a comunicação direta com a Google Calendar API.

Essa funcionalidade utiliza as Rotas de API do Next.js (localizadas na pasta src/app/api), que funcionam como endpoints de backend dentro da própria aplicação.

#### Estrutura e Endpoints
Estrutura de Rotas de API: O Next.js utiliza a pasta api para definir rotas de backend. Cada pasta aninhada com um arquivo route.js se torna um endpoint RESTful.

![endpoints](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.23.13.png?raw=true)

Dentre esses endpoints criados, endpoint **create-event** é responsável pela funcionalidade principal, criar o evento na agenda google a partir do evento criado no nosso site.

Endpoint: A URL de acesso é .../api/calendar/create-event.

Este arquivo exporta uma função POST assíncrona que lida com a requisição de criação de eventos.

![post](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.29.24.png?raw=true)

Autenticação (OAuth 2.0): Para acessar o calendário da usuária, utilizamos o protocolo OAuth 2.0 do Google. As chaves de acesso sensíveis, como CLIENT_ID, CLIENT_SECRET e o REFRESH_TOKEN (que permite gerar novos tokens de acesso), são armazenadas de forma segura em um arquivo .env (variáveis de ambiente), garantindo que não sejam expostas no código-fonte.

![Autenticação](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.26.18.png?raw=true)

A função POST recebe os dados da nova consulta (paciente, data e notas) do frontend, inicializa um cliente OAuth (oauth2Client) e as credenciais (REFRESH_TOKEN) são definidas para autenticar a chamada.

![funcaoPost](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.40.37.png?raw=true)

Formato Google: Os dados do agendamento são formatados no padrão esperado pela API do Google Calendar, incluindo sumário (nome do paciente) e data/hora de início e fim (start/end), com o fuso horário correto (America/Sao_Paulo).

![formatoGoogle](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.25.36.png?raw=true)

Chamada à API: O método calendar.events.insert é invocado para inserir o evento no calendário principal (calendarId: 'primary').

![insert](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.32.58.png?raw=true)

#### 2.7.1 Chamada da API no Frontend

A função handleSaveAppointment (localizada no page.js principal) é o ponto onde o agendamento é salvo. Ela é responsável por orquestrar a chamada ao servidor para sincronizar a consulta com o Google Calendar.

O fluxo de dados segue os seguintes passos:

1. Criação e Exibição Local:

- Os dados do formulário (formData) são transformados em um objeto newAppointment. Este novo agendamento é adicionado imediatamente ao estado local (setAppointments) e ao localStorage para ser exibido na tela sem atrasos.

![agendamentoLocal](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.55.27.png?raw=true)

2. Requisição Assíncrona ao Servidor:

- Em seguida, o código inicia uma chamada assíncrona (await fetch) para o endpoint que criamos no backend: /api/calendar/create-event. Os dados essenciais da consulta (paciente, data e notas) são enviados no corpo da requisição (POST).

![enviogoogle](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.56.50.png?raw=true)

3. Atualização Final com ID do Google:

- Sucesso: Se a rota de API retornar uma resposta positiva (response.ok), ela inclui o eventId gerado pelo Google Calendar. O agendamento correspondente no estado local e no localStorage é atualizado com esse ID definitivo. Isso garante que futuras operações (edição ou exclusão) possam interagir corretamente com o Google Calendar.

- Falha: Se a requisição falhar (por um erro de rede ou na API do Google), o agendamento permanece no estado local com seu ID temporário. Um erro é registrado no console, e o sistema mantém a consulta salva localmente.
![falhaEnvio](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-11-10%20at%2011.57.13.png?raw=true)

### 3. Conclusão

Ao longo do desenvolvimento deste projeto, transformamos uma necessidade real — a organização da agenda de um consultório dermatológico — em uma solução funcional. A integração do React e Next.js para a estrutura, CSS3 para a estética e JavaScript (com hooks) para a inteligência dinâmica, nos permitiu criar um sistema de agendamento simples, porém completo e eficiente.

O processo de ideação e a criação do protótipo em wireframe foram cruciais, pois nos deram uma visão clara da interface antes mesmo de escrevermos a primeira linha de código, o que resultou em um design simples e uma usabilidade otimizada.

A natureza extensionista do projeto, inicialmente focado em um único indivídufoco, demonstra como as habilidades de programação podem ser aplicadas para resolver problemas práticos e com potencial de impacto em uma comunidade mais ampla. A flexibilidade do nosso código permite que o sistema seja adaptado para outros profissionais de saúde ou pequenos negócios com necessidades de agendamento.

Embora o nosso sistema atual seja funcional, o gerenciamento de dados agora é feito localmente nos componentes React. Para que o sistema seja uma ferramenta robusta e acessível a múltiplos usuários e dispositivos, o próximo passo essencial é a integração com um backend e um banco de dados.
