export type GroupJoinApprovalMode = "approval_required" | "auto_approve";
export interface CreateGroupPayload {
    /** Group name shown to participants (max 128 characters) */
    subject: string;
    /** Max 2048 characters */
    description?: string;
    joinApprovalMode?: GroupJoinApprovalMode;
}
export interface CreateGroupResponse {
    id: string;
    messaging_product?: "whatsapp";
}
export interface GroupParticipant {
    wa_id: string;
    [key: string]: unknown;
}
export interface GroupDetails {
    id: string;
    messaging_product: "whatsapp";
    subject: string;
    description?: string;
    creation_timestamp?: string;
    suspended?: boolean;
    participants?: GroupParticipant[];
    total_participant_count?: number;
    join_approval_mode?: GroupJoinApprovalMode;
}
export interface UpdateGroupPayload {
    subject?: string;
    description?: string;
    /** JPEG image content, square, max 5MB */
    profilePicture?: Buffer;
}
export interface GroupSuccessResponse {
    success: boolean;
}
export interface GroupInviteLinkResponse {
    messaging_product: "whatsapp";
    /** Format: https://chat.whatsapp.com/<LINK_ID> */
    invite_link: string;
}
export interface RemoveGroupParticipantsResponse {
    messaging_product: "whatsapp";
    success?: boolean;
}
export interface GroupJoinRequest {
    join_request_id: string;
    wa_id: string;
    creation_timestamp?: string;
}
export interface GroupPaging {
    cursors?: {
        before?: string;
        after?: string;
    };
    next?: string;
    previous?: string;
}
export interface ListGroupJoinRequestsResponse {
    data: GroupJoinRequest[];
    paging?: GroupPaging;
}
export interface GroupJoinRequestActionError {
    join_request_id: string;
    errors: Array<{
        code: number;
        message: string;
    }>;
}
export interface ApproveGroupJoinRequestsResponse {
    approved_join_requests: string[];
    failed_join_requests?: GroupJoinRequestActionError[];
}
export interface RejectGroupJoinRequestsResponse {
    rejected_join_requests: string[];
    failed_join_requests?: GroupJoinRequestActionError[];
}
export interface GroupSummary {
    id: string;
    subject: string;
    created_at?: string;
}
export interface ListGroupsParams {
    limit?: number;
    after?: string;
    before?: string;
}
export interface ListGroupsResponse {
    data: GroupSummary[];
    paging?: GroupPaging;
}
