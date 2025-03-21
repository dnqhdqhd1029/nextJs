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
import type { PageMailReceiverForListDto } from './PageMailReceiverForListDto';
import {
    PageMailReceiverForListDtoFromJSON,
    PageMailReceiverForListDtoFromJSONTyped,
    PageMailReceiverForListDtoToJSON,
} from './PageMailReceiverForListDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPageMailReceiverForListDto
 */
export interface BaseResponseCommonPageMailReceiverForListDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageMailReceiverForListDto
     */
    status?: string;
    /**
     * 
     * @type {PageMailReceiverForListDto}
     * @memberof BaseResponseCommonPageMailReceiverForListDto
     */
    data?: PageMailReceiverForListDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageMailReceiverForListDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPageMailReceiverForListDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageMailReceiverForListDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPageMailReceiverForListDto interface.
 */
export function instanceOfBaseResponseCommonPageMailReceiverForListDto(value: object): value is BaseResponseCommonPageMailReceiverForListDto {
    return true;
}

export function BaseResponseCommonPageMailReceiverForListDtoFromJSON(json: any): BaseResponseCommonPageMailReceiverForListDto {
    return BaseResponseCommonPageMailReceiverForListDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPageMailReceiverForListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPageMailReceiverForListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PageMailReceiverForListDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPageMailReceiverForListDtoToJSON(value?: BaseResponseCommonPageMailReceiverForListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PageMailReceiverForListDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

