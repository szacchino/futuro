Reveal.initialize({
    // embedded: false,
    controls: false,
    progress: false,
    center: false,
    hash: true,
    disableLayout: true,
    width: 16,
    height: 9,
    margin: 0,
    minScale: 1,
    maxScale: 1,
    zoom: true,
    menu: {
        titleSelector: 'h1',
        custom: [
            {
                title: 'Links',
                icon: '<i class="fas fa-book-open">',
                src: 'links.html'
            },
            {
                title: 'About',
                icon: '<i class="fa fa-info">',
                content: "<p>Progetto FUTURO: Formazione innovativa e pratica UTilizzando laboratori congiUnti per la tRasfOrmazione digitale</p><p>A.S. 2023-2024 – Gruppo di Ingegneria Informatica dell'Università del Salento</p>"
            }
        ]
    },
    dependencies: [
        { src: '/plugin/reveal.js-plantuml-plugin/plugin/plantuml.js', async: false }
    ],
    plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight, RevealMenu, RevealAdmonition],
});

Reveal.on( 'ready', event => {
    // console.log('revealready');
    setFooterHtml("A.S. 2023/2024 – Gruppo di Ingegneria Informatica dell'Università del Salento"); 
    // setElements();
    resizeElements(30);
} );
window.addEventListener("resize", function(event) {
    // console.log("start resize");
    resizeElements(50);
    // console.log("end resize");
});