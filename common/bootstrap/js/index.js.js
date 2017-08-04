$(document).ready(function(e) {
			$(".nav-menu-drop,.menu-content").on("mouseover mouseout",function(e){
				if(e.type == "mouseover"){
					$('.menu-content',$(this)).addClass("open");
				}else if(e.type == "mouseout"){
					$('.menu-content',$(this)).removeClass("open");
				}
				
			});
		    var unslider04 = $('#b04').unslider({
				dots: true
			}),
			data04 = unslider04.data('unslider');
			
			$('.unslider-arrow04').click(function() {
		        var fn = this.className.split(' ')[1];
		        data04[fn]();
		    });
		});