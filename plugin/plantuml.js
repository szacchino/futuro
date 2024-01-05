import encode from './plantuml-encoder.js';

const Plugin = () => {
    return {
        id: 'plantuml',
        init: function (reveal) {
            let server = reveal.getConfig().serverPath || '//www.plantuml.com/plantuml/svg/';
            reveal.on('ready', () => {
                document.querySelectorAll('.reveal pre code.plantuml').forEach(function (block) {
                    let img = document.createElement("img");
                    img.classList.add("plantuml");
                    img.style.display = "block";
                    img.setAttribute("src", server + encode(block.innerText));
                    let pre = block.parentElement;
                    pre.parentNode.replaceChild(img, pre);
                });
            });
        }

    };
};


export default Plugin;