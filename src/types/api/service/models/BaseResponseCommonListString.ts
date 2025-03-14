/* tslint:disable */
/* eslint-disable */
/**
 * MediaBee Service API
 * MediaBee Service API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { MessageDto } from './MessageDto';
import {
    MessageDtoFromJSON,
    MessageDtoFromJSONTyped,
    MessageDtoToJSON,
} from './MessageDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonListString
 */
export interface BaseResponseCommonListString {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListString
     */
    status?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof BaseResponseCommonListString
     */
    data?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListString
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonListString
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListString
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonListString interface.
 */
export function instanceOfBaseResponseCommonListString(value: object): value is BaseResponseCommonListString {
    return true;
}

export function BaseResponseCommonListStringFromJSON(json: any): BaseResponseCommonListString {
    return BaseResponseCommonListStringFromJSONTyped(json, false);
}

export function BaseResponseCommonListStringFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonListString {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : json['data'],
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonListStringToJSON(value?: BaseResponseCommonListString | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': value['data'],
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

