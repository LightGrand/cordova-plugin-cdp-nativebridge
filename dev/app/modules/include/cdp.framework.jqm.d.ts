﻿/// <reference path="jquery.d.ts" />
/// <reference path="underscore.d.ts" />
/// <reference path="backbone.d.ts" />
/// <reference path="jquery.mobile.d.ts" />
/// <reference path="cdp.core.d.ts" />
/// <reference path="require.d.ts" />
/// <reference path="i18next.d.ts" />
/// <reference path="cdp.lazyload.d.ts" />
declare module CDP {
    module Framework {
        /**
         * platform 判定オブジェクト
         * [参考] https://w3g.jp/blog/tools/js_browser_sniffing
         */
        var Platform: {
            ltIE6: boolean;
            ltIE7: boolean;
            ltIE8: boolean;
            ltIE9: boolean;
            gtIE10: (mediaQuery: string) => MediaQueryList;
            Trident: string;
            Gecko: boolean;
            Presto: any;
            Blink: any;
            Webkit: boolean;
            Touch: boolean;
            Mobile: boolean;
            ltAd4_4: boolean;
            Pointer: any;
            MSPoniter: any;
            Android: boolean;
            iOS: boolean;
        };
    }
}
declare module CDP {
    module Framework {
        /**
         * @class Patch
         * @brief patch class for jqm framework.
         */
        class Patch {
            static s_vclickEvent: string;
            /**
             * \~english
             * Apply patch.
             *
             * \~japanese
             * パッチの適用
             */
            static apply(): void;
            /**
             * \~english
             * if "vclick" event is unsupported, returns false. ex: Android 4.4 (Kitkat)
             *
             * \~japanese
             * "vclick" event が非サポートである platform (KitKat) は false を返す。
             * jQM の version up により、解決される場合は無効かする。
             */
            static isSupportedVclick(): boolean;
        }
    }
}
declare module CDP {
    module Framework {
        /**
         * @enum Orientation
         */
        enum Orientation {
            PORTRAIT = 0,
            LANDSCAPE = 1,
        }
        /**
         * \~english
         * Get Orientation enum code
         *
         * @return {Number} Orientation Code.
         *
         * \~japanese
         * Orientation の取得
         *
         * @return {Number} Orientation Code.
         */
        function getOrientation(): Orientation;
    }
}
declare module CDP {
    module Framework {
        /**
         * \~english
         * @interface ShowEventData
         * @brief     Argument of onShow/onBeforeShow method.
         *
         * \~japanese
         * @interface ShowEventData
         * @brief     onShow/onBeforeShow で渡される引数
         */
        interface ShowEventData {
            /**
             * \~english
             * Previous view info.
             *
             * \~japanese
             * 直前の画面
             */
            prevPage: JQuery;
        }
        /**
         * \~english
         * @interface HideEventData
         * @brief     Argument of onHide/onBeforeHide method.
         *
         * \~japanese
         * @interface HideEventData
         * @brief     onHide/onBeforeHide で渡される引数
         */
        interface HideEventData {
            /**
             * \~english
             * Next view info.
             *
             * \~japanese
             * 次の画面
             */
            nextPage: JQuery;
        }
        /**
         * \~english
         * @interface Intent
         * @brief     Delegate interface of additional data for Page class.
         *            Client can define extend type from it.
         *
         * \~japanese
         * @interface Intent
         * @brief     任意の情報を格納するインターフェイス
         *            Page に渡されるデータ。拡張して使用可能
         */
        interface Intent {
            /**
             * \~english
             * any parameter.
             * params["queryParams"] is used by framework for query parameters.
             *
             * \~japanese
             * 任意のパラメータ
             * params["queryParams"] には、query parameter がフレームワークにより格納される。
             */
            params?: Object;
        }
        /**
         * \~english
         * @interface PageStack
         * @brief Arguments interface of Router.registerPageStack() method.
         *
         * \~japanese
         * @interface PageStack
         * @brief Router.registerPageStack() に指定するインターフェイス
         */
        interface PageStack {
            /**
             * \~english
             * route string, it can be regular expression.
             *
             * \~japanese
             * ルーティング文字列 / 正規表現
             */
            route: string;
            /**
             * \~english
             * page title string.
             *
             * \~japanese
             * ページタイトル文字列
             */
            title?: string;
            /**
             * \~english
             * page transition string.
             *
             * \~japanese
             * 遷移トランジション文字列
             */
            transition?: string;
        }
        /**
         * \~english
         * @interface SubFlowParam
         * @brief interface of Router's Sub Flow paramenters.
         *
         * \~japanese
         * @interface SubFlowParam
         * @brief Router の Sub Flow に指定するパラメータインターフェイス
         */
        interface SubFlowParam {
            /**
             * \~english
             * set sub flow operation [begin | end].
             * When "begin" is set and then "end" is called, it can return to the URL specified as "base" with treating browser history.
             *
             * \~japanese
             * Sub Flow 処理を指定 [begin | end]
             * "begin" が指定され、次に "end" を呼ぶとき、"base" に指定した url までブラウザ履歴をたどる。
             */
            operation: string;
            /**
             * \~english
             * Page URL/Hash used as the reference point of Sub Flow is specified.
             * When Sub Flow operation == "end" is specified, URL specified as navigate is disregarded.
             * If not set, this parameter is assigned the page called Router.navigate() with subFlow property.
             *
             * \~japanese
             * Sub Flow の基点となるページ URL/Hash を指定。
             * Sub Flow operation == "end" が指定される場合は、navigate に指定される URL は無視される。
             * 指定がない場合は Router.navigate() 時に subFlow を指定の呼び出し元がアサインされる。
             */
            destBase?: string;
            /**
             * \~english
             * PageStack from "destBase" which changes page at the time of the end of Sub Flow is specified.
             * When this parameter is no set, it changes page to "destBase".
             *
             * \~japanese
             * Sub Flow 終了時に遷移する "destBase" からの PageStack を指定。指定がない場合は、"destBase" に遷移する。
             */
            destStacks?: PageStack[];
        }
        /**
         * \~english
         * @interface RouterOptions
         * @brief Options interface of Router.start() method.
         *
         * \~japanese
         * @interface RouterOptions
         * @brief Router.start() に指定するオプションインターフェイス
         */
        interface RouterOptions extends Backbone.HistoryOptions {
        }
        /**
         * \~english
         * @interface NavigateOptions
         * @brief Options interface of Router.navigate() method.
         *
         * \~japanese
         * @interface NavigateOptions
         * @brief Router.navigate() に指定するオプションインターフェイス
         */
        interface NavigateOptions extends Backbone.NavigateOptions {
            /**
             * \~english
             * overwrite: trigger default value is true.
             *
             * \~japanese
             * trigger の既定値は true として扱う
             */
            trigger?: boolean;
            /**
             * \~english
             * SubFlowParam is specified when performing Sub Flow processing.
             *
             * \~japanese
             * Sub Flow 処理を行う場合、SubFlowParam を指定
             */
            subFlow?: SubFlowParam;
            /**
             * \~english
             * set back operation destination.
             *
             * \~japanese
             * [戻る] 時に遷移するページ URL を指定
             */
            backDestination?: string;
            /**
             * \~english
             * no hash change flag in navigate operation.
             *
             * \~japanese
             * Navigate 時に Hash 変更しないフラグ
             */
            noHashChange?: boolean;
            /**
             * \~english
             * additional info interface.
             *
             * \~japanese
             * 付加情報インターフェイス
             */
            intent?: Intent;
        }
        /**
         * \~english
         * @interface IOrientationChangedListener
         * @brief Handle orientation changed notify interface.
         *
         * \~japanese
         * @interface IOrientationChangedListener
         * @brief Orientation の変更検知を受信するインターフェイス
         */
        interface IOrientationChangedListener {
            /**
             * \~english
             * Received orientation code when that is changed.
             *
             * @param newOrientation {Orientation} [in] new orientation code.
             *
             * \~japanese
             * Orientation の変更を受信
             *
             * @param newOrientation {Orientation} [in] new orientation code.
             */
            onOrientationChanged(newOrientation: Orientation): void;
        }
        /**
         * \~english
         * @interface IBackButtonEventListener
         * @brief Handle H/W back button event notify interface.
         *
         * \~japanese
         * @interface IBackButtonEventListener
         * @brief H/W Back button の event を受信するインターフェイス
         */
        interface IBackButtonEventListener {
            /**
             * \~english
             * Received H/W Back Button event
             *
             * @param  event {JQueryEventObject} [in] event object
             * @return {Boolean} true: continue default operation / false: stop default operation
             *
             * \~japanese
             * H/W Back Button ハンドラ
             *
             * @param  event {JQueryEventObject} [in] event object
             * @return {Boolean} true: 既定の処理を行わない / false: 既定の処理を行う
             */
            onHardwareBackButton(event?: JQueryEventObject): boolean;
        }
        /**
         * \~english
         * @interface ICommandListener
         * @brief Framework generic command callback interface.
         *
         * \~japanese
         * @interface ICommandListener
         * @brief 汎用コマンドコールバックインターフェイス
         */
        interface ICommandListener {
            /**
             * \~english
             * Received generic command
             *
             * @param  event {JQueryEventObject} [in] event object
             * @param  event {kind}              [in] command kind string
             *
             * \~japanese
             * 汎用コマンドを受信
             *
             * @param  event {JQueryEventObject} [in] event object
             * @param  event {kind}              [in] command kind string
             */
            onCommand(event?: JQueryEventObject, kind?: string): void;
        }
        /**
         * \~english
         * @interface PageConstructOptions
         * @brief Interface class for storing registration info, using by Router.register() method.
         *
         * \~japanese
         * @interface PageConstructOptions
         * @brief Router.register() で指定する登録情報を格納するインターフェイスクラス
         */
        interface PageConstructOptions {
            /**
             * \~english
             * route identifier
             *
             * \~japanese
             * route 識別子
             */
            route?: string;
            /**
             * \~english
             * callback on changing route.
             *
             * \~japanese
             * route 変更時に呼び出されるコールバック
             */
            callback?: (...args: any[]) => boolean;
            /**
             * \~english
             * set "true" if application's top view.
             *
             * \~japanese
             * アプリケーションの top 画面である場合 true を指定
             */
            top?: boolean;
            /**
             * \~english
             * The instance of Page event listener instance.
             *
             * \~japanese
             * Page イベントを受信するリスナーインスタンス
             * 機能拡張時に指定する
             */
            owner?: IPage;
        }
        /**
         * \~english
         * @interface IPage
         * @brief Interface of Page class.
         *
         * \~japanese
         * @interface IPage
         * @brief ページクラスのインターフェイスクラス
         */
        interface IPage extends IOrientationChangedListener, IBackButtonEventListener, ICommandListener {
            /**
             * \~english
             * Return true if page is active.
             *
             * \~japanese
             * ページがアクティブである時 true
             */
            active: boolean;
            /**
             * \~english
             * Stored target page url.
             *
             * \~japanese
             * 対象のページ URL を格納
             */
            url: string;
            /**
             * \~english
             * Stored target page ID.
             *
             * \~japanese
             * 対象のページ ID を格納
             */
            id: string;
            /**
             * \~english
             * jQuery object of page.
             *
             * \~japanese
             * ページの jQuery オブジェクト
             */
            $page: JQuery;
            /**
             * \~english
             * jQuery object of page's header.
             *
             * \~japanese
             * ページヘッダの jQuery オブジェクト
             */
            $header: JQuery;
            /**
             * \~english
             * jQuery object of page's footer.
             *
             * \~japanese
             * ページフッタの jQuery オブジェクト
             */
            $footer: JQuery;
            /**
             * \~english
             * intent parameter passing between pages.
             *
             * \~japanese
             * ページ間で受け渡される intent オブジェクト
             */
            intent: Intent;
            /**
             * \~english
             * Received Router "before route change" event.
             *
             * @return {JQueryPromise} jQueryPromise Object
             *
             * \~japanese
             * Router "before route change" ハンドラ
             * ページ遷移直前に非同期処理を行うことが可能
             *
             * @return {JQueryPromise} jQueryPromise オブジェクト
             */
            onBeforeRouteChange(): JQueryPromise<any>;
            /**
             * \~english
             * It's called only when before the first OnPageInit().
             *
             * @param event {JQueryEventObject} [in] event object
             *
             * \~japanese
             * 最初の OnPageInit() のときにのみコールされる
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             */
            onInitialize(event: JQueryEventObject): void;
            /**
             * \~english
             * Event handler of jQM event: "pagebeforecreate".
             *
             * @param event {JQueryEventObject} [in] event object
             *
             * \~japanese
             * jQM event: "pagebeforecreate" に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             */
            onPageBeforeCreate(event: JQueryEventObject): void;
            /**
             * \~english
             * Event handler of jQM event: "pagecreate" (previous version defined "pageinit").
             *
             * @param event {JQueryEventObject} [in] event object
             *
             * \~japanese
             * jQM event: "pagecreate" (旧:"pageinit") に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             */
            onPageInit(event: JQueryEventObject): void;
            /**
             * \~english
             * Event handler of jQM event: "pagebeforeshow"
             *
             * @param event {JQueryEventObject} [in] event object
             * @param data  {ShowEventData}     [in] additional info
             *
             * \~japanese
             * jQM event: "pagebeforeshow" に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             * @param data  {ShowEventData}     [in] 付加情報
             */
            onPageBeforeShow(event: JQueryEventObject, data?: ShowEventData): void;
            /**
             * \~english
             * Event handler of jQM event: "pagecontainershow" (previous version defined "pageshow").
             *
             * @param event {JQueryEventObject} [in] event object
             * @param data  {ShowEventData}     [in] additional info
             *
             * \~japanese
             * jQM event: "pagecontainershow" (旧:"pageshow") に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             * @param data  {ShowEventData}     [in] 付加情報
             */
            onPageShow(event: JQueryEventObject, data?: ShowEventData): void;
            /**
             * \~english
             * Event handler of jQM event: "pagebeforehide".
             *
             * @param event {JQueryEventObject} [in] event object
             * @param data  {HideEventData}     [in] additional info
             *
             * \~japanese
             * jQM event: "pagebeforehide" に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             * @param data  {HideEventData}     [in] 付加情報
             */
            onPageBeforeHide(event: JQueryEventObject, data?: HideEventData): void;
            /**
             * \~english
             * Event handler of jQM event: "pagecontainerhide" (previous version defined "pagehide").
             *
             * @param event {JQueryEventObject} [in] event object
             * @param data  {HideEventData}     [in] additional info
             *
             * \~japanese
             * jQM event: "pagecontainerhide" (旧:"pagehide") に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             * @param data  {HideEventData}     [in] 付加情報
             */
            onPageHide(event: JQueryEventObject, data?: HideEventData): void;
            /**
             * \~english
             * Event handler of jQM event: "pageremove".
             *
             * @param event {JQueryEventObject} [in] event object
             *
             * \~japanese
             * jQM event: "pageremove" に対応
             *
             * @param event {JQueryEventObject} [in] イベントオブジェクト
             */
            onPageRemove(event: JQueryEventObject): void;
        }
        /**
         * \~english
         * @interface PageBase
         * @brief     [duplicate] alias for IPage backword compatible.
         *
         * \~japanese
         * @interface PageBase
         * @brief     [duplicate] IPage の後方互換用 alias.
         */
        /**
         * \~english
         * @interface BaseView
         * @brief     alias for Backbone.View<Backbone.Model>.
         *
         * \~japanese
         * @interface BaseView
         * @brief     Backbone.View<Backbone.Model> の alias
         */
        interface BaseView extends Backbone.View<Backbone.Model> {
        }
    }
}
declare module CDP {
    module Framework {
        /**
         * \~english
         * Convert path to URL.
         * If the path starts from "/", the function translate the path as child folder of "web root".
         * Otherwise, it interprets as relative path from current page.
         * [Note] This behavior go along with jQM, NOT with require.toUrl().
         *
         * @param path {String} [in] path string
         *
         * \~japanese
         * path を URL に変換
         * "/" から始まるものは web root から、それ以外は現在のページから絶対パスURLに変換する。
         * jQM の挙動にあわせており、require.toUrl() と異なるので注意。
         *
         * @param path {String} [in] パスを指定。
         */
        function toUrl(path: string): string;
        /**
         * \~english
         * Setup "before route change" handler.
         *
         * @param  {Function} handler function.
         * @return {Function} old handler function.
         *
         * \~japanese
         * "before route change" ハンドラ設定
         *
         * @param  {Function} handler 指定.
         * @return {Function} 以前の handler.
         */
        function setBeforeRouteChangeHandler(handler: () => JQueryPromise<any>): () => JQueryPromise<any>;
        /**
         * \~english
         * @class Router
         * @brief Router class for adjusting jQueryMobile functions and Backbone.Router functions.
         *        Even if Backbone.Router does not start routing, natigate() method works good with jQM framework.
         *
         * \~japanese
         * @class Router
         * @brief jQueryMobile と Backbone.Router を調停する Router クラス
         *        ルーティングを開始していない場合にも、navigate() は jQM フレームワークを使用して機能する。
         */
        class Router {
            private static s_initOptions;
            private static s_router;
            private static s_rootContexts;
            private static s_lastNavigateInfo;
            private static s_lastClickedTime;
            private static s_lastIntent;
            private static s_loadUrl;
            private static s_back;
            private static DELAY_TIME;
            private static DATA_BACK_DESTINATION;
            private static DATA_NO_HASH_CHANGE;
            private static DATA_NO_VCLICK_HANDLE;
            private static BACK_DESTINATION_URL;
            private static SUBFLOW_PARAM;
            private static s_defaultInitOptions;
            private static s_defaultNavigateOptions;
            /**
             * \~english
             * for initialize Router. this function is called in framework.
             *
             * @return {Boolean} true: succeeded / false: failed.
             *
             * \~japanese
             * 初期化
             * この関数はフレームワーク内部で使用される。
             *
             * @param  options {Object} [in] オプション
             * @return {Boolean} 成否
             */
            static initialize(options: any): boolean;
            /**
             * \~english
             * Register to Router.
             *
             * @param route    {String}   [in] route string, it can be regular expression.
             * @param page     {String}   [in] page template path.
             * @param top      {Boolean}  [in] set "true" if application's top view. (optional)
             * @param callback {Function} [in] callback for custom page transition. If you don't want to trigger jQM.changePage(), return true by this callback. (optional)
             * @return {Router} Router instance.
             *
             * \~japanese
             * 登録
             *
             * @param route    {String}   [in] ルーティング文字列 / 正規表現
             * @param page     {String}   [in] page template path. イベント名にも使用される
             * @param top      {Boolean}  [in] Top ページの場合は true を指定 (任意)
             * @param callback {Function} [in] 遷移を自身で管理する場合に指定し、戻り値を true に設定すると changePage をコールしない (任意)
             * @return {Router} インスタンス。ただし method chain をしたい場合は、any cast が必要。
             */
            static register(route: string, page: string, top?: boolean, callback?: (...args: any[]) => boolean): Router;
            /**
             * \~english
             * Start listening hash change.
             * It should be called after register().
             *
             * @param options {Object} [in] options object for Backbone.History.
             *
             * \~japanese
             * 履歴監視の開始
             * 登録完了後に呼び出す。
             *
             * @param options {Object} [in] Backbone.History にわたるオプション
             */
            static start(options?: RouterOptions): boolean;
            /**
             * \~english
             * Stop listening hash change.
             *
             * @return {Boolean} previous status.
             *
             * \~japanese
             * 履歴監視の終了
             *
             * @return {Boolean} 以前の開始状態を返却
             */
            static stop(): boolean;
            /**
             * \~english
             * Check routing status.
             *
             * @return {Boolean} true: routing / false: not routing
             *
             * \~japanese
             * ルーティングを開始しているか判定
             *
             * @return {Boolean} true: 有効 / false: 無効
             */
            static isRouting(): boolean;
            /**
             * \~english
             * URL navigation.
             *
             * @param url        {String}          [in] set a navigate URL. (relative path / absolute path / fragment)
             * @param transition {String}          [in] set a transition string (optional)
             * @param reverse    {Boolean}         [in] set a direction string for transition. true:reverse / false:nomal (optional)
             * @param options    {NavigateOptions} [in] set a options object for Backbone.Router.navigate(). (optional)
             *
             * \~japanese
             * URL遷移
             *
             * @param url        {String}          [in] 遷移 URL を指定 (相対パス/絶対パス/フラグメント)
             * @param transition {String}          [in] transition に使用する effect を指定 (任意)
             * @param reverse    {Boolean}         [in] transition に使用する direction を指定 true:reverse/false:通常 (任意)
             * @param options    {NavigateOptions} [in] Backbone.Router.navigate() に渡されるオプション (任意)
             */
            static navigate(url: string, transition?: string, reverse?: boolean, options?: NavigateOptions): void;
            /**
             * \~english
             * Back to previous history.
             * It's same as browser back button's behaviour.
             * [Note] If set the jQM: data-rel="back", work as well.
             *
             * \~japanese
             * 履歴を戻る
             * ブラウザの戻るボタンと同じ挙動。
             * jQM: data-rel="back" を指定しても同じであることに注意。
             */
            static back(): void;
            /**
             * \~english
             * Store Intent object.
             *
             * \~japanese
             * Intent を格納
             */
            static pushIntent(intent: Intent): void;
            /**
             * \~english
             * Get Intent object.
             *
             * \~japanese
             * Intent を取得
             */
            static popIntent(): Intent;
            /**
             * \~english
             * Get query parameters.
             *
             * \~japanese
             * query parameter に指定された引数の取得
             * ページ遷移中にのみアクセス可能 (pagebeforecreate ～ pagechange)
             */
            static getQueryParameters(): any;
            /**
             * \~english
             * Check in sub flow.
             *
             * \~japanese
             * sub flow 内であるか判定
             */
            static isInSubFlow(): boolean;
            /**
             * \~english
             * Check from hash changed navigation.
             *
             * \~japanese
             * Hash 変更によって Navigate が起こったか判定
             * "pagechange" が発生するまでに判定可能
             */
            static fromHashChanged(): boolean;
            /**
             * \~english
             * Register page stack.
             * Set registered route(s) to add to page stack on the basis of the present stack position.
             *
             * @param pageStack    {PageStack|[PageStack]}   [in] PageStackOptions object or array.
             * @param withNavigate {Boolean}                 [in] true: with navigate final stack. (default) / false: not navigate.
             * @param options      {NavigateOptions}         [in] set a options object for Backbone.Router.navigate().(optional)
             * @return {Boolean} true: succeeded / false: failed
             *
             * \~japanese
             * ページスタック登録
             * 登録済みの route を指定して、現在の位置を基点にページスタックに登録
             *
             * @param pageStack    {PageStack|[PageStack]}   [in] PageStackOptions オブジェクト/配列
             * @param withNavigate {Boolean}                 [in] true: 最後のスタックに対してページ遷移する. (default) / false: ページ遷移しない.
             * @param options      {NavigateOptions}         [in] Backbone.Router.navigate() に渡されるオプション (任意)
             * @return {Boolean} true: 成功 / false: 失敗。
             */
            static registerPageStack(pageStack: PageStack, withNavigate?: boolean, options?: NavigateOptions): boolean;
            static registerPageStack(pageStack: PageStack[], withNavigate?: boolean, options?: NavigateOptions): boolean;
            /**
             * \~english
             * Override: Backbone.History.loadUrl().
             *
             * @private
             *
             * \~japanese
             * Backbone.History.loadUrl() のオーバーライド
             *
             * @private
             */
            private static customLoadUrl(fragment);
            /**
             * \~english
             * Override: $.mobile.back().
             *
             * fail safe processing.
             *  If using Backbone's Router,
             *  this class unuses history object of jQuery Mobile 1.4,
             *  and standardize as browser back button's behaviour. (jQM 1.3 comparable)
             *
             * @private
             *
             * \~japanese
             * $.mobile.back() のオーバーライド
             *
             * [TBD] fail safe 処理
             *  Backbone の Router を使用している場合、
             *  jQuery Mobile 1.4 以降の内部の History 管理は使用せずに
             *  1.3 相当のブラウザの[戻る]の挙動に統一する。
             *
             * @private
             */
            private static customJqmBack();
            /**
             * \~english
             * Bind events.
             *
             * @private
             *
             * \~japanese
             * イベントバインド
             *
             * @private
             */
            private static bindEvents();
            /**
             * \~english
             * Store the RootContext.
             *
             * @private
             * @param name    {String}       [in] name of route
             * @param context {RouteContext} [in] context object
             * @return true: succeeded / false: already registered
             *
             * \~japanese
             * RootContext の格納
             *
             * @private
             * @param name    {String}       [in] route 名
             * @param context {RouteContext} [in] context オブジェクト
             * @return true: 登録成功 / false: すでに登録されている
             */
            private static pushContext(name, context);
            /**
             * \~english
             * Check if $.mobile.initializePage() is called or not, and call it if needed.
             *
             * @private
             * @param url {String}  [in] set a navigate URL. (relative path / absolute path / fragment)
             *
             * \~japanese
             * $.mobile.initializePage() が呼ばれているか確認し、必要なら初期化する。
             *
             * @private
             * @param url {String} [in] 遷移 URL を指定 (相対パス/絶対パス/フラグメント)
             */
            private static initFirstPageIfNeeded(url);
            /**
             * \~english
             * Check for current page is top.
             *
             * @private
             * @return true: top page / false: not top page
             *
             * \~japanese
             * 現在のページが top に指定されているか判定
             *
             * @private
             * @return true: top 指定 / false: top ではない
             */
            private static isTopPage();
            /**
             * \~english
             * Called when anchor received "vclick" event.
             *
             * @private
             * @return true: need default processing / false: need custom processing
             *
             * \~japanese
             * anchor が vclick されたときにコールされる
             *
             * @private
             * @return true: default 処理 / false: カスタム処理
             */
            private static onAnchorVclicked(event);
            /**
             * \~english
             * Anchor processing.
             *
             * @private
             *
             * \~japanese
             * anchor 処理
             *
             * @private
             */
            private static followAnchor(event);
            /**
             * \~english
             * Check default processing needed.
             *
             * @private
             * @param  url {String} [in] url string
             * @return true: need default processing / false: need not
             *
             * \~japanese
             * 既定の処理を行わせるか判定
             *
             * @private
             * @param  url {String} [in] url 文字列
             * @return true: 既定の処理が必要 / false: 不要
             */
            private static needDefaultOperation(url);
            /**
             * \~english
             * Check status of Backbone.Router if they can resolve route.
             *
             * @private
             * @param  url {String} [in] url 文字列
             * @return true: can resolve / false: can not
             *
             * \~japanese
             * Backbone.Router が route を解決可能か判定
             *
             * @private
             * @param  url {String} [in] url 文字列
             * @return true: 解決可能 / false: 解決不可
             */
            private static canResolveRoute(url);
            /**
             * \~english
             * Check "vclick" fired at the last minute.
             *
             * @private
             *
             * \~japanese
             * 直前に vclick が呼ばれたか判定
             *
             * @private
             */
            private static isJustBeforeVclicked();
            /**
             * \~english
             * Check back button clicked.
             *
             * @private
             *
             * \~japanese
             * Back Button がクリックされたか判定
             *
             * @private
             */
            private static isBackButtonClicked(event);
            /**
             * \~english
             * It called on succeed routing triggered by changing hash.
             *
             * @private
             * @param name {String} [in] name of route
             * @param args {Array}  [in] array of paramter
             *
             * \~japanese
             * ハッシュ値が変更され、ルーティングが成功したときにコールされる
             *
             * @private
             * @param name {String} [in] route 名。page の値が渡る。
             * @param args {Array}  [in] パラメータ配列。
             */
            private static onRouteSucceeded(name, ...args);
            /**
             * \~english
             * It called on failed routing triggered by changing hash.
             *
             * @private
             * @param name {String} [in] name of route
             * @param args {Array}  [in] array of paramter
             *
             * \~japanese
             * ハッシュ値が変更され、ルーティングが失敗したときにコールされる
             *
             * @private
             * @param name {String} [in] route 名。page の値が渡る。
             * @param args {Array}  [in] パラメータ配列。
             */
            private static onRouteFailed(fragment);
            /**
             * \~english
             * This function just calls jQuery Mobile's navigation method.
             *
             * @private
             * @param path {String} [in] to page path
             *
             * \~japanese
             * jQuery Mobile によるページ遷移指定
             *
             * @private
             * @param path {String} [in] 遷移先パスを指定
             */
            private static changePage(path);
            /**
             * \~english
             * Decide direction parameter.
             * It's as same as jQM internal implement. (imperfection)
             *
             * @private
             * @param path {String} [in] to page path
             *
             * \~japanese
             * direction の判定
             * jQM の内部実装と等価 (不完全)
             *
             * @private
             * @param path {String} [in] 遷移先パスを指定
             */
            private static decideDirection(path);
            /**
             * \~english
             * Return additional back distance count when back destination set.
             * (const function)
             *
             * @private
             * @return {Number} count of additiona back distance.
             *
             * \~japanese
             * 戻り先が指定されているとき、追加の Back 数を返します。
             * (この関数は Router の状態を変更しません。)
             *
             * @private
             * @return {String} 追加で Back に必要な距離.
             */
            private static detectAdditionalBackDistance();
            /**
             * \~english
             * Begin sub flow
             * Attach SubFlowParam to jqm history stack object.
             *
             * @param subFlowParam {SubFlowParam} [in] Sub Flow parameter
             *
             * \~japanese
             * Sub Flow の開始
             * SubFlowParam を jqm history stack にアタッチ
             *
             * @param subFlowParam {SubFlowParam} [in] Sub Flow パラメータ
             */
            private static beginSubFlow(subFlowParam);
            /**
             * \~english
             * End sub flow
             * navigate and delete SubFlowParam from jqm history stack object.
             *
             * @param navOptions {NavigateOptions} [in] Sub Flow parameter
             *
             * \~japanese
             * Sub Flow の終了
             * 遷移と SubFlowParam を jqm history stack から削除
             *
             * @param navOptions {NavigateOptions} [in] Sub Flow パラメータ
             */
            private static endSubFlow(options);
            /**
             * \~english
             * Return destination Sub Flow information.
             * (const function)
             *
             * @private
             * @return {Object} sub flow info.
             *
             * \~japanese
             * Sub Flow 情報を返却
             * (この関数は Router の状態を変更しません。)
             *
             * @private
             * @return {Object} Sub Flow 情報.
             */
            private static detectSubFlowBaseInfo();
            /**
             * \~english
             * Convert path to jQM dataUrl.
             *
             * @private
             * @return {String} jQM data url.
             *
             * \~japanese
             * パスを jQM dataUrl に変換
             *
             * @private
             * @return {String} jQM data url.
             */
            private static pathToJqmDataUrl(path);
            /**
             * \~english
             * Update jQM urlHistory by window.history object.
             * To be natural browsing history behavior, application needs to update jQM urlHistory
             * when clicking back or next button of browser. (imperfection for decideDirection())
             *
             * @private
             *
             * \~japanese
             * ブラウザの履歴に基づき jQM urlHistory を更新
             * [戻る]/[進む]が押下された後、ページ遷移されるとき、jQM urlHistory を更新する。(decideDirection() により不完全)
             *
             * @private
             */
            private static treatUrlHistory();
            /**
             * \~english
             * Get jQM's history object
             * version 1.4:
             *   $.mobile.navigate.history
             * version 1.3:
             *   $.mobile.urlHistory
             *
             * @private
             *
             * \~japanese
             * jQM の History オブジェクトの取得
             * version 1.4:
             *   $.mobile.navigate.history
             * version 1.3:
             *   $.mobile.urlHistory
             *
             * @private
             */
            private static getJqmHistory();
        }
    }
}
declare module CDP {
    /**
     * \~english
     * The function returned JQueryPromise waits until PhoneGap is ready.
     * [Note] emulate when PC enviroment.
     *
     * \~japanese
     * PhoneGap が有効になるまで待機
     * PC 環境ではエミュレートされる。
     */
    function waitForDeviceReady(): JQueryPromise<{}>;
    /**
     * \~english
     * Setup H/W Back key handler.
     *
     * @param  {Function} handler function.
     * @return {Function} old handler function.
     *
     * \~japanese
     *
     * @param  {Function} handler 指定.
     * @return {Function} 以前の handler.
     */
    function setBackButtonHandler(handler: (event?: JQueryEventObject) => void): (event?: JQueryEventObject) => void;
    module Framework {
        /**
         * \~english
         * Initialization function of Framework.
         *
         * \~japanese
         * Framework の初期化関数
         *
         * @param options {Object} [in] TBD.
         */
        function initialize(options?: any): JQueryPromise<any>;
        /**
         * \~english
         * Check for initialization status.
         *
         * \~japanese
         * 初期化済みか判定
         *
         * @return {Boolean} true: 初期化済み / false: 未初期化
         */
        function isInitialized(): boolean;
        /**
         * \~english
         * Register IOrientationChangedListener to framework.
         *
         * @param key      {String}                      [in] ID key
         * @param listener {IOrientationChangedListener} [in] IOrientationChangedListener instance
         *
         * \~japanese
         * IOrientationChangedListener を Framework に登録
         *
         * @param key      {String}                      [in] ID key
         * @param listener {IOrientationChangedListener} [in] IOrientationChangedListener instance
         */
        function registerOrientationChangedListener(key: string, listener: IOrientationChangedListener): void;
        /**
         * \~english
         * Unregister IOrientationChangedListener from framework.
         *
         * @param key {String} [in] ID key
         *
         * \~japanese
         * IOrientationChangedListener を Framework から登録解除
         *
         * @param key {String} [in] ID key
         */
        function unregisterOrientationChangedListener(key: string): void;
        /**
         * \~english
         * Setup event handlers when after router initialized.
         *
         * @private
         *
         * \~japanese
         * イベントハンドラの設定. Router 初期化後に Framework がコールする.
         *
         * @private
         */
        function setupEventHandlers(): void;
        /**
         * \~english
         * Setup active IPage instance.
         *
         * @private
         * @param page {IPage} [in] IPage instance.
         *
         * \~japanese
         * active Page の設定. Framework がコールする.
         *
         * @private
         * @param page {IPage} [in] IPage instance.
         */
        function setActivePage(page: IPage): void;
        /**
         * \~english
         * Reterns framework default click event string.
         *
         * @private
         *
         * \~japanese
         * Framework が既定に使用するクリックイベント文字列を取得
         *
         * @private
         * @return {String} "vclick" / "click"
         */
        function getDefaultClickEvent(): string;
    }
}
declare module CDP {
    module Framework {
        /**
         * \~english
         * @class Page
         * @brief Base class of all page unit.
         *
         * \~japanese
         * @class Page
         * @brief すべてのページの基本となる既定クラス
         */
        class Page implements IPage {
            private _url;
            private _id;
            protected _owner: IPage;
            private _$page;
            private _$header;
            private _$footer;
            private _intent;
            private _initialized;
            /**
             * \~english
             * constructor
             *
             * @param _url    {String}               [in] page's URL
             * @param _id     {String}               [in] page's ID
             * @param options {PageConstructOptions} [in] options
             *
             * \~japanese
             * constructor
             *
             * @param _url    {String}               [in] ページ URL
             * @param _id     {String}               [in] ページ ID
             * @param options {PageConstructOptions} [in] オプション
             */
            constructor(_url: string, _id: string, options?: PageConstructOptions);
            active: boolean;
            url: string;
            id: string;
            $page: JQuery;
            $header: JQuery;
            $footer: JQuery;
            intent: Intent;
            onOrientationChanged(newOrientation: Orientation): void;
            onHardwareBackButton(event?: JQueryEventObject): boolean;
            onBeforeRouteChange(): JQueryPromise<any>;
            onCommand(event?: JQueryEventObject, kind?: string): void;
            onInitialize(event: JQueryEventObject): void;
            onPageBeforeCreate(event: JQueryEventObject): void;
            onPageInit(event: JQueryEventObject): void;
            onPageBeforeShow(event: JQueryEventObject, data?: ShowEventData): void;
            onPageShow(event: JQueryEventObject, data?: ShowEventData): void;
            onPageBeforeHide(event: JQueryEventObject, data?: HideEventData): void;
            onPageHide(event: JQueryEventObject, data?: HideEventData): void;
            onPageRemove(event: JQueryEventObject): void;
            private setup(options);
            private pageBeforeCreate(event);
            private pageInit(event);
            private pageBeforeShow(event, data);
            private pageShow(event, data);
            private pageBeforeHide(event, data);
            private pageHide(event, data);
            private pageRemove(event);
        }
    }
}
