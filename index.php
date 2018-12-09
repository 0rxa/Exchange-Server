<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Exchange</title>
		<link href="styles/main.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Eczar" rel="stylesheet" type="text/css">
	</head>

	<body>
		<br>
		<table align="center">
			<tr>
				<th class="header">Currency</th>
				<th class="header">Buy</th>
				<th class="header">Sell</th>
			</tr>

			<?php
				$conn = new mysqli("localhost", "zero", "GNUslashrei1337!", "val");
				if($conn->connect_error)
				{
					die("Connection failed: ".$conn->connect_error);
				}

				$sql = "SELECT name, sell, buy from val";
				$result = $conn->query("SELECT name, sell, buy from val0");

				if( $result->num_rows > 0 )
				{
					while( $row = $result->fetch_assoc() )
					{
						echo "<tr>";
							echo "<td><img src=\"./images/".$row["name"].".png\">".$row["name"]."</td>";
	
							echo "<td>";
								echo "<div class=\"buy\">";
									echo $row["buy"];
								echo "</div>";
							echo "</td>";
		
							echo "<td>";
								echo "<div class=\"sell\">";
									echo $row["sell"];
								echo "</div>";
							echo "</td>";
	
						echo "</tr>";
					}
				}
			?>
			<script type="text/javascript" src="scripts/main.js"></script>
		</table>
	</body>
</html>
