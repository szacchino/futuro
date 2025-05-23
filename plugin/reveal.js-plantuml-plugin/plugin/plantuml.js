/*
 * Write PlantUML text-diagram description into a <img class="plantuml">...</div>
 * 
 * Uses https://plantuml.com/de/code-javascript-synchronous
 * Uses https://github.com/johan/js-deflate
 *
 * By Johannes Schildgen, 2019
 */
 
var PlantUML = (function(){

    function encode64(data) {
        r = "";
        for (i=0; i<data.length; i+=3) {
             if (i+2==data.length) {
                r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
            } else if (i+1==data.length) {
                r += append3bytes(data.charCodeAt(i), 0, 0);
            } else {
                r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
                    data.charCodeAt(i+2));
            }
        }
        return r;
    }
    
    function append3bytes(b1, b2, b3) {
        c1 = b1 >> 2;
        c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
        c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
        c4 = b3 & 0x3F;
        r = "";
        r += encode6bit(c1 & 0x3F);
        r += encode6bit(c2 & 0x3F);
        r += encode6bit(c3 & 0x3F);
        r += encode6bit(c4 & 0x3F);
        return r;
    }
    
    function encode6bit(b) {
        if (b < 10) {
             return String.fromCharCode(48 + b);
        }
        b -= 10;
        if (b < 26) {
             return String.fromCharCode(65 + b);
        }
        b -= 26;
        if (b < 26) {
             return String.fromCharCode(97 + b);
        }
        b -= 26;
        if (b == 0) {
             return '-';
        }
        if (b == 1) {
             return '_';
        }
        return '?';
    }

    function generate_plantumls(slide_or_document) {
        // slide_or_document.querySelectorAll('img[uml]').forEach(
        const selector = 'code.plantuml'
        slide_or_document.querySelectorAll(selector).forEach(
            // function(img) { 
            function(elem) { 
                // var planttxt = img.getAttribute('uml')
                var planttxt = elem.innerText
                var s = unescape(encodeURIComponent(planttxt));
                var img = document.createElement('img')
                img.src = "http://www.plantuml.com/plantuml/png/"+encode64(zip_deflate(s, 9));
                img.style.border = 0;
                img.style.boxShadow = 'none';
                img.style.display = 'block';
                img.classList.add('plantuml')
                var p = elem.parentElement.parentElement
                p.appendChild(img);
                elem.parentElement.parentElement.removeChild(elem.parentElement) 
            })
    }
    
    
	return {
		init: function() {     
            Reveal.addEventListener( 'ready', function(event) { generate_plantumls(document) } )
		}
	}

})();

Reveal.registerPlugin( 'plantuml', PlantUML );
