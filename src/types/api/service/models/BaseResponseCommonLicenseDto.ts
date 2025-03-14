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
import type { LicenseDto } from './LicenseDto';
import {
    LicenseDtoFromJSON,
    LicenseDtoFromJSONTyped,
    LicenseDtoToJSON,
} from './LicenseDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonLicenseDto
 */
export interface BaseResponseCommonLicenseDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonLicenseDto
     */
    status?: string;
    /**
     * 
     * @type {LicenseDto}
     * @memberof BaseResponseCommonLicenseDto
     */
    data?: LicenseDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonLicenseDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonLicenseDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonLicenseDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonLicenseDto interface.
 */
export function instanceOfBaseResponseCommonLicenseDto(value: object): value is BaseResponseCommonLicenseDto {
    return true;
}

export function BaseResponseCommonLicenseDtoFromJSON(json: any): BaseResponseCommonLicenseDto {
    return BaseResponseCommonLicenseDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonLicenseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonLicenseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : LicenseDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonLicenseDtoToJSON(value?: BaseResponseCommonLicenseDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': LicenseDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

