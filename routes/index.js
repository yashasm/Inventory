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

module.exports = router;