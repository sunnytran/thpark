const handleNotifyGet = (notifications) => (req, res) => {
	let data = [];

	if (notifications.length !== 0){
		data = notifications;
	}

	console.log("NOTIFICATION DATA: " + data);

	res.json(data);
}

module.exports = {
	handleNotifyGet: handleNotifyGet,
}