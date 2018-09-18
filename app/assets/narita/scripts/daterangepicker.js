(function($) {
    $.DateRangePicker = function(options) {

        var opts = $.extend({}, $.DateRangePicker.defaults, options),
            mobile = false;

        var days, dateLocale, opts, nights;
        var isMobile = $(window).width() <= 767;

        if (opts.locale === 'tw') {
            days = ['星期日','星期六', '星期一', '星期二', '星期三', '星期四', '星期五'];
            dateLocale = {
                months: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'
                ],
                days: ['一','二', '三', '四', '五', '六', '日' ],
                yearSuffix: '年',
                dateSuffix: '日',
                nights: '晚',
                night: '晚'
            }
            opts.l = dateLocale;
        } else if (opts.locale === 'ja') {
            days = [ '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
            dateLocale = {
                months: ['1月', '2月', '3月', '4月', '5月', '6月',
                    '7月', '8月', '9月', '10月', '11月', '12月'
                ],
                days: [ '月', '火', '水', '木', '金', '土', '日'],
                yearSuffix: '年',
                dateSuffix: '日',
                nights: '泊',
                night: '泊'
            }
            opts.l = dateLocale;
        } else
        if (opts.locale === 'ko') {
            days = [ '일요일','월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            dateLocale = {
                months: ['1월', '2월', '3월', '4월', '5월', '6월',
                    '7월', '8월', '9월', '10월', '11월', '12월'
                ],
                days: [ '월', '화', '수', '목', '금', '토', '일'],
                yearSuffix: '년',
                dateSuffix: '日',
                nights: '박',
                night: '박'
            }
            opts.l = dateLocale;
        } else if (opts.locale === 'cn') {

            days = [ '星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            dateLocale = {
                months: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'
                ],
                days: [ '一', '二', '三', '四', '五', '六', '日'],
                yearSuffix: '年',
                dateSuffix: '日',
                nights: '晚',
                night: '晚'
            }
            opts.l = dateLocale;
        } else {
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            dateLocale = {
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                yearSuffix: '',
                dateSuffix: '',
                nights: 'nights',
                night: 'night'
            }

            opts.l = dateLocale;
        }
        var container = $(opts.container),
            singleDatePicker = opts.singleDatePicker,
            containerValues = container.find('.values'),
            containerCalendar = container.find('.calendar'),
            containerCalendarContainer = container.find('.calendarContainer'),
            backdrop = container.find('.calendar-backdrop');

        function getDateLocale(value, thiru) {
            var day = value.getDay();
            var thisMonth = opts.l.months[value.getMonth()];
            var dayName = days[value.getDay()];
            var yearSuffix = opts.l.yearSuffix;
            var dateSuffix = opts.l.dateSuffix;
            var year = value.getFullYear(),
                month = value.getMonth() + 1,
                day = value.getDate();
            if (opts.locale == 'en') {
                var dateText;
                if ($(window).width() < 769) {
                  if(thiru){
                    dateText = '<div class="year"> ' + year + '</div><div class="month"> ' + thisMonth + '</div><div class="day"> ' + day + '</day><div class="dayoftheweek">' + dayName + '</div>';

                  }else
                    {dateText = '<div class="day"> ' + day + '</div><div class="month"> ' + thisMonth + '</div><div class="dayoftheweek">' + dayName + '</div>';}
                } else {
                    dateText = '<div class="year"> ' + year + '</div><div class="month"> ' + thisMonth + '</div><div class="day"> ' + day + '</day><div class="dayoftheweek">' + dayName + '</div>';
                }
            } else {
                var dateText;
                if ($(window).width() < 769) {
                  if(thiru){
                    dateText = '<div class="year">' + year + yearSuffix + '</div><div class="month">' + thisMonth + '</div><div class="day">' + day + dateSuffix + '</day><div class="dayoftheweek">' + dayName + '</div>';

                  }else
                  {  dateText = '<div class="day"> ' + day + '</div><div class="month"> ' + thisMonth + '</div><div class="dayoftheweek">' + dayName + '</div>';}
                } else {
                    dateText = '<div class="year">' + year + yearSuffix + '</div><div class="month">' + thisMonth + '</div><div class="day">' + day + dateSuffix + '</day><div class="dayoftheweek">' + dayName + '</div>';
                }
            }
            return dateText;
        }

        function init() {
            checkButtonClear();
            var now = getDateLocale(new Date());
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var nextDay = getDateLocale(tomorrow);

            if (!containerValues.find('span.date_at').html()) {
                containerValues.find('span.date_at').html(now);
            }
            if (!containerValues.find('span.date_to').html()) {
                containerValues.find('span.date_to').html(nextDay);

                container.find('span.daysFromTo').html(getDateLocale(new Date(), true) + ' ~ ' +  getDateLocale(tomorrow, true));

            }

            if (opts.date_at == '') {
                containerValues.find('span.date_at').text(opts.l.at);
            } else {
                var date_at_ = new Date(opts.date_at),
                    date_at__ = getDateLocale(date_at_);
                containerValues.find('span.date_at').html(date_at__);
            }

            if (opts.date_to == '') {
                containerValues.find('span.date_to').text(opts.l.to);
            } else {
                var date_to_ = new Date(opts.date_to),
                    date_to__ = getDateLocale(date_to_);
                containerValues.find('span.date_to').html(date_to__);
            }
        }
        // Initialize
        init();

        function createCalendar(year, month, direction, max_m = 3) {


            if((opts.date_at != '') && (opts.date_to != '') )
            {
              container.find('span.daysFromTo').html(getDateLocale(new Date(opts.date_at), true)+ ' ~ ' + getDateLocale(new Date(opts.date_to), true));

            }
            var html;

            var start = 1;

            for (var m = start; m <= max_m; m++) {

                var Dlast = new Date(year, month + m, 0).getDate(),
                    D = new Date(year, month + m - 1, Dlast),
                    DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
                    DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),

                    html = '<tr>';
                for (var i = 0; i <= 6; i++) {
                    html += '<th>' + opts.l.days[i] + '</th>';
                }
                html += '</tr>';

                if (DNfirst != 0) {
                    for (var i = 1; i < DNfirst; i++) html += '<td>&nbsp;</td>';
                } else {
                    for (var i = 0; i < 6; i++) html += '<td>&nbsp;</td>';
                }

                for (var i = 1; i <= Dlast; i++) {

                    if (new Date(D.getFullYear(), D.getMonth(), i + 1) < new Date() && opts.inactive == true) {
                        html += '<td class="inactive' + checkDates(D.getFullYear(), D.getMonth(), i) + '"><span>' + i + '</span></td>';
                    } else {
                        html += '<td class="valid' + checkDates(D.getFullYear(), D.getMonth(), i) + '" data-year="' + D.getFullYear() + '" data-month="' + (D.getMonth() + 1) + '"><span>' + i + '</span></td>';
                    }
                    if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                        html += '<tr>';
                    }
                }

                html = '<table data-year="' + D.getFullYear() + '" data-month="' + D.getMonth() + '"><caption>' + opts.l.months[D.getMonth()] + ' ' + D.getFullYear() + '</caption>' + html + '</table>';
                if (direction == 'prev') {
                    var width = containerCalendarContainer.find('table').innerWidth() + -10;
                    containerCalendar.find('table:last').remove();
                    containerCalendarContainer.animate({
                        //left: '10px',
                    }, 200, function() {
                        //containerCalendarContainer.css('left', '-' + width + 'px').prepend(html);
                        containerCalendarContainer.prepend(html);
                    });
                } else if (direction == 'next') {
                    var width = containerCalendarContainer.find('table').innerWidth() + -10;
                    containerCalendarContainer.animate({
                        //left: '-' + (width * 2 + 10) + 'px',
                    }, 200, function() {
                        containerCalendar.find('table:first').fadeOut(0, function() {
                            $(this).remove();
                            //containerCalendarContainer.css('left', '-' + width + 'px');
                        });
                    }).append(html);
                } else {
                    containerCalendarContainer.append(html);
                }

            }
        }
        // Check the dates in the calendar
        function checkDates(year, month, day) {
            var date = year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2);
            //alert(opts.date_at);
            if (opts.date_at == '' && opts.date_to == '' && !singleDatePicker && !isMobile) {
                containerCalendar.find('td.valid:first').addClass('start');
                containerCalendar.find('td.valid:eq(1)').addClass('end');
            } else if (opts.date_at == '' && opts.date_to == '' && !isMobile) {
                containerCalendar.find('td.valid:first').addClass('start');
            }
            if (opts.date_at != '' && opts.date_at == date) {
                return ' start';
            }
            if (opts.date_to != '' && opts.date_to == date) {
                return ' end';
            }

            var date_at_ = new Date(opts.date_at),
                date_to_ = new Date(opts.date_to),
                date_ = new Date(date);
            if (date_at_ < date_ && date_to_ > date_) {
                return ' intermediate';
            }

            return '';
        }


        // Hide the calendar when clicking anywhere else
        $(document).click(function(event) {
            if ($(event.target).closest(opts.container).length)
                return;
            closeCalendarAndEmpty();
            event.stopPropagation();
        });


        // Open the calendar
        containerValues.on('click', 'span', function() {

            // containerValues.find('.clear').hide();
            //
            // containerValues.find('span.date_at').text(opts.l.at);
            // containerValues.find('span.date_to').text(opts.l.to);
            //
            //
            // opts.date_at = '';
            // opts.date_to = '';
            // containerCalendar.find('td').removeClass('start intermediate end');
            //
            // containerValues.find('.value').find('input').val('').change();

            if (containerCalendar.is(':hidden')) {
                if (opts.date_at != '') {
                    console.log(opts.date_at)
                    var list = opts.date_at.split('-');
                    var year = Number(list[0]),
                        month = Number(list[1]) - 2;
                    createCalendar(year, month, '');
                } else {
                    var year = new Date().getFullYear(),
                        month = Number(new Date().getMonth()) - 1;
                    createCalendar(year, month, '');
                }
            }

            container.addClass('active').find('.value').removeClass('active');
            $(this).parent('.value').addClass('active');
            opts.inputActive = $(this).attr('class');

            backdrop.css('display', 'block');
        });


        // Turn over the calendar back
        containerCalendar.off('click', '.button-prev').on('click', '.button-prev', function() {
            var year = containerCalendarContainer.find('table:first').data('year'),
                month = parseFloat(containerCalendarContainer.find('table:first').data('month')) - 1,
                m_max = 1;
            createCalendar(year, month, 'prev', m_max);
        });

        containerCalendar.on('click', '.closePopup', function() {
            closeCalendarAndEmpty();
        });


        // Turn over the calendar next
        containerCalendar.off('click', '.button-next').on('click', '.button-next', function() {
            var year = containerCalendarContainer.find('table:last').data('year');
            var month = parseFloat(containerCalendarContainer.find('table:last').data('month')) + 1;
            var m_max = 1;
            createCalendar(year, month, 'next', m_max);
        });


        // Assign a date
        containerCalendar.on('click', 'td.valid', function() {
            var year = Number($(this).data('year')),
                month = Number($(this).data('month'));

            if (opts.inputActive == 'date_at') {
                clearAll();

            } else if (opts.date_at == '' && opts.inputActive == 'date_to') {
                opts.inputActive = 'date_at'

            }

            console.log('opts.inputActive ' + opts.inputActive)
            if (opts.inputActive == 'date_at') {
                containerCalendar.find('td.valid').removeClass('hovered');
                var start = $(this).text();
                containerCalendar.find('td.valid').removeClass('start');
                $(this).addClass('start');


                opts.date_at = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + $(this).text()).slice(-2);
                var date_at_ = new Date(opts.date_at);
                var checkoutDate = new Date(opts.date_at);
                var date_to_ = (opts.date_to) ? new Date(opts.date_to) : new Date(checkoutDate.setDate(checkoutDate.getDate() + 1));
                if (singleDatePicker) {
                    date_to_ = date_at_;
                    closeCalendarAndEmpty();
                    clearAll();
                }
                if (date_at_ >= date_to_) {
                    date_to_ = new Date(checkoutDate.setDate(checkoutDate.getDate() + 1));
                    opts.date_to = new Date(checkoutDate.setDate(checkoutDate.getDate() + 1));
                    opts.inputActive = 'date_to';
                    container.find('input.date_to').val('');
                    container.find('.value').removeClass('active');
                    container.find('span.date_at').html(getDateLocale(date_at_));
                    container.find('span.date_to').html(getDateLocale(date_to_));
                    container.find('.value.date_to').addClass('active');
                    containerValues.find('span.date_to').text(opts.l.to);
                    //containerCalendar.find('td.valid').removeClass('end');
                    $(this).next().addClass('end');
                    container.find('.value.date_to').addClass('active');
                } else {
                    container.find('span.date_at').html(getDateLocale(date_at_));
                    //container.find('span.daysFromTo').html(getDateLocale(date_at_) + ' to ' + getDateLocale(date_to_));
                    opts.inputActive = 'date_to';
                    container.find('.value').removeClass('active');
                    container.find('.value.date_to').addClass('active');
                }
                if (!singleDatePicker) {
                    checkHover(containerCalendar.find('td.valid.end'), 'click');
                }
            } else {

                var end = $(this).text();
                containerCalendar.find('td.valid').removeClass('end');
                $(this).addClass('end');
                opts.inputActive = 'date_at';

                opts.date_to = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + $(this).text()).slice(-2);
                var date_at_ = new Date(opts.date_at),
                    date_to_ = new Date(opts.date_to);


                if (date_at_ >= date_to_) {
                    console.log('greater ')
                    opts.date_at = date_to_;
                    //date_at_ = date_to_;
                    container.find('span.date_at').html(getDateLocale(date_to_));
                    //container.find('span.daysFromTo').html(getDateLocale(date_at_) + ' to ' + getDateLocale(date_to_));
                    opts.date_to = '';
                    opts.inputActive = 'date_to';
                    opts.date_at = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + $(this).text()).slice(-2);
                    date_to_ = '';

                    container.find('input.date_to').val('');
                    container.find('.value').removeClass('active');
                    containerValues.find('span.date_to').text(opts.l.to);
                    containerCalendar.find('td.valid').removeClass('end');
                    containerCalendar.find('td.valid').removeClass('start');

                    container.find('.value.date_to').addClass('active');
                    $(this).addClass('start');
                    $(this).removeClass('end');

                } else {

                    if (opts.inputActive == 'date_at') {
                        containerCalendar.find('td.valid').removeClass('intermediate');
                        checkHover(containerCalendar.find('td.valid.end'), 'click');
                    }

                    container.find('span.date_to').html(getDateLocale(date_to_));
                    container.find('span.daysFromTo').html(getDateLocale(date_at_, true) + ' ~ ' + getDateLocale(date_to_, true));

                    var date1 = new Date(date_at_);
                    var date2 = new Date(date_to_);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (diffDays == 1) {
                        container.find('.nights').html(diffDays + ' ' + opts.l.night);
                    } else {
                        container.find('.nights').html(diffDays + ' ' + opts.l.nights);
                    }

                    closeCalendarAndEmpty();

                }
                //  closeCalendarAndEmpty();
                if (!singleDatePicker) {
                    checkHover(containerCalendar.find('td.valid.start'), 'click');
                }

            }

            if (opts.date_at != '' && opts.date_to != '' && containerCalendar.is(':hidden')) {
                container.find('input.date_at').val(opts.date_at).change();
                container.find('input.date_to').val(opts.date_to).change();

                var date_at_ = new Date(opts.date_at),
                    date_at__ = getDateLocale(date_at_),
                    date_to_ = new Date(opts.date_to),
                    date_to__ = getDateLocale(date_to_);

                containerValues.find('.close').trigger('click');
            }

            checkButtonClear();

        });

        function clearAll() {
            containerValues.find('.clear').hide();

            containerValues.find('span.date_at').text(opts.l.at);
            containerValues.find('span.date_to').text(opts.l.to);

            if (!singleDatePicker) {
                opts.date_at = '';
                opts.date_to = '';
                //date_at_ > date_to_

                containerCalendar.find('td').removeClass('start intermediate end');

                containerValues.find('.value').find('input').val('').change();
            } else {
                opts.date_to = '';
                containerCalendar.find('td').removeClass('intermediate end');
            }

        }


        // Clear values
        containerValues.on('click', '.clear', function() {
            containerValues.find('.clear').hide();

            containerValues.find('span.date_at').text(opts.l.at);
            containerValues.find('span.date_to').text(opts.l.to);


            opts.date_at = '';
            opts.date_to = '';

            containerCalendar.find('td').removeClass('start intermediate end');

            containerValues.find('.value').find('input').val('').change();
        });


        // Highlights the range when hovering
        containerCalendar.on('mouseenter', 'td.valid', function() {
            if (opts.date_at != '' && opts.date_to == '' && !singleDatePicker) {
                checkHover($(this), 'hover');
            }

        }).on('mouseleave', 'td', function() {
            if (opts.date_at != '' && opts.date_to == '') {
                $(this).removeClass('hovered');
                containerCalendar.find('td').removeClass('intermediate-hover intermediate');
            }
        });
        // function of Highlights the range when hovering
        function checkHover(element, method) {
            //  containerCalendar.find('td').removeClass('intermediate-hover intermediate');

            var year = Number(element.data('year')),
                month = Number(element.data('month')),
                day = Number(element.text());
            var date_at_ = new Date(opts.date_at);
            var date_ = new Date(year + '-' + month + '-' + day);

            if (opts.date_at != '' && date_at_ < date_) {
                element.addClass('hovered');
                var elements = containerCalendarContainer.find('td.valid');
                var intermediate = false;
                if (!elements.hasClass('start')) {
                    var intermediate = true;
                }
                $.each(elements, function(key, value) {
                    var class_ = $(this).attr('class');
                    if (class_.indexOf('start') + 1 && (opts.date_to == '' || method == 'click')) {
                        intermediate = true;
                    } else if (class_.indexOf('hovered') + 1) {
                        intermediate = false;
                    }
                    if (intermediate == true) {
                        if (method == 'click') {
                            $(this).addClass('intermediate');
                        } else {
                            $(this).addClass('intermediate-hover');
                        }
                    }
                });
            }
        }

        // Add clear button
        function checkButtonClear() {
            if (opts.date_at != '' || opts.date_to != '') {
                containerValues.find('.clear').show();
            }
        }

        // Close Calendar
        function closeCalendarAndEmpty() {
            container.find('input.date_at').val(opts.date_at);
            container.find('input.date_to').val(opts.date_to);

            if (opts.date_at !== '' && !singleDatePicker) {
                var date_at_ = new Date(opts.date_at);
                var checkoutDate = new Date(opts.date_at);
                var date_to_ = (opts.date_to) ? new Date(opts.date_to) : new Date(checkoutDate.setDate(checkoutDate.getDate() + 1));

            }

            if (!opts.date_to && opts.date_at && !singleDatePicker) {
                var checkoutDate = new Date(opts.date_at);
                var date_to_ = (opts.date_to) ? new Date(opts.date_to) : new Date(checkoutDate.setDate(checkoutDate.getDate() + 1));
                container.find('span.date_to').html(getDateLocale(date_to_));
                opts.date_to = date_to_.toISOString().split('T')[0];
                containerCalendar.find('td.start').next().addClass('end');
            }

            container.removeClass('active').find('.value').removeClass('active');

            containerCalendarContainer.empty();

            $('body').css('position', '');
            backdrop.css('display', 'none');
        }
    }

    // plugin defaults
    $.DateRangePicker.defaults = {
        container: '#DateRangePicker',

        inputActive: 'date_at',

        inactive: 1,

        date_at: '',
        date_to: '',
        locale: '',
        l: {}
    };
})(jQuery);
