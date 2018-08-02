(function (){
	var init=function(){
		var orderForm=document.forms.order,//通过document.forms.name页面中所有表单通过name,或者通过ID引用
			saveBtn=document.getElementById('saveOrder'),//找到保存按钮
			saveBtnClicked=false;//单击保存按钮
		var saveForm=function(){//保存表单函数
			if(!('formAction' in document.createElement('input'))){//若创建的元素input中没有formAction属性
				var formAction = saveBtn.getAttribute('formaction');//若出现则改变表单的提交去处
				orderForm.setAttribute('action',formAction);//改变的是表单的action属性
			}
			saveBtnClicked=true;
		};
		saveBtn.addEventListener('click',saveForm,false);//保存按钮添加单击监听事件
		var qtyFields=orderForm.quantity,//找到数量输入标签
			totalFields=document.getElementsByClassName('item_total'),//找到所有单个项目总计
			orderTotalField=document.getElementById('order_total');//找到整个订单金额
		var formatMoney=function(value){//表单货币的格式化数值
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
		};
		var calculateTotals=function(){//计算每种产品的总金额,以及整个订单的总金额
			var len=qtyFields.length;
			var	itemQty=0,
				itemPrice=0.00,
				itemTotal=0.00,
				itemTotalMoney='$0.00',
				orderTotal=0.00,
				orderTotalMoney='$0.00';
					for(var i=0;i<len;i++){
						if(!!qtyFields[i].valueAsNumber){
							itemQty=qtyFields[i].valueAsNumber||0;
						}else{
							itemQty=parseFloat(qtyFields[i].value)||0;
						}
						if(!!qtyFields[i].dataset){
							itemPrice=parseFloat(qtyFields[i].dataset.price);
						}else{
							itemPrice=parseFloat(qtyFields[i].getAttribute('data-price'));
						}
						itemTotal=itemQty*itemPrice;
						itemTotalMoney='$'+formatMoney(itemTotal.toFixed(2));
						orderTotal+=itemTotal;
						orderTotalMoney='$'+formatMoney(orderTotal.toFixed(2));
						if(!!totalFields[i].value){
							totalFields[i].value=itemTotalMoney;
							orderTotalField.value=orderTotalMoney;
						}else{
							totalFields[i].innerHTML=itemTotalMoney;
							orderTotalField.innerHTML=orderTotalMoney;
						}
					}
		};
		calculateTotals();
		var qtyListeners=function(){//为事件添加侦听器
			var i=0,
				leng=qtyFields.length;
				for(;i<leng;i++){
					qtyFields[i].addEventListener('input',calculateTotals,false);
					qtyFields[i].addEventListener('keyup',calculateTotals,false);//IE9,input事件并不能侦测退格键与删除键以及剪切操作,所以要绑定keyup事件
				}
		};
		qtyListeners();
		var doCustomValidity=function(field,msg){
			if('setCustomValidity' in field){
				field.setCustomValidity(msg);				
			}else{
				field.validationMessage=msg;				
			}
		};	
		var validateForm=function(){
			doCustomValidity(orderForm.name,'');
			doCustomValidity(orderForm.password,'');
			doCustomValidity(orderForm.confirm_password,'');
			doCustomValidity(orderForm.card_name,'');
			if(orderForm.name.value.length<4){
				doCustomValidity(
					orderForm.name,'Full Name must be at least 4 characters long');
			}
			if(orderForm.password.value.length<8){
				doCustomValidity(
					orderForm.password,'password must be at least 8 characters long');
			}
			if(orderForm.password.value!=orderForm.confirm_password.value){
				doCustomValidity(
					orderForm.confirm_password,'Confirm password must match Password');
			}
			if(orderForm.card_name.value.length<4){
				doCustomValidity(
					orderForm.card_name,'Name on Card must be at least 4 characters long');
			}
		};
		orderForm.addEventListener('input',validateForm,false);
		orderForm.addEventListener('keyup',validateForm,false);
		var styleInvalidForm=function(){
			orderForm.className='invalid';
		}
		orderForm.addEventListener('invalid',styleInvalidForm.true);
	};
	window.addEventListener('load',init,false);
})();