$(document).ready(function(){

	var channels = ["OgamingSC2", "brunofin", "ESL_SC2", "cretetion", "freecodecamp", "comster404", "habathcx", "noobs2ninjas", "ogn_lol"];

	var url = "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp";

	$.getJSON(url,function(data){

		if(data.stream!==null){
			var status = data.stream.channel.status;
			$('#status').html(status);
			$('#fccUpdate').html("LIVE");
			
		}else{

			$.getJSON("https://wind-bow.glitch.me/twitch-api/channels/freecodecamp?callback=?",function(data4){

			
					var status = data4.status;
					$('#status').html(status);
				
			});
			
			$('#fccUpdate').html("OFFLINE");
		}

	});

	for(var i=0;i<channels.length;i++){
		var channelsURL = "https://wind-bow.glitch.me/twitch-api/channels/"+channels[i]+"?callback=?";

		$.getJSON(channelsURL,function(data1){

			var  status1;
			status1 = data1.status;
			

			if(data1.error){
				$('#offlineDiv').prepend("<div id='bar'><div class='row'><div class='col-md-3'><img src='images/incorrect-294245_960_720.png' id='otherImg'></div><div class='col-md-6'>"+data1.message+"</div><div class='col-mod-3' id='otherStatus'>"+status1+"</div></div></div>");
			}


		});
	} 

	for(var i=0;i<channels.length;i++){
		onlineURL = "https://wind-bow.glitch.me/twitch-api/streams/"+channels[i];
		

		$.getJSON(onlineURL).done(function(data2){

			var logo,status2,name,url1;

			if(data2.stream!==null){
			logo = data2.stream.channel.logo;
			status2 = data2.stream.channel.status;
			name = data2.stream.channel.display_name;
			url1 = data2.stream.channel.url;
		
				$('#onlineDiv').prepend(
					"<div id='card'><div class='row'><div class='col-md-12'><a href="+url1+" target='_blank' style='text-decoration:none;'><img src="+logo+" id='logo'></a><div id='name'>"+name+"</div></div></div><div class='row'><div class='col-md-10' id='cardStatus'>"+status2+"</div><div class='col-md-1'><i class='fa fa-circle' aria-hidden='true' id='indicator'></i></div></div></div>");
			}

			if(data2.stream==null){

				$.getJSON(data2._links.channel,function(data3){

			var logo1 = data3.logo;
			var status3 = data3.status;
			var name1 = data3.name;
			var offlineURL = data3.url;

			
				$('#offlineDiv').prepend("<a href="+offlineURL+" target='_blank'><div id='bar'><div class='row'><div class='col-md-3'><img src="+logo1+" id='otherImg'></div><div class='col-md-3'>"+name1+"</div><div class='col-mod-6' id='otherStatus'>"+status3+"</div></div></div></a>");
			
		});
			} 
			

		});
	}

});