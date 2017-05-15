var clicks = 0;
var input;
var titles;
var dataArray;

$(document).ready(function(){
$("#search-button").click(function(){
	$("#search").fadeIn(2000).css("display", "inline");
	input = $("#search").val();
	titles = "titles=" + input;
		if (input.length > 0 && input != " ") {
			$("nav").fadeIn(3000, function(){ // here i prefer .animate over .css due animate giving animations while .css just snaps it in place
				$("nav button").animate({width:"60px", height:"20px"})
				$("nav input").animate({width:"200px", height:"20px"}, function(){ // i nest the next animation inside this function so it executes in order instead of all at the same time
					$("nav > *").animate({marginTop: "20px"})
					$("nav").css("position" , "absolute").css("border-top","none")
						.animate({
							height: "52px",
							margin: "auto",
							textAlign: "center",
							width: "100%",
							borderBottom: "3px solid #800020",
							backgroundColor: "7D5D4E"
						})
					})
				$("header > h1").css("display", "none")
				$("<h1>wv</h1>").appendTo("nav") // fix thi button so that the logo apears delayed and not instant
			})// end of fadeIn
			$("#container").empty(); // FIX so that the old screen clears when you make a new search query
			$.ajax({
				url: "https://en.wikipedia.org/w/api.php?",
						data: {
							action: "opensearch",
							search:input,
							limit:48,
							/*generator:"search",
							gsrsearch:input, */
							/*list:"search",
							srsearch:input,
							srlimit:16,*/ //amount of results displayed/obtained
							format: "json",
							origin: "*"  //works when i make the origin * instead of localhost
						},
				type:"GET",
				headers: { 'Api-User-Agent': 'samFCC' },
				success: function(data){
					dataArray = data;
					$("body").append("<div id=container></div")
					$("body").append("<table id='table-one'></table").css("display", "block")
					for (var i = 0; i < (16 / 4 ); i++) {
						$("#table-one").append("<tr></tr>");
					} // creates 4 tablerows
					for (var x = 0; x < $("tr").length; x ++) {
						$("tr").append("<td></td>").hide().fadeIn(1000);
					}//creates 4 cells for each tablerow

					var cellCount = $("td").length;
					console.log(cellCount)
					for (a = 0; a < cellCount; a++) { // WORKS
						var cell = $("td")[a]
						var trunc = dataArray[2][a].slice(0, 150) + "..."; // tuncates the snippet cuz its too long
						$(cell).html("<a target='_blank' href=" + dataArray[3][a] +">"+ "<h2>" + dataArray[1][a] + "</h2>" + "<p>" + trunc + "</p>" + "</a>");
					}
					$("<footer><button id='show-more'>More Results</button></footer").appendTo("#table-one").hide().delay(2000).fadeIn(1000);
					console.log(data)
				//this is my show more results function/part thingy
					$("#show-more").click(function(){
						var myArrHeadline = data[1].slice(16);
						var myArrSnippet = data[2].slice(16);
						var myArrLink = data[3].slice(16);
						var trunc = myArrSnippet.slice(0,150)
						console.log(myArrHeadline)
						console.log(myArrHeadline[0])
						$("body").append("<table id='table-two'></table>")
						for (var i = 0; i < (16 / 4); i++) {
							$("#table-two").append("<tr></tr>");
						}
						for (var x = 0; x < 4; x ++) {
							$("#table-two > tr").append("<td class='my-test'></td>");
						}//creates 4 cells for each tablerow
						for (var y = 0, z = 16; y < 16; y++, z++) {
							console.log(z)
							var cellTwo = $(".my-test")[y];
							$(cellTwo).html("<a target='_blank' href=" + myArrLink.shift() +">"+ "<h2>" + myArrHeadline.shift() + "</h2>" + "<p>" + trunc.shift() + "</p>" + "</a>")
						}
						$("#table-two").appendTo("body")
						$("#show-more").slideUp(500, function(){
							$("#show-more").css("display", "none") //this instead of slideUp().css(....)prevents the element from disapearing without doing the fadeOut
						})
					})//end show-more click



				},
				error: function(data) {
					console.log(data + " ERROR");
				}
			})// end of ajax
		} 
})
$(document).ajaxStart(function(){
	console.log("loading")
});
$(document).ajaxStop(function(){
	console.log("done")
});
})// end of doc ready