var mndFileds=new Array('First Name','Last Name','Email');
var fldLangVal=new Array('Nombre','Apellidos','Correo electrónico'); 
var name='';
var email='';

function checkMandatory4294441000000967099() {
for(i=0;i<mndFileds.length;i++) {
var fieldObj=document.forms['WebToLeads4294441000000967099'][mndFileds[i]];
if(fieldObj) {
if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
 if(fieldObj.type =='file')
	{ 
	 alert('Seleccione un archivo para cargar.'); 
	 fieldObj.focus(); 
	 return false;
	} 
alert(fldLangVal[i] +' no puede estar vacío.'); 
	  	  fieldObj.focus();
	  	  return false;
}  else if(fieldObj.nodeName=='SELECT') {
	   	 if(fieldObj.options[fieldObj.selectedIndex].value=='-None-') {
	alert(fldLangVal[i] +' no puede ser nulo.'); 
	fieldObj.focus();
	return false;
   }
} else if(fieldObj.type =='checkbox'){
	 	 if(fieldObj.checked == false){
	alert('Please accept  '+fldLangVal[i]);
	fieldObj.focus();
	return false;
   } 
 } 
 try {
     if(fieldObj.name == 'Last Name') {
	name = fieldObj.value;
	 	    }
} catch (e) {}
}
}
trackVisitor();
document.getElementById('formsubmit').disabled=true;
}

var $zoho= $zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:'e13e7ef3f4af5cd27c60d13dec5d860b6fa64fe3288d629daa8f877671895187475223dcdd4a7503e16043becf9b8b17', values:{},ready:function(){$zoho.salesiq.floatbutton.visible('hide');}};var d=document;s=d.createElement('script');s.type='text/javascript';s.id='zsiqscript';s.defer=true;s.src='https://salesiq.zoho.com/widget';t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);function trackVisitor(){try{if($zoho){var LDTuvidObj = document.forms['WebToLeads4294441000000967099']['LDTuvid'];if(LDTuvidObj){LDTuvidObj.value = $zoho.salesiq.visitor.uniqueid();}var firstnameObj = document.forms['WebToLeads4294441000000967099']['First Name'];if(firstnameObj){name = firstnameObj.value +' '+name;}$zoho.salesiq.visitor.name(name);var emailObj = document.forms['WebToLeads4294441000000967099']['Email'];if(emailObj){email = emailObj.value;$zoho.salesiq.visitor.email(email);}}} catch(e){}}