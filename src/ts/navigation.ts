/** навигация */
declare let $: any;
declare let slidebars: any;
export namespace Navigation {
    export function init() {
        $(".hamburger").click(hamClick);
        $(document).on("click", ".js-close-any", closeMenu);
        $(".site-header-mobile__nav-list-multi").click(openSubMM);
        $(".site-header-mobile-close .fa-times").click(closeMenu);
        $(".site-header-mobile-close .fa-reply").click(toMainMenu);
        controller.init();

        // Add close class to canvas container when Slidebar is opened
        $(controller.events).on('opening', function (event: any) {
            //$('.all-wrapper').addClass('js-close-any');
        });
        // Add close class to canvas container when Slidebar is opened
        $(controller.events).on('closing', function (event: any) {
            //$('.all-wrapper').removeClass('js-close-any');
        });
        sticky();
        $(window).on('scroll', sticky);

    }

    var controller = new slidebars();
    function closeMenu() {
        controller.close(controller.getActiveSlidebar());
        $(".hamburger").removeClass("is-active");
        $(".site-header-bottom").removeClass("is-offset");
    }
    function hamClick() {
        event.stopPropagation();
        event.preventDefault();
        this.classList.toggle("is-active");
        // Toggle the Slidebar with id 'id-1'
        if(controller.getActiveSlidebar()) {
            controller.close(controller.getActiveSlidebar());
        } else {
            controller.open("id-1");
        }
       $(".site-header-bottom").toggleClass("is-offset");
    }
    function openSubMM() {
        event.stopPropagation();
        event.preventDefault();
        controller.toggle(this.dataset.bind);
    }
    function toMainMenu () {
        controller.toggle(this.dataset.to);
    }
    function sticky() {
        var scrolled = $(this).scrollTop();
        var scrollPageY = window.scrollY || window.pageYOffset;
      
        //переход меню
        if (scrollPageY > 5) {
            document.querySelector("header").classList.contains("sticky") ?
                "" : document.querySelector("header").classList.add("sticky");
        }
        else {
            document.querySelector("header").classList.contains("sticky") ?
                document.querySelector("header").classList.remove("sticky") : "";
        }
      }
}