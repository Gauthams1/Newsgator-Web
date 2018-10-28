function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for(let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
$(document).ready(function() {
	$('#remove').remove();
	if($('#rzp-button1').length > 0) {
		var rzp1 = new Razorpay(options);
		$('#rzp-button1').click(function(e) {
			rzp1.open();
			e.preventDefault();
		})
	}
	if("serviceWorker" in navigator) {
		navigator.serviceWorker.register("/sw.js", {
			scope: "/"
		}).then(function(reg) {}).catch(function(err) {})
	}
	navigator.serviceWorker.ready.then(function(reg) {
		reg.pushManager.getSubscription().then(function(subscription) {
			if(subscription !== null && (user.status == false)) {
				subscription.unsubscribe().then(function(successful) {
					console.log("unsubscribe");
				}).catch(function(e) {})
			} else if(user.status == true && subscription == null) {
				return reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: new urlBase64ToUint8Array("BDZTGzgyvbNav5NOqJR6XXKHd7XqWTjg0vFRFQKbS-aJsEbO7ArWegYDNsaRvOf3MTEMruOLD0pui5R-KOEsMj8")
				}).then(function(subscription) {
					console.log(subscription);
					$.post('/notification', {
						subscription: JSON.stringify(subscription)
					})
				})
			}
		})
	});

	// $.get('https://ip-api.com/json', function(data) {})

if(typeof pvalue!=="undefined")
{	var showmat=[],showvar=[];
	$('#'+pvalue).show();
	showmat.push(pvalue.split("-")[0]);
	showvar.push(pvalue);}
	$("#reset").click(function(){
		$(".reset").hide();
			$('#'+pvalue).show();
		$(".reset select").prop('selectedIndex',0).prop('disabled', !true);
		showmat=[];showvar=[];showmat.push(pvalue.split("-")[0]);
		$('#plans')[0].value=""

		showvar.push(pvalue);
	})
	$('select[name=s]').change(function() {
			$(this).prop('disabled', true);
			var param=this.value.split("#")[0];
			var index=showmat.indexOf(param.split("-")[0])
			if(index>=0)
			{	$("#"+showvar[index]).hide()
				showmat.splice(index,1)
				showvar.splice(index,1)
			}
			showmat.push(param.split("-")[0])
			showvar.push(param)
			$("#"+param).show();
				var inputval=[];
				var price=parseInt($('input[name=price]')[0].value);
			for (var i = 0; i < showvar.length-1; i++) {
				var addvalues=$("#"+showvar[i]+" select")[0].value.split("#");
				inputval.push({name:addvalues[1],price:addvalues[2],exclusive:addvalues[3]=="true"?true:false,time:addvalues[4],minutes:addvalues[5]=="true"?true:false,plan:parseInt(addvalues[0].split("-")[0])-1+"-"+addvalues[0].split("-")[1]})
				price+=parseInt(addvalues[2])
			}
			$('input[name=planprice]')[0].value=price
			console.log(inputval);
			$('#plans')[0].value=JSON.stringify(inputval)
	})
	$('#updatetotal').click(function(){
		var price=0,plans=[]//parseInt($('#price')[0].value)
		for (var i = 0; i < showvar.length; i++) {
			price+=parseInt($("#"+showvar[i]+" select")[0]?($("#"+showvar[i]+" select")[0].value.split("#")[1]):0)
			 plans.push($("#"+showvar[i]+" select")[0]?(showvar[i].split("-")[0]+"%"+$("#"+showvar[i]+" select")[0].value.split("#")[0].split("-")[1]):"")

		}
			$('#amount').html('&#8377;' + price);
	 	$('#tamount').html('&#8377;' + price);
		options.amount = price*100;
		options.handler=function (response){
					window.location="/cart/cartcheckout?id="+response.razorpay_payment_id+"&plan="+plans.join("-")
				}
			rzp1 = new Razorpay(options);
	})
$("a").hover( hoverVideo, hideVideo );
	function hoverVideo(e) {if($(this).find('video')[0])$(this).find('video')[0].play()}
	function hideVideo(e) {if($(this).find('video')[0])$(this).find('video')[0].pause()}
	$("nav a").hover( function(e){
			$(this).css("color","#5cbc5f").css("text-decoration","underline")
	}, function(e){
			$(this).css("color","white").css("text-decoration","none")
	} );
var scrollmode=true;
	$(window).scroll(function(e) {
		var scrolltop= $(this).scrollTop();
					if(scrolltop>400&&scrollmode)
					{scrollmode=false
						$('.newsgator-top').velocity({ opacity:0},{duration: 100 ,display:"none"});
						$('#top-search-bar').velocity({opacity:1},{delay: 100,duration: 200 ,display:"block"});
					}
					if(scrolltop<400&&!scrollmode) {
						scrollmode=true
							$('#top-search-bar').velocity({ opacity:0},{display:"none"});
							$('.newsgator-top').velocity({opacity:1},{display:"block"});
					}
    });
})
