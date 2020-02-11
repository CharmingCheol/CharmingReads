import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";

import { Tabs, Tab, Panel } from "@bumaga/tabs";
import {
  User_Section,
  User_Info,
  User_Image,
  User_Button,
  User_Inrtoduce,
  User_Tab_Section,
  User_Tab,
  User_Info_Friends,
  User_Post_Image,
  User_Info_Section
} from "./style";

// import Popup from "reactjs-popup";
// import { Scrollbars } from "react-custom-scrollbars";
// import ReactShadowScroll from "react-shadow-scroll";
// import styled from "styled-components";

const UserSection = () => {
  const { me } = useSelector(state => state.userReducer);
  useEffect(() => {
    if (!me) {
      Router.push("/");
    }
  }, [me && me.id]);
  return (
    <>
      <User_Section>
        <div>
          <User_Info>
            <User_Image />
            <User_Info_Section>
              <div>
                <div>아이디</div>
                <Link href="/post">
                  <User_Button>게시글 추가</User_Button>
                </Link>
                <Link href="/userEdit">
                  <User_Button>프로필 편집</User_Button>
                </Link>
              </div>
              <User_Info_Friends>
                <div>게시글 xxxx</div>
                <div>팔로우 xxxx</div>
                <div>팔로잉 xxxx</div>
              </User_Info_Friends>
            </User_Info_Section>
          </User_Info>
          <User_Inrtoduce>
            <div>소개글</div>
            <div>blahblah</div>
          </User_Inrtoduce>
        </div>
        <div>
          <Tabs>
            <User_Tab_Section>
              <Tab>
                <User_Tab>내 게시물</User_Tab>
              </Tab>
              <Tab>
                <User_Tab>저장한 게시물</User_Tab>
              </Tab>
            </User_Tab_Section>
            <User_Post_Image>
              <Panel>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>7</div>
                <div>7</div>
                <div>7</div>
                <div>7</div>
              </Panel>
            </User_Post_Image>
            <User_Post_Image>
              <Panel>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
              </Panel>
            </User_Post_Image>
          </Tabs>
        </div>
      </User_Section>
    </>
  );
};

export default UserSection;
