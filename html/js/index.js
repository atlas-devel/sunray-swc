let jData;
$.getJSON('https://geomag.usgs.gov/ws/data/?id=BOU&format=json', function(data ){
	jsonToSeries(data);
});

function jsonToSeries(data) {
	data = JSON.stringify(data);
	data = JSON.parse(data);
	let timesdata = data.times.filter(x => x != null);
	let valuesdata = data.values[0].values.filter(x => x != null);
	let torem = timesdata.length - valuesdata.length;
	for(let i = 0; i < torem; i++) {
		timesdata.pop();
	}
	let times = [];
	let values = [];
	const re = /(?<=\d\d\d\d-\d\d-\d\dT)\d\d:\d\d:\d\d/g;
	$.each(timesdata, function(key, value) {
		times.push(value.match(re)[0]);
	});
	$.each(valuesdata, function(key, value){
		values.push(value);
	});
	console.log(times);
	console.log(values);
	let aData = [times, values];
	let testarr = [500,200,300]
	JSC.Chart('chartDiv', {
   type: 'line',
   series: [
      {
         name:'Magnetometer',
         points: [times, values]
      }
   ]
});
}
