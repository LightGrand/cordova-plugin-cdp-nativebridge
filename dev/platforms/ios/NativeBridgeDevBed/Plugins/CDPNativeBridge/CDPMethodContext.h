/**
 * @file CDPGateContext.h
 * @brief Interface definition file for CDP NativeBridge Gate Context class.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface CDPMethodContext : CDVInvokedUrlCommand

@property (nonatomic, weak) id <CDVCommandDelegate> commandDelegate;
@property (nonatomic, readonly) NSString* objectId;
@property (nonatomic, readonly) NSString* taskId;
@property (nonatomic, readonly) BOOL compatible;
@property (nonatomic, readonly) NSString* threadId;
@property (atomic, readwrite) BOOL needSendResult;

/**
 * initializer
 *
 * @param plugin    [in] plugin instance
 * @param command   [in] command object
 * @param execInfo  [in] execute information object
 * @param arguments [in] arguments array
 */
- (id)initWithPlugin:(CDVPlugin*)plugin
          andCommand:(CDVInvokedUrlCommand*)command
         andExecInfo:(NSDictionary*)execInfo
        andArguments:(NSArray*)arguments;

@end