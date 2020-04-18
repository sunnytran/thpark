var old_notifications = "";

const handleNotifyGet = (notifications) => async (req, res) => {
	let data = [];

	if (notifications.length > 0 && await JSON.stringify(notifications) !== old_notifications){
		data = notifications;
	}

	old_notifications = JSON.stringify(notifications);

	console.log("NOTIFICATION DATA: " + data);

	await res.json(data);
}

module.exports = {
	handleNotifyGet: handleNotifyGet,
}