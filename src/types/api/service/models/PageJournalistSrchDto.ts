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
import type { JournalistSrchDto } from './JournalistSrchDto';
import {
    JournalistSrchDtoFromJSON,
    JournalistSrchDtoFromJSONTyped,
    JournalistSrchDtoToJSON,
} from './JournalistSrchDto';

/**
 * 
 * @export
 * @interface PageJournalistSrchDto
 */
export interface PageJournalistSrchDto {
    /**
     * 
     * @type {number}
     * @memberof PageJournalistSrchDto
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageJournalistSrchDto
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageJournalistSrchDto
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageJournalistSrchDto
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageJournalistSrchDto
     */
    size?: number;
    /**
     * 
     * @type {Array<JournalistSrchDto>}
     * @memberof PageJournalistSrchDto
     */
    content?: Array<JournalistSrchDto>;
    /**
     * 
     * @type {number}
     * @memberof PageJournalistSrchDto
     */
    number?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageJournalistSrchDto
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageJournalistSrchDto
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageJournalistSrchDto
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageJournalistSrchDto
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageJournalistSrchDto interface.
 */
export function instanceOfPageJournalistSrchDto(value: object): value is PageJournalistSrchDto {
    return true;
}

export function PageJournalistSrchDtoFromJSON(json: any): PageJournalistSrchDto {
    return PageJournalistSrchDtoFromJSONTyped(json, false);
}

export function PageJournalistSrchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageJournalistSrchDto {
    if (json == null) {
        return json;
    }
    return {
        
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(JournalistSrchDtoFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],
        'sort': json['sort'] == null ? undefined : SortObjectFromJSON(json['sort']),
        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageJournalistSrchDtoToJSON(value?: PageJournalistSrchDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalElements': value['totalElements'],
        'totalPages': value['totalPages'],
        'first': value['first'],
        'last': value['last'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(JournalistSrchDtoToJSON)),
        'number': value['number'],
        'sort': SortObjectToJSON(value['sort']),
        'numberOfElements': value['numberOfElements'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

