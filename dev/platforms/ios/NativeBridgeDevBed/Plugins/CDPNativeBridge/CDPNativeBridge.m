/**
 * @file CDPNativeBridge.m
 * @brief Implementation file for CDP NativeBridge class.
 */

#import "CDPNativeBridge.h"
#import "CDPMethodContext.h"
#import "CDPGate.h"
#import "CDPMessageUtils.h"

@implementation CDPNativeBridge {
    NSMutableDictionary* _gates;
}

#define TAG @"[CDPNativeBridge][Native]"

//////////////////////////////////////////////////////
// Initialzier

- (CDVPlugin*)initWithWebView:(UIWebView *)theWebView
{
    self = [super initWithWebView:theWebView];
    if (self) {
        _gates = [@{} mutableCopy];
    }
    return self;
}

//////////////////////////////////////////////////////
// Plugin I/F

- (void) execTask:(CDVInvokedUrlCommand *)command
{
    CDPMethodContext* context = [[CDPMethodContext alloc] initWithPlugin:self andCommand:command];
    
    if (!context.className) {
        NSString* errorMsg = [NSString stringWithFormat:@"%@ not implemented.", TAG];
        [CDPMessageUtils sendErrorResultWithContext:context andTaskId:context.taskId andCode:CDP_NATIVEBRIDGE_ERROR_NOT_IMPLEMENT andMessage:errorMsg];
    } else {
        CDPGate* gate = [self getGateClassFromObjectId:context.objectId andClassName:context.className];
        if (!gate) {
            NSString* errorMsg = [NSString stringWithFormat:@"%@ class not found. class: %@", TAG, context.class];
            [CDPMessageUtils sendErrorResultWithContext:context andTaskId:context.taskId andCode:CDP_NATIVEBRIDGE_ERROR_CLASS_NOT_FOUND andMessage:errorMsg];
        } else {
            NSDictionary* errorResult = [gate invokeWithContext:context];
            if (errorResult) {
                [CDPMessageUtils sendErrorResultWithContext:context andResult:errorResult];
            }
        }
    }
}

- (void) cancelTask:(CDVInvokedUrlCommand *)command
{
    [self cancelProc:command];
}

- (void) disposeTask:(CDVInvokedUrlCommand *)command
{
    NSString* objectId = [self cancelProc:command];
    if (objectId) {
        [_gates[objectId] dispose];
        [_gates removeObjectForKey:objectId];
    }
}

//////////////////////////////////////////////////////
// private methods

//! get CDPGate class from cache.
- (CDPGate*) getGateClassFromObjectId:(NSString*)objectId andClassName:(NSString*)className
{
    CDPGate* gate = _gates[objectId];
    if (!gate) {
        gate = [self createGateClassFromClassName:className];
        if (gate) {
            _gates[objectId] = gate;
        }
    }
    return gate;
}

//! create CDPGate class by class name.
- (CDPGate*) createGateClassFromClassName:(NSString*)className
{
    id obj = [[NSClassFromString(className) alloc] initWithPlugin:self];
    if (![obj isKindOfClass:[CDPGate class]]) {
        obj = nil;
        NSLog(@"%@ %@ class is not CDPGate class.", TAG, className);
    }
    return obj;
}

//! cancel process
- (NSString*) cancelProc:(CDVInvokedUrlCommand *)command
{
    NSString* objectId = nil;
    
    CDPMethodContext* context = [[CDPMethodContext alloc] initWithPlugin:self andCommand:command];
    
    if (!context.className) {
        NSString* errorMsg = [NSString stringWithFormat:@"%@ not implemented.", TAG];
        [CDPMessageUtils sendErrorResultWithContext:context andTaskId:context.taskId andCode:CDP_NATIVEBRIDGE_ERROR_NOT_IMPLEMENT andMessage:errorMsg];
    } else {
        CDPGate* gate = [self getGateClassFromObjectId:context.objectId andClassName:context.className];
        if (!gate) {
            NSString* errorMsg = [NSString stringWithFormat:@"%@ class not found. class: %@", TAG, context.class];
            [CDPMessageUtils sendErrorResultWithContext:context andTaskId:context.taskId andCode:CDP_NATIVEBRIDGE_ERROR_CLASS_NOT_FOUND andMessage:errorMsg];
        } else {
            [gate cancel:context];
            [CDPMessageUtils sendSuccessResultWithContext:context andResult:[CDPMessageUtils makeMessaggeWithTaskId:nil]];
            objectId = context.objectId;
        }
    }

    return objectId;
}

@end