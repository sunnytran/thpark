const handleReportsPost = (db) => async (req, res) => {
	if (req.body.report === "visitors"){
		const values = {report: req.body.report, days: req.body.days};
		let data = await db.query('select CURRENT_DATE - ${days} + d AS date, count(s.timestamp::date = CURRENT_DATE-${days}+d AND sale_type=\'ticket\') as visitor_count FROM generate_series(1, ${days}) d LEFT JOIN sale s ON s.timestamp::date = CURRENT_DATE - ${days} + d AND sale_type=\'ticket\' GROUP by d ORDER by d', values);
		//const average = await db.one('SELECT CAST (COUNT(*) AS FLOAT) / $(days) as average FROM sale WHERE sale_type=\'ticket\' AND timestamp::date >= CURRENT_DATE-${days}', values);
		const measures = await db.query('select AVG(r.visitor_count) as average, min(r.visitor_count), max(r.visitor_count), median(r.visitor_count), mode() WITHIN GROUP (ORDER BY r.visitor_count), stddev(r.visitor_count) from (select CURRENT_DATE - ${days} + d AS date, count(s.timestamp::date = CURRENT_DATE-${days}+d AND sale_type=\'ticket\') as visitor_count FROM generate_series(1, ${days}) d LEFT JOIN sale s ON s.timestamp::date = CURRENT_DATE - ${days} + d AND sale_type=\'ticket\' GROUP by d ORDER by d) as r', values);
		data.push(measures);
		res.json(data);

		/*db.query('select CURRENT_DATE - ${days} + d AS date, count(s.timestamp::date = CURRENT_DATE-${days}+d AND sale_type=\'ticket\') as visitor_count FROM generate_series(1, ${days}) d LEFT JOIN sale s ON s.timestamp::date = CURRENT_DATE - ${days} + d AND sale_type=\'ticket\' GROUP by d ORDER by d', values)
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
			res.status(400).json('Error');
		})*/

	}
	else if (req.body.report === "rides_on"){
		const start = new Date(req.body.start+"Z");
		const end = new Date(req.body.end+"Z");
		const values = {report: req.body.report, start: req.body.start, end: req.body.end};
		console.log(values.start);
		db.query('select rides_on.ride_name, count(*) as ride_count from rides_on where timestamp::date >= ${start} and timestamp::date < ${end} GROUP BY rides_on.ride_name;', values)
		.then(function(data) {
			res.json(data);
			console.log(data);
		})	
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('Error');
		})
	}
	else if (req.body.report === "ride_issue"){
		const start = new Date(req.body.start+"Z");
		const end = new Date(req.body.end+"Z");
		const values = {report: req.body.report, start: req.body.start, end: req.body.end};
		console.log(values.start);
		db.query('select ride_issue.ride_name, count(*) as ride_issues from ride_issue where start_timestamp::date >= ${start} and start_timestamp::date < ${end} GROUP BY ride_issue.ride_name;', values)
		.then(function(data) {
			res.json(data);
			console.log(data);
		})	
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('Error');
		})
	}
	//Not a really complete Report
	else if (req.body.report === "rainouts"){
		const values = {report: req.body.report, months: req.body.months};
		let data = [];
		let counts = [];

		for (let i = 1; i <= values.months; i++){
			const m = {month: values.months-i}
			let d = await db.query('select ${month} as months_ago, count(*) from rainouts where date >= date_trunc(\'month\', CURRENT_DATE - interval \'${month} month\') AND date < date_trunc(\'month\', CURRENT_DATE - interval \'${month} month\') + interval \'1 month\' order by months_ago', m);
			await counts.push(d[0]);
		}
		await data.push({counts:counts});

		const ago = {ago: values.months-1};

		let total = await db.one('select count(*) as total from rainouts where date >= date_trunc(\'month\', CURRENT_DATE - interval \'${ago} month\') AND date < date_trunc(\'month\', CURRENT_DATE ) + interval \'1 month\'', ago);
		await data.push(total);

		res.json(data);
		/*const values = {report: req.body.report, start: req.body.start, end: req.body.end};
		console.log(values.start);
		db.query('select count(*) from rainouts where date >= ${start} AND date <= ${end}', values)
		.then(function(data) {
			res.json(data);
			console.log(data);
		})	
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('Error');
		})
	}
	else {
		res.status(400).json("Invalid report: " + req.body.report);
	}*/
	}
}

module.exports = {
	handleReportsPost: handleReportsPost
}