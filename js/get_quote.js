$("#getQuote").click(function(){
	setInterval(ticker, 1000);	
});

var ticker = function(){
	var symbol = $("#txtStock").val();
	symbol = symbol.toUpperCase();
	$.ajax({
		url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22"+ symbol +"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
		dataType: "json",
		method: "GET"
	}).success(function(data, status){
		console.log(data);
		var stock = data.query.results.quote;
		console.log(stock);
		var str = "";
		str += '<div class="panel" style="font-weight:bold;">Name '+' : <span class="label label-primary">'+stock.Name+ '</span></div>';
		if (stock.Change[0] == '+') {
			str += '<div class="panel">Change '+' : <span class="label label-success">'+stock.Change+ '</span></div>';
		}
		if (stock.Change[0] == '-') {
			str += '<div class="panel">Change '+' : <span class="label label-danger">'+stock.Change+ '</span></div>';
		}
		str += '<div class="panel">Days Low '+' : <span class="label label-info">'+stock.DaysLow+ '</span></div>'+
			  '<div class="panel">Days High '+' : <span class="label label-info">'+stock.DaysHigh+ '</span></div>'+
			  '<div class="panel">Average Daily Volume '+' : <span class="label label-info">'+stock.AverageDailyVolume+ '</span></div>';
		
		$("#stockDetails").empty();
		$("#stockDetails").append(str);
	});
};