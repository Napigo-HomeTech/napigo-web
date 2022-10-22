/**
 * Attached all the required header for every api calls,
 * including Auth, Idempotent Key etc..whichever required
 */
export const createReqHeaders = () => {
    /**
     * As for now, simple implementation until we have design the full flow
     * of user session fetching
     */
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer jwtvhdvidcdv6897vdsvdaivdavav",
        "X-Token-Auth": "123346744",
    };
};

/**
 * Common Responses object which pertained a collection type of
 * resources
 */
export interface CollectionBasedResponse {
    counts: number;
    limit: number;
    page: number;
    offset: number;
}
