		$(document).ready(function(){
			timestamp = 0;
			updateMsg();
			$("form#chatform").submit(function(){
				$.post("backend.php",{
							message: $("#msg").val(),
							name: $("#author").val(),
							action: "postmsg",
							time: timestamp
						}, function(xml) {
					$("#msg").empty();
					addMessages(xml);
				});
				return false;
			});
		});
		function addMessages(xml) {
			if($("status",xml).text() == "2") return;
			timestamp = $("time",xml).text();
			$("message",xml).each(function(id) {
				message = $("message",xml).get(id);
				$("#messagewindow").prepend("<b>"+$("author",message).text()+
											"</b>: "+$("text",message).text()+
											"<br />");
			});
		}
		function updateMsg() {
			$.post("backend.php",{ time: timestamp }, function(xml) {
				$("#loading").remove();
				addMessages(xml);
			});
			setTimeout('updateMsg()', 4000);
		}
