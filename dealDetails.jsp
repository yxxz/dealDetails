<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>成交明细</title>
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/lib/bootstrap/bootstrap-select.css">
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/lib/bootstrap/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/css/radio-checkbx.css">
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/css/common-wjc/extendPagination.css">
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/lib/bootstrap/bootstrap-multiselect.css">
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css" href="<%=contextPath %>/pages/dealDetails/css/dealDetails.css">
</head>
<body>

<div id="entry_details">
	<div class="simple-breadcrumb">
		        <span>报表中心</span> &gt;
		        <span>自营业务</span> &gt;
		        <span>进件成交报表</span> &gt;
		        <span class="font-blue">成交明细</span>
	</div>
<form class="" id="indexForm">
	<div id="entry_details_top">
	<!-- 合同选择 -->
	<div class="contract_choice">
		<div class="contract_title"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">合同选择</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">申请编号 </label>
				 	<input type="text" class="emptyDate sel_length sxbh" id="apply_num" placeholder="请输入申请编号" />
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">申请状态</label>
					<select class="selectpicker"  data-live-search="true" data-actions-box="true" title=" " multiple id="apply_status">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">申请日期 </label>
				 	<input type="text" class="two_input sqrq dataTimep form-control" data-con="s" id="applyDate_s" placeholder="起始日期"  data-date-format="yyyy-mm-dd"/>-
				 	<input type="text" class="two_input sqrq dataTimep form-control" data-con="e" id="applyDate_e" placeholder="结束日期"  data-date-format="yyyy-mm-dd"/>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">合同号 </label>
				 	<input type="text" class="emptyDate sel_length sxbh" id="contract_num" placeholder="请输入合同号" />
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">合同状态</label>
					<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="contract_status">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">合同生效日期 </label>
				 	<input type="text" class="two_input sqrq dataTimep form-control" data-con="s" id="contractEffecte_s" placeholder="起始日期"  data-date-format="yyyy-mm-dd"/>-
				 	<input type="text" class="two_input sqrq dataTimep form-control" data-con="e" id="contractEffecte_e" placeholder="结束日期"  data-date-format="yyyy-mm-dd"/>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">客户名称 </label>
				 	<input type="text" class="emptyDate sel_length sxbh" id="customer_name" placeholder="请输入客户名称" />
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">店面省份 </label>
				 	<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="storefront_prov">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">合同结清日期 </label>
				 	<input type="text" class="two_input sqrq dataTimep form-control" data-con="s" id="contractSettle_s" placeholder="起始日期"  data-date-format="yyyy-mm-dd"/>-
				 	<input type="text" class="two_input sqrq dataTimep form-control" data-con="e" id="contractSettle_e" placeholder="结束日期"  data-date-format="yyyy-mm-dd"/>
				</div>						
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">车架号</label>
				 	<input type="text" class="emptyDate sel_length sxbh" id="frame_num" placeholder="请输入车架号" />
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">合同取消日期 </label>
				 	<input type="text" class="emptyDate two_input sqrq dataTimep form-control" data-con="s" id="contractcancel_s" placeholder="起始日期"  data-date-format="yyyy-mm-dd"/>-
				 	<input type="text" class="emptyDate two_input sqrq dataTimep form-control" data-con="e" id="contractcancel_e" placeholder="结束日期"  data-date-format="yyyy-mm-dd"/>
				</div>	
			</div>
		</div>
<div id="hidden_div" style="display:none">
	<!-- 业务部门  -->
	<div class="busi_department">
		<div class="contract_title marTop40"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">业务部门</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">所属公司</label>
				 	<select class="selectpicker" data-live-search="true" title=" " id="company">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">大区</label>
					<select class="selectpicker operating_dep" data-live-search="true" title=" " id="region">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">片区</label>
				 	<select class="selectpicker operating_dep" data-live-search="true" title=" " id="area">
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">分公司 </label>
				 	<select class="selectpicker operating_dep" data-live-search="true" title=" " id="branch_office">
					</select>
				</div>
				<div class="col-xs-4 lh" >
				 	<label class="label_key font_pos">业务类型</label>
					<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="busi_type">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">租赁属性</label>
				 	<select class="selectpicker" data-live-search="true" title=" " id="lease_attr">
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">项目类型 </label>
				 	<select class="selectpicker changeType" data-live-search="true" title=" " id="project_type">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">所属项目</label>
					<select class="selectpicker changeType" multiple data-actions-box="true" data-live-search="true" title=" " id="project_belong">
					</select>
				</div>
			</div>	
		</div>
	<!-- 渠道选择   -->
	<div class="channel_choice">
		<div class="contract_title marTop40"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">渠道选择</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">店面名称 </label>
				 	<input type="text" class="sel_length sxbh" id="store_name" placeholder="请输入店面名称" />
				</div>
				<div class="col-xs-4">
				 	<label class="label_key font_pos">客户渠道一级科目</label>
					<select class="selectpicker" title=" " data-live-search="true" id="customer_channel1">
					</select>
				</div>
				<div class="col-xs-4">
				 	<label class="label_key font_pos">客户渠道二级科目</label>
				 	<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="customer_channel2">
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4">
				 	<label class="label_key font_pos">合作渠道一级科目</label>
					<select class="selectpicker" title=" " data-live-search="true" id="cooperate_channel1">
					</select>
				</div>
			</div>
		</div>
	<!-- 车型选择   -->
	<div class="car_choice">
		<div class="contract_title marTop40"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">车型选择</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">品牌</label>
				 	<select class="selectpicker carType_select" data-live-search="true" title=" " id="brand">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">车辆制造商</label>
					<select class="selectpicker carType_select" data-live-search="true" title=" " id="vehicle_manufacturer">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">车型</label>
				 	<select class="selectpicker carType_select" data-live-search="true" title=" " id="car_models">
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">车辆类型</label>
				 	<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="car_type">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">特殊车型</label>
					<select class="selectpicker" data-live-search="true" title=" " id="special_models">
					</select>
				</div>
			</div>
		</div>
	<!-- 产品选择   -->
	<div class="car_choice">
		<div class="contract_title marTop40"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">产品选择</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">产品编号</label>
				 	<input type="text" class="sel_length sxbh" id="product_num" placeholder="请输入产品编号" />
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">产品方案名称</label>
				 	<input type="text" class="sel_length sxbh" id="product_name" placeholder="请输入产品方案" />
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">GPS价格类型</label>
				 	<input type="text" class="sel_length sxbh" id="gps_price_type" placeholder="请输入GPS价格类型" />
				</div>
			</div>
		</div>
	<!-- 融资信息   -->
	<div class="car_choice">
		<div class="contract_title marTop40"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">融资信息</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">贴息类型</label>
					<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="discount_type">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">结算利率 </label>
				 	<input type="text" class="sizeCompar two_input bfb inputNumber" minValue="0" decimalLevel="2" data-con="s" id="strRate" placeholder="" />%
				 	<span class="">-</span>
				 	<input type="text" class="sizeCompar two_input bfb inputNumber" minValue="0" decimalLevel="2" data-con="e" id="endRate" placeholder="" />%
				 	<span id="Rate_val" style="display:none;position: absolute;left: 100px;color: red;top: 24px;"></span>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">首付比例 </label>
				 	<input type="text" class="sizeCompar two_input bfb inputNumber" minValue="0" decimalLevel="2" data-con="s" id="strFirPay" placeholder="" />% 
				 	<span class="">-</span>
				 	<input type="text" class="sizeCompar two_input bfb inputNumber" minValue="0" decimalLevel="2" data-con="e" id="endFirPay" placeholder="" />%
				 	<span id="FirPay_val" style="display:none;position: absolute;left: 100px;color: red;top: 24px;"></span>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">融资期限</label>
					<select class="selectpicker" multiple data-live-search="true" data-actions-box="true" title=" " id="financing_maturity">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">是否融保险</label>
					<select class="selectpicker" data-live-search="true" title=" " id="insurance_yesorno">
					</select>
				</div>
				<div class="col-xs-4 lh">
				 	<label class="label_key font_pos">融资金额</label>
				 	<input type="text" class="sizeCompar two_input bfb inputNumber" decimalLevel="2" minValue="0" data-con="s" id="strfancAmt"/>元 
				 	<span class="">-</span>
				 	<input type="text" class="sizeCompar two_input bfb inputNumber" decimalLevel="2" minValue="0" data-con="e" id = "endfancAmt"/>元
				 	<span id="fancAmt_val" style="display:none;position: absolute;left: 100px;color: red;top: 24px;"></span>
				</div>
			</div>
		</div>
</div>
	<!-- 底边线 -->
	<span class="bottom_line"></span>
	<!-- 已选条件 -->
	<div class="selected_condition">
	<div class="selected_title">
		<img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">已选条件
		<button type="button" id="build_template" class="btn btn-info "><span class="entry"></span>生成模板</button>
		<div class="template_sp" id="template_sp">
              <!-- <span class="tem_sp" data-id="query_temp"><i>模板</i><b class="remove_template" data-id="del_template">×</b></span> -->
        </div>
		
	</div>
	<div class="selected_condition_div">
		<div class="template_content col-xs-12">
			<label class="template_title font_pos col-xs-4">合同选择</label>
			<div class="selected_condition_con col-xs-10"></div>		
		</div>
		<div class="template_content col-xs-12">
			<label class="template_title font_pos col-xs-4">业务部门</label>
			<div class="selected_condition_con col-xs-10"></div>		
		</div>
		<div class="template_content col-xs-12">
			<label class="template_title font_pos col-xs-4">渠道选择</label>
			<div class="selected_condition_con col-xs-10"></div>		
		</div>
		<div class="template_content col-xs-12">
			<label class="template_title font_pos col-xs-4">车型选择</label>
			<div class="selected_condition_con col-xs-10"></div>		
		</div>
		<div class="template_content col-xs-12">
			<label class="template_title font_pos col-xs-4">产品选择</label>
			<div class="selected_condition_con col-xs-10"></div>		
		</div>
		<div class="template_content col-xs-12">
			<label class="template_title font_pos col-xs-4">融资信息</label>
			<div class="selected_condition_con col-xs-10"></div>		
		</div>
		<div class="clearfloat"></div>
	</div>
	</div>
		<div class="show_more">
			<span  id="show_more_btn" data-rel = "1">更多</span>
			<img id="show_more_img" src="pages/carCustomerPortrait/img/down.png"  alt="" />
		</div>
		<div class="row query_reset">
			<button type="button" id="query" class="btn btn-info btn_primary_solo" style="background:#1D86F4">查询</button>
	        <button type="button" id="reset" class="btn btn-info-base btn-info-solo">重置</button>
		</div>

	</div>
</form>
	<!-- 成交明细报表 -->
 	<div id="entry_details_bottom">
 		<button type="button" id="export" class="btn btn-info btn_primary_solo"><img class="export_icon" src="pages/dealDetails/img/export.png" alt="">导出</button>
		<table id="dealDetail_table">
		
		</table>
		<div id="callBackPager"></div>
	</div>
	<!-- 生成模板  弹出层 -->
	<div class="modal fade" id="build_template_modal" tabindex="-1" role="dialog" aria-labelledby="EditModalLabel" aria-hidden="true">
	   	<div class="modal-dialog">
	       <div class="modal-content">
	           <div class="modal-header">
	           	   <button type="button" class="close" id="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	               <h4 class="modal-title" id="EditModalLabel">生成模板</h4>
	           </div>
	           <div class="modal-body">
	           		<div class="col-xs-12">
				 		<label class="label_key font_pos"style="width: 90px">请输入模板名称</label>
				 		<input type="text" id="modalName" class="sel_length" maxlength="8" placeholder="8个字以内" />
					</div>
				</div>
	            <div class="modal-footer">
	            	<button type="button" class="btn btn-primary save" data-id="saveModal" id="saveModal">保存</button>
	                <button type="button" class="btn btn-default" id="createModal_quxiao">取消</button>                
	            </div>
	        </div>
	   	</div>
	</div>
<!-- 导出  弹出层 -->
	<div class="modal fade" id="export_modal" tabindex="-1" role="dialog" aria-labelledby="EditModalLabel" aria-hidden="true">
	   	<div class="modal-dialog">
	       <div class="modal-content">
	           <div class="modal-header">
	           		<button type="button" class="close" id="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	               <h4 class="modal-title" id="EditModalLabel">导出下载</h4>
	           </div>
	           <div class="modal-body">
	           		<div class="pagebody_top">
				 		<label class="label_key modal_font_pos" style="color:#666;"><font color="red">*</font>页码选择</label>
				 		<label class="radio-inline n3-radio-con pageType"><span class="n3-radio-inner"></span> <input class="n3-radio-input" name="ifBorrower" type="radio" value="当前页" checked="checked">当前页</label>
				 		<label class="radio-inline n3-radio-con pageType"><span class="n3-radio-inner"></span> <input class="n3-radio-input" name="ifBorrower" type="radio" value="所有页">所有页</label>
				 		<label class="radio-inline n3-radio-con pageType"><span class="n3-radio-inner"></span> <input class="n3-radio-input" name="ifBorrower" type="radio" value="自定义">自定义</label>
				 		<label class="label_key" style="color:#000;">页码</label>
				 		<input type="text" class="sel_length w50 custom_num inputNumber" minValue="0" id="strPage" placeholder="" />
						<span class="line"></span>
						<input type="text" class="sel_length w50 custom_num inputNumber" minValue="0" id="endPage" placeholder="" />
						<span id="excel_msg" style="display:none;"></span>
						<span id="limitPage_msg" style="display:none;"></span>
				 		<!-- <input type="radio" class="sel_length export_download" placeholder="8个字以内" /> -->
					</div>
					<div class="table_header">
				 		<label class="label_key modal_font_pos" style="color:#666;">表头选择</label>
				 		<label class="checkbox-inline n3-checkbox-label glyphicon-checked-fontColor">
				 			<input type="checkbox" name="qx" class="n3-checkbox-input" value="1">
				 			<span class="n3-checkbox-inner glyphicon"></span>全选	
				 			<span id="qx_msg" style="display:none;"></span>			 			
				 		</label>
				 	<div id = "qx_hidden">
				 		<ul class="header_selection">
				            <li letter="A" class="">A</li>
				            <li letter="B">B</li>
				            <li letter="C">C</li>
				            <li letter="D">D</li>
				            <li letter="E">E</li>
				            <li letter="F">F</li>
				          	<li letter="G">G</li>
				          	<li letter="H">H</li>
				            <li letter="I">I</li>
				            <li letter="J">J</li>
				            <li letter="K">K</li>
				            <li letter="L">L</li>
				          	<li letter="M">M</li>
				          	<li letter="N">N</li>
				            <li letter="O">O</li>
				            <li letter="P">P</li>
				            <li letter="Q">Q</li>
				            <li letter="R">R</li>
				          	<li letter="S">S</li>
				          	<li letter="T">T</li>
				            <li letter="U">U</li>
				            <li letter="V">V</li>
				            <li letter="W">W</li>
				            <li letter="X">X</li>
				          	<li letter="Y">Y</li>
				            <li letter="Z">Z</li>
				        </ul>
				        <div class="content_selection" id = "selContent">
				        	<ul class="selection_checkbox">
				        		<li>
				        			
				        		</li>
				        		
				        	</ul>
				        </div>
				        <!-- 已选条件 -->	
				        <div class="selected_res"><img class="title_icon" src="pages/dealDetails/img/title_icon.png" alt="">选中结果</div>
				        <div class="selected_res_con">
				        </div>
				      </div>
				 	</div>
	            <div class="modal-footer">
	            	<button type="button" class="btn btn-primary save" id="export_save">导出</button>
	                <button type="button" class="btn btn-default" id="export_quxiao">重置</button>                
	            </div>
	        </div>
	   	</div>
</div>
</div>
			<!--导出成功-->
            <div class="download hide download-success" id="downloadSuccess">
             	<span class="right-cirle"><i></i></span><span>已成功下载至本地</span>
            </div>	
            <!-- 导出失败 -->
            <div class="download hide download-fail" id="downloadFail">
             	<span class="right-cirle">&times;</span><span>下载失败，请稍后再试~</span>
            </div>
            <!-- 提示弹层 --> 
            <div class="modal fade " id="myModalWarn" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                               <!--  <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeed"><span aria-hidden="true">&times;</span></button>
                                </div> -->
                                <div class="modal-body">
                                   	<div class="content">
                                   	
                                   	</div>
	                                <div class="modal-footer">
	                                    <button type="button" class="btn btn-info btn-primary" style="background:#1D86F4" id="konwE">确定</button>
	                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="modal fade"id="myModalFail" tabindex="-1" role="dialog" aria-labelledby="myModalFail">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                                <!-- <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="Close"><span aria-hidden="true">&times;</span></button>
                                   
                                </div> -->
                                <div class="modal-body">
                                <div class="content">
                                    抱歉，您最多可保存5个模板，当前已达上限，该模板未保存成功
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-info btn-primary" data-dismiss="modal" id="ensure">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                     <div class="modal fade" id="myModalExit" tabindex="-1" role="dialog" aria-labelledby="myModalExit">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                                <!-- <div class="modal-header">
                                	<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="CloseM"><span aria-hidden="true">&times;</span></button>
                                </div> -->
                                <div class="modal-body">
                                <div class="content">
                                   您输入的模板名称已存在，请您重新输入！
                                   </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-info btn-primary" data-dismiss="modal" id="ensure_">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    <script src="<%=contextPath %>/lib/bootstrap/bootstrap-select.js"></script>
    <script src="<%=contextPath %>/lib/bootstrap/bootstrap-table.js"></script>
   	<script src="<%=contextPath %>/js/common-m.js"></script>
	<script src="<%=contextPath %>/lib/bootstrap/bootstrap-multiselect.js"></script>
    <script src="<%=contextPath %>/js/common-wjc/extendPagination.js"></script>
	<script src="<%=contextPath %>/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script src="<%=contextPath %>/lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="<%=contextPath %>/pages/dealDetails/js/dealDetails.js"></script>
</body>
</html>