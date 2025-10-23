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
O projeto será desenvolvido utilizando as seguintes tecnologias:

- HTML5: estrutura e marcação da página.

- CSS3: estilização e o layout responsivo da interface.

- JavaScript: funcionalidade dinâmica do sistema/interações.

**2.** **Explicação** **do** **código**

A seção a seguir apresenta um tutorial/explicação do código (html, css e
javascript) do nosso sistema de agendamento. A estrutura do tutorial foi
separada em seções com prints do código e explicação de cada
“componente” principal da página para melhor entendimento.

**2.1** **Cabeçalho** **(\<header\>)**

imagem no site:
![imagem cabecalho](https://github.com/erikhsu08/webmobile/blob/main/assets/3qovzvwf.png?raw=true)

A seção de cabeçalho (\<header class="header"\>) contém o logo, o nome do sistema e as informações (avatar / nome) do usuário.

![img src="./awtqia1d.png"
style="width:6.03125in;height:2.52083in"](https://github.com/erikhsu08/webmobile/blob/main/assets/awtqia1d.png?raw=true) 


```
<section class="logo">:
      <button class="mobile-menu">☰</button>  : Um botão de menu para dispositivos móveis que aparece apenas em telas menores.
      <span class="logo-icon"></span>: ícone de logo.
<section class="user-info">:
      <span class="user-avatar">A</span>: Um <span> para exibir o avatar e nome do usuário.
```

### 2.2 Layout Principal e Barra Lateral ( ```<main>, <nav>```)
A estrutura principal do layout é dividida em uma barra lateral e uma área de conteúdo.
imagem da estrutura principal, com linha em vermelho indicando divisão entre barra lateral e área de conteúdo:

![<img src="./qzdvmtof.png"](https://github.com/erikhsu08/webmobile/blob/main/assets/qzdvmtof.png?raw=true)

![src="./qiwh0nnq.png"
style="width:6.27083in;height:3.05208in" />](https://github.com/erikhsu08/webmobile/blob/main/assets/qiwh0nnq.png?raw=true)

```
<main class="main-layout">: contêiner principal que organiza a barra lateral e o conteúdo. O CSS usa display: flex para alinhar esses dois elementos lado a lado.
<nav class="sidebar">: barra lateral de navegação, é separada em títulos (Menu/Outros) e itens.
    <h3>Menu, <h3>Outros: Títulos para seções da barra lateral.
    <a href="#" class="sidebar-item">: Links de navegação para diferentes seções do sistema (Agendamentos, Pacientes, etc.). A classe active é usada para destacar o item selecionado (página que esta sendo exibida no momento).
    <span class="sidebar-icon"> + <img src="...">**: Um contêiner para o ícone de cada item, usando imagens para representá-los visualmente.

```
imagem da sidebar:

![<img src="./nifb1put.png"
style="width:1.80208in;height:3.03125in" />](https://github.com/erikhsu08/webmobile/blob/main/assets/nifb1put.png?raw=true)

**2.3** **Conteúdo** **Principal** **(```<article>```)**

Esta é a área central da interface, onde o conteúdo de cada seção (Agendamentos, Receitas, etc.) é exibido. (até o momento implementamos apenas a tela de agendamentos, que conta com os cards de estatísticas e o calendário)

![article](https://github.com/erikhsu08/webmobile/blob/main/assets/kbhvfxb2.png?raw=true)

```
<article class="main-content">: Contêiner para o conteúdo dinâmico.
<section id="appointments" class="screen active">: A tela de agendamentos. A classe active indica que esta é a tela atualmente visível.
```

**Seção** **de** **Estatísticas** **(.stats-grid)**

imagem no site:

![AgendamentosSite](https://github.com/erikhsu08/webmobile/blob/main/assets/jofs2u53.png?raw=true)

grade de cartões que exibe dados relevantes á respeito dos agendamentos.

![statsGrid](https://github.com/erikhsu08/webmobile/blob/main/assets/2pjrkjec.png?raw=true)

```
<section class="stats-grid">: contêiner que utiliza display: grid para organizar os cartões de estatísticas em um layout responsivo.
<article class="stat-card">: Cada cartão de estatística.
      <span class="stat-icon"> + <img src="...">: Um contêiner para o ícone de cada estatística.
      <section class="stat-content">: Contém o número (<h3>) e a descrição (<p>) da estatística. (o número será dinâmico quando implementarmos o javascript)
```

**Botão** **de** **Nova** **Consulta** **(.btn-primary)**

![novaConsulta](https://github.com/erikhsu08/webmobile/blob/main/assets/dqxkzrg3.png?raw=true)

![codigoNovaConsulta](https://github.com/erikhsu08/webmobile/blob/main/assets/0ew4qaw0.png?raw=true)



**Calendário** **(.calendar-container)**

imagem no site:

![calendario](https://github.com/erikhsu08/webmobile/blob/main/assets/5rhoraox.png?raw=true)

A seção do calendário tem sua própria header (cabeçalho) e o grid
formado pelas células que contém os agendamentos.

![calendarContainer](https://github.com/erikhsu08/webmobile/blob/main/assets/qegybfle.png?raw=true)

![calendarTime](https://github.com/erikhsu08/webmobile/blob/main/assets/zozq35jh.png?raw=true)

```
<header class="calendar-header">: Contém os botões de navegação e as opções de visualização (Ano, Semana, Mês, Dia).
<section class="calendar-grid">: A grade principal do calendário. Ela usa display: grid com grid-template-columns para criar um layout com a coluna de tempo e as 7 colunas para os dias da semana.
.calendar-day-header: Os cabeçalhos para cada dia da semana.
.calendar-time: Os rótulos de tempo na coluna esquerda.
.calendar-cell: Cada célula do calendário, onde os agendamentos são colocados.
<article class="appointment">: Um agendamento específico.
      class="pending" ou class="confirmed": Classes que aplicam estilos diferentes para agendamentos pendentes ou confirmados, mudando a cor do fundo e da borda.
```

Os agendamentos serão dinâmicos, isso será implementado na fase de
javascript do nosso projeto.


**2.4** **Estilos** **(CSS)**

O arquivo style.css é responsável por toda a aparência da interface,
desde o layout até os detalhes de cores e tipografia. Escolhemos alguns
dos principais componentes do nosso site para explicar nesse tutorial.

![bzf](https://github.com/erikhsu08/webmobile/blob/main/assets/2y53l2se.png?raw=true)

```{ margin: 0; padding: 0; box-sizing: border-box; }```: configuração geral para garantir que todos os elementos comecem com o mesmo padrão, facilitando o controle de margens e preenchimentos. Usamos border-box para garantir que os componentes tenham as medidas exatamente como especificamos (incluí padding e border).

![mainLayoutSidebarCode](https://github.com/erikhsu08/webmobile/blob/main/assets/bzfmfd0k.png?raw=true)

```
.main-layout: Utiliza display: flex para colocar a barra lateral e o conteúdo principal lado a lado.
.min-height : define o tamanho para o layout.
.sidebar: Define a largura (width: 250px) e a cor de fundo da barra lateral.
.main-content: Ocupa o restante do espaço (flex: 1) e tem um padding para espaçamento interno.
```

**Componentes**

**.header**: Estilizamos o cabeçalho com
```justify-content:space-between``` para distribuir o logo e as informações do usuário e usamos box-shadow para dar um efeito de destaque.

![headerCode](https://github.com/erikhsu08/webmobile/blob/main/assets/uqnrklt2.png?raw=true)

![cabecalho](https://github.com/erikhsu08/webmobile/blob/main/assets/pxpubazh.png?raw=true)

**.sidebar-item**: Para os itens da sidebar usamos a regra :hover , que adiciona um efeito de destaque ao passar o mouse. O estilo **.active** é usado para o item selecionado, com uma borda azul à esquerda (```border-left-color: \#0080FF```).

![sidebarCode](https://github.com/erikhsu08/webmobile/blob/main/assets/3ymfdkzh.png?raw=true)

![sideBarSite](https://github.com/erikhsu08/webmobile/blob/main/assets/qse2rxmv.png?raw=true)

**.stat-card**: Aplicamos border-radius, box-shadow e um efeito de ```:hover``` para um visual mais interativo.

 ![statCard](https://github.com/erikhsu08/webmobile/blob/main/assets/c5fp2ogo.png?raw=true)

![statCards](https://github.com/erikhsu08/webmobile/blob/main/assets/hz1bpxtv.png?raw=true)

**.btn-primary**: Para estilizar o botão "Nova Consulta", usamos o linear-gradient para um efeito de cor gradiente.


![btnprimary](https://github.com/erikhsu08/webmobile/blob/main/assets/lcm0o0sv.png?raw=true)

![novaConsulta](https://github.com/erikhsu08/webmobile/blob/main/assets/oawjnlwb.png?raw=true)

**calendar-grid**: A propriedade display:grid foi usada para
transformar o elemento .calendar-grid em um contêiner de grade com 2 dimensões (linhas e colunas). Usamos a função repeat() para a criação das colunas e o collapse

![calendarGridCode](https://github.com/erikhsu08/webmobile/blob/main/assets/lu0bpkg2.png?raw=true)

![Calendar](https://github.com/erikhsu08/webmobile/blob/main/assets/5rhoraox.png?raw=true)

**.appointment**: Usamos um gradiente para colorir os agendamentos,arredondamos as bordas com border-radius e criamos um efeito de box-shadow para o hover (passar em cima com o botão do mouse).

![appointmentCode](https://github.com/erikhsu08/webmobile/blob/main/assets/c2yhtsjc.png?raw=true)

![appointment](https://github.com/erikhsu08/webmobile/blob/main/assets/emh3yiwe.png?raw=true)

**Responsividade** **(@media)**

Usamos **media** **queries** para adaptar a interface a diferentes
tamanhos de tela, garantindo que o design seja amigável em desktops,
tablets e smartphones.


```@media (max-width: 1024px)```:
    O layout principal (.main-layout) muda para flex-direction:   column, empilhando a barra lateral e o conteúdo.
    A barra lateral é escondida (display: none) e só aparece ao clicar no botão de menu, simulando um menu hambúrguer para dispositivos móveis.
```@media (max-width: 768px)``` e ```@media (max-width: 480px)```:
    Ajustam ainda mais o layout e os tamanhos dos elementos (fontes, preenchimentos, células do calendário) para garantir que a interface seja totalmente funcional e legível em telas pequenas.

imagem do site em tela maior:

![siteMaior](https://github.com/erikhsu08/webmobile/blob/main/assets/4bfere34.png?raw=true)

imagens do site em tela
menor:
![siteMenor](https://github.com/erikhsu08/webmobile/blob/main/assets/rck4zu02.png?raw=true)


![siteMenor2](https://github.com/erikhsu08/webmobile/blob/main/assets/n5kdws3a.png?raw=true)

**2.5** **Lógica** **e** **Interatividade** **(JavaScript)**

O arquivo script.js é o “cérebro” do nosso sistema, responsável por toda
a interatividade e dinamismo da interface. Ele gerencia o estado da
aplicação, renderiza as informações na tela e lida com as ações do
usuário.

A seguir, detalhamos os principais blocos de código com trechos do
código e como eles se refletem no site.

**2.5.1** **Gerenciamento** **de** **Dados** **e** **Estado**

O sistema armazena todas as informações essenciais para a aplicação
funcionar em um objeto state, que atua como um banco de dados
temporário. Isso inclui a lista de agendamentos (appointments),
pacientes (patient), a visualização atual do calendário (current-view),
e a data atual (currentDate).

Código:

![codeState](https://github.com/erikhsu08/webmobile/blob/main/assets/pgqzoaxr.png?raw=true)

imagem de detalhes de agendamento no site:

![Agendamento](https://github.com/erikhsu08/webmobile/blob/main/assets/vkj31jqk.png?raw=true)
**2.5.2** **Funções** **de** **Renderização** **Dinâmica**

As funções javascript manipulam o html, pegando os dados do objeto state
e os transformando em elementos visuais.

Exemplos:

**Atualização** **de** **Estatísticas:** A função ```updateStats()``` filtra a
lista de agendamentos (```state.appointments```) para contar o número de
consultas hoje, nesta semana, e o total de consultas confirmadas e
pendentes. Usamos as funções map e .innerHTML para manipular o html
através do javascript.

Código:
![update](https://github.com/erikhsu08/webmobile/blob/main/assets/x0vj1ggh.png?raw=true)

stats cards que são atualizados pela função ```updateStats()```:

![statCards](https://github.com/erikhsu08/webmobile/blob/main/assets/py1zkayq.png?raw=true)

**Renderização** **do** **Calendário:** Para renderizar o calendário
criamos funções como ```renderWeekView()``` (calendário semanal) . Ela percorre a lista de agendamentos e insere o HTML de cada consulta
(```.appointment```) na célula de horário e dia corretas.

Código:
![CalendarSemanalCode](https://github.com/erikhsu08/webmobile/blob/main/assets/r2pju5ya.png?raw=true)

![calendarCode](https://github.com/erikhsu08/webmobile/blob/main/assets/kwzi2bdt.png?raw=true)

Assim como para a semana, as visualizações diária, mensal e anual também
tem suas respectivas funções de renderização com lógica similar.

visualização semanal:
![semana](https://github.com/erikhsu08/webmobile/blob/main/assets/5kmyignw.png?raw=true)

visualização mensal:
![mensal](https://github.com/erikhsu08/webmobile/blob/main/assets/ofnsdmz2.png?raw=true)
visualização anual:
![anual](https://github.com/erikhsu08/webmobile/blob/main/assets/rlqofxat.png?raw=true)
visualização diária:

![diaria](https://github.com/erikhsu08/webmobile/blob/main/assets/0sunz5y2.png?raw=true)

Para alternar entre essas diferentes telas de calendário usamos um
switch case atrelado ao estado atual.

![navCalendar](https://github.com/erikhsu08/webmobile/blob/main/assets/j53wpglz.png?raw=true)

**2.5.3** **Manipulação** **do** **DOM** **e** **Eventos**

Para que o site reaja às ações do usuário, usamos event listeners.

- Navegação do Calendário: Os botões de navegação (#prevPeriod e #nextPeriod) chamam a função MapsCalendar(), que atualiza a data de referência e redesenha o calendário.
![](https://github.com/erikhsu08/webmobile/blob/main/assets/tezjo2oj.png?raw=true)

![](https://github.com/erikhsu08/webmobile/blob/main/assets/uyfhys3v.png?raw=true)

-  Modais: O botão "Nova Consulta" (#newAppointmentBtn) dispara a função showNewAppointmentModal(). Ao clicar em um agendamento, o evento
```attachAppointmentListeners()``` garante que o modal de detalhes apareça.
![](https://github.com/erikhsu08/webmobile/blob/main/assets/h2dht5e0.png?raw=true)
![](https://github.com/erikhsu08/webmobile/blob/main/assets/mrs44rjy.png?raw=true)
![](https://github.com/erikhsu08/webmobile/blob/main/assets/rmsh02d1.png?raw=true)

**3.** **Next.Js**

Para transformar o projeto uma aplicação web moderna e escalável, o sistema foi migrado para o framework Next.js (utilizando React). Esta mudança introduziu melhorias significativas na estrutura, performance e manutenibilidade do código.

As principais alterações incluem:

- Arquitetura Baseada em Componentes: O código foi refatorado em componentes reutilizáveis (como Header, Sidebar, Calendar, StatCard), localizados no diretório src/components. Isso elimina a duplicação de código e facilita a manutenção, permitindo que cada parte da interface seja gerenciada de forma isolada.

![components](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-22%20at%2021.10.06.png?raw=true)

- Roteamento e Navegação: A navegação entre telas foi completamente reformulada. Em vez de sobrepor elementos na mesma página, o projeto agora utiliza o App Router do Next.js. A estrutura de pastas dentro de src/app (ex: /pacientes, /receitas) define automaticamente as URLs da aplicação, criando uma navegação real, mais rápida e intuitiva. No Next.js, cada pasta dentro de app (como /pacientes ou /receitas) se torna uma nova página/URL, desde que contenha um arquivo page.js.

![components](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-22%20at%2020.53.39.png?raw=true)

- Gerenciamento de Estado: O gerenciamento de estado, que antes dependia de um objeto state global, agora é feito de forma granular dentro de cada componente usando hooks do React, como o useState. Isso permite que cada componente controle seu próprio estado (por exemplo, a data selecionada no calendário) de forma independente.
![states](https://github.com/erikhsu08/webmobile/blob/main/assets/Screenshot%202025-10-22%20at%2021.06.03.png?raw=true)

- Manipulação de Eventos: A interatividade foi modernizada. Em vez de selecionar elementos manualmente com document.getElementById, os eventos são declarados diretamente no JSX (a sintaxe do React), tornando o código mais limpo e declarativo. Por exemplo: `<button onClick={handleClick}>Salvar</button>.`

**4.** **Conclusão**

Ao longo do desenvolvimento deste projeto, transformamos uma necessidade
real — a organização da agenda de um consultório dermatológico — em uma
solução funcional. A integração de HTML5 para a estrutura, CSS3 para a
estética e responsividade, e JavaScript para a inteligência dinâmica,
nos permitiu criar um sistema de agendamento simples, porém completo e
eficiente.

O processo de ideação e a criação do protótipo em wireframe foram
cruciais, pois nos deram uma visão clara da interface antes mesmo de
escrevermos a primeira linha de código, o que resultou em um design
simples e uma usabilidade otimizada.

A natureza extensionista do projeto, inicialmente focado em um único
indivíduo, demonstra como as habilidades de programação podem ser
aplicadas para resolver problemas práticos e com potencial de impacto em
uma comunidade mais ampla. A flexibilidade do nosso código, permite que
o sistema seja adaptado para outros profissionais de saúde ou pequenos
negócios com necessidades de agendamento.

Embora o nosso sistema atual seja funcional, ele depende de um state
local no JavaScript para gerenciar os dados. Para que o sistema seja uma
ferramenta robusta e acessível a múltiplos usuários e dispositivos, o
próximo passo essencial é a integração com um backend.


