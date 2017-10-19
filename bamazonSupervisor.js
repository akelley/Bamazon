var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: null,
	database: 'bamazon'
});

connection.connect(function(err){
	if(err) throw err;
	// console.log("\nConnection successful!");
	// console.log("Connected as id: " + connection.threadId);
	start();
});

var start = function(){
	inquirer.prompt({
		name: 'action',
		type: 'rawlist',
		message: 'What would you like to do? ',
		choices: [
			'View Product Sales by Department',
			'Create New Department'
		]
	}).then(function(answer){
			switch(answer.action){		
				case 'View Product Sales by Department':
					viewSales();
					break;
				
				case 'Create New Department':
					create();
					break;
			}
	})
};

var viewSales = function(){
	require('console.table');
	var query = 'SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.overhead_costs) AS "total_profit" FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id';
	connection.query(query, function(err, res){
		if(err) throw err;
		else{
			for(var i = 0; i < res.length; i++){
				if(res[i].product_sales == null){
					res[i].overhead_costs = parseFloat(res[i].overhead_costs).toFixed(2);
					res[i].product_sales = parseFloat(0).toFixed(2);
					res[i].total_profit = parseFloat(res[i].product_sales - res[i].overhead_costs).toFixed(2);
				}
				else{
					res[i].overhead_costs = parseFloat(res[i].overhead_costs).toFixed(2);
					res[i].product_sales = parseFloat(res[i].product_sales).toFixed(2);
					res[i].total_profit = parseFloat(res[i].total_profit).toFixed(2);
				}
			}
			console.log("");
			console.table(res);
		}
	});
	setTimeout(start, 500);

};

var create = function(){
	inquirer.prompt([{
		name: 'name',
		type: 'input',
		message: 'What is the new department\'s name? '
	},{
		name: 'overhead',
		type: 'input',
		message: 'What are the overhead costs of this department? ',
		validate: function(value){
			if(isNaN(value) == false)
				return true;
			else
				return false;
		}
	}]).then(function(answer){
		var query = 'INSERT INTO departments VALUES(NULL, "' + answer.name + '", ' + parseFloat(answer.overhead).toFixed(2) + ')';
		connection.query(query, function(err, res){
			if(err)
				throw err;
			else
				console.log("New department created successfully.\n");
		});
		setTimeout(start, 250);
	});
};
