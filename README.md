# Notebook

A framework for building websites that resemble a notebook.

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
        
3) in your javascript when everything else is initialized, just run `new Notebook();`. So, somehting like :

    $(window).load(function() {
        // all your javascript goes here
        new Notebook();
    }

**Thats it**
