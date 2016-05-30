describe('Widget', function(){
	
	jasmine.getFixtures().fixturesPath = './';
	jasmine.getStyleFixtures().fixturesPath = './css';
	var html = readFixtures('ul.html');
	var widget_regex = /<section id=\"widget\"[^>]*>((.|[\n\r])*)<\/section>/im;
	var array_matches = widget_regex.exec(html);
	var widget_html = array_matches[0];
	
	beforeEach(function() {
		loadStyleFixtures('widgetfeedback_ul.css');
		setFixtures(widget_html);
		jasmine.Ajax.install();
		spyOn(WidgetUI, 'setWidgetState').and.callThrough();
		spyOn(WidgetAPI, 'getAverageAndComments').and.callThrough();
		spyOn(WidgetAPI, 'doRequest').and.callThrough();
		spyOn($, 'ajax').and.callFake(function(options){
			options.success({value:3, comments:[]});
		});
		spyOn(WidgetUI, 'setWidgetStateCallback').and.callThrough();
		WidgetUI.initWidget();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});
	
	describe('Initialization', function(){
		
		it('Should call WidgetUI.setWidgetState', function(){
			expect(WidgetUI.setWidgetState).toHaveBeenCalled();
		});
		
		it('Should initialize events', function(){
			expect($("#valoration")).toHandle('change');
			expect($('#morecomments')).toHandle('click');
			expect($('#buttonRate')).toHandle('click');
			expect($('#buttonBack')).toHandle('click');
			expect($('#buttonOk')).toHandle('click');
			expect($('#buttonSend')).toHandle('click');
			expect($('#buttonDelete')).toHandle('click');
		});
		
		it('Should call WidgetAPI.getAverageAndComments', function(){
			expect(WidgetAPI.getAverageAndComments).toHaveBeenCalledWith('0', WidgetUI.setWidgetStateCallback);
		});
		
		it('Should call WidgetAPI.doRequest', function(){
			var preferences = {
				'id':WidgetConf.id,
				'app':WidgetConf.app,
				'user':WidgetConf.user,
				'grvalue':'0'
			};
			expect(WidgetAPI.doRequest).toHaveBeenCalledWith('ControllerGetStar', preferences, WidgetUI.setWidgetStateCallback);
		});
		
		it('Should call WidgetUI.setWidgetStateCallback', function(){
			expect(WidgetUI.setWidgetStateCallback).toHaveBeenCalledWith({value:3,comments:[]});
		});
		
	});
	
	describe('Initial state', function(){
		it('Should have a rate of 3', function(){
			expect($('#valuemedia')).toContainText('3');
			expect($("#widget_stars_value_3")).toBeChecked();
		});
		
		it('Should show comments whit valoration of All', function(){
			expect($('#valoration')).toHaveValue('0');
		});
		
		it('Should have one comment', function(){
			expect('#widget_first_comments_ul > li').toHaveLength(1);
			expect('#widget_comments_ul > li').toHaveLength(1);
		});
		
		it('Should show first comment only', function(){
			expect($('#firstComment')).toBeVisible();
			expect($('#listComments')).toBeHidden();
			expect($('#morecomments')).toContainText('More Comments');
		});
		
		it('Rate form should be hidden and ratting button visible', function(){
			expect($('#provideoyourrate')).toBeHidden();
			expect($('#buttonprovideoyourrate')).toBeVisible();
			expect($('#buttonRate')).toContainText('Write a comment and rate it');
		});
		
		it('Button delete comment should be hidden', function(){
			expect($('#buttonDelete')).toBeHidden();
		});
	});
	
	describe('Initial state with a user\'s comment', function(){
	
		beforeEach(function(){
			var data = {
				value:3, 
				comments: [
					{title: '', comment: '', user: '4'},
					{title: '', comment: '', user: '1'}
				]
			};
			WidgetUI.setWidgetStateCallback(data);
		});
		
		it('Should have two comments', function(){
			expect('#widget_first_comments_ul > li').toHaveLength(1);
			expect('#widget_comments_ul > li').toHaveLength(2);
		});
		
		it('Rate form should be hidden and ratting button should be edit comment', function(){
			expect($('#provideoyourrate')).toBeHidden();
			expect($('#buttonprovideoyourrate')).toBeVisible();
			expect($('#buttonRate')).toContainText('Edit your comment and rate');
		});
		
		it('Button delete should be visible', function(){
			expect($('#buttonDelete')).toBeVisible();
		});
		
	});
	
	describe('Initial state with no user\'s comment', function(){
	
		beforeEach(function(){
			var data = {
				value:3, 
				comments: [
					{title: '', comment: '', user: '1'},
					{title: '', comment: '', user: '1'}
				]
			};
			WidgetUI.setWidgetStateCallback(data);
		});
		
		it('Should have two comments', function(){
			expect('#widget_first_comments_ul > li').toHaveLength(1);
			expect('#widget_comments_ul > li').toHaveLength(2);
		});
		
		it('Rate form should be hidden and ratting button visible', function(){
			expect($('#provideoyourrate')).toBeHidden();
			expect($('#buttonprovideoyourrate')).toBeVisible();
			expect($('#buttonRate')).toContainText('Write a comment and rate it');
		});
		
		it('Button delete should be hidden', function(){
			expect($('#buttonDelete')).toBeHidden();
		});
		
	});
	
	describe('Write a comment and rate it', function(){
	});
	
});