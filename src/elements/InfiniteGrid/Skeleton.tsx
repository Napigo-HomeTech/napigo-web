import { uniqueId } from "lodash";
import React, { Fragment } from "react";

type SkeletonProps = {
    itemAmount?: number;
    component: React.ReactElement;
};
export const Skeleton: React.FC<SkeletonProps> = ({ itemAmount = 20, component }) => {
    return (
        <Fragment>
            {Array(itemAmount)
                .fill(0)
                .map((_) => (
                    <>{React.cloneElement(component, { key: uniqueId() })}</>
                ))}
        </Fragment>
    );
};
