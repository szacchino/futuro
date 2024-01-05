export default () => ({
    id: 'SimpleFullScreen',
    init: (deck) => {
        function loadResource(url, type, callback) {
            var head = document.querySelector('head');
            var resource;

            if (type === 'script') {
                resource = document.createElement('script');
                resource.type = 'text/javascript';
                resource.src = url;
            } else if (type === 'stylesheet') {
                resource = document.createElement('link');
                resource.rel = 'stylesheet';
                resource.href = url;
            }

            // Wrapper for callback to make sure it only fires once
            var finish = function () {
                if (typeof callback === 'function') {
                    callback.call();
                    callback = null;
                }
            };

            resource.onload = finish;

            // IE
            resource.onreadystatechange = function () {
                if (this.readyState === 'loaded') {
                    finish();
                }
            };

            // Normal browsers
            head.appendChild(resource);
        }

        loadResource("./plugin/simple-full-screen/sfs.css", "stylesheet", () => {
            var parent = document.querySelector(".reveal");
            var button = document.createElement("div");
            button.innerHTML = '<i class="fas fa-expand"></i>';
            button.classList.add("simple-full-screen-button");
    
            parent.appendChild(button);
        });

    }
})