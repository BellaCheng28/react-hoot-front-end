// src/components/HootList/HootList.jsx
import { Link } from "react-router-dom";
import styles from "./HootList.module.css";
import Icon from "../Icon/Icon";
const HootList = (props) => {
  return (
    <main className={styles.container}>
      {props.hoots.map((hoot) => (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <h2>{hoot.title}</h2>
              <p>
                {hoot.author.username} posted on
                {new Date(hoot.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{hoot.text}</p>
            <Icon category={hoot.category} />
          </article>
        </Link>
      ))}
    </main>
  );
};

export default HootList;
