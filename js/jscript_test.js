$(document).ready(function(){

/*By default, generatePassBtn and myForm are disabled and script-message is visible (Javascript Disabled)
 *If javascript is enabled, generatePassBtn and myForm are enabled and script-message is hidden 
 *in the function below */				
$(function(){
  	//$('#generatePassBtn').attr('disabled', false);
  	document.getElementById("singlePassBtn").disabled = false;
    document.getElementById("multiplePassBtn").disabled = false;
  	//$('#myForm').attr('hidden', false);
  	document.getElementById("myForm").hidden = false;
  	//$("#script-message").hide();
  	document.getElementById("script-message").hidden = true;
});

});	


				
						

