//JSON DATA
var data = [{
	"id": "12349540323001",
	"ver": 2,
	"created_at": "2020-08-20T20:22:02.000Z",
	"updated_at": "2020-08-20T20:22:02.000Z",
	"Title": "Change lightbulbs",
	"Description": "Several of the lights have broken lightbulbs, please replace as needed.",
	"Due": "2020-12-09T20:22:02.000Z",
	"TimeEstimate": 120,
	"Customer": {
		"id": "174342305672323003",
		"Name": "NASA"
	},
	"Facility": {
		"id": "174342305672323003",
		"Name": "Houston Mission Control",
		"City": "Houston",
		"State": "TX",
		"Zip": 90210,
		"Contact": {
			"id": "17434233372323007",
			"Name": "Werner von Braun",
			"Phone": "555 - 515 - 5282"
		}
	},
	"Room": {
		"id": "174342305674443006",
		"Name": "Conference - room Apollo"
	}
}, {
	"id": "174342309540323001",
	"ver": 2,
	"created_at": "2020-08-20T20:22:02.000Z",
	"updated_at": "2020-08-20T20:22:02.000Z",
	"Title": "Change Switches",
	"Description": "Fix new Switches",
	"Due": "2020-12-09T20:24:02.000Z",
	"TimeEstimate": 60,
	"Customer": {
		"id": "174342305672323003",
		"Name": "Appivo"
	},
	"Facility": {
		"id": "174342305672323003",
		"Name": "Andheri Plaza",
		"City": "Andheri",
		"State": "MH",
		"Zip": 90210,
		"Contact": {
			"id": "17434233372323007",
			"Name": "Jamie",
			"Phone": "555 - 515 - 5282"
		}
	},
	"Room": {
		"id": "174342305674443006",
		"Name": "Hall Room"
	}
}, {
	"id": "174342309540323001",
	"ver": 2,
	"created_at": "2020-08-20T20:22:02.000Z",
	"updated_at": "2020-08-20T20:22:02.000Z",
	"Title": "Drawer Request",
	"Description": "please replace drawer.",
	"Due": "2020-11-29T20:22:02.000Z",
	"TimeEstimate": 45,
	"Customer": {
		"id": "174342305672323003",
		"Name": "Capgemini"
	},
	"Facility": {
		"id": "174342305672323003",
		"Name": "Capgemini Mumbai",
		"City": "Mumbai",
		"State": "MH",
		"Zip": 90210,
		"Contact": {
			"id": "17434233372323007",
			"Name": "Nisha",
			"Phone": "555 - 515 - 5282"
		}
	},
	"Room": {
		"id": "174342305674443006",
		"Name": "Podium"
	}
}]

//Main Function
function mainFunction() {
	var mainContainer = document.getElementById("displayData");
	mainContainer.innerHTML = "";
	var searchvalue = input.value;
	var result = search(searchvalue);
	for (var i = 0; i < result.length; i++) {
		let dueDate = dueDate_convert(result[i].Due)
		let estimatedTime = time_convert(result[i].TimeEstimate)
		var div = document.createElement("div");
		div.innerHTML = 'Title: ' + result[i].Title + ' <br> Description: ' + result[i].Description + ' <br> Due Date: ' + dueDate + ' <br> Total Time Required: ' + estimatedTime + '<br><br>';
		mainContainer.appendChild(div);
	}
}
//search functionality
function search(keyword) {
	var search_fields = ['Description'] //key fields to search for in dataset
	if (keyword.length < 1) // skip if input is empty
		return
	var results = []
	for (var i in data) { // iterate through dataset
		var dueDate = new Date(data[i].Due);
		for (var u = 0; u < search_fields.length; u++) { // iterate through each key in dataset
			var rel = getRelevance(data[i][search_fields[u]], keyword) // check if there are matches
			if (rel == 0) // no matches...
				continue // ...skip
			results.push({ sortOrder: dueDate, entry: data[i] }) // matches found, add to results and store dueDate

		}
	}
	results.sort(sortDueDate) // sort by dueDate
	for (i = 0; i < results.length; i++) {
		results[i] = results[i].entry // remove relevance since it is no longer needed
	}
	return results
}

function getRelevance(value, keyword) {
	value = value.toLowerCase() // lowercase to make search not case sensitive
	keyword = keyword.toLowerCase()

	var index = value.indexOf(keyword) // index of the keyword
	var word_index = value.indexOf(' ' + keyword) // index of the keyword if it is not on the first index, but a word

	if (index == 0) // value starts with keyword
		return 3 // highest relevance
	else if (word_index != -1) // value doesnt start with keyword, but has the same word somewhere else 
		return 2 // medium relevance
	else if (index != -1) // value contains keyword somewhere 
		return 1 // low relevance
	else
		return 0 // no matches, no relevance
}

// To iterate over Date in Ascending order
function sortDueDate(a, b) {
	return a.sortOrder - b.sortOrder
}

// To display Estimated Time
function time_convert(num) {
	var hours = Math.floor(num / 60);
	var minutes = num % 60;
	if (hours == 1) {
		return hours + " hour " + minutes + " minutes";
	}
	else if (hours < 1) {
		return minutes + " minutes";
	}
	else {
		return hours + " hours " + minutes + " minutes";
	}
}

// To display Due Date
function dueDate_convert(dueDate) {
	var dueDate = new Date(dueDate).toUTCString();
	dueDate = dueDate.split(' ').slice(1, 5).join(' ');
	return dueDate
}

function clearAll() {
	document.getElementById("displayData").innerHTML = "";
	document.getElementById("mySearch").value=null;
}

var input = document.getElementById("mySearch");
input.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("searchBtn").click();
	}
});