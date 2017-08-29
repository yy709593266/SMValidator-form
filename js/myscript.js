define([], function(require, exports, module){
    module.exports = Backbone.View.extend({
        el: "#container",
        data: [],
        submitData: {
		    netZoneList: [],
            serverType: []
        },
        events: {
            "click #add": "showAdd",
            "click .js-check":"choseDft",
            "click #nextStep": "nextStep",
            "click #prevStep": "prevStep",
            "click #goFirstStep": "showFirstStep",
            "click #goSecondStep": "nextStep",
            "keyup #searchWord": "searchWord"       //搜索树结构内容
        },
        initialize: function(){
            this.willNodeList = [];
            this.initTable();
            this.initForm2nd();
        },
        showAdd: function(){
            var that = this;
            this.$('[role="addDialog"]').find('.modal-title').html('修改服务器配置').end().modal('show');
            this.getData('', function(data){
                $("#firstStepTable").bootstrapTable("load", data);
                that.data = data;
                that.resetFields(0,data);
            });
            //清空表单
            SMValidator.reset('#wifiserverForm1st');
            $('#wifiserverForm1st')[0].reset();
            SMValidator.reset('#wifiserverForm2nd');
            $('#wifiserverForm2nd')[0].reset();

            // //显示第一步表单
            this.showFirstStep();
        },
        initTable: function(){
            $("#firstStepTable").bootstrapTable({
                columns: [
                    {
                        title: '序号',
                        align: 'center',
                        formatter: function (value, row, index) {
                            return index + 1;
                        }
                    },{
                        title:"网域名称",
                        align:'center',
                        field:"netZoneName"
                    },{
                        title:"服务器IP",
                        field:'ip',
                        formatter: function(value, row, index){
                            return "<input class='js-ip form-control' name='ipCode_"+index+"' type='text' value='"+(value||'')+"'>"
                        }
                    },{
                        title: '默认网域',
                        field:'isDefault',
                        formatter: function(value, row, index){
                            return '<input name="defaultChk" type="radio" class="js-check" '+(value ? 'checked' : '')+'>';
                        }
                    }
                ]
            });
            $('.fixed-table-loading').hide();
        },
        getData: function(id, callback){
            var data = [{
                            ip: null,
                            isDefault: 1,
                            netZoneName: 'Item 1'
                        }, {
                            ip: null,
                            isDefault: null,
                            netZoneName: 'Item 2'
                        }, {
                            ip: null,
                            isDefault: null,
                            netZoneName: 'Item 3'
                        }];
            callback(data);
        },
        resetFields: function(curIndex, data){
            var fields = {};
            $.each(data, function(index, item){
                if(curIndex == index){
                    fields['ipCode_'+index] = 'required("默认网域不能为空")|ipValid'
                }else{
                    fields['ipCode_'+index] = 'ipValid'
                }
            });
            this.initForm1st(fields);
        },
        initForm1st: function(fields){
            new SMValidator('#wifiserverForm1st', {
                failCss: '++has-error', // 当前是内联表单（input外有套一层，需要将样式层级提升）
                passCss: '++has-success',
                rules: {
                    ipValid: function(val){
                        return /((1[0-9][0-9]\.)|(2[0-4][0-9]\.)|(25[0-5]\.)|([1-9][0-9]\.)|([0-9]\.)){3}((1[0-9][0-9])|(2[0-4][0-9])|(25[0-5])|([1-9][0-9])|([0-9]))/.test(val) || '请输入正确的ip地址';
                    }
                },
                fields:fields
            });
        },
        initForm2nd: function () {
            var that = this;
            new SMValidator('#wifiserverForm2nd', {
                failCss: '++has-error', // 当前是内联表单（input外有套一层，需要将样式层级提升）
                passCss: '++has-success',
                fields: {
                    serverName: 'required("不能为空")',
                    ipAddress: 'required("不能为空")',
                    defaultDomain: 'required("不能为空")'
                }
            });
            //树ztree
            var setting = {
                async: {
                    enable: false
                },
                data:{
                    simpleData:{
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: 0
                    }
                },
                //是否能够多选
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    autoCheckTrigger: true
                },
                //搜索高亮
                view: {
                    fontCss: that.getFontCss
                },
                //点击事件
                callback: {
                    onClick: function(event, treeId, treeNode){
                        console.log(treeNode);
                    }
                }
            };
            var treeData = [
                {
                    name: "主控制中心", 
                    open: true,  
                    isParent:true 
                },
                {
                    name: "滨江",
                    open: true,
                    id: 1, 
                    children: [       
                            {
                                name: "11111"
                            },
                            {
                                name: "22222"
                            },
                            {
                                name: "2223333"
                            },
                            {
                                name: "2222333",
                                open: true,
                                children: [{
                                    name:"11112222"
                                }]
                            }
                        ]
                }

                ];
            that.zTreeObj = $.fn.zTree.init($("#authTree00"), setting, treeData);
        },
        searchWord: function(){
            var that = this;
            that.updateNodes(that.willNodeList, false);
            var keyWord = $('#searchWord').val();
            if(keyWord != "") {
                //得到匹配项
                that.willNodeList = that.zTreeObj.getNodesByParamFuzzy("name", keyWord);
            }else {
                that.willNodeList = [];
            }
            that.updateNodes(that.willNodeList, true);
        },
        updateNodes: function(list, highlight){
            var that = this;
            for(var i = 0, len = list.length; i < len; i++) {
                list[i].highlight = highlight;
                that.zTreeObj.updateNode(list[i]);
            }
        },
        getFontCss: function(treeId, treeNode){
            return (!!treeNode.highlight) ? {color: "orange"}: {color: "#333"};
        },
        choseDft: function(e){
            var $node = $(e.currentTarget);
            var curIndex = $node.parents("tr").index();
            SMValidator.reset('#wifiserverForm1st');
            $("#wifiserverForm1st").find(".js-ip").each(function(index, item){
                //删除该属性,还原表单元素都验证之前的状态
                delete item._sm;
            });
            this.resetFields(curIndex,this.data);
            console.log(this.data);
        },
        nextStep: function(){
            var that = this;
            //校验(寻找当前被checked的input值是否符合校验)
            if (!SMValidator.validate('#wifiserverForm1st')) return;
            //获取网域的值,第一步表单的内容
            var zoneList = [];
            $('#firstStepTable tbody tr').each(function(index){
                var zone = {};
                zone.netZoneName = $(this).children('td').eq(1).text();
                zone.ip = $(this).children('td').eq(2).find('input').val();
                zone.isDefault = $(this).children('td').eq(3).find('input').is(':checked') ? 1 : 0;
                zone.netZoneId = that.data[index].netZoneId;
                zone.serverId = that.data[index].serverId;
                zoneList.push(zone);
            });
            this.submitData.netZoneList = zoneList;

            //切换到下一步表单展示
            $('.serverStep li').toggleClass('active');
            $('.wifiserverForm').toggleClass('hide');
            $('.modal-footer').toggleClass('hide');

            //将默认网关信息填入第二页表单中,并将其设置为不可写
            var $defaultSelectRadio = $('input[type="radio"]:checked');
                //上一页中默认网关选中的ip地址
            var $defaultSelectText = $($($($defaultSelectRadio.parent()).prev()).children());
            // var $defaultSelectText = $($defaultSelectRadio).parents('td').eq()
                //上一页中默认网关选中的网域名称
            var $defaultSelectName = $($($($defaultSelectRadio.parent()).prev()).prev());
            $('#ipAddress').val($defaultSelectText.val()).attr('disabled', true);
            $('#defaultDomain').val($defaultSelectName.text()).attr('disabled', true);
        },
        prevStep: function(){
            this.showFirstStep();
        },
        //显示第一步表单
        showFirstStep: function(){
            $('.serverStep li').removeClass('active');$($('.serverStep li')[0]).addClass('active');
            $('.wifiserverForm').removeClass('hide');$($('.wifiserverForm')[1]).addClass('hide');
            $('.modal-footer').removeClass('hide');$($('.modal-footer')[1]).addClass('hide');
        }
    });
});