var express = require('express');
var router = express();
var mysqlPool = require("./mysql").pool;

router.get('/', function(req, res, next) {
	console.log("Going through router");
	res.render('index', {
		title : 'Express'
	});
});

router.get('/getAllChassisMaster', function(req, res, next) {
	console.log("Going through router");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlChassisMaster = "SELECT * FROM chassis_master";

		connection.query(sqlChassisMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});

router.get('/getUniqueChassisMaster', function(req, res, next) {
	console.log("Going through router");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlChassisMaster = "select * from inventory.chassis_master as A where run_id = (select max(run_id) from inventory.chassis_master as B where A.chassis_id = B.chassis_id)";

		connection.query(sqlChassisMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});


router.get('/getAllDrivesMaster', function(req, res, next) {
	console.log("Going through getAllDrivesMaster");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlDrivesMaster = "SELECT * FROM drive_master";

		connection.query(sqlDrivesMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});

router.get('/getAllUniqueDrivesMaster', function(req, res, next) {
	console.log("Going through getAllUniqueDrivesMaster");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlDrivesMaster = "select * from inventory.drive_master as A where run_id = (select max(run_id) from inventory.drive_master as B where A.drive_fru = B.drive_fru)";

		connection.query(sqlDrivesMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});

router.get('/getAllControllerMaster', function(req, res, next) {
	console.log("Going through getAllControllerMaster");



	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlControllerMaster = "SELECT * FROM controller_master";

		connection.query(sqlControllerMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});

router.get('/getUniqueControllerMaster', function(req, res, next) {
	console.log("Going through getUniqueControllerMaster");



	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}
		
		var sqlControllerMaster = "select * from inventory.controller_master as A where run_id = (select max(run_id) from inventory.controller_master as B where A.serial = B.serial)";

		connection.query(sqlControllerMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});


router.get('/getAllManagementMaster', function(req, res, next) {
	console.log("Going through getAllManagementMaster");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlManagementMaster = "SELECT * FROM management_master";

		connection.query(sqlManagementMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});

router.get('/getUniqueManagementMaster', function(req, res, next) {
	console.log("Going through getAllManagementMaster");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlManagementMaster = "select * from inventory.management_master as A where run_id = (select max(run_id) from inventory.management_master as B where A.serial = B.serial)";

		connection.query(sqlManagementMaster, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});

});


router.get('/getAllRegisteredChassis', function(req, res, next) {
	console.log("Going through getAllRegisteredChassis");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlAvailableChassis = "SELECT * FROM chassis_available";

		connection.query(sqlAvailableChassis, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			connection.release();
			
			res.status(200).send({
				"result" : masterResultOutput
			});
			return;
		});
	});
});	



router.post('/addNewChassis', function(req, res, next) {
	console.log("Going through addNewChassis");

	console.log(req.body);
	
	
	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlAvailableChassis = "SELECT count(1) FROM chassis_available where chassis_ip = '"+req.body.ip+"'";
		console.log(sqlAvailableChassis);
		connection.query(sqlAvailableChassis, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}
			
			
			
			var masterResultsJson = JSON.stringify(masterResult);
			var masterResultOutput = JSON.parse(masterResultsJson);
			//connection.release();
			
			console.log(masterResultOutput[0]['count(1)']);
			
			
			if(masterResultOutput[0]['count(1)'] == "0"){
				var sqlInsertChassis = "INSERT INTO chassis_available VALUES ('"+req.body.ip+"','"+req.body.user+"','"+req.body.password+"','1')";
				console.log(sqlInsertChassis);
				
				connection.query(sqlInsertChassis, function(err, masterResult) {

					if (err) {
						console.log("failed to connection in error");
						console.log(err);
						connection.release();
						res.status(200).send({
							"result" : "failed"
						});
						return;
					}

					
					var sqlAvailableChassis = "SELECT * FROM chassis_available";

					connection.query(sqlAvailableChassis, function(err, masterResult) {

						if (err) {
							console.log("failed to connection in error");
							console.log(err);
							connection.release();
							res.status(200).send({
								"result" : "failed query"
							});
							return;
						}

						var masterResultsJson = JSON.stringify(masterResult);
						var masterResultOutput = JSON.parse(masterResultsJson);
						connection.release();
						
						res.status(200).send({
							"result" : masterResultOutput
						});
						return;
					});
					
				});
				
			}
			else{
				console.log("Record exist");
				connection.release();
				res.status(400).send({
					"result" : {"status":"Failed"}
				});
				return;
				
			}
			
			
		});
	});
});	


router.post('/deleteChassis', function(req, res, next) {
	console.log("Going through deleteChassis");

	// res.render('index', { title: 'Express' });

	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log("failed to connection in error");
			console.log(err);

			res.status(200).send({
				"result" : "failed"
			});
			return;
		}

		var sqlDeleteChassis = "DELETE FROM chassis_available where chassis_ip = '"+req.body.ip+"'";
		console.log(sqlDeleteChassis);
		connection.query(sqlDeleteChassis, function(err, masterResult) {

			if (err) {
				console.log("failed to connection in error");
				console.log(err);

				res.status(200).send({
					"result" : "failed query"
				});
				return;
			}

			var sqlAvailableChassis = "SELECT * FROM chassis_available";

			connection.query(sqlAvailableChassis, function(err, masterResult) {

				if (err) {
					console.log("failed to connection in error");
					console.log(err);
					connection.release();
					res.status(200).send({
						"result" : "failed query"
					});
					return;
				}

				var masterResultsJson = JSON.stringify(masterResult);
				var masterResultOutput = JSON.parse(masterResultsJson);
				connection.release();
				
				res.status(200).send({
					"result" : masterResultOutput
				});
				return;
			});
		});
	});
});	

module.exports = router;