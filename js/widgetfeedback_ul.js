            var completeForm = false;
            var app = "ul";
            var user = "4";
            //var urlserverGlobal = "http://193.27.9.220/widget/";
            var urlserverGlobal = "http://localhost:8084/widget/";
            //var urlserverGlobal = "http://saapho:8080/widget/"
            var imageuser = "http://lorempixum.com/100/100/nature/1";
            var altimguser = "example of image user";
                    
            
            function processError(e , msg){
                console.error("error");
            }

            function processResponse(res){
                loadValue();
            }
            
            
            function callWebServiceWithComment() {
                //cargar valor de las estrellas para un idParticular
                //var urllocation = $(location).attr('pathname');
                //if($.cookie(urllocation)!=="true"){
                    var valueoverall = $('input[name=widget_stars_value_rate]:checked').val();
                    if(typeof valueoverall !== "undefined") {
                        var titlecomment = $('#widget_title_comment').val();
                        var comment = $('#widget_comment').val();
                        var urllocation = $(location).attr('pathname');
                        var urlServer = urlserverGlobal+ "ControllerStar?comment="+comment+"&id="+urllocation+"&app="+app+"&user="+user+"&star="+valueoverall+"&titlecomment="+titlecomment;
                        var preferences = "";
                        
                        
                         
                        var requestR =  $.ajax({
                            url: urlServer,//url servicio rest
                            type: 'get',//tipo de petición
                            data: preferences,//datos a enviar en formato JSON
                            dataType: 'json',//tipo de datos
                            async: true,
                            crossDomain: true,
                            xhrFields: {
                                withCredentials: false
                            }
                        });
                        
                        requestR.done(function(data){
                            processResponse(data);
                            loadmessage();
                        }); 

                        /*$.ajax({
                            url: urlServer,//url servicio rest
                            type: 'get',//tipo de petición
                            data: preferences,//datos a enviar en formato JSON
                            dataType: 'json',//tipo de datos
                            async: true,
                            crossDomain: true,
                            //json: 'callback',//nombre de la variable get para reconocer la petición
                            xhrFields: {
                                withCredentials: true
                              },
                            success: function(res) {
                                processResponse(res);
                                loadmessage();
                             }, 
                             error: function(e , msg){ 
                                 processError(e,msg);
                             }
                        });*/
                    }else{
                        alert("You must select a rating from 1 to 5 stars");
                    }
                    
                //}else{
                //    alert("---ya has introducido tu valorcion----");
                //    loadValue();
                //}
            }
            
            function loadValue(){
                var urllocation = $(location).attr('pathname');
                var grvalue = $("#selectgrvalue").val();
                
               var preferences = "";
               var urlServer2 = urlserverGlobal+ "ControllerGetStar?id="+urllocation+"&app="+app+"&user="+user+"&grvalue="+grvalue;
                
                var request =  $.ajax({
                    url: urlServer2,//url servicio rest
                    type: 'get',//tipo de petición
                    data: preferences,//datos a enviar en formato JSON
                    dataType: 'json',//tipo de datos
                    async: true,
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: false
                    }
                });
                
                request.done(function(data){
                    completeComments(data);
                    console.log(data);
                });    
                
            }
            
            var numc = 0;
            function completeStar(res){
                    $("[name=widget_stars_value]").val([res.value]);
                    $("#widget_comments").empty();
                    //rellenar listado de comentarios
                    jQuery.each(res.comments, function() {
                        numc = numc +1;
                        $("#widget_comments").prepend("<div id='widget_comment_text"+numc+"' class='widget_comment_text' onclick='zoomcomment("+numc+");'>" + this.c +"</div><hr>");
                    });
            }
            
            function completeComments(res){
                    $("#valuemedia").text(res.value);
                    //$("#widget_media_rating").text("the average rating of all users is: " + res.value);
                    $("[name=widget_stars_value]").val([res.value]);
                    $("#widget_comments_ul").empty();
                    $("#widget_first_comments_ul").empty();
                    
                    var index = 0;
                    //rellenar listado de comentarios
                    jQuery.each(res.comments, function() {
                        numc = numc +1;
                        $("#widget_comments_ul").prepend("<li><img src='img/user.png' alt='image of user' height='42' width='42'><span style='font-size: 14px;'><b>"+this.title+" ("+this.value+"/5):</b><br>"+this.c+"</span></li>");
                        
                        if(index===0){
                            $("#widget_first_comments_ul").prepend("<li><img src='img/user.png' alt='image of user' height='42' width='42'><span style='font-size: 14px;'><b>"+this.title+" ("+this.value+"/5):</b><br>"+this.c+"</span></li>");
                        }
                        index++;
                        ////$("#widget_comments_ul").prepend("<li class='widget_comments_li'><span class='visuallyhidden'><h2>"+this.title+"</h2></span><span class='visuallyhidden'>The rating of this user is "+this.value+"</span><img src='"+imageuser+"' alt='"+altimguser+"'/><p style='margin:0px;'><span class='widget_comments_h5'>"+this.date+"</span></p><span aria-hidden='true'><h2 class='widget_comments_h3'>"+this.title+"</h2></span><span aria-hidden='true'><p class='widget_categorization' align='left' style='margin:0px;'><input id='radio_stars1_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='5' disabled><label for='radio_stars1_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='4' disabled><label for='radio_stars2_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='3' disabled><label for='radio_stars3_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='2' disabled><label for='radio_stars4_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='1' disabled><label for='radio_stars5_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p></span><div class='widget_article'><div class='widget_text short'></div><div class='widget_text full'>"+this.c+"</div><span class='widget_read-more' id='widget_read-more"+numc+"'>readmore</span></div></li>");
                        //$("[name=widget_stars_value_comment_"+numc+"]").val([this.value]);
                    });
                    
                    //$("[name=widget_stars_value_comment_1]").val([4]);
                    loadlistcommentsDefault();
            }
            
            
            var numzoomcomment = 0;
            function zoomcomment(num){
                $(".widget_comment_text").attr("style", "background-color: transparent !important");
                if(numzoomcomment===num){
                    $("#widget_zoom_comment").hide();
                    numzoomcomment = 0;
                }else{
                    //poner fondo normal a todos los DIV
                    $("#widget_comment_text"+num).attr("style", "background-color: #f9f8f8 !important");
                    $("#widget_zoom_comment").show();
                    numzoomcomment = num;
                }
            }
            
            function loadlistcomments(){
                loadValue();
                if($("#widget_zoom_comment").is(":visible")){
                    $("#widget_zoom_comment").hide();
                }else{
                    $(".widget_zoom_comment").hide();
                    $("#widget_zoom_comment").show();
                }
            }
            
            
            function loadmessage(){
                loadyourrate();
                $("#widget_message_confirmation").show();
                setTimeout(hideMessage, 2000);
                $("#provideoyourrate").hide();
                $("#provideoyourrateok").show();
                $("#buttonthankyou").show();
                
                $("#provideoyourrateok").focus();
                
            }
            
            function hideMessage(){
                $("#widget_message_confirmation").hide();
            }
            
            function loadyourrate(){
                if($("#widget_your_rate").is(":visible")){
                    $("#widget_your_rate").hide();
                    //poner vacio todo
                    $("#widget_title_comment").val("");
                    $("#widget_comment").val("");
                }else{
                    $(".widget_zoom_comment").hide();
                    $("#widget_your_rate").show();
                }
            }
            
            
            $(".readonly:radio").on("click", function(){
                return false;
            });
            
            
            function loadlistcommentsDefault(){    
                var maxChars = 520;
                var ellipsis = "...";
                $(".widget_article").each(function() {
                    var text = $(this).find(".widget_text.full").text();
                    var html = $(this).find(".widget_text.full").html();        
                    if(text.length > maxChars)
                    {            
                        var shortHtml = html.substring(0, maxChars - 3) + "<span class='widget_ellipsis'>" + ellipsis + "</span>";
                        $(this).find(".widget_text.short").html(shortHtml);            
                    }else{
                        var shortHtml = $(this).find(".widget_text.full").text();
                        $(this).find(".widget_text.short").html(shortHtml);
                        $(this).find(".widget_read-more").hide();
                    }
                });
                $(".widget_read-more").click(function(){        
                    var readMoreText = "readmore";
                    var readLessText = "readless";        
                    var $shortElem = $(this).parent().find(".widget_text.short");
                    var $fullElem = $(this).parent().find(".widget_text.full");        

                    if($shortElem.is(":visible"))
                    {           
                        $shortElem.hide();
                        $fullElem.show();
                        $(this).text(readLessText);
                    }
                    else
                    {
                        $shortElem.show();
                        $fullElem.hide();
                        $(this).text(readMoreText);
                    }       
                });
            };
            
            
            function createWidget(){
                
                if(user===''){
                    $("#widget_feedback").append("<div class='widget_message' id='widget_message_confirmation' style='display:none;'><div id='widget_title_message_confirmation' class='widget_title'>Message</div><h3 id='widget_message_confirmation_h3' style='text-align: center;'>Your evaluation has been registered</h3></div><div class='widget_zoom_comment' id='widget_zoom_comment' style='display:none;'><a href='#' onclick='$(\"#widget_zoom_comment\").hide();' class='widget_linktitle'><span class='visuallyhidden'>Hide </span><div  id='widget_title_list_comment' class='widget_title'>List of Comments &#9658; </div></a><span class='visuallyhidden'><h1>List of Comments</h1></span><ul id='widget_comments_ul' class='widget_comments_ul'></ul></div><!-- Menu PRINCIPAL--><div class='widget_stars' id='widget_stars'><a href='#' onclick='$(\"#widget_your_rate\").hide();$(\"#widget_zoom_comment\").hide();$(\"#widget_content\").slideToggle(\"slow\");' class='widget_linktitle'><div  id='widget_title' class='widget_title'>Feedback &#9650; &#9660;</div></a><div id='widget_content' class='widget_content'><span class='visuallyhidden' id='widget_media_rating'></span><span aria-hidden='true'><p class='widget_categorization' align='center'><input id='radio_stars1' type='radio' name='widget_stars_value' value='5'><label for='radio_stars1' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2' type='radio' name='widget_stars_value' value='4'><label for='radio_stars2' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3' type='radio' name='widget_stars_value' value='3'><label for='radio_stars3' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4' type='radio' name='widget_stars_value' value='2'><label for='radio_stars4' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5' type='radio' name='widget_stars_value' value='1'><label for='radio_stars5' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p></span><div id='widget_options' class='widget_options'><ul class='widget_options_ul'><li class='widget_options_li'><a href='#' class='widget_btn' onclick='loadlistcomments();' role='button'>Comments</a></li><!--<li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Bug tracking</a></li><li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Ideation</a></li>--></ul></div></div></div><!-- FIN Menu PRINCIPALLL-->");
                }else{
                    $("#widget_feedback").append("<div class='widget_message' id='widget_message_confirmation' style='display:none;'><div id='widget_title_message_confirmation' class='widget_title'>Message</div><h3 id='widget_message_confirmation_h3' style='text-align: center;'>Your evaluation has been registered</h3></div><div class='widget_zoom_comment' id='widget_zoom_comment' style='display:none;'><a href='#' onclick='$(\"#widget_zoom_comment\").hide();' class='widget_linktitle'><span class='visuallyhidden'>Hide </span><div  id='widget_title_list_comment' class='widget_title'>List of Comments &#9658; </div></a><span class='visuallyhidden'><h1>List of Comments</h1></span><ul id='widget_comments_ul' class='widget_comments_ul'></ul></div><div class='widget_zoom_comment' id='widget_your_rate' style='display:none;'><a href='#' onclick='$(\"#widget_your_rate\").hide();' class='widget_linktitle'><div class='widget_title'><span class='visuallyhidden'>Hide </span><h1 class='widget_title_h1'>Your Rate &#9658;</h1></div></a><div style='padding: 10px;'><h1 class='h1styletitle'>Your overall rating of this product</h1><p class='widget_categorization' align='center'><input id='radio_stars1_rate' type='radio' name='widget_stars_value_rate' value='5'><label for='radio_stars1_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2_rate' type='radio' name='widget_stars_value_rate' value='4'><label for='radio_stars2_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3_rate' type='radio' name='widget_stars_value_rate' value='3'><label for='radio_stars3_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4_rate' type='radio' name='widget_stars_value_rate' value='2'><label for='radio_stars4_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5_rate' type='radio' name='widget_stars_value_rate' value='1'><label for='radio_stars5_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p><label for='widget_title_comment' class='h1styletitle'>Title of your review</label><input type='text' name='widget_title_comment' id='widget_title_comment' style='width: 450px;margin-bottom:15px;'/><label for='widget_comment' class='h1styletitle'>Your review</label><textarea rows='9' cols='62' name='widget_comment' id='widget_comment'></textarea><br><br><a class='widget_btn_round' href='#' onclick='callWebServiceWithComment();' role='button'>Send Your Rate</a></div></div><!-- Menu PRINCIPAL--><div class='widget_stars' id='widget_stars'><a href='#' onclick='$(\"#widget_your_rate\").hide();$(\"#widget_zoom_comment\").hide();$(\"#widget_content\").slideToggle(\"slow\");' class='widget_linktitle'><div  id='widget_title' class='widget_title'>Feedback &#9650; &#9660;</div></a><div id='widget_content' class='widget_content'><span class='visuallyhidden' id='widget_media_rating'></span><span aria-hidden='true'><p class='widget_categorization' align='center'><input id='radio_stars1' type='radio' name='widget_stars_value' value='5'><label for='radio_stars1' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2' type='radio' name='widget_stars_value' value='4'><label for='radio_stars2' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3' type='radio' name='widget_stars_value' value='3'><label for='radio_stars3' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4' type='radio' name='widget_stars_value' value='2'><label for='radio_stars4' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5' type='radio' name='widget_stars_value' value='1'><label for='radio_stars5' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p></span><div id='widget_options' class='widget_options'><ul class='widget_options_ul'><li class='widget_options_li'><a href='#' class='widget_btn' onclick='loadyourrate();' role='button'>Your Rate</a></li><li class='widget_options_li'><a href='#' class='widget_btn' onclick='loadlistcomments();' role='button'>Comments</a></li><!--<li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Bug tracking</a></li><li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Ideation</a></li>--></ul></div></div></div><!-- FIN Menu PRINCIPALLL-->");
                }
            }
            
            function loadmorecomments(){
                var text = $("#morecomments").text();
                
                $('#buttonthankyou').hide();
                $('#provideoyourrateok').hide();
                if(text==='More Comments'){
                    $('#firstComment').hide();
                    $('#listComments').show();
                    $("#morecomments").html("First Comment");
                    $("#widget_content").attr("style", "height:510px;");
                    $('#provideoyourrate').hide();
                    $('#buttonprovideoyourrate').show();
                    
                    $("#listofcomments").focus();
                }else if(text==='First Comment'){
                    $('#firstComment').show();
                    $('#listComments').hide();
                    $("#morecomments").html("More Comments");
                    $("#widget_content").attr("style", "height:350px;");
                    
                    $("#listofcomments").focus();
                    
                }
                
            }
            
            function loadprovideyourrate(){
                $('#buttonprovideoyourrate').hide();
                $('#firstComment').hide();
                $('#provideoyourrate').show();
                $("#widget_content").attr("style", "height:600px;");
                $("#morecomments").html("More Comments");
                
                $('#listComments').hide();
                $('#firstComment').hide();
                $("input[name=widget_stars_value_rate]").removeAttr("checked");
                $("#widget_title_comment").val('');
                $("#widget_comment").val('');
                
                //$("input[name='widget_stars_value_rate']").select();
                //$("#radio_stars5_rate").prop("checked", true)
                $("#radio_stars5_rate").focus();
            }
            
            function normalwidget(){
                $('#buttonprovideoyourrate').show();
                $('#firstComment').show();
                $('#provideoyourrate').hide();
                $('#provideoyourrateok').hide();
                $('#buttonthankyou').hide();
                $("#widget_content").attr("style", "height:350px;");
                $("#morecomments").html("More Comments");
                
                $("#listofcomments").focus();
            }
            
            function loadusermenu(){
                $('#user-menu').toggle();
            }
            
            function selectuser(usercode){
                 if(usercode===1){
                     $('#username').html('Nacho');
                     user = "1";
                 }else if(usercode===2){
                     $('#username').html('Esteban');
                     user = "2";
                 }else if(usercode===3){
                     $('#username').html('Manuel');
                     user = "3";
                 }
                 $('#user-menu').toggle();
                
            }
            
            
            
            $(window).load(function() {
                   loadValue();
            });
            
            $(document).ready(function() { 

                /*$('.span1').focusin(function() {
                    alert("focusin");
                    $(this).html("\2605");
                });
                
                $('.span1').focusout(function(){
                    alert("focusout");
                    $(this).html("\2606");
                });*/
                
                $('.ahref').click(function(e) {
                    e.preventDefault();
                });        
                
               $("#selectgrvalue").change(function() {
                loadValue();
               });
                
            });
            
                
            
