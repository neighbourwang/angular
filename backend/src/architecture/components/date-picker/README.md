# 日历控件

效果图：

![效果图](https://github.hpe.com/FoxCloud/html-css/blob/master/lib/readme-img/data-picker.png?raw=true)



共有三个属性：

options(可选) ：自定义日历的对象，具体属性可参考最下方的表格

initDate(可选) ：初始化载入组件时可传入一个默认的日期 是一个string

dateChanged(**必选**) ：选择日期时的事件



### 例子

html：

```html
<date-picker [options]="myDatePickerOptions"  
             [initDate]= "'2017-06-21'" 
             (dateChanged)="onDateChanged($event)"></date-picker>
```

javascript：

```javascript
 myDatePickerOptions = {   //如果自定义的话传入下方表格相应的属性   这个是可选的
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
        disableUntil: {year: 2016, month: 8, day: 10},
        selectionTxtFontSize: '16px'
    };

 onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }
```


### options 属性

options是一个javascript对象，你可以传入以下自定义属性。


| 属性                            | 默认                                       | 描述                                       |
| :---------------------------- | :--------------------------------------- | :--------------------------------------- |
| __dayLabels__                 | {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'} | Day labels visible on the selector.      |
| __monthLabels__               | { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' } | Month labels visible on the selector.    |
| __dateFormat__                | yyyy-mm-dd                               | Date format on selection area and callback. |
| __todayBtnTxt__               | Today                                    | Today button text.                       |
| __firstDayOfWeek__            | mo                                       | First day of week on calendar. One of the following: mo, tu, we, th, fr, sa, su |
| __sunHighlight__              | true                                     | Sunday red colored on calendar.          |
| __editableMonthAndYear__      | true                                     | Is month and year labels editable or not. |
| __minYear__                   | 1000                                     | Minimum allowed year in calendar. Cannot be less than 1000. |
| __maxYear__                   | 9999                                     | Maximum allowed year in calendar. Cannot be more than 9999. |
| __disableUntil__              | no default value                         | Disable dates backward starting from the given date. For example: {year: 2016, month: 6, day: 26} |
| __disableSince__              | no default value                         | Disable dates forward starting from the given date. For example: {year: 2016, month: 7, day: 22} |
| __disableWeekends__           | false                                    | Disable weekends (Saturday and Sunday).  |
| __inline__                    | false                                    | Show mydatepicker in inline mode.        |
| __height__                    | 34px                                     | mydatepicker height without selector. Can be used if __inline = false__. |
| __width__                     | 100%                                     | mydatepicker width. Can be used if __inline = false__. |
| __selectionTxtFontSize__      | 18px                                     | Selection area font size. Can be used if __inline = false__. |
| __alignSelectorRight__        | false                                    | Align selector right. Can be used if __inline = false__. |
| __indicateInvalidDate__       | true                                     | If user typed date is not same format as __dateFormat__, show red background in the selection area. Can be used if __inline = false__. |
| __showDateFormatPlaceholder__ | false                                    | Show value of __dateFormat__ as placeholder in the selection area if it is empty. Can be used if __inline = false__. |
