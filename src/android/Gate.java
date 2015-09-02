package com.sony.cdp.plugin.nativebridge;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;


/**
 * @class Gate
 * @brief NativeBridge と通信するベースクラス
 *         com.sony.cdp.plugin.nativebridge クライアントは本クラスから Gate クラスを派生する
 */
public class Gate {
    private static final String TAG = "[com.sony.cdp.plugin.nativebridge][Native][Gate] ";

    protected CordovaWebView webView;
    protected CordovaInterface cordova;
    protected CordovaPreferences preferences;

    private MethodContext mCurrentContext = null;
    private Map<String, Boolean> mCancelableTask = new HashMap<String, Boolean>();

    ///////////////////////////////////////////////////////////////////////
    // public methods

    /**
     * CordovaPlugin 相当の初期化
     * オーバーライド不可
     *
     * @param cordova [in] CordovaInterface インスタンス
     * @param webView [in] CordovaWebView インスタンス
     * @param preferences [in] CordovaPreferences インスタンス
     */
    public final void privateInitialize(CordovaInterface cordova, CordovaWebView webView, CordovaPreferences preferences) {
        this.cordova = cordova;
        this.webView = webView;
        this.preferences = preferences;
        initialize(cordova, webView);
    }

    /**
     * Cordova 互換ハンドラ (JSONArray 版)
     * NativeBridge からコールされる
     * compatible オプションが有効な場合、このメソッドがコールされる
     * クライアントは本メソッドをオーバーライド可能
     *
     * @param action          [in] アクション名.
     * @param args            [in] exec() 引数.
     * @param callbackContext [in] CallbackContext を格納. MethodContext にダウンキャスト可能
     * @return  action の成否 true:成功 / false: 失敗
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        return execute(action, new CordovaArgs(args), callbackContext);
    }

    /**
     * Cordova 互換ハンドラ (CordovaArgs 版)
     * NativeBridge からコールされる
     * compatible オプションが有効な場合、このメソッドがコールされる
     * クライアントは本メソッドをオーバーライド可能
     *
     * @param action          [in] アクション名.
     * @param args            [in] exec() 引数.
     * @param callbackContext [in] CallbackContext を格納. MethodContext にダウンキャスト可能
     * @return  action の成否 true:成功 / false: 失敗
     */
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        Log.w(TAG, "execute() method should be override from sub class.");
        return false;
    }

    /**
     * メソッド呼び出し
     * NativeBridge からコールされる
     *
     * @param mehtodName    [in] 呼び出し対象のメソッド名
     * @param args          [in] exec() の引数リスト
     * @param context       [in] MethodContext オブジェクト
     * @return エラー情報
     */
    public final JSONObject invoke(final MethodContext context) {
        synchronized (this) {
            try {
                JSONArray args = context.methodArgs;
                Class<?> cls = this.getClass();
                int length = args.length();
                Class<?>[] argTypes = new Class[length];
                Object[] argValues = new Object[length];
                for (int i = 0; i < length; i++) {
                    Object arg = args.get(i);
                    argTypes[i] = normalizeType(arg.getClass());
                    argValues[i] = arg;
                }
                Method method = cls.getMethod(context.methodName, argTypes);

                mCurrentContext = context;
                method.invoke(this, argValues);
                if (mCurrentContext.needSendResult) {
                    MessageUtils.sendSuccessResult(context, context.taskId);
                }
            } catch (JSONException e) {
                Log.e(TAG, "Invalid JSON object", e);
                return MessageUtils.makeMessage(MessageUtils.ERROR_INVALID_ARG, (TAG + "JSONException occured."), context.taskId);
            } catch (NoSuchMethodException e) {
                Log.d(TAG, "method not found", e);
                return MessageUtils.makeMessage(MessageUtils.ERROR_METHOD_NOT_FOUND, (TAG + "method not found. method: " + context.className + "#" + context.methodName), context.taskId);
            } catch (IllegalAccessException e) {
                Log.e(TAG, "Illegal Access", e);
                return MessageUtils.makeMessage(MessageUtils.ERROR_INVALID_ARG, (TAG + "IllegalAccessException occured."), context.taskId);
            } catch (IllegalArgumentException e) {
                Log.e(TAG, "Invalid Arg", e);
                return MessageUtils.makeMessage(MessageUtils.ERROR_INVALID_ARG, (TAG + "IllegalArgumentException occured."), context.taskId);
            } catch (InvocationTargetException e) {
                Log.e(TAG, "Invocation Target Exception", e);
                return MessageUtils.makeMessage(MessageUtils.ERROR_INVALID_OPERATION, (TAG + "InvocationTargetException occured."), context.taskId);
            } finally {
                mCurrentContext = null;
            }
        }
        return null;
    }

    /**
     * cancel 呼び出し
     * NativeBridge からコールされる。
     *
     * @param context [in] metod context オブジェクト
     */
    public final void cancel(final MethodContext context) {
        setCancelState(context.taskId);
        onCancel(context.taskId);
        return;
    }

    ///////////////////////////////////////////////////////////////////////
    // protected methods

    /**
     * CordovaPlugin 相当の初期化
     * オーバーライド可能
     *
     * @param cordova [in] CordovaInterface インスタンス
     * @param webView [in] CordovaWebView インスタンス
     */
    protected void initialize(CordovaInterface cordova, CordovaWebView webView) {
        // override
    }

    /**
     * MethodContext の取得
     * getContext() のヘルパー関数。 既定で autoSendResult を false に設定する。
     *
     * @return MethodContext オブジェクト
     */
    protected final MethodContext getContext() {
        return getContext(false);
    }

    /**
     * MethodContext の取得
     * method 呼び出されたスレッドからのみ MethodContext 取得が可能
     * compatible オプションを伴って呼ばれた場合は無効になる。
     *
     * @param  autoSendResult [in] Framework 内で暗黙的に sendResult() する場合には true を指定
     * @return MethodContext オブジェクト
     */
    protected final MethodContext getContext(boolean autoSendResult) {
        synchronized (this) {
            if (null != mCurrentContext && Thread.currentThread().getName().equals(mCurrentContext.threadId)) {
                mCurrentContext.needSendResult = autoSendResult;
                return mCurrentContext;
            } else {
                Log.e(TAG, "Calling getContext() is permitted only from method entry thread.");
                return null;
            }
        }
    }

    /**
     * 結果を JavaScript へ返却
     * 関数の return ステートメント同等のセマンティックスを持つ
     * method 呼び出されたスレッドからのみコール可能
     * keepCallback は false が指定される。
     *
     * @param param [in] Native から JavaScript へ返す値を指定
     */
    protected final void returnParams(Object param) {
        if (null != mCurrentContext && Thread.currentThread().getName().equals(mCurrentContext.threadId)) {
            mCurrentContext.needSendResult = false;
            MessageUtils.sendSuccessResult(mCurrentContext, MessageUtils.makeMessage(mCurrentContext.taskId, param));
        } else {
            Log.e(TAG, "Calling returnMessage() is permitted only from method entry thread.");
        }
    }

    /**
     * 値を JavaScript へ通知
     * sendPluginResult() のヘルパー関数。 既定で keepCallback を有効にする。
     *
     * @param context [in] MethodContext オブジェクトを指定
     * @param params  [in] パラメータを可変引数で指定
     */
    protected final void notifyParams(final MethodContext context, Object... params) {
        notifyParams(true, context, params);
    }

    /**
     * 値を JavaScript へ通知
     * sendPluginResult() のヘルパー関数
     *
     * @param keepCallback [in] keepCallback 値
     * @param context      [in] MethodContext オブジェクトを指定
     * @param params       [in] パラメータを可変引数で指定
     */
    protected final void notifyParams(boolean keepCallback, final MethodContext context, Object... params) {
        if (null == context) {
            Log.e(TAG, "Invalid context object.");
            return;
        }
        int resultCode = keepCallback ? MessageUtils.SUCCESS_PROGRESS : MessageUtils.SUCCESS_OK;
        PluginResult result = new PluginResult(PluginResult.Status.OK, MessageUtils.makeMessage(resultCode, null, context.taskId, params));
        result.setKeepCallback(keepCallback);
        context.sendPluginResult(result);
    }

    /**
     * 値を JavaScript へ通知
     * ワーカースレッドから使用可能
     * keepCallback は false が指定される
     *
     * @param context [in] MethodContext オブジェクトを指定
     * @param params  [in] パラメータを可変引数で指定
     */
    protected final void resolveParams(final MethodContext context, Object... params) {
        if (null == context) {
            Log.e(TAG, "Invalid context object.");
            return;
        }
        MessageUtils.sendSuccessResult(context, MessageUtils.makeMessage(context.taskId, params));
    }

    /**
     * 値を JavaScript へエラーを通知
     * ヘルパー関数
     * keepCallback は false が指定される
     *
     * @param context [in] MethodContext オブジェクトを指定
     * @param params  [in] パラメータを可変引数で指定
     */
    protected final void rejectParams(final MethodContext context, Object... params) {
        rejectParams(MessageUtils.ERROR_FAIL, null, context, params);
    }

    /**
     * 値を JavaScript へエラーを通知
     * ワーカースレッドから使用可能
     * keepCallback は false が指定される
     *
     * @param code    [in] エラーコード
     * @param message [in] エラーメッセージ
     * @param context [in] MethodContext オブジェクトを指定
     * @param params  [in] パラメータを可変引数で指定
     */
    protected final void rejectParams(int code, String message, final MethodContext context, Object... params) {
        if (null == context) {
            Log.e(TAG, "Invalid context object.");
            return;
        }
        MessageUtils.sendErrorResult(context, MessageUtils.makeMessage(code, message, context.taskId, params));
    }

    /**
     * キャンセル可能タスクとして登録
     *
     * @param context [in] MethodContext オブジェクトを指定
     */
    protected final void setCancelable(final MethodContext context) {
        synchronized (this) {
            mCancelableTask.put(context.taskId, false);
        }
    }

    /**
     * キャンセル可能タスクとして登録解除
     *
     * @param context [in] MethodContext オブジェクトを指定
     */
    protected final void removeCancelable(final MethodContext context) {
        synchronized (this) {
            mCancelableTask.remove(context.taskId);
        }
    }

    /**
     * キャンセルされたか判定
     *
     * @param context [in] context オブジェクトを指定
     */
    protected final boolean isCanceled(final MethodContext context) {
        synchronized (this) {
            return mCancelableTask.get(context.taskId);
        }
    }

    /**
     * cancel イベントハンドラ
     * キャンセル処理を実装したいクライアントは本メソッドをオーバーライド可能
     *
     * @param taskId [in] タスクID
     */
    protected void onCancel(String taskId) {
        // override
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods

    /**
     * 型の正規化
     * オブジェクトをプリミティブに変換する
     * 数値型は、すべて double にする (JavaScript との対象性より)
     *
     * @param src [in] 型情報
     * @return 正規化された型情報
     */
    private Class<?> normalizeType(Class<?> src) {
        String type = src.getName();
        if (    type.equals("java.lang.Byte")
            ||  type.equals("java.lang.Short")
            ||  type.equals("java.lang.Integer")
            ||  type.equals("java.lang.Long")
            ||  type.equals("java.lang.Float")
            ||  type.equals("java.lang.Double")
        ) {
            return double.class;
        } else if (type.equals("java.lang.Boolean")) {
            return boolean.class;
        } else {
            return src;
        }
    }

    /**
     * キャンセル情報を更新
     *
     * @param taskId [in] タスク ID
     */
    private void setCancelState(String taskId) {
        synchronized (this) {
            if (null == taskId) {
                for (String key: mCancelableTask.keySet()) {
                    mCancelableTask.put(key, true);
                }
            } else if (null != mCancelableTask.get(taskId)) {
                mCancelableTask.put(taskId, true);
            }
        }
    }
}
