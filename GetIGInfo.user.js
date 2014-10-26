// ==UserScript==
// @name       GetIGInfo
// @namespace  gyan
// @version    0.1
// @description  Extract all image urls from a user's Instagram profile.
// @match      http://*.instagram.com/*
// @copyright  2014++ 
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var scrollDelay;
var result=" ";

function OpenNewWin()
{
    alert("A new window will be opened. Right click and save as \"info.txt\"!");
 	myWindow = window.open("data:text/plain;charset=utf-8," + result,
                       "_blank", "width=200,height=100");
	myWindow.focus();
}

function GenerateOutput()
{
  $('body').append('<input type="button" value="Retrieve Output!" id="CP1">');
  $("#CP1").css("position", "fixed").css("top", 400).css("right", 0).css("background-color","yellow").css("font-size","200%");
  $('#CP1').click(function()
  { 
		alert("Reclick \"Retrieve Output\" if nothing happens!");

   		photofeed=document.getElementsByClassName("photo-feed")[0].getElementsByTagName("a");
        var i=1;
        var max_len=photofeed.length;
        console.log(max_len);
        while(i<max_len)
        {
            var urlstr=photofeed[i].getElementsByClassName("tThumbImage Image iLoaded iWithTransition")[0].getAttribute("src"); 
            result+= urlstr+ " ";
      		i+=2;
            //console.log(i);
        }

        OpenNewWin();
   });
}

function ClickLoadMore()
{
    obj=document.querySelectorAll("[class=more-photos-enabled]");

	if(obj.length>0)
    {
       obj[0].click();
	}
	else
	{
    	clearInterval(scrollDelay);
 		window.scrollTo(0, document.body.scrollHeight);
        alert("Ready to retrieve output");
        GenerateOutput();
	}
}

$(document).ready(function()
{
  $('body').append('<input type="button" value="Start the Process!" id="CP">');
  $("#CP").css("position", "fixed").css("top", 100).css("right", 0).css("background-color","yellow").css("font-size","200%");
  $('#CP').click(function()
  { 
	alert("Process initialized.. Please don't refresh or click on anything!!");
    scrollDelay=setInterval(function(){ClickLoadMore();},4000); // Click load more every 4 seconds
   });
});