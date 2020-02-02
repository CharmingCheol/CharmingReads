import React from "react";
import { Search_Section, Search_SearchResult } from "./style";

const SearchSection = () => {
  return (
    <>
      <Search_Section>
        <div>xxx개의 검색 결과가 나왔습니다</div>
        <Search_SearchResult>
          <div></div>
          <div>지적 대화를 위한 넓고 얕은 지식</div>
          <div>채사장</div>
          <div>작성자</div>
          <div>작성일</div>
        </Search_SearchResult>
        <Search_SearchResult>
          <div></div>
          <div>지적 대화를 위한 넓고 얕은 지식</div>
          <div>채사장</div>
          <div>작성자</div>
          <div>작성일</div>
        </Search_SearchResult>
      </Search_Section>
    </>
  );
};

export default SearchSection;
