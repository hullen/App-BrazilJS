isAndroid = if (Ti.Platform.osname == "android") then true else false

exports.contact = (email, barColor) ->
	
	emailDialog = Ti.UI.createEmailDialog
		barColor: barColor
		subject: "#{L('contact')} - BrazilJS"
		toRecipients: ["'BrazilJS' <#{email}>"]

	emailDialog.open()


exports.makeRoute = (latitude, longitude) ->

	# Configure Geolocation
	Ti.Geolocation.purpose = " "
	Ti.Geolocation.distanceFilter = 100
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS

	Ti.Geolocation.getCurrentPosition (e) ->

		if !e.error

			routeSchema = "http://maps.google.com/maps?z=0.005&daddr=#{latitude},#{longitude}&saddr=#{e.coords.latitude},#{e.coords.longitude}"

			if isAndroid or Ti.Platform.canOpenURL routeSchema
				Ti.Platform.openURL routeSchema