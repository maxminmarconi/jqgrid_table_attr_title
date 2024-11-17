$(document).ready(function() {
    // 设置中文
    $.jgrid.defaults.regional = 'cn';
    
    // 准备本地数据
    var localData = [
        { id: 1, name: "将默认的title属性自定义为showtitle，然后对showtitle修改样式。将默认的title属性自定义为showtitle，然后对showtitle修改样式。将默认的title属性自定义为showtitle，然后对showtitle修改样式。", age: 25, city: "北京", salary: 8000 },
        { id: 2, name: "李四", age: 30, city: "上海", salary: 10000 },
        { id: 3, name: "王五", age: 28, city: "广州", salary: 9000 },
        { id: 4, name: "赵六", age: 35, city: "深圳", salary: 12000 }
    ];

    try {
        // 首先初始化全局tooltip设置
        $(document).tooltip({
            items: ".tooltip-cell",
            content: function() {
                // 获取原始title内容
                var title = $(this).attr('title');
                // 处理换行，确保长文本正确显示
                return $('<div>').text(title).html();
            },
            track: true,
            show: {
                effect: "fadeIn",
                duration: 200
            },
            hide: {
                effect: "fadeOut",
                duration: 200
            },
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit"
            },
            tooltipClass: "ui-tooltip-large"
        });

        $("#jqGrid").jqGrid({
            datatype: "local",
            data: localData,
            colModel: [
                { 
                    label: 'ID', 
                    name: 'id', 
                    width: 75,
                    cellattr: function(rowId, value, rowObject) {
                        return ' class="tooltip-cell" data-custom-title="ID: ' + value + '"';
                    }
                },
                { 
                    label: '姓名', 
                    name: 'name', 
                    width: 150,
                    cellattr: function(rowId, value, rowObject) {
                        return ' class="tooltip-cell" data-custom-title="姓名: ' + value + '"';
                    }
                },
                { 
                    label: '年龄', 
                    name: 'age', 
                    width: 150,
                    cellattr: function(rowId, value, rowObject) {
                        return ' class="tooltip-cell" data-custom-title="年龄: ' + value + '岁"';
                    }
                },
                { 
                    label: '城市', 
                    name: 'city', 
                    width: 150,
                    cellattr: function(rowId, value, rowObject) {
                        return ' class="tooltip-cell" data-custom-title="城市: ' + value + '"';
                    }
                },
                { 
                    label: '薪资', 
                    name: 'salary', 
                    width: 150, 
                    formatter: 'currency',
                    cellattr: function(rowId, value, rowObject) {
                        return ' class="tooltip-cell" data-custom-title="薪资: ￥' + value + '"';
                    }
                }
            ],
            viewrecords: true,
            height: 'auto',
            width: 780,
            rowNum: 10,
            pager: "#jqGridPager",
            caption: "员工信息表",
            responsive: true,
            autowidth: true,
            
            // 移除onCellSelect事件，因为我们已经在全局设置了tooltip
        });
        
        // 为tooltip-cell类的元素绑定事件
        $(document).on('mouseenter', '.tooltip-cell', function() {
            $(this).attr('title', $(this).attr('data-custom-title'));
        });
        
        // 确保表格在窗口调整大小时重新计算宽度
        $(window).on('resize', function() {
            $("#jqGrid").setGridWidth($(".ui-jqgrid").parent().width());
        });
        
    } catch (error) {
        console.error("jqGrid 初始化错误:", error);
    }
}); 