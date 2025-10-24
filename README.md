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
- **Next.js:** Framework React que fornece otimizações como Roteamento (App Router), renderização no servidor e uma estrutura de projeto organizada.
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

### 2.2 Arquitetura Baseada em Componentes

Toda a interface foi refatorada em **componentes reutilizáveis**, localizados no diretório `src/components`. Em vez de duplicar código HTML (como o cabeçalho ou a barra lateral em várias páginas), nós criamos um componente e o importamos onde for necessário.

Isso elimina a duplicação, facilita a manutenção e permite que cada parte da interface seja gerenciada de forma isolada.

Nossos principais componentes incluem:
- `Header`
- `Sidebar`
- `Calendar`
- `StatCard`
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

### 3. Conclusão

Ao longo do desenvolvimento deste projeto, transformamos uma necessidade real — a organização da agenda de um consultório dermatológico — em uma solução funcional. A integração do React e Next.js para a estrutura, CSS3 para a estética e JavaScript (com hooks) para a inteligência dinâmica, nos permitiu criar um sistema de agendamento simples, porém completo e eficiente.

O processo de ideação e a criação do protótipo em wireframe foram cruciais, pois nos deram uma visão clara da interface antes mesmo de escrevermos a primeira linha de código, o que resultou em um design simples e uma usabilidade otimizada.

A natureza extensionista do projeto, inicialmente focado em um único indivídufoco, demonstra como as habilidades de programação podem ser aplicadas para resolver problemas práticos e com potencial de impacto em uma comunidade mais ampla. A flexibilidade do nosso código permite que o sistema seja adaptado para outros profissionais de saúde ou pequenos negócios com necessidades de agendamento.

Embora o nosso sistema atual seja funcional, o gerenciamento de dados agora é feito localmente nos componentes React. Para que o sistema seja uma ferramenta robusta e acessível a múltiplos usuários e dispositivos, o próximo passo essencial é a integração com um backend e um banco de dados.
