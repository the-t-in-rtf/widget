describe('Widget', function(){
	
	beforeEach(function() {
		jasmine.Ajax.install();
		spyOn(WidgetUI, 'setWidgetState').and.callThrough();
		spyOn(WidgetAPI, 'getAverageAndComments').and.callThrough();
		spyOn(WidgetAPI, 'doRequest').and.callThrough();
		spyOn($, 'ajax').and.callFake(function(options){
			options.success({value:3,comments:[]});
		});
		spyOn(WidgetUI, 'setWidgetStateCallback');
		WidgetUI.initWidget();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});
	
	describe('Initialization', function(){

		it('Should call WidgetUI.setWidgetState', function(){
			expect(WidgetUI.setWidgetState).toHaveBeenCalled();
		});
		
		it('Should call WidgetAPI.getAverageAndComments', function(){
			expect(WidgetAPI.getAverageAndComments).toHaveBeenCalledWith(undefined, WidgetUI.setWidgetStateCallback);
		});
		
		it('Should call WidgetAPI.doRequest', function(){
			var preferences = {
				'id':WidgetConf.id,
				'app':WidgetConf.app,
				'user':WidgetConf.user,
				'grvalue':undefined
			};
			expect(WidgetAPI.doRequest).toHaveBeenCalledWith('ControllerGetStar', preferences, WidgetUI.setWidgetStateCallback);
		});
		
		it('Should call WidgetUI.setWidgetStateCallback', function(){
			expect(WidgetUI.setWidgetStateCallback).toHaveBeenCalledWith({value:3,comments:[]});
		});
		
	});
});