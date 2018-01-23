;(function(){
	//定义全局变量
	var car_brand, 	// 品牌
		car_make = [], 	// 车辆制造商
		car_style = [], 	// 车型
		applyStatus, // 申请状态
		contactStatus, // 合同状态
		storeProv, // 店面省份
		carType,  // 车辆类型
		specialType, // 特殊车型
		busiType, // 业务类型
		rentProp, // 租赁属性
		channelFirst, // 客户渠道一级科目
		channelSec, // 客户渠道二级科目
		cooperateFir, // 合作渠道一级科目 
		discount, // 贴息类型 
		finceLim, // 融资期限
		isFince, // 是否融保险
		project_type_data, // 项目类型
		project_type_arr = [],  //项目类型
		project_belong_id, // 所属项目id
		project_belong_nm, // 所属项目name
		project_belong_data_id, // 所属项目id
		project_belong_data_nm, // 所属项目name
		project_belong_arr = [], // 所属项目
		company_str,// 所属公司
		company_arr,  // 所属公司
		area_arr, // 大区
		areArr_qc = [],  // 定义片区去重数组变量
		branch_office_qc = [], // 分公司去重数组变量
		//prov_arr, //片区
		//subCom_arr, // 分公司
		prjBlgsToData_len,// 项目类型及所属项目的数据的length
		prjBlgsToData, // 项目类型及所属项目的数据
		dealDetail_param = {
				apply_no: '', //申请编号
				apply_sts: '', // 申请状态
				strApplyDt: '', // 申请日期-- 开始
				endApplyDt: '', //申请日期 -- 结束
				contract_no: '', //合同号
				contr_sts: '', // 合同状态
				strEffDt: '', // 合同生效日期 --- 开始
				endEffDt: '' , // 合同生效日期 --- 结束
				cust_name: '', // 客户名称
				store_province: '', // 店面省份
				strConCle: '', // 合同结清日期 -- 开始
				endConCle: '', // 合同结清日期 -- 结束
				vin_no: '', // 车架号
				strCancel: '', // 合同取消日期 -- 开始 
				endCancel: '', // 合同取消日期 -- 结束
				blngs_comp: '', // 所属公司
				region_name: '', // 大区
				area_name: '', // 片区
				branch_company: '', // 分公司
				service_type: '', // 业务类型
				rent_type: '', // 租赁属性
				prjc_type: '', // 项目类型
				blngs_prjc: '', // 所属项目
				quote_store_name: '', // 店面名称
				customer_channel_one: '', // 客户渠道一级科目
				customer_channel: '', // 客户渠道二级科目
				cooperat_channel: '', // 合作渠道一级科目
				brand: '', // 品牌
				manufac_id: '', // 车辆制造商
				models: '', // 车型
				car_type: '', // 车辆类型
				spec_models: '', // 特殊车型
				product_no: '', //产品编号
				product_name: '', // 产品方案名称
				gps_price_type: '', // GPS价格类型
				discount_type: '', // 贴息类型
				finance_period: '', // 融资期限
				is_risk: '', // 是否融保险
				strRate: '', // 结算利率 -- 开始
				endRate: '', // 结算利率 -- 结束
				strFirPay: '',  // 首付比例 -- 开始 
				endFirPay: '', // 首付比例 -- 结束
				strfancAmt: '',  // 融资额 -- 开始 
				endfancAmt: '', // 融资额 -- 结束 
				pageNo: "1", // 页码
				pageSize: "10" // 页大小
		},
		tableData = [], // 表格数据
		initColumns, // table header
		selected_res_arr = [], // 导出下载弹层  的
		selected_res_nm = [], // 导出下载弹层  的选中name
		selected_res_id = [], // 导出下载弹层  的选中name
	// 查询表格 参数
		cust_name,
		storeNum, // 存储编码
		maxPage; // 自定义页码 最大页码
		
	//定义全局方法
	var unique1, // 数组去重
		getinitData,//初始化按条件查询
		getMaxMinTime, // 获取最大最小时间 
		initTable, //初始化 表格
		initTableData, 
		show_more,//显示更多;
		initMethod, //元素触发事件及调用方法
		onClickToShowModal, // 成交明细 - 生成模板
		initselData, // 加载下拉数据 （ 车型选择 - 品牌 -车辆制造商 - 车型 ）
		clickToSel, // （车型选择 - 品牌 -车辆制造商 - 车型 ）三级联动
		exportModal, // 导出弹层
		changeData, // （车型选择 - 品牌 -车辆制造商 - 车型 ）三级联动
		getComSubCom, // 获取所属公司，大区，片区，分公司四级联动
		getPrjBlgsTo, // 获取 ‘项目类型 及所属项目’ 的下拉列表数据
		clickTo_operat_dep, // 所属公司，大区，片区，分公司四级联动
		changeOperat_dep,  // 所属公司，大区，片区，分公司四级联动
		resetData, //select,input 重置
		sizeCompar, // 结算利率首付比例输入值大小比较
		isExport, // 初始化 查询用户是否 有导出表格的权限 
		getdealDetail, // 查询成交明细
		queryTempleNm, // 查询当前用户的模板
		branch_officeArr_str, // 全局分公司变量   -- 切大区分公司初始化  
		areArr_str, // 片区
		clickExport,//导出方法
		exCel_Data; // 导出
	// 数组去重
	unique1 = function(arr){
		 var tmpArr = [];
		 for(var i=0; i<arr.length; i++){
		  // 如果当前数组的第i已经保存进了临时数组，那么跳过，
		  // 否则把当前项push到临时数组里面
		  if(tmpArr.indexOf(arr[i]) === -1){
		   tmpArr.push(arr[i]);
		  }
		 }
		 return tmpArr;
	};
 
	//加载表格 参数获取
	initMethod = function(){
		//$.createLoading(); // 初始化loading
		$("#entry_details_bottom").hide();
		$("#query").attr("disabled",true);
		isExport(); // 初始化 查询用户是否 有导出表格的权限
		getinitData(); //初始化按条件查询
		getMaxMinTime();// 获取最大最小时间
		getComSubCom(); // 获取所属公司，大区，片区，分公司四级联动
		getPrjBlgsTo(); // 初始化项目
		queryTempleNm(); // 查询当前用户的模板
		$(document).delegate("#show_more_btn","click", show_more)
				   .delegate("#build_template","click",onClickToShowModal)
				   .delegate("#createModal_quxiao","click",hideModal)
				   .delegate("#export","click",exportModal)
				   .delegate("#export_quxiao,#close","click",hide_exportModal)
				   .delegate(".header_selection li","click",select_header)
				   .delegate(".carType_select","change",clickToSel)
				   .delegate(".operating_dep","change",clickTo_operat_dep)
				   .delegate("#query",'click',getdealDetail)
				   .delegate("#reset","click",resetData)
				   //.delegate(".sizeCompar","blur",sizeCompar)
				   .delegate(".emptyDate","change",emptyDate)
				   .delegate(".delete_lab_qx","click",delete_qx)
				 //已选条件
				   .delegate(".sel_length","change",inpChange)// input change
				   .delegate(".selectpicker","change", function(){selChange($(this));}) // select change 
				   .delegate(".two_input","change",two_inputChange) // two_input change
				   .delegate(".delete_lab","click",deleteLab)
				   .delegate("#saveModal,.remove_template,.tem_sp","click",editModal)
				   //.delegate(".pagebody_top input[type ='radio']","click",trim)
				   //.delegate(".custom_num","change",maxPage_limit)
				   .delegate("#export_save","click",clickExport)
					
					
	};
	queryTempleNm = function(){
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/queryTempleNm.koala',
			dataType:'json',
			success:function(tmp_nm){
				var tmp_nmData = tmp_nm.data;
				$.each(tmp_nmData,function(i,item){
					$("#template_sp").append('<span class="tem_sp" data-id="query_temp"><i>'+ item +'</i><b class="remove_template" data-id="del_template">×</b></span>');
				})
				
			}
		});
	};
	/*maxPage_limit = function(){
		//console.log($(this))
		//var $this_val = $(this).val().trim();
		delete dealDetail_param.pageNo;
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getTotal.koala',
			dataType:'json',
			data:dealDetail_param,
			success:function(litmit_data){
					maxPage = litmit_data.data.maxPage;
				console.log(maxPage)
				if(parseFloat($this_val) > parseFloat(maxPage)){
					$("#limitPage_msg").fadeIn("fast").text("最大页码不能大于总页码，请重新输入");
					return false;
				}else{
					$("#limitPage_msg").hide();
				}
			}
		})
		
	};*/
	isExport = function(){
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/isExport.koala',
			dataType:'json',
			success:function(isExport_data){
				console.log(isExport_data.data)
				if(isExport_data.data + '' === '1'){
					$("#entry_details_bottom button").show();
				}else if(isExport_data.data + '' === '0'){
					$("#entry_details_bottom button").hide();
				}
			}
		});
	};
	expMod_radio = function(rid){
		console.log($(rid))
		var $this_val_radio = $(rid).val();
		console.log($this_val_radio)
		$(".custom_num").attr("disabled",true);
		if($this_val_radio === '自定义'){
			$(".custom_num").attr("disabled",false);
			$("#excel_msg").hide();
			$("#qx_msg").hide();
		}else if($this_val_radio === '当前页'){
			$("#limitPage_msg").hide();
			$("#excel_msg").hide();
			$("#qx_msg").hide();
			$(".custom_num").val("");
			$(".custom_num").attr("disabled",true);
		}else{
			$("#limitPage_msg").hide();
			$("#qx_msg").hide();
			$(".custom_num").val("");
			$(".custom_num").attr("disabled",true);
			
		}
	};
	editModal = function(event){
		event.stopPropagation();//阻止冒泡 
		var $this = $(this),
			methodOver,
			modal_nm,
			modal_datas,
			requestFuc = function(){
			$.ajax({
				type:'post',
				url:'/pm/dealDetail/editTemplate.koala',
				dataType:'json',
				data:{
					tmplt_name:modal_nm,
					methodOver:methodOver,
					tempJson : JSON.stringify(modal_datas)
				},
				success:function(temp_data){
					console.log(temp_data)
					switch($this_id){
						case 'saveModal': // 新增保存模板
							if(temp_data.data === 'success'){
								$("#template_sp").append('<span class="tem_sp" data-id="query_temp"><i>'+ modal_nm +'</i><b class="remove_template" data-id="del_template">×</b></span>');
								$("#createModal_quxiao").click(); // 关闭弹窗
							}else if(temp_data.data === 'overLimit'){   // 最多只能保存5个模板
								//$.showMsgbox(false, "抱歉，您最多只能保存5个模板！当前已达上限，该模板未保存成功！");
								$("#myModalFail").addClass("in").css({"display":"block"});
							}else if(temp_data.data === 'exists'){
								 $("#myModalExit").addClass("in").css({"display":"block"});
								//$.showMsgbox(false, "您输入的模板名称已存在，请重新输入！");
							}else if(temp_data.data === 'failure'){
								$.showMsgbox(false, "操作失败！");
							}
							break;
						case 'del_template': // 删除模板	
								if(temp_data.data === 'success'){
									$this.parent().remove();
									$.showMsgbox(true, '删除成功');
									$("#reset").click();
								}else if(temp_data.data === 'failure'){
									$.showMsgbox(false, '删除失败');
								}
							break;
						case 'query_temp' :  // 查询模板
							if(temp_data.data){
								var useModalData = JSON.parse(temp_data.data);
								$(".template_content").find(".selected_condition_con").html(""); // 清空原来的内容
										var tep_Tit = $(".template_content").find(".template_title"),// 已选条件下的 左边大标题
											all_Tit = $("#entry_details_top .contract_title"); // 所有大标题
										//模板内容 在‘已选条件’中的渲染
										$.each(tep_Tit,function(){
											var tep_Tit_txt = $(this).text().trim(),
												tep_Tit_conObj = useModalData[tep_Tit_txt], // 接口中模板内容
												tem_content = '',
												has_show;
											for(var v in tep_Tit_conObj){
												if(tep_Tit_conObj[v]&&tep_Tit_conObj[v] !==","&& tep_Tit_conObj[v] !=='不限'){
												/*if("申请日期,合同生效日期,合同取消日期,合同结清日期,结算利率,首付比例,融资金额".indexOf(v)>=0){
													//if(tep_Tit_conObj[v])
		        									tep_Tit_conObj[v] = tep_Tit_conObj[v].replace(",","至");
											//('<span class="title_l">'+ changeSel_title +'</span><span>-</span><span data-con="s" class="title_r">不限</span><span> 至 </span><span data-con="e" class="end">'+ (twoInp_con ==="NaN%"?"不限":twoInp_con) +'</span>')		
		        								}else{
		        									tep_Tit_conObj[v] = tep_Tit_conObj[v].replace(/\,/g,"/");
		        								}*/
												var val_len = tep_Tit_conObj[v].length;
												console.log(val_len);
												if(val_len <22){ // 内容长度
													if(!has_show){
														if("申请日期,合同生效日期,合同取消日期,合同结清日期,结算利率,首付比例,融资金额".indexOf(v)>=0){
															var obj_V = tep_Tit_conObj[v].split(",");
															tem_content += '<span class="title_l">'+ v +'</span><span>-</span><span data-con="s" class="title_r">'+ (obj_V[0] === ''?'不限':obj_V[0]) +'</span><span> 至 </span><span data-con="e" class="end">'+ (obj_V[1] === ''?'不限':obj_V[1]) +'</span>'
														}else{
															tep_Tit_conObj[v] = tep_Tit_conObj[v].replace(/\,/g,"/");
															tem_content += '<span class="title_l">'+ v +'</span><span>-</span><span class="title_r">'+ tep_Tit_conObj[v] +'</span>';
														}
														has_show = true;
													}else{
														if("申请日期,合同生效日期,合同取消日期,合同结清日期,结算利率,首付比例,融资金额".indexOf(v)>=0){
															var obj_V = tep_Tit_conObj[v].split(",");
															tem_content += '<span>,</span><span class="title_l">'+ v +'</span><span>-</span><span data-con="s" class="title_r">'+ (obj_V[0] === ''?'不限':obj_V[0]) +'</span><span> 至 </span><span data-con="e" class="end">'+ (obj_V[1] === ''?'不限':obj_V[1]) +'</span>'
														}else{
															tep_Tit_conObj[v] = tep_Tit_conObj[v].replace(/\,/g,"/");
															tem_content += '<span>,</span><span class="title_l">'+ v +'</span><span>-</span><span class="title_r">'+ tep_Tit_conObj[v] +'</span>';
														}
													}
												}else{
													tep_Tit_conObj[v] = tep_Tit_conObj[v].replace(/\,/g,"/");
													if(!has_show){
														tem_content += '<span class="title_l">'+ v +'</span><span>-</span><span class="title_r">'+ tep_Tit_conObj[v].substr(0,21)+'...</span>';
														has_show = true;
													}else{
														tem_content += '<span>,</span><span class="title_l">'+ v +'</span><span>-</span><span class="title_r">'+ tep_Tit_conObj[v].substr(0,21)+'...</span>';
													}
												}
											}
											}
											if(tem_content){
												$(this).show();
												$(this).next().append(tem_content);
											}else{
												$(this).hide();
											}
										});
										// 模板内容页面渲染
										$.each(all_Tit,function(){
											var all_Tit_txt = $(this).text().trim(),
												all_Tit_con = $(this).parent().find(".col-xs-4");
											$.each(all_Tit_con,function(){ // top content
												var all_Tit_con_lab = $(this).children("label").text().trim(), // key
													all_Tit_con_val = useModalData[all_Tit_txt][all_Tit_con_lab]; // val
													console.log(all_Tit_con_val);
													all_Tit_con_val = all_Tit_con_val.replace('至', ',');
													all_Tit_con_val_arr = all_Tit_con_val.split(",");
													if($(this).children().last().is("input") || $(this).children().last().is("span")){ //input
														if($(this).children().last().prev().is("input") || $(this).children().last().prev().is("span")){ // 两个input
															//var all_Tit_con_val_arr = all_Tit_con_val.split(",");
															if($(this).children().length>=5){ //两个input非日期
																if(all_Tit_con_lab == '结算利率' || all_Tit_con_lab === '首付比例' || all_Tit_con_lab === '融资金额'){
																	$(this).children().next().val(all_Tit_con_val_arr[0].substr(0,all_Tit_con_val_arr[0].length-1));
																	$(this).children().last().prev().val(all_Tit_con_val_arr[1].substr(0,all_Tit_con_val_arr[1].length-1));
																}else{
																	$(this).children().next().val(all_Tit_con_val_arr[0]);
																	$(this).children().last().prev().val(all_Tit_con_val_arr[1]);
																}
															}else{
																$(this).children().last().prev().val(all_Tit_con_val_arr[0]);
																$(this).children().last().val(all_Tit_con_val_arr[1]);
															}
														}else{
															$(this).children().last().val(all_Tit_con_val);
														}
													}else{ // selsect
														var all_Tit_con_sel = $(this).children("select"),
															all_Tit_con_sel_li = $(this).children().last().find("li");
														$.each(all_Tit_con_sel_li,function(){
															all_Tit_sel_txt = $(this).text().trim();
															all_Tit_con_val = all_Tit_con_val.replace('/ ', ',');
							                				if(all_Tit_con_val.indexOf(all_Tit_sel_txt)>=0){
				                            					$(this).addClass("selected")
				                            				}else{
				                            					$(this).removeClass("selected")
				                            				}
														})
														$(this).children().last().find("span:eq(0)").text(all_Tit_con_val)
													}
											})
										}); // 以上为  模板内容页面渲染
							break;
						}
					}				
				}
			})
		};
		var $this_id = $(this).attr("data-id");
		switch($this_id){
			case 'saveModal': // 新增保存模板
				modal_nm = $("#modalName").val().trim(); // 模板名称
				modal_datas = {};
				modal_datas_Arr = [];
				var all_titleL = $("#entry_details_top .contract_title"); // 所有大标题
				$.each(all_titleL,function(i,items){
					var $_this = $(this);
					var title = $_this.text().trim();
					modal_datas[title] = {};
					$(this).parent().find(".col-xs-4").each(function(){
						var lab = $(this).children("label").text().trim(), // key
            				val; // 两种情况   input或select // val
						if($(this).children("label").next().is("input")){
							if($(this).children().last().prev().is("input")){ // 两个input
								var s_e_val = $(this).children("input");
								var s_dom = s_e_val[0],
									e_dom = s_e_val[1],
									s_val = $(s_dom).val(), // s_Val
									e_val = $(e_dom).val(); // e_Val
								if(lab === '结算利率' || lab === '首付比例'){
									if(s_val && e_val){
										val = s_val+'%' + "," + e_val+'%';
									}else{
										val = s_val + "," + e_val;
									}
									}else if(lab === '融资金额'){
										if(s_val && e_val){
										val = s_val+'元' + "," + e_val+'元';
										}else{
											val = s_val + "," + e_val;
										}
									}else{
									val = s_val + "," + e_val;
								}
							}else{
								val = $(this).children().last().val().trim(); // input
							}
							
						}else{
							//val = $(this).children().last().children("button").attr("title"); // select
							val = $(this).children().last().children("button").find(".filter-option").text().trim(); // select
						}
						modal_datas[title][lab] = val;
						
					})
					//modal_datas_Arr.push(modal_datas)
				})
				methodOver = 'save';
				if(modal_nm !== ""){
					requestFuc();
				}else{
					//$.showMsgbox(false, "请输入模板名称！");
					$("#myModalWarn").addClass("in").css({display:"block"});
					$("#myModalWarn").find(".content").html("模板名称不能为空！");
				}
				break;
			case 'del_template': // 删除模板
				methodOver = 'delete';
				modal_nm = $(this).parent().find("i").text();
				modal_datas = '';
				$.delModal('删除模板', requestFuc);
				$("#delModal .modal-dialog .modal-content .modal-header").css("display","none");
				break;
			case 'query_temp' : // 查询模板
				methodOver = 'query';
				modal_nm = $(this).find("i").text();
				modal_datas = '';
				$(this).addClass("current").siblings().removeClass("current");
				requestFuc()
				break;
		}		
	};
	deleteLab = function(){
		$this = $(this);
		var $this_val = $this.prev().text(); // 选中结果的值
		var checkbox = $('input[type=checkbox][cnvalue="'+$this_val+'"]');
		if(checkbox.length > 0){
			checkbox.click();
		}else{
			$this.parent().remove();
		}
	};
	delete_qx = function(){
		$this_qx = $(this);
		$("input[name='qx']").click();
		$(".delete_lab_qx").parent().remove();
		//initCheckBox_new("input[name='qx']", selected_res);
	};
	selected_res = function(lab){
			//selected_res_arr = [];
		var $this = $(lab),
			$this_name = $this.attr('cnvalue'),
			$this_id = $this.val(),
			f_Div = $(".selected_res_con");
			selHtml = '';
			if(lab.checked){
				if($('.checkData[data-id=' + $this.val() + ']').length > 0){
					return false;
				}
				selHtml += '<label class="checkData" data-id = "'+ $this.val() +'"><span>'+ $this.attr('cnvalue') +'</span><i class="delete_lab">×</i></label>';
				f_Div.append(selHtml);
				$("#qx_msg").hide();
			}else{
				$(".selected_res_con>label[data-id=" + $this.val() + "]").remove();									
			}	
			var qx = $("input[name=qx]");
			if(qx.prop('checked')){
				qx.prop('checked', false);
				qx.parent('.checkbox-inline').removeClass('n3-checkbox-checked');
				qx.siblings('.n3-checkbox-inner').removeClass('glyphicon glyphicon-checked');
				qx.parent(".checkbox-inline").removeClass('glyphicon-checked-fontColor');
				qx.parent(".checkbox-inline").removeClass('glyphicon-checked-fontColor');
				selHtml = '';
				$('input[name=pdc_type_nm]:checked').each(function(i, item){
					$this = $(item);
					selHtml += '<label class="checkData" data-id = "'+ $this.val() +'"><span>'+ $this.attr('cnvalue') +'</span><i class="delete_lab">×</i></label>';
				});
				f_Div.html(selHtml);
			}
	};
	
	two_inputChange = function(){
		var startOrend_val = $(this).attr("data-con"), // 判断是 start 或者   end
			conTitle = $(this).parents(".row").siblings(".contract_title").text(), // 左侧大标题
			changeSel_title = $(this).parent().find("label").text().trim(), // 所选项key
			twoInp_con = $(this).val(),// 所选项text	
			icon = '%',
			two_inpTitle = $(".template_content").find(".template_title");
		if(changeSel_title ==='融资金额'){
			icon = '元';
		}
		if($(this).hasClass("sizeCompar")){ // input输入框
			twoInp_con = parseFloat($(this).val()).toFixed(2) + icon;
			var id = $(this).attr("id");
			switch(id){
				case 'strRate' :// 结算利率 s
				
				      if($("#endRate").val() +''!== "" && parseFloat($("#endRate").val())<parseFloat($("#strRate").val())){
				            $("#Rate_val").fadeIn("fast").text("起始结算利率需小于结束结算利率");
				            $(this).val("");
				            twoInp_con = "NaN%";
				       } else if(parseFloat($("#strRate").val()) >100){
						    $("#Rate_val").fadeIn("fast").text("结算利率最大值为：100");
					        $(this).val("");
						}else{
				    	   $("#Rate_val").hide();
				       }
				     
				break;
				case 'endRate' :// 结算利率 e
				      if($("#strRate").val() +''!== "" && parseFloat($("#endRate").val())<parseFloat($("#strRate").val())){
				    	  $("#Rate_val").fadeIn("fast").text("起始结算利率需小于结束结算利率");
				          $(this).val("");
				          twoInp_con = "NaN%";
				       }else if(parseFloat($("#endRate").val()) >100){
							 $("#Rate_val").fadeIn("fast").text("结算利率最大值为：100");
					            $(this).val("");
				       }else{
				    	   $("#Rate_val").hide();
				       }
				break;
				case 'strFirPay' :// 首付比例 s
				      if($("#endFirPay").val() +''!== "" && parseFloat($("#endFirPay").val())<parseFloat($("#strFirPay").val())){
				    	  $("#FirPay_val").fadeIn("fast").text("起始首付比例需小于结束首付比例");
				          $(this).val("");
				          twoInp_con = "NaN%";
				       }else if(parseFloat($("#strFirPay").val()) >100){
							 $("#FirPay_val").fadeIn("fast").text("首付比例最大值为：100");
					            $(this).val("");
					   }else{
				    	   $("#FirPay_val").hide();
				       }
				break;
				case 'endFirPay' :// 首付比例 e
				
				      if($("#strFirPay").val() +''!== "" && parseFloat($("#endFirPay").val())<parseFloat($("#strFirPay").val())){
				    	  $("#FirPay_val").fadeIn("fast").text("起始首付比例需小于结束首付比例");
				          $(this).val("");
				          twoInp_con = "NaN%";
				       }else if(parseFloat($("#endFirPay").val()) >100){
							 $("#FirPay_val").fadeIn("fast").text("首付比例最大值为：100");
					            $(this).val("");
					   }else{
				    	   $("#FirPay_val").hide();
				       }
				break;
				case 'strfancAmt' :// 首付比 s
				
				      if($("#endfancAmt").val() +''!== "" && parseFloat($("#endfancAmt").val())<=parseFloat($("#strfancAmt").val())){
				    	  $("#fancAmt_val").fadeIn("fast").text("起始融资金额需小于结束融资金额");
				          $(this).val("");
				          twoInp_con = "NaN元";
				       }else if(parseFloat($("#strfancAmt").val()) >999999.99){
							 $("#fancAmt_val").fadeIn("fast").text("融资金额最大值为：999999.99");
					            $(this).val("");
					   }else{
				    	   $("#fancAmt_val").hide();
				       }
				break;
				case 'endfancAmt' :// 首付比率 e
				      if($("#strfancAmt").val() +''!== "" && parseFloat($("#endfancAmt").val())<=parseFloat($("#strfancAmt").val())){
				    	  $("#fancAmt_val").fadeIn("fast").text("起始融资金额需小于结束融资金额");
				          $(this).val("");
				          twoInp_con = "NaN元";
				       }else if(parseFloat($("#endfancAmt").val()) >999999.99){
							 $("#fancAmt_val").fadeIn("fast").text("融资金额最大值为：999999.99");
					            $(this).val("");
				       }else{
				    	   $("#fancAmt_val").hide();
				       }
				break;
			}
		}
		two_inpTitle.each(function(i,items){ 
			if($(this).text().trim() === conTitle){ //找到匹配的容器div
				var selceted_con = $(this).siblings(".selected_condition_con").text(),
				has_selVal;
			if(!selceted_con){ //模板内容为空情况
				if(startOrend_val +'' === 's'){ // 选择  第一个 input 
					$(this).siblings(".selected_condition_con").prev().show();
					$(this).siblings(".selected_condition_con").append('<span class="title_l">'+ changeSel_title +'</span><span>-</span><span data-con="s" class="title_r">'+ (twoInp_con ==="NaN%"?"不限":twoInp_con) +'</span><span> 至 </span><span data-con="e" class="end">不限</span>');
				}else{
					$(this).siblings(".selected_condition_con").prev().show();
					$(this).siblings(".selected_condition_con").append('<span class="title_l">'+ changeSel_title +'</span><span>-</span><span data-con="s" class="title_r">不限</span><span> 至 </span><span data-con="e" class="end">'+ (twoInp_con ==="NaN%"?"不限":twoInp_con) +'</span>');
				}
			}else{ // 模板非空的情况下
				var sel_has_title = $(this).parent().find('.selected_condition_con .title_l'),
					i = 0,
					sel_has_title_len = sel_has_title.length;
				for(; i<sel_has_title_len; i++){
					// 已有内容修改
					if($(sel_has_title[i]).text() === changeSel_title){
						has_selVal = true;
						
						if(startOrend_val +'' === 's'){ // 选择  第一个 input 
							if(twoInp_con === 'NaN元'){
								$(sel_has_title[i]).next().next(".title_r").text(twoInp_con ==="NaN元"?"不限":twoInp_con);
							}else{
								if(twoInp_con ===""){
									$(sel_has_title[i]).next().next(".title_r").text(twoInp_con ===""?"不限":twoInp_con);
								}else{
									$(sel_has_title[i]).next().next(".title_r").text(twoInp_con ==="NaN%"?"不限":twoInp_con);
								}
								
								
							}
						}else{
							if($(sel_has_title[i]).next().next().next().next().hasClass("end")){
								if(twoInp_con === 'NaN元'){
									$(sel_has_title[i]).next().next().next().next().text(twoInp_con ==="NaN元"?"不限":twoInp_con);
								}else{
									if(twoInp_con ===""){
										$(sel_has_title[i]).next().next().next().next().text(twoInp_con ===""?"不限":twoInp_con);
									}else{
										$(sel_has_title[i]).next().next().next().next().text(twoInp_con ==="NaN%"?"不限":twoInp_con);
									}
									
									
								}
							}else{
								$(sel_has_title[i]).parent().append('<span> 至 </span><span class="end" data-con = "e">'+(twoInp_con ==="NaN%"?"不限":twoInp_con)+'</span>');
							}
						}
						if($(sel_has_title[i]).next().next().text() === '不限' && $(sel_has_title[i]).next().next().next().next().text() === '不限'){
							if($(sel_has_title[i]).prev().text().trim()==="，" ||$(sel_has_title[i]).prev().text().trim()===","){ //前后都有值
								$(sel_has_title[i]).prev().remove();
                        	}else if($(sel_has_title[i]).prev().text().trim() === '' && $(sel_has_title[i]).next().next().next().next().next().text().trim() ===''){ //前后都没值
                        		$(sel_has_title[i]).parent().parent().find("label").css("display","none");
                        	}else if($(sel_has_title[i]).prev().text().trim() === '' && $(sel_has_title[i]).next().next().next().next().next().text().trim() ===','){
                        		$(sel_has_title[i]).next().next().next().next().next().remove();
                        	}
							//$(sel_has_title[i]).next().next().next().next().next().remove();
							$(sel_has_title[i]).next().next().next().next().remove();
							$(sel_has_title[i]).next().next().next().remove();
							$(sel_has_title[i]).next().next().remove();
							$(sel_has_title[i]).next().remove();
							$(sel_has_title[i]).remove();
						}
					}
				}
				// 内容追加
				if(!has_selVal){
					if(startOrend_val +'' === 's'){ // 选择  第一个 input 
						$(this).siblings(".selected_condition_con").append('<span>，</span><span class="title_l">'+ changeSel_title +'</span><span>-</span><span data-con="s" class="title_r">'+ (twoInp_con ==="NaN%"?"不限":twoInp_con) +'</span><span>至 </span><span data-con="e" class="end">不限</span>');
					}else{
						if($(sel_has_title[i]).next().next().hasClass("end")){
							$(sel_has_title[i]).siblings(".end").text(twoInp_con ==="NaN%"?"不限":twoInp_con);
						}else{
							$(this).siblings(".selected_condition_con").append('<span>，</span><span class="title_l">'+ changeSel_title +'</span><span>-</span><span data-con="s" class="title_r">不限</span><span>至 </span><span data-con="e" class="end">'+ (twoInp_con ==="NaN%"?"不限":twoInp_con) +'</span>');
						}
						
					}
				}
			}
			}
			
		})
			
	};
	selChange = function(elem){
		var conTitle = elem.parents(".row").siblings(".contract_title").text(), // 左侧大标题
			changeSel_title = elem.parent().find("label").text().trim(), // 所选项key
			changeSel_con = elem.siblings(".btn-group").find("button>span").text().trim().replace(/\, /g,"/"), // 所选项text		
			sel_templateTitle = $(".template_content").find(".template_title"),
			val_len = changeSel_con.length,
			selEle =elem; // 超出长度显示 ...
		sel_templateTitle.each(function(i,items){
			var $this = $(items);
			if($this.text().trim() === conTitle){ //找到匹配的容器div
				var selceted_con = $this.siblings(".selected_condition_con").text(),
					has_selVal;
			if(!selceted_con){ //模板内容为空情况下
				if(changeSel_con && changeSel_con +''!=='不限'){
					if(val_len>16){
						fullSel_text = changeSel_con.substr(0,16);
						$this.siblings(".selected_condition_con").prev().show();
						$this.siblings(".selected_condition_con").append('<span class="title_l">'+ changeSel_title +'</span><span>-</span><span class="title_r">'+ fullSel_text +'...</span>');
					}else{
						$this.siblings(".selected_condition_con").prev().show();
						$this.siblings(".selected_condition_con").append('<span class="title_l">'+ changeSel_title +'</span><span>-</span><span class="title_r">'+ changeSel_con +'</span>'); //渲染已选条件车辆制造商
						var prevTit = selEle.parent().prev().find("label").text().trim(),
            				prevTxt = selEle.parent().prev().children().find("option:selected").text().trim();
						if(selceted_con.indexOf(prevTit)<0 && prevTxt !== '' && prevTxt !== '不限'){
							$this.next().prepend('<span class="title_l">'+ prevTit +'</span><span>-</span><span class="title_r">'+ prevTxt +'</span><span>，</span>');		
						}//渲染车辆制造商对应的品牌
					}
					}
				}else{  //模板内容非空 情况下
					var sel_has_title = $this.parent().find('.selected_condition_con .title_l'),
						i = 0,
						sel_has_title_len = sel_has_title.length;
					for(; i<sel_has_title_len; i++){
						// 已有内容修改v 
						if($(sel_has_title[i]).text() === changeSel_title){
							has_selVal = true;
						if(changeSel_con && changeSel_con +''!=='不限'){
							if(val_len>16){
								fullSel_text = changeSel_con.substr(0,16);
								$(sel_has_title[i]).next().next(".title_r").text(fullSel_text +'...');
							}else{
								$(sel_has_title[i]).next().next(".title_r").text(changeSel_con); // 已选条件 ‘车辆制造商’联动
								if($(sel_has_title[i]).text()+'' === '品牌' && $(sel_has_title[i]).next().next(".title_r").next().length>0){
									$this.parent().children(".selected_condition_con").children().each(function(i,items){
										if($(items).text().trim()==="车辆制造商"||$(items).text().trim()==="车型"){
	                                    		$(items).next().next().next().remove();
	                                    		$(items).next().next().remove();
	                                    		$(items).next().remove();
	                                    		if($(items).prev().text().trim()==="，"){
    	                                    		$(items).prev().remove();
    	                                    	}
	                                    		$(items).remove();
	                                    	
										}
									})
								}
								
								if($(sel_has_title[i]).text()+'' === '车辆制造商' && $(sel_has_title[i]).next().next(".title_r").next().length>0){ //车辆制造商 后面 有车型
									$this.parent().children(".selected_condition_con").children().each(function(i,items){
										if($(items).text().trim()==="车型"){
	                                    		$(items).next().next().next().remove();
	                                    		$(items).next().next().remove();
	                                    		$(items).next().remove();
	                                    		if($(items).prev().text().trim()==="，"){
    	                                    		$(items).prev().remove();
    	                                    	}
	                                    		$(items).remove();
	                                    	
										}
									})
								}else{ //后面没有车型  前面有品牌
									$this.parent().children(".selected_condition_con").children().each(function(i,items){
										if($(items).text().trim()==="品牌"){
											$(items).next().next(".title_r").text($("#brand option:selected").text())
										}
									})
								}
							}
						}else{ // 值为不限时 不显示已选条件
							var nowTemplate_title = $(sel_has_title[i]).parent().parent().find(".template_title");
							$(sel_has_title[i]).next().remove();
							$(sel_has_title[i]).next().remove();
							if($(sel_has_title[i]).prev().html() === '，'){
								$(sel_has_title[i]).prev().remove();
								//$(sel_has_title[i]).next().remove();
							}else if($(sel_has_title[i]).next().html() === '，' ||$(sel_has_title[i]).next().html() === ','){
								$(sel_has_title[i]).next().remove()
							}
							$(sel_has_title[i]).remove();
							if(nowTemplate_title.next().html() === ''){
								nowTemplate_title.hide();
							}
						}
						}
					}
					 // 内容追加
					if(!has_selVal){
						if(val_len>16){
							fullSel_text = changeSel_con.substr(0,16);
							$this.siblings('.selected_condition_con').append('<span>，</span><span class="title_l">'+ changeSel_title +'</span><span>-</span><span class="title_r">'+ fullSel_text +'...</span>');
						}else{
							if(changeSel_con === '' || changeSel_con +'' === '不限'){
								return false;
							}
							$this.siblings('.selected_condition_con').append('<span>，</span><span class="title_l">'+ changeSel_title +'</span><span>-</span><span class="title_r">'+ changeSel_con +'</span>');
						}
					}
				}
			}
		})

	};
	emptyDate = function(){
        $("#contractEffecte_s,#contractEffecte_e").val("");
        var t = $(".selected_condition_con").text().trim();
    	if(t.indexOf("合同生效日期")>=0){
    		$(".selected_condition_con span").each(function(){
    			if($(this).text().trim()==="合同生效日期"){
    				$(this).next().remove();
    				$(this).next().remove();
    				$(this).next().remove();
    				$(this).next().remove();
    				$(this).next().remove();
    				$(this).prev().remove();
    				$(this).remove();
    			}
    		})
    	}
	};
	inpChange = function(){
		// input change
		var conTitle = $(this).parents(".row").siblings(".contract_title").text(), // 左侧大标题
			change_title = $(this).parent().find("label").text().trim(), // 所选项key
			change_con = $(this).val(), // 所选项val		
			templateTitle = $(".template_content").find(".template_title"),
			val_len = change_con.length; // 超出长度显示 ...
		templateTitle.each(function(i,items){
			if($(this).text().trim() === conTitle){ //找到匹配的容器div
			var selected_con = $(this).siblings(".selected_condition_con").text(),
				has_val;
				if(!selected_con){ //模板内容为空情况下
					if(val_len>16){
						fullLen_con = change_con.substr(0,16);
						$(this).siblings(".selected_condition_con").prev().show();
						$(this).siblings(".selected_condition_con").append('<span class="title_l">'+ change_title +'</span><span>-</span><span class="title_r">'+ fullLen_con +'...</span>');
					}else{
						$(this).siblings(".selected_condition_con").prev().show();
						$(this).siblings(".selected_condition_con").append('<span class="title_l">'+ change_title +'</span><span>-</span><span class="title_r">'+ change_con +'</span>');
					}
				}else{ // 模板内容非空情况下
					var had_title = $(this).parent().find('.selected_condition_con .title_l'),
						i = 0,
						had_title_len = had_title.length;
					for(; i<had_title_len; i++){
						// 已有内容修改
						if($(had_title[i]).text() === change_title){
							has_val = true;
						if(change_con){
							if(val_len>16){
								fullLen_con = change_con.substr(0,16);
								$(had_title[i]).next().next(".title_r").text(fullLen_con +'...');
							}else{
								$(had_title[i]).next().next(".title_r").text(change_con);
							}
							
						}else{ // 值为空 移除大标题
							if($(had_title[i]).prev().length >0 && $(had_title[i]).next().next().next().next().length>0){ //中间值
								$(had_title[i]).next().next().next().remove();
								$(had_title[i]).next().next().remove();
								$(had_title[i]).next().remove();
								//$(had_title[i]).prev().remove();
								$(had_title[i]).remove();
							}else if($(had_title[i]).prev().length >0 || $(had_title[i]).next().next().next().next().length>0){ //最后一个值
								$(had_title[i]).next().next().next().remove();
								$(had_title[i]).next().next().remove();
								$(had_title[i]).next().remove();
								$(had_title[i]).prev().remove();
								$(had_title[i]).remove();
							}else{ //  最后一项
								$(had_title[i]).parent().parent().find(".template_title").hide();
								$(had_title[i]).next().next().remove();
								$(had_title[i]).next().remove();
								$(had_title[i]).remove();
							
							}
	
						  }
						}
					}
					// 内容追加
					if(!has_val){
						if(val_len>16){
							fullLen_con = change_con.substr(0,16);
							$(this).siblings('.selected_condition_con').append('<span>，</span><span class="title_l">'+ change_title +'</span><span>-</span><span class="title_r">'+ fullLen_con +'...</span>');
						}else{
							$(this).siblings('.selected_condition_con').append('<span>，</span><span class="title_l">'+ change_title +'</span><span>-</span><span class="title_r">'+ change_con +'</span>');
						}
					}
					
				}
			}
		})
		
	};
	resetData = function(){
		$(".selected_condition_div .template_content .template_title:not(:first)").css("display","none");
		$('#indexForm input[type="text"]').val(''); // 所有的input
		getinitData(); //初始化按条件查询	
		$(".template_content").find(".selected_condition_con").html(""); // 清空已选模板中原来的内容	
		$("#template_sp span").each(function(){
			if($(this).hasClass("current")){
    			$(this).removeClass("current");
    		}
		}); // 去掉模板标签上面的选中样式
		getMaxMinTime(); // 时间控件的加载
		getComSubCom(); // 所属公司大区片区分公司的联动
		initselData(); // 加载下拉数据 （ 车型选择 - 品牌 -车辆制造商 - 车型 ）
		getPrjBlgsTo(); // 获取 ‘项目类型 及所属项目’ 的下拉列表数据
		//隐藏校验提示
		$("#Rate_val").hide();
		$("#FirPay_val").hide();
		$("#fancAmt_val").hide();
	};
	
	getdealDetail = function(){
		$.createLoading();
		$("#entry_details_bottom").show();
		var fi_val = $('#financing_maturity').parent().find(".filter-option").text().trim() + '';
		var fi_arr = fi_val.split(",");
		fi_arr = fi_arr.map(function(item,ind){
			item = item.substring(0,item.length-1);
			return item;
		});
		fi_txt = fi_arr.join(",");
		/*if($(this).attr("id") + '' === 'query'){*/
			var apply_num = $("#apply_num").val().trim(),//申请编号
				apply_sts = $('#apply_status').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#apply_status').parent().find(".filter-option").text().trim() + '',//申请状态
				strApplyDt = $("#applyDate_s").val(), // 申请日期-- 开始
				endApplyDt = $("#applyDate_e").val(), //申请日期 -- 结束
				contract_no = $("#contract_num").val().trim(), // 合同号
				contr_sts = $('#contract_status').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#contract_status').parent().find(".filter-option").text().trim() + '',// 合同状态 --多选
				strEffDt = $("#contractEffecte_s").val(), // 合同生效日期 --- 开始 
				endEffDt = $("#contractEffecte_e").val(), // 合同生效日期 --- 结束
				cust_name = $("#customer_name").val().trim(), // 客户名称
				store_province = $('#storefront_prov').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#storefront_prov').parent().find(".filter-option").text().trim() + '',// 店面省份
				strConCle = $("#contractSettle_s").val(), // 合同结清日期 -- 开始
				endConCle = $("#contractSettle_e").val(), // 合同结清日期 -- 结束
				vin_no = $("#frame_num").val().trim(), // 车架号
				strCancel = $("#contractcancel_s").val(), // 合同取消日期 -- 开始 
				endCancel = $("#contractcancel_e").val(), // 合同取消日期 -- 结束
				company = $('#company').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#company').parent().find(".filter-option").text().trim() + '', // 所属公司
				region_name = $('#region').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#region').parent().find(".filter-option").text().trim() + '',// 大区
				area_name = $('#area').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#area').parent().find(".filter-option").text().trim() + '',// 片区
				branch_company = $('#branch_office').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#branch_office').parent().find(".filter-option").text().trim() + '',// 分公司
				service_type = $('#busi_type').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#busi_type').parent().find(".filter-option").text().trim() + '',// 业务类型
				rent_type =  $('#lease_attr').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#lease_attr').parent().find(".filter-option").text().trim() + '',// 租赁属性
				prjc_type = $('#project_type').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#project_type').parent().find(".filter-option").text().trim() + '',// 项目类型
				blngs_prjc = $('#project_belong').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#project_belong').parent().find(".filter-option").text().trim() + '', // 所属项目
				quote_store_name = $("#store_name").val().trim(), // 店面名称
				customer_channel_one = $('#customer_channel1').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#customer_channel1').parent().find(".filter-option").text().trim() + '',// 客户渠道一级科目
				customer_channel = $('#customer_channel2').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#customer_channel2').parent().find(".filter-option").text().trim() + '',// 客户渠道二级科目
				cooperat_channel = $('#cooperate_channel1').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#cooperate_channel1').parent().find(".filter-option").text().trim() + '',// 合作渠道一级科目 
				brand = $('#brand').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#brand').parent().find(".filter-option").text().trim() + '',// 品牌
				manufac_id = $('#vehicle_manufacturer').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#vehicle_manufacturer').parent().find(".filter-option").text().trim() + '',// 车辆制造商
				models = $('#car_models').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#car_models').parent().find(".filter-option").text().trim() + '',// 车型
				car_type = $('#car_type').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#car_type').parent().find(".filter-option").text().trim() + '', // 车辆类型
				spec_models =$('#special_models').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#special_models').parent().find(".filter-option").text().trim() + '',// 特殊车型
				product_no = $("#product_num").val().trim(), //产品编号
				product_name = $("#product_name").val().trim(), // 产品方案名称
				gps_price_type = $("#gps_price_type").val().trim(), // GPS价格类型
				discount_type =	$('#discount_type').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#discount_type').parent().find(".filter-option").text().trim() + '',// 贴息类型
				finance_period = fi_txt + '' === '不限'?"":fi_txt + '',// 融资期限
				is_risk = $('#insurance_yesorno').parent().find(".filter-option").text().trim() + '' === '不限'?"":$('#insurance_yesorno').parent().find(".filter-option").text().trim() + '',// 是否融保险
				strRate = $("#strRate").val(),// 结算利率 -- 开始
				endRate = $("#endRate").val(),// 结算利率 -- 结束
				strFirPay = $("#strFirPay").val(), // 首付比例 -- 开始 
				endFirPay = $("#endFirPay").val(), // 首付比例 -- 结束
				strfancAmt = $("#strfancAmt").val(), // 融资额 -- 开始 
				endfancAmt = $("#endfancAmt").val(); // 融资额 -- 结束
					
				dealDetail_param.apply_no = apply_num; 
				//dealDetail_param.apply_no= apply_num; //申请编号
				dealDetail_param.apply_sts= apply_sts; // 申请状态
				dealDetail_param.strApplyDt= strApplyDt; // 申请日期-- 开始
				dealDetail_param.endApplyDt= endApplyDt; //申请日期 -- 结束
				dealDetail_param.contract_no= contract_no; //合同号
				dealDetail_param.contr_sts= contr_sts; // 合同状态
				dealDetail_param.strEffDt= strEffDt; // 合同生效日期 --- 开始
				dealDetail_param.endEffDt= endEffDt ; // 合同生效日期 --- 结束
				dealDetail_param.cust_name= cust_name; // 客户名称
				dealDetail_param.store_province= store_province; // 店面省份
				dealDetail_param.strConCle= strConCle; // 合同结清日期 -- 开始
				dealDetail_param.endConCle= endConCle; // 合同结清日期 -- 结束
				dealDetail_param.vin_no= vin_no; // 车架号
				dealDetail_param.strCancel= strCancel; // 合同取消日期 -- 开始 
				dealDetail_param.endCancel= endCancel; // 合同取消日期 -- 结束
				dealDetail_param.blngs_comp= company; // 所属公司
				dealDetail_param.region_name= region_name; // 大区
				dealDetail_param.area_name= area_name; // 片区
				dealDetail_param.branch_company= branch_company; // 分公司
				dealDetail_param.service_type= service_type; // 业务类型
				dealDetail_param.rent_type= rent_type; // 租赁属性
				dealDetail_param.prjc_type= prjc_type; // 项目类型
				dealDetail_param.blngs_prjc= blngs_prjc; // 所属项目
				dealDetail_param.quote_store_name= quote_store_name; // 店面名称
				dealDetail_param.customer_channel_one= customer_channel_one; // 客户渠道一级科目
				dealDetail_param.customer_channel= customer_channel; // 客户渠道二级科目
				dealDetail_param.cooperat_channel= cooperat_channel; // 合作渠道一级科目
				dealDetail_param.brand= brand; // 品牌
				dealDetail_param.manufac_id= manufac_id; // 车辆制造商
				dealDetail_param.models= models; // 车型
				dealDetail_param.car_type= car_type; // 车辆类型
				dealDetail_param.spec_models= spec_models; // 特殊车型
				dealDetail_param.product_no= product_no; //产品编号
				dealDetail_param.product_name= product_name; // 产品方案名称
				dealDetail_param.gps_price_type= gps_price_type; // GPS价格类型
				dealDetail_param.discount_type= discount_type; // 贴息类型
				dealDetail_param.finance_period= finance_period; // 融资期限
				dealDetail_param.is_risk= is_risk; // 是否融保险
				dealDetail_param.strRate= strRate; // 结算利率 -- 开始
				dealDetail_param.endRate= endRate; // 结算利率 -- 结束
				dealDetail_param.strFirPay= strFirPay;  // 首付比例 -- 开始 
				dealDetail_param.endFirPay= endFirPay; // 首付比例 -- 结束
				dealDetail_param.strfancAmt= strfancAmt;  // 融资额 -- 开始 
				dealDetail_param.endfancAmt= endfancAmt; // 融资额 -- 结束 
				dealDetail_param.pageNo="1", 
				dealDetail_param.pageSize="10";
		/*}*/
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getdealDetail.koala',
			dataType:'json',
			data:dealDetail_param,
			success:function(deal_data){
				$.closeLoading(); // 关掉loading
				var table_data = deal_data.data;
				header_data = table_data[0];
				table_data.shift();
				tableData = table_data;
				initTable();
				$.ajax({ // 获取总页码
					type:'POST',
					url:'/pm/dealDetail/getTotal.koala',
					dataType:'json',
					async: false,
					data:dealDetail_param,
					success:function(lit_num){
						maxPage = lit_num.data.maxPage;
						 $('#callBackPager').extendPagination({ //渲染分页
							 	totalNum:'ts', //显示总条数
					            totalCount: maxPage,
					            showCount: 1,
					            limit: 10,
					            limits: [10,50,100,200,300],
					            callback: function (curr, limit, totalCount) {
					            	dealDetail_param.pageNo = curr;
					            	dealDetail_param.pageSize = limit;	
					            	$.ajax({
					        			type:'POST',
					        			url:'/pm/dealDetail/getdealDetail.koala',
					        			dataType:'json',
					        			data:dealDetail_param,
					        			success:function(deal_data){
					        				var table_data = deal_data.data;
					        				header_data = table_data[0];
					        				table_data.shift();
					        				tableData = table_data;
					        				initTable();
					        			}
				        			})
					            }	
					        });
					}
				});	
				
			}
		})
	};
	getMaxMinTime = function(){
		$.createLoading(); // 初始化loading
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getMaxMinTime.koala',
			dataType:'json',
			contentType: 'application/json',
			success:function(time_data){
				$("#query").attr("disabled",false)
				var timeDate = time_data.data;
				var applyDate = timeDate.apply_dt, // 申请日期
					applyDate_max = applyDate[0],
					applyDate_min = applyDate[1],
					contractEffecte = timeDate.contr_effect_dt, // 合同生效日期
					contractEffecte_max = contractEffecte[0],
					contractEffecte_min= contractEffecte[1],
					contractSettle = timeDate.contr_clear_dt, // 合同结清日期
					contractSettle_max = contractSettle[0],
					contractSettle_min = contractSettle[1],
					contractcancel = timeDate.contr_cancel_dt; // 合同取消日期
					contractcancel_max = contractcancel[0],
					contractcancel_min = contractcancel[1];
					
				/*---  申请日期  ---*/
				$("#applyDate_s").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: applyDate_min,
				    endDate: applyDate_max				    
				}).on('changeDate',function(ev){
					var starttime=$("#applyDate_s").val();
					$("#applyDate_e").datetimepicker('setStartDate',starttime);
					$("#applyDate_s").datetimepicker('hide');
					});
				$("#applyDate_e").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: applyDate_min,
				    endDate: applyDate_max
				}).on('changeDate',function(ev){
					 var starttime=$("#applyDate_s").val();
					 var endtime=$("#applyDate_e").val();
					 $("#applyDate_s").datetimepicker('setEndDate',endtime);
					 $("#applyDate_e").datetimepicker('hide');
				});
				
				/*--- 合同生效日期  ---*/
				$("#contractEffecte_s").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: contractEffecte_min,
				    endDate: contractEffecte_max				    
				}).on('changeDate',function(ev){
					var starttime=$("#contractEffecte_s").val();
					$("#contractEffecte_e").datetimepicker('setStartDate',starttime);
					$("#contractEffecte_s").datetimepicker('hide');
					});
				$("#contractEffecte_s").val(contractEffecte_max); //默认显示数据截止日日期
				$("#contractEffecte_e").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: contractEffecte_min,
				    endDate: contractEffecte_max
				}).on('changeDate',function(ev){
					 var starttime=$("#contractEffecte_s").val();
					 var endtime=$("#contractEffecte_e").val();
					 $("#contractEffecte_s").datetimepicker('setEndDate',endtime);
					 $("#contractEffecte_e").datetimepicker('hide');
				});
				$("#contractEffecte_e").val(contractEffecte_max);//默认显示数据截止日日期
				var contractEffecteS = $("#contractEffecte_s").val().trim(),
				contractEffecteE = $("#contractEffecte_e").val().trim();
				$(".template_content .selected_condition_con").first().html('<span class="title_l">合同生效日期</span><span>-</span><span data-con="s" class="title_r">'+ contractEffecteS +'</span><span>至</span><span  data-con="e" class="end">'+contractEffecteE+'</span>');
				$(".selected_condition_div").find(".template_content").each(function(i,items){
					if($(items).find(".selected_condition_con").html() + '' !== ''){
						$(this).find(".template_title").show();
					}
				})
				/*--- 合同结清日期  ---*/
				$("#contractSettle_s").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: contractSettle_min,
				    endDate: contractSettle_max				    
				}).on('changeDate',function(ev){
					var starttime=$("#contractSettle_s").val();
					$("#contractSettle_e").datetimepicker('setStartDate',starttime);
					$("#contractSettle_s").datetimepicker('hide');
					});
				if(!contractSettle_min){
					$("#contractSettle_s").prop('disabled', true);
				}
				if(!contractSettle_max){
					$("#contractSettle_e").prop('disabled', true);
				}
				$("#contractSettle_e").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: contractSettle_min,
				    endDate: contractSettle_max
				}).on('changeDate',function(ev){
					 var starttime=$("#contractSettle_s").val();
					 var endtime=$("#contractSettle_e").val();
					 $("#contractSettle_s").datetimepicker('setEndDate',endtime);
					 $("#contractSettle_e").datetimepicker('hide');
				});
				/*--- 合同取消日期  ---*/
				$("#contractcancel_s").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: contractcancel_min,
				    endDate: contractcancel_max				    
				}).on('changeDate',function(ev){
					var starttime=$("#contractcancel_s").val();
					$("#contractcancel_e").datetimepicker('setStartDate',starttime);
					$("#contractcancel_s").datetimepicker('hide');
					});
				$("#contractcancel_e").datetimepicker({
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
				    weekStart: 1,
				    autoclose: true,
				    startView: 2,
				    minView: "month",
				    startDate: contractcancel_min,
				    endDate: contractcancel_max
				}).on('changeDate',function(ev){
					 var starttime=$("#contractcancel_s").val();
					 var endtime=$("#contractcancel_e").val();
					 $("#contractcancel_s").datetimepicker('setEndDate',endtime);
					 $("#contractcancel_e").datetimepicker('hide');
				});
				setTimeout("$('#query').click()",500);
			}
				
		})
	};
	selectAll_header = function(qx){
		var qx_all_label = $(".content_selection .selection_checkbox>li").find("label");
    	qx_all_label.css({"display":"block","float":"left","padding-bottom":"5px"});
    	var checkInput = qx_all_label.find('input');
       if($("input[name='qx']").prop('checked')){ //点击全选
    	   	$(".header_selection li").addClass("li_active");
    	   		//表头选择框
    	   	checkInput.prop('checked', true);
    	   	checkInput.parent('.checkbox-inline').addClass('n3-checkbox-checked');
    	   	checkInput.siblings('.n3-checkbox-inner').addClass('glyphicon glyphicon-checked');
    	   	checkInput.parent(".checkbox-inline").addClass('glyphicon-checked-fontColor');
    	   	checkInput.parent(".checkbox-inline").addClass('glyphicon-checked-fontColor');
    		//已选条件
    		$(".selected_res_con").html('<label class="checkData" data-id = ""><span>全选</span><i class="delete_lab_qx">×</i></label>');	
	   	    $("#qx_msg").hide();//全选校验提示信息
        }else{
        	checkInput.prop('checked', false);
    		$(".header_selection li:eq(0)").click();
    		checkInput.parent('.checkbox-inline').removeClass('n3-checkbox-checked');
    		checkInput.siblings('.n3-checkbox-inner').removeClass('glyphicon glyphicon-checked');
    		checkInput.parent(".checkbox-inline").removeClass('glyphicon-checked-fontColor');
    		checkInput.parent(".checkbox-inline").removeClass('glyphicon-checked-fontColor');
    		$(".selected_res_con").html("");
        }
	};
	select_header = function(){
		$this = $(this)
		$this.siblings('li').removeClass('li_active');  // 删除其他兄弟元素的样式
		$this.addClass('li_active');                    // 添加当前元素的样式
        var $this_text = $this.text(),
        	all_label = $(".content_selection .selection_checkbox>li").find("label");  
        $.each(all_label,function(i,items){
        	var $this_inp_attr = $(this).find("input").attr("input-letter");
        	if($this_inp_attr === $this_text){ // 属性对应的显示 否则隐藏 
        		$(this).css({"display":"block","float":"left","padding-bottom":"5px"})
        	}else{
        		$(this).css("display","none");
        	}
        })
        var qx = $('input[name=qx]');
		if(qx.prop('checked')){
			$(".selected_res_con").html("");
			var checkInput = $('input[name=pdc_type_nm]');
			checkInput.push(qx[0]);
			checkInput.prop('checked', false);
			checkInput.parent('.checkbox-inline').removeClass('n3-checkbox-checked');
			checkInput.siblings('.n3-checkbox-inner').removeClass('glyphicon glyphicon-checked');
			checkInput.parent(".checkbox-inline").removeClass('glyphicon-checked-fontColor');
			checkInput.parent(".checkbox-inline").removeClass('glyphicon-checked-fontColor');
		}	
	};
	exportModal = function(){
		$("#export_modal").modal('show'); // 显示导出下载弹层
		loadTabHeader(); // 加载全部表头
		hide_exportModal(); //重置弹窗中内容
		//expMod_radio();
	};
	onClickToShowModal = function (){
		$('#build_template_modal').modal('show');
		$('#modalName').val("");
	};
	hideModal = function(){
		$('#build_template_modal').modal('hide');
	};
	loadTabHeader = function(){// 加载全部表头
		 $.ajax({
  		   type:'POST',
  		   url:'/pm/dealDetail/getFirChacter.koala',
  		   dataType:'json',
  		   data: {
      		first_lter: 'allTitle'
  		   }, 
  		   success:function(all_thData){
  			   console.log(all_thData)
  			   	var con_sel_ul = $(".content_selection .selection_checkbox>li"), //表头选择框
  					li_html_ALL = '',
  					HeaderData = all_thData.data;
  	        		$.each(HeaderData,function(i,item){
  	        			li_html_ALL += '<label class="checkbox-inline n3-checkbox-label">'+
  								 			'<input type="checkbox" input-letter="' + item[2] + '" name="pdc_type_nm" class="n3-checkbox-input" cnvalue="' + item[0] + '" value="' + item[1] + '">'+ 
  								 			'<span class="n3-checkbox-inner"></span>'
  								 			+ item[0] +			 			
  								 	'</label>';    			
  	        		});
  	        		con_sel_ul.html(li_html_ALL);
  	        		initCheckBox_new('.content_selection .selection_checkbox>li input[type=checkbox]', selected_res);
  	        		//表头选择
  	        		$(".header_selection li:eq(0)").click();//表头默认选a
  	        	
  		   }
  	   })
		
	};
	hide_exportModal = function(){
		$('.pageType input[type=radio]:eq(0)').click();
		initRadio_new('.pageType input[type=radio]',expMod_radio);// 单选		
		$('.custom_num').val("");
		$('#limitPage_msg').html("");
		$("#qx_msg").html("");
		$('.header_selection li').siblings('li').removeClass('li_active');  // 删除其他兄弟元素的样式
		$('.header_selection li:eq(0)').addClass('li_active');
		if($("input[name='qx']").next().hasClass("glyphicon-checked")){ // 全选
			$("input[name='qx']").click();
		}
		$(".selected_res_con").empty();
		loadTabHeader(); // 加载全部表头
		//$('#export_modal').modal('hide');
	};
	initTable = function(){
		$("#dealDetail_table").bootstrapTable('destroy');
		$('#dealDetail_table').bootstrapTable({
		    data: initTableData(), 
            striped: true,                      //是否显示行间隔色
          //  pagination: true,                   //是否显示分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [1, 5, 10, 50, 100],        //可供选择的每页的行数（*）
		    columns: initColumns()
        });
	};
	initPage = function(){
        $('#callBackPager').extendPagination({
        	totalNum:'ts', // 显示总条数
            totalCount: "1",
            showCount: 1,
            limit: 20,
            limits: [20, 50, 100, 200, 300],
            callback: function (curr, limit, totalCount) {
            	conditionForGetData.selectType = '2';
            	conditionForGetData.pageNum = curr;
            	conditionForGetData.rowNum = limit;
        		tableDataRequest(function(data){
                    	conditionForGetData.pageNum = 1;
                    	conditionForGetData.rowNum = 10;
        				tableData =  data.data.tableData;
        				initTable();				
        		})
            }
        });
	};
	
	initColumns = function(){
		var columns = [];
		var i = 0,
			size = header_data.length,
			data;
		for (; i < size; i++) {
			columns.push({
				title: header_data[i],
                field: 'data' + i,
              	align: 'center',
                valign: 'middle',
			});
		}
		return columns;
	};
	initTableData = function(){
			var data = [],
			i = 0,
			size = tableData.length,
			i_data = [],
			j,
			j_szie,
			j_data = '';
		for (; i < size; i++) {
			j_data = {};
			i_data = tableData[i];
			j = 0;
			j_size = i_data.length;  
			for (; j < j_size; j++) {	
				j_data['data' + j] = i_data[j];
			}
			data.push(j_data);
		}
		return  data;
	};
	show_more = function(){
		var con = Number($(this).attr('data-rel'));
		if(con === 1){
			$("#hidden_div").show();
			$("#show_more_btn").attr('data-rel',2);
			$("#show_more_btn").text("收起");
			$("#show_more_img").attr("src","pages/carCustomerPortrait/img/up.png");	
			}else{
			$("#hidden_div").hide();
			$("#show_more_btn").attr('data-rel',1);
			$("#show_more_btn").text("更多");
			$("#show_more_img").attr("src","pages/carCustomerPortrait/img/down.png");
			}
	};
	getinitData = function(){
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getInitData.koala',
			dataType:'json',
			contentType: 'application/json',
			success:function(data_init){
				var initDatas = data_init.data;
				/*=== 合同选择 下拉渲染  ===*/
				/*  申请状态  下拉       */
				applyStatus = initDatas.applyStatus, // 申请状态
				contactStatus = initDatas.contactStatus; // 合同状态
				storeProv = initDatas.storeProv;//店面省份
				carType = initDatas.carType;  // 车辆类型
				specialType = initDatas.specialType; // 特殊车型
				busiType = initDatas.busiType; // 业务类型
				rentProp = initDatas.rentProp; // 租赁属性
				channelFirst = initDatas.channelFirst; // 客户渠道一级科目
				channelSec = initDatas.channelSec; // 客户渠道二级科目
				cooperateFir = initDatas.cooperateFir; // 合作渠道一级科目 
				discount = initDatas.discount; // 贴息类型 
				finceLim = initDatas.finceLim; // 融资期限
				isFince = initDatas.isFince; // 是否融保险
				var a = 0,
					applyStatus_len = applyStatus.length,
					applyStatus_str = '',  // 申请状态
					b = 0,
					contactStatus_len = contactStatus.length, 
					contactStatus_str = '',  //合同状态
					c = 0,
					storeProv_len = storeProv.length,
					storeProv_str = '', // 店面省份
					d = 0,
					carType_len = carType.length,
					carType_str = '', // 车辆类型
					e = 0,
					specialType_len = specialType.length,
					specialType_str = '<option value="" class="">不限</option>', // 特殊车型
					/* === 业务部门 下拉渲染 === */
					f = 0,
					busiType_len = busiType.length,
					busiType_str = '', // 业务类别
					g = 0,
					rentProp_len = rentProp.length,
					rentProp_str = '<option value="" class="">不限</option>',// 租赁属性
					h = 0,
					channelFirst_len = channelFirst.length,
					channelFirst_str = '<option value="" class="">不限</option>', // 客户渠道一级科目
					i = 0,
					channelSec_len = channelSec.length,
					channelSec_str = '', // 客户渠道二级科目
					j = 0,
					cooperateFir_len = cooperateFir.length,
					cooperateFir_str = '<option value="" class="">不限</option>', // 合作渠道一级科目
					/*=== 融资信息 下拉渲染 === */
					k = 0,
					discount_len = discount.length,
					discount_str = '', // 贴息类型
					l = 0,
					finceLim_len = finceLim.length,
					finceLim_str = '', // 融资期限
					m = 0,
					isFince_len = isFince.length,
					isFince_str = '<option value="" class="">不限</option>'; // 是否融保险

				for(; a<applyStatus_len; a++){
					applyStatus_str += '<option value="' + a + '">' + applyStatus[a] + '</option>'
				}
				$('#apply_status').selectpicker();
				$('#apply_status').empty().append(applyStatus_str);
				$('#apply_status').selectpicker('render');
				$('#apply_status').selectpicker('refresh');
				//$('#apply_status').change();
				/*   合同状态   下拉           */ 
				for(; b<contactStatus_len; b++){
					contactStatus_str += '<option value="' + b + '">' + contactStatus[b] + '</option>'
				}
				$('#contract_status').selectpicker();
				$('#contract_status').empty().append(contactStatus_str);
				$('#contract_status').selectpicker('render');
				$('#contract_status').selectpicker('refresh');
				//$('#contract_status').change();
				/*  店面省份    下拉      */
				for(; c<storeProv_len; c++){
					storeProv_str += '<option value="' + c + '">' + storeProv[c] + '</option>'
				}
				$('#storefront_prov').selectpicker();
				$('#storefront_prov').empty().append(storeProv_str);
				$('storefront_prov').selectpicker('render');
				$('#storefront_prov').selectpicker('refresh');
				//$('#storefront_prov').change();
				/*   车辆类型     下拉        */ 
				for(; d<carType_len; d++){
					carType_str += '<option value="' + d + '">' + carType[d] + '</option>'
				}
				$('#car_type').selectpicker();
				$('#car_type').empty().append(carType_str);
				$('#car_type').selectpicker('render');
				$('#car_type').selectpicker('refresh');
				//$('#car_type').change();
				/*  特殊车型     下拉	*/ 
				for(; e<specialType_len; e++){
					specialType_str += '<option value="' + e + '">' + specialType[e] + '</option>'
				}
				$('#special_models').selectpicker();
				$('#special_models').empty().append(specialType_str);
				$('special_models').selectpicker('render');
				$('#special_models').selectpicker('refresh');
				//$('#special_models').change();
				/*	业务类别	下拉	*/
				for(; f<busiType_len; f++){
					busiType_str += '<option value="' + f + '">' + busiType[f] + '</option>'
				}
				$('#busi_type').selectpicker();
				$('#busi_type').empty().append(busiType_str);
				$('#busi_type').selectpicker('render');
				$('#busi_type').selectpicker('refresh');
				//$('#busi_type').change();
				/*	租赁属性	下拉	*/
				for(; g<rentProp_len; g++){
					rentProp_str += '<option value="' + g + '">' + rentProp[g] + '</option>'
				}
				$('#lease_attr').selectpicker();
				$('#lease_attr').empty().append(rentProp_str);
				$('#lease_attr').selectpicker('render');
				$('#lease_attr').selectpicker('refresh');
				//$('#lease_attr').change();
				/*	客户渠道一级科目	下拉 	*/
				for(; h<channelFirst_len; h++){
					channelFirst_str += '<option value="' + h + '">' + channelFirst[h] + '</option>'
				}
				$('#customer_channel1').selectpicker();
				$('#customer_channel1').empty().append(channelFirst_str);
				$('#customer_channel1').selectpicker('render');
				$('#customer_channel1').selectpicker('refresh');
				//$('#customer_channel1').change();
				/*	客户渠道二级科目	下拉	*/
				for(; i<channelSec_len; i++){
					channelSec_str += '<option value="' + i + '">' + channelSec[i] + '</option>'
				}
				$('#customer_channel2').selectpicker();
				$('#customer_channel2').empty().append(channelSec_str);
				$('#customer_channel2').selectpicker('render');
				$('#customer_channel2').selectpicker('refresh');
				//$('#customer_channel2').change();
				/*	合作渠道一级科目	下拉 	*/
				for(; j<cooperateFir_len; j++){
					cooperateFir_str += '<option value="' + j + '">' + cooperateFir[j] + '</option>'
				}
				$('#cooperate_channel1').selectpicker();
				$('#cooperate_channel1').empty().append(cooperateFir_str);
				$('#cooperate_channel1').selectpicker('render');
				$('#cooperate_channel1').selectpicker('refresh');
				//$('#cooperate_channel1').change();
				/*	贴息类型	下拉	*/
				for(; k<discount_len; k++){
					discount_str += '<option value="' + k + '">' + discount[k] + '</option>'
				}
				$('#discount_type').selectpicker();
				$('#discount_type').empty().append(discount_str);
				$('discount_type').selectpicker('render');
				$('#discount_type').selectpicker('refresh');
				//$('#discount_type').change();
				/*	融资期限	下拉	*/
				for(; l<finceLim_len; l++){
					finceLim_str += '<option value="' + finceLim[l] + '">' + finceLim[l] + '期</option>'
				}
				$('#financing_maturity').selectpicker();
				$('#financing_maturity').empty().append(finceLim_str);
				$('financing_maturity').selectpicker('render');
				$('#financing_maturity').selectpicker('refresh');
				//$('#financing_maturity').change();
				/*	是否融保险	下拉	*/
				for(; m<isFince_len; m++){
					isFince_str += '<option value="' + m + '">' + isFince[m] + '</option>'
				}
				$('#insurance_yesorno').selectpicker();
				$('#insurance_yesorno').empty().append(isFince_str);
				$('insurance_yesorno').selectpicker('render');
				$('#insurance_yesorno').selectpicker('refresh');
				//getdealDetail(); // 初始化页面查询表格
				//$('#insurance_yesorno').change();
			}
		});
	};
	getPrjBlgsTo = function(){
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getPrjBlgsTo.koala',
			dataType:'json',
			contentType:'application/json',
			success:function(prjBlgsTo_data){
					prjBlgsToData = prjBlgsTo_data.data,
					i = 0,
					prjBlgsToData_len = prjBlgsToData.length;			
				if(prjBlgsToData_len !== 0){ // 非空
					for(; i<prjBlgsToData_len; i++){
						project_type_data = prjBlgsToData[i][0]; // 项目类型
						project_type_arr.push(project_type_data);
						project_belong_data_id = prjBlgsToData[i][1]; // 所属项目 id
						project_belong_data_nm = prjBlgsToData[i][2]; // 所属项目name
						project_belong_arr.push(project_belong_data_id+','+project_belong_data_nm)
					}
					var projectType = unique1(project_type_arr);
					var j = 0,
						projectType_len = projectType.length;
						projectType_str = '';
					for(; j <projectType_len;j++){
						projectType_str += '<option value="'+ j +'">'+ projectType[j] +'</option>'
					}
					 //项目类型
					$('#project_type').selectpicker();
					$('#project_type').empty().append(projectType_str);
					//project_belong$('#project_type').find("option[value!='']").prop("selected",true);
					$('#project_type').selectpicker('render');
					$('#project_type').selectpicker('refresh');
					//$('#project_type').change();
					// ----  所属项目  ----
					var projectBelong = unique1(project_belong_arr);
					var k = 0,
						projectBelong_len = projectBelong.length;
						projectBelong_str = '';
					for(; k <projectBelong_len;k++){
						projectBelongId = projectBelong[k].split(",");
						projectBelong_str += '<option value="'+ projectBelongId[0] +'">'+ projectBelongId[1] +'</option>'
					}
					$('#project_belong').selectpicker();
					$('#project_belong').empty().append(projectBelong_str);
					//$('#project_belong').find("option[value!='']").prop("selected",true);
					$('#project_belong').selectpicker('render');
					$('#project_belong').selectpicker('refresh');
					//$('#project_belong').change();
				// 项目类型 下拉  联动
				$('#project_type').change(function(){
    				var sel_text = $(this).find("option:selected").text().trim();
    				belongProjectHtml = '';
    				$.each(prjBlgsToData,function(i,data){
        				if(sel_text.indexOf(data[0])!==-1){
        					belongProjectHtml+='<option value="'+ data[1] +'">'+ data[2] +'</option>'
        				}
        			})
        			if(sel_text ==="其他"){
        				$('#project_belong').prop('disabled', true);
        			}else{
        				$('#project_belong').prop('disabled', false);
        			}
        			$('#project_belong').selectpicker();
    				$('#project_belong').empty().html(belongProjectHtml);
    				//$('#project_belong').find("option[value!='']").prop("selected",true)
        			$('#project_belong').selectpicker('render');
    				$('#project_belong').selectpicker('refresh');
    				$('#project_belong').change();
    			})
				}
			}
		})
	};
	/*获取所属公司，大区，片区，分公司四级联动*/
	getComSubCom = function(){
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getComSubCom.koala',
			dataType:'json',
			contentType:'application/json',
			success:function(comSubCom_data){
				var comSubComData = comSubCom_data.data;
				//获取所属公司，大区，片区，分公司
				company_arr = comSubComData.compny; // 所属公司
				var i = 0,
				company_len = company_arr.length,
				company_str = '<option value="" class="">不限</option>'; // 所属公司
				//所属公司
				for(; i <company_len;i++){
					company_str += '<option value="' + i + '">'+ company_arr[i] +'</option>'
				}
				$('#company').selectpicker();
				$('#company').empty().append(company_str);
				$('#company').selectpicker('render');
				$('#company').selectpicker('refresh');
				//$('#company').change();
				area_arr = comSubComData.area; // 大区
			if(area_arr){
				if(area_arr.length>0){
				var j = 0,
				area_len = area_arr.length,
				regionArr = [],//大区
				regionArr_qc, // 定义大区去重数组变量
				regionArr_str = '<option value="" class="">不限</option>', //大区
				areArr = [], // 片区
				branch_officeArr = []; // 分公司
				areArr_str = '<option value="" class="">不限</option>', //片区
				branch_officeArr_str = '<option value="" class="">不限</option>'; // 分公司
				//大区
				for(; j <area_len;j++){
					regionArr.push(area_arr[j][0]);
					regionArr_qc = unique1(regionArr);//大区
					areArr.push(area_arr[j][1]);
					areArr_qc = unique1(areArr); // 片区
					branch_officeArr.push(area_arr[j][2]); // 分公司
					branch_office_qc = unique1(branch_officeArr); // 分公司
				};
				//大区 数据去重 渲染
				for(var k = 0; k<regionArr_qc.length; k++){
					if(regionArr_qc[k] + ""!== ""){
						regionArr_str += '<option value="'+ regionArr_qc[k] +'">'+ regionArr_qc[k] +'</option>';
					}
					$('#region').empty().append(regionArr_str);
				};
				if($('#region').find("option").length <= 2){
					$('#region').prop('disabled', true);
					//$('#region').next().find("button").css("background","#f0f0f0")
				}
				$('#region').selectpicker();
				$('#region').selectpicker('render');
				$('#region').selectpicker('refresh');
				//片区   数据去重 渲染
				for(var l = 0; l<areArr_qc.length; l++){
					if(areArr_qc[l] + ""!== ""){
						areArr_str += '<option value="'+ areArr_qc[l] +'">'+ areArr_qc[l] +'</option>';
					}
					$('#area').empty().append(areArr_str);
				};
				if($('#area').find("option").length <= 2){
					$('#area').prop('disabled', true);
					//$('#area').next().find("button").css("background","#f0f0f0");
				}
				$('#area').selectpicker();
				$('#area').selectpicker('render');
				$('#area').selectpicker('refresh');
				//分公司   数据去重 渲染
				for(var m = 0; m<branch_office_qc.length; m++){
					branch_officeArr_str += '<option value="'+ branch_office_qc[m] +'">'+ branch_office_qc[m] +'</option>';
					$('#branch_office').selectpicker();
					$('#branch_office').empty().append(branch_officeArr_str);
					$('#branch_office').selectpicker('render');
					$('#branch_office').selectpicker('refresh');
					//$('#branch_office').change();
				};
				
				}
				}else{ //当前用户域账号不合法  没有大区片区分公司权限
					$('#region').prop('disabled', true);
					$('#region').selectpicker();
					$('#area').prop('disabled', true);
					$('#area').selectpicker();
					$('#branch_office').prop('disabled', true);
					$('#branch_office').selectpicker();
				}//area 
			}
		});
	};
	/*	点击所属公司 联动	 */
	clickTo_operat_dep = function(){
		$this = $(this),
		sel_txt = $this.val();
		var domId = $this.attr('id');
		switch(domId){
			case 'region': // 大区
				p_index = 0;
				if(sel_txt +'' !== ''){
				changeOperat_dep(sel_txt,p_index,area_arr,1,'#area'); // 点击所属公司   联动   大区
				changeOperat_dep(sel_txt,p_index,area_arr,2,'#branch_office'); // 点击片区   联动  分公司
				}else{
					//分公司  初始化
					$('#branch_office').selectpicker();
					$('#branch_office').empty().append(branch_officeArr_str);
					$('#branch_office').selectpicker('render');
					$('#branch_office').selectpicker('refresh');
					$('#branch_office').change();
					//片区 初始化
					$('#area').selectpicker();
					$('#area').empty().append(areArr_str);//片区
					$('#area').selectpicker('render');
					$('#area').selectpicker('refresh');
					$('#area').change();
				}
				break;
			case 'area': // 片区
				p_index = 1;
				if(sel_txt +'' !== ''){
					changeOperat_dep(sel_txt,p_index,area_arr,2,'#branch_office'); // 点击片区   联动  分公司
					changeOperat_dep(sel_txt,p_index,area_arr,0,'#region');    //点击片区向前联动 大区
				}else {
					sel_txt = "bx";
					changeOperat_dep(sel_txt,p_index,area_arr,2,'#branch_office'); // 点击片区   联动  分公司
				}
				break;
			case 'branch_office': // 分公司
				p_index = 2;
				if(sel_txt +'' !== ''){
					changeOperat_dep(sel_txt,p_index,area_arr,1,'#area'); // 点击所属公司   联动   片区
					changeOperat_dep(sel_txt,p_index,area_arr,0,'#region'); // 点击所属公司   联动   大区
				}
				break;
		}
	};
	changeOperat_dep = function(sel_txt,p_index,datas,seledIndex,doms){
		//var seled_title = ['','片区','分公司'],
		var k = 0,	
		dataSize = datas.length,
		subcom_html = '<option value="" class="opt_color">不限</option>',
		//subcom_html = '<option value="" class="opt_color">' + seled_title[seledIndex] + '</option>',
		next_data = null,
		changeData_qc = '',
		changeData_arr = [], // 联动数据去重渲染
		doms = $(doms);
		for(; k<dataSize;k++){
			next_data = datas[k];
			if(next_data[p_index] +'' === sel_txt + ''|| sel_txt === ''){
				changeData_arr.push(next_data[seledIndex]);
				changeData_qc = unique1(changeData_arr);
			}else if (sel_txt +"" === "bx"){ // 不限
				var f_alue_val = $("#region option:selected").val(); // 品牌对应的value_text
				if((!f_alue_val || next_data[pIndex]+'' === f_alue_val) && f_alue_val +'' !== next_data[2]+''){ //渲染品牌对应的车辆制造商
					subcom_html += '<option value="' + next_data[2] + '">' + next_data[2] + '</option>';
				}
			}
		}
		if(doms.selector === '#region'){
			// 点击分公司联动片区
			var dq_val; // 大区
			for(var q = 0; q<changeData_qc.length;q++){
				//subcom_html += '<option value="'+ changeData_qc[q] +'" selected="selected">'+ changeData_qc[q] +'</option>';
				dq_val = changeData_qc[q];
			}
			$("#region option").each(function(i,items){
				$(this).prop("selected", false);
				if($(this).val()+'' === dq_val+''){
					$(this).prop("selected",true);
					doms.selectpicker();
					doms.selectpicker('render');
					doms.selectpicker('refresh'); 
				}
			})
		}else if(doms.selector === '#area' && p_index + '' === '2'){ //分公司联动 片区
			var pq_val; //  片区
			for(var m = 0; m<changeData_qc.length;m++){
				//subcom_html += '<option value="'+ changeData_qc[q] +'" selected="selected">'+ changeData_qc[q] +'</option>';
				pq_val = changeData_qc[m];
			}
			$("#area option").each(function(i,items){
				$(this).prop("selected", false);
				if($(this).val()+'' === pq_val+''){
					$(this).prop("selected", true);
					doms.selectpicker();
					doms.selectpicker('render');
					doms.selectpicker('refresh'); 
				}
			})
		}else{
			// 联动时 片区数据去重
			for(var p = 0; p<changeData_qc.length;p++){
				subcom_html += '<option value="'+ changeData_qc[p] +'">'+ changeData_qc[p] +'</option>';
			}
			doms.selectpicker();
			doms.empty().append(subcom_html);
			doms.selectpicker('render');
			doms.selectpicker('refresh'); 
		}
		selChange(doms);
	};
	initselData = function(){
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/getCarTypeDeal.koala',
			dataType:'json',
			contentType:'application/json',
			success:function(carType_data){
				var carTypeData = carType_data.data; 
					car_brand = carTypeData.car_brand,	// 品牌	
					car_make = carTypeData.car_make,	// 车辆制造商
					car_style = carTypeData.car_style;  // 车型
				var i = 0,
					car_brand_len = car_brand.length,
					car_brand_str = '<option value="" class="">不限</option>';
				for(; i<car_brand_len; i++){
					car_brand_str += '<option value="' + i + '" value_text="' + car_brand[i] + '">'+ car_brand[i] +'</option>';
				}
				$('#brand').selectpicker();
				$('#brand').empty().append(car_brand_str);
				$('#brand').selectpicker('render');
				$('#brand').selectpicker('refresh');
				$('#brand').change();
				$('#vehicle_manufacturer').selectpicker();
				$('#car_models').selectpicker();
			}
		})
	};	
	clickToSel = function(){
		$this = $(this),
		index = $this.val(),
		dataId = '';	
	var id = $this.attr('id');	
		switch(id) {
			case 'brand': // 品牌
				pIndex = 0;
				if(index + '' !== ''){
					dataId = car_brand[index]; //此处获取   品牌  当前选中项的 name
					$('#car_models').selectpicker();
					$('#car_models').prop('disabled', true); // 车型三级联动
					changeData(dataId,pIndex,car_make,1,'#vehicle_manufacturer');
					/*changeData(dataId,pIndex,car_style,3,'#car_models');*/
				}else{
					$('#car_models').selectpicker();
					$('#car_models').prop('disabled', true); // 车型三级联动
					changeData(dataId,pIndex,car_make,1,'#vehicle_manufacturer', true);
					/*changeData(dataId,pIndex,car_style,3,'#car_models', true);*/
				}
				
				break;
			case 'vehicle_manufacturer':
				pIndex = 0;
				brandNm = '';
				if(index +'' !== ''){ // 除了不限之外
					dataId = car_make[index][1];
					brandNm = car_make[index][0]; 
					$('#car_models').selectpicker();
					$('#car_models').prop('disabled', false);
					changeData(dataId,pIndex,car_style,1,'#car_models');
					$('#brand option[value_text="' + brandNm + '"]').prop("selected",true);
					$("#brand").selectpicker('refresh');
				}else { //不限
					$("#car_models option:eq(0)").prop("selected",true);
					$("#brand").selectpicker('refresh');
					$('#car_models').selectpicker();
					//changeData(dataId,pIndex,car_style,1,'#car_models'); //数据量过大 不加载子级车型
					dataId = "bx";
					pIndex = 0;
					//changeData(dataId,pIndex,car_make,1,'#vehicle_manufacturer');
					$('#car_models').prop('disabled', true);
					//$('#car_models').empty().append('<option value="" class="opt_color">车型</option>');
					$('#car_models').selectpicker('render');
					$('#car_models').selectpicker('refresh');
					$('#car_models').change();
				}		
				break;
		}
		
	};
	changeData = function(pid,pIndex,datas,dataIndex,elems,canChange){
		//var sel_ed = ['','','车辆制造商','车型','品牌'],
		var j = 0,
			size = datas.length,
			data = null,
			html = '<option value="" class="">不限</option>',
			//html = '<option value="" class="opt_color">' + sel_ed[dataIndex] + '</option>',
			ele = $(elems);
		for(; j<size; j++){
			data = datas[j];
			if(data[pIndex]+'' === pid || pid === ''){
				html += '<option value="' + j + '" p_value="' + data[pIndex] + '">'+ data[dataIndex] +'</option>';
			}else if(pid +'' === 'bx'){ // 不限
				var f_alue_text = $("#brand option:selected").attr("value_text"); // 品牌对应的value_text
				if(data[pIndex]+'' === f_alue_text || !f_alue_text){ //渲染品牌对应的车辆制造商
					html += '<option value="' + j + '" p_value="' + data[pIndex] + '">' + data[dataIndex] + '</option>';
				}
			}
		}
		ele.selectpicker();
		ele.empty().append(html);
		ele.selectpicker('render');
		ele.selectpicker('refresh');  
		if(canChange){
			ele.change();
		}
	};
	clickExport = function(){
		selected_res_arr = [];
		$.each($('.selected_res_con .checkData'), function(i, item){
			var data_id = $(item).attr('data-id'),
				oneData = '';
			if(data_id && data_id !== ''){
				oneData += $(item).find('span').text() + '-' + data_id;
			}
			selected_res_arr.push(oneData);
		})
		var ifBorrower = $('input[name=ifBorrower]:checked').val();
	//if($("input[name='qx']").next().hasClass("glyphicon-checked") || $(".selected_res_con").html().trim()+'' !== ''){
		if(ifBorrower === '自定义'){
			//页码为空
			if($('.custom_num').val()+'' === ''){
				$("#limitPage_msg").fadeIn("fast").text("请输入自定义页码");
				return false;
			}else{
				$("#limitPage_msg").hide();
			}
			//$('.custom_num').blur();
			
			if(parseFloat($("#endPage").val().trim()) < parseFloat($("#strPage").val().trim())){
				$("#limitPage_msg").fadeIn("fast").text("结束页码需大于开始页码");
				return false;
			}else{
				$("#limitPage_msg").hide();
			}

				$("#qx_msg").hide();
				//delete dealDetail_param.pageNo;
				$.ajax({
					type:'POST',
					url:'/pm/dealDetail/getTotal.koala',
					dataType:'json',
					data:dealDetail_param,
					success:function(litmit_data){
							maxPage = litmit_data.data.maxPage; //总页码
						if(maxPage !== 0 && $('#callBackPager .limitSelect').val()){
						var litPage_all = 60000/$('#callBackPager .limitSelect').val(),//限制导出60000
							P_size = Math.ceil(maxPage / $('#callBackPager .limitSelect').val());
							if(parseFloat($("#strPage").val().trim()) > parseFloat(P_size) || parseFloat($("#endPage").val().trim()) > parseFloat(P_size)){
								$("#limitPage_msg").fadeIn("fast").text("最大页码不能大于总页码"+ P_size +"，请重新输入");
								return false;	
							}else if(P_size > litPage_all){
								P_size = litPage_all;
								if(parseFloat($("#endPage").val().trim() - parseFloat($("#strPage").val().trim())) > parseFloat(P_size)){
									$("#limitPage_msg").fadeIn("fast").text("最多可导出"+ P_size +"页数据，请重新输入");
									return false;
								}else{
									//导出
									exCel_Data();
								}
							}else{
								//导出
								exCel_Data();
							}
						}else{
							$("#limitPage_msg").fadeIn("fast").text("当前无查询结果，无法导出，请重新选择");
							return false;
						}
					}
				})
	
		}else if(ifBorrower === '所有页'){ // 所有页
			if(maxPage !== 0 && $('#callBackPager .limitSelect').val()){
			var litPage = 60000/$('#callBackPager .limitSelect').val(), // 限制60000条数据
				P_size = Math.ceil(maxPage / $('#callBackPager .limitSelect').val());
			if(P_size > litPage){
				//$.showMsgbox(false, "最多可导出"+maxPage+"页，当前已选择"+ litPage +"页，超出最大限制，建议使用自定义模式分批导出！");
				$("#excel_msg").fadeIn("fast").text("最多可导出"+ litPage +"页，当前已选择"+P_size+"页，超出最大限制，建议使用自定义模式分批导出！")
				return false;
			}else{
				exCel_Data(); // 导出loading
				$("#excel_msg").hide();
			}
			}else{
				$("#limitPage_msg").fadeIn("fast").text("当前无查询结果，无法导出，请重新选择");
				return false;
			}
		}else{
			if(maxPage !== 0 && $('#callBackPager .limitSelect').val()){
				exCel_Data(); // 导出loading
			}else{
				$("#limitPage_msg").fadeIn("fast").text("当前无查询结果，无法导出，请重新选择");
				return false;
			}
		}
		/*}else{ //是否选择表头
			$("#qx_msg").fadeIn("fast").text("请选择表头");
			return false;
		}*/
	};
	exCel_Data = function(){
		//setInterval("$.createLoading()",2000);
		$.createLoading(); // loading
		var ifBorrower = $('input[name=ifBorrower]:checked').val();
		var excel_url = {};
		if(ifBorrower === "当前页"){
			excel_url.exeTitle = selected_res_arr.join(',');
			if($('#callBackPager li.active a').length>0){
				excel_url.pageNo = $('#callBackPager li.active a').text().trim();
				excel_url.pageSize = $('#callBackPager .limitSelect').val().trim();
			}
			//excel_url = 'exeTitle=' + selected_res_arr.join(',') +'&pageNo=' + $('#callBackPager li.active a').text() + '&pageSize=' + $('#callBackPager .limitSelect').val();			
		}else if(ifBorrower === "自定义"){
			excel_url.exeTitle = selected_res_arr.join(',');
			excel_url.strPage = $('#strPage').val().trim();
			excel_url.endPage = $('#endPage').val().trim();
			if($('#callBackPager .limitSelect').length>0){
				excel_url.pageSize = $('#callBackPager .limitSelect').val().trim();
			}
			
			//excel_url = 'strPage=' + $('#strPage').val() +'&endPage=' + $('#endPage').val() + '&pageSize=' + $('#callBackPager .limitSelect').val();	
		}else if(ifBorrower === "所有页"){
			excel_url.exeTitle = selected_res_arr.join(',');
			if($('#callBackPager .limitSelect').length>0){
				excel_url.pageSize = $('#callBackPager .limitSelect').val().trim();
			}
			
			//excel_url = 'pageSize=' + $('#callBackPager .limitSelect').val();	
		}
		for(var key in dealDetail_param){ 
			if(!dealDetail_param[key] || key === "pageSize" || key === "pageNo"){
				continue;
			}
			//url += '&' + p + '=' + dealDetail_param[p]; 
			excel_url[key] = dealDetail_param[key];
		} 
		$.ajax({
			type:'POST',
			url:'/pm/dealDetail/storeExcelDeal.koala',
			dataType:'json',
			data:excel_url,
			success:function(storeExcel){
				storeNum = storeExcel.data;
				//$.closeLoading(); // 关掉loading
				//setInterval("$.closeLoading();",2000);
				$("#export_modal").modal('hide'); // 隐藏导出下载弹层	
				$.closeLoading();
				if(storeNum){
					setTimeout(function(){
    		    		$("#downloadSuccess").removeClass("hide");
    		    	},1000);
    		    	setTimeout(function(){
    		    		$("#downloadSuccess").addClass("hide");
    		    	},3000);
    		    $.createExport({ //导出数据
    					action : '/pm/dealDetail/exportExcelDeal',
    					childInput : [{
    						name : 'uuid',
    						value : storeNum
    					}]
    				});
    				//location.href = '/pm/dealDetail/exportExcelDeal?uuid=' + storeNum;
				}else{
    		    	$("#downloadFail").removeClass("hide");
    		    	setTimeout(function(){
    		    		$("#downloadSuccess").addClass("hide");
    		    	},1000);
    		    }
				
			}
		})
	};
	$(function(){
		initRadio_new('.pageType input[type=radio]',expMod_radio);// 单选
		initCheckBox_new('.table_header input[type=checkbox]',selectAll_header);
		//初始化加载方法
		initMethod(); // 初始化 调用方法	
		//initTable(); //初始化表格
		//initPage();
		initselData();
		$(".template_content .template_title").hide();
		$('.selectpicker').selectpicker({
    		actionsBox:true,
    		deselectAllText:"取消",
    		selectAllText:"全选"
    	});
		$(".selectpicker").each(function(){
    		var lab = $(this).prev().text().trim();
    		if(lab){
    			$(this).next().find(".bs-searchbox").find(".form-control").attr("placeholder","请输入"+lab);
    		}
    	});
		 $("#myModalWarn").on("click","#konwE,#closeed",function(){
	        	$("#myModalWarn").removeClass("in").css({display:"none"});
	        });
		 $("#myModalFail").on("click","#Close,#ensure",function(){
	            $("#myModalFail").removeClass("in").css({"display":"none"});
	        });
		 $("#myModalExit").on("click","#ensure_,#CloseM",function(){
	            $("#myModalExit").removeClass("in").css({"display":"none"});
	            $("#myModalLabel").addClass("in").css({"display":"block"});
	        });
	});
})()