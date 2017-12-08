const config = {
	apiKey: "AIzaSyCfivrT8Szj8aWN0cQFYNwJFDfWOKm03VM",
	authDomain: "vm-rock-paper-scissors.firebaseapp.com",
	databaseURL: "https://vm-rock-paper-scissors.firebaseio.com",
	projectId: "vm-rock-paper-scissors",
	storageBucket: "vm-rock-paper-scissors.appspot.com",
	messagingSenderId: "248657926915"
};

firebase.initializeApp(config);

// Variables
// ================================================================================

// Get a reference to the database service
const database = firebase.database();

const empRef = firebase.database().ref('employees');

function addRow(empRow, value) {
	let nameCol = $('<td>');
	nameCol.text(value);
	empRow.append(nameCol);
}

function clearForm() {
	$('#addEmployeeForm')[0].reset();
}

empRef.orderByChild('name').on('child_added', function(data) {
	const employee = data.val();
	if(employee) {
		let empRow = $('<tr>');
		addRow(empRow, employee.name);
		addRow(empRow, employee.role);
		addRow(empRow, employee.startDate);

		const numMonths = moment().diff(employee.startDate, 'months');

		addRow(empRow, numMonths);
		addRow(empRow, employee.monthlyRate);
		addRow(empRow, numMonths * employee.monthlyRate);
		$('#listOfEmployees').append(empRow);
	}
});

$('#addEmployee').click(function(event) {
	const name = $('#empName').val().trim();
	const role = $('#empRole').val().trim();
	const startDate = moment($('#empStartDate').val().trim()).format("MM/DD/YYYY");
	const monthlyRate = $('#empMonthlyRate').val().trim();
	if(name && role && startDate && monthlyRate) {
		event.preventDefault();
		empRef.push({name, role, startDate, monthlyRate});
		clearForm();
	}
});


$("#clearForm").click(function(event){
	event.preventDefault();
	clearForm();
});