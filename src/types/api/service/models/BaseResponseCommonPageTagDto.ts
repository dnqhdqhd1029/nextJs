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
import type { PageTagDto } from './PageTagDto';
import {
    PageTagDtoFromJSON,
    PageTagDtoFromJSONTyped,
    PageTagDtoToJSON,
} from './PageTagDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPageTagDto
 */
export interface BaseResponseCommonPageTagDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageTagDto
     */
    status?: string;
    /**
     * 
     * @type {PageTagDto}
     * @memberof BaseResponseCommonPageTagDto
     */
    data?: PageTagDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageTagDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPageTagDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageTagDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPageTagDto interface.
 */
export function instanceOfBaseResponseCommonPageTagDto(value: object): value is BaseResponseCommonPageTagDto {
    return true;
}

export function BaseResponseCommonPageTagDtoFromJSON(json: any): BaseResponseCommonPageTagDto {
    return BaseResponseCommonPageTagDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPageTagDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPageTagDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PageTagDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPageTagDtoToJSON(value?: BaseResponseCommonPageTagDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PageTagDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

