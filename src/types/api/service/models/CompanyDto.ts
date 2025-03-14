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
 * @interface CompanyDto
 */
export interface CompanyDto {
    /**
     * 
     * @type {number}
     * @memberof CompanyDto
     */
    companyId?: number;
    /**
     * 회사명
     * @type {string}
     * @memberof CompanyDto
     */
    name?: string;
    /**
     * 회사 분류, 공통코드 - COM_CATEGORY 
     * @type {string}
     * @memberof CompanyDto
     */
    categoryCode?: string;
    /**
     * 대표이름
     * @type {string}
     * @memberof CompanyDto
     */
    ceoName?: string;
    /**
     * 사업자등록번호
     * @type {string}
     * @memberof CompanyDto
     */
    bizRegisNo?: string;
    /**
     * 등급:A-매우우수,B-우수고객,C-일반고객,D-불량고객
     * @type {string}
     * @memberof CompanyDto
     */
    grade?: CompanyDtoGradeEnum;
    /**
     * 폐업여부
     * @type {boolean}
     * @memberof CompanyDto
     */
    closed?: boolean;
    /**
     * 직원수, 공통코드 - COM_TOTAL_MEMBERS 
     * @type {string}
     * @memberof CompanyDto
     */
    totalMembers?: string;
    /**
     * 웹사이트주소
     * @type {string}
     * @memberof CompanyDto
     */
    wsite?: string;
    /**
     * 주소
     * @type {string}
     * @memberof CompanyDto
     */
    address?: string;
    /**
     * 상세주소
     * @type {string}
     * @memberof CompanyDto
     */
    detailedAddress?: string;
    /**
     * 국가 코드, 공통코드 - COM_COUNTRY
     * @type {string}
     * @memberof CompanyDto
     */
    countryCode?: string;
    /**
     * 파일 목록, 사업자등록증 등
     * @type {Array<AttachedDto>}
     * @memberof CompanyDto
     */
    attachedList?: Array<AttachedDto>;
}


/**
 * @export
 */
export const CompanyDtoGradeEnum = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D'
} as const;
export type CompanyDtoGradeEnum = typeof CompanyDtoGradeEnum[keyof typeof CompanyDtoGradeEnum];


/**
 * Check if a given object implements the CompanyDto interface.
 */
export function instanceOfCompanyDto(value: object): value is CompanyDto {
    return true;
}

export function CompanyDtoFromJSON(json: any): CompanyDto {
    return CompanyDtoFromJSONTyped(json, false);
}

export function CompanyDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CompanyDto {
    if (json == null) {
        return json;
    }
    return {
        
        'companyId': json['companyId'] == null ? undefined : json['companyId'],
        'name': json['name'] == null ? undefined : json['name'],
        'categoryCode': json['categoryCode'] == null ? undefined : json['categoryCode'],
        'ceoName': json['ceoName'] == null ? undefined : json['ceoName'],
        'bizRegisNo': json['bizRegisNo'] == null ? undefined : json['bizRegisNo'],
        'grade': json['grade'] == null ? undefined : json['grade'],
        'closed': json['closed'] == null ? undefined : json['closed'],
        'totalMembers': json['totalMembers'] == null ? undefined : json['totalMembers'],
        'wsite': json['wsite'] == null ? undefined : json['wsite'],
        'address': json['address'] == null ? undefined : json['address'],
        'detailedAddress': json['detailedAddress'] == null ? undefined : json['detailedAddress'],
        'countryCode': json['countryCode'] == null ? undefined : json['countryCode'],
        'attachedList': json['attachedList'] == null ? undefined : ((json['attachedList'] as Array<any>).map(AttachedDtoFromJSON)),
    };
}

export function CompanyDtoToJSON(value?: CompanyDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'companyId': value['companyId'],
        'name': value['name'],
        'categoryCode': value['categoryCode'],
        'ceoName': value['ceoName'],
        'bizRegisNo': value['bizRegisNo'],
        'grade': value['grade'],
        'closed': value['closed'],
        'totalMembers': value['totalMembers'],
        'wsite': value['wsite'],
        'address': value['address'],
        'detailedAddress': value['detailedAddress'],
        'countryCode': value['countryCode'],
        'attachedList': value['attachedList'] == null ? undefined : ((value['attachedList'] as Array<any>).map(AttachedDtoToJSON)),
    };
}

