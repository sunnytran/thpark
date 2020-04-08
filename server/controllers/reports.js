const handleReportsGet = (db) => (req, res) => {
	const values = {report: req.body.report, days: req.body.days};
	if (req.body.report === "visitors"){
		db.query('select CURRENT_DATE - ${days} + d AS date, count(s.timestamp::date = CURRENT_DATE-${days}+d AND sale_type=\'ticket\') as visitor_count FROM generate_series(1, ${days}) d LEFT JOIN sale s ON s.timestamp::date = CURRENT_DATE - ${days} + d AND sale_type=\'ticket\' GROUP by d ORDER by d', values)
		.then(function(data) {
			var sum = 0;

			for (var key in data){
				//console.log(key);
				sum = sum + parseInt(data[key].visitor_count);
			}
			//console.log(sum);

			var average = {"average" : sum / req.body.days};
			//console.log(average);

			var pack = [];
			pack.push(data);
			pack.push(average);
			res.json(pack);
			console.log(data);
		})	
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('');
		})
	}
	else {
		res.status(400).json("Invalid report: " + req.body.report);
	}
}

module.exports = {
	handleReportsGet: handleReportsGet
}