l=document.getElementsByTagName("td").length;
lr=false;
for( c = 3; c < l; c++ )
{
	bcgr="";
	if(!lr)
	{
		bcgr="#ffffff";
	}
	
	if( (c+1)%3 === 0 )
	{
		lr=!lr;
	}

	document.getElementsByTagName("td")[c].style.background = bcgr;
}

l=document.getElementsByTagName("input").length;
lr=false
for( c = 0; c < l; c++ )
{
	bcgr="";
	if(lr)
	{
		bcgr="#ffffff";
	}
	
	if( (c+1)%2 === 0 )
	{
		lr=!lr;
	}

	document.getElementsByTagName("input")[c].style.background = bcgr;
}
