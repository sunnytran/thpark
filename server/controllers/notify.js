const handleNotifyGet = (notifications) => async (req, res) => {
	let data = [];

	if (notifications.length !== 0){
		data = notifications;
	}

	console.log("NOTIFICATION DATA: " + data);

	await res.json(data);

	notifications = [];
}

module.exports = {
	handleNotifyGet: handleNotifyGet,
}