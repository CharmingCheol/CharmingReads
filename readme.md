# CharmingReads

## 개요

- 유저가 작성한 독서평을 기반하여 책을 검색하는 사이트입니다

## 사용 기술

- 프론트 앤드
  - react, redux, redux-saga, styled-components
  - Next.js, @next/bundle-analyzer
  - axios, immer
- 백앤드
  - Node.js, express, cors
  - mysql, sequelize
  - passport, express-session
- 기타
  - AWS S3

## Category

- 메인 화면
  - 회원가입 및 로그인
  - 카테고리 검색 및 책 제목 검색 기능
  - 내가 쓴 최근 게시글 10개 로드(로그인 했을 경우에만 게시글 로드)
  - 좋아요, 댓글 가장 많은 게시글 각 10개씩 로드
  - 무한 스크롤로 모든 게시글을 9개씩 로드
- 유저 화면
  - 유저 프로필 확인
  - 팔로워, 팔로우 리스트 확인
  - 유저 게시글, 유저 저장 게시글 확인
  - 게시글 추가 및 프로필 편집(로그인 했을 경우에만 사용 가능)
- 게시글 화면
  - 게시글 상세 정보 확인
  - 좋아요 및 게시글 저장 기능
  - 댓글 달기 및 게시글 댓글 리스트 확인
