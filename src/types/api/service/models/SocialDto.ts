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
/**
 * 
 * @export
 * @interface SocialDto
 */
export interface SocialDto {
    /**
     * 소셜 구분 ID - 공통코드 JRNLST_SOCIAL_USER_ADD
     * @type {number}
     * @memberof SocialDto
     */
    socialTypeId: number;
    /**
     * 내용
     * @type {string}
     * @memberof SocialDto
     */
    link: string;
}

/**
 * Check if a given object implements the SocialDto interface.
 */
export function instanceOfSocialDto(value: object): value is SocialDto {
    if (!('socialTypeId' in value) || value['socialTypeId'] === undefined) return false;
    if (!('link' in value) || value['link'] === undefined) return false;
    return true;
}

export function SocialDtoFromJSON(json: any): SocialDto {
    return SocialDtoFromJSONTyped(json, false);
}

export function SocialDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SocialDto {
    if (json == null) {
        return json;
    }
    return {
        
        'socialTypeId': json['socialTypeId'],
        'link': json['link'],
    };
}

export function SocialDtoToJSON(value?: SocialDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'socialTypeId': value['socialTypeId'],
        'link': value['link'],
    };
}

