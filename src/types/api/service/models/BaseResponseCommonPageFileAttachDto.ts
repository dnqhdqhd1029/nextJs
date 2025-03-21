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
import type { PageFileAttachDto } from './PageFileAttachDto';
import {
    PageFileAttachDtoFromJSON,
    PageFileAttachDtoFromJSONTyped,
    PageFileAttachDtoToJSON,
} from './PageFileAttachDto';
import type { MessageDto } from './MessageDto';
import {
    MessageDtoFromJSON,
    MessageDtoFromJSONTyped,
    MessageDtoToJSON,
} from './MessageDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPageFileAttachDto
 */
export interface BaseResponseCommonPageFileAttachDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageFileAttachDto
     */
    status?: string;
    /**
     * 
     * @type {PageFileAttachDto}
     * @memberof BaseResponseCommonPageFileAttachDto
     */
    data?: PageFileAttachDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageFileAttachDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPageFileAttachDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageFileAttachDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPageFileAttachDto interface.
 */
export function instanceOfBaseResponseCommonPageFileAttachDto(value: object): value is BaseResponseCommonPageFileAttachDto {
    return true;
}

export function BaseResponseCommonPageFileAttachDtoFromJSON(json: any): BaseResponseCommonPageFileAttachDto {
    return BaseResponseCommonPageFileAttachDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPageFileAttachDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPageFileAttachDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PageFileAttachDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPageFileAttachDtoToJSON(value?: BaseResponseCommonPageFileAttachDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PageFileAttachDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

