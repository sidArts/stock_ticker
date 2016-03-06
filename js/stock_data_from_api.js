(function($) {
    $.fn.jStockTicker = function(options) {
        if (typeof (options) == 'undefined') {
            options = {};
        }
        var settings = $.extend( {}, $.fn.jStockTicker.defaults, options);
        var $ticker = $(this);
        var $wrap = null;
        settings.tickerID = $ticker[0].id;
        $.fn.jStockTicker.settings[settings.tickerID] = {};

        if ($ticker.parent().get(0).className != 'wrap') {
            $wrap = $ticker.wrap("<div class='wrap'></div>");
        }

        var $tickerContainer = null;
        if ($ticker.parent().parent().get(0).className != 'container') {
            $tickerContainer = $ticker.parent().wrap(
                    "<div class='container'></div>");
        }
        
        var node = $ticker[0].firstChild;
        var next;
        while(node) {
            next = node.nextSibling;
            if(node.nodeType == 3) {
                $ticker[0].removeChild(node);
            }
            node = next;
        }
        
        var shiftLeftAt = $ticker.children().get(0).offsetWidth;
        $.fn.jStockTicker.settings[settings.tickerID].shiftLeftAt = shiftLeftAt;
        $.fn.jStockTicker.settings[settings.tickerID].left = 0;
        $.fn.jStockTicker.settings[settings.tickerID].runid = null;
        $ticker.width(2 * screen.availWidth);
        
        function startTicker() {
            stopTicker();
            
            var params = $.fn.jStockTicker.settings[settings.tickerID]; 
            params.left -= settings.speed;
            if(params.left <= params.shiftLeftAt * -1) {
                params.left = 0;
                $ticker.append($ticker.children().get(0));
                params.shiftLeftAt = $ticker.children().get(0).offsetWidth;
            }
            
            $ticker.css('left', params.left + 'px');
            params.runId = setTimeout(arguments.callee, settings.interval);
            
            $.fn.jStockTicker.settings[settings.tickerID] = params;
        }
        
        function stopTicker() {
            var params = $.fn.jStockTicker.settings[settings.tickerID];
            if (params.runId)
                clearTimeout(params.runId);
            
            params.runId = null;
            $.fn.jStockTicker.settings[settings.tickerID] = params;
        }
        
        function updateTicker() {           
            stopTicker();
            startTicker();
        }
        
        $ticker.hover(stopTicker,startTicker);      
        startTicker();
    };

    $.fn.jStockTicker.settings = {};
    $.fn.jStockTicker.defaults = {
        tickerID :null,
        url :null,
        speed :1,
        interval :20
    };
})(jQuery);

$(document).ready(function () {
    var origTitle = document.title;
    var upArrow = '▲';
    var downArrow = '▼';
    setInterval(function () {
        $.getJSON('https://finance.google.com/finance/info?client=ig&q=INDEXBOM%3aSENSEX&callback=?', function (response) {
            var stockInfo = response[0];
            var title = "SENSEX";
            $('#divPrice span').text(stockInfo.l);
            title += " " + stockInfo.l;
            if (stockInfo.c > 0) {
                $('#divChange').html('<span style="color:green"><h3><span class="glyphicon glyphicon-triangle-top"/>' + stockInfo.c.replace('+', ' ') + ' (' + stockInfo.cp + '%)</h3></span>');
                title += " " + upArrow + " +" + stockInfo.cp + "%";
            }
            else if (stockInfo.c < 0) {
                $('#divChange').html('<span style="color:red"><h3><span class="glyphicon glyphicon-triangle-bottom"/>' + stockInfo.c + ' (' + stockInfo.cp + '%)</h3></span>');
                title += " " + downArrow + " " + stockInfo.cp + "%";
            }
            else {
                $('#divChange').html('<span">' + stockInfo.c + ' (' + stockInfo.cp + '%)</span>');
                title += " (" + stockInfo.cp + ")%";
            }
            $('#divTime span').text(stockInfo.lt);
            document.title = title + " - " + origTitle;
        });
    }, 4000);
});