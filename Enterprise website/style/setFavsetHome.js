//设为首页
function setHome(url){
	if(document.all){
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage(url);
	}else{
		alert("您好,您的页面不支持设置页面为首页的功能,请您手动在浏览器里设置该页面是首页");
	}
}
//加入收藏夹
function AddFavorite(sURL,sTile){
	sURL=encodeURI(sURL);
	try{
		window.external.addFavorite(sURL,sTile);
	}
	catch(e){
		try{
			window.sidebar.addPanel(sTitle,sURL,"")
		}
		catch(e){
			alert("加入收藏夹失败,请使用Ctrl+D添加,或手动在浏览器里设置.")
		}
	}
}