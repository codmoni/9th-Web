import { useQuery } from "@tanstack/react-query";
import { lpKeys } from "./keys";
import {
    getLPs, getLPDetail
} from "../queries";
import type {
    GetLPsPayload,
    LPDetailResponse,
    LPsResponse,
} from "../../../types/lp/DTO";

// Default: LP 목록 조회
export function useLPList(params?: GetLPsPayload) {
    return useQuery<LPsResponse>({
        queryKey: lpKeys.list(params),
        queryFn: () => getLPs(params || {}),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        enabled: true,
    });
}

// LP 상세 조회
export function useLPDetail(lpId: number) {
    return useQuery<LPDetailResponse>({
        queryKey: lpKeys.detail(lpId),
        queryFn: () => getLPDetail(lpId),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!lpId,
    });
}