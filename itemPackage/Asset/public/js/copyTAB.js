var idTmr;
    function  getExplorer() {
    	// 判断浏览器类型及版本
        var explorer = window.navigator.userAgent ;
        //ie 
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //firefox 
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
            return 'Chrome';
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
            return 'Opera';
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
            return 'Safari';
        }
    }
    function method1(tableid) {//整个表格拷贝到EXCEL中
        if(getExplorer()=='ie')
        {
            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");

            //创建AX对象excel 
            var oWB = oXL.Workbooks.Add();
            //获取workbook对象 
            var xlsheet = oWB.Worksheets(1);
            //激活当前sheet 
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            //把表格中的内容移到TextRange中 
            sel.select;
            //全选TextRange中内容 
            sel.execCommand("Copy");
            //复制TextRange中内容  
            xlsheet.Paste();
            //粘贴到活动的EXCEL中       
            oXL.Visible = true;
            //设置excel可见属性

            try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);

                oWB.Close(savechanges = false);
                //xls.visible = false;
                oXL.Quit();
                oXL = null;
                //结束excel进程，退出完成
                idTmr = window.setInterval("Cleanup();", 1);

            }

        }
        else
        {
        	if($(event.target).attr('id').indexOf('2') > -1){
        		tableToExcel('randomTa');
        	}else{
        		tableToExcel('ta');
        	}
            
        }
    }
    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }
    var tableToExcel = (function() {
          	var uri = 'data:application/vnd.ms-excel;base64,',
          	template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) { 
            	var www = window.btoa(unescape(encodeURIComponent(s)));
            	alert(www.length)
          	return  www;
            },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g,
                function(m, p) { return c[p]; })};
	            return function(table, name) {
	            	if (!table.nodeType) table = document.getElementById(table);
	            	var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
	            	//定义一个form表单,解决url字节过长无法访问
	            	var form=$("<form>");
					form.attr("style","display:none");
					form.attr("target","");
					form.attr("method","post");
					form.attr("action","/get/downExcel");
					var input1=$("<input>");
					var input2=$("<input>");
					input1.attr("type","hidden");
					input1.attr("name","excel");
					input1.attr("value",format(template, ctx));
					input2.attr("value",$('#formName').html());
					input2.attr("name","filename");
					$("body").append(form);//将表单放置在web中
					form.append(input1);
					form.append(input2);
					form.submit();//表单提交
	          	}
        })()
