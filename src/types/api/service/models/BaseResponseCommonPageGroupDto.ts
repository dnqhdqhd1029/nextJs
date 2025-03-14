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
import type { PageGroupDto } from './PageGroupDto';
import {
    PageGroupDtoFromJSON,
    PageGroupDtoFromJSONTyped,
    PageGroupDtoToJSON,
} from './PageGroupDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPageGroupDto
 */
export interface BaseResponseCommonPageGroupDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageGroupDto
     */
    status?: string;
    /**
     * 
     * @type {PageGroupDto}
     * @memberof BaseResponseCommonPageGroupDto
     */
    data?: PageGroupDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageGroupDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPageGroupDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageGroupDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPageGroupDto interface.
 */
export function instanceOfBaseResponseCommonPageGroupDto(value: object): value is BaseResponseCommonPageGroupDto {
    return true;
}

export function BaseResponseCommonPageGroupDtoFromJSON(json: any): BaseResponseCommonPageGroupDto {
    return BaseResponseCommonPageGroupDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPageGroupDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPageGroupDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PageGroupDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPageGroupDtoToJSON(value?: BaseResponseCommonPageGroupDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PageGroupDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

