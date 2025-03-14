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
import type { PageableObject } from './PageableObject';
import {
    PageableObjectFromJSON,
    PageableObjectFromJSONTyped,
    PageableObjectToJSON,
} from './PageableObject';
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';
import type { MediaSrchDto } from './MediaSrchDto';
import {
    MediaSrchDtoFromJSON,
    MediaSrchDtoFromJSONTyped,
    MediaSrchDtoToJSON,
} from './MediaSrchDto';

/**
 * 
 * @export
 * @interface PageMediaSrchDto
 */
export interface PageMediaSrchDto {
    /**
     * 
     * @type {number}
     * @memberof PageMediaSrchDto
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageMediaSrchDto
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageMediaSrchDto
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageMediaSrchDto
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageMediaSrchDto
     */
    size?: number;
    /**
     * 
     * @type {Array<MediaSrchDto>}
     * @memberof PageMediaSrchDto
     */
    content?: Array<MediaSrchDto>;
    /**
     * 
     * @type {number}
     * @memberof PageMediaSrchDto
     */
    number?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageMediaSrchDto
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageMediaSrchDto
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageMediaSrchDto
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageMediaSrchDto
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageMediaSrchDto interface.
 */
export function instanceOfPageMediaSrchDto(value: object): value is PageMediaSrchDto {
    return true;
}

export function PageMediaSrchDtoFromJSON(json: any): PageMediaSrchDto {
    return PageMediaSrchDtoFromJSONTyped(json, false);
}

export function PageMediaSrchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageMediaSrchDto {
    if (json == null) {
        return json;
    }
    return {
        
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(MediaSrchDtoFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],
        'sort': json['sort'] == null ? undefined : SortObjectFromJSON(json['sort']),
        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageMediaSrchDtoToJSON(value?: PageMediaSrchDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalElements': value['totalElements'],
        'totalPages': value['totalPages'],
        'first': value['first'],
        'last': value['last'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(MediaSrchDtoToJSON)),
        'number': value['number'],
        'sort': SortObjectToJSON(value['sort']),
        'numberOfElements': value['numberOfElements'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

