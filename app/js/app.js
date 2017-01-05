/*!
 * 
 * BGONLINE WWW.BGONLINE.CN
 * 
 * Author: @bgonline
 * 2016-11-25
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('BGONLINE', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    $rootScope.rootUrl = 'http://schoolms.thinktorch.cn/public/index.php/';
    // $rootScope.rootUrl = 'http://192.168.1.200/201611SchoolMS/public/index.php/';
    // 禁用模板缓存
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(toState) !== 'undefined'){
          $templateCache.remove(toState.templateUrl);
        }
    });

    $rootScope.app = {
      name: '盛图软件 - 飞笔智能',
      description: 'ThinkTorch - 校园管理系统',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: null
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };

    $rootScope.user = {
      name:     sessionStorage.paramSession ? JSON.parse(sessionStorage.paramSession).user_name : 'BGONLINE',
      company:  sessionStorage.paramSession ? JSON.parse(sessionStorage.paramSession).school_name : 'BGONLINE.CN',
      job:      'ng-developer',
      picture:  'app/img/user/developer.jpg'
    };

}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/page/login');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('modernizr', 'icons', 'layer')
    })
    .state('app.submenu', {
        url: '/submenu',
        title: 'Submenu',
        templateUrl: helper.basepath('submenu.html')
    })
    .state('app.home', {
        url: '/home',
        title: '首页',
        templateUrl: helper.basepath('home.html')
    })

    .state('app.scoreMgmt', {
        url: '/scoreMgmt',
        title: '成绩管理',
        templateUrl: helper.basepath('scoreMgmt.html')
    })
    .state('app.scoreEntry', {
        url: '/scoreEntry',
        title: '成绩录入',
        templateUrl: helper.basepath('scoreEntry.html')
    })
    .state('app.addScore', {
        url: '/addScore',
        title: '上传成绩',
        templateUrl: helper.basepath('addScore.html'),
        resolve: helper.resolveFor('angularFileUpload', 'contenteditable')
    })
    .state('app.scoreStats', {
        url: '/scoreStats',
        title: '年级成绩统计',
        templateUrl: helper.basepath('scoreStats.html'),
        resolve: helper.resolveFor('chart.js', 'html2canvas')
    })
    .state('app.scoreStatsAll', {
        url: '/scoreStatsAll',
        title: '全校成绩统计',
        templateUrl: helper.basepath('scoreStatsAll.html')
    })
    .state('app.inputMarketAre', {
        url: '/inputMarketAre',
        title: '请填写成绩数据',
        templateUrl: helper.basepath('inputMarketAre.html'),
        resolve: helper.resolveFor('contenteditable')
    })
    .state('app.studentStatusMgmt', {
        url: '/studentStatusMgmt',
        title: '学籍管理',
        templateUrl: helper.basepath('studentStatusMgmt.html')
    })
    .state('app.studentInfo', {
        url: '/studentInfo',
        title: '学生信息',
        templateUrl: helper.basepath('studentInfo.html'),
        resolve: helper.resolveFor('angularFileUpload')
    })
    .state('app.schoolRoll', {
        url: '/schoolRoll',
        title: '学籍查找',
        templateUrl: helper.basepath('schoolRoll.html')
    })


    .state('app.examMgmt', {
        url: '/examMgmt',
        title: '考试管理',
        templateUrl: helper.basepath('examMgmt.html')
    })
    .state('app.createExamPlan', {
        url: '/createExamPlan',
        title: '创建考试计划',
        templateUrl: helper.basepath('createExamPlan.html'),
        resolve: helper.resolveFor('jquery', 'datepicker') 
    })
    .state('app.queryExamPlan', {
        url: '/queryExamPlan',
        title: '考试计划查询',
        templateUrl: helper.basepath('queryExamPlan.html')
    })


    .state('app.roleMgmt', {
        url: '/roleMgmt',
        title: '角色管理',
        templateUrl: helper.basepath('roleMgmt.html'),
        resolve: helper.resolveFor('angularBootstrapNavTree')
    })


    .state('app.userMgmt', {
        url: '/userMgmt',
        title: '用户管理',
        templateUrl: helper.basepath('userMgmt.html')
    })
    .state('app.userAudit', {
        url: '/userAudit',
        title: '用户审核',
        templateUrl: helper.basepath('userAudit.html')
    })
    .state('app.accountMgmt', {
        url: '/accountMgmt',
        title: '用户账户管理',
        templateUrl: helper.basepath('accountMgmt.html')
    })


    .state('app.permissionsMgmt', {
        url: '/permissionsMgmt',
        title: '权限分配',
        templateUrl: helper.basepath('permissionsMgmt.html')
    })


    .state('app.schoolInfoMgmt', {
        url: '/schoolInfoMgmt',
        title: '学校信息管理',
        templateUrl: helper.basepath('schoolInfoMgmt.html')
    })
    .state('app.gradeConfig', {
        url: '/gradeConfig',
        title: '年级配置',
        templateUrl: helper.basepath('gradeConfig.html')
    })
    .state('app.classConfig', {
        url: '/classConfig',
        title: '班级配置',
        templateUrl: helper.basepath('classConfig.html')
    })
    .state('app.subjectConfig', {
        url: '/subjectConfig',
        title: '科目配置',
        templateUrl: helper.basepath('subjectConfig.html'),
        resolve: helper.resolveFor('contenteditable')
    })
    .state('app.moduleConfig', {
        url: '/moduleConfig',
        title: '模块配置',
        templateUrl: helper.basepath('moduleConfig.html')
    })




    // page
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons', 'layer'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    })
    .state('page.login', {
        url: '/login',
        title: "登录",
        templateUrl: 'app/pages/login.html'
    })
    .state('page.regist', {
        url: '/regist',
        title: "注册",
        templateUrl: 'app/pages/regist.html'
    })
    .state('page.schoolList', {
        url: '/schoolList',
        title: "学校列表",
        templateUrl: 'app/pages/schoolList.html'
    })
    .state('page.userCenter', {
        url: '/userCenter',
        title: "用户中心",
        templateUrl: 'app/pages/userCenter.html'
    })
    .state('page.lock', {
        url: '/lock',
        title: "锁定",
        templateUrl: 'app/pages/lock.html'
    })
    .state('page.404', {
        url: '/404',
        title: "Not Found",
        templateUrl: 'app/pages/404.html'
    })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}]).config(function($httpProvider) { // CORS post跨域配置
    $httpProvider.defaults.useXDomain = true;  
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * 
     * @param {Object} obj
     * @return {String}
     * 
     * $http.post 传参方式模拟 $.post
     */ 
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        
        for(name in obj) {
        value = obj[name];
            
        if(value instanceof Array) {
            for(i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if(value instanceof Object) {
            for(subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        
        return query.length ? query.substr(0, query.length - 1) : query;
    };

    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

    delete $httpProvider.defaults.headers.common['X-Requested-With']; 
}).config( ['$compileProvider', function( $compileProvider ) {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
;

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css'],
      'jquery':             ['vendor/jquery/jquery-1.10.2.min.js'],
      'editor':             ['vendor/editor/dist/css/wangEditor.min.css', 
                             'vendor/editor/dist/js/wangEditor.min.js'],
      'datepicker':         ['vendor/datepicker/css/foundation-datepicker.css',
                             'vendor/datepicker/js/foundation-datepicker.js',
                             'vendor/datepicker/js/locales/foundation-datepicker.zh-CN.js'],
      'layer':              ['vendor/layer/layer.js'],
      'html2canvas':        ['vendor/html2canvas/html2canvas.js']       
    },
    // Angular based script (use the right module name)
    modules: [
      { name: 'angularFileUpload', files: ['vendor/angular-file-upload/angular-file-upload.js']},
      { name: 'contenteditable', files: ['vendor/angular-contenteditable/angular-contenteditable.js']},
      { name: 'angularBootstrapNavTree', files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                  'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
      { name: 'SmoothScrollbar', files: ['vendor/scrollbar/smooth-scrollbar.css',
                                         'vendor/scrollbar/smooth-scrollbar.js',
                                         'vendor/scrollbar/angular-smooth-scrollbar.js']},
      { name: 'chart.js', files: ['vendor/angular-chart/Chart.js',
                                  'vendor/angular-chart/angular-chart.js']}
    ]

  })
;
/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      return title; 
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils', 'ParamTransmit', 'ConnectApi',
  function($rootScope, $scope, $state, $http, $timeout, Utils, ParamTransmit, ConnectApi) {

    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    // Load menu from json file
    // ----------------------------------- 
    
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };

    $scope.loadSidebarMenu = function() {
      $scope.param = ParamTransmit.getParam();
      ConnectApi.start('post', 'index/index/actiongetmenu', $scope.param).then(function(response) {
          var data = ConnectApi.data({ res: response });
          if(data.code == 200) {
              $scope.menuItems = data.data.Menu;
              $rootScope.roleItems = data.data.userAuth;
          }
      }, function(x) { 
          layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
              layer.closeAll();
          });
      });
    //   var menuJson = 'server/sidebar-menu.json', // 本地菜单
    //       menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
    //   $http.get(menuURL)
    //     .success(function(items) {
    //        $scope.menuItems = items;
    //     })
    //     .error(function(data, status, headers, config) {
    //       alert('菜单获取失败！');
    //     });

       win.setPosition("center");
    };

     $scope.loadSidebarMenu();

    // Handle sidebar collapse items
    // ----------------------------------- 

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem) {


      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }
      
      $scope.lastEventFromChild = isChild($index);

      return true;
    
    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

}]);

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

      // Allows to close
      if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

        $('.wrapper').on('click.sidebar', function(e){
          // don't check if sidebar not visible
          if( ! $body.hasClass('aside-toggled')) return;

          // if not child of sidebar
          if( ! $(e.target).parents('.aside').length ) {
            $body.removeClass('aside-toggled');          
          }

        });
      }

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);


/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);



/**
 * 
 * BGONLINE.CN
 * 2016-11-25
 * version: 0.0.1
 * 
 */

App.directive('variety', function() { // 多状态选择器
    return {
        restrict: 'A', 
        replace: true,
        scope: {
            val: '@val',
            cfg: '=cfg' 
        },
        template: '<div>'+
                    '<span ng-repeat="c in cfg" ng-if="val == c.val" ng-bind="c.name" style="{{ \'color:\' + c.color }}"></span>'+
                  '</div>'
    }
});



App.directive('bgoSelect', function() { // 下拉选择器
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '@val',
            list: '=list',
            means: '&means'
        },
        template: '<div dropdown="" class="btn-group" style="margin: 0;">'+
                      '<button type="button" dropdown-toggle="" class="btn btn-default bgo-button">'+
                          '<span ng-repeat="o in list" ng-if="val == o.val" ng-bind="o.valName" style="{{ \'color:\' + o.color }}"></span>'+
                          '<span class="caret" style="color: #78A7DE;"></span>'+
                      '</button>'+
                      '<ul role="menu" class="dropdown-menu dropdown-menu-left animated fadeInUpShort">'+
                          '<li ng-repeat="o in list"><a ng-click="getVal(o.val); means()">{{ o.valName }}</a>'+
                          '</li>'+
                      '</ul>'+
                  '</div>',
        controller: function($scope, ParamTransmit) {
            $scope.getVal = function(val) {
                ParamTransmit.setParam({ val });
            }
        }
                
    }

});


App.directive('inputAutoSubmit', function() { // 输入框自动提交
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=val',
            key: '@key',
            means: '&means'
        },
        template: '<div style="display: inline-block;vertical-align: middle;">'+
                      '<input type="text" class="bgo-input" ng-model="val">'+
                  '</div>',
        controller: function($scope, $rootScope, ParamTransmit, $timeout) {
            var timeout;
            $scope.$watch('val', function(newVal, oldVal) {
                if(newVal != oldVal && newVal) {
                    if(timeout) $timeout.cancel(timeout);
                    timeout = $timeout(function() {
                        eval('ParamTransmit.setParam({ "' + $scope.key + '": ' + $scope.val + ' }, ["token", "user_name", "header", "school_id"])');
                        $scope.means();
                    }, 2000);
                }
            })
        }
    }
});


App.directive('multipleInput', function() { // 多选项弹层选择器
    return {
        restrict: 'A',
        replace: true,
        scope: {
            list: '=list',
            multShow: '=multShow',
            index: '=index'
        },
        templateUrl: 'app/views/partials/multiple-input.html',
        controller: function($rootScope, $scope, ParamTransmit) {
            $scope.valArr = [];
            $scope.selectLi = function(_index, e, data) {
                if(e.target.className == 'mSelected') {
                    e.target.className = '';
                    $scope.valArr.splice(_index, 1);
                }else {
                    e.target.className = 'mSelected';
                    $scope.valArr[_index] = data;
                }
            }

            $scope.sure = function() {
                if($scope.valArr.length > 0) {
                    if($scope.index != undefined && $scope.index != null) {
                        $rootScope.multShow[$scope.index] = false;
                        $rootScope.classArr[$scope.index] = $scope.valArr;
                    }else {
                        $rootScope.multShow = false;
                        $rootScope.classArr = $scope.valArr;
                    }
                }
            }
        }
    }
});


App.directive('numSelect', function() { // 数量选择器
    return {
        restrict: 'A', 
        replace: true,
        scope: {
            num: '=num'
        },
        template: '<ul class="bgo-num-select clearfix">'+
                    '<li>'+
                        '<button class="btn btn-default" ng-click="changeNum(0)">-</button>'+
                    '</li>'+
                    '<li><input type="text" ng-model="num" ng-pattern="/^[0-9]{0,6}$/"></li>'+
                    '<li>'+
                        '<button class="btn btn-default" ng-click="changeNum(1)">+</button>'+
                    '</li>'+
                '</ul>',
        controller: function($scope) {
            $scope.changeNum = function(t) {
                t ? $scope.num += 1 : $scope.num -= 1;
            }
        }

    }
        
});



App.directive('wangEditor', function() { // 集成wangEditor
    return {
        restrict: 'A' ,
        require: '?ngModel',
        scope: {
            url: '@url'
        },
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };
            element.on('blur keyup mouseout mouseup change', function() {
                scope.$apply(readViewText);
            });
            
            function readViewText() {
                var html = element.html();
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }

            // 创建编辑器
            wangEditor.config.printLog = false;
            var editor = new wangEditor(element);

            // 移除插入代码和全屏功能与地图功能
            editor.config.menus = $.map(wangEditor.config.menus, function(item, key) { 
                if (item === 'insertcode') return null;
                if (item === 'fullscreen') return null; 
                if (item === 'location') return null; 
                return item;
            });
            
            editor.config.uploadImgUrl = scope.url + 'gd/upload';
            editor.config.pasteText = true // 只粘贴纯文本

            editor.create();

        }
    };
});




App.directive('paging', function() { // 分页
    return {
        restrict: 'A',
        replace: true,
        scope: {
            totalPage: '=totalPage',
            currentPage: '=currentPage',
            getData: '&getData'
        },
        templateUrl: 'app/views/partials/paging.html',
        controller: function($scope) {

            $scope.firstPage = function() { $scope.currentPage = 1; }
            $scope.lastPage = function() { $scope.currentPage = $scope.totalPage; }
            $scope.prePage = function() { $scope.currentPage--; }
            $scope.nextPage = function() { $scope.currentPage++; }

            $scope.$watch('currentPage', function(newVal, oldVal) {
                if(newVal != oldVal && newVal) $scope.getData();
            })
        }
    };
});




App.directive('timerBtn', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            getData: '&getData'
        },
        template: '<button class="btn btn-danger" style="border-radius: 30px;padding: 3px 16px;" ng-disabled="startTime> 0" ng-bind="startTime > 0 ? showTime + \' 后开奖\' : \'手动开奖\'" ng-click="getData()"></button>',
        controller: function($scope, $interval) {

            var formatTime = function(second) {
                return [parseInt(second / 60 / 60), parseInt(second / 60 % 60), second % 60].join(":")
                    .replace(/\b(\d)\b/g, "0$1");
            }
            
            var timer = $interval(function() {
                $scope.startTime -= 1;
                $scope.showTime = formatTime($scope.startTime);
                if($scope.startTime < 1) {
                    $interval.cancel(timer);
                };
            }, 1000);

        }
    };
});



App.filter('timeFilter', function() { // 日期格式化

    //获取相对日期
    function GetRelativeDate(timestampstr) {
        var timestamp = parseInt(timestampstr);
        timestamp = isNaN(timestamp) ? 0 : timestamp;
        var thenT = new Date(timestamp);
        thenT.setHours(0);
        thenT.setMinutes(0);
        thenT.setSeconds(0);
        var nowtime = new Date();
        nowtime.setHours(0);
        nowtime.setMinutes(0);
        nowtime.setSeconds(0);
        var delt = Math.round((nowtime.getTime() - thenT.getTime()) / 1000 / 86400);
        var day_def = {
            '-3': '大后天',
            '-2': '后天',
            '-1': '明天',
            '0': '今天',
            '1': '昨天',
            '2': '前天',
            '3': '上前天'
        }[delt.toString()] || ((delt >= -30 && delt < 0) ? Math.abs(delt) + '天后' : (delt > 0 && delt <= 30) ? delt + '天前' : GetDateString(timestamp));
        return day_def;
    }

    function GetDateString(timestampstr, split) {
        var timestamp = parseInt(timestampstr);
        timestamp = isNaN(timestamp) ? 0 : timestamp;
        var datetime = new Date(timestamp);
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        if (split === undefined) split = '-';
        return datetime.getFullYear() + split + (month > 9 ? month : "0" + month) + split + (date > 9 ? date : "0" + date);
    }
    
    return function(time) {
        var week = new Date(parseInt(time) * 1000).getDay();
        var hours = new Date(parseInt(time) * 1000).getHours();
        var minutes = new Date(parseInt(time) * 1000).getMinutes();

        if(hours < 10 && minutes < 10) {
            var t = '0' + hours + ':0' + minutes;
        }else if(hours < 10 && minutes > 9) {
            var t = '0' + hours + ':' + minutes;
        }else if(hours > 9 && minutes < 10) {
            var t = hours + ':0' + minutes;
        }else {
            var t = hours + ':' + minutes;
        }

        // switch(week) {
        //     case 1:
        //         return '周一（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        //     case 2:
        //         return '周二（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        //     case 3:
        //         return '周三（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        //     case 4:
        //         return '周四（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        //     case 5:
        //         return '周五（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        //     case 6:
        //         return '周六（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        //     case 0:
        //         return '周日（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        // }
        switch(week) {
            case 1:
                return '周一（'+ (new Date()).toLocaleString() +'）';
            case 2:
                return '周二（'+ (new Date()).toLocaleString() +'）';
            case 3:
                return '周三（'+ (new Date()).toLocaleString() +'）';
            case 4:
                return '周四（'+ (new Date()).toLocaleString() +'）';
            case 5:
                return '周五（'+ (new Date()).toLocaleString() +'）';
            case 6:
                return '周六（'+ (new Date()).toLocaleString() +'）';
            case 0:
                return '周日（'+ (new Date()).toLocaleString() +'）';
        }
    };
});




App.filter('to_trusted', ['$sce', function ($sce) { // html代码格式化
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);




// 参数传递
App.factory('ParamTransmit', function() {

   var saveParam = function(param) {
       sessionStorage.setItem('paramSession', JSON.stringify(param));
   }
   
   var judgeOldParam = function(oldParam, param, permanent) { // 处理需要永久保存的参数
        
        if(permanent && permanent.length != 0) {
            // 将原始数据的属性名与值转换为数组
            var paramKeyArr = [], paramValArr = [];
            for(paramKey in param) {
                paramKeyArr.push(paramKey);
                paramValArr.push(eval('param.' + paramKey));
            }
            // 将paramKeyArr转换为hash对象
            var hash = {};
            for(var i = 0; i < paramKeyArr.length; i++) {
                hash[paramKeyArr[i]] = true; 
            } 
            // 通过hash进行判断
            for(var k = 0; k < permanent.length; k++) { 
                if(typeof hash[permanent[k]] == "undefined") {
                    if(eval('oldParam.' + permanent[k])) {
                        eval('param.' + permanent[k] + '=' + 'oldParam.' + permanent[k]);
                    }else {
                        eval('param.' + permanent[k] + '=' + null);
                        console.log('尝试永久保存' + permanent[k] + '时发现该值不存在！');
                    }
                } 
            }
        }
        saveParam(param);
   }
   
   var paramJson = function() {
       return sessionStorage.paramSession ? JSON.parse(sessionStorage.paramSession) : {};
   }

   return {
       
      setParam: function(param, permanent) {
         try {
            var oldParam = paramJson();
         } catch(err) {
            console.log('ParamTransmit运行成功！');
            var oldParam = false;
         }
         judgeOldParam(oldParam, param, permanent);
         return paramJson();
      },


      getParam: function() { return paramJson(); },

      removeParam: function(key) {
         var param = paramJson();
         var delExpr = 'delete param.' + key;
         eval(delExpr);
         sessionStorage.setItem('paramSession', JSON.stringify(param));
         return paramJson();
      },

      clearParam: function() { sessionStorage.removeItem('paramSession'); }

   }
   
});





// 封装http请求
App.factory('ConnectApi', function($rootScope, $http, $state) {

   return {
      start: function(method, url, param) {
          if(method === 'post') {
              _http = $http.post('' + $rootScope.rootUrl + url + '', param);
          }else if(method === 'get') {
              _http = $http.get('' + $rootScope.rootUrl + url + '', param);
          }else {
              console.log('连接方式传入错误！');
          }
          return _http;
      },

      data: function(dispose) {
          if(dispose.res.data.code) {
              if( dispose.res.data.code != 200 ) {
                if( dispose.res.data.code == 201 ) {
                    layer.alert("登录信息异常，请重新登录", {closeBtn: 0, icon: 5}, function() {
                        layer.closeAll();
                        $state.go('page.login');
                    });
                }else {
                    layer.alert(dispose.res.data.msg, {closeBtn: 0, icon: 5}, function() {
                        layer.closeAll(); 
                    })
                }
            }else {
                layer.close(dispose._index); 
            }
          }else {
            layer.close(dispose._index); 
          }
          if(dispose.route) $state.go(dispose.route);
          return dispose.res.data;
      }
    
   }
   
});


// 登录

App.controller('LoginController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    ParamTransmit.clearParam();
    $scope.param = localStorage.remember ? JSON.parse(localStorage.remember) : {};
    win.resizeTo(600, 480);
    win.setMinimumSize(600, 480);
    angular.element('body').addClass('win-transparent');
    $scope.go = function() {
      var index = layer.load(2);
      ConnectApi.start('post', 'index/login/login', $scope.param).then(function(response) {
          var data = ConnectApi.data({ res: response, _index: index });
          $scope.data = data.data;
          if(data.code == 200) {
              if($scope.param.isChecked) {
                  var remember = {
                      user_name: $scope.param.user_name,
                      password: $scope.param.password,
                      isChecked: $scope.param.isChecked
                  }
                  localStorage.setItem('remember', JSON.stringify(remember));
              }else {
                  localStorage.removeItem('remember');
              }
              var token = $scope.data.token;
              var user_name = $scope.data.user_name;
              var header = $scope.data.header;
              var school_id = $scope.data.jump.school_id;
              var school_name = $scope.data.jump.school_name;
              ParamTransmit.setParam({ token, user_name, header, school_id, school_name }, ['token', 'user_name', 'header', 'school_id', 'school_name']);
              win.enterFullscreen();
              win.setMinimumSize(1280, 720);
              angular.element('body').removeClass('win-transparent');
              $scope.data.jump.is_site ? $state.go('app.home') : $state.go('page.schoolList');
          }
      }, function(x) { 
          layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
              layer.closeAll();
          });
      });
    }
  
}]);



// 注册
App.controller('RegistController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.go = function() {
      var index = layer.load(2);
      ConnectApi.start('post', 'index/login/register', $scope.param).then(function(response) {
          var data = ConnectApi.data({ res: response, _index: index });
          $scope.data = data.data;
          if(data.code == 200) {
            layer.alert(data.msg, {icon: 6}, function() {
                layer.closeAll(); 
            })
            var token = $scope.data.token;
            var user_name = $scope.data.user_name;
            var header = $scope.data.header;
            ParamTransmit.setParam({ token, user_name, header }, ['token', 'user_name', 'header']);
            win.enterFullscreen();
            win.setMinimumSize(1280, 720);
            angular.element('body').removeClass('win-transparent');
            $state.go('page.schoolList');
          }
      }, function(x) { 
          layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
              layer.closeAll();
          });
      });
    }
  
}]);


// 学校列表
App.controller('SchoolListController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.cfg = [
        { val: 1, name: '申请中', color: 'orange' },
        { val: 2, name: '在职', color: 'green' },
        { val: 3, name: '拒绝', color: 'red' }
    ]
    $scope.param = ParamTransmit.getParam();
    var getData = function() {
        ConnectApi.start('post', 'index/user/getschoollist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.data = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    getData();


    $scope.search = function() {
        ConnectApi.start('post', 'index/user/getschoolbaseconfig', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.searchData = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = $scope.isShow ? false : true;
    }

    $scope.sData = [];
    $scope.course_id = [];
    $rootScope.classArr = [];
    // 获取年级数据
    $scope.getSg = function(_index, s) {
        $scope.sData[_index] = JSON.parse(s);
        $rootScope.classArr[_index] = [];// 班级数据
        $rootScope.multShow = [];
        $rootScope.multShow[_index] = $scope.sData[_index].Class.length > 0 ? true : false;
    }

    // 增加表格 删除表格
    $scope.trArr = [];
    $scope.addTr = function() {
        $scope.trArr.push('');
    }

    $scope.removeTr = function(_index) {
        $rootScope.classArr = [];
        $scope.course_id = [];
        $scope.sData = [];
        $scope.trArr = [];
    }


    // 提交申请
    $scope.submit = function() {
        if($scope.form.$valid) {
            $scope.param.explain = [];
            var temp = [];
            temp.class_id = [];
            for(var i = 0; i < $scope.trArr.length; i++) {
                temp[i] = {
                    grade_id: $scope.sData[i].grade_id,
                    course_id: $scope.course_id[i],
                    class_id: []
                }
                for(var t = 0; t < $rootScope.classArr[i].length; t++) {
                    if($rootScope.classArr[i][t]) {
                        temp[i].class_id.push($rootScope.classArr[i][t].class_id);
                    }
                }
                $scope.param.explain.push(temp[i]);
            }
            ConnectApi.start('post', 'index/user/applyschool', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    $rootScope.classArr = [];
                    $scope.course_id = [];
                    $scope.sData = [];
                    $scope.trArr = [];
                    layer.alert(data.msg, {icon: 6}, function() {
                        layer.closeAll(); 
                        $scope.isShowLayer();
                        getData();
                    })
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            layer.msg('请完善教学信息！', {icon: 5});
        }
    }

}]);



// 首页
App.controller('HomeController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', '$timeout', function($rootScope, $scope, ConnectApi, $state, ParamTransmit, $timeout) {

    $scope.clock = {};
    var clockFunction = function() {
        $scope.clock.now = (new Date()).valueOf();
        $timeout(function() {
            clockFunction();
        }, 1000)
    }
    clockFunction();
    
    $rootScope.user.name = JSON.parse(sessionStorage.paramSession).user_name;
    $rootScope.user.company = JSON.parse(sessionStorage.paramSession).school_name;

    $scope.param = ParamTransmit.getParam();
    ConnectApi.start('post', 'index/index/actionindex', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        if(data.code == 200) {
            $scope.data = data.data;
        }
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

}]);


// 科目配置 
App.controller('SubjectConfigController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $rootScope.classArr = [];
    $scope.param.status = 1;
    ConnectApi.start('post', 'index/school/getgrade', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        $scope.listData = data.data;
        $rootScope.multShow = $scope.listData.length > 0 ? true : false;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/school/getcourse', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    $scope.editMultShow = function() {
        $rootScope.classArr = [];
        $rootScope.multShow = !$rootScope.multShow ? true : false;
    }

    $scope.param.rate1 = [85, 100]
    $scope.param.rate2 = [71, 84]
    $scope.param.rate3 = [60, 70]
    $scope.param.rate4 = [0, 59]
    $scope.param.grade_id = [];

    $scope.add = function() {
        if($scope.form.$valid) {
            for(var t = 0; t < $rootScope.classArr.length; t++) {
                if($rootScope.classArr[t]) {
                    $scope.param.grade_id.push($rootScope.classArr[t].grade_id);
                }
            }
            ConnectApi.start('post', 'index/school/createcourse', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    layer.msg(data.msg);
                    $scope.getData();
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            layer.msg('请完善表单信息！', {icon: 5});
        }
    }

    $scope.edit = function(_index) {
        var indexData = $scope.data.data[_index];
        if(indexData.isEdit) {
            temp = Object.create($scope.param);
            temp.course_id = indexData.course_id;
            temp.year = indexData.year;
            temp.name = indexData.name;
            temp.total_score = indexData.total_score;
            temp.append_score = indexData.append_score;
            temp.rate1 = indexData.rate1;
            temp.rate2 = indexData.rate2;
            temp.rate3 = indexData.rate3;
            temp.rate4 = indexData.rate4;
            ConnectApi.start('post', 'index/school/setcourse', temp).then(function(response) {
                var data = ConnectApi.data({ res: response });
                layer.msg(data.msg);
                $scope.getData();
                indexData.isEdit = false;
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            indexData.isEdit = true;
        }
    }
  
}]);



// 年级配置 
App.controller('GradeConfigController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    var getData = function() {
        ConnectApi.start('post', 'index/school/getgrade', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.data = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    getData();

    $scope.add = function() {
        ConnectApi.start('post', 'index/school/creategrade', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            layer.msg(data.msg);
            getData();
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    $scope.edit = function(_index) {
        var indexData = $scope.data[_index];
        if(indexData.isEdit) {
            indexData.isEdit = false;
            var param = {};
            param.token = $scope.param.token;
            param.school_id = $scope.param.school_id;
            param.grade = indexData.grade;
            param.grade_id = indexData.grade_id;
            ConnectApi.start('post', 'index/school/setgrade', param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                $scope.data = data.data;
                layer.msg(data.msg);
                getData();
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            indexData.isEdit = true;
        }
    }

    var nowTemp = new Date();
    $scope.yearSelect = [];
    for(var i = nowTemp.getFullYear() - 10; i <= nowTemp.getFullYear() + 10; i++) { // 生成年度选择框
        $scope.yearSelect.push(i + ' - ' + parseInt(parseInt(i) + 1));
    }

    $scope.remove = function(id) {
        layer.confirm('确定删除年级？', {
            btn: ['确定','取消']
        }, function() {
            layer.closeAll();
            $scope.param.grade_id = id;
            ConnectApi.start('post', 'index/school/delgrade', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    layer.msg(data.msg);
                    getData();
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }, function() {
            layer.closeAll();
        });
    }

    // $scope.yearTurngrade = function(str, total) {
            
    //     if(str.length == 4) { // 届转年级
    //         var yearTime = 60 * 60 * 24 * 365;
    //         var gradeTime = str + '-08-01';
    //         var timestamp = Date.parse(new Date(gradeTime));
    //         timestamp = timestamp / 1000;

    //         //剩多久时间戳毕业
    //         var SurplusgradeTime = timestamp - Date.parse(new Date()) / 1000;
    //         //剩多少年毕业
    //         var Surplusyear = Math.floor(SurplusgradeTime / yearTime );
    //         return total - Surplusyear;
    //     }
    // }
  
}]);


// 班级配置
App.controller('ClassConfigController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.param.status = 1;
    ConnectApi.start('post', 'index/school/getgrade', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        $scope.listData = data.data;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });
    
    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/school/getschoolclass', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    $scope.add = function() {
        if($scope.form.$valid) {
            ConnectApi.start('post', 'index/school/createschoolclass', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                layer.msg(data.msg);
                $scope.getData();
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            layer.msg('请完善表单信息！', {icon: 5});
        }
    }

    $scope.edit = function(_index) {
        var indexData = $scope.data.data[_index];
        if(indexData.isEdit) {
            indexData.isEdit = false;
            var param = {};
            param.token = $scope.param.token;
            param.school_id = $scope.param.school_id;
            param.grade_id = indexData.grade_id;
            param.class_id = indexData.class_id;
            param.name = indexData.name;
            ConnectApi.start('post', 'index/school/setschoolclass', param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                layer.msg(data.msg);
                $scope.getData();
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            indexData.isEdit = true;
        }
    }

    $scope.remove = function(id) {
        $scope.param.class_id = id;
        ConnectApi.start('post', 'index/school/delschoolclass', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            if(data.code == 200) {
                layer.msg(data.msg);
                $scope.getData();
            }
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
  
}]);



// 学校信息配置
App.controller('SchoolInfoMgmtController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.copyToClipboard = function(txt) { // 复制
        var aux = document.createElement("input");
        aux.setAttribute("value", txt);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        layer.tips('复制成功', '#copy');
    }

    $scope.param = ParamTransmit.getParam();
    var getData = function() {
        ConnectApi.start('post', 'index/school/getschoolinfo', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.data = data.data;
            $scope.param.name = data.data.name;
            $scope.param.school_id = data.data.school_id;
            $scope.param.school_code = data.data.school_code;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    getData();

    $scope.add = function() {
        if($scope.form.$valid) {
            ConnectApi.start('post', 'index/school/setschoolinfo', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                $scope.data = data.data;
                if(data.code == 200) {
                    layer.msg(data.msg);
                    getData();
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            layer.msg('请完善表单信息！', {icon: 5});
        }
        
    }
  
}]);


/* 学生信息管理 */
App.controller('StudentInfoController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', 'FileUploader', function($rootScope, $scope, ConnectApi, $state, ParamTransmit, FileUploader) {

    $scope.param = ParamTransmit.getParam();

    ConnectApi.start('post', 'index/select/getschoolgcc', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        $scope.listData = data.data;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    $scope.sData = [];
    $scope.getSg = function(s) {
        $scope.sData = JSON.parse(s);
        search();
    }

    $scope.getSgToDownload = function(s) {
        $scope.downloadGrade_id = JSON.parse(s).grade_id
    }

    var search = function() {
        if(!$scope.sData.grade_id) delete $scope.param.grade_id;
        $scope.param.grade_id = $scope.sData.grade_id;
        $scope.current_page = 1;
        $scope.getData();
    }

    $scope.current_page = 1;
    $scope.param.grade_id = 0;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/student/getschoolclasslist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    $scope.goPage = function(class_id) {
        ParamTransmit.setParam({class_id}, ['token', 'user_name', 'header', 'school_id', 'school_name']);
        $state.go('app.schoolRoll');
    }

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = $scope.isShow ? false : true;
    }

    $scope.add = function(grade_id, class_id, yearStr, class_name) {
        var isEdit = 2; // 新增
        ParamTransmit.setParam({ isEdit, grade_id, class_id, yearStr, class_name }, ['token', 'user_name', 'header', 'school_id', 'school_name']);
        $state.go('app.studentStatusMgmt');
    }

    var uploadForm = {
        class_id: '',
        grade_id: '',
        token: $scope.param.token,
        school_id: $scope.param.school_id
    };
    
    $scope.upload = function(t, cid, yearStr, name) {
        $scope.uploadData = '';
        if(t == 1) {
            uploadForm.class_id = cid;
            $scope.isClass = true;
            $scope.className = yearStr + name;
            delete uploadForm.grade_id;
        }else if(t == 2) {
            uploadForm.grade_id = $scope.downloadGrade_id;
            $scope.isClass = false;
            delete uploadForm.class_id;
        }
    }

    var uploader1 = $scope.uploader1 = new FileUploader({
        url: $rootScope.rootUrl +'Index/ExcelIn/studentClassExcelIn',
        alias: 'studentClass',
        removeAfterUpload: true,
        formData: [ uploadForm ]
    })

    uploader1.onProgressItem = function(fileItem, progress) {
        layer.load(2);
    };

    uploader1.onSuccessItem = function(response) {
        $scope.uploadData = JSON.parse(response._xhr.response);
        if( $scope.uploadData.code != 200 ) {
            layer.alert($scope.uploadData.msg, {icon: 5}, function() {
                layer.closeAll(); 
            })
        }else {
            layer.alert($scope.uploadData.msg, {icon: 6}, function() {
                layer.closeAll(); 
            }) 
        }
    };

    var uploader2 = $scope.uploader2 = new FileUploader({
        url: $rootScope.rootUrl +'/Index/ExcelIn/studentGradeExcelIn',
        alias: 'studentGrade',
        removeAfterUpload: true,
        formData: [ uploadForm ]
    })

    uploader2.onProgressItem = function(fileItem, progress) {
        layer.load(2);
    };

    uploader2.onSuccessItem = function(response) {
        $scope.uploadData = JSON.parse(response._xhr.response);
        if( $scope.uploadData.code != 200 ) {
            layer.alert($scope.uploadData.msg, {icon: 5}, function() {
                layer.closeAll(); 
            })
        }else {
            layer.alert($scope.uploadData.msg, {icon: 6}, function() {
                layer.closeAll(); 
            }) 
        }
    };

}]);

/* 学籍查找 */
App.controller('SchoolRollController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/student/getstudentlist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    $scope.search = function() {
        $scope.current_page = 1;
        ParamTransmit.removeParam("class_id");
        $scope.getData();
    }

    $scope.edit = function(student_id) {
        var isEdit = 1; // 修改
        ParamTransmit.setParam({ isEdit, student_id }, ['token', 'user_name', 'header', 'school_id', 'school_name', 'class_id']);
        $state.go('app.studentStatusMgmt');
    }

    $scope.look = function(student_id) {
        var isEdit = 0; // 查看
        ParamTransmit.setParam({ isEdit, student_id }, ['token', 'user_name', 'header', 'school_id', 'school_name', 'class_id']);
        $state.go('app.studentStatusMgmt');
    }
  
}]);


/* 学籍管理 */
App.controller('StudentStatusMgmtController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    ConnectApi.start('post', 'index/user/getschoolbaseconfig', $scope.param).then(function(response) {
        var data = ConnectApi.data({ res: response });
        $scope.searchData = data.data;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    $scope.sData = [];
    $scope.getSg = function(s) {
        $scope.sData = JSON.parse(s);
    }

    $scope.editClassType = false;
    $scope.editClass = function() {
        $scope.editClassType = !$scope.editClassType;
    }

    switch($scope.param.isEdit) {
        case 0: // 查看
            ConnectApi.start('post', 'index/student/actiongetstudentone', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                $scope.data = data.data;
                $scope.param.yearStr = data.data.yearStr;
                $scope.param.class_name = data.data.class_name;
                $scope.param.study_no = data.data.study_no;
                $scope.param.tname = data.data.tname;
                $scope.param.sex = data.data.sex;
                $scope.param.status = data.data.status;
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
            break;
        case 1: // 修改
            ConnectApi.start('post', 'index/student/actiongetstudentone', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                $scope.data = data.data;
                $scope.param.yearStr = data.data.yearStr;
                $scope.param.class_name = data.data.class_name;
                $scope.param.study_no = data.data.study_no;
                $scope.param.tname = data.data.tname;
                $scope.param.sex = data.data.sex;
                $scope.param.status = data.data.status;
                $scope.param.class_id = data.data.class_id;
                $scope.param.grade_id = data.data.grade_id;
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });

            $scope.add = function() {
                if($scope.form.$valid) {
                    if($scope.editClassType) {
                        $scope.param.grade_id = $scope.sData.grade_id;
                    }
                    ConnectApi.start('post', 'index/student/setstudent', $scope.param).then(function(response) {
                        var data = ConnectApi.data({ res: response });
                        if(data.code == 200) {
                            layer.msg(data.msg);
                            $state.go('app.schoolRoll');
                        }
                    }, function(x) { 
                        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                            layer.closeAll();
                        });
                    });
                }else {
                    layer.msg('请完善表单信息！', {icon: 5});
                }
            }
            break;
        case 2: // 新增
            $scope.add = function() {
                if($scope.form.$valid) {
                    ConnectApi.start('post', 'index/student/createstudent', $scope.param).then(function(response) {
                        var data = ConnectApi.data({ res: response });
                        if(data.code == 200) {
                            layer.msg(data.msg);
                        }
                    }, function(x) { 
                        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                            layer.closeAll();
                        });
                    });
                }else {
                    layer.msg('请完善表单信息！', {icon: 5});
                }
            }
            break;
    }
    
}]);


/* 用户管理 */
App.controller('UserMgmtController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {


    $scope.param = ParamTransmit.getParam();
    
    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/member/getuserschool', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

}]);


/* 用户审核 */
App.controller('UserAuditController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.cfg = [
        { val: 1, name: '待审核', color: 'orange' },
        { val: 3, name: '拒绝', color: 'red' }
    ]

    $scope.param = ParamTransmit.getParam();
    
    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/member/getapplyuser', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = $scope.isShow ? false : true;
    }

    $scope.sData = [];
    $scope.course_id = [];
    $rootScope.classArr = [];
    // 获取年级数据
    $scope.getSg = function(_index, s) {
        $scope.sData[_index] = JSON.parse(s);
        $rootScope.classArr[_index] = [];// 班级数据
        $rootScope.multShow = [];
        $rootScope.multShow[_index] = $scope.sData[_index].Class.length > 0 ? true : false;
    }

    // 增加表格 删除表格
    $scope.trArr = [];
    $scope.addTr = function() {
        $scope.trArr.push('');
    }

    $scope.removeTr = function() {
        $rootScope.classArr = [];
        $scope.course_id = [];
        $scope.sData = [];
        $scope.trArr = [];
        $scope.trData = []; 
    }

    $scope.editUser = function(_index, uName, ctcg_id, sex) {
        $scope.param.tname = uName;
        $scope.param.sex = sex;
        $scope.param.ctcg_id = ctcg_id;
        ConnectApi.start('post', 'index/user/getschoolbaseconfig', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.searchData = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });

        if(_index != undefined) {
            $scope.trData = $scope.data.data[_index].explain;
            $scope.trArr = [];
            $scope.sData = [];
            $rootScope.classArr = [];
            $scope.course_id = [];
        }
    }

    // 提交申请
    $scope.submit = function() {
        $scope.param.explain = [];
        var temp = [];
        temp.class_id = [];
        if($scope.trData) {
            for(var k = 0; k < $scope.trData.length; k++) {
                temp[k] = {
                    course_id: $scope.trData[k].course_id,
                    grade_id: $scope.trData[k].grade_id,
                    class_id: []
                }
                for(var t = 0; t < $scope.trData[k].classData; t++) {
                    temp[k].class_id.push($scope.trData[k].classData[t].class_id);
                }
                $scope.param.explain.push(temp[k]);
            }
        }
        for(var i = 0; i < $scope.trArr.length; i++) {
            temp[i] = {
                grade_id: $scope.sData[i].grade_id,
                course_id: $scope.course_id[i],
                class_id: []
            }
            for(var t = 0; t < $rootScope.classArr[i].length; t++) {
                if($rootScope.classArr[i][t]) {
                    temp[i].class_id.push($rootScope.classArr[i][t].class_id);
                }
            }
            $scope.param.explain.push(temp[i]);
        }
        ConnectApi.start('post', 'index/member/setapplyuser', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            if(data.code == 200) {
                layer.alert(data.msg, {icon: 6}, function() {
                    layer.closeAll(); 
                })
                $scope.isShowLayer();
                $scope.getData();
            }
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    $scope.applyUser = function(status, ctcg_id) {
        $scope.param.ctcg_id = ctcg_id;
        $scope.param.status = status;
        ConnectApi.start('post', 'index/member/examine', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.getData();
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

}]);


/* 创建考试计划 */ 
App.controller('CreateExamPlanController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var checkin = $('#dpd1').fdatepicker({
        format: 'yyyy-mm-dd',
        onRender: function (date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkin.hide();
    }).data('datepicker');

    $scope.yearSelect = [];
    for(var i = nowTemp.getFullYear() - 5; i <= nowTemp.getFullYear() + 5; i++) { // 生成年度选择框
        $scope.yearSelect.push(i + ' - ' + parseInt(parseInt(i) + 1));
    }

    $scope.param = ParamTransmit.getParam();
    $scope.param.plan_select = true;
    ConnectApi.start('post', 'index/select/getschoolgcc', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        $scope.listData = data.data;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    var getData = function() {
        var index = layer.load(2);
        ConnectApi.start('post', 'index/testplan/getplanlist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    getData();
    
    $rootScope.multShow = false;
    $scope.sData = [];
    $rootScope.classArr = [];
    $scope.sData.Course = [];
    $scope.getSg = function(s) {
        $scope.sData = JSON.parse(s);
        $rootScope.classArr = [];
        $rootScope.multShow = $scope.sData.Course.length > 0 ? true : false;
    }

    $scope.param.course_id = [];
    $scope.add = function() {
        if($scope.form.$valid) {
            $scope.param.grade_id = $scope.sData.grade_id;
            $scope.param.test_time = $('#dpd1').val();
            for(var i = 0; i < $rootScope.classArr.length; i++) {
                if($rootScope.classArr[i]) {
                    $scope.param.course_id.push($rootScope.classArr[i].course_id);
                }
            }

            ConnectApi.start('post', 'index/testplan/createplan', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                $scope.data = data.data;
                if(data.code == 200) {
                    layer.alert(data.msg, {icon: 6}, function() {
                        layer.closeAll(); 
                    }) 
                    $state.go('app.queryExamPlan');
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            layer.msg('请完善表单信息！', {icon: 5});
        }
        
    }

    
}]);


/* 用户中心 */ 
App.controller('UserCenterController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.tabList = [
        { title: '账号信息' },
        { title: '教学信息' },
        { title: '修改密码' }
    ]
    var getData = function() {
        $scope.param = ParamTransmit.getParam();
        ConnectApi.start('post', 'index/user/getuserinfo', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.data = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    getData();
    
    $scope._index = 0;
    $scope.show = function(e, _index) {
        $scope._index = _index;
        angular.element('.bgo-tab > li > span').removeClass('select');
        angular.element(e.target).addClass('select');
    }

    $scope.changePwd = function() {
        if($scope.param.old_password && $scope.param.confirm_password && $scope.param.password) {
            ConnectApi.start('post', 'index/user/setuserinfo', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    layer.alert(data.msg, {icon: 6}, function() {
                        layer.closeAll(); 
                        $state.go('page.login');
                    })
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }else {
            layer.msg('请完善表单信息！', {icon: 5});
        }
        
    }

    $scope.changeSex = function() {
        $scope.param.sex = $scope.data.sex;
        if($scope.isCSex) {
            ConnectApi.start('post', 'index/user/setuserinfo', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    layer.msg(data.msg, {icon: 6});
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
            $scope.isCSex = false;
        }else {
            $scope.isCSex = true;
        }
    }

    $scope.mgmt = function(school_id) {
        ParamTransmit.setParam({ school_id }, ['token', 'user_name', 'header', 'school_id', 'school_name']);
        $state.go('app.home');
    }

}]);



/* 考试计划查询 */ 
App.controller('QueryExamPlanController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    // ConnectApi.start('post', 'index/select/getschoolgcc', $scope.param).then(function(response) { // 获取年级下拉框
    //     var data = ConnectApi.data({ res: response });
    //     $scope.listData = data.data;
    // });

    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        $scope.param.class_id = null;
        ConnectApi.start('post', 'index/testplan/getplanlist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    // 获取年级数据
    // $scope.getSg = function(s) {
    //     $scope.sData = JSON.parse(s);
    // }

    var nowTemp = new Date();

    $scope.yearSelect = [];
    for(var i = nowTemp.getFullYear() - 5; i <= nowTemp.getFullYear() + 5; i++) {// 生成年度选择框
        $scope.yearSelect.push(i + ' - ' + parseInt(parseInt(i) + 1));
    }

    $scope.search = function() {
        $scope.current_page = 1;
        // $scope.param.grade_id = $scope.sData.grade_id;
        $scope.getData();
    }

    $scope.remove = function(plan_id) {
        $scope.param.plan_id = plan_id;
        layer.confirm('确定删除考试计划？', {
            btn: ['确定','取消']
        }, function() {
            layer.closeAll();
            ConnectApi.start('post', 'index/testplan/actiondelplan', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    layer.msg(data.msg);
                    $scope.getData();
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }, function() {
            layer.closeAll();
        });
    }

}]);


/* 成绩录入 */ 
App.controller('ScoreEntryController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    $scope.param.class_id = '';
    $scope.param.plan_id = '';
    
    ConnectApi.start('post', 'index/select/getschoolgcc', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        $scope.listData = data.data;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    $scope.current_page = 1;
    $scope.getData = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        ConnectApi.start('post', 'index/score/getplanlist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.data = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    $scope.getData();

    // 获取年级数据
    $scope.getSg = function(s) {
        $scope.sData = JSON.parse(s);
    }

    var nowTemp = new Date();

    $scope.yearSelect = [];
    for(var i = nowTemp.getFullYear() - 5; i <= nowTemp.getFullYear() + 5; i++) {// 生成年度选择框
        $scope.yearSelect.push(i + ' - ' + parseInt(parseInt(i) + 1));
    }

    $scope.search = function() {
        if($scope.sData) {
            $scope.param.grade_id = $scope.sData.grade_id;
        }else {
            $scope.param.grade_id = 0;
        }
        $scope.current_page = 1;
        $scope.getData();
    }

    $scope.goPage = function(plan_id, class_id) {
        ParamTransmit.setParam({ plan_id, class_id }, ['token', 'user_name', 'header', 'school_id', 'school_name']);
        $state.go('app.addScore');
    }

    $scope.download = function(_index) {
        angular.element('.downloadForm')[_index].submit();
    }
}]);



/* 成绩数据统计 */
App.controller('ScoreStatsController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', '$timeout', function($rootScope, $scope, ConnectApi, $state, ParamTransmit, $timeout) {

    $scope.param = ParamTransmit.getParam();

    ConnectApi.start('post', 'index/select/getschoolgcc', $scope.param).then(function(response) { // 获取年级下拉框
        var data = ConnectApi.data({ res: response });
        $scope.listData = data.data;
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });


    var nowTemp = new Date();
    var years = nowTemp.getFullYear();
    $scope.yearSelect = [];
    for(var i = years - 5; i <= years + 5; i++) {// 生成年度选择框
        $scope.yearSelect.push(i + ' - ' + parseInt(parseInt(i) + 1));
    }

    $rootScope.multShow = false;
    $rootScope.classArr = [];
    $scope.sData = [];
    $scope.getSg = function(s) {
        $scope.sData = JSON.parse(s);
        if($scope.sData.grade_id) {
            $scope.param.grade_id = $scope.sData.grade_id;
        }
        $rootScope.multShow = $scope.sData.Course.length > 0 ? true : false;
    }

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = $scope.isShow ? false : true;
    }


    $scope.current_page = 1;
    $scope.search = function() {
        $scope.param.p = 6;
        $scope.param.course_id = [];
        $scope.param.page = $scope.current_page;
        if($scope.param.class_id) delete $scope.param.class_id;
        if($scope.param.plan_id) delete $scope.param.plan_id;
        
        for(var i = 0; i < $rootScope.classArr.length; i++) {
            if($rootScope.classArr[i]) {
                $scope.param.course_id.push($rootScope.classArr[i].course_id);
            }
        }
        ConnectApi.start('post', 'index/testplan/getplanlist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.planData = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    $scope.isAppend = [];
    $scope.scoreData = function(plan_id, i) {
        $scope.param.is_html = 1;
        $scope.param.plan_id = plan_id;
        $scope.param.is_append = $scope.isAppend[i];
        delete $scope.param.is_graphical;
        var index = layer.load(2);
        ConnectApi.start('post', '/Index/Excelout/scoreSummary', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            if(!data.code) {
                $scope.isShowLayer();
                $scope.data = data;
                $scope.isChart = false;
            }
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    
    $scope.download = function() {
        $scope.param.is_html = 0;
    }

    $scope.isChart = false;
    $scope.showChart = function() {
        $scope.isChart = !$scope.isChart;
        if($scope.isChart) {
            $scope.param.is_graphical = 1; // 图表
            ConnectApi.start('post', '/index/Report/ReportSelect', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response });
                if(data.code == 200) {
                    $scope.chartData = data.data;
                }else {
                    layer.msg('图表生成失败！', {
                        icon: 5,
                        shade: 0.01
                    });
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }
    } 

    $scope.downloadChart = function() {
        var chart = angular.element('.chart-div');
        chart.removeAttr('style');
        var index = layer.msg('正在生成图片“统计图表.png”...', {
                        icon: 16,
                        shade: 0.01,
                        time: 0
                    });
        html2canvas(chart, {
            onrendered: function(canvas) {
                var url = canvas.toDataURL();
                var triggerDownload = angular.element("<a>").attr("href", url).attr("download", "统计图表.png").appendTo("body");
                triggerDownload[0].click();
                triggerDownload.remove();
                layer.close(index);
                chart.css({ overflow: 'auto', height: '350px' });
            }
        });
    }

}]);



/* 全校数据统计 */ 
App.controller('ScoreStatsAllController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.data = $scope.param.scoreData;
    $scope.plan_id = $scope.param.plan_id;
    $scope.scoreAll = JSON.stringify($scope.param.scoreAll);

    var nowTemp = new Date();
    var years = nowTemp.getFullYear();
    $scope.yearSelect = [];
    for(var i = years - 5; i <= years + 5; i++) {// 生成年度选择框
        $scope.yearSelect.push(i + ' - ' + parseInt(parseInt(i) + 1));
    }

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = $scope.isShow ? false : true;
    }

    $scope.current_page = 1;
    $scope.search = function() {
        $scope.param.p = 6;
        $scope.param.page = $scope.current_page;
        if($scope.param.class_id) delete $scope.param.class_id;
        if($scope.param.plan_id) delete $scope.param.plan_id;
        
        ConnectApi.start('post', 'index/testplan/getplanlist', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response });
            $scope.planData = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }


    $scope.scoreData = function(plan_id) {
        $scope.param.plan_id = plan_id;
        var index = layer.load(2);
        ConnectApi.start('post', 'index/Report/actiongetplanselect', $scope.param).then(function(response) {
            var data = ConnectApi.data({ res: response, _index: index });
            data.plan_id = plan_id;
            if(data.code == 200) {
                layer.confirm('预处理数据成功，前往生成数据？', {
                    btn: ['确定','取消']
                }, function() {
                    layer.closeAll();
                    ParamTransmit.setParam( data, ['token', 'user_name', 'header', 'school_id', 'school_name']);
                    $state.go('app.inputMarketAre');
                }, function() {
                    layer.closeAll();
                });
                $scope.isShowLayer();
            }
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    
    $scope.download = function() {
        $scope.param.is_html = 0;
    }

}]);



// 三优三及填写
App.controller('InputMarketAreController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', function($rootScope, $scope, ConnectApi, $state, ParamTransmit) {

    // layer.msg('表格也可以编辑哦~', function() {});
    $scope.param = ParamTransmit.getParam();
    $scope.data = $scope.param.data;
    $scope.isShow = [];
    $scope.save = function() {
        $scope.param.scoreAll = [];
        var count = 0;
        for(var t = 0; t < $scope.isShow.length; t++) {
            if($scope.isShow[t]) count++;
        }
        if(!count) {
            layer.alert('未选择考试！', {icon: 5}, function() {
                layer.closeAll();
            })
        }else {
            for(var i = 0; i < $scope.isShow.length; i++) {
                if($scope.isShow[i]) {
                    $scope.param.scoreAll.push($scope.data[i]);
                }
            }
            $scope.param.is_html = 1;
            delete $scope.param.data;
            var scoreAll = $scope.param.scoreAll;
            var plan_id = $scope.param.plan_id;
            var index = layer.msg('正在生成年级总表数据，请耐心等待...', {
                            icon: 16
                            ,shade: 0.01
                        });
            ConnectApi.start('post', '/Index/Excelout/allSchoolSummary', $scope.param).then(function(response) {
                var data = ConnectApi.data({ res: response, _index: index });
                var scoreData = data;
                if(!data.code) {
                    ParamTransmit.setParam({ scoreData, scoreAll, plan_id }, ['token', 'user_name', 'header', 'school_id', 'school_name']);
                    $state.go('app.scoreStatsAll');
                }
            }, function(x) { 
                layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                    layer.closeAll();
                });
            });
        }

    }

}]);




/* 上传成绩 */ 
App.controller('AddScoreController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', 'FileUploader', '$timeout', function($rootScope, $scope, ConnectApi, $state, ParamTransmit, FileUploader, $timeout) {

    var createTable = function(json) {
        var tempObj = {};
        var jsonCount = Object.keys(json).length;
        var cols = 0, rows = 0;
        var trOther = [];
        for(var i = 0; i < jsonCount; i++) {
            if(json[i].subTitle) {
                if(cols < json[i].subTitle.length) {
                    cols = json[i].subTitle.length;
                }
            }
            if(rows < Object.keys(json[i]).length) rows = Object.keys(json[i]).length;
            if(json[i].subTitle) {
                for(var k = 0; k < json[i].subTitle.length; k++) {
                    trOther.push(json[i].subTitle[k].title);
                }
            }
        }

        tempObj.json = json;
        tempObj.cols = cols;
        tempObj.rows = rows;
        tempObj.trOther = trOther;
        return tempObj
    }
    
    $scope.param = ParamTransmit.getParam();
    $scope.getData = function() {
        var index = layer.load(2);
        ConnectApi.start('post', 'index/score/getscorelist', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.listData = data.data;
            $scope.tableData = createTable($scope.listData.title);
            layer.msg('表格也可以编辑哦~', function() {});
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });    
    }
    $scope.getData();

    $scope.save = function() { // 保存成绩

        $scope.param.scoreInfo = [];
        $scope.param.student_id = [];
        $scope.param.test_number = [];
        var data = $scope.listData.studentData;
        for(var i = 0; i < data.length; i++) {
            var temp = [];
            for(var k = 0; k < data[i].scoreInfo.length; k++) {
                if(data[i].scoreInfo[k].score == null) {
                    data[i].scoreInfo[k].score = '';
                }
                temp.push(data[i].scoreInfo[k].score);
            }
            $scope.param.student_id.push(data[i].student_id);
            $scope.param.test_number.push(data[i].test_number);
            $scope.param.scoreInfo[i] = temp;
            $scope.param.plan_id = $scope.listData.planData.plan_id;
        }
        ConnectApi.start('post', 'index/score/setscore', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response });
            $scope.data = data.data;
            layer.msg(data.msg);
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = $scope.isShow ? false : true;
    }

    var uploadForm = {
        class_id: '',
        plan_id: '',
        token: $scope.param.token,
        school_id: $scope.param.school_id
    };

    $scope.upload = function(cid, pid) {
        uploadForm.class_id = cid;
        uploadForm.plan_id = pid;
    }

    var uploader = $scope.uploader = new FileUploader({
        url: $rootScope.rootUrl +'Index/ExcelIn/scoreClassExcelIn',
        alias: 'scoreClass',
        removeAfterUpload: true,
        formData: [ uploadForm ]
    })

    uploader.onProgressItem = function(fileItem, progress) {
        layer.load(2);
    };

    uploader.onSuccessItem = function(response) {
        $scope.uploadData = JSON.parse(response._xhr.response);
        if( $scope.uploadData.code != 200 ) {
            layer.alert($scope.uploadData.msg, {icon: 5}, function() {
                layer.closeAll();
                $scope.getData();
            })
        }else {
            layer.alert($scope.uploadData.msg, {icon: 6}, function() {
                layer.closeAll(); 
                $scope.getData();
            }) 
        }
    };

}]);


/* 权限管理 */ 
App.controller('PermissionsMgmtController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', '$timeout', function($rootScope, $scope, ConnectApi, $state, ParamTransmit, $timeout) {

    $scope.param = ParamTransmit.getParam();

    ConnectApi.start('post', 'index/roleauth/rolelist', $scope.param).then(function(response) { 
        var data = ConnectApi.data({ res: response });
        $scope.roleData = data.data;
        getPermissions($scope.roleData[0].role_id);
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    var getPermissions = function(role_id) {
        $scope.param.role_id = role_id;
        var index = layer.load(2);
        ConnectApi.start('post', 'index/roleauth/authlist', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.permissionsData = data.data;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }
    
    $scope.isSelect = [];
    $scope.isSelect[0] = true;
    $scope.selectRole = function(_index, role_id) {
        if(!$scope.isSelect[_index]) getPermissions(role_id);
        $scope.isSelect = [];
        $scope.isSelect[_index] = true;
    }

    $scope.isShow = function(e) {
        if(angular.element(e.target).hasClass('fa-flip-vertical')) {
            angular.element(e.target).removeClass('fa-flip-vertical');
        }else {
            angular.element(e.target).addClass('fa-flip-vertical');
        }
        angular.element(e.target).parent().next().slideToggle();
    }

    var save = function(type) {
        $scope.param.action = $scope.checked;
        $scope.param.type = $scope.selectType;
        ConnectApi.start('post', 'index/roleauth/setroleauth', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response });
            $scope.data = data.data;
            var timer = $timeout(function() {
                layer.msg('保存成功！');
                $timeout.cancel(timer);
            }, 500);
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }



    $scope.checked = []; 
    $scope.selectType = [];
    $scope.selectAll = function(parentIndex, rowsIndex) {
        var temp = [];
        var data = $scope.permissionsData[parentIndex].val[rowsIndex].auth;
        $scope.select_all = $scope.permissionsData[parentIndex].val[rowsIndex].is_check;
        if($scope.select_all) {
            angular.forEach(data, function(i) {
                i.is_check = true;
                temp.push(i.action);
            })
        }else {
            angular.forEach(data, function(i) {
                i.is_check = false;
                temp.push(i.action);
            })
        }
        $scope.checked = temp;
        $scope.selectType = $scope.select_all ? 'create' : 'delete';
        save();
    };

    $scope.selectOne = function(parentIndex, rowsIndex, _index) {
        var data = $scope.permissionsData[parentIndex].val[rowsIndex].auth;
        var count = 0;
        angular.forEach(data, function(i) {
            if(i.is_check) count++;
        })
        $scope.permissionsData[parentIndex].val[rowsIndex].is_check = (count == data.length) ? true : false;
        $scope.checked = data[_index].action;
        $scope.selectType = data[_index].is_check ? 'create' : 'delete';
        save();
    }
}]);


/* 角色管理 */ 
App.controller('RoleMgmtController', ["$rootScope", "$scope", 'ConnectApi', '$state', 'ParamTransmit', '$timeout', '$resource', function($rootScope, $scope, ConnectApi, $state, ParamTransmit, $timeout, $resource) {

    $scope.param = ParamTransmit.getParam();

    ConnectApi.start('post', 'index/roleauth/rolelist', $scope.param).then(function(response) { 
        var data = ConnectApi.data({ res: response });
        $scope.roleData = data.data;
        $scope.param.role_id = $scope.roleData[0].role_id;
        getUser();
    }, function(x) { 
        layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
            layer.closeAll();
        });
    });

    $scope.isSelect = [];
    $scope.isSelect[0] = true;
    $scope.selectRole = function(_index, role_id) {
        $scope.param.role_id = role_id;
        $scope.param.rolePage = _index;
        $scope.isSelect = [];
        $scope.isSelect[_index] = true;
        getUser();
    }

    $scope.showBg = function(e) {
        var h_width = angular.element(e.target).css('width');
        var h_left = angular.element(e.target).css('left');
        var h_height = angular.element(e.target).css('height');
        angular.element('.hover-li').css({ width: h_width, left: h_left, height: h_height });
    }

    $scope.clearBg = function(e) {
        angular.element('.hover-li').css({ width: '0' });
    }

    // 弹层显示
    $scope.isShowLayer = function() {
        $scope.isShow = !$scope.isShow;
    }
    
    var getUser = function() {
        $scope.editArr = [];
        ConnectApi.start('post', 'index/rolegl/getuserauth', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response });
            $scope.userData = data.data;
            $scope.jdcUser = typeof data.data == 'string' ? data.data : '';
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    
    $scope.showEdit = function(e, parentIndex, otherIndex, _index) {
        angular.element(e.target).parent().css({ 'z-index': '999'});
        if(_index != undefined) {
            $scope.editArr[parentIndex] = [];
            $scope.editArr[parentIndex][otherIndex] = [];
            $scope.editArr[parentIndex][otherIndex][_index] = !$scope.editArr[parentIndex][otherIndex][_index];
        }else if(otherIndex != undefined) {
            $scope.editArr[parentIndex] = [];
            $scope.editArr[parentIndex][otherIndex] = !$scope.editArr[parentIndex][otherIndex];
        }else {
            $scope.editArr[parentIndex] = !$scope.editArr[parentIndex];
        }
    }
    $scope.noEdit = function(e, parentIndex, otherIndex, _index) {
        angular.element(e.target).parent().css({ 'z-index': 'inherit'});
        if(_index != undefined) {
            $scope.editArr[parentIndex] = [];
            $scope.editArr[parentIndex][otherIndex] = [];
            $scope.editArr[parentIndex][otherIndex][_index] = false;
        }else if(otherIndex != undefined) {
            $scope.editArr[parentIndex] = [];
            $scope.editArr[parentIndex][otherIndex] = false;
        }else {
            $scope.editArr[parentIndex] = false;
        }
    }

    $scope.setParam = function(grade_id, class_id, course_id) {
        $scope.param.grade_id = grade_id;
        $scope.param.class_id = class_id;
        $scope.param.course_id = course_id;
        $scope.getSchoolUser();
    }

    $scope.current_page = 1;
    $scope.getSchoolUser = function() {
        var index = layer.load(2);
        $scope.param.page = $scope.current_page;
        $scope.param.p = 6;
        ConnectApi.start('post', 'index/member/getuserschool', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response, _index: index });
            $scope.schoolUser = data.data;
            $scope.totalpage = data.data.total_page;
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }



    $scope.add = function(user_id) {
        $scope.param.user_id = user_id;
        ConnectApi.start('post', 'index/rolegl/createuserauth', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response });
            if(data.code == 200) {
                $scope.isShowLayer();
                getUser();
            }
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

    $scope.remove = function(ctcg_id) {
        $scope.param.ctcg_id = ctcg_id;
        ConnectApi.start('post', 'index/rolegl/deluserauth', $scope.param).then(function(response) { 
            var data = ConnectApi.data({ res: response });
            if(data.code == 200) {
                getUser();
            }
        }, function(x) { 
            layer.alert("服务器异常，请稍后再试！", {closeBtn: 0, icon: 5}, function() {
                layer.closeAll();
            });
        });
    }

}]);
