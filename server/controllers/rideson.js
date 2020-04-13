const handleRidesOnGet = (db) => (req, res) => {
	db.query('SELECT * FROM rides_on')
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Error');
	})
}

//Create
const handleRidesOnPost = (db) => (req, res) => {
	const values = {ride_name: req.body.ride_name, customer_id: req.body.customer_id};
	let sco;

	db.connect()
	.then(obj => {
		sco = obj;
		sco.client.on('notification', data => {
            console.log('Received:', data);
            // data.payload = 'my payload string'
        });
        //return sco.none('LISTEN $1~', 'event');
	})
	.catch(error => {
        console.log('Error:', error);
    })
    .finally(() => {
        if (sco) {
            sco.done(); // releasing the connection back to the pool
        }
    });

	db.none('INSERT INTO rides_on (ride_name, customer_id, timestamp) VALUES (${ride_name}, ${customer_id}, (SELECT NOW()))', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	});
}

const handleRidesOnDelete = (db) => (req, res) => {
	const values = {ride_name: req.body.ride_name, customer_id: req.body.customer_id, timestamp: req.body.timestamp};
	db.none('DELETE FROM rides_on WHERE ride_name=${ride_name} AND customer_id = ${customer_id} AND timestamp = ${timestamp}', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

module.exports = {
	handleRidesOnGet: handleRidesOnGet,
	handleRidesOnPost: handleRidesOnPost,
	handleRidesOnDelete: handleRidesOnDelete
}