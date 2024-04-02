import React, { FC } from "react";
import WidgetHeading1 from "./WidgetHeading1";

export interface WidgetPostsProps {
  className?: string;
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
}) => {
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        viewAll={{ label: "View all", href: "/#" }}
      />
    </div>
  );
};

export default WidgetPosts;
