# Utilizzo della presentazione

All'interno della slide, utilizzare un commento con:
```
<!-- .slide: class="" data-background-image="<uno sfondo del folder sfondi>"
data-background-size="contain" -->
```

Utilizzare il separatore `---` per separare le slide.

## class
All'interno di class inserire una delle seguenti classi corrispondenti allo sfondo scelto:
 - `titolo` 
 - `cosa-impareremo`
 - `roadmap`
 - `grafico`
 - `opzioni`

Una delle seguenti classi per decidere la dimensione dell'intestazione:
 - `h1-fontsize-20`
 - `h1-fontsize-30`
 - `h1-fontsize-40`
 - `h1-fontsize-50`
 - `h1-fontsize-60`
 - `h1-fontsize-70`
 - `h1-fontsize-80`

La classe `h1-align-left` per allineare il titolo a sinistra.

### Classe `shape`

Uno script javascript inserisce all'interno di ogni slide un div vuoto con classe `shape`. Questo div, se anche la classe della slide è shape ha definito un'attributo `shape-outside` che sposta il testo in base ad un path che rispecchia lo sfondo ed è definito nello stile dello sfondo (se lo sfondo è `opzioni`, nel file `opzioni.css`).

Quindi un codice del tipo:
```
<!-- slide: class="roadmap shape" -->
```

Definisce una slide con classe `roadmap` ed attiva l'allineamento del testo sulla base dell'attributo `shape-outside` definito in `roadmap.css`.

# @import

Se un paragrafo contiene la voce

```
@import file.dot
```

Il file sarà letto ed interpretato con la libreria corrispondente all'estensione del file.
Al momento è supportato solo l'estensione `.dot`. È importante che il carattere `@` sia il primo del paragrafo.

# Admonition

Le slide supportano le admonition.

```
!!!warning Title
	Testo dell'admonition
```
!!!warning Title
	Testo dell'admonition

Sono possibili admonition con le keyword:
- `summary`
- `abstract`
- `tldr`
- `hint`
- `tip`
- `info`
- `todo`
- `success`
- `check`
- `done`
- `question`
- `help`
- `faq`
- `warning`
- `attention`
- `caution`
- `failure`
- `fail`
- `missing`
- `danger`
- `error`
- `bug`
- `example`
- `snippet`
- `quote`
- `cite`