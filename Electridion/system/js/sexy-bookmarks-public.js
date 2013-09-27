jQuery(document).ready(function() {

	// xhtml 1.0 strict way of using target _blank
	jQuery('.sexy-bookmarks a.external').attr("target", "_blank");

	// this block sets the auto vertical expand when there are more than 
	// one row of bookmarks.
	var sexyBaseHeight=jQuery('.sexy-bookmarks').height();
	var sexyFullHeight=jQuery('.sexy-bookmarks ul.socials').height();
	if (sexyFullHeight>sexyBaseHeight) {
		jQuery('.sexy-bookmarks-expand').hover(
			function() {
				jQuery(this).animate({
						height: sexyFullHeight+'px'
				}, {duration: 400, queue: false});
			},
			function() {
				jQuery(this).animate({
						height: sexyBaseHeight+'px'
				}, {duration: 400, queue: false});
			}
		);
	}
	// autocentering
	if (jQuery('.sexy-bookmarks-center') || jQuery('.sexy-bookmarks-spaced')) {
		var sexyFullWidth=jQuery('.sexy-bookmarks').width();
		var sexyBookmarkWidth=jQuery('.sexy-bookmarks:first ul.socials li').width();
		var sexyBookmarkCount=jQuery('.sexy-bookmarks:first ul.socials li').length;
		var numPerRow=Math.floor(sexyFullWidth/sexyBookmarkWidth);
		var sexyRowWidth=Math.min(numPerRow, sexyBookmarkCount)*sexyBookmarkWidth;
		
		if (jQuery('.sexy-bookmarks-spaced').length>0) {
			var sexyLeftMargin=Math.floor((sexyFullWidth-sexyRowWidth)/(Math.min(numPerRow, sexyBookmarkCount)+1));
			jQuery('.sexy-bookmarks ul.socials li').css('margin-left', sexyLeftMargin+'px');
		} else if (jQuery('.sexy-bookmarks-center'.length>0)) {
			var sexyLeftMargin=(sexyFullWidth-sexyRowWidth)/2;
			jQuery('.sexy-bookmarks-center').css('margin-left', sexyLeftMargin+'px');
		}
		
	}
});