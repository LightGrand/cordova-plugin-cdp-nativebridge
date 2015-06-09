﻿/// <reference path="jquery.d.ts" />
/// <reference path="underscore.d.ts" />
/**
 * @file  Utils.
 * @brief Tools 専用のユーティリティ
 */
declare module CDP {
    module Tools {
        var global: any;
    }
}
declare module CDP {
    module Tools {
        module Blob {
            /**
             * ArrayBuffer to Blob
             *
             * @param buf {ArrayBuffer} [in] ArrayBuffer data
             * @param mimeType {string} [in] MimeType of data
             * @return {Blob} Blob data
             */
            function arrayBufferToBlob(buf: ArrayBuffer, mimeType: string): Blob;
            /**
             * Base64 string to Blob
             *
             * @param base64 {string} [in] Base64 string data
             * @param mimeType {string} [in] MimeType of data
             * @return {Blob} Blob data
             */
            function base64ToBlob(base64: string, mimeType: string): Blob;
            /**
             * Base64 string to ArrayBuffer
             *
             * @param base64 {string} [in] Base64 string data
             * @return {ArrayBuffer} ArrayBuffer data
             */
            function base64ToArrayBuffer(base64: string): ArrayBuffer;
            /**
             * Base64 string to Uint8Array
             *
             * @param base64 {string} [in] Base64 string data
             * @return {Uint8Array} Uint8Array data
             */
            function base64ToUint8Array(encoded: string): Uint8Array;
            /**
             * ArrayBuffer to base64 string
             *
             * @param arrayBuffer {ArrayBuffer} [in] ArrayBuffer data
             * @return {string} base64 data
             */
            function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
            /**
             * Uint8Array to base64 string
             *
             * @param bytes {Uint8Array} [in] Uint8Array data
             * @return {string} base64 data
             */
            function uint8ArrayToBase64(bytes: Uint8Array): string;
            /**
             * URL Object
             *
             * @return {any} URL Object
             */
            var URL: any;
        }
    }
}
declare module CDP {
    module Tools {
        /**
         * @class DateTime
         * @brief 時刻操作のユーティリティクラス
         */
        class DateTime {
            /**
             * 基点となる日付から、n日後、n日前を算出
             *
             * @param base    {Date}   [in] 基準日
             * @param addDays {Number} [in] 加算日. マイナス指定でn日前も設定可能
             * @return {Date} 日付オブジェクト
             */
            static computeDate(base: Date, addDays: number): Date;
            /**
             * Convert string to date object
             *
             * @param {String} date string ex) YYYY-MM-DDTHH:mm:SS.SSS
             * @return {Object} date object
             */
            static convertISOStringToDate(dateString: string): Date;
            /**
             *  Convert a date object into a string in PMOAPI recorded_date format(the ISO 8601 Extended Format)
             *
             * @param date   {Date}   [in] date object
             * @param target {String} [in] {year | month | date | hour | min | sec | msec }
             * @return {String}
             */
            static convertDateToISOString(date: Date, target?: string): string;
            /**
             * Convert file system compatible string to date object
             *
             * @param {String} date string ex) yyyy_MM_ddTHH_mm_ss_SSS
             * @return {Object} date object
             */
            static convertFileSystemStringToDate(dateString: string): Date;
            /**
             *  Convert a date object into a string in file system compatible format(yyyy_MM_ddTHH_mm_ss_SSS)
             *
             * @param date   {Date}   [in] date object
             * @param target {String} [in] {year | month | date | hour | min | sec | msec }
             * @return {String}
             */
            static convertDateToFileSystemString(date: Date, target?: string): string;
            /**
             * Convert num to string(double digits)
             *
             * @param  {Number} number (0 <number < 100)
             * @return {String} double digits string
             */
            private static numberToDoubleDigitsString(num);
        }
    }
}
declare module CDP {
    module Tools {
        /**
         * Math.abs よりも高速な abs
         */
        function abs(x: number): number;
        /**
         * Math.max よりも高速な max
         */
        function max(lhs: number, rhs: number): number;
        /**
         * Math.min よりも高速な min
         */
        function min(lhs: number, rhs: number): number;
        /**
         * condition() が true を返すまで deferred
         */
        function await(condition: () => boolean, msec?: number): JQueryPromise<any>;
        /**
         * 数値を 0 詰めして文字列を生成
         */
        function toZeroPadding(no: number, limit: number): string;
        /**
         * 多重継承のための実行時継承関数
         *
         * Sub Class 候補オブジェクトに対して Super Class 候補オブジェクトを直前の Super Class として挿入する。
         * prototype のみコピーする。
         * インスタンスメンバをコピーしたい場合、Super Class が疑似コンストラクタを提供する必要がある。
         * 詳細は cdp.tools.Functions.spec.ts を参照。
         *
         * @param subClass   {constructor} [in] オブジェクトの constructor を指定
         * @param superClass {constructor} [in] オブジェクトの constructor を指定
         */
        function inherit(subClass: any, superClass: any): void;
        /**
         * mixin 関数
         *
         * TypeScript Official Site に載っている mixin 関数
         * http://www.typescriptlang.org/Handbook#mixins
         * 既に定義されているオブジェクトから、新規にオブジェクトを合成する。
         *
         * @param derived {constructor}    [in] 合成されるオブジェクトの constructor を指定
         * @param bases   {constructor...} [in] 合成元オブジェクトの constructor を指定 (可変引数)
         */
        function mixin(derived: any, ...bases: any[]): void;
        /**
         * DPI 取得
         */
        function getDevicePixcelRatio(): number;
        /**
         * Web Worker 起動ユーティリティ
         */
        function doWork(worker: Worker, msg: any): JQueryPromise<any>;
        function doWork(worker: string, msg: any): JQueryPromise<any>;
    }
}
declare module CDP {
    module Tools {
        /**
         * @interface JST
         * @brief コンパイル済み テンプレート格納インターフェイス
         */
        interface JST {
            (data?: any): string;
        }
        /**
         * @class Template
         * @brief template script を管理するユーティリティクラス
         */
        class Template {
            static _mapElement: any;
            static _mapSource: any;
            /**
             * 指定した id, class 名, Tag 名をキーにテンプレートの JQuery Element を取得する。
             *
             * @param key [in] id, class, tag を表す文字列
             * @param src [in] 外部 html を指定する場合は url を設定
             * @return template が格納されている JQuery Element
             */
            static getTemplateElement(key: string, src?: string): JQuery;
            /**
             * Map オブジェクトの削除
             * 明示的にキャッシュを開放する場合は本メソッドをコールする
             */
            static empty(): void;
            /**
             * 指定した id, class 名, Tag 名をキーに JST を取得する。
             *
             * @param key [in] id, class, tag を表す文字列
             * @param src [in] 外部 html を指定する場合は url を設定
             * @return コンパイルされた JST オブジェクト
             */
            static getJST(key: string, src?: string): JST;
            private static getElementMap();
            private static getSourceMap();
            private static findHtmlFromSource(src);
        }
    }
}
