
/**  Alfanous specific javascript **/
//bidi = "{{ bidi.direction }}";

$(document).ready(function(){
	//$('head').append('<link rel="stylesheet" href="/static/shared/css/skins/bootstrap.min.css" type="text/css" />')
	
	GetSkinCookieAndApply(); //change the skin based on the cookie value
	
	$(".slidingForm").hide();
    $('.show_hide').click(function(){
        $(".slidingForm").slideToggle(function() {
            var text = $('.show_hide').html();
            if($('.slidingForm').is(":visible")){
                $('.show_hide').html(text.replace('+', ' - '));
            }
            else {
                $('.show_hide').html(text.replace(' - ', '+'));
            }
        });
    });
    	$(".slidingFormOptions").hide();

        $('.show_hide_options').click(function(){
        $(".slidingFormOptions").slideToggle(function() {
            var text = $('.show_hide_options').html();
            if($('.slidingFormOptions').is(":visible")){
                $('.show_hide_options').html(text.replace('+', '-'));
            }
            else {
                $('.show_hide_options').html(text.replace('-', '+'));
            }
        });
    });

    $(".aya_details").hide();
    
    
    $(".show_hide_aya_details").click(function(event) {
        var id = $(this).attr('id');
        var ayaNum = id.split("_").pop();

        $("#" + id + "_content").slideToggle(function() {
            var text = $("#" + id).html();
            if($("#" + id + "_content").is(":visible")){
                $("#" + id).html(text.replace('more', 'less'));
                document.getElementById("details_icon_" + ayaNum).className = "icon-chevron-up";
            }
            else {
                $("#" + id).html(text.replace('less', 'more'));
                document.getElementById("details_icon_" + ayaNum).className = "icon-chevron-down";
            }
        });
        
    });

    $(".audio").hide();
    $(".function_button").click(function(event) {
        if ($(this).attr('id').indexOf("audio_button") !== -1) {
            var id = $(this).attr('id');
            var ayaNum = id.split("_").pop();
            $("#aya_audio_" + ayaNum).slideToggle(function() {});
        };

        if ($(this).attr('id').indexOf("aya_copy") !== -1) {
            var id = $(this).attr('id');
            var ayaNum = id.split("_").pop();

            var text = $("#aya_text_" + ayaNum).html().replace(/<(?:.|\n)*?>/gm, '').replace(/\s+/g, ' ');
            window.prompt ("Copy to clipboard: Ctrl+C, Enter", $.trim(text));
        };
        
    });


    $('select').selectpicker();

    $("#QuickTour").click(function(){
                bootstro.start();    
            });
});

function build_search_link(param,query,filter)
{
    var new_param = param; 
           new_param.action="search";
    new_param.page = 1;
    new_param.sortedby = "mushaf";
    if (filter) new_param.query = "(" + $("#search_box").val() + ") + " + query;
    else new_param.query = query;
    return "<a class='no_decoration' href=\""+ get_url_without_params()+ "?"+ build_params( new_param )+ "\">" 
}

function get_results (param) { // this function will be used to require suggestions
    if ($.trim(param.query) != "" && param.action == "search") {
        $.ajax({
            url: "/jos2/", // http://www.alfanous.org/jos2
            async: false,
            type: "GET",
            dataType: "json",
            timeout: 10000,
            crossDomain: true,
            data: param,
            success: function(json){
                show_results (json, param);
            },
            error: function(jq_xhr, text_status, error_thrown){
                $("#search_result").html("<div id='error'><p>"+ error_thrown+"</p></div>");
                return false;
            }
            });
        };
};

/*$(document).ready(function() {
	//$('head').append('<link rel="stylesheet" href="/static/shared/css/skins/bootstrap.min.css" type="text/css" />"');
	$('head').append('islam');
});*/


function show_results (json, param) {       }

function addto_searchbar(){
	window.external.AddSearchProvider("/opensearch.xml");
}
