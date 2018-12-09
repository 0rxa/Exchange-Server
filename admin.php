<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Exchange</title>
		<link href="styles/admin.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Eczar" rel="stylesheet" type="text/css">
	</head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

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
					echo "<form action=\"./scripts/updateAll.php\" method=\"POST\">";
					$c=1;
					while( $row = $result->fetch_assoc() )
					{
						echo "<tr>";
							echo "<td><img src=\"./images/".$row["name"].".png\" onclick=\"updateValue($c)\">".$row["name"]."</td>";
	
							echo "<td>";
								echo "<input name=\"bval[$c]\" class=\"buy\" type=text value=\"".$row['buy']."\">";
							echo "</td>";
		
							echo "<td>";
								echo "<input name=\"sval[$c]\" class=\"sell\" type=text value=\"".$row['sell']."\">";
							echo "</td>";
	
						echo "</tr>";
						$c++;
					}
				}
			?>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<script type="text/javascript" src="scripts/main.js"></script>
			<script type="text/javascript" src="scripts/update.js"></script>
		</table>
		<br>
		<button onclick="window.location.href='./index.php'">HOME</button>
		<input type="submit" value="Update All">
		</form>
	</body>
</html>
