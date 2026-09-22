const dateFormattedET = function(format = 0){
	let timeNow = new Date();
	const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	const monthNamesFolkET = ['näärikuu', 'küünlakuu', 'paastukuu', 'jürikuu', 'lehekuu', 'jaanikuu', 'heinakuu', 'lõikuskuu', 'mihklikuu', 'viinakuu', 'talvekuu', 'jõulukuu'];
	
	let monthName = monthNamesET[timeNow.getMonth()];
	if(format === 1){
		monthName = monthNamesFolkET[timeNow.getMonth()];
	}
	
	return timeNow.getDate() + '. ' + monthName + ' ' + timeNow.getFullYear();
}

const dayFormattedET = function(){
	const dayNamesET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
	let timeNow = new Date();
	return dayNamesET[timeNow.getDay()];
}

const addLeadZero = function(numValue){
	if(numValue < 10){
		numValue = '0' + numValue;
	}
	return numValue;
};

const timeFormattedET = function(){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	let timeFormatted = hourNow + ':' + addLeadZero(minuteNow) + ':' + addLeadZero(secondNow);
	return timeFormatted;
}

//ekspordin kõik vajalikud funktsioonid koos mugavamate nimedega
module.exports = {date: dateFormattedET, time: timeFormattedET, day: dayFormattedET};
console.log('Täna on ' + dayFormattedET() + ' ' + dateFormattedET(1) + '.' + ' Kell on ' + timeFormattedET() + '.');