
            
            var formData = location.search;
             formData = formData.substring(1, formData.length - 1 );
             while (formData.indexOf("+") !== -1) {
                formData = formData.replace("+", " ");
             }
             formData = decodeURIComponent(formData);
             var uname=" ";
             var formArray = formData.split("&");
             for (var i = 0; i < formArray.length - 2; i = i + 1) {

                var indx = formArray[i].indexOf('=');
                var str = formArray[i].substring(indx + 1, formArray[i].length);
                  uname = uname + " "+str ;

                
             }
             document.write("<p>" + uname + "<br><br>" + " Your Registration has been Completed" + "</p>");

document.write(new Date().toLocaleString());





