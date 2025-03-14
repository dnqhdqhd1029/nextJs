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


import * as runtime from '../runtime';
import type {
  AddJournalistGroupDto,
  AddOneJournalistGroupDto,
  BaseResponseCommonJrnlstListDto,
  BaseResponseCommonLong,
  BaseResponseCommonPageJrnlstListDto,
  BaseResponseCommonString,
  CheckJrnlstListNameDto,
  CopyJrnlstListDto,
  CreateJrnlstListDto,
  DelJournalistInJrnlstListsDto,
  DeleteJrnlstListDto,
  EditSharePolicyJrnlstListDto,
  ModifyJrnlstListDto,
  PageableDto,
  RequestJrnlstListDto,
  SearchJrnlstListDto,
} from '../models/index';
import {
    AddJournalistGroupDtoFromJSON,
    AddJournalistGroupDtoToJSON,
    AddOneJournalistGroupDtoFromJSON,
    AddOneJournalistGroupDtoToJSON,
    BaseResponseCommonJrnlstListDtoFromJSON,
    BaseResponseCommonJrnlstListDtoToJSON,
    BaseResponseCommonLongFromJSON,
    BaseResponseCommonLongToJSON,
    BaseResponseCommonPageJrnlstListDtoFromJSON,
    BaseResponseCommonPageJrnlstListDtoToJSON,
    BaseResponseCommonStringFromJSON,
    BaseResponseCommonStringToJSON,
    CheckJrnlstListNameDtoFromJSON,
    CheckJrnlstListNameDtoToJSON,
    CopyJrnlstListDtoFromJSON,
    CopyJrnlstListDtoToJSON,
    CreateJrnlstListDtoFromJSON,
    CreateJrnlstListDtoToJSON,
    DelJournalistInJrnlstListsDtoFromJSON,
    DelJournalistInJrnlstListsDtoToJSON,
    DeleteJrnlstListDtoFromJSON,
    DeleteJrnlstListDtoToJSON,
    EditSharePolicyJrnlstListDtoFromJSON,
    EditSharePolicyJrnlstListDtoToJSON,
    ModifyJrnlstListDtoFromJSON,
    ModifyJrnlstListDtoToJSON,
    PageableDtoFromJSON,
    PageableDtoToJSON,
    RequestJrnlstListDtoFromJSON,
    RequestJrnlstListDtoToJSON,
    SearchJrnlstListDtoFromJSON,
    SearchJrnlstListDtoToJSON,
} from '../models/index';

export interface AddJournalistGroupRequest {
    createJrnlstListDto: CreateJrnlstListDto;
}

export interface AddJournalistInJournalistGroupRequest {
    addJournalistGroupDto: AddJournalistGroupDto;
}

export interface AddOneJournalistInJournalistGroupRequest {
    addOneJournalistGroupDto: AddOneJournalistGroupDto;
}

export interface CheckJrnlstListNameRequest {
    checkJrnlstListNameDto: CheckJrnlstListNameDto;
}

export interface CopyJournalistGroupRequest {
    copyJrnlstListDto: CopyJrnlstListDto;
}

export interface DelJournalistInJournalistGroupRequest {
    delJournalistInJrnlstListsDto: DelJournalistInJrnlstListsDto;
}

export interface DeleteJrnlstListInfoRequest {
    id: number;
}

export interface DeleteListJrnlstListInfoRequest {
    deleteJrnlstListDto: DeleteJrnlstListDto;
}

export interface EditListJrnlstListSharePolicyRequest {
    editSharePolicyJrnlstListDto: EditSharePolicyJrnlstListDto;
}

export interface FindAllJournalistGroupRequest {
    searchJrnlstListDto: SearchJrnlstListDto;
    pageableDto: PageableDto;
}

export interface FindJrnlstListInfoRequest {
    id: number;
    searchDto: RequestJrnlstListDto;
}

export interface ModifyJrnlstListInfoRequest {
    id: number;
    modifyJrnlstListDto: ModifyJrnlstListDto;
}

/**
 * 
 */
export class JrnlstListControllerApi extends runtime.BaseAPI {

    /**
     * 언론인목록 추가
     * 언론인목록 추가
     */
    async addJournalistGroupRaw(requestParameters: AddJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonLong>> {
        if (requestParameters['createJrnlstListDto'] == null) {
            throw new runtime.RequiredError(
                'createJrnlstListDto',
                'Required parameter "createJrnlstListDto" was null or undefined when calling addJournalistGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateJrnlstListDtoToJSON(requestParameters['createJrnlstListDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonLongFromJSON(jsonValue));
    }

    /**
     * 언론인목록 추가
     * 언론인목록 추가
     */
    async addJournalistGroup(requestParameters: AddJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonLong> {
        const response = await this.addJournalistGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록에 언론인 추가(배열 처리)
     * 언론인목록에 언론인 추가(배열 처리)
     */
    async addJournalistInJournalistGroupRaw(requestParameters: AddJournalistInJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['addJournalistGroupDto'] == null) {
            throw new runtime.RequiredError(
                'addJournalistGroupDto',
                'Required parameter "addJournalistGroupDto" was null or undefined when calling addJournalistInJournalistGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/journalist/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddJournalistGroupDtoToJSON(requestParameters['addJournalistGroupDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록에 언론인 추가(배열 처리)
     * 언론인목록에 언론인 추가(배열 처리)
     */
    async addJournalistInJournalistGroup(requestParameters: AddJournalistInJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.addJournalistInJournalistGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록에 언론인 추가(한건만 처리하면서 에러 처리)
     * 언론인목록에 언론인 추가(한건만 처리)
     */
    async addOneJournalistInJournalistGroupRaw(requestParameters: AddOneJournalistInJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['addOneJournalistGroupDto'] == null) {
            throw new runtime.RequiredError(
                'addOneJournalistGroupDto',
                'Required parameter "addOneJournalistGroupDto" was null or undefined when calling addOneJournalistInJournalistGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/journalist/addone`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddOneJournalistGroupDtoToJSON(requestParameters['addOneJournalistGroupDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록에 언론인 추가(한건만 처리하면서 에러 처리)
     * 언론인목록에 언론인 추가(한건만 처리)
     */
    async addOneJournalistInJournalistGroup(requestParameters: AddOneJournalistInJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.addOneJournalistInJournalistGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록 추가 변경 할 때 언론인목록 Title 존재하는지 확인
     * 언론인목록 Title 중복 확인
     */
    async checkJrnlstListNameRaw(requestParameters: CheckJrnlstListNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['checkJrnlstListNameDto'] == null) {
            throw new runtime.RequiredError(
                'checkJrnlstListNameDto',
                'Required parameter "checkJrnlstListNameDto" was null or undefined when calling checkJrnlstListName().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/checkname`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CheckJrnlstListNameDtoToJSON(requestParameters['checkJrnlstListNameDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록 추가 변경 할 때 언론인목록 Title 존재하는지 확인
     * 언론인목록 Title 중복 확인
     */
    async checkJrnlstListName(requestParameters: CheckJrnlstListNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.checkJrnlstListNameRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록 복사
     * 언론인목록 복사
     */
    async copyJournalistGroupRaw(requestParameters: CopyJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['copyJrnlstListDto'] == null) {
            throw new runtime.RequiredError(
                'copyJrnlstListDto',
                'Required parameter "copyJrnlstListDto" was null or undefined when calling copyJournalistGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/copy`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CopyJrnlstListDtoToJSON(requestParameters['copyJrnlstListDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록 복사
     * 언론인목록 복사
     */
    async copyJournalistGroup(requestParameters: CopyJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.copyJournalistGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 선택된 언론인목록(배열)에서 언론인(배열) 제거
     * 선택된 언론인목록(배열)에서 언론인(배열) 제거
     */
    async delJournalistInJournalistGroupRaw(requestParameters: DelJournalistInJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['delJournalistInJrnlstListsDto'] == null) {
            throw new runtime.RequiredError(
                'delJournalistInJrnlstListsDto',
                'Required parameter "delJournalistInJrnlstListsDto" was null or undefined when calling delJournalistInJournalistGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/journalist/del`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DelJournalistInJrnlstListsDtoToJSON(requestParameters['delJournalistInJrnlstListsDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 선택된 언론인목록(배열)에서 언론인(배열) 제거
     * 선택된 언론인목록(배열)에서 언론인(배열) 제거
     */
    async delJournalistInJournalistGroup(requestParameters: DelJournalistInJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.delJournalistInJournalistGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록을 삭제합니다. 소유자가 본인이거나 공개설정이 WRITABLE 인 경우에만 가능합니다.
     * 언론인목록 삭제
     */
    async deleteJrnlstListInfoRaw(requestParameters: DeleteJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteJrnlstListInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록을 삭제합니다. 소유자가 본인이거나 공개설정이 WRITABLE 인 경우에만 가능합니다.
     * 언론인목록 삭제
     */
    async deleteJrnlstListInfo(requestParameters: DeleteJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.deleteJrnlstListInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록을 배열로 받아 삭제합니다. 소유자가 본인이거나 공개설정이 WRITABLE 인 건들만 삭제 가능합니다.
     * 언론인목록 배열로 받아 삭제
     */
    async deleteListJrnlstListInfoRaw(requestParameters: DeleteListJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['deleteJrnlstListDto'] == null) {
            throw new runtime.RequiredError(
                'deleteJrnlstListDto',
                'Required parameter "deleteJrnlstListDto" was null or undefined when calling deleteListJrnlstListInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/list/del`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DeleteJrnlstListDtoToJSON(requestParameters['deleteJrnlstListDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록을 배열로 받아 삭제합니다. 소유자가 본인이거나 공개설정이 WRITABLE 인 건들만 삭제 가능합니다.
     * 언론인목록 배열로 받아 삭제
     */
    async deleteListJrnlstListInfo(requestParameters: DeleteListJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.deleteListJrnlstListInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록 공유설정값을 배열로 받아 수정합니다. 소유자가 본인이거나 공개설정이 WRITABLE 인 건들만 가능합니다.
     * 언론인목록 공유설정 배열로 받아 수정
     */
    async editListJrnlstListSharePolicyRaw(requestParameters: EditListJrnlstListSharePolicyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['editSharePolicyJrnlstListDto'] == null) {
            throw new runtime.RequiredError(
                'editSharePolicyJrnlstListDto',
                'Required parameter "editSharePolicyJrnlstListDto" was null or undefined when calling editListJrnlstListSharePolicy().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/list/share`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EditSharePolicyJrnlstListDtoToJSON(requestParameters['editSharePolicyJrnlstListDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록 공유설정값을 배열로 받아 수정합니다. 소유자가 본인이거나 공개설정이 WRITABLE 인 건들만 가능합니다.
     * 언론인목록 공유설정 배열로 받아 수정
     */
    async editListJrnlstListSharePolicy(requestParameters: EditListJrnlstListSharePolicyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.editListJrnlstListSharePolicyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록 리스트
     * 언론인목록 리스트
     */
    async findAllJournalistGroupRaw(requestParameters: FindAllJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonPageJrnlstListDto>> {
        if (requestParameters['searchJrnlstListDto'] == null) {
            throw new runtime.RequiredError(
                'searchJrnlstListDto',
                'Required parameter "searchJrnlstListDto" was null or undefined when calling findAllJournalistGroup().'
            );
        }

        if (requestParameters['pageableDto'] == null) {
            throw new runtime.RequiredError(
                'pageableDto',
                'Required parameter "pageableDto" was null or undefined when calling findAllJournalistGroup().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['searchJrnlstListDto'] != null) {
            queryParameters['searchJrnlstListDto'] = requestParameters['searchJrnlstListDto'];
        }

        if (requestParameters['pageableDto'] != null) {
            queryParameters['pageableDto'] = requestParameters['pageableDto'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonPageJrnlstListDtoFromJSON(jsonValue));
    }

    /**
     * 언론인목록 리스트
     * 언론인목록 리스트
     */
    async findAllJournalistGroup(requestParameters: FindAllJournalistGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonPageJrnlstListDto> {
        const response = await this.findAllJournalistGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록 정보를 가져옵니다.
     * 언론인목록 정보 확인
     */
    async findJrnlstListInfoRaw(requestParameters: FindJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonJrnlstListDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findJrnlstListInfo().'
            );
        }

        if (requestParameters['searchDto'] == null) {
            throw new runtime.RequiredError(
                'searchDto',
                'Required parameter "searchDto" was null or undefined when calling findJrnlstListInfo().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['searchDto'] != null) {
            queryParameters['searchDto'] = requestParameters['searchDto'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonJrnlstListDtoFromJSON(jsonValue));
    }

    /**
     * 언론인목록 정보를 가져옵니다.
     * 언론인목록 정보 확인
     */
    async findJrnlstListInfo(requestParameters: FindJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonJrnlstListDto> {
        const response = await this.findJrnlstListInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인목록 정보를 수정합니다.
     * 언론인목록 수정
     */
    async modifyJrnlstListInfoRaw(requestParameters: ModifyJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling modifyJrnlstListInfo().'
            );
        }

        if (requestParameters['modifyJrnlstListDto'] == null) {
            throw new runtime.RequiredError(
                'modifyJrnlstListDto',
                'Required parameter "modifyJrnlstListDto" was null or undefined when calling modifyJrnlstListInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/journalistgroup/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ModifyJrnlstListDtoToJSON(requestParameters['modifyJrnlstListDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인목록 정보를 수정합니다.
     * 언론인목록 수정
     */
    async modifyJrnlstListInfo(requestParameters: ModifyJrnlstListInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.modifyJrnlstListInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
