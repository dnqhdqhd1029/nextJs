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
import type { PagePayRequestForListDto } from './PagePayRequestForListDto';
import {
    PagePayRequestForListDtoFromJSON,
    PagePayRequestForListDtoFromJSONTyped,
    PagePayRequestForListDtoToJSON,
} from './PagePayRequestForListDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPagePayRequestForListDto
 */
export interface BaseResponseCommonPagePayRequestForListDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPagePayRequestForListDto
     */
    status?: string;
    /**
     * 
     * @type {PagePayRequestForListDto}
     * @memberof BaseResponseCommonPagePayRequestForListDto
     */
    data?: PagePayRequestForListDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPagePayRequestForListDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPagePayRequestForListDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPagePayRequestForListDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPagePayRequestForListDto interface.
 */
export function instanceOfBaseResponseCommonPagePayRequestForListDto(value: object): value is BaseResponseCommonPagePayRequestForListDto {
    return true;
}

export function BaseResponseCommonPagePayRequestForListDtoFromJSON(json: any): BaseResponseCommonPagePayRequestForListDto {
    return BaseResponseCommonPagePayRequestForListDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPagePayRequestForListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPagePayRequestForListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PagePayRequestForListDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPagePayRequestForListDtoToJSON(value?: BaseResponseCommonPagePayRequestForListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PagePayRequestForListDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

