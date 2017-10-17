/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-xian-abnormal': '&#xe946;',
		'icon-remove': '&#xe942;',
		'icon-In': '&#xe943;',
		'icon-networking': '&#xe944;',
		'icon-edit': '&#xe91a;',
		'icon-play': '&#xe92e;',
		'icon-Plan': '&#xe930;',
		'icon-Role-management': '&#xe945;',
		'icon-screenshot': '&#xe931;',
		'icon-task': '&#xe932;',
		'icon-quality': '&#xe933;',
		'icon-time': '&#xe934;',
		'icon-Stop': '&#xe935;',
		'icon-random': '&#xe936;',
		'icon-Sign-out': '&#xe937;',
		'icon-Property': '&#xe938;',
		'icon-PropertyA': '&#xe939;',
		'icon-PropertyB': '&#xe93a;',
		'icon-password': '&#xe93b;',
		'icon-Key': '&#xe93c;',
		'icon-R-carousel': '&#xe93d;',
		'icon-suspend': '&#xe93e;',
		'icon-Capture': '&#xe93f;',
		'icon-Capture-failure': '&#xe940;',
		'icon-L-Carousel': '&#xe941;',
		'icon-LOGO': '&#xe900;',
		'icon-biaoji': '&#xe901;',
		'icon-Parameter-setting': '&#xe902;',
		'icon-export': '&#xe903;',
		'icon-Data-export': '&#xe904;',
		'icon-Import': '&#xe905;',
		'icon-address': '&#xe906;',
		'icon-phone': '&#xe907;',
		'icon-locatio': '&#xe908;',
		'icon-delete1': '&#xe909;',
		'icon-Statement': '&#xe90a;',
		'icon-back': '&#xe90b;',
		'icon-remind': '&#xe90c;',
		'icon-more': '&#xe90d;',
		'icon-delete2': '&#xe90e;',
		'icon-delete-label': '&#xe90f;',
		'icon-guoqi': '&#xe910;',
		'icon-report-form': '&#xe911;',
		'icon-kaoqin': '&#xe912;',
		'icon-Configuration': '&#xe913;',
		'icon-Platform-access': '&#xe914;',
		'icon-empty': '&#xe915;',
		'icon-qingkong': '&#xe916;',
		'icon-Journal': '&#xe917;',
		'icon-delete3': '&#xe918;',
		'icon-search': '&#xe919;',
		'icon-fengxian': '&#xe91b;',
		'icon-tiaozhuan': '&#xe91c;',
		'icon-tingchechang': '&#xe91d;',
		'icon-Statistical-center': '&#xe91e;',
		'icon-tuli': '&#xe91f;',
		'icon-box-Icon': '&#xe920;',
		'icon-download2': '&#xe921;',
		'icon-download': '&#xe922;',
		'icon-new-add': '&#xe923;',
		'icon-error': '&#xe924;',
		'icon-yichang': '&#xe925;',
		'icon-abnormal': '&#xe926;',
		'icon-application': '&#xe927;',
		'icon-user': '&#xe928;',
		'icon-user-management': '&#xe929;',
		'icon-on-line': '&#xe92a;',
		'icon-up-down': '&#xe92b;',
		'icon-add-to': '&#xe92c;',
		'icon-Warning': '&#xe92d;',
		'icon-normal': '&#xe92f;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
