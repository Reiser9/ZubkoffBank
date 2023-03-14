import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={247}
        viewBox="0 0 500 247"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="0" ry="0" width="223" height="53" />
        <rect x="0" y="93" rx="0" ry="0" width="100%" height="68" />
        <rect x="0" y="201" rx="25" ry="25" width="246" height="47" />
    </ContentLoader>
);

export default Skeleton;
