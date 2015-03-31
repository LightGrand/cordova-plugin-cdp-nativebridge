﻿declare module CDP {
	/**
	* \~english
	* Script lazy loading.
	*
	* \~japanese
	* 遅延スクリプトロード
	*
	* @param type {String} [in] script タグに指定されたタイプを指定
	*/
	function lazyLoad(type: string): void;

	/**
	 * \~english
	 * Check for AMD is available.
	 *
	 * \~japanese
	 * AMD が使用可能か判定
	 *
	 * @private
	 * @return {Boolean} true: AMD 対応環境 / false: AMD 非対応
	 */
	function isAMD(): boolean;
}
