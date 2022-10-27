import { useEffect, useState, useContext } from "react";
import Tag from "../Tag/Tag";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import "./Project.scss";
import AppContext  from "../AppContext";

const storage = getStorage();

const Project = ({ project, showModal, tagsExist, headerPosition }) => {
    const [projectImage, setProjectImage] = useState(null);
    const { isModal, setIsModal } = useContext(AppContext);
    useEffect(() => {
        let isMounted = true;
        getDownloadURL(ref(storage, `${project.name}.jpg`))
            .then((data) => {
                if (isMounted)
                    setProjectImage(data);
            });
        return () => { isMounted = false };
    }, [project]);

    return <div>
        <article className="pbox style2"
            style={{ width: "100%", cursor: "pointer" }}>
            <button
                className="transparent image featured"
                onClick={() => {
                    setIsModal(true);
                    console.log("current value = ", isModal);
                    showModal();
                }
                }
            >
                {projectImage
                    ? <img src={projectImage} alt={project.name} />
                    : <img src={require("../../images/grey.png")} alt={project.name} />}
                <div className={headerPosition}>
                    <span className="project-name">{project.name}</span>
                </div>

                {tagsExist && (
                    <Tag className="tag tag-position" tags={project.tags} />
                )}

            </button>
        </article>
    </div>

}

export default Project;