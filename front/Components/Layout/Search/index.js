import React, { useState, useCallback, useEffect } from "react";
import Router from "next/router";

import { Input } from "./style";

const Search = () => {
  const [word, setWord] = useState("");

  const onSubmitSearch = useCallback(
    event => {
      event.preventDefault();
      if (!word || !word.trim()) {
        alert("검색창을 입력하세요");
        return;
      }
      Router.push(`/search/${word}`);
    },
    [word]
  );

  //검색 단어 변경
  const onChangeWord = useCallback(event => {
    setWord(event.target.value);
  }, []);

  return (
    <>
      <Input>
        <form onSubmit={onSubmitSearch}>
          <input
            value={word}
            onChange={onChangeWord}
            placeholder="저자, 책 이름, 해시태그 검색"
          />
        </form>
      </Input>
    </>
  );
};

export default Search;
