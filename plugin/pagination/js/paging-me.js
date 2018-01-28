+function ($, window, document, undefined) {
    //定义分页类
    function Paging (element, options) {
        this.element = element;

        //传入形参
        this.options = {
            pageNo: options.pageNo || 1,
            totalPage: options.totalPage,
            totalSize: options.totalSize,
            callback: options.callback
        }

    };// Paging


    //Paging的实例对象添加公共的属性和方法
    Paging.prototype = {
        constructor: Paging,

        creatHtml: function () {
            var me = this;
            var html = '';
            var current = me.options.pageNo;
            var total = me.options.totalPage;
            var totalNum = me.options.totalSize;

            html +=
                "<div class=\"i-line-first\">首页</div>" +
                "<div class=\"i-line-prev \">上一页</div>";

        },// creatHtml

        bindEvent: function () {

        },// bindEvent


    };// prototype


    //通过jQuery对象初始化分页对象
    $.fn.paging = function (options) {
        return new Paging($(this), options)

    }

}($, window, document);