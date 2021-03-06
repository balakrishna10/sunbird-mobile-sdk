import {ContentState, UpdateContentStateAPIRequest, UpdateContentStateRequest} from './def/request-types';

export class CourseUtil {
    public static getUpdateContentStateRequest(updateContentReq: UpdateContentStateRequest)
        : UpdateContentStateAPIRequest {
        const contentStateList: ContentState[] = [];
        contentStateList.push(this.getRequestMap(updateContentReq));
        return {userId: updateContentReq.userId, contents: contentStateList};
    }

    public static getUpdateContentStateListRequest(userId: string, updateContentReqList: UpdateContentStateRequest[])
        : UpdateContentStateAPIRequest {
        const contentStateList: ContentState[] = [];
        updateContentReqList.forEach((updateContentReq: UpdateContentStateRequest) => {
            contentStateList.push(this.getRequestMap(updateContentReq));
        });
        return {userId: userId, contents: contentStateList};
    }


    private static getRequestMap(updateContentReq: UpdateContentStateRequest): ContentState {
        const contentState: ContentState = {};
        contentState.contentId = updateContentReq.contentId;
        contentState.courseId = updateContentReq.courseId;
        contentState.batchId = updateContentReq.batchId;
        contentState.status = updateContentReq.status;
        contentState.progress = updateContentReq.progress;

        if (updateContentReq.result) {
            contentState.result = updateContentReq.result;
        }

        if (updateContentReq.grade) {
            contentState.grade = updateContentReq.grade;
        }

        if (updateContentReq.score) {
            contentState.score = updateContentReq.score;
        }
        return contentState;
    }

}