$(document).ready(function(){
    var showmat=[],showvar=[];
    if(typeof pvalue==undefined)
  {$('#'+pvalue).show();
  showmat.push(pvalue.split("-")[0]);
  showvar.push(pvalue);}
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
      console.log(showvar[showvar.length-1]);
      var result=plans.find(function(e){
        var comparev=showvar[showvar.length-2].split('-');
        return e._id.connectindex== comparev[1]&&e._id.level== comparev[0];
      })
       result=result.doc.find(function(e){
         var comparev=showvar[showvar.length-1].split('-');
         return e.next== comparev[0]&&e.index== comparev[1];
       })
       console.log(result);
       $('#next')[0].value=result.next;
       $('#index')[0].value=result.index;
       $('#amount')[0].value=result.amount;

  })
$.get('http://ip-api.com/json', function(data) {
  if($('#location')[0])
  $('#location')[0].value=data.as+","+data.city+","+data.regionName+","+data.country;
})

  if(typeof initCalendar!=="undefined")
  initCalendar();
if($('#nestable')[0])
  $('#nestable').nestable({
		group: 0
	})

})
