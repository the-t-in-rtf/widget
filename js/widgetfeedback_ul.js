	/**
	 * Widget
	 * Conf, API, UI, Init
	 */
	var WidgetConf = {
		url:  'http://localhost:8084/widget/',
		/*url:  'http://193.27.9.220/widget/',*/
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
		},
		deleteRateAndComment: function(callback){
			var preferences = {
				'id':WidgetConf.id,
				'app':WidgetConf.app,
				'user':WidgetConf.user
			};
			WidgetAPI.doRequest('ControllerDeleteStar', preferences, callback);
		}
	};
	
	var WidgetUI = {
		initWidget: function(){
			WidgetUI.setWidgetState();
			
			$("#valoration").on('change', function() {
				WidgetUI.setWidgetState();
			});
			
			$('#morecomments').on('click', function(){
				WidgetUI.moreComments();
				return false;
			});
			
			$('#buttonRate').on('click', function(){
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
			
			$('#buttonDelete').on('click', function(){
				WidgetUI.deleteRate();
				return false;
			});
			
			$('#buttonHistogram').on('click', function(){
				WidgetUI.showHideHistogram();
				return false;
			});
			
			$('#histogram table a').on('click', function(){
				var rate = $(this).parents('tr').index() + 1;
				WidgetUI.setWidgetStateWithRate(rate);
			});
			
		},
		setWidgetState: function(){
			var avg = $("#valoration").val();
			WidgetAPI.getAverageAndComments(avg, WidgetUI.setWidgetStateCallback);
		},
		setWidgetStateWithRate: function(rate){
			WidgetAPI.getAverageAndComments(rate, WidgetUI.setWidgetStateCallback);
			$('#histogram table').hide();
		},
		setWidgetStateCallback: function(data){
			$("#valuemedia").text(data.value);
			$("[name=widget_stars_value]").val([data.value]);
			$("#widget_first_comments_ul, #widget_comments_ul").empty();
			$('#buttonDelete').hide();
			if(data.comments.length){
				$.each(data.comments, function(i){
					if(this.user == WidgetConf.user){
						$('#buttonRate').off('click').text('Edit your comment and rate').on('click', function(){
							WidgetUI.editRate();
							return false;
						});
						$('#buttonDelete').show();
					}
					var img = '<img src="img/user.png" alt="" height="42" width="42">';
					var title = '<strong><span>' + this.title + '</span> (' + this.value + '/5)</strong>';
					var date = '<span class="date">' + new Date(this.date).toLocaleDateString('en-UK') + '</span>';
					var comment = '<span>' + this.c + '</span>';
					var li = $('<li>').html(img + title + '<br/>' + date + '<br />' + comment).addClass('user-' + this.user);
					$("#widget_comments_ul").prepend(li);
					if(!i){
						$("#widget_first_comments_ul").prepend(li.clone());
					}
				});
			}
			else{
				var li = $('<li>').html('<strong>There are no comments whith this valoration yet</strong>');
				$("#widget_comments_ul").prepend(li);
				$("#widget_first_comments_ul").prepend(li.clone());
			}
			WidgetUI.setHistogram(data.comments);
		},
		addRateAndComment: function(){
			var rate = $('input[name=widget_stars_rate]:checked').val();
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
			$("#provideoyourrateok").focus();
		},
		moreComments: function(){
			if($('#listComments').is(':hidden')){
				$('#firstComment').hide();
				$('#listComments').show();
				$("#morecomments").text("First Comment");
				$('#provideoyourrate').hide();
			}
			else{
				$('#firstComment').show();
				$('#listComments').hide();
				$("#morecomments").text("More Comments");
			}
			$('#buttonprovideoyourrate').show();
			$("#valoration_select").focus();
		},
		provideRate: function(){
			$('#buttonprovideoyourrate').hide();
			$('#firstComment').hide();
			$('#provideoyourrate').show();
			$("#morecomments").text("More Comments");
			$('#listComments').hide();
			$('#firstComment').hide();
			$("#widget_title_comment").val('');
			$("#widget_comment").val('');
			$("#widget_stars_rate_1").focus();
		},
		editRate: function(){
			$('#buttonprovideoyourrate').hide();
			$('#firstComment').hide();
			$('#provideoyourrate').show();
			$("#morecomments").text("More Comments");
			$('#listComments').hide();
			$('#firstComment').hide();
			var title = $('#listComments li.user-' + WidgetConf.user + ' strong span').text();
			$("#widget_title_comment").val(title);
			var comment = $('#listComments li.user-' + WidgetConf.user + ' > span').text();
			$("#widget_comment").val(comment);
			$("#widget_stars_rate_1").focus();
		},
		deleteRate: function(){
			WidgetAPI.deleteRateAndComment(WidgetUI.deleteRateCallback);
		},
		deleteRateCallback: function(){
			WidgetUI.setWidgetState();
		},
		resetWidget: function(){
			$('#buttonprovideoyourrate').show();
			$('#firstComment').show();
			$('#provideoyourrate').hide();
			$('#provideoyourrateok').hide();
			$("#morecomments").text("More Comments");
			$("#valoration_select").focus();
		},
		showHideHistogram: function(){
			if($('#histogram table').is(':hidden')){
				$('#histogram table').show();
			}
			else{
				$('#histogram table').hide();
			}
		},
		setHistogram: function(data){
			var histogram = [
				{votes:0, percent:0},
				{votes:0, percent:0},
				{votes:0, percent:0},
				{votes:0, percent:0},
				{votes:0, percent:0}
			];
			for(var i = 0; i < data.length; i++){
				histogram[data[i].value - 1].votes++;
				histogram[data[i].value - 1].percent = histogram[data[i].value - 1].votes * 100 / data.length;
			}
			for(var i = 0; i < histogram.length; i++){
				$('#histogram table tr').eq(i).find('td').html(
					$('<span>').css({width: histogram[i].percent + '%'}).text(histogram[i].percent.toFixed(2) + '%')
				);
			}
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
		}else if(usercode === 4){
			$('#username').html('Pablo');
			WidgetConf.user = '4';
		}
		$('#user-menu').toggle();
		WidgetUI.resetWidget();
		$('#buttonRate').off('click').text('Write a comment and rate it').on('click', function(){
			WidgetUI.provideRate();
			return false;
		});
		$('#buttonDelete').hide();
		WidgetUI.setWidgetState();
	}