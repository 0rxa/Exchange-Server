<?php
	if (isset($_GET["w1"]) && isset($_GET["w2"]) && isset($_GET["w3"]))
	{
		$ix   = $_GET["w1"];
		$sval = $_GET["w2"];
		$bval = $_GET["w3"];
	}

	else
	{
		die("Not all values given");
	}

	$server 	= 'localhost';
	$user		= 'user';
	$password 	= 'password!';
	$db 		= 'database';

	$conn = mysqli_connect($server, $user, $password, $db);

	if(!$conn)
	{
		die("Error: ".mysqli_connect_error());
	}

	$sql = "UPDATE val0 set sell = '".$sval."' where ix = ".$ix;
	if(mysqli_query($conn, $sql))
	{
		echo "Record updated";
	}
	else
	{
		echo "Error: ".mysqli_error($conn);
	}

	$sql = "UPDATE val0 set buy = '".$bval."' where ix = ".$ix;
	if(mysqli_query($conn, $sql))
	{
		echo "Record updated";
	}
	else
	{
		echo "Error: ".mysqli_error($conn);
	}

	header( "Location: ../admin.php", true, 301 );
	mysqli_close($conn);
?>
