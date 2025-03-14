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
 * @interface MediaAutoCompleteDto
 */
export interface MediaAutoCompleteDto {
    /**
     * 
     * @type {number}
     * @memberof MediaAutoCompleteDto
     */
    mediaId?: number;
    /**
     * 
     * @type {string}
     * @memberof MediaAutoCompleteDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof MediaAutoCompleteDto
     */
    subcategory?: string;
    /**
     * 
     * @type {boolean}
     * @memberof MediaAutoCompleteDto
     */
    flagEmail?: boolean;
}

/**
 * Check if a given object implements the MediaAutoCompleteDto interface.
 */
export function instanceOfMediaAutoCompleteDto(value: object): value is MediaAutoCompleteDto {
    return true;
}

export function MediaAutoCompleteDtoFromJSON(json: any): MediaAutoCompleteDto {
    return MediaAutoCompleteDtoFromJSONTyped(json, false);
}

export function MediaAutoCompleteDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MediaAutoCompleteDto {
    if (json == null) {
        return json;
    }
    return {
        
        'mediaId': json['mediaId'] == null ? undefined : json['mediaId'],
        'name': json['name'] == null ? undefined : json['name'],
        'subcategory': json['subcategory'] == null ? undefined : json['subcategory'],
        'flagEmail': json['flagEmail'] == null ? undefined : json['flagEmail'],
    };
}

export function MediaAutoCompleteDtoToJSON(value?: MediaAutoCompleteDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'mediaId': value['mediaId'],
        'name': value['name'],
        'subcategory': value['subcategory'],
        'flagEmail': value['flagEmail'],
    };
}

