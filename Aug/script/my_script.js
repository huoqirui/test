$(function(){
		// $('.wrap div').click(function(){
		// 	//$('.box p').remove();//所以p元素都会被删除仅显示当前点击元素的折扣价
		// 	discount=Math.floor(Math.random()*5+5);
		// 	discount_msg='<p>Your discount is '+discount+"%"+"</p>";
		// 	$(this).append(discount_msg);
		// 	$('.box').each(function(){
		// 		$(this).unbind('click');//只是让当前元素只能点击一次显示随机折扣
		// 	});
			
		// });
		//单击.box类元素调用这个函数
		$('.box').click(checkForCode);
		//随机数生成器函数
		function getRandom(num){
			var my_num=Math.floor(Math.random()*num);
			return my_num;
		}
		//隐藏折扣变量
		var hideCode=function(){
			var numRand=getRandom(4);
			$('.box').each(function(index,value){
				if(numRand==index){
					$(this).append("<span id='has_discount'></span>");
					return false;
				}
			});
		};
		hideCode();
		function checkForCode(){
			var discount;
			if($.contains(this,document.getElementById("has_discount"))){
				var my_num=getRandom(100)+1;
				discount="<p>Your Code:CODE"+my_num+"</p>";
			}else{
				discount="<p>Sorry,no discount this time!</p>";
			}
			$('.box').each(function(){
				if($.contains(this,document.getElementById('has_discount'))){
					$(this).addClass('discount');
				}else{
					$(this).addClass('no_discount');
				}
				$(this).unbind();
			});
			$('#result').append(discount);
			// $(this).append(discount);
			// $('.box').each(function(){
			// 	$(this).unbind('click');
			// });
		}
		$('.box').hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
});