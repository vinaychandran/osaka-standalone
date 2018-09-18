/**
 * @fileOverview
 * @author Zoltan Toth
 * @version 1.0.0
 */

/**
 * @description
 * Vanilla Javascript Tabs
 *
 * @class
 * @param {string} options.elem - HTML id of the tabs container
 * @param {number} [options.open = 0] - Render the tabs with this item open
 */
var Tabs = function(options) {
    var isModal = options.isModal;
    var elem;

    let lightBoxId = '.basicLightbox';
    if (isModal) {
        elem = document.querySelector(lightBoxId + ' #' + options.elem);
    } else {
        elem = document.getElementById(options.elem);
    }

    if (elem) {

        var open = options.open || 0,
            titleClass = 'tabs-title',
            activeClass = 'tabs-title-active',
            contentClass = 'tabs-content',
            tabsNum = elem.querySelectorAll('.' + titleClass).length;

        render();

        /**
         * Initial rendering of the tabs.
         */
        function render(n) {
            elem.addEventListener('click', onClick);

            var init = (n == null) ? checkTab(open) : checkTab(n);

            for (var i = 0; i < tabsNum; i++) {
                elem.querySelectorAll('.' + titleClass)[i].setAttribute('data-index', i);
                if (i === init) openTab(i);
            }
        }

        /**
         * Handle clicks on the tabs.
         * 
         * @param {object} e - Element the click occured on.
         */
        function onClick(e) {
            if (e.target.className.indexOf(titleClass) === -1) return;
            e.preventDefault();
            openTab(e.target.getAttribute('data-index'));
        }

        /**
         * Hide all tabs and re-set tab titles.
         */
        function reset() {
            [].forEach.call(elem.querySelectorAll('.' + contentClass), function(item) {
                item.style.display = 'none';
            });

            [].forEach.call(elem.querySelectorAll('.' + titleClass), function(item) {
                item.className = removeClass(item.className, activeClass);
            });
        }

        /**
         * Utility function to remove the open class from tab titles.
         *
         * @param {string} str - Current class.
         * @param {string} cls - The class to remove.
         */
        function removeClass(str, cls) {
            var reg = new RegExp('(\ )' + cls + '(\)', 'g');
            return str.replace(reg, '');
        }

        /**
         * Utility function to remove the open class from tab titles.
         *
         * @param n - Tab to open.
         */
        function checkTab(n) {
            return (n < 0 || isNaN(n) || n > tabsNum) ? 0 : n;
        }

        /**
         * Opens a tab by index.
         * 
         * @param {number} n - Index of tab to open. Starts at 0.
         * 
         * @public
         */
        function openTab(n) {
            reset();

            var i = checkTab(n);

            elem.querySelectorAll('.' + titleClass)[i].className += ' ' + activeClass;
            elem.querySelectorAll('.' + contentClass)[i].style.display = '';

            if (document.getElementById('tablink') && document.getElementById('tabs-header') && document.getElementById('gallery-mask')) {
                document.getElementById('tablink').innerText = document.querySelectorAll('#gallery-tabs .' + titleClass)[i].text;
                document.getElementById('tablink').classList.remove('opened');
                if (window.innerWidth <= 768) {
                    document.getElementById('tabs-header').style.display = 'none';
                    document.getElementById('gallery-mask').style.display = 'none';
                    document.getElementById('tablink').classList.remove('tablink');
                }
            } 
            if(document.getElementById('tablink') && document.getElementById('resturant-tabs-header') && document.getElementById('gallery-mask')){
                document.getElementById('tablink').innerText = elem.querySelectorAll('.' + titleClass)[i].text;
                document.getElementById('tablink').classList.remove('opened');
                if (window.innerWidth <= 768) {
                    document.getElementById('resturant-tabs-header').style.display = 'none';
                    document.getElementById('gallery-mask').style.display = 'none';
                    document.getElementById('tablink').classList.remove('tablink');
                }
            }
            if(document.getElementById('resturant-timing-tablink') && document.getElementById('resturant-timing-tabs-header') && document.getElementById('gallery-mask')){
                document.getElementById('resturant-timing-tablink').innerText = elem.querySelectorAll('.' + titleClass)[i].text;
                document.getElementById('resturant-timing-tablink').classList.remove('opened');
                if (window.innerWidth <= 768) {
                    document.getElementById('resturant-timing-tabs-header').style.display = 'none';
                    document.getElementById('gallery-mask').style.display = 'none';
                    document.getElementById('resturant-timing-tablink').classList.remove('resturant-timing-tablink');
                }
            }
            setTimeout(function() {
                sliderImage('.inner-page-slider', 1, false, true), 500
            });
        }

        function sliderImage(slider, slideToShow, dots, arrows) {
            $(slider).slick('unslick');
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
                $('.slider-count .number').text(1);
                console.log(sliderImageCount);
                $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
                    if (currentSlide !== undefined) {
                        $('.slider-count .number').text(currentSlide + 1);
                        $('.room-info-slider-thumb img').removeClass('active');
                        let thumbnailSlide = currentSlide + 1
                        $('.room-info-slider-thumb img:nth-child(' + thumbnailSlide + ')').addClass('active');
                    }
                });
            });
        }

        /**
         * Updates the tabs.
         * 
         * @param {number} n - Index of tab to open. Starts at 0.
         * 
         * @public
         */
        function update(n) {
            destroy();
            reset();
            render(n);
        }

        /**
         * Removes the listeners from the tabs.
         * 
         * @public
         */
        function destroy() {
            elem.removeEventListener('click', onClick);
        }

        return {
            open: openTab,
            update: update,
            destroy: destroy
        };
    }
};