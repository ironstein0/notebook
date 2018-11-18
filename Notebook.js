// LAB.js for loading and blocking JavaScript
(function(o){var K=o.$LAB,y="UseLocalXHR",z="AlwaysPreserveOrder",u="AllowDuplicates",A="CacheBust",B="BasePath",C=/^[^?#]*\//.exec(location.href)[0],D=/^\w+\:\/\/\/?[^\/]+/.exec(C)[0],i=document.head||document.getElementsByTagName("head"),L=(o.opera&&Object.prototype.toString.call(o.opera)=="[object Opera]")||("MozAppearance"in document.documentElement.style),q=document.createElement("script"),E=typeof q.preload=="boolean",r=E||(q.readyState&&q.readyState=="uninitialized"),F=!r&&q.async===true,M=!r&&!F&&!L;function G(a){return Object.prototype.toString.call(a)=="[object Function]"}function H(a){return Object.prototype.toString.call(a)=="[object Array]"}function N(a,c){var b=/^\w+\:\/\//;if(/^\/\/\/?/.test(a)){a=location.protocol+a}else if(!b.test(a)&&a.charAt(0)!="/"){a=(c||"")+a}return b.test(a)?a:((a.charAt(0)=="/"?D:C)+a)}function s(a,c){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c}function O(a){var c=false;for(var b=0;b<a.scripts.length;b++){if(a.scripts[b].ready&&a.scripts[b].exec_trigger){c=true;a.scripts[b].exec_trigger();a.scripts[b].exec_trigger=null}}return c}function t(a,c,b,d){a.onload=a.onreadystatechange=function(){if((a.readyState&&a.readyState!="complete"&&a.readyState!="loaded")||c[b])return;a.onload=a.onreadystatechange=null;d()}}function I(a){a.ready=a.finished=true;for(var c=0;c<a.finished_listeners.length;c++){a.finished_listeners[c]()}a.ready_listeners=[];a.finished_listeners=[]}function P(d,f,e,g,h){setTimeout(function(){var a,c=f.real_src,b;if("item"in i){if(!i[0]){setTimeout(arguments.callee,25);return}i=i[0]}a=document.createElement("script");if(f.type)a.type=f.type;if(f.charset)a.charset=f.charset;if(h){if(r){e.elem=a;if(E){a.preload=true;a.onpreload=g}else{a.onreadystatechange=function(){if(a.readyState=="loaded")g()}}a.src=c}else if(h&&c.indexOf(D)==0&&d[y]){b=new XMLHttpRequest();b.onreadystatechange=function(){if(b.readyState==4){b.onreadystatechange=function(){};e.text=b.responseText+"\n//@ sourceURL="+c;g()}};b.open("GET",c);b.send()}else{a.type="text/cache-script";t(a,e,"ready",function(){i.removeChild(a);g()});a.src=c;i.insertBefore(a,i.firstChild)}}else if(F){a.async=false;t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}else{t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}},0)}function J(){var l={},Q=r||M,n=[],p={},m;l[y]=true;l[z]=false;l[u]=false;l[A]=false;l[B]="";function R(a,c,b){var d;function f(){if(d!=null){d=null;I(b)}}if(p[c.src].finished)return;if(!a[u])p[c.src].finished=true;d=b.elem||document.createElement("script");if(c.type)d.type=c.type;if(c.charset)d.charset=c.charset;t(d,b,"finished",f);if(b.elem){b.elem=null}else if(b.text){d.onload=d.onreadystatechange=null;d.text=b.text}else{d.src=c.real_src}i.insertBefore(d,i.firstChild);if(b.text){f()}}function S(c,b,d,f){var e,g,h=function(){b.ready_cb(b,function(){R(c,b,e)})},j=function(){b.finished_cb(b,d)};b.src=N(b.src,c[B]);b.real_src=b.src+(c[A]?((/\?.*$/.test(b.src)?"&_":"?_")+~~(Math.random()*1E9)+"="):"");if(!p[b.src])p[b.src]={items:[],finished:false};g=p[b.src].items;if(c[u]||g.length==0){e=g[g.length]={ready:false,finished:false,ready_listeners:[h],finished_listeners:[j]};P(c,b,e,((f)?function(){e.ready=true;for(var a=0;a<e.ready_listeners.length;a++){e.ready_listeners[a]()}e.ready_listeners=[]}:function(){I(e)}),f)}else{e=g[0];if(e.finished){j()}else{e.finished_listeners.push(j)}}}function v(){var e,g=s(l,{}),h=[],j=0,w=false,k;function T(a,c){a.ready=true;a.exec_trigger=c;x()}function U(a,c){a.ready=a.finished=true;a.exec_trigger=null;for(var b=0;b<c.scripts.length;b++){if(!c.scripts[b].finished)return}c.finished=true;x()}function x(){while(j<h.length){if(G(h[j])){try{h[j++]()}catch(err){}continue}else if(!h[j].finished){if(O(h[j]))continue;break}j++}if(j==h.length){w=false;k=false}}function V(){if(!k||!k.scripts){h.push(k={scripts:[],finished:true})}}e={script:function(){for(var f=0;f<arguments.length;f++){(function(a,c){var b;if(!H(a)){c=[a]}for(var d=0;d<c.length;d++){V();a=c[d];if(G(a))a=a();if(!a)continue;if(H(a)){b=[].slice.call(a);b.unshift(d,1);[].splice.apply(c,b);d--;continue}if(typeof a=="string")a={src:a};a=s(a,{ready:false,ready_cb:T,finished:false,finished_cb:U});k.finished=false;k.scripts.push(a);S(g,a,k,(Q&&w));w=true;if(g[z])e.wait()}})(arguments[f],arguments[f])}return e},wait:function(){if(arguments.length>0){for(var a=0;a<arguments.length;a++){h.push(arguments[a])}k=h[h.length-1]}else k=false;x();return e}};return{script:e.script,wait:e.wait,setOptions:function(a){s(a,g);return e}}}m={setGlobalDefaults:function(a){s(a,l);return m},setOptions:function(){return v().setOptions.apply(null,arguments)},script:function(){return v().script.apply(null,arguments)},wait:function(){return v().wait.apply(null,arguments)},queueScript:function(){n[n.length]={type:"script",args:[].slice.call(arguments)};return m},queueWait:function(){n[n.length]={type:"wait",args:[].slice.call(arguments)};return m},runQueue:function(){var a=m,c=n.length,b=c,d;for(;--b>=0;){d=n.shift();a=a[d.type].apply(null,d.args)}return a},noConflict:function(){o.$LAB=K;return m},sandbox:function(){return J()}};return m}o.$LAB=J();(function(a,c,b){if(document.readyState==null&&document[a]){document.readyState="loading";document[a](c,b=function(){document.removeEventListener(c,b,false);document.readyState="complete"},false)}})("addEventListener","DOMContentLoaded")})(this);

/*
 * globals 
 **********************
 */
var middleColumnFont = 'Muli';
var leftColumnFont = 'Reenie Beanie'
var initDoneFlag = false; // flag representing Notebook initialization status
var firstTimePositionElementsDoneFlag = false;
var callbackFunction;

var initDoneFlagSetter = function(initDone) {
    initDoneFlag = initDone;
    callbackFunction();
};

/*
 * constructor
 *************************
 */
var Notebook = function(callback) {
    callbackFunction = callback;

    // get location of folder containing Notebook.js
    var jsFileLocation = ''
    $('script').each(function() {
        var src = $(this).attr('src');
        if((src !== undefined)) {
            if(src.indexOf('notebook/Notebook.js') !== -1) {
                // Notebook/Notebook.js is a substring
                jsFileLocation = src;
            }
        }
    });
    var folderLocation = jsFileLocation.replace('Notebook.js', '');

    /*
     * SCRIPTS TO BE LOADED (IN THIS PARTICULAR ORDER)
     ****************************************************
     * utils.js         : ../Notebook/utils.js
     * Box.js           : ../Notebook/Box.js
     * WebFontLoader    : https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js
     * pathformer.js    : ../Notebook/vivus/pathformer.js
     * vivus.js         : ../Notebook/vivus/vivus.js
     */

    // first load only the scripts required to generate the
    // three column layout, and position elements
    $LAB.setGlobalDefaults({AlwaysPreserveOrder: true});
    $LAB
    .script(folderLocation + 'Utils.js')
    .script(folderLocation + 'Box.js').wait(function() {
        console.log('all scripts loaded');
        Notebook.prototype.init();
    });

    // load fonts
    $LAB
    .script('https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js').wait(function() {
        console.log('webfontloader loaded');
        WebFontConfig = {
            google: {
                families: [middleColumnFont, leftColumnFont]
            },

            // LOADING : This event is triggered when all fonts have been requested.
            loading: function() {console.log('loading');},

            // ACTIVE : This event is triggered when the fonts have rendered.
            active: function() {
                // Rendering of all fonts complete. Enable animation.
                $LAB
                .script(folderLocation + 'vivus/pathformer.js')
                .script(folderLocation + 'vivus/vivus.js').wait(function() {
                    Notebook.prototype.draw();
                    initDoneFlagSetter(true);
                });
            },

            // INACTIVE : This event is triggered when the browser does not support linked 
            // fonts or if none of the fonts could be loaded.
            inactive: function() {console.log('inactive');},

            // FONTLOADING : This event is triggered once for each font that's loaded.
            fontloading: function(familyName, fvd) {
                if(familyName == middleColumnFont) {
                    // middle-column font loaded, display middle column content
                    $('.middle-column').css('visibility', 'initial');
                } else if(familyName == leftColumnFont) {
                    // left and right column font loaded, display left and right columns
                    $('.left-column').css('visibility', 'initial');
                    $('.right-column').css('visibility', 'initial');
                }
            },

            // FONTACTIVE : This event is triggered once for each font that renders.
            fontactive: function(familyName, fvd) {console.log('fontactive');},

            // FONTINACTIVE : This event is triggered if the font can't be loaded.
            fontinactive: function(familyName, fvd) {console.log('fontinactive');}
        };
        WebFont.load(WebFontConfig);
    });
};

Notebook.prototype.init = function() {

    /*
     * generate three column structure
     ***************************************
     */

    $('#content').toggleClass('container');

    // generating container, row, and columns divs
    // to enable bootstrap compatibility
    $('.container').append('<div class="row"></div>')
    
    $('.row').append('<div class="col-md-3 left-column column"></div>');
    $('.row').append('<div class="col-md-7 middle-column column"></div>')
    $('.row').append('<div class="col-md-2 right-column column"></div>');
    $('.left-column').css('position', 'relative');
    $('.right-column').css('position', 'relative');

    // avoid from content to be displayed in normal style 
    // (without three column layout). It looks ugly that way
    $('.left-column').css('visibility', 'hidden');
    $('.middle-column').css('visibility', 'hidden');
    $('.rightColumn').css('visibility', 'hidden');

    $('body').append('<div id="drawing"></div>');

    // move all content to respective columns 
    $('#content').children().each(function() {
        if(! $(this).hasClass('row')) {
            if(! Notebook.prototype.assignColumns($(this))) {
                $(this).find('*').each(function(index, value) {
                    Notebook.prototype.assignColumns($(this));
                });
                $('.middle-column').append($(this).clone().wrap('<div>').parent().html());
                $(this).remove();
            }
        }
    });

    this.positionElements();
    $(window).on('resize', this.positionElements);

    // doing this solves the (first time sidenotes incorrectly displayed) problem
    setTimeout(this.positionElements, 20);

}

Notebook.prototype.animate = function() {
    // animation
    setTimeout(function() {
        // make all paths visible
        $('path').each(function() {
            $(this).css('visibility', 'initial');
        });
        // create new vivus objects for each svg element
        $('#drawing').children().each(function() {
            new Vivus($(this).attr('id'), {
                duration: 100, 
                type: 'delayed', 
                pathTimingFunction: Vivus.EASE_OUT,
                start: 'inViewport'
            });
        });

        animationFlag = false;
    }, 1000);
}

// returns true if the jqueryObject was assigned in a column other than the 
// middle column, else returns false
Notebook.prototype.assignColumns = function(jqueryObject) {
    
    var hasAttribute = function(jqueryObject, attributeName) {
        var attr = $(jqueryObject).attr(attributeName);
        if((typeof attr !== typeof undefined) && (attr != false)) {
            return true;
        } return false;
    };
    
    if(hasAttribute(jqueryObject, 'data-sidenote')) {
        // sidenote
        var htmlToAppend = jqueryObject.clone().wrap('<div>').parent().html();
        var appendedObject = $(htmlToAppend).appendTo($('.left-column'));
        jqueryObject.remove();
        return true;
    } 
    return false;
};

Notebook.prototype.resizeColumns = function() {
    var leftColumn = $('.left-column');
    var rightColumn = $('.right-column');
    if(leftColumn != undefined) {
        $('.left-column').height($('.middle-column').height());
    }
    if(rightColumn != undefined) {
        $('.right-column').height($('.middle-column').height());
    }
};

var leftColumnPositionedElementsArray = [];
var rightColumnPositionedElementsArray = [];
Notebook.prototype.positionElement = function(jqueryObject) {
    var referencePointer = jqueryObject.data()['sidenote'];
    var referencedElement = $('#' + referencePointer);
    if(referencedElement != undefined) {
        jqueryObject.css('position', 'absolute');
        // initialize top same as that of the referenced element
        jqueryObject.offset({
            top: referencedElement.offset().top,
            left: jqueryObject.offset().left
        });

        // create new box instance corresponding this element
        var objectBox = new Box(jqueryObject);

        // position the box
        var position = objectBox.positionBox(leftColumnPositionedElementsArray, rightColumnPositionedElementsArray, referencedElement);
        if(position == 'left') {
            leftColumnPositionedElementsArray.push(objectBox);
            jqueryObject = jqueryObject.appendTo('.left-column');
        } else if(position == 'right') {
            rightColumnPositionedElementsArray.push(objectBox);
            jqueryObject = jqueryObject.appendTo('.right-column');
        } else {
            // pass 
        }
        
        // change the position of this element to match that of 
        // the objectBox
        jqueryObject.offset({
            top: objectBox.top,
            left: objectBox.left + 10   // padding left
        });
        jqueryObject.css('width', '100%');
    } else {
        console.log('undefined referencedElement');
    }
};

var animationFlag = 0;
Notebook.prototype.positionElements = function() {

    Notebook.prototype.resizeColumns();

    // position sidenotes
    leftColumnPositionedElementsArray = [];
    rightColumnPositionedElementsArray = [];

    var elementsArray = []
    $('.left-column').find('*').each(function() {
        // Notebook.prototype.positionElement($(this));
        elementsArray.push($(this));
    });
    $('.right-column').find('*').each(function() {
        // Notebook.prototype.positionElement($(this));
        elementsArray.push($(this));
    });

    console.log(elementsArray);
    if(! firstTimePositionElementsDoneFlag) {
        for (elementIndex in elementsArray) {
            elementsArray[elementIndex].data('data-id', '' + elementIndex);
        }
        firstTimePositionElementsDoneFlag = true;
    } else {
        elementsArray = Notebook.prototype.sortElementsById(elementsArray);
    }

    console.log(elementsArray);

    for(var i=0; i<elementsArray.length; i++) {
        Notebook.prototype.positionElement(elementsArray[i]);
    }

    if(initDoneFlag) {
        Notebook.prototype.draw();
    }
};

Notebook.prototype.sortElementsById = function(elementsArray) {
    // TODO : 
    // implement a better sorting algorithm
    var returnElementsArray = [];
    for(var i=0; i<elementsArray.length; i++) {
        for(var j=0; j<elementsArray.length; j++) {
            if(elementsArray[j].data('data-id') == ('' + i)) {
                returnElementsArray.push(elementsArray[j]);
                // elementsArray.splice(j, 1);
                break;
            }
        }
    } return returnElementsArray;
}

Notebook.prototype.draw = function() {

    // remove previous underlines 
    idCount = 0;
    $('#drawing').children('*').each(function() {
        $(this).remove();
    });

    // generate new underlines

    $('.left-column').find('*').each(function() {
        var referencedElement = $('#' + $(this).data()['sidenote']);
        assert(referencedElement != undefined);
        Notebook.prototype.underline(referencedElement);
    });

    $('.right-column').find('*').each(function() {
        var referencedElement = $('#' + $(this).data()['sidenote']);
        assert(referencedElement != undefined);
        Notebook.prototype.underline(referencedElement);
    });

    try {
        // check if vivus has been loaded
        var temp = Vivus.EASE_OUT;
        if(animationFlag == false) {
            Notebook.prototype.animate();
            animationFlag = true;
        }

    } catch(err) {
        // pass
    }
};

Notebook.prototype.underline = function(jqueryObject) {
    // checkout solution at http://stackoverflow.com/questions/15960653/obtain-a-line-of-a-paragraph-in-html

    var spanify = function(jqueryObject) {
        var textArray = jqueryObject.text().split(' ');
        var newHtml = '';
        $.each(textArray, function(index, value) {
            newHtml += '<span>' + value + ' </span>';
        });
        // removing the last extra whitespace
        newHtml = newHtml.substr(0, newHtml.length - 8) + newHtml.substr(newHtml.length - 7, newHtml.length);
        
        jqueryObject.html(newHtml);
    };

    var originalHtml = jqueryObject.html();
    spanify(jqueryObject);

    var lineArray = [[]];
    var lastBox = new Box();
    $.each(jqueryObject.find('span'), function(index, value) {
        box = new Box($(this));
        if(box.right < lastBox.right) {
            // new line started
            lineArray.push([]);
        }
        lineArray[lineArray.length - 1].push(box);
        lastBox = box;
    });

    // draw actual svg path elements on the screen for all lines
    for(var i=0; i<lineArray.length; i++) {
        var firstBox = lineArray[i][0];
        var lastBox = lineArray[i][lineArray[i].length - 1];
        Notebook.prototype.drawLine(firstBox.left, firstBox.bottom, lastBox.right, lastBox.bottom);
    }

    // convert element to original non spanned version
    jqueryObject.html(originalHtml);
};

var idCount = 0;
Notebook.prototype.drawLine = function(x1, y1, x2, y2) {
    var pathStrokeWidth = 4;
    
    // calculate with, height, top and left of svg element required
    if(x1 < x2) {
        var svgLeft = x1;
        var svgWidth = x2 - x1;
    } else {
        var svgLeft = x2;
        var svgWidth = x1 - x2;
    }

    if(y1 < y2) {
        var svgTop = y1;
        var svgHeight = y2 - y1;
    } else {
        var svgTop = y2;
        var svgHeight = y1 - y2;
    }

    // if height is less than pathStrokeWidth, then set it equal to pathStrokeWidth
    svgHeight = (svgHeight >= pathStrokeWidth) || pathStrokeWidth;

    // create svg
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);
    svg.setAttribute('class', 'underline');
    svg.setAttribute('id', 'underline-id-' + idCount);
    idCount += 1;
    svg.style.top =  svgTop;
    svg.style.left = svgLeft;
    
    // calculate x1, y1, x2, y2 relative to the svg element
    var x1_rel = x1 - svgLeft;
    var x2_rel = x2 - svgLeft;
    var y1_rel = y1 - svgTop;
    var y2_rel = y2 - svgTop;
    var pathPath = 'M ' + x1_rel + ' ' + y1_rel + ' L ' + x2_rel + ' ' + y2_rel;

    // create path
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'red');
    path.setAttribute('stroke-width', pathStrokeWidth + 'px');
    path.setAttribute('fill', 'transparent');
    path.setAttribute('d', pathPath);

    // set visibility to hidden, and make visible only
    // just before starting the animation
    path.setAttribute('style', 'visibility: hidden');
    svg.appendChild(path);

    // append path to svg 
    svg.appendChild(path);

    // add svg to document
    document.getElementById('drawing').appendChild(svg);
};
