# jQuery
jqueryDemo

```javascript
function loadTree(tData){
    var ul = $('<ul>');
    for(var i=0; i<tData.length; i++){
        var li = $('<li>').appendTo(ul);
        var node = $('<a>').appendTo(li);
        var icon = $('<i>').css('margin-right','5').appendTo(node);
        var aTree = $('<span>').html(tData[i].title).appendTo(node);

        // 处理有子节点的
        if(tData[i].children != undefined){
            // 添加图标样式
            icon.addClass('fa fa-minus-square-o');
            var ic = $('<i>').addClass('fa fa-folder-open-o');
            icon.after(ic).addClass('status');
            node.addClass('tree-node');//has

            // 递归遍历子节点
            loadTree(tData[i].children).appendTo(li);
        } else{
            icon.addClass('fa fa-file-text-o');
            // 叶子节点新增是否可选
            //$('<input>').addClass('candidate').val(tData[i].candidate).css('display','none').appendTo(li);
        }
    }
    return ul;
}

/**
 * 节点点击事件
 * @param  {[type]} box 存在菜单树的盒子
 */
function nodeClick(box){
    box.find('.tree-node').click(function(){
        // 判断该节点是否开启
        if($.trim($(this).find('.open').val()) == 'true'){
            // 已开启，则关闭节点
            $(this).next().slideUp(500);
            $(this).find('.open').val('false');
            $(this).find('.status').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        } else{
            // 开启前关闭节点下的所有节点
            $(this).next().find('.tree-node').each(function(){
                $(this).next().css('display','none');
                $(this).find('.open').val('false');
                $(this).find('.status').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            })

            // 已关闭，则开启节点
            $(this).find('.open').val('true');
            $(this).find('.status').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
            // 开启节点下的节点
            $(this).next().slideDown(500);
        }
    })
}
```