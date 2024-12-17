import { useState, useEffect, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import { AuthedUserContext } from "../../App";
import CommentForm from "../CommentForm/CommentForm";
import * as hootService from "../../services/hootService";
import styles from './HootDetails.module.css';
import Icon from "../Icon/Icon";
import Loading from "../Loading/Loading";

// console.log(user); // 调试 user 数据

const HootDetails = (props) => {
  const user = useContext(AuthedUserContext);
  const { hootId } = useParams();
  const [hoot, setHoot] = useState();

  useEffect(() => {
    const fetchHoot = async () => {
      const hoot = await hootService.show(hootId);

      if (hoot) {
        setHoot(hoot);
      }
    };
    fetchHoot();
  }, [hootId]);
  // if(!user){
  //   return <main>Loading...</main>;
  // }
  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
    
  };
  const handleDeleteComment = async (commentId) => {
    const delComment = await hootService.deleteComment(hootId,commentId)
     setHoot({
       ...hoot,
       comments: hoot.comments.filter((comment) => comment._id !== commentId),
     });
  };
  

  return (
    <>
      {!hoot ? (
        <main>
          <Loading />
        </main>
      ) : (
        <main className={styles.container}>
          <header>
            <p>{hoot.category.toUpperCase()}</p>
            <h1>{hoot.title}</h1>
            <div>
              <p>
                {hoot.author.username} posted on
                {new Date(hoot.createdAt).toLocaleDateString()}
              </p>
              {hoot.author._id === user._id && (
                <>
                  <Link to={`/hoots/${hootId}/edit`}>
                    <Icon category="Edit" />
                  </Link>
                  <button onClick={() => props.handleDeleteHoot(hootId)}>
                    <Icon category="Trash" />
                  </button>
                </>
              )}
            </div>
          </header>
          <p>{hoot.text}</p>
          <section>
            <h2>Comments</h2>
            <CommentForm handleAddComment={handleAddComment} />
            {!hoot.comments.length && <p>There are no comments.</p>}

            {hoot.comments.map((comment) => (
              <article key={comment._id}>
                <header>
                  <div>
                    <p>
                      {comment.author.username} posted on
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    {comment.author._id === user._id && (
                      <>
                        <Link
                          to={`/hoots/${hootId}/comments/${comment._id}/edit`}
                        >
                          <Icon category="Edit" />
                        </Link>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          <Icon category="Trash" />
                        </button>
                      </>
                    )}
                  </div>
                </header>
                <p>{comment.text}</p>
              </article>
            ))}
          </section>
        </main>
      )}
    </>
  );
};

export default HootDetails;
 






