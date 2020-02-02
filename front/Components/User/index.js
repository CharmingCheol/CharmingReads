import React from "react";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
import {
  User_Section,
  User_Info,
  User_Image,
  User_Info_Section,
  User_Inrtoduce,
  User_Tab_Section,
  User_Tab,
  User_Post_Image
} from "./style";

const UserSection = () => {
  return (
    <>
      <User_Section>
        <div>
          <User_Info>
            <User_Image />
            <div>
              <User_Info_Section>
                <div>아이디</div>
                <button>프로필 편집</button>
              </User_Info_Section>
              <User_Info_Section>
                <div>게시글 xxxx</div>
                <div>팔로우 xxxx</div>
                <div>팔로잉 xxxx</div>
              </User_Info_Section>
            </div>
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
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Panel>
            </User_Post_Image>
            <User_Post_Image>
              <Panel>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Panel>
            </User_Post_Image>
          </Tabs>
        </div>
      </User_Section>
    </>
  );
};

export default UserSection;
