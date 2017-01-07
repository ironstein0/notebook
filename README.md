# Notebook

A framework for building websites that resemble a notebook

demo available here : [https://riyanshkarani011235.github.io/](https://riyanshkarani011235.github.io/)

**Usage :**

1) Just copy the ***Notebook*** folder anywhere in your directory and link the Notebook.js file in your html (**Important** : Notebook.js and all the related files should be inside a `Notebook` folder).

2) Write all the content of the `<body>` inside a `<div>` element with id "content" so that the html looks something like : 
    
    <html>
        ...
        <body>
            <div id="content">
                <!-- all your html goes here -->
            </div>
            ...
        </body>
        
3) in your javascript, just run `new Notebook(callback);` and the callback function will be run after everything is initialized. So, somehting like :

    $(window).load(function() {
        var callback = function() {
            // all your javascript goes here
        }
        new Notebook(callback);
    }

**Thats it**
