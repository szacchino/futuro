function vizParse(code, elem) {
    console.log(code, elem);
    if (elem) {
        console.log(elem);
        elem.innerHTML = "";
        elem.innerText = "";
        var viz = new Viz();
        viz.renderSVGElement(code).then(function (element) {
            elem.appendChild(element);
        });
    }
}





function setFooterHtml(html) {
    var slides = document.querySelectorAll(".slides");
    // console.log(html, slides);
    slides.forEach(slide => {
        // console.log(slide);
        var footer = document.createElement("div");
        footer.classList.add("footer");
        footer.innerHTML = html;
        slide.appendChild(footer);
    });
    var h1s = document.querySelectorAll("section h1");
    if (h1s && h1s.length) {
        h1s.forEach(h1 => {
            var shape = document.createElement("div");
            shape.classList.add("shape");
            h1.parentElement.insertBefore(shape, h1);
        })
    }
}

/**
 * Funzione ch ridimensiona la dimensione del testo degli elementi 
 * il cui testo occupa più spazio del consentito (come il resize del testo
 * in powerpoint o keynote)
 */
function setElements() {
    var headers = document.querySelectorAll(".slides section.resize h1");
    headers.forEach(header => {
        // header.innerHTML="<span class='header'>"+header.innerHTML+"</span>";
        var div = document.createElement("div");
        div.classList.add("content");

        // var innerDiv = document.createElement("div");
        // innerDiv.classList.add("inner-content");
        var ns = header.nextElementSibling;
        while (ns) {
            div.appendChild(ns);
            ns = header.nextElementSibling;
        }
        // div.appendChild(innerDiv);
        header.parentElement.appendChild(div);
    });



    resizeElements();
}


function resizeElements(initial) {
    // console.log("resizeElements ", "initial", initial);
    function resize(elem, firstValue, maxHeight) {
        let fontSize = parseFloat(window.getComputedStyle(elem).fontSize);
        // console.log("resize ", elem, "firstValue", firstValue, "maxHeight", maxHeight, "fontSize", fontSize, "elem.clientHeight", elem.clientHeight);
        // console.log("resizeElements", firstValue, fontSize)
        /**
         * Se firstValue non è nullo ed è maggiore del fontsize attuale, assegno firstValue a fontsize
         */
        // console.log("firstValue && (firstValue > fontSize)", firstValue && (firstValue > fontSize));
        if (firstValue && (firstValue > fontSize)) {
            fontSize = firstValue;
            elem.style.fontSize = (fontSize - .5) + 'px';
        }

        /**
         * Se il clientHeight ha superato la maxHeight, decremento il fontsize
         */
        // console.log("(maxHeight < elem.clientHeight) && fontSize > 0", (maxHeight < elem.clientHeight) && fontSize > 0);
        if ((maxHeight < elem.clientHeight) && fontSize > 0) {
            // console.log("riduco");
            elem.style.fontSize = (fontSize - .5) + 'px';
            resize(elem, null, maxHeight);
        }
    }
    /**
     * Ricavo tutti gli header di slide con classe css resize-h1
     */
    var headers = document.querySelectorAll(".slides section.resize-h1 h1");
    if (headers.length) {
        /**
         * ricavo il parametro --h1-max-height
         */
        // console.log("resizeElements", "h1-max-height", getComputedStyle(headers[0]).getPropertyValue('--h1-max-height'), "document clientHeight", document.body.clientHeight);
        let maxHeightH1 = parseFloat(getComputedStyle(headers[0]).getPropertyValue('--h1-max-height')) / 100 * document.body.clientHeight;
        headers.forEach(h1 => {
            resize(h1, initial, maxHeightH1);
        })

    }
    // var contents = document.querySelectorAll(".slides section.resize .content");
    // contents.forEach(content => {
    //     // var div = content.children[0];
    //     resize(content, initial);
    // })
}

// var imports = document.querySelectorAll("import");
var imports = document.evaluate("//p[starts-with(., '@')]", document, null, XPathResult.ANY_TYPE, null);
if (imports) {
    var oldNode = imports.iterateNext();
    while (oldNode) {
        var n = oldNode;
        var items = oldNode.textContent.split(" ");
        if (items.length > 1) {
            var codeType = items[1].split(".").pop();
            var div = document.createElement("div");
            div.classList.add("code-" + codeType)
            n.parentElement.insertBefore(div, n);
            n.parentElement.removeChild(n);
            fetch(items[1]).then(result => result.text()).then(code => {
                switch (codeType) {
                    case "dot":
                        vizParse(code, div);
                        break;

                    default:
                        break;
                }
            })
        }
        oldNode = imports.iterateNext();
    }
}
// imports.forEach(importElem => {
//     console.log(importElem.dataset.src);
//     fetch(importElem.dataset.src).then(x => x.text()).then(code => {
//         var div = document.createElement("div");
//         div.classList.add("imported");
//         div.innerHTML
//     })
// });