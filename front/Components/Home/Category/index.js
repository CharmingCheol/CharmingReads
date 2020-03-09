import React from "react";

import { Menu } from "./style";
import Title from "./title";

const Category = () => {
  return (
    <>
      <Menu>
        <Title key="소설" title="소설" />
        <Title key="에세이" title="에세이" />
        <Title key="인문학" title="인문학" />
        <Title key="자기계발" title="자기계발" />
        <Title key="역사" title="역사" />
        <Title key="과학" title="과학" />
        <Title key="예술" title="예술" />
        <Title key="종교" title="종교" />
        <Title key="경제" title="경제" />
        <Title key="외국어" title="외국어" />
        <Title key="컴퓨터" title="컴퓨터" />
        <Title key="수험서" title="수험서" />
      </Menu>
    </>
  );
};

export default Category;
