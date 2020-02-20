// import React from "react";

// const BookModal = ({ post }) => {
//   return (
//     <>
//       <div>asdf</div>
// </>
// <section className="modal-content">
//   <span className="close" onClick={cancelModal}>
//     X
//   </span>
//   <ModalLayout>
//     <div>
//       <header>
//         <img />
//         <article>작성자 이름</article>
//         <article>작성일</article>
//       </header>
//       <div>
//         <img />
//         <article>해시태그</article>
//         <article>{`좋아요 수 : ${post.Like.length}`}</article>
//         <article>{`댓글 수 : ${post.Comments.length}`}</article>
//         <article>
//           {`평점 : ${
//             post.Comments.length !== 0
//               ? post.Comments.map(comment => {
//                   return comment ? comment.rating : null;
//                 }).reduce((a, b) => {
//                   return a + b;
//                 }, 0) / post.Comments.length
//               : 0
//           }`}
//         </article>
//       </div>
//     </div>
//     <div>
//       <article>{post.content}</article>
//       <ModalTabMenu>
//         <ul>
//           <li onClick={onClickLike}>
//             {liked ? (
//               <RedHeart className="fas fa-heart"></RedHeart>
//             ) : (
//               <i className="far fa-heart"></i>
//             )}
//           </li>
//           <li onClick={onToggleComment}>
//             <i className="fas fa-comment"></i>
//           </li>
//           <li onClick={onClickPostStorage}>
//             <i className="fas fa-share-square"></i>
//           </li>
//         </ul>
//         {commentFormOpened && (
//           <>
//             <ModalCommentList>
//               <ul>
//                 {post.Comments.map(comment => {
//                   return comment ? (
//                     <Comment key={comment.id} comment={comment} />
//                   ) : null;
//                 })}
//               </ul>
//             </ModalCommentList>
//           </>
//         )}
//       </ModalTabMenu>
//       <footer>
//         <form onSubmit={onSubmitComment}>
//           <img />
//           <div onChange={onChangeDisabled}>
//             <input onChange={commentInput} />
//             <StarRatings
//               rating={star}
//               starRatedColor="blue"
//               changeRating={changeRating}
//               numberOfStars={5}
//               name="rating"
//             />
//           </div>
//           <button disabled={submitDisable}>댓글 작성 버튼</button>
//         </form>
//       </footer>
//     </div>
//   </ModalLayout>
// </section>
//   );
// };

// export default BookModal;
