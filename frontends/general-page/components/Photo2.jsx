import React from "react";
import Image from "next/image";

const Photo2 = () => {
  return (
<div className="flex mt-4">
<div className="w-1/2 mr-2">
<Image src="docs/cow1.png" alt="" width={500} height={500} />
</div>
<div className="w-1/2">
<Image src="docs/cow2.png" alt="" width={500} height={500} />
</div>
</div>
  );
};

export default Photo2;
