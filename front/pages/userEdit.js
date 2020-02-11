import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../Components/SignUp";
import {
  USER_EDIT_REQUEST,
  UPLOAD_IMAGE_REQUEST
} from "../redux/actions/userAction";
import { UserEdit_Form, UserEdit_Image } from "../Components/userEdit/style";

const UserEdit = () => {
  const dispatch = useDispatch();
  const { me, image } = useSelector(state => state.userReducer);
  const imageChange = useRef();

  const [editnickName, onEditnickName] = useInput();
  const [editId, onEditId] = useInput();
  const [editPassword, onEditPassword] = useInput();
  const [editText, onEditText] = useInput();
  console.log(me);

  const onSubmitEdit = useCallback(
    event => {
      event.preventDefault();
      const submitInfo = new FormData();
      submitInfo.append("userId", editId);
      submitInfo.append("nickName", editnickName);
      submitInfo.append("password", editPassword);
      submitInfo.append("introduction", editText);
      submitInfo.append("image", image.filename);
      dispatch({
        type: USER_EDIT_REQUEST,
        data: submitInfo
      });
    },
    [editId, editnickName, editPassword, editText, image]
  );

  const uploadImage = useCallback(event => {
    const image = new FormData();
    [].forEach.call(event.target.files, file => {
      image.append("image", file);
    });
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: image
    });
  }, []);

  const onClickImage = useCallback(() => {
    imageChange.current.click();
  }, [imageChange.current]);

  return (
    <>
      <div>
        <UserEdit_Form enctype="multipart/form-data" onSubmit={onSubmitEdit}>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageChange}
            onChange={uploadImage}
          />
          <UserEdit_Image
            onClick={onClickImage}
            src={
              image
                ? `http://localhost:3001/${image.filename}`
                : me && me.src
                ? `http://localhost:3001/${me.src}`
                : `http://localhost:3001/기본이미지.png`
            }
          />
          <div>
            <label>닉네임 변경</label>
            <input
              placeholder={me ? me.nickName : ""}
              onChange={onEditnickName}
            />
          </div>
          <div>
            <label>아이디 변경</label>
            <input placeholder={me ? me.userId : ""} onChange={onEditId} />
          </div>
          <div>
            <label>비밀번호 변경</label>
            <input type="password" onChange={onEditPassword} />
          </div>
          <div>
            <label>소개글 변경</label>
            <input placeholder={me ? me.nickName : ""} onChange={onEditText} />
          </div>
          <button>저장</button>
        </UserEdit_Form>
      </div>
    </>
  );
};

export default UserEdit;
