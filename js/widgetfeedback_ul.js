	/**
	 * Widget
	 * Conf, API, UI, Init
	 */
	var WidgetConf = {
		url:  'http://localhost:8084/widget/',
		app:  'ul',
		user: '4',
		id:   $(location).attr('pathname')
	};
	
	var WidgetAPI = {
		doRequest: function(controller, preferences, callback){
			$.ajax({
				url: WidgetConf.url + controller,
				type: 'get',
				data: preferences,
				dataType: 'json',
				async: true,
				crossDomain: true,
				xhrFields: {
					withCredentials: false
				},
				success: function(data){
					callback(data);
				},
				error: function(xhr, msg){
					console.log(msg);
				}
			});
		},
		getAverageAndComments: function(avg, callback){
			var preferences = {
				'id':WidgetConf.id,
				'app':WidgetConf.app,
				'user':WidgetConf.user,
				'grvalue':avg
			};
			WidgetAPI.doRequest('ControllerGetStar', preferences, callback);
		},
		setRateAndComment: function(rate, title, comment, callback){
			var preferences = {
				'id':WidgetConf.id,
				'app':WidgetConf.app,
				'user':WidgetConf.user,
				'star':rate,
				'titlecomment': title,
				'comment': comment
			};
			WidgetAPI.doRequest('ControllerStar', preferences, callback);
		}
	};
	
	var WidgetUI = {
		initWidget: function(){
			WidgetUI.setWidgetState();
			
			$("#selectgrvalue").on('change', function() {
				WidgetUI.setWidgetState();
			});
			
			$('#morecomments').on('click', function(){
				WidgetUI.moreComments();
				return false;
			});
			
			$('#buttonprovideoyourrate a').on('click', function(){
				WidgetUI.provideRate();
				return false;
			});
			
			$('#buttonBack, #buttonOk').on('click', function(){
				WidgetUI.resetWidget();
				return false;
			});
			
			$('#buttonSend').on('click', function(){
				WidgetUI.addRateAndComment();
				return false;
			});
		},
		setWidgetState: function(){
			var avg = $("#selectgrvalue").val();
			WidgetAPI.getAverageAndComments(avg, WidgetUI.setWidgetStateCallback);
		},
		setWidgetStateCallback: function(data){
			$("#valuemedia").text(data.value);
			$("[name=widget_stars_value]").val([data.value]);
			$("#widget_first_comments_ul, #widget_comments_ul").empty();
			$.each(data.comments, function(i){
				var img = '<img src="img/user.png" alt="" height="42" width="42">';
				var title = '<strong>' + this.title + ' (' + this.value + '/5)</strong>';
				var comment = '<span>' + this.c + '</span>';
				var li = $('<li>').html(img + title + '<br/>' + comment);
				$("#widget_comments_ul").prepend(li);
				if(!i){
					$("#widget_first_comments_ul").prepend(li.clone());
				}
			});
		},
		addRateAndComment: function(){
			var rate = $('input[name=widget_stars_value_rate]:checked').val();
			if(typeof rate !== 'undefined'){
				var title = $('#widget_title_comment').val();
				var comment = $('#widget_comment').val();
				WidgetAPI.setRateAndComment(rate, title, comment, WidgetUI.addRateAndCommentCallback);
			}
			else{
				/*@todo:set errors on widget itself, don't use an alert */
				alert('You must select a rating from 1 to 5 stars');
			}
		},
		addRateAndCommentCallback: function(){
			WidgetUI.setWidgetState();
			$("#provideoyourrate").hide();
			$("#provideoyourrateok").show();
			$("#buttonthankyou").show();
			$("#provideoyourrateok").focus();
		},
		moreComments: function(){
			if($('#listComments').is(':hidden')){
				$('#firstComment').hide();
				$('#listComments').show();
				$("#morecomments").text("First Comment");
				$('#provideoyourrate').hide();
				$('#buttonprovideoyourrate').show();
			}
			else{
				$('#firstComment').show();
				$('#listComments').hide();
				$("#morecomments").text("More Comments");
			}
			$("#listofcomments").focus();
		},
		provideRate: function(){
			$('#buttonprovideoyourrate').hide();
			$('#firstComment').hide();
			$('#provideoyourrate').show();
			$("#morecomments").text("More Comments");
			$('#listComments').hide();
			$('#firstComment').hide();
			$("input[name=widget_stars_value_rate]").removeAttr("checked");
			$("#widget_title_comment").val('');
			$("#widget_comment").val('');
			$("#radio_stars5_rate").focus();
		},
		resetWidget: function(){
			$('#buttonprovideoyourrate').show();
			$('#firstComment').show();
			$('#provideoyourrate').hide();
			$('#provideoyourrateok').hide();
			$('#buttonthankyou').hide();
			$("#morecomments").text("More Comments");
			$("#listofcomments").focus();
		}
	};
	
	$(document).ready(function(){
		WidgetUI.initWidget();
	});
	
	/**
	 * Unified Listing Interface
	 * Select User
	 */
	function loadusermenu(){
		$('#user-menu').toggle();
	}
	
	function selectuser(usercode){
		if(usercode === 1){
			$('#username').html('Nacho');
			WidgetConf.user = '1';
		}else if(usercode === 2){
			$('#username').html('Esteban');
			WidgetConf.user = '2';
		}else if(usercode === 3){
			$('#username').html('Manuel');
			WidgetConf.user = '3';
		}
		$('#user-menu').toggle();
	}