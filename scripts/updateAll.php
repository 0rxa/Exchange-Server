<?php
	$bval = $_POST['bval'];
	$sval = $_POST['sval'];

	echo "Bval	Sval<br>";
	for( $c = 1; $c < 11; $c++ )
	{
		echo $bval[$c];
		echo "	";
		echo $sval[$c];
		echo "<br>";
	}
	
        $server 	= 'localhost';
        $user		= 'zero';
        $password 	= 'GNUslashrei1337!';
        $db 		= 'val';
  
        $conn = mysqli_connect($server, $user, $password, $db);
  
        if(!$conn)
        {
        	die("Error: ".mysqli_connect_error());
        }
  
	for( $c = 1; $c < 11; $c++ )
	{
	        $sql = "UPDATE val0 set sell = ".$sval[$c]." where ix = ".$c;
	        if(mysqli_query($conn, $sql))
	        {
	        	echo "Record updated";
	        }
	        else
	        {
	        	echo "Error: ".mysqli_error($conn);
	        }
	  
	        $sql = "UPDATE val0 set buy = ".$bval[$c]." where ix = ".$c;
	        if(mysqli_query($conn, $sql))
	        {
	        	echo "Record updated";
	        }
	        else
	        {
	        	echo "Error: ".mysqli_error($conn);
	        }
	}
  
        mysqli_close($conn);
        header( "Location: ../admin.php", true, 301 );
?>
