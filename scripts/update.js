function updateValue(a)
{
	bval = document.getElementsByClassName("buy")[a-1].value;
	sval = document.getElementsByClassName("sell")[a-1].value;

	window.location.href = "scripts/update.php?w1=" + a + "&w2=" + sval + "&w3=" + bval;
}
