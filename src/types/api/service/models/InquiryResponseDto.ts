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
import type { AttachedDto } from './AttachedDto';
import {
    AttachedDtoFromJSON,
    AttachedDtoFromJSONTyped,
    AttachedDtoToJSON,
} from './AttachedDto';

/**
 * 
 * @export
 * @interface InquiryResponseDto
 */
export interface InquiryResponseDto {
    /**
     * 
     * @type {number}
     * @memberof InquiryResponseDto
     */
    inquiryResponseId?: number;
    /**
     * 
     * @type {string}
     * @memberof InquiryResponseDto
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof InquiryResponseDto
     */
    content?: string;
    /**
     * 
     * @type {string}
     * @memberof InquiryResponseDto
     */
    regisAt?: string;
    /**
     * 
     * @type {number}
     * @memberof InquiryResponseDto
     */
    inquiryId?: number;
    /**
     * 
     * @type {Array<AttachedDto>}
     * @memberof InquiryResponseDto
     */
    attachedList?: Array<AttachedDto>;
}

/**
 * Check if a given object implements the InquiryResponseDto interface.
 */
export function instanceOfInquiryResponseDto(value: object): value is InquiryResponseDto {
    return true;
}

export function InquiryResponseDtoFromJSON(json: any): InquiryResponseDto {
    return InquiryResponseDtoFromJSONTyped(json, false);
}

export function InquiryResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InquiryResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'inquiryResponseId': json['inquiryResponseId'] == null ? undefined : json['inquiryResponseId'],
        'title': json['title'] == null ? undefined : json['title'],
        'content': json['content'] == null ? undefined : json['content'],
        'regisAt': json['regisAt'] == null ? undefined : json['regisAt'],
        'inquiryId': json['inquiryId'] == null ? undefined : json['inquiryId'],
        'attachedList': json['attachedList'] == null ? undefined : ((json['attachedList'] as Array<any>).map(AttachedDtoFromJSON)),
    };
}

export function InquiryResponseDtoToJSON(value?: InquiryResponseDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'inquiryResponseId': value['inquiryResponseId'],
        'title': value['title'],
        'content': value['content'],
        'regisAt': value['regisAt'],
        'inquiryId': value['inquiryId'],
        'attachedList': value['attachedList'] == null ? undefined : ((value['attachedList'] as Array<any>).map(AttachedDtoToJSON)),
    };
}

