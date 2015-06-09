﻿/// <reference path="jquery.d.ts" />
declare module CDP {
    /**
     * @interface IPromise
     * @brief キャンセル可能な Promise オブジェクトのインターフェイス定義
     */
    interface IPromise<T> extends JQueryPromise<T> {
        abort(info?: any): void;
        dependency?: IPromise<any>;
        callReject?: boolean;
        dependOn<U>(promise: IPromise<U>): JQueryPromise<U>;
        dependOn(promise: JQueryXHR): JQueryXHR;
    }
    /**
     * @interface Promise
     * @brief キャンセル可能な Promise オブジェクトのインターフェイス定義
     *        IPromise<any> の糖衣構文
     */
    interface Promise extends IPromise<any> {
    }
    /**
     * Promise オブジェクトの作成
     * jQueryDeferred オブジェクトから、Tools.Promise オブジェクトを作成する
     *
     * @param df {JQueryDeferred} [in] jQueryDeferred instance を指定
     * @param options? {Object}   [in] jQueryPromise を拡張するオブジェクトを指定
     * @return {IPromise} Tools.IPromise オブジェクト
     */
    function makePromise<T>(df: JQueryDeferred<T>, options?: any): IPromise<T>;
    /**
     * Promise オブジェクトの終了を待つ
     * $.when() は失敗するとすぐに制御を返すのに対し、失敗も含めて待つ Promise オブジェクトを返却
     *
     * @param deferreds {JQueryPromise<T>|JQueryPromise<T>[]} [in] Promise オブジェクト(可変引数, 配列)
     * @return {JQueryPromise<T>} Promise オブジェクト
     */
    function wait<T>(...deferreds: IPromise<T>[]): JQueryPromise<T>;
    function wait<T>(...deferreds: JQueryGenericPromise<T>[]): JQueryPromise<T>;
    function wait<T>(...deferreds: T[]): JQueryPromise<T>;
    /**
     * @class PromiseManager
     * @brief 複数の DataProvider.Promise を管理するクラス
     */
    class PromiseManager {
        private _pool;
        private _id;
        /**
         * Promise を管理下に追加
         *
         * @param promise {Promise} [in] 管理対象のオブジェクト
         * @return {Promise} 引数に渡したオブジェクト
         */
        add<T>(promise: IPromise<T>): IPromise<T>;
        add<T>(promise: JQueryXHR): JQueryPromise<any>;
        /**
         * 管理対象の Promise に対して abort を発行
         * キャンセル処理に対するキャンセルは不可
         *
         * @return {jQueryPromise}
         */
        cancel(info?: any): JQueryPromise<any>;
        /**
         * 管理対象の Promise を配列で返す
         *
         * @return {Promise[]}
         */
        promises(): Promise[];
    }
}
