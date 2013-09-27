"use strict"

var $UCGURL = "/community.asmx";
var $UIBaseHref = "/system/includes/widgets/";
var $UIFooterPosition = 0;

/* UCG and HOMEPAGE BANNER extensions */
(function($) {
    $.fn.extend({
        addvote:function(rating){
            var $this=$(this);
            var mediaID=$this.getMediaID();
            if(!$this.isDisabled())
            {
                $UI.parseJSON("AddRating",false,{id:mediaID,rating:rating});
            }
        },
        bannerPanel:function(options) {
            var defaults = {disabled:false};
            var options = $.extend(defaults,options);
            this.each(function() {
                initialize($(this));
            });
            function initialize(instance)
            {
            	/* remove selectors of DCP panels not shown */
            	$(".thumbnails li",instance).hide();
            	$(".panel",instance).each(function() {
            	    var panelID = "#"+$(this).attr("id");
            	    $(".thumbnails a[href$="+panelID+"]", instance).parent().show();
            	});
            	
                /* add panel switching behavior */
                $(".thumbnails li",instance).mouseover(function(){$(this).addClass("hover");});
                $(".thumbnails li",instance).mouseout(function(){$(this).removeClass("hover");});
                $(".thumbnails a",instance).click(function() {
                    var panelID = this.href.substr(this.href.indexOf('#')+1);
                    instance.selectPanel(panelID);
                    $(this).parent().addClass("selected");
                    return false;
                });
                
                /* select random panel if none selected */
                if($(".panel.selected",instance).length==0){
                    var max = $(".panel",instance).length;
                    var rnd = Math.floor(Math.random()*max);
                    var panelID = $(".panel:eq("+rnd+")",instance).attr("id");
                    instance.selectPanel(panelID);
                }
                /* show panel selectors */
                $("#banner .thumbnails").css("visibility","visible");
            }
        },
        selectPanel:function(id) {
            var target="#"+id;
            $("#banner .thumbnails li").each(function(){
                $(this).removeClass("selected");
                var link = $("a",this).attr("href");
                if(link==target){$(this).addClass("selected");}
            });
            $("#banner .panel").each(function(){
            	$(this).removeClass("selected");
            	if($(this).attr("id")==id) { $(this).addClass("selected");}
            });
            $("#banner "+id).addClass("selected");
        },
        getMediaID:function() { return $(this).data("mediaitem:mediaID"); },
        isDisabled:function() { return $(this).data("mediaitem:disabled"); },
        isNullOrEmpty: function(value) { return (value==null||value==""); },
        log:function(msg) {
            if(window.console) { window.console.log(msg); }
        },
        ratingItem:function(options) {
            var defaults = {disabled:false};
            var options = $.extend(defaults,options);
            this.each(function() {
                var item = $(this);
                var names = getClassNamesFromElement(item);
                initialize(item,names);
            });
            function initialize(instance,classnames) {
                var mediaID = getMediaIDFromClassName(classnames);
                instance.data("mediaitem:disabled", options.disabled);
                instance.data("mediaitem:mediaID", mediaID);
                instance.updateRatings();
            }
            function getClassNamesFromElement(element) {
                return element.attr("class").split(" ");
            }
            function getMediaIDFromClassName(classnames) {
                var result=null,i;
                for(i in classnames) {
                    var name=classnames[i];
                    if(name.length > 3 && name.substr(0,3)=="tcm") {
                        result = name;
                    }
                }
                return result;
            }
        },
        updateRatings:function(){
            var $this = $(this);
            var mediaID = $this.getMediaID();
            var callback = function(data) {
                if(data!=null)
                {
                    var rating = data.Rating!=null ? Math.round(data.Rating) : 0;
                    $this.stars({
                        inputType:"select",
                        disabled:$this.isDisabled(),
                        oneVoteOnly:true,
                        callback:function(ui,type,value) {
                            $this.addvote(value);
                            $this.updateRatings();
                        }
                    });
                    $this.stars("select", rating);
                    $this.css("visibility","visible");
                }
            }
            var data = $UI.parseJSON("GetRating",true,{id:mediaID},callback);
        }
        
    })
})(jQuery)

var $UI = {
    dialogs: {
        contact:null,
        login:null
    },
    equalHeight:function(tabs) {
        var tallest = 0;
        tabs.each(function () { tallest = Math.max($(this).height(), tallest); })
        tabs.height(tallest);
    },
    initialize: function() {
        /* initialize graphical text */
        $UI.highlightTaxononmyNav();
        
		// $UI.updateGraphicalText(); // removed Cufon
        
		$UI.update();
        /* initialize login dialog */
        $UI.dialogs.login = $("#login_screen").dialog({
            autoOpen:false,
            height:220,
            width:450,
            draggable:false,
            resizable:false,
            modal:true,
            shadow:true,
            open: function() {
                $UI.dialogs.login.dialog("enable");
                $("input#username").focus();
                $(".ui-dialog-titlebar",$(this).parent()).click(function(){
                    $UI.dialogs.login.dialog("close");
                });
                $("#login.button",$(this)).click(function(){
                    $UI.dialogs.login.dialog("disable");
                    var $this = $(this);
                    var tcmuri=$("body").attr("id");
                    var uid = $("#username",$UI.dialogs.login).val();
                    var pwd = $("#password",$UI.dialogs.login).val();
                    if(!$this.isNullOrEmpty(uid) && !$this.isNullOrEmpty(pwd))
                    {
                        $.fn.log("logging in");
                        var data={pageURI:tcmuri,uid:uid,pwd:pwd};
                        var callback=function(data) {
                            if(data!=null) {
                                if(!$.fn.isNullOrEmpty(data.Error)) {
                                    $UI.showmsg(data.Error);
                                }
                                if(!$.fn.isNullOrEmpty(data.Info)) {
                                    $UI.showmsg(data.Info);
                                }
                                $UI.user.update(data.UserName,data.EmailAddress);
                                if($UI.user.isLoggedIn()) {
                                    $UI.dialogs.login.dialog("close");
                                    window.location.reload();
                                }
                            }
                        }
                        $UI.parseJSON("LogOn",false,data,callback);
                    }
                    $UI.dialogs.login.dialog("enable");
                });
                 $("input#password").keydown(function(event){
                    if(event.keyCode == '13')
                    {
                       $("#login.button").click(); 
                    }
                });
            },
            close: function() {
                $UI.update();
            }
        });
        $("#login").click(function(){
            $UI.dialogs.login.dialog("open");
            return false;
        });
        $("#logoff").click(function(){
            $UI.logoff();
            return false;
        });
        $("#tab-downloads-login").click(function() {
            $UI.dialogs.login.dialog("open");
            return false;
        });
    },
    logoff:function() {
        $UI.parseJSON("LogOff",false,{pageURI:$("body").attr("id")},null);
        $UI.user.update("","");
        $UI.update();
        window.location.reload();
    },
    parseJSON:function(action,async,data,callback) {
        var result=null;
        $.ajax({
            async:async,
            type:"POST",
            url:$UCGURL+"/"+action,
            contentType:"application/json;charset=utf-8",
            data:JSON.stringify(data),
            dataType:"json",
            beforeSend:function() { $(document).css("cursor","progress"); },
            complete:function() { $(document).css("cursor","auto"); },
            success:function(payload,status) {
                $.fn.log("parsing JSON: "+payload);
                if(payload!=null && payload.d!=null)
                {
                    result = JSON.parse(payload.d);
                    if(result.Error) { $.fn.log(result.Error); }
                    if(result.Info) { $.fn.log(result.Info); }
                    if(callback)
                    {
                        callback(result);
                    }
                }
            }
        });
    },
    reflow: function() {
        /* equalize item height  */
        var allresults = $(".search_result .search_result_item");
        var mostpopular = $("#mostPopular .search_result_item");
        $UI.equalHeight(allresults.not(mostpopular));
        $UI.equalHeight(mostpopular);
        $UI.equalHeight($("#sidebar,#contents"));
        $UI.equalHeight($(".interior #banner > div, .interior #banner"));
        $UI.equalHeight($(".interior #banner > div, .interior #banner > div > div > div > span"));
        $UI.equalHeight($(".landing #banner > div, .landing #banner"));
        $UI.equalHeight($(".landing #banner > div, .landing #banner > div > div > div"));
        $UI.equalHeight($("#promotions > span, #promotions div.promotion"));
    },
    showmsg: function(msg) {
        if(!$.fn.isNullOrEmpty(msg)){
            var container = $("#social_media_login",$UI.dialogs.login);
            container.html(msg);
            container.addClass("ui-state-error");
        }
    },
    update: function() {
        $.fn.log("updating UI");
        if($UI.user.isLoggedIn()) {
            $.fn.log("setting UI to logged in state");
            $("#login_reg").hide();
            $("#login_view").show();
        } else {
            $.fn.log("setting UI to logged off state");
            $("#login_view").hide();
            $("#login_reg").show();
        }
        $("img[src='']").attr("src","/system/includes/noimage150px-translucent.png");
    },


    // Removed Cufon in favor of font-style CSS approach. IE and Opera will use vector-based font.

	// updateGraphicalText: function() {
       
		// if ($.browser.msie)
		// {
		    // // Cufon seems to break in IE...
		// }
		// else
		// {

		  // Cufon.replace(".banner_text:not(.blog .banner_text)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#banner_text h1:not(.blog #banner_text h1)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#banner_text h2:not(.blog #banner_text h2)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#banner_text h3:not(.blog #banner_text h3)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#banner_text h4:not(.blog #banner_text h4)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#banner_text p:not(.blog #banner_text p)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#banner_text li:not(.blog #banner_text li)", {textShadow: '2px 2px rgba(0, 0, 0, 0.3)'});
		  // Cufon.replace("#main h1");
		  // Cufon.replace("#main h2:not(.search_result h2)");
		  // Cufon.replace("#main h3");
		  // Cufon.replace("#sidebar h1");
		  // Cufon.replace("#sidebar h2");
		  // Cufon.replace("#sidebar h3:not(div.taxmenugeo h3)");
		  // Cufon.replace("#newsfeed .selector li");
		  // Cufon.replace(".blog #banner_text h1", {color:'#f0f4f9',fontFamily: 'Bleeding Cowboys',textShadow: '2px 2px rgba(0, 0, 0, 0.5)',letterSpacing:'-1px'});
			
		// }
        // $(".banner_text").css("visibility","visible");
        // $("#banner_text").css("visibility","visible");
        
    // },
	highlightTaxononmyNav: function() {
		var selectedKeyword = $UI.getURLParameter("Keyword");
		if (selectedKeyword)
		{
			var navElement = $("ul#taxnav li a[anchor='" + selectedKeyword + "']");
			if (navElement)
				navElement.addClass("navselected");
		}
	},
	

	getURLParameter: function(name) {
		return decodeURIComponent(
			(location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
		);  
	},
    user: {
        uid: null,
        email: null,
        isLoggedIn: function() {
            var initial = $("#login_view_uid").html();
            var current = $UI.user.uid;
            var result = !$.fn.isNullOrEmpty(initial) || !$.fn.isNullOrEmpty(current);
            return result;
        },
        update:function(id,email) {
            $("#login_view_uid").html(id);
            $UI.user.uid=id;
            $UI.user.email=email;
        }
    }
}


$(document).ready(function () {
	$UI.initialize();
	if (document.getElementById("GoogleMap"))
	{
		initializeMap();
	}
    /* homepage news and events sliders */
    if ($.fn.newsSlider) {
        $("#news").newsSlider({autoStart:7500 });
        $("#rss").newsSlider();
    }
    if ($.fn.eventSlider) {
        $("#events").eventSlider({ addPagination: false, autoStart:9000 });
    }

    /* homepage banner */
    $(".homepage #banner").bannerPanel();

    /* show first tab */
    $(".product #tabs div.tab_container").hide();
    if (location.hash != null && location.hash != '') {
        $(location.hash).show();
        var tabMenu = $("ul#tab_menu");
        $('ul#tab_menu li a[href|="' + location.hash + '"]').parent().addClass("active");
    } else {
        $(".product #tabs div.tab_container:first").show();
        $(".product #tabs ul#tab_menu li:first").addClass("active");
    }

    /* add tab behavior */
    var f1 = $("#footer").position(); 
    if (f1!=null){
         $UIFooterPosition = Math.round($("#footer").position().top);
	}
    $(".product #tabs ul#tab_menu li a").click(function () {
        $(".product #tabs ul#tab_menu li").removeClass("active");
        $(this).parent().addClass("active");
        var current = $(this).attr("href");
        $(".product #tabs div.tab_container").hide();
        $(current).show();
        /* reposition footer */
        var x1 = Math.round($(current).position().top + $(current).height());
        if(x1 > $UIFooterPosition) {
            // cop out:
            $("#footer").hide();
        } else {
            $("#footer").show();
        };
        return false;
    });
    /* switch tabs when commenting */
    var feedback = $(".product #tab-rating .ugc-feedback").text();
    if(feedback && feedback.length > 0)
    {
        $.fn.log("switching to ratings tab");
        $(".product #tabs ul#tab_menu li").removeClass("active");
        $(".product #tabs ul#tab_menu a[href='#tab-rating']").parent().addClass("active");
        $(".product #tabs div.tab_container").hide();
        $(".product #tabs div#tab-rating").show();
    }

    $UI.reflow();

    /* carousels */
    $(".product .carousel").jcarousel({ visible: 4, scroll: 3, wrap: null });

    /* comments widget behavior */
    $(".comments .commenttextbox").focus(function () {
        var $this = $(this);
        $this.addClass("active");
        $(".avatar").show();
        $(".chaptabox").show();
        if ($this.attr("defaulttext") == $this.val()) {
            $this.val("");
        }
    });
    $(".comments .captchatextbox").focus(function () {
        $(this).val("");
    });

    /* product page PDF link in a new window */
    $("#crumbtrail a.pdflink").attr("target", "_blank");

    /* search results */
    $(".interior .search_result_item:nth-child(3n) .container").css("border", "none");
    $(".interior .search_result_item:last .container").css("border", "none");

    /* registration page text fields */
    $("#main input:text").addClass("textfield");
    $("#main input:password").addClass("textfield");
    $(".blog #calendar").datepicker();
    $(".blog #calendar *").removeClass("ui-corner-all");

    /* hide the rss feed on the home page at initial display */
    $(".homepage #rss").css("display", "none");

    /* print link */
    $("a#printlink").click(function () {
        window.print();
        return false;
    });

    /* generic pop-ups */
    $("a.dialog-trigger").each(function () {
        var trigger = $(this);
        var targetid = this.href.substr(this.href.indexOf("#"));
        var target = $(targetid);
        if (target != null) {
            $(trigger).click(function () {
                $(target).dialog({
                    modal: $(trigger).hasClass("dialog-modal"),
                    height: 475,
                    width: 450,
                    draggable: false,
                    resizable: false
                });
                $(".ui-dialog-titlebar", $(target).parent()).click(function () {
                    $(target).dialog("close");
                    $(target).dialog("destroy");
                });
                return false;
            });
        }
    });

    /* hide classification link if no info available */
    if ($("#classification").length == 0) {
        $("p.classify").hide();
    }
    /* hide and show the classification items (currenty only for preview/staging, live still displays the ui-dialog) */
    $("p.classify").toggle(function s() {
        $("div#classification").hide();
    }, function h() {
        $("div#classification").show();
    });

    /* hide and show the Most Popular items */
    $("div#mostPopular h3").toggle(function s() {
        $("div#mostPopular ul.search_result").show();
    }, function h() {
        $("div#mostPopular ul.search_result").hide();
    });

    /* ratings */
    $(".ratings").ratingItem();

    /* geo location */
    $UI.parseJSON("GetGeoLocation", false, {}, function (d) {
        var location = d.City + ", " + d.RegionName;
        var zipcode = d.ZipCode;
        $("#tab-buy #geoip-location").html(location);
        $("#tab-buy input:text").val(zipcode);
    });

    /* claim store dropdown */
    $("select#claimstore-geolocation-options").change(function() {
        var country = $(this).val();
        if(country && country!="")
        {
            $.get("/claimstore.aspx?country="+country,function(){window.location.reload();});
        }
        return false;
    });
});


/* Site Selection */
function OnSiteChange(ListID)
{
    var list = document.getElementById(ListID);
    if(list.selectedIndex > -1)
    {
        var value = list.options[list.selectedIndex].value;
        if(value!="")
        {
            window.location = value;
        }
    }
}
function SwitchNewsTweets(iActive)
{
	var newsli = document.getElementById("newsli");
	var tweetli = document.getElementById("tweetli");
	var newsfeed = document.getElementById("news");
	var rssfeed = document.getElementById("rss");

	if(iActive=="News")
	{
		newsli.className = "selected";
		tweetli.className = "";
		newsfeed.style.display = "";
		rssfeed.style.display = "none";
	}
	else
	{
		newsli.className = "";
		tweetli.className = "selected";
		newsfeed.style.display = "none";
		rssfeed.style.display = "";
	}
	return false;
}

/* search submission */
function SearchSubmit() {
    var searchTerm = $("#searchinput").val();
    window.location.href = "/search.aspx?q=" + searchTerm;
    return false;
}
