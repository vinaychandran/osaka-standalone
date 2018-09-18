'use strict';
const isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isAndroid = /Android/i.test(navigator.userAgent),
    isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent),
    mobileWidth = 767,
    deviceWidth = 1024,
    isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)),
    iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1|OS 11_2_2|OS 11_2_3|OS 11_2_4|OS 11_2_5/.test(navigator.userAgent);
const isMobile = $(window).width() <= mobileWidth;
const isIpad = $(window).width() <= deviceWidth;
var sticky, pageOffset;
const FE = {
    global: {
        lazyLoad: () => {
            const myLazyLoad = new LazyLoad({
                elements_selector: '.lazy',
                threshold: 0,
                callback_enter: function(element){
                    $(element).addClass('loaded');
                }
            });
            myLazyLoad.update();
        },

        playVideo: (evt) => {
            const video = new videoPlayer();
            if (evt.target.attributes.getNamedItem('data-target')) {
                video.closeVideo();
            }
            if (evt.target.attributes.getNamedItem('data-src')) {
                let src = evt.target.attributes.getNamedItem('data-src').value;
                video.openVideo(src);
            }
        },

        clearTimer: () => {
            clearTimeout(triggerVideo);
        },

        videoPlayer: (event) => {
            let evt = event;
            triggerVideo = setTimeout(function() {
                FE.global.playVideo(evt);
            }, 3000);
        },

        navigatePage: (page) => {
            location.href = page;
        },
        tabs: (element) => {
            var tabs = new Tabs({
                elem: element,
                open: 0
            });
            if (document.getElementById('tablink') && isMobile) {
                let tabLink = document.getElementById('tablink');
                tabLink.addEventListener('click', FE.global.openTab);
            }
            if (document.getElementById('resturant-timing-tablink') && isMobile) {
                let tabLink = document.getElementById('resturant-timing-tablink');
                tabLink.addEventListener('click', FE.global.openResturantTab);
            }
            if (document.getElementById('gallery-mask') && isMobile) {
                let tabLink = document.getElementById('gallery-mask');
                tabLink.addEventListener('click', FE.global.closeGalleryMask);
            }
        },
        openModalTab: (element) => {
            var tabs = new Tabs({
                elem: element,
                isModal: true,
                open: 0
            });
        },
        loadFile: (event) => {

            var output = document.getElementById('preview');
            output.src = URL.createObjectURL(event.target.files[0]);

        },
        openTab: (e) => {
            if (document.getElementById('tabs-header') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('tabs-header').style.display = 'block';
                document.getElementById('gallery-mask').style.display = 'block';
                e.target.classList.add('tablink');
            }

            if (document.getElementById('resturant-tabs-header') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('resturant-tabs-header').style.display = 'block';
                document.getElementById('gallery-mask').style.display = 'block';
                e.target.classList.add('tablink');
            }

            if (document.getElementById('room-types') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('room-types').style.display = 'block';
                document.getElementById('gallery-mask').style.display = 'block';
                e.target.classList.add('tablink');
            }
            if (document.getElementById('venue-types') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('venue-types').style.display = 'block';
                document.getElementById('gallery-mask').style.display = 'block';
                e.target.classList.add('tablink');
            }
            e.preventDefault();
        },

        openResturantTab: (e) => {
            if (document.getElementById('resturant-timing-tabs-header') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('resturant-timing-tabs-header').style.display = 'block';
                document.getElementById('gallery-mask').style.display = 'block';
                e.target.classList.add('resturant-timing-tablink');
            }
            e.preventDefault();
        },

        closeGalleryMask: (e) => {
            if (document.getElementById('tabs-header') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('tabs-header').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('tablink').classList.remove('tablink');
            }

            if (document.getElementById('resturant-tabs-header') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('resturant-tabs-header').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('tablink').classList.remove('tablink');
            }

            if (document.getElementById('room-types') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('room-types').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('tablink').classList.remove('tablink');
            }
            if (document.getElementById('venue-types') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('venue-types').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('tablink').classList.remove('tablink');
            }
            if (document.getElementById('resturant-timing-tabs-header') !== null && document.getElementById('gallery-mask') !== null) {
                document.getElementById('resturant-timing-tabs-header').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('resturant-timing-tablink').classList.remove('resturant-timing-tablink');
            }
        },

        checkValidationRules: (x) => {
            let formId = x;
            let fieldId, fieldRegex;
            let errorField = [],
                noError = [];
            let formElem = document.querySelector(formId);
            var inputs = formElem.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i += 1) {
                if (inputs[i].hasAttribute('required') && !inputs[i].value.length) {
                    if (inputs[i].id) {
                        errorField.push(inputs[i].id);
                    }
                } else {
                    if (inputs[i].id) {
                        noError.push(inputs[i].id);
                    }
                }
            }
            if (noError.length) {
                for (let i = 0; i < noError.length; i++) {
                    let element = document.querySelector(formId + ' #' + noError[i]);
                    element.classList.remove('error-border');
                }
            }
            if (errorField.length) {
                for (let i = 0; i < errorField.length; i++) {
                    let element = document.querySelector(formId + ' #' + errorField[i]);
                    element.classList.add('error-border');
                }
                return false;
            } else {
                return true;
            }
        },

        submitForm: () => {
            let lightBoxId = '.basicLightbox--visible';
            if (document.querySelector(lightBoxId + ' .submitRfpForm')) {
                document.querySelector(lightBoxId + ' .submitRfpForm').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#rpfForm');
                });
            }
            if (document.querySelector(lightBoxId + ' .submitNewsForm')) {
                document.querySelector(lightBoxId + ' .submitNewsForm').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#newsForm');
                });
            }
            if (document.querySelector(lightBoxId + ' .bookingForm')) {
                document.querySelector(lightBoxId + ' .bookingForm').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#bookingForm');
                });
            }
            if (document.querySelector(lightBoxId + ' .submitSignup')) {
                document.querySelector(lightBoxId + ' .submitSignup').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#signup');
                });
            }
            if (document.querySelector('.submitProfile')) {
                document.querySelector('.submitProfile').addEventListener('click', function() {
                    FE.global.checkValidationRules('form#profile-form');
                });
            }
            if (document.querySelector(lightBoxId + ' .submitLogin')) {
                document.querySelector(lightBoxId + ' .submitLogin').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#login');
                });
            }
            if (document.querySelector(lightBoxId + ' .reset-form')) {
                document.querySelector(lightBoxId + ' .reset-form').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#reset-form');
                });
            }
            if (document.querySelector(lightBoxId + ' .send-email')) {
                document.querySelector(lightBoxId + ' .send-email').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#reset-user-pwd');
                });
            }
        },

        sliderImage: (slider, slideToShow, dots, arrows) => {
            $(slider).each(function() {
                let imgIndex, sliderImageCount;
                sliderImageCount = $(this).children().length;
                $(this).slick({
                    slidesToShow: slideToShow,
                    slidesToScroll: 1,
                    dots: dots,
                    arrows: arrows,
                    lazyLoad: 'progressive'
                });
                imgIndex = $(this).find('.slider-content').index();
                console.log(sliderImageCount);
                $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
                    if (currentSlide !== undefined) {
                        $(this).closest('.slick-slider').next().find('.number').text(currentSlide + 1);
                        $('.room-info-slider-thumb img').removeClass('active');
                        let thumbnailSlide = currentSlide + 1
                        $('.room-info-slider-thumb img:nth-child(' + thumbnailSlide + ')').addClass('active');
                    }
                });
            });
            $(document).on('click', '.room-info-slider-thumb img', function() {
                var indexThumbnail = $(this).index();
                $('.room-info-slider-thumb img').removeClass('active');
                $(this).addClass('active');
                $(slider).slick('slickGoTo', indexThumbnail);
            });
        },
        instaFeed: () => {
            if (document.getElementById('instafeed')) {
                let instabox = document.getElementById('instafeed');
                let limit = instabox.attributes.getNamedItem('data-limit').value;
                let moreText = instabox.attributes.getNamedItem('data-more').value;
                let moreTextSecond = instabox.attributes.getNamedItem('data-morespan').value;
                let feed = new Instafeed({
                    get: 'tagged',
                    tagName: 'hotelmystays',
                    clientId: '1459052068',
                    accessToken: '1459052068.3a81a9f.656faf6eb84044cea80572ed44299e2e',
                    limit: limit,
                    resolution: 'standard_resolution',
                    template: '<a href="{{link}}" target="_blank" class="insta-image lazy" data-src="{{image}}"><div class="insta-mask"><div class="insta-content"><span class="insta-likes">{{likes}}</span><span class="insta-comments">{{comments}}</span></div></div></a>',
                    after: function() {
                        let node = document.createElement('A');
                        let div = document.createElement('DIV');
                        let span = document.createElement('SPAN');
                        let arrow = document.createElement('I');
                        let textNode = document.createTextNode(moreText);
                        let textNodeSecond = document.createTextNode(moreTextSecond);
                        arrow.className = 'mys-arrow-left white';
                        span.appendChild(textNodeSecond);
                        div.appendChild(textNode);
                        div.appendChild(span);
                        div.appendChild(arrow);
                        node.appendChild(div);
                        node.id = 'more-link';
                        node.href = 'https://www.instagram.com/explore/tags/hotelmystays/';
                        node.target = '_blank';
                        let feed = document.getElementById('instafeed');
                        feed.appendChild(node);
                        FE.global.lazyLoad();
                    },
                });
                feed.run();
            }
        },
        showBookingTab: (evt, tabName) => {
            let i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName('tabcontent');
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = 'none';
            }
            tablinks = document.getElementsByClassName('tablinks');
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(' active', '');
            }
            document.getElementById(tabName).style.display = 'block';
            evt.currentTarget.className += ' active';
        },

        googleMap: () => {

            let selectorMapElement = document.getElementById('gmap_canvas');
            var map;
            if (selectorMapElement) {
                map = new google.maps.Map(document.getElementById('gmap_canvas'), {
                    zoom: 13,
                    center: new google.maps.LatLng(selectorMapElement.dataset.lat, selectorMapElement.dataset.lan),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                let mapMarker = [{
                    position: new google.maps.LatLng(selectorMapElement.dataset.lat, selectorMapElement.dataset.lan),
                    icon: selectorMapElement.dataset.src
                }];
                let mapElem = (document.querySelector('.attractions-list')) ? document.querySelector('.attractions-list') : '';
                var inputs = (mapElem) ? mapElem.getElementsByTagName('li') : '';
                if (inputs.length) {
                    for (var i = 0; i < inputs.length; i += 1) {
                        let mapContent = (inputs[i].getElementsByClassName('map-locator')) ? inputs[i].getElementsByClassName('map-locator') : '';
                        mapMarker.push({
                            position: new google.maps.LatLng(inputs[i].dataset.lat, inputs[i].dataset.long),
                            icon: inputs[i].dataset.src,
                            num: inputs[i].dataset.num,
                            content: mapContent[0].innerHTML
                        })
                    }
                }

                var infoWindow = new google.maps.InfoWindow;
                mapMarker.forEach(function(list) {
                    var marker = new google.maps.Marker({
                        position: list.position,
                        icon: list.icon,
                        map: map,
                        id: list.num
                    });
                    if (list.num) {
                        marker.set('id', list.num);
                        marker.set('label', list.num);
                    }
                    infoWindow.set('content', list.content);
                    google.maps.event.addListener(map, 'click', function(event) {
                        for (var i = 0; i < mapMarker.length; i++) {
                            infoWindow.close();
                        }
                    });
                    if (list.num != undefined) {
                        marker.addListener('click', function() {
                            infoWindow.open(map, marker);
                        });
                    }
                });
            }
        },
        selectPromoCoupon: () => {
            let couponElem = event.currentTarget.parentElement.parentElement;
            if (couponElem.className.indexOf('selected') >= 0) {
                couponElem.classList.remove('selected');
                event.currentTarget.classList.remove('icon-checked');
            } else {
                let input = document.querySelectorAll('.promo-coupon li');
                for (var i = 0; i < input.length; i++) {
                    input[i].classList.remove('selected');
                    input[i].getElementsByTagName('span')[0].classList.remove('icon-checked');
                }
                event.currentTarget.classList.add('icon-checked');
                couponElem.classList.add('selected');
            }

        },
        scroll: () => {
            const scroll = new SmoothScroll('.scroll', {
                speed: 2000,
                offset: function (anchor, toggle) {
                    let imageTags = document.getElementsByClassName('lazy');
                    console.log(imageTags);
                    for (var i = 0; i < imageTags.length; i++) {
                        if(imageTags[i].classList.contains('loaded')) {
                            return 180;
                        } else {
                            return -150;
                        }
                    }                                              
                },                
                header: 'header',
                clip: true,
                before: function(anchor, toggle) {
                    console.log(toggle.className.split(' ')[0]);                    
                    [].forEach.call(
                        anchor.querySelectorAll('.tabs-title'),
                        function(el) {
                            if (el.classList.contains('tabs-title-active')) {
                                el.classList.remove('tabs-title-active');
                            }
                        }
                    );
                    [].forEach.call(
                        anchor.querySelectorAll('.tabs-content'),
                        function(el) {
                            el.style.display = 'none';
                        }
                    );
                    if (toggle.className.split(' ')[0] == 'guestPhotos') {
                        anchor.querySelectorAll('.tabs-title')[1].classList.add('tabs-title-active');
                        anchor.querySelectorAll('.tabs-content')[1].style.display = 'block';
                    } else if (toggle.className.split(' ')[0] == 'hotelPhotos') {
                        anchor.querySelectorAll('.tabs-title')[0].classList.add('tabs-title-active');
                        anchor.querySelectorAll('.tabs-content')[0].style.display = 'block';
                    }
                },
                scrollStart: function(anchor, toggle) {
                    FE.global.lazyLoad();
                }
            });
        },

        pageScroll: () => {
            if (!isMobile && document.getElementById('booking-widget')) {
                sticky = document.getElementById('booking-widget').offsetTop;
                window.onscroll = function() {
                    FE.global.sticky(document.getElementById('booking-widget'))
                };
            }
        },

        changeLanguage: () => {
            let lang = document.getElementsByClassName('selected-lang');

            function showDropDown(e) {
                this.classList.add('active');
            };
            for (var i = 0; i < lang.length; i++) {
                lang[i].addEventListener('click', showDropDown);
            }
        },
        sideNavigation: () => {
            let hamburger = document.getElementById('hamburger');
            let sideNav = document.getElementById('sideNav');
            hamburger.addEventListener('click', function() {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    sideNav.classList.remove('active');
                } else {
                    this.classList.add('active');
                    sideNav.classList.add('active');
                }
            });
        },

        clickOutside: (method, box, targetElement) => {
            $('html').on('click', 'body', function(e) {
                let container = $(box);
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    switch (method) {
                        case 'fade':
                            $(targetElement).stop().fadeOut(100);
                            break;
                        case 'slide':
                            $(targetElement).stop().slideUp();
                            break;
                        case 'active':
                            $(targetElement).stop().removeClass('active');
                            break;
                    }
                    $('body').removeClass('noScrollBody');
                }
            });
        },
        resetForm: () => {
            document.getElementById('resetUser').click();
        },
        closeForm: () => {
            //TODO close functionality
            //document.getElementById('resetUser').click();
        },
        lightBox: () => {
            const getTargetHTML = function(elem) {
                const id = elem.getAttribute('data-show-id')
                const target = document.querySelector(`[data-id="${ id }"]`)
                return target.outerHTML
            }
            document.querySelectorAll('[data-show-id]').forEach(function(elem) {
                const html = getTargetHTML(elem);
                // elem.onclick = basicLightbox.create(html).show;
                elem.onclick = basicLightbox.create(html, {
                    afterShow: (instance) => {
                        FE.global.datePickerInit('.basicLightbox--visible .date-picker-venue-rpf', false);
                        //FE.global.datePickerInit('.date-picker-venue-rpf', false)
                        let SlideNumber = elem.getAttribute('data-slide')
                        FE.global.lazyLoad();
                        FE.global.sliderImage('.gallery-nav', 1, false, true);
                        $('.gallery-nav').slick('slickGoTo', SlideNumber, true);

                        FE.global.submitForm();
                        FE.global.openModalTab('loginForm');
                        FE.global.openModalTab('resturant-tabs');
                        //alert(1);
                    },
                    beforeShow: (instance) => {
                        let body = document.body;
                        body.dataset.form = elem.getAttribute('data-show-id');
                        $('body').addClass('modal-open');
                    },
                    afterClose: (instance) => {
                        $('.gallery-nav').slick('unslick');
                    },
                    beforeClose: (instance) => {
                        $('body').removeClass('modal-open');
                    }
                }).show
            })
            $(document).on('click', '.basicLightbox .closeBtn', function() {
                $('.basicLightbox').removeClass('basicLightbox--visible')
                setTimeout(() => {
                    $('.basicLightbox').remove();
                    //$('.roomPopup .room-info-slider').slick('unslick');

                }, 410);
                $('body').removeClass('modal-open');
            });
            FE.global.lazyLoad();
        },
        resetUserDetails: () => {
            let url = new URL(window.location.href);
            let isReset = url.searchParams.get('reset');
            let isEmail = url.searchParams.get('email');
            if (isReset && !isEmail) {
                document.getElementById('reset').click();
            }
            if (isEmail) {
                document.getElementById('reset-mail').click();
            }
        },
        lightBoxRoom: () => {
            const getTargetHTML = function(elem) {
                const id = elem.getAttribute('data-show-rooms')
                const target = document.querySelector(`[data-id="${ id }"]`)
                return (target) ? target.outerHTML : '';
            }
            document.querySelectorAll('[data-show-rooms]').forEach(function(elem) {
                const html = getTargetHTML(elem);
                let checkSlider = false;
                // elem.onclick = basicLightbox.create(html).show;
                if (checkSlider) {
                    $('.roomPopup .room-info-slider').slick('unslick');
                }
                elem.onclick = basicLightbox.create(html, {
                    className: 'roomPopup',
                    closable: true,
                    beforeShow: (instance) => {
                        
                    },
                    afterShow: (instance) => {
                        FE.global.sliderImage('.roomPopup .room-info-slider', 1, false, true);
                        //FE.global.tabs('layout-tabs');
                        FE.global.openModalTab('layout-tabs');
                        FE.global.openModalTab('resturant-tabs');
                        $('body').addClass('modal-open');
                        let checkSlider = true;
                        FE.global.lazyLoad();
                    },
                    beforeClose: (instance) => {
                        $('.roomPopup .room-info-slider').slick('unslick');
                        $('body').removeClass('modal-open');
                    }
                }).show                
            })
            $(document).on('click', '.room-detail .close-room', function() {
                $('.roomPopup .room-info-slider').slick('unslick');
                $('.roomPopup').removeClass('basicLightbox--visible')
                setTimeout(() => {
                    $('.roomPopup').remove();
                    $('.roomPopup .room-info-slider').slick('unslick');

                }, 410);
                $('body').removeClass('modal-open');
            });           
        },
        autocomplatePopup: () => {
            $(document).on('click', '.input-custom button', function() {
                if ($(this).parents('#header-search-popup').length == 1) {} else {
                    $(this).parents('.input-custom').find('.popup-menu').show();
                }
            });
            $(document).on('focus', '.input-custom button', function() {
                //$(this).blur();
                $(this).next().find('li span').on('click', function() {
                    $(this).parents('.input-custom').find('button').text($(this).text());
                    $(this).parents('.input-custom').find('button').focus();
                });
            });

            $(document).on('click', '.input-custom .popup-content-input ul li span', function() {
                $(this).parents('.input-custom').find(' .popup-content-input ul li span').removeClass('active');
                $(this).addClass('active');
                //$(this).parents('.input-custom').find('input').attr('href', $(this).parent().attr('data-link')).focus();
                $(this).parents('.input-custom').find('.popup-menu').fadeOut();
                $(this).parents('.input-custom').removeClass('focus');
            });
            $(document).on('click', '.people-list-popup .btn-group .done', function(e) {
                var popup = $(this).parents('.popup-wrap');
                //let getText = '大人' + popup.find('.grown-up .input-custom button').text() + ' 名, 子供' + popup.find('.children .input-custom button').text() + ' 名 <span>' + popup.find('.room .input-custom button').text() + ' 部屋 </span>';
                var adults_string = popup.find('.grown-up .input-custom button').text();
                var adults_split_string = adults_string.split(/(\d+)/);
                var child_string = popup.find('.children .input-custom button').text();
                var child_split_string = child_string.split(/(\d+)/);
                $('.people .people-list p span.adults').html(adults_split_string[1]);
                $('.people .people-list p span.child').html(child_split_string[1]);
                $('.people .people-list p span.room').html(popup.find('.room .input-custom button').text());
                popup.css('display', 'none');
                e.preventDefault();
            });
            $(document).on('click', '.people-list-popup .btn-group .clear', function(e) {
                e.preventDefault();
                var popup = $(this).parents('.people-list-popup')
                popup.find('.grown-up .input-custom button').text('0');
                popup.find('.children .input-custom button').text('0');
                popup.find('.room .input-custom button').text('0');
            });
            $(document).on('click', '.submitSubscribeForm', function(e) {
                if (FE.global.checkValidationRules('#subscribeForm')) {
                    $('.submitSubscribeForm').closest('form').hide();
                    $('.subscribe .thankyou').show();
                }
            });
        },
        itemShowHide: () => {

            $(document).on('click', '.people-list', function() {
                $(this).next().show();
            });

            $(document).on('click', '.calendar-link', function() {
                setTimeout(() => {
                    $('body').addClass('noScrollBody');
                    let $body = $(this).closest('body');
                    $body.find('.booking-widget').fadeIn();
                }, 100);
            });

            $(document).on('click', '.close-booking', function() {
                setTimeout(() => {
                    $('body').removeClass('noScrollBody');
                    let $body = $(this).closest('body');
                    $body.find('.booking-widget').fadeOut();
                }, 100);
            });

        },

        sticky: (element) => {
            if ($(window).width() > 768) {
                if (window.pageYOffset >= sticky) {
                    element.classList.add('sticky')
                } else {
                    element.classList.remove('sticky');
                }
            }
        },

        bookingWidgetClick: () => {
            if ($(window).width() > 768) {
                if (window.pageYOffset <= sticky) {
                    $('html, body').animate({
                        scrollTop: sticky
                    }, 500);
                }
            }
        },

        datePickerInit: (container, single) => {
            let locale = document.getElementById('locale');
            locale = locale.getAttribute('data-lang');
            $.DateRangePicker({
                container: container,
                singleDatePicker: single,
                locale: locale
            });
        },

        getOffset: (el) => {
            var _x = 0;
            var _y = 0;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return {
                top: _y,
                left: _x
            };
        },

        closeHamburger: (box, targetElement, targetElement1) => {
            $('html').on('click', 'body', function(e) {
                let container = $(box);
                let container1 = $(targetElement);
                if (!container.is(e.target) && container.has(e.target).length === 0 && (!container1.is(e.target) && container1.has(e.target).length === 0)) {
                    $(targetElement).stop().removeClass('active');
                    $(targetElement1).removeClass('active');
                    //$('#hamburger').removeClass('active');
                    $('body').removeClass('noScrollBody');
                }
            });
        },
        pauseVideo: () => {
            var videos = document.getElementsByTagName('video'),
                fraction = 0.5;

            function checkScroll() {

                for (var i = 0; i < videos.length; i++) {

                    var video = videos[i];

                    var x = video.offsetLeft,
                        y = video.offsetTop,
                        w = video.offsetWidth,
                        h = video.offsetHeight,
                        r = x + w, //right
                        b = y + h, //bottom
                        visibleX, visibleY, visible;

                    visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
                    visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

                    visible = visibleX * visibleY / (w * h);

                    if (visible > fraction) {
                        video.play();
                    } else {
                        video.pause();
                    }

                }

            }

            window.addEventListener('scroll', checkScroll, false);
            window.addEventListener('resize', checkScroll, false);
        },

        filterRooms: (targetElement) => {
            if (isMobile && (document.getElementById('room-types') !== null)) {
                document.getElementById('room-types').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('tablink').classList.remove('tablink');
            }
            if (isMobile && (document.getElementById('venue-types') !== null)) {
                document.getElementById('venue-types').style.display = 'none';
                document.getElementById('gallery-mask').style.display = 'none';
                document.getElementById('tablink').classList.remove('tablink');
            }

            function showFilterRoom(el) {
                const type = el.getAttribute('data-room-type');
                const className = 'show';
                const classNa = 'selected';
                if (isMobile && (document.getElementById('tablink') !== null)) {
                    document.getElementById('tablink').innerText = el.text;
                }
                if (isMobile && (document.getElementById('room-types') !== null)) {
                    document.getElementById('room-types').style.display = 'none';
                    document.getElementById('gallery-mask').style.display = 'none';
                    document.getElementById('tablink').classList.remove('tablink');
                }
                if (isMobile && (document.getElementById('venue-types') !== null)) {
                    document.getElementById('venue-types').style.display = 'none';
                    document.getElementById('gallery-mask').style.display = 'none';
                    document.getElementById('tablink').classList.remove('tablink');
                }
                document.querySelectorAll('[data-rooms]').forEach(function(e) {
                    let string = e.getAttribute('data-rooms');
                    if (e.classList) {
                        e.classList.remove(className);
                    } else {
                        e.className = e.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                    let clasString = string.includes(type)
                    console.log(type);
                    console.log(clasString);
                    if (string.includes(type)) {
                        if (e.classList) {
                            e.classList.add(className);
                        } else {
                            e.className += ' ' + className;
                        }
                    }


                });
                document.querySelectorAll('[data-room-type]').forEach(function(e) {
                    e.classList.remove(classNa);
                })
                el.classList.add(classNa);


                fillGalleryNav();
            };
            document.querySelectorAll('[data-room-type]').forEach(function(elem) {
                elem.addEventListener('click', function() {
                    showFilterRoom(elem);
                }, false);
            })
            fillGalleryNav();

            function fillGalleryNav() {
                if (document.getElementById('gallery-nav')) {
                    document.getElementById('gallery-nav').innerHTML = '';
                    Array.from(document.getElementsByClassName('show')).forEach(function(item, index) {
                        item.children[0].setAttribute('data-slide', index);
                        var galleryImageSrc = item.children[0].getAttribute('data-src');
                        var galleryImage = document.createElement('img');
                        galleryImage.setAttribute('src', galleryImageSrc);
                        var galleryNavDiv = document.createElement('div');
                        galleryNavDiv.appendChild(galleryImage);
                        document.getElementById('gallery-nav').appendChild(galleryNavDiv);
                    });
                    FE.global.lightBox(true);
                }
                
            }
        },
        filter: (targetElement) => {
            // get all of our list items
            let itemsToFilter = document.querySelectorAll('.itemsToFilter li');

            //setup click event handlers on our checkboxes
            let checkBoxes = document.querySelectorAll('.filterSection li input');

            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].addEventListener('click', filterItems, false);
                //checkBoxes[i].checked = true;
            }

            // the event handler!
            function filterItems(e) {
                var clickedItem = e.target;

                if (clickedItem.checked == true) {
                    hideOrShowItems(clickedItem.value, 'hideItem', 'showItem');
                } else if (clickedItem.checked == false) {
                    hideOrShowItems(clickedItem.value, 'showItem', 'hideItem');
                } else {
                    // deal with the indeterminate state if needed
                }
            }

            // add or remove classes to show or hide our content
            function hideOrShowItems(itemType, classToRemove, classToAdd) {
                for (var i = 0; i < itemsToFilter.length; i++) {
                    var currentItem = itemsToFilter[i];

                    if (currentItem.getAttribute('data-type') == itemType) {
                        removeClass(currentItem, classToRemove);
                        addClass(currentItem, classToAdd);
                    }
                }
            }

            //
            // Helper functions for adding and removing class values
            //
            function addClass(element, classToAdd) {
                var currentClassValue = element.className;

                if (currentClassValue.indexOf(classToAdd) == -1) {
                    if ((currentClassValue == null) || (currentClassValue === '')) {
                        element.className = classToAdd;
                    } else {
                        element.className += ' ' + classToAdd;
                    }
                }
            }

            function removeClass(element, classToRemove) {
                var currentClassValue = element.className;

                if (currentClassValue == classToRemove) {
                    element.className = '';
                    return;
                }

                var classValues = currentClassValue.split(' ');
                var filteredList = [];

                for (var i = 0; i < classValues.length; i++) {
                    if (classToRemove != classValues[i]) {
                        filteredList.push(classValues[i]);
                    }
                }

                element.className = filteredList.join(' ');
            }
        },

        showCheckBoxAction: () => {
            $(document).on('click', '.form-checkbox .checkbox-style input', function() {
                console.log($(this));

                if ($(this).is(':checked')) {
                    //$('.food-beverage .sprite-checked_sp').show();
                } else {
                    // $('.food-beverage .sprite-checked_sp').hide();
                }

            });
        },

        bindAccordion: function(event) {
            $('.accordion-content').hide();
            $('.accordion-title').on(event, function() {
                var $item = $(this).parents('.accordion-item');

                if (!$item.is('.is-active')) {
                    $('.accordion-item').removeClass('is-active');
                    $item.addClass('is-active');
                    $('.accordion-content').slideUp();
                    $item.find('.accordion-content').slideDown();
                } else {
                    $item.find('.accordion-content').slideUp();
                    $item.removeClass('is-active');
                }
                return false;

            });
        },

        filterNews: (targetElement) => {
            function showFilterRoom(el) {
                const type = el.getAttribute('data-news-type');
                const className = 'show';
                const classNa = 'selected';
                document.querySelectorAll('[data-news]').forEach(function(e) {
                    let string = e.getAttribute('data-news');
                    if (e.classList) {
                        e.classList.remove(className);
                    } else {
                        e.className = e.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                    let clasString = string.includes(type)
                    console.log(type);
                    console.log(clasString);
                    if (string.includes(type)) {
                        if (e.classList) {
                            e.classList.add(className);
                        } else {
                            e.className += ' ' + className;
                        }
                    }
                });
                document.querySelectorAll('[data-news-type]').forEach(function(e) {
                    e.classList.remove(classNa);
                })
                el.classList.add(classNa);
            };
            document.querySelectorAll('[data-news-type]').forEach(function(elem) {
                elem.addEventListener('click', function() {
                    showFilterRoom(elem);
                }, false);
            })
        },

        init: () => {
            
        },

        loaded: function loaded() {
            //Functions inside loaded execute when window loaded
            if (isMobile) {
                FE.global.sliderImage('.home-slider-nav', 1, true, false);
            } else {
                FE.global.sliderImage('.home-slider-nav', 3, false, true);
            }
            FE.global.tabs('gallery-tabs');
            FE.global.tabs('booking-tabs');
            FE.global.tabs('layout-tabs');
            FE.global.tabs('profile-tabs');
            FE.global.tabs('resturant-timing-tabs');
            FE.global.instaFeed();
            FE.global.googleMap();
            FE.global.scroll();
            FE.global.changeLanguage();
            FE.global.sideNavigation();
            FE.global.clickOutside('active', '.selected-lang', '.selected-lang');
            FE.global.closeHamburger('.header-right', '.side-navigation', '.hamburger');
            FE.global.lazyLoad();
            FE.global.showCheckBoxAction();
            FE.global.lightBox(true);
            FE.global.lightBoxRoom();
            FE.global.resetUserDetails();
            FE.global.clickOutside('fade', '.input-custom .form-control', '.input-custom .popup-menu');
            FE.global.clickOutside('fade', '.people-list-popup', '.popup-wrap.popup-create');
            FE.global.autocomplatePopup();
            FE.global.itemShowHide();
            FE.global.filterRooms('room-types');
            FE.global.filter('venue-types');
            FE.global.datePickerInit('.date-picker-tab1', false);
            FE.global.datePickerInit('.date-picker-tab2-single', true);
            FE.global.datePickerInit('.date-picker-tab3', false);
            //FE.global.datePickerInit('.basicLightbox--visible .date-picker-venue-rpf', false);
            FE.global.pageScroll();
            FE.global.sliderImage('.inner-page-slider', 1, false, true);
            FE.global.submitForm();
            FE.global.bindAccordion('click');
            FE.global.filterNews();
            FE.global.sliderImage('.single-room-wrap .room-info-slider', 1, false, true);
            FE.global.pauseVideo();
            FE.global.lazyLoad();
        },
        resize: function resize() {
            //Functions inside loaded execute when window resize
            FE.global.lazyLoad();
            FE.global.datePickerInit('.date-picker-tab1', false);
            FE.global.datePickerInit('.date-picker-tab2-single', true);
            FE.global.datePickerInit('.date-picker-tab3', false);
            let isMobile = $(window).width() <= mobileWidth;
            $('.home-slider-nav').slick('unslick');
            if (isMobile) {
                FE.global.sliderImage('.home-slider-nav', 1, true, false);
            } else {
                FE.global.sliderImage('.home-slider-nav', 3, false, true);
            }
        }

    },

    news: {
        newsScroll: () => {
            if (!isIpad && document.getElementById('news-banner') != null) {
                let element = document.getElementById('news-banner');
                let content = document.getElementById('news-content');
                // let blockHeight = element.offsetHeight + 100;
                let imgWidth = element.offsetWidth;
                let imgMinWidth = imgWidth - content.offsetWidth;
                //document.getElementById('experience-content-padder').style.height = blockHeight + 'px';
                //$('#news-banner').css('width', imgMinWidth);

                function scrollNews() {
                    // let scrollTopPos = $(document).scrollTop();
                    // let scrollChangePx = Math.floor(scrollTopPos);
                    // let zoomedWidth = imgWidth - scrollChangePx;
                    // if (zoomedWidth > imgMinWidth) {
                    //     $('#news-banner').css('width', zoomedWidth);
                    // } else {
                    //     $('#news-banner').css('width', imgMinWidth);
                    // }
                   //$('#news-banner').css('width', imgMinWidth);
                };
                $(window).scroll(function() {
                    scrollNews();
                });
                // function scrollNews() {
                //     let scrollTopPos = $(document).scrollTop();
                //     let scrollChangePx = Math.floor(scrollTopPos);
                //     let zoomedWidth = imgWidth - scrollChangePx;
                //     if (zoomedWidth > imgMinWidth) {
                //         $('#news-banner').css('width', zoomedWidth);
                //     } else {
                //         $('#news-banner').css('width', imgMinWidth);
                //     }
                // };
                // $(window).scroll(function() {
                //     scrollNews();
                // });
                // scrollNews();
            }
            $(document).on('click', '.open-details', function() {
                $(this).children('span').toggleClass('active');
                $('.news-content-details-wrap').slideToggle('slow');
            });
        },
        loaded: function loaded() {
            FE.news.newsScroll();
        }
    }
}


$(function() {
    FE.global.init();
});

$(window).load(function() {
    window.scrollTo(0, 0);
    FE.global.loaded();
    FE.news.loaded();

});

$(window).resize(function() {
    FE.global.resize();
});