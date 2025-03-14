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
import type { MediaGroupAutoCompleteDto } from './MediaGroupAutoCompleteDto';
import {
    MediaGroupAutoCompleteDtoFromJSON,
    MediaGroupAutoCompleteDtoFromJSONTyped,
    MediaGroupAutoCompleteDtoToJSON,
} from './MediaGroupAutoCompleteDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonListMediaGroupAutoCompleteDto
 */
export interface BaseResponseCommonListMediaGroupAutoCompleteDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListMediaGroupAutoCompleteDto
     */
    status?: string;
    /**
     * 
     * @type {Array<MediaGroupAutoCompleteDto>}
     * @memberof BaseResponseCommonListMediaGroupAutoCompleteDto
     */
    data?: Array<MediaGroupAutoCompleteDto>;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListMediaGroupAutoCompleteDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonListMediaGroupAutoCompleteDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListMediaGroupAutoCompleteDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonListMediaGroupAutoCompleteDto interface.
 */
export function instanceOfBaseResponseCommonListMediaGroupAutoCompleteDto(value: object): value is BaseResponseCommonListMediaGroupAutoCompleteDto {
    return true;
}

export function BaseResponseCommonListMediaGroupAutoCompleteDtoFromJSON(json: any): BaseResponseCommonListMediaGroupAutoCompleteDto {
    return BaseResponseCommonListMediaGroupAutoCompleteDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonListMediaGroupAutoCompleteDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonListMediaGroupAutoCompleteDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : ((json['data'] as Array<any>).map(MediaGroupAutoCompleteDtoFromJSON)),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonListMediaGroupAutoCompleteDtoToJSON(value?: BaseResponseCommonListMediaGroupAutoCompleteDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': value['data'] == null ? undefined : ((value['data'] as Array<any>).map(MediaGroupAutoCompleteDtoToJSON)),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

