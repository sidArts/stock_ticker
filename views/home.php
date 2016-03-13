<div class="container">
    <div style="height: 70px;"></div>        
    <div id="StockTickerContainer" style="height: 32px; line-height: 32px; overflow: hidden;">
        <div id='dvStockTicker' class='stockTicker'></div>
    </div>

    <script type="text/javascript">
    $(window).load(function () {
        StockPriceTicker();
        setInterval(function() {StockPriceTicker();} , 60000);
    });
            
    </script>
    <script type="text/javascript" src="js/stock_price_ticker.js"></script>
    <script type="text/javascript" src="js/stock_data_from_api.js"></script>
    <script type="text/javascript" src=""></script>
    <div style="height: 20px;"></div>        
    <div class="row">
        <div class="col-md-3">
            <input type="text" id="txtStock" class="form-control" placeholder="Search Stocks">
        </div>
        <div class="col-md-2">
            <button class="btn btn-default" id="getQuote" type="button">Quote</button>
        </div>
    </div>
    <div class="row" style="padding-top: 25px;">
        <div class="col-md-4">
            <div id="stockDetails"></div>
        </div>    
    </div>
</div>