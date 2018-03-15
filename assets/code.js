// Initialize Firebase

var config = {
  apiKey: "AIzaSyDkjUaF_l5S0BYbkU450LNqqvBaO0I306o",
  authDomain: "trainsom-876d5.firebaseapp.com",
  databaseURL: "https://trainsom-876d5.firebaseio.com",
  projectId: "trainsom-876d5",
  storageBucket: "",
  messagingSenderId: "752148209263"
};

firebase.initializeApp(config);

// Create a variable to reference the database
db = firebase.database();
var trainName = "";
var dest = "";
var trainTime = "";
var trainFrq = "";

console.log(moment().format("DD/MM/YY hh:mm A"));
$("#add-train").on("click", function(event) {
  trainTime= $("#first-input").val().trim();
   var convertime = moment(trainTime, "HH:mm")
   trainFrq =$("#freq-input").val().trim()
   var convertimeFq = moment(trainFrq, "HH:mm")
   alert(convertime)
  event.preventDefault();

  trainName= $("#name-input").val().trim(),
  dest= $("#dest-input").val().trim(),
 // trainTime= $("#first-input").val().trim(),
 // trainFrq= $("#freq-input").val().trim(),
 
  dateAdded= firebase.database.ServerValue.TIMESTAMP,
  
 db.ref().push({

      trainName: trainName,
      dest:dest,
      trainTime: trainTime,
      trainFrq:trainFrq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
      
    });
});
 





db.ref().on("child_added", function(childSnapshot) {
    // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(childSnapshot.val().trainTime, "HH:mm").subtract(1, "years");
 //Current Time
 var currentTime = moment();
 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 // Time apart (remainder)
 var tRemainder = diffTime % childSnapshot.val().trainFrq;
 // Minute Until Train
 var tMinutesTillTrain = childSnapshot.val().trainFrq - tRemainder;
 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var newRow = $("<tr>")
    newRow.attr("class", "#name-display");
    newRow.append("<td> " + childSnapshot.val().trainName +"</td>")
    newRow.append("<td> " + childSnapshot.val().dest +"</td>")
    newRow.append("<td> " + childSnapshot.val().trainTime +"</td>")
    newRow.append("<td> " + childSnapshot.val().trainFrq+ " min"+"</td>")
    newRow.append("<td> " + tMinutesTillTrain+" min"+"</td>")
    newRow.append("<td> " + moment(nextTrain).format("hh:mm")+"</td>")
  $(".some").append(newRow);
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});