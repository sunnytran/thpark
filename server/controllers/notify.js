const handleNotifyGet = (notifications) => (req, res) => {
	let data = [];


	if (notifications.length !== 0){
		data = notifications;
	}

	notifications = [];

	res.json(data);
}

module.exports = {
	handleNotifyGet: handleNotifyGet,
}